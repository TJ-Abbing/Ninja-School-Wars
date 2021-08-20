console.log('JS is running!')
const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 500;

const keys: any[] = [];

// player1 classes
class player1Class {
    constructor(){
        console.log('player1 1 created!')
    }
    x = 300;
    y = 400;
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

let player1 = new player1Class; 

let player1Sprite = new Image();
player1Sprite.src = "docs/images/ninja_all.png";

const background = new Image();
background.src = "docs/images/background.png";

function drawSprite(img: CanvasImageSource, sX: number, sY: number, sW: number, sH: number, dX: number, dY: number, dW: number, dH: number) {
    ctx?.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}

function animate(){
    ctx?.clearRect(0, 0, canvas.width, canvas.height);
    ctx?.drawImage(background, 0, 0, canvas.width, canvas.height);
    drawSprite(player1Sprite, player1.width * player1.frameX, player1.height * player1.frameY, player1.width, player1.height, player1.x, player1.y, player1.width / 2, player1.height / 2);
    moveplayer1();
    requestAnimationFrame(animate);
}
animate(); 

window.addEventListener("keydown", function(e){
    keys[e.keyCode] = true;
});

window.addEventListener("keyup", function(e){
    delete keys[e.keyCode];
});

function jump(){
    let timerDownId = setInterval(function(){
        20
    })
    player1.y -= 30;
}

var delayInMilliseconds = 1000; //1 second

setTimeout(function() {
  //your code to be executed after 1 second
}, delayInMilliseconds);

function moveplayer1(){
    if (player1.y <canvas.height - player1.height + 320){
        player1.y += player1.gravity
    }

    if (keys[38] && player1.y > 30){
        console.log("up")
        // player1.y -= player1.speed;
        player1.frameX = 0
        jump();
        }
    if (keys[40] && player1.y <canvas.height - player1.height + 320){
        console.log("down")
        player1.y += player1.speed;
        player1.frameX = 0
    }
    if (keys[37] && player1.x > 20){
        console.log("left")
        player1.x -= player1.speed;
        player1.frameX = 2
        }
    if (keys[39] && player1.x <canvas.width - player1.width + 60){
        console.log("right")
        player1.x += player1.speed;
        player1.frameX = 1
    }

}

let healthP1;
healthP1 = document.getElementById('p1-health');
healthP1.style.width = player1.health + "%";