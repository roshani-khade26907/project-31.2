class Stone{
  constructor(x,y,radius){
    var options={
      restitution:0.8
    }
    this.body=Bodies.circle(x,y,radius,options);
    this.image=loadImage("assets/stone.png")
    this.r=radius;
    World.add(world,this.body);   
  }

  show(){
    
    push();
    translate(this.body.position.x,this.body.position.y);
    rotate (this.body.angle)
    fill ("white");
    imageMode(CENTER);
    image(this.image,0,0,this.r,this.r);
    pop();
  }
    
}