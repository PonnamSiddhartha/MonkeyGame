
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var foodGroup, obstaclesGroup
var score
var SurvivaTime=0

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
   createCanvas=(500,500)
  
  monkey=createSprite(80,315,20,20)
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.1;
  
  ground = createSprite(400,350,900,10);
 // ground.velocity=-4
  ground.x=ground.width/2;
  console.log(ground.x)
  
  foodsGroup=createGroup();
  obstaclesGroup = createGroup();
}


function draw() {
  background(225)
  
    monkey.velocityY=monkey.velocityY+0.8
    if(ground.x<0){
    ground.x=ground.width/2;
  }
  if(keyDown("space")&& monkey.y >= 100) {
      monkey.velocityY = -12;
    }
  
  obstacle();
  if(obstaclesGroup.isTouching(monkey)){ 
      ground.velocityX = 0;
      monkey.velocityY = 0;
     obstaclesGroup.setVelocityXEach(0);
     obstaclesGroup.setLifetimeEach(-1);
     foodsGroup.setVelocityXEach(0);
     foodsGroup.setLifetimeEach(-1);
     score=0;
     survivalTime=0;
     }
  
  monkey.collide(ground);
  stroke("white");
  textSize(20);
  fill("white");
  text("Score; "+ score,500,50);
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate())
  text("Survival Time; "+ survivalTime,100,50);
 
  food();
  
  drawSprites();
}
function food(){
  if(frameCount% 80 === 0){
  var banana = createSprite(400,250,20,20); 
  banana.y=Math.round(random(100,280))
  banana.velocityX=-5; 
  banana.addImage(bananaImage);
  banana.scale=0.1;
  
  foodsGroup.add(banana)
  }
}
function obstacle(){
  if(frameCount%200 === 0){
    var obstacle = createSprite(400,326,20,20);
    var rand  = Math.round(random(1,6));
    obstacle.velocityX=-4;
    obstacle.addImage(obstaceImage);
    obstacle.scale=0.1;
    monkey.depth=obstacle.depth;
    obstacle.depth=0;
    obstacle.lifetime=300;
    obstaclesGroup.add(obstacle);
  }
}




