console.log('JS is running!')
const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 500;

const keys: any[] = [];

// Player classes
class playerClass {
    constructor(){
        console.log('Player 1 created!')
    }
    x = 200;
    y = 200;
    width = 143;
    height = 417;
    frameX = 0;
    frameY = 0;
    speed = 9;
    moving = false;
}

let player = new playerClass; 

let playerSprite = new Image();
playerSprite.src = "docs/images/ninja_all.png";

const background = new Image();
background.src = "docs/images/background.png";

function drawSprite(img: CanvasImageSource, sX: number, sY: number, sW: number, sH: number, dX: number, dY: number, dW: number, dH: number) {
    ctx?.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}

function animate(){
    ctx?.clearRect(0, 0, canvas.width, canvas.height);
    ctx?.drawImage(background, 0, 0, canvas.width, canvas.height);
    drawSprite(playerSprite, player.width * player.frameX, player.height * player.frameY, player.width, player.height, player.x, player.y, player.width / 2, player.height / 2);
    movePlayer();
    requestAnimationFrame(animate);
}
animate(); 

window.addEventListener("keydown", function(e){
    keys[e.keyCode] = true;
    console.log(keys);
});

window.addEventListener("keyup", function(e){
    delete keys[e.keyCode];
});

function movePlayer(){
    if (keys[38] && player.y > 10){
        player.y -= player.speed;
        player.frameX = 0
        }
    if (keys[37] && player.x > 10){
        player.x -= player.speed;
        player.frameX = 2
        }
    if (keys[40] && player.y <canvas.height - player.height + 320){
        player.y += player.speed;
        player.frameX = 0
    }
    if (keys[39] && player.x <canvas.width - player.width + 70){
        player.x += player.speed;
        player.frameX = 1
    }

}

