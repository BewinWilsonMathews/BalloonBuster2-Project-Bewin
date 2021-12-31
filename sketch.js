//create all variables
var bow , arrow,  background, redB, pinkB, greenB ,blueB , bombO , arrowGroup;
var bowImage, arrowImage, green_balloonImage, red_balloonImage, pink_balloonImage, blue_balloonImage, bomb_obstacleImage, backgroundImage;

var score =0;
var lives =3;

var SERVE = 1
var PLAY = 0

var gameState = SERVE

 

function preload(){  
  //load all images
  backgroundImage = loadImage("background0.png");
  
  arrowImage = loadImage("arrow0.png");
  bowImage = loadImage("bow0.png");

  red_balloonImage = loadImage("red_balloon0.png");
  green_balloonImage = loadImage("green_balloon0.png");
  pink_balloonImage = loadImage("pink_balloon0.png");
  blue_balloonImage = loadImage("blue_balloon0.png");
  bomb_obstacleImage = loadImage("bomb.png");

}

function setup() {
  createCanvas(400, 400);
  
  //creating background
  scene = createSprite(0,0,400,400);
  scene.addImage(backgroundImage);
  scene.scale = 2.5
  
  // creating bow to shoot arrow
  bow = createSprite(380,220,20,50);
  bow.addImage(bowImage); 
  bow.scale = 1;
  
  //reset the scores after every game
  score = 0  
  lives = 3

  //create all the groups
  redB= new Group();
  greenB= new Group();
  blueB= new Group();
  pinkB= new Group();
  bombO= new Group();
  arrowGroup= new Group();  
}

function draw() {
  background(0);

  //when the state is in serve state
  if(gameState === SERVE){
  textSize(30)
  fill("red")
  text("Click To Play",100,200)

  bow.x = 380
  bow.y = 220

  redB.setVelocityXEach = 0
  pinkB.setVelocityXEach = 0
  blueB.setVelocityXEach = 0
  greenB.setVelocityXEach = 0
  bombO.setVelocityXEach = 0
  arrowGroup.setVelocityXEach = 0

  //switching from serve state to play state when mouse clicked
  if(mousePressedOver(scene) && (gameState = SERVE)){
    gameState = PLAY
  }
  }

  //when the game state is equal to play 
  if(gameState === PLAY && lives > 2){

  // moving ground
  scene.velocityX = -3 

  //making a infinite ground
  if (scene.x < 0){
    scene.x = scene.width/2;
  }
  
  //moving bow
  bow.y = World.mouseY
  
  // release arrow when space key is pressed
  if (keyDown("space")) {
    createArrow();  
  }
  
  //creating continous enemies
  if (frameCount % 50 ===0){
    var select_balloon = Math.round(random(1,5));
    switch(select_balloon){
      case 1: redBalloon();
              break;
      case 2: blueBalloon()
              break;
      case 3: greenBalloon();
              break;
      case 4: pinkBalloon();
              break;
      case 5: bombObstacle();
              break;
      default: break;
   }
  }
  
  //destroy the balloons and the bombs when arrow touches them
  if (arrowGroup.isTouching(redB)) {
    redB.destroyEach();
    arrowGroup.destroyEach();
    score = score + 1;
  }

  if (arrowGroup.isTouching(greenB)) {
    greenB.destroyEach();
    arrowGroup.destroyEach();
    score = score + 1;
  }

  if (arrowGroup.isTouching(blueB)) {
    blueB.destroyEach();
    arrowGroup.destroyEach();
    score= score + 1;
  }

  if (arrowGroup.isTouching(pinkB)) {
    pinkB.destroyEach();
    arrowGroup.destroyEach();
    score = score + 1;
  }

  if (arrowGroup.isTouching(bombO)) {
    bombO.destroyEach();
    arrowGroup.destroyEach();
    lives = lives - 1;
  }

  //keep the bow from going outside the screen
  if(bow.y < 40){
  bow.y = 40
  }

  if(bow.y > 360){
  bow.y = 360
  }

  //losing
  if(lives <= 0){
  gameState === END
  background(0)
  textSize(30)
  fill("red")
  text("Game Over")

  bow.x = 380
  bow.y = 220

  redB.setVelocityXEach = 0
  pinkB.setVelocityXEach = 0
  blueB.setVelocityXEach = 0
  greenB.setVelocityXEach = 0
  bombO.setVelocityXEach = 0
  arrowGroup.setVelocityXEach = 0
  }
  
  drawSprites();
  textSize(20)
  fill("red")
  text("Score: "+ score, 300,50);
  text("Lives: "+ lives, 225,50);
}
}

//write the functions for the balloons and bombs
function redBalloon() {
  var red = createSprite(0,Math.round(random(20, 370)), 10, 10);
  red.addImage(red_balloonImage);
  red.velocityX = 3;
  red.lifetime = 150;
  red.scale = 0.1;
  redB.add(red);
}

function blueBalloon() {
  var blue = createSprite(0,Math.round(random(20, 370)), 10, 10);
  blue.addImage(blue_balloonImage);
  blue.velocityX = 3;
  blue.lifetime = 150;
  blue.scale = 0.1;
  blueB.add(blue);
}

function greenBalloon() {
  var green = createSprite(0,Math.round(random(20, 370)), 10, 10);
  green.addImage(green_balloonImage);
  green.velocityX = 3;
  green.lifetime = 150;
  green.scale = 0.1;
  greenB.add(green);
}

function pinkBalloon() {
  var pink = createSprite(0,Math.round(random(20, 370)), 10, 10);
  pink.addImage(pink_balloonImage);
  pink.velocityX = 3;
  pink.lifetime = 150;
  pink.scale = 1
  pinkB.add(pink);
}

function bombObstacle() {
  var bomb = createSprite(0,Math.round(random(20, 370)), 10, 10);
  bomb.addImage(bomb_obstacleImage);
  bomb.velocityX = 3;
  bomb.lifetime = 150;
  bomb.scale = 0.1
  bombO.add(bomb);
}

// Creating  arrows for bow
 function createArrow() {
  var arrow= createSprite(100, 100, 60, 10);
  arrow.addImage(arrowImage);
  arrow.x = 360;
  arrow.y=bow.y;
  arrow.velocityX = -4;
  arrow.lifetime = 100;
  arrow.scale = 0.3;
  arrowGroup.add(arrow);
}
