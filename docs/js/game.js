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
        this.x = 200;
        this.y = 200;
        this.width = 200;
        this.height = 200;
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
playerSprite.src = "docs/images/ninja.png";
var background = new Image();
background.src = "docs/images/background.png";
function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) {
    ctx === null || ctx === void 0 ? void 0 : ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}
function animate() {
    ctx === null || ctx === void 0 ? void 0 : ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx === null || ctx === void 0 ? void 0 : ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    drawSprite(playerSprite, 0, 0, player.width, player.height, player.x, player.y, player.width / 2, player.height / 2);
    movePlayer();
    requestAnimationFrame(animate);
}
animate();
window.addEventListener("keydown", function (e) {
    keys[e.keyCode] = true;
    console.log(keys);
});
window.addEventListener("keyup", function (e) {
    delete keys[e.keyCode];
});
function movePlayer() {
    if (keys[38] && player.y > 0) {
        player.y -= player.speed;
    }
    if (keys[37] && player.x > 0) {
        player.x -= player.speed;
    }
    if (keys[40] && player.y < canvas.height - player.height + 90) {
        player.y += player.speed;
    }
    if (keys[39] && player.x < canvas.width - player.width + 100) {
        player.x += player.speed;
    }
}
