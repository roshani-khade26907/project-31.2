const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

var base,wall1,wall2;
var bridge,jointPoint;
var stones=[];
var bg_img;
var zombie1,zombie2,zombie3,zombie4,sad_zombie;
var zombie;
var breakButton;

function preload(){
bg_img=loadImage("assets/background.png");
zombie1=loadImage("assets/zombie1.png");
zombie2=loadImage("assets/zombie2.png");
zombie3=loadImage("assets/zombie3.png");
zombie4=loadImage("assets/zombie4.png");
sad_zombie=loadImage("assets/sad_zombie.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  engine = Engine.create();
  world = engine.world;
  frameRate(80);

  base=new Base(windowWidth/2,windowHeight-10,windowWidth,20);

  wall1=new Base(80,windowHeight/2-windowHeight/15,150,windowHeight/4);
  
  wall2=new Base(windowWidth-80,windowHeight/2-windowHeight/15,150,windowHeight/4);

  zombie=createSprite(width/2,height-110);
  zombie.addAnimation("leftToRight",zombie1,zombie2,zombie1);
  zombie.addAnimation("RightToleft",zombie3,zombie4,zombie3);
  zombie.addImage("sad",sad_zombie);
  zombie.scale=0.1;
  zombie.velocityX=10;

  breakButton=createImg("assets/axe.png");
  breakButton.position(width-200,height/2-30);
  breakButton.size(70,70)
  //breakButton.class("breakbutton")
  breakButton.mouseClicked(handleButtonPress);

  bridge=new Bridge(16,{x:50,y:windowHeight/2-140});

  jointPoint=new Base(windowWidth-150,windowHeight/2-windowHeight/15,150,windowHeight/4)
  
  Matter.Composite.add(bridge.body,jointPoint);

  jointLink=new Link(bridge,jointPoint);

  for(var i=0;i<=8;i++){
    var x=random(width/2-200,width/2+300);
    var y=random(-10,100);
    var stone=new Stone(x,y,80);
    stones.push(stone);

  }
}

function draw() {
  background(bg_img);
  Engine.update(engine);
  base.show();
  wall1.show();
  wall2.show();
  bridge.show();
  jointPoint.show();
  for(var stone of stones){
    stone.show();
    var pos=stone.body.position;
    var distance=dist(zombie.position.x,zombie.position.y,pos.x,pos.y);
    if(distance<=50){
      zombie.velocityX=0;
      Matter.Body.setVelocity(stone.body,{x:10,y:-10});
      zombie.changeImage("sad");
      collided=true;
    }
  }
  if(zombie.x>=width-300){
    zombie.velocityX=-10;
    zombie.changeAnimation("RightToleft")

  }
  if(zombie.x<=300){
    zombie.velocityX=10;
    zombie.changeAnimation("leftToRight")

  }
  drawSprites();
}

function handleButtonPress(){
  console.log("i'm working");
  jointLink.detach();
  setTimeout(()=>{bridge.break},1500);

}

