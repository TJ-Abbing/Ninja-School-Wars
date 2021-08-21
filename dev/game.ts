//Setup
console.log('JS is running!')
const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 500;
let gameFrame = 0;
let scoreP1 = 0;
let scoreP2 = 0
let win = false;
const keys: any[] = [];

// player1 classes
class playersClass{
    constructor(){
        console.log('player created!')
    }
    x = 0;
    y = 300;
    width = 143;
    height = 405;
    frameX = 0;
    frameY = 0;
    speed = 9;
    gravity = 9;
    health = 100;
    radius = 35;
}

// White shurikens
const shurikenArrayWhite: any = [];
class shurikenWhite {
    x = canvas.width + Math.random() * canvas.width;
    y = Math.random() * canvas.height;
    radius = 10;
    speed = Math.random() * 5 + 10;
    counted = false;
    distance = 0;

    update(){
        this.x -= this.speed; 
        const dx = this.x - player1.x;
        const dy = this.y - player1.y;
        this.distance = Math.sqrt(dx*dx + dy*dy);
    }
    draw(){
        ctx?.fillStyle = "white";
        ctx?.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx?.fill();
        ctx?.closePath();
        ctx?.stroke();
    }
}
function shurikenHandlerWhite(){
    if (gameFrame % 5 == 0){
        shurikenArrayWhite.push(new shurikenWhite());
    } 
    for (let i = 0; i < shurikenArrayWhite.length; i++){
        shurikenArrayWhite[i].update();
        shurikenArrayWhite[i].draw();

    }
    for (let i = 0; i < shurikenArrayWhite.length; i++){
        if (shurikenArrayWhite[i].x < 0 ){
            shurikenArrayWhite.splice(i, 1);
        }
        if (shurikenArrayWhite[i].distance < shurikenArrayWhite[i].radius + player1.radius){
            scoreP1++;
            if (!shurikenArrayWhite[i].counted){
                shurikenArrayWhite[i].counted = true;
                shurikenArrayWhite.splice(i, 1);
            }
        }
    }
}

// Black shurikens
const shurikenArrayBlack: any = [];
class shurikenBlack {
    x = canvas.width + Math.random() * canvas.width;
    y = Math.random() * canvas.height;
    radius = 10;
    speed = Math.random() * 5 + 10;
    counted = false;
    distance = 0;

    update(){
        this.x -= this.speed; 
        const dx = this.x - player2.x;
        const dy = this.y - player2.y;
        this.distance = Math.sqrt(dx*dx + dy*dy);
    }
    draw(){
        ctx?.fillStyle = "black";
        ctx?.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx?.fill();
        ctx?.closePath();
        ctx?.stroke();
    }
}
function shurikenHandlerBlack(){
    if (gameFrame % 5 == 0){
        shurikenArrayBlack.push(new shurikenBlack());
    } 
    for (let i = 0; i < shurikenArrayBlack.length; i++){
        shurikenArrayBlack[i].update();
        shurikenArrayBlack[i].draw();

    }
    for (let i = 0; i < shurikenArrayBlack.length; i++){
        if (shurikenArrayBlack[i].x < 0 ){
            shurikenArrayBlack.splice(i, 1);
        }
        if (shurikenArrayBlack[i].distance < shurikenArrayBlack[i].radius + player2.radius){
            scoreP2++;
            if (!shurikenArrayBlack[i].counted){
                shurikenArrayBlack[i].counted = true;
                shurikenArrayBlack.splice(i, 1);
            }
        }
    }
}
let player1 = new playersClass; 
let player2 = new playersClass; 

// Adding sprites 
let player1Sprite = new Image();
player1Sprite.src = "docs/images/ninja_black.png";
let player2Sprite = new Image();
player2Sprite.src = "docs/images/ninja_white.png";
// let shuriken1Sprite = new Image;
// shuriken1Sprite.src = "docs/images/shuriken1.png";

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

function animate(){
    if (!win){
        ctx?.clearRect(0, 0, canvas.width, canvas.height);
        ctx?.drawImage(background, 0, 0, canvas.width, canvas.height);
        ctx?.fillText(`points:` + scoreP1, 10, 20);
        ctx?.fillText(`points:` + scoreP2, 650, 20);
        ctx?.font = '20px ariel';
        drawSprite1(player1Sprite, player1.width * player1.frameX, player1.height * player1.frameY, player1.width, player1.height, player1.x, player1.y, player1.width / 2, player1.height / 2);
        drawSprite2(player2Sprite, player2.width * player2.frameX, player2.height * player2.frameY, player2.width, player2.height, player2.x, player2.y, player2.width / 2, player2.height / 2);
        moveplayer1();
        moveplayer2();
        requestAnimationFrame(animate);
        shurikenHandlerWhite();
        shurikenHandlerBlack();
        gameFrame++;
    }
}
animate(); 
function setPlayerPositions(){
    player1.x = 50;
    player2.x = 650;
}
setPlayerPositions();


// Adding keys
window.addEventListener("keydown", function(e){
    keys[e.keyCode] = true;
});
window.addEventListener("keyup", function(e){
    delete keys[e.keyCode];
});

// Adding jump for players
function jump1(){
    player1.y -= 20;
}
function jump2(){
    player2.y -= 20;
}


// Adding player controls
function moveplayer1(){
    if (player1.y <canvas.height - player1.height + 320){
        player1.y += player1.gravity
    }
    if (keys[87] && player1.y > 30){
        player1.frameX = 0
        jump1();
        }
    if (keys[83] && player1.y <canvas.height - player1.height + 320){
        player1.y += player1.speed;
        player1.frameX = 0
    }
    if (keys[65] && player1.x > 20){
        player1.x -= player1.speed;
        player1.frameX = 2
    }
    if (keys[68] && player1.x <canvas.width - player1.width + 60){
        player1.x += player1.speed;
        player1.frameX = 1
    }
}
function moveplayer2(){
    if (player2.y <canvas.height - player2.height + 320){
        player2.y += player2.gravity
    }

    if (keys[38] && player2.y > 30){
        player2.frameX = 0
        jump2();
        }
    if (keys[40] && player2.y <canvas.height - player2.height + 320){
        player2.y += player2.speed;
        player2.frameX = 0
    }
    if (keys[37] && player2.x > 20){
        player2.x -= player2.speed;
        player2.frameX = 2
        }
    if (keys[39] && player2.x <canvas.width - player2.width + 60){
        player2.x += player2.speed;
        player2.frameX = 1
    }
}

var delayInMilliseconds = 1000; // Adds a 0.1 second delay untill game stops after a player wins

function checkWin(){
    if (scoreP1 > scoreP2){
        ctx?.fillText(`Black ninja wins!`,10, 50);
        win = true;
    }
    else if (scoreP2 > scoreP1){
        ctx?.fillText(`White ninja wins!`,650, 50);
        win = true;
    }
}
setInterval(checkWin, 60000);

