'use strict';
// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images

    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = 6;

};

//To update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // Multiplying any movement by the dt parameter ensures the game runs at the same speed for all computers.

    this.x = this.x + Math.random() * this.speed;
    if (this.x > 401) {
        this.x = 0;
    }
    this.area = {
        'x': this.x + 5,
        'y': this.y + 65,
        'xWidth': 75,
        'yHeight': 65
    };


};


//To Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Player's class definition
var Player = function() {

    this.sprite = 'images/char-cat-girl.png';
    this.win = 'images/Star.png';
    this.x = 200;
    this.y = 400;

};


// This function is used to move the player back in initial place
Player.prototype.reset = function() {

    this.x = 200;
    this.y = 400;
};

// This function is to display the player
Player.prototype.render = function() {

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};



//This is for player movement
Player.prototype.handleInput = function(direction) {

    if (direction === 'up') {
        if (this.y === 0) {
            this.y = 0;
            var ctx = document.getElementById('canvas').getContext('2d');
            ctx.font = '40px Georgia';
            var gradient = ctx.createLinearGradient(0, 0, document.getElementById('canvas').width, 0);
            gradient.addColorStop("0", "magenta");
            gradient.addColorStop("0.5", "blue");
            gradient.addColorStop("1.0", "red");
            // Fill with gradient
            ctx.fillStyle = gradient;
            ctx.drawImage(Resources.get(this.win), 10, 10);
            ctx.drawImage(Resources.get(this.sprite), 80, 10);
            ctx.drawImage(Resources.get(this.win), 150, 10);
            ctx.fillText("You Won! :) ", 40, 30);
            this.reset();

        } else {
            this.y -= 80;
        }
    }


    if (direction === 'down') {
        if (this.y === 400) {
            this.y = 400;
        } else {
            this.y += 80;
        }
    }

    if (direction === 'right') {

        if (this.x === 400 && (this.y === 400 || this.y === 320 || this.y === 240 || this.y === 160 || this.y === 80 || this.y === 0)) {
            this.x = 400;
        } else {
            this.x += 100;
        }
    }

    if (direction === 'left') {
        if (this.x === 0 && (this.y === 400 || this.y === 320 || this.y === 240 || this.y === 160 || this.y === 80 || this.y === 0)) {
            this.x = 0;
        } else {
            this.x -= 100;
        }
    }


};

Player.prototype.update = function() {
   
    this.area = {
        'x': this.x + 5,
        'y': this.y + 65,
        'xWidth': 75,
        'yHeight': 65
    };
    this.checkCollision();
};


//A function for checking collision between player and enemy bugs
Player.prototype.checkCollision = function() {

    var playerArea = this.area;
    for (var i = 0; i < allEnemies.length; i++) {
        var enemyArea = allEnemies[i].area;
        if (enemyArea.x + enemyArea.xWidth > playerArea.x &&
            enemyArea.x < playerArea.x + playerArea.xWidth &&
            enemyArea.y + enemyArea.yHeight > playerArea.y &&
            enemyArea.y < playerArea.y + playerArea.yHeight) {
            this.reset();

        }
    }
};

// Instantiating objects.
// all enemy objects in an array called allEnemies
var enemy1 = new Enemy(0, 50);
var enemy2 = new Enemy(0, 130);
var enemy3 = new Enemy(0, 210);
var allEnemies = [enemy1, enemy2, enemy3];

// The player object in a variable called player
var player = new Player();

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'

    };

    player.handleInput(allowedKeys[e.keyCode]);
});