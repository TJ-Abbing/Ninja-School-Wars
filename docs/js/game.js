"use strict";
//Setup
function game() {
}
console.log('JS is running!');
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 500;
var gameFrame = 0;
var scoreP1 = 0;
var scoreP2 = 0;
var win = false;
var keys = [];
// player1 classes
var playersClass = /** @class */ (function () {
    function playersClass() {
        this.x = 0;
        this.y = 300;
        this.width = 143;
        this.height = 405;
        this.frameX = 0;
        this.frameY = 0;
        this.speed = 9;
        this.gravity = 9;
        this.health = 100;
        this.radius = 35;
        console.log('player created!');
    }
    return playersClass;
}());
// White shurikens
var shurikenArrayWhite = [];
var shurikenWhite = /** @class */ (function () {
    function shurikenWhite() {
        this.x = canvas.width + Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = 10;
        this.speed = Math.random() * 5 + 10;
        this.counted = false;
        this.distance = 0;
    }
    shurikenWhite.prototype.update = function () {
        this.x -= this.speed;
        var dx = this.x - player1.x;
        var dy = this.y - player1.y;
        this.distance = Math.sqrt(dx * dx + dy * dy);
    };
    shurikenWhite.prototype.draw = function () {
        ctx === null || ctx === void 0 ? void 0 : ctx.fillStyle = "white";
        ctx === null || ctx === void 0 ? void 0 : ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx === null || ctx === void 0 ? void 0 : ctx.fill();
        ctx === null || ctx === void 0 ? void 0 : ctx.closePath();
        ctx === null || ctx === void 0 ? void 0 : ctx.stroke();
    };
    return shurikenWhite;
}());
function shurikenHandlerWhite() {
    if (gameFrame % 10 == 0) {
        shurikenArrayWhite.push(new shurikenWhite());
    }
    for (var i = 0; i < shurikenArrayWhite.length; i++) {
        shurikenArrayWhite[i].update();
        shurikenArrayWhite[i].draw();
    }
    for (var i = 0; i < shurikenArrayWhite.length; i++) {
        if (shurikenArrayWhite[i].x < 0) {
            shurikenArrayWhite.splice(i, 1);
        }
        if (shurikenArrayWhite[i].distance < shurikenArrayWhite[i].radius + player1.radius) {
            scoreP1++;
            if (!shurikenArrayWhite[i].counted) {
                shurikenArrayWhite[i].counted = true;
                shurikenArrayWhite.splice(i, 1);
            }
        }
    }
}
// Black shurikens
var shurikenArrayBlack = [];
var shurikenBlack = /** @class */ (function () {
    function shurikenBlack() {
        this.x = canvas.width + Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = 10;
        this.speed = Math.random() * 5 + 10;
        this.counted = false;
        this.distance = 0;
    }
    shurikenBlack.prototype.update = function () {
        this.x -= this.speed;
        var dx = this.x - player2.x;
        var dy = this.y - player2.y;
        this.distance = Math.sqrt(dx * dx + dy * dy);
    };
    shurikenBlack.prototype.draw = function () {
        ctx === null || ctx === void 0 ? void 0 : ctx.fillStyle = "black";
        ctx === null || ctx === void 0 ? void 0 : ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx === null || ctx === void 0 ? void 0 : ctx.fill();
        ctx === null || ctx === void 0 ? void 0 : ctx.closePath();
        ctx === null || ctx === void 0 ? void 0 : ctx.stroke();
    };
    return shurikenBlack;
}());
function shurikenHandlerBlack() {
    if (gameFrame % 10 == 0) {
        shurikenArrayBlack.push(new shurikenBlack());
    }
    for (var i = 0; i < shurikenArrayBlack.length; i++) {
        shurikenArrayBlack[i].update();
        shurikenArrayBlack[i].draw();
    }
    for (var i = 0; i < shurikenArrayBlack.length; i++) {
        if (shurikenArrayBlack[i].x < 0) {
            shurikenArrayBlack.splice(i, 1);
        }
        if (shurikenArrayBlack[i].distance < shurikenArrayBlack[i].radius + player2.radius) {
            scoreP2++;
            if (!shurikenArrayBlack[i].counted) {
                shurikenArrayBlack[i].counted = true;
                shurikenArrayBlack.splice(i, 1);
            }
        }
    }
}
var player1 = new playersClass;
var player2 = new playersClass;
// Adding sprites 
var player1Sprite = new Image();
player1Sprite.src = "docs/images/ninja_black.png";
var player2Sprite = new Image();
player2Sprite.src = "docs/images/ninja_white.png";
// let shuriken1Sprite = new Image;
// shuriken1Sprite.src = "docs/images/shuriken1.png";
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
function animate() {
    if (!win) {
        ctx === null || ctx === void 0 ? void 0 : ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx === null || ctx === void 0 ? void 0 : ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        ctx === null || ctx === void 0 ? void 0 : ctx.fillText("points:" + scoreP1, 10, 20);
        ctx === null || ctx === void 0 ? void 0 : ctx.fillText("points:" + scoreP2, 650, 20);
        ctx === null || ctx === void 0 ? void 0 : ctx.font = '20px ariel';
        drawSprite1(player1Sprite, player1.width * player1.frameX, player1.height * player1.frameY, player1.width, player1.height, player1.x, player1.y, player1.width / 2, player1.height / 2);
        drawSprite2(player2Sprite, player2.width * player2.frameX, player2.height * player2.frameY, player2.width, player2.height, player2.x, player2.y, player2.width / 2, player2.height / 2);
        moveplayer1();
        moveplayer2();
        requestAnimationFrame(animate);
        shurikenHandlerWhite();
        shurikenHandlerBlack();
        gameFrame++;
        checkWin();
    }
}
animate();
function setPlayerPositions() {
    player1.x = 50;
    player2.x = 650;
}
setPlayerPositions();
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
        player1.frameX = 0;
        jump1();
    }
    if (keys[83] && player1.y < canvas.height - player1.height + 320) {
        player1.y += player1.speed;
        player1.frameX = 0;
    }
    if (keys[65] && player1.x > 20) {
        player1.x -= player1.speed;
        player1.frameX = 2;
    }
    if (keys[68] && player1.x < canvas.width - player1.width + 60) {
        player1.x += player1.speed;
        player1.frameX = 1;
    }
}
function moveplayer2() {
    if (player2.y < canvas.height - player2.height + 320) {
        player2.y += player2.gravity;
    }
    if (keys[38] && player2.y > 30) {
        player2.frameX = 0;
        jump2();
    }
    if (keys[40] && player2.y < canvas.height - player2.height + 320) {
        player2.y += player2.speed;
        player2.frameX = 0;
    }
    if (keys[37] && player2.x > 20) {
        player2.x -= player2.speed;
        player2.frameX = 2;
    }
    if (keys[39] && player2.x < canvas.width - player2.width + 60) {
        player2.x += player2.speed;
        player2.frameX = 1;
    }
}
var delayInMilliseconds = 100; // Adds a 0.1 second delay untill game stops after a player wins
function checkWin() {
    if (scoreP1 >= 10) {
        ctx === null || ctx === void 0 ? void 0 : ctx.fillText("Black ninja wins!", 10, 50);
        setTimeout(function () {
            win = true;
        }, delayInMilliseconds);
    }
    if (scoreP2 >= 10) {
        ctx === null || ctx === void 0 ? void 0 : ctx.fillText("White ninja wins!", 650, 50);
        setTimeout(function () {
            win = true;
        }, delayInMilliseconds);
    }
}
