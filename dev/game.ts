//Setup
console.log('JS is running!')
const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 500;
const keys: any[] = [];

// player1 classes
class player1Class{
    constructor(){
        console.log('player1 1 created!')
    }
    x = 50;
    y = 300;
    width = 143;
    height = 417;
    frameX = 0;
    frameY = 0;
    speed = 9;
    gravity = 5;
    health = 100;
    moving = false;
    jumping = false;
}

// player2 classes
class player2Class{
    constructor(){
        console.log('player1 2 created!')
    }
    x = 650;
    y = 300;
    width = 143;
    height = 417;
    frameX = 0;
    frameY = 0;
    speed = 9;
    gravity = 5;
    health = 100;
    moving = false;
    jumping = false;
}

// Shuriken class
class shurikenClass{
    constructor(){
        console.log('shuriken created!')
    }
    x = 400;
    y = 300;
    width = 33;
    height = 33;
    frameX = 0;
    frameY = 0;
    speed = 9;
    right = 9;
}
// Creating players + shuriken
let player1 = new player1Class; 
let player2 = new player2Class; 
let shuriken = new shurikenClass;
function moveShuriken(){
    shuriken.x += shuriken.right
}
// Adding sprites 
let player1Sprite = new Image();
player1Sprite.src = "docs/images/ninja_black.png";
let player2Sprite = new Image();
player2Sprite.src = "docs/images/ninja_white.png";
let shurikenSprite = new Image;
shurikenSprite.src = "docs/images/shuriken.png";

// Adding background
const background = new Image();
background.src = "docs/images/background.png";

// Drawing sprites function for players
function drawSprite1(img: CanvasImageSource, sX: number, sY: number, sW: number, sH: number, dX: number, dY: number, dW: number, dH: number) {
    ctx?.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}
function drawSprite2(img: CanvasImageSource, sX: number, sY: number, sW: number, sH: number, dX: number, dY: number, dW: number, dH: number) {
    ctx?.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}
function drawSprite3(img: CanvasImageSource, sX: number, sY: number, sW: number, sH: number, dX: number, dY: number, dW: number, dH: number) {
    ctx?.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}
// Animates background, players and shurikens
function animate(){
    ctx?.clearRect(0, 0, canvas.width, canvas.height);
    ctx?.drawImage(background, 0, 0, canvas.width, canvas.height);
    drawSprite1(player1Sprite, player1.width * player1.frameX, player1.height * player1.frameY, player1.width, player1.height, player1.x, player1.y, player1.width / 2, player1.height / 2);
    drawSprite2(player2Sprite, player2.width * player2.frameX, player2.height * player2.frameY, player2.width, player2.height, player2.x, player2.y, player2.width / 2, player2.height / 2);
    drawSprite3(shurikenSprite, shuriken.width * shuriken.frameX, shuriken.height * shuriken.frameY, shuriken.width, shuriken.height, shuriken.x, shuriken.y, shuriken.width / 2, shuriken.height / 2);
    moveplayer1();
    moveplayer2();
    moveShuriken();
    requestAnimationFrame(animate);
}
animate(); 


// Adding keys
window.addEventListener("keydown", function(e){
    keys[e.keyCode] = true;
});
window.addEventListener("keyup", function(e){
    delete keys[e.keyCode];
});

// Adding jump for players
function jump1(){
    player1.y -= 30;
}
function jump2(){
    player2.y -= 30;
}

// Adding player controls
function moveplayer1(){
    if (player1.y <canvas.height - player1.height + 320){
        player1.y += player1.gravity
    }

    if (keys[87] && player1.y > 30){
        console.log("player 1 up")
        player1.frameX = 0
        jump1();
        }
    if (keys[83] && player1.y <canvas.height - player1.height + 320){
        console.log("player 1 down")
        player1.y += player1.speed;
        player1.frameX = 0
    }
    if (keys[65] && player1.x > 20){
        console.log("player 1 left")
        player1.x -= player1.speed;
        player1.frameX = 2
        }
    if (keys[68] && player1.x <canvas.width - player1.width + 60){
        console.log("player 1 right")
        player1.x += player1.speed;
        player1.frameX = 1
    }
}
function moveplayer2(){
    if (player2.y <canvas.height - player2.height + 320){
        player2.y += player2.gravity
    }

    if (keys[38] && player2.y > 30){
        console.log("player 2 up")
        player2.frameX = 0
        jump2();
        }
    if (keys[40] && player2.y <canvas.height - player2.height + 320){
        console.log("player 2 down")
        player2.y += player2.speed;
        player2.frameX = 0
    }
    if (keys[37] && player2.x > 20){
        console.log("player 2 left")
        player2.x -= player2.speed;
        player2.frameX = 2
        }
    if (keys[39] && player2.x <canvas.width - player2.width + 60){
        console.log("player 2 right")
        player2.x += player2.speed;
        player2.frameX = 1
    }
}
// Players healthbar
var delayInMilliseconds = 200; // 0.1 second delay
setTimeout(function() {
  let healthP1;
  healthP1 = document.getElementById('p1-health');
  healthP1.style.width = player1.health + "%";
  let healthP2;
  healthP2 = document.getElementById('p2-health');
  healthP2.style.width = player2.health + "%";
}, delayInMilliseconds);