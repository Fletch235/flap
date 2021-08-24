y=0;
v=1;
alive=false;
obstx=[];
obstaclep=[];
s=2;
distance=300;
x=0;
hole=140;
score=0;
last=10;

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style('z-index', '-1');
  y=height/2;
  x=(width*1)/5;
  hole = height/7;
  for(i=0;i<width/distance;i++){
    obstaclep[i]=random(height/10,((height*4)/5)-height/5);
    obstx[i]=(i*distance)+width*2/5;
  }
}

function draw() {
  background(0,150,200);
  bird();
  terrain();
}

function bird() {
  stroke(200,200,0);
  fill(255,255,0);
  if(y+13>(height*4)/5){
    alive = false;
  }
  if(alive){
    y=y+v;
  }
  ellipse(x,y,25,25);
  v=v+.25;
}

function keyPressed() {
  if(keyCode == 32){
    jump();
  }
}

function mouseClicked() {
  jump();
}

function jump() {
  if(alive){
    v=-height/190;
  }else{
    alive=true;
    score=0;
    last=20;
    y=height/2;
    v=-height/190;
    s=2;
    for(i=0;i<width/distance;i++){
      obstaclep[i]=random(height/10,((height*4)/5)-height/5);
      obstx[i]=(i*distance)+width*2/5;
    }
  }
}

function terrain() {
  stroke(0,100,0);
  strokeWeight(3);
  fill(0,255,0);
  if(s<3.5){
    s=s+0.001;
  }
  for(i=0;i<width/distance;i++){
    rect(obstx[i],0,50,obstaclep[i]);
    rect(obstx[i],obstaclep[i]+hole,50,height);
    if(alive){
      obstx[i]=obstx[i]-s;
    }
    if(obstx[i] < -50){
      obstx[i]=max(obstx)+distance;
      obstaclep[i]=random(height/10,((height*4)/5)-height/5);
    }
    if(y<=obstaclep[i]+12.5 && x>=obstx[i]-12.5 && x<=obstx[i]+62.5 || y>=obstaclep[i]+hole-12.5 && x>=obstx[i]-12.5 && x<=obstx[i]+62.5 ){
      alive=false;
      //send scores here
      const data = {score}
      const options = {
          method: 'Post',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
      }
      fetch('/api', options)
    }
    if(x>=obstx[i] && x<=obstx[i]+25 && last!=i){
        score++;
        last=i;
    }
  }
  rect(0,(height*4)/5,width,(height*1)/5);
  textSize(30);
  stroke(0);
  text(score,width/2,(height*9)/10);
}
