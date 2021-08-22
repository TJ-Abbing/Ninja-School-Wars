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

// Player class
class playersClass{
    name: any;
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
    set playerColor(val){
      this.name = val;
    }
    get playerColor(){
       return this.name;
    }
  }
  
// White energy
const WhiteEnergyArray: any = [];
class whiteEnergy {
    x = canvas.width + Math.random() * canvas.width + 1000;
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
function whiteEnergyHandler(){
    if (gameFrame % 5 == 0){
        WhiteEnergyArray.push(new whiteEnergy());
    } 
    for (let i = 0; i < WhiteEnergyArray.length; i++){
        WhiteEnergyArray[i].update();
        WhiteEnergyArray[i].draw();

    }
    for (let i = 0; i < WhiteEnergyArray.length; i++){
        if (WhiteEnergyArray[i].x < 0 ){
            WhiteEnergyArray.splice(i, 1);
        }
        if (WhiteEnergyArray[i].distance < WhiteEnergyArray[i].radius + player1.radius){
            scoreP1++;
            if (!WhiteEnergyArray[i].counted){
                WhiteEnergyArray[i].counted = true;
                WhiteEnergyArray.splice(i, 1);
            }
        }
    }
}

// Black energy
const blackEnergyArray: any = [];
class blackEnergy {
    x = canvas.width + Math.random() * canvas.width + 1000; 
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
function blackEnergyHandler(){
    if (gameFrame % 5 == 0){
        blackEnergyArray.push(new blackEnergy());
    } 
    for (let i = 0; i < blackEnergyArray.length; i++){
        blackEnergyArray[i].update();
        blackEnergyArray[i].draw();

    }
    for (let i = 0; i < blackEnergyArray.length; i++){
        if (blackEnergyArray[i].x < 0 ){
            blackEnergyArray.splice(i, 1);
        }
        if (blackEnergyArray[i].distance < blackEnergyArray[i].radius + player2.radius){
            scoreP2++;
            if (!blackEnergyArray[i].counted){
                blackEnergyArray[i].counted = true;
                blackEnergyArray.splice(i, 1);
            }
        }
    }
}
// Adding players
let player1 = new playersClass; 
let player2 = new playersClass; 

// Adding sprites 
let player1Sprite = new Image();
player1Sprite.src = "docs/images/ninja_black.png";
let player2Sprite = new Image();
player2Sprite.src = "docs/images/ninja_white.png";

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

// Function that animates. Animation stops when time is over.
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
        whiteEnergyHandler();
        blackEnergyHandler();
        gameFrame++;
    }
}
animate(); 
function setPlayers(){
    player1.x = 10;
    player2.x = 100;
    player1.playerColor = "Black";
    console.log(player1.playerColor + ` ninja created!`);
    player2.playerColor = "White";
    console.log(player2.playerColor + ` ninja created!`);
}
setPlayers();

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
// Checks which player has won
function checkWin(){
    if (scoreP1 > scoreP2){
        ctx?.fillText(player1.playerColor + ` ninja wins!`,10, 50);
        win = true;
    }
    else if (scoreP2 > scoreP1){
        ctx?.fillText(player2.playerColor + ` ninja wins!`,650, 50);
        win = true;
    }
}
setInterval(checkWin, 60000);