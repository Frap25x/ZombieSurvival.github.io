const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let speed = 10;
let tileCount = 20;
let tileSize = canvas.width / tileCount - 2;
let survivorX = 10;
let survivorY = 10;
let xVelocity = 0;
let yVelocity = 0;

let zombieX = 5;
let zombieY = 5;  
let zombieSpeed = 0.5;

let timerStart = false;
let timeSurvived = 0;

let musicOn = false
const gameOverSound = new Audio("Hl2_Rebel-Ragdoll485-573931361.mp3");
const gameMusic = new Audio("Epic-Chase.mp3");


//function that basically creates an animation frame per frame of the game
function drawGame() {
  
  if (musicOn) {
    gameMusic.play();
  }
  let result = isGameOver();
  if (result) {
    return;
  }


  clearScreen();
  drawSurvivor();
  moveZombie();
  drawZombie();
  timer();
  setTimeout(drawGame, 1000 / speed);
}

//funtion that cancel the traces of the paths of the player by coloring the canvas at the start of every frame
function clearScreen() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);

}

//function that moves the zombie to the player 
function moveZombie() {
  if (zombieX === survivorX) {
    
    if (survivorY > zombieY) {
      zombieY+=zombieSpeed ;
    } else if (survivorY < zombieY) {
      zombieY-=zombieSpeed;
    }
  } else if (zombieX < survivorX) {
    zombieX+=zombieSpeed;
  } else if (zombieX > survivorX) {
    zombieX-=zombieSpeed;
  }
 

  if (zombieY === survivorY) {

    if (survivorX > zombieX) {
      zombieX+=zombieSpeed;
    } else if (survivorX < zombieX) {
      zombieX-=zombieSpeed;
    }
  } else if (zombieY < survivorY) {
    zombieY+=zombieSpeed;
  } else if (zombieY > survivorY) {
    zombieY-=zombieSpeed;
  }
  
}

//function that  ends the game if there is a collision between the zombie and the survivor
function isGameOver() {
  let gameOver = false;

  if (zombieX === survivorX && zombieY === survivorY) {
    gameOver = true;
  }

  if (gameOver) {
    gameOverSound.play();
    ctx.fillStyle = "white";
    ctx.font = "50px Verdana";

    ctx.fillText("Game Over!", canvas.width / 6.5, canvas.height / 2);
    gameMusic.pause();
  }
  return gameOver;
} 

//function that draws the survivor on the canvas based on  X,Y cordinates
function drawSurvivor() {

  ctx.fillStyle = "red";
  ctx.fillRect(survivorX * tileCount, survivorY * tileCount, tileSize, tileSize);

}

//function that draws the zombie on the canvas based on  X,Y cordinates
function drawZombie() {
    ctx.fillStyle = "green";
    ctx.fillRect(zombieX * tileCount, zombieY * tileCount, tileSize, tileSize);
  

}

//funtion that prints the timer only if the game started
function timer() {
  if (timerStart) {
    timeSurvived += 0.1;
    ctx.fillStyle = "white";
    ctx.font = "10px Verdana";
    ctx.fillText("TimeSurvived : " + Math.round(timeSurvived * 10) / 10, canvas.width - 120, 10);
  } else {
    zombieX = 5;
    zombieY = 5;
  }
}
  
document.body.addEventListener("keydown", keyDown);

//function that checks the input from the keyboard of the player and moves the survivor,
function keyDown(event) {
    //up
  if (event.keyCode == 38) {
    timerStart = true;
    musicOn = true;
    if (survivorY <=0){
      return;
    }
    survivorY += -1;
  } /*down*/else if (event.keyCode == 40) {
    timerStart = true;
    musicOn = true;
    if (survivorY >= 19){
      return;
    }
    survivorY += +1;
  } /*right*/else if (event.keyCode == 39) {
    timerStart = true;
    musicOn = true;
    if (survivorX >= 19) {
      return;
    }
    survivorX += +1;
  } /*left*/else if (event.keyCode == 37) {
    timerStart = true;
    musicOn = true;
    if (survivorX <= 0) {
      return;
    }
    survivorX += -1;  
  }
}
gameMusic.play();
drawGame();
