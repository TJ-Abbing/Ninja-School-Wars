"use strict";
//Setup
console.log('JS is running!');
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 500;
var keys = [];
// player1 classes
var player1Class = /** @class */ (function () {
    function player1Class() {
        this.x = 50;
        this.y = 300;
        this.width = 143;
        this.height = 417;
        this.frameX = 0;
        this.frameY = 0;
        this.speed = 9;
        this.gravity = 5;
        this.health = 100;
        this.moving = false;
        this.jumping = false;
        console.log('player1 1 created!');
    }
    return player1Class;
}());
// player2 classes
var player2Class = /** @class */ (function () {
    function player2Class() {
        this.x = 650;
        this.y = 300;
        this.width = 143;
        this.height = 417;
        this.frameX = 0;
        this.frameY = 0;
        this.speed = 9;
        this.gravity = 5;
        this.health = 100;
        this.moving = false;
        this.jumping = false;
        console.log('player1 2 created!');
    }
    return player2Class;
}());
// Shuriken class
var shurikenClass = /** @class */ (function () {
    function shurikenClass() {
        this.x = 400;
        this.y = 300;
        this.width = 33;
        this.height = 33;
        this.frameX = 0;
        this.frameY = 0;
        this.speed = 9;
        this.right = 9;
        console.log('shuriken created!');
    }
    return shurikenClass;
}());
// Creating players + shuriken
var player1 = new player1Class;
var player2 = new player2Class;
var shuriken = new shurikenClass;
function moveShuriken() {
    shuriken.x += shuriken.right;
}
// Adding sprites 
var player1Sprite = new Image();
player1Sprite.src = "docs/images/ninja_black.png";
var player2Sprite = new Image();
player2Sprite.src = "docs/images/ninja_white.png";
var shurikenSprite = new Image;
shurikenSprite.src = "docs/images/shuriken.png";
// Adding background
var background = new Image();
background.src = "docs/images/background.png";
// Drawing sprites function for players
function drawSprite1(img, sX, sY, sW, sH, dX, dY, dW, dH) {
    ctx === null || ctx === void 0 ? void 0 : ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}
function drawSprite2(img, sX, sY, sW, sH, dX, dY, dW, dH) {
    ctx === null || ctx === void 0 ? void 0 : ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}
function drawSprite3(img, sX, sY, sW, sH, dX, dY, dW, dH) {
    ctx === null || ctx === void 0 ? void 0 : ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}
// Animates background, players and shurikens
function animate() {
    ctx === null || ctx === void 0 ? void 0 : ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx === null || ctx === void 0 ? void 0 : ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
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
window.addEventListener("keydown", function (e) {
    keys[e.keyCode] = true;
});
window.addEventListener("keyup", function (e) {
    delete keys[e.keyCode];
});
// Adding jump for players
function jump1() {
    player1.y -= 30;
}
function jump2() {
    player2.y -= 30;
}
// Adding player controls
function moveplayer1() {
    if (player1.y < canvas.height - player1.height + 320) {
        player1.y += player1.gravity;
    }
    if (keys[87] && player1.y > 30) {
        console.log("player 1 up");
        player1.frameX = 0;
        jump1();
    }
    if (keys[83] && player1.y < canvas.height - player1.height + 320) {
        console.log("player 1 down");
        player1.y += player1.speed;
        player1.frameX = 0;
    }
    if (keys[65] && player1.x > 20) {
        console.log("player 1 left");
        player1.x -= player1.speed;
        player1.frameX = 2;
    }
    if (keys[68] && player1.x < canvas.width - player1.width + 60) {
        console.log("player 1 right");
        player1.x += player1.speed;
        player1.frameX = 1;
    }
}
function moveplayer2() {
    if (player2.y < canvas.height - player2.height + 320) {
        player2.y += player2.gravity;
    }
    if (keys[38] && player2.y > 30) {
        console.log("player 2 up");
        player2.frameX = 0;
        jump2();
    }
    if (keys[40] && player2.y < canvas.height - player2.height + 320) {
        console.log("player 2 down");
        player2.y += player2.speed;
        player2.frameX = 0;
    }
    if (keys[37] && player2.x > 20) {
        console.log("player 2 left");
        player2.x -= player2.speed;
        player2.frameX = 2;
    }
    if (keys[39] && player2.x < canvas.width - player2.width + 60) {
        console.log("player 2 right");
        player2.x += player2.speed;
        player2.frameX = 1;
    }
}
// Players healthbar
var delayInMilliseconds = 200; // 0.1 second delay
setTimeout(function () {
    var healthP1;
    healthP1 = document.getElementById('p1-health');
    healthP1.style.width = player1.health + "%";
    var healthP2;
    healthP2 = document.getElementById('p2-health');
    healthP2.style.width = player2.health + "%";
}, delayInMilliseconds);
