(function (){

    // General
    var canvas,
        screen,
        gameSize,
        game;


    // Game Controller
    // ---------------
    var Game = function() {

        this.level = -1;
        this.lost = false;
        this.player = new Player();
        this.invaderShots = [];
    }

    Game.prototype = {
        update: function() {
            game.player.update();
        },

        draw: function() {

            screen.clearRect(0, 0, gameSize.width, gameSize.height);
            screen.fillStyle = "white";
            screen.fill();
            screen.beginPath();
            this.player.draw();
            screen.fill();

        },

    };

    // Player
    // ------
    var Player = function() {
        this.active = true;
        this.size = {
            width: 16,
            height: 8
        };
        this.shooterHeat = -3;
        this.coordinates = {
            x: gameSize.width / 2 - (this.size.width / 2) | 0,
            y: gameSize.height - this.size.height * 2
        };

        this.projectile = [];
        this.keyboarder = new KeyController();
    };

    Player.prototype = {
        update: function() {
            for (var i = 0; i < this.projectile.length; i++) this.projectile[i].update();

            if (!this.active) return;

            //move left
            if (this.keyboarder.isDown(this.keyboarder.KEYS.LEFT) && this.coordinates.x > 0) this.coordinates.x -= 4;
            //move right
            else if (this.keyboarder.isDown(this.keyboarder.KEYS.RIGHT) && this.coordinates.x < gameSize.width - this.size.width) this.coordinates.x += 4;
           
            if (this.keyboarder.isDown(this.keyboarder.KEYS.Space)) {
                console.log("do action")
            }
            // if (this.keyboarder.isDown(this.keyboarder.KEYS.Space)) {
            //     this.shooterHeat += 1;
            //     if (this.shooterHeat < 0) {
            //         var projectile = new Projectile({
            //             x: this.coordinates.x + this.size.width / 2 - 1,
            //             y: this.coordinates.y - 1
            //         }, {
            //             x: 0,
            //             y: -7
            //         });
            //         this.projectile.push(projectile);
            //     } else if (this.shooterHeat > 12) this.shooterHeat = -3;
            // } else {
            //     this.shooterHeat = -3;
            // }

        },
        draw: function() {
            if (this.active) {
                screen.rect(this.coordinates.x, this.coordinates.y, this.size.width, this.size.height);
                screen.rect(this.coordinates.x - 2, this.coordinates.y + 2, 20, 6);
                screen.rect(this.coordinates.x + 6, this.coordinates.y - 4, 4, 4);
            }

            for (var i = 0; i < this.projectile.length; i++) this.projectile[i].draw();

        },
        destroy: function() {
            this.active = false;
            game.lost = true;
        }
    };

    // Projectile
    // ------
    var Projectile = function(coordinates, velocity) {
        this.active = true;
        this.coordinates = coordinates;
        this.size = {
            width: 3,
            height: 3
        };
        this.velocity = velocity;
    };

    Projectile.prototype = {
        update: function() {
            this.coordinates.x += this.velocity.x;
            this.coordinates.y += this.velocity.y;

            if (this.coordinates.y > gameSize.height || this.coordinates.y < 0) this.active = false;

        },
        draw: function() {
            if (this.active) screen.rect(this.coordinates.x, this.coordinates.y, this.size.width, this.size.height);
        }
    };

    // Keyboard input tracking
    // -----------------------
    var KeyController = function() {
        this.KEYS = {
            LEFT: 37,
            RIGHT: 39,
            Space: 32
        };
        var keyCode = [37, 39, 32];
        var keyState = {};

        var counter;
        window.addEventListener('keydown', function(e) {
            for (counter = 0; counter < keyCode.length; counter++)
                if (keyCode[counter] == e.keyCode) {
                    keyState[e.keyCode] = true;
                    e.preventDefault();
                }
        });

        window.addEventListener('keyup', function(e) {
            for (counter = 0; counter < keyCode.length; counter++)
                if (keyCode[counter] == e.keyCode) {
                    keyState[e.keyCode] = false;
                    e.preventDefault();
                }
        });

        this.isDown = function(keyCode) {
            return keyState[keyCode] === true;
        };
    };


    // Start game
    // ----------
    window.addEventListener('load', function() {

        var invaderAsset = new Image;
        invaderAsset.src = "https://nextpage.agency/inv.png";
        invaderAsset.onload = function() {

            canvas = document.getElementById("space-invaders");
            screen = canvas.getContext('2d');

            initGameStart();
            loop();

        };

    });

    function initGameStart() {

        screen.canvas.width = 400;
        screen.canvas.height = 12;

        gameSize = {
            width: 400,
            height: 12
        };

        game = new Game();
    }

    function loop() {
        game.update();
        game.draw();
        requestAnimationFrame(loop);
    }

})();