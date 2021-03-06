'use strict';
//parent object for both enemy and player
var Role = function(x, y) {
    this.x = x;
    this.y = y;
};
// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    Role.call(this, x, y);
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x > 500) {
        this.x = 0;
    } else {
        this.x = this.x + (Math.random() * 200) * dt;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var ScreenScore = function() {
    this.score = 0;
    this.highScore = 0;
};

ScreenScore.prototype.update = function() {
    this.score++;
    if (this.score > this.highScore) {
        this.highScore = this.score;
    }
};

ScreenScore.prototype.render = function() {
    ctx.font = "30px serif";
    ctx.fillStyle = "orange";
    ctx.fillText('Score:' + this.score, 395, 80);
    ctx.fillText('HighScore:' + this.highScore, 10, 80);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

//player class contains player details.
var Player = function() {
    Role.call(this, 400, 400);
    this.sprite = 'images/char-boy.png';
};

//update method will update when ever the keys entered.
Player.prototype.update = function(key) {
    if (key == 'left' && this.x > 0) {
        this.x = this.x - 100;
        this.render();
    } else if (key == 'right' && this.x < 400) {
        this.x = this.x + 100;
        this.render();
    } else if (key == 'down' && this.y < 400) {
        this.y = this.y + 90;
        this.render();
    } else if (key == 'up' && this.y > 30) {
        this.y = this.y - 90;
        if (this.y < 0) {
            this.y = 400;
            this.render();
            score.update();
        } else {
            this.render();
        }
    } else {
        this.x = this.x;
        this.y = this.y;
        this.render();
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(inputKey) {
    if (inputKey) {
        this.update(inputKey);
    }
};

// Now instantiate your objects.
var enemy1 = new Enemy(200, 145);
var enemy2 = new Enemy(0, 230);
var enemy3 = new Enemy(150, 60);
var enemy4 = new Enemy(250, 230);

// Place the player object in a variable called player
var player = new Player();
var score = new ScreenScore();

// Place all enemy objects in an array called allEnemies
var allEnemies = [enemy1, enemy2, enemy3, enemy4];

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});