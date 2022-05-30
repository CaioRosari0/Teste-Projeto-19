var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var END = 0;
var PLAY = 1;
var gameState = PLAY;

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  tower = createSprite(width/2,height/2);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  tower.scale = 2;

  ghost = createSprite(width/2,height/2);
  ghost.addImage("fant",ghostImg);
  ghost.scale = 0.4

  invisibleBlockGroup = new Group();
  climbersGroup = new Group();
  doorsGroup = new Group();
  //spookySound.loop();
}
function draw() {
  background(200);
  drawSprites();

  if(gameState == PLAY){
    if(tower.y > 400){
      tower.y = 300
    }

    tower.velocityY = 1;
  
    if(keyDown("left_arrow")){
      ghost.velocityX = -5;
    }
  
    if(keyDown("right_arrow")){
      ghost.velocityX = 5;
    }
  
    if(touches.length > 0 || keyDown("space")){
      ghost.velocityY = -10;
      touches = [];
    }
  
    ghost.velocityY += 0.8;
    createDoors();

    if(invisibleBlockGroup.isTouching(ghost)){
      gameState = END;
    }

    if(ghost.y > 660){
      gameState = END;
    }
  }

    if(gameState == END){
      background("black");
      fill("red");
      textSize(100);
      text("GameOver",450,350)
  }
  
  ghost.collide(invisibleBlockGroup);
  ghost.collide(climbersGroup);

  ghost.setCollider("rectangle", -15, 35, 170, 255);
  ghost.debug = false;
}

function createDoors(){
  if(frameCount%200 == 0){
    door = createSprite(50,70);
    door.addImage("porta", doorImg);
    door.velocityY = 2;
    door.x = Math.round(random(width/2-100,width/2+100));

    climber = createSprite(50,135);
    climber.addImage("climberImg", climberImg);
    climber.velocityY = 2;
    climber.x = door.x;

    invisibleBlock = createSprite(climber.x,150,100,10);
    invisibleBlock.visible = false;
    invisibleBlock.velocityY = 2;

    doorsGroup.lifetime = 300;
    climbersGroup.lifetime = 300;
    invisibleBlockGroup.lifetime = 300;

    invisibleBlockGroup.add(invisibleBlock);
    climbersGroup.add(climber);
    doorsGroup.add(door);
  }

}
