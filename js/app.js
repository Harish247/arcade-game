// Enemies our player must avoid
var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = x;
    this.y = y;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if(this.x > 500){
        this.x = 0;
    }else{
        this.x = this.x + Math.random()*7;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(){
    this.x = 400;
    this.y = 400;
    this.sprite = 'images/char-boy.png'
};

Player.prototype.update = function(key){
    if(key == 'left'){
        this.x = this.x - 100;
        player.render();
    }else if(key == 'right'){
        this.x = this.x + 100;
        player.render();
    }else if(key == 'down'){
        this.y = this.y + 90;
        player.render();
    }else if(key == 'up'){
        this.y = this.y - 90;
        player.render();
    }else{
        this.x = this.x;
        this.y = this.y;
        player.render();
    }
};

Player.prototype.render = function(){
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);  
};

Player.prototype.handleInput = function(inputKey){
    if(inputKey){
        player.update(inputKey);
    }
};

// Now instantiate your objects.
var enemy1 = new Enemy(0,145);
var enemy2 = new Enemy(0,230);
var enemy3 = new Enemy(0,60);

// Place the player object in a variable called player
var player = new Player();
// Place all enemy objects in an array called allEnemies
var allEnemies = [enemy1,enemy2,enemy3];

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
