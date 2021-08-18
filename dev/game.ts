console.log('JS is running!')
const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 500;

const keys = [];

// Player classes
class playerClass {
    constructor(){
        console.log('Player 1 created!')
    }
    x = 0;
    y = 0;
    width = 100;
    height = 100;
    frameX = 0;
    frameY = 0;
    speed = 9;
    moving = false;
}

let player = new playerClass; 

const playerSprite = new Image();
playerSprite.src = "doc/image/ninja.png";

const background = new Image();
background.src = "docs/images/background.png";

function drawSprite(img: CanvasImageSource, sX: number, sY: number, sW: number, sH: number, dX: number, dY: number, dW: number, dH: number) {
    ctx?.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}

function animate() {
    ctx?.clearRect(0, 0, canvas.width, canvas.height);
    ctx?.drawImage(background, 0, 0, canvas.width, canvas.height);
    drawSprite(playerSprite, 0, 0, player.width, player.height, 0, 0, player.width, player.height);
    requestAnimationFrame(animate);
}
animate(); 

