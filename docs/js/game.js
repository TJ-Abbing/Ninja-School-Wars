"use strict";
console.log('JS is running!');
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 500;
var keys = [];
// Player classes
var playerClass = /** @class */ (function () {
    function playerClass() {
        this.x = 0;
        this.y = 0;
        this.width = 100;
        this.height = 100;
        this.frameX = 0;
        this.frameY = 0;
        this.speed = 9;
        this.moving = false;
        console.log('Player 1 created!');
    }
    return playerClass;
}());
var player = new playerClass;
var playerSprite = new Image();
playerSprite.src = "doc/image/ninja.png";
var background = new Image();
background.src = "docs/images/background.png";
function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) {
    ctx === null || ctx === void 0 ? void 0 : ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}
function animate() {
    ctx === null || ctx === void 0 ? void 0 : ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx === null || ctx === void 0 ? void 0 : ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    drawSprite(playerSprite, 0, 0, player.width, player.height, 0, 0, player.width, player.height);
    requestAnimationFrame(animate);
}
animate();
