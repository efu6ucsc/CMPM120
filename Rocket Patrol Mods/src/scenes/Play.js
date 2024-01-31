class Play extends Phaser.Scene {
    constructor() { //creating and initializing an object
        super("playScene") //call the constructor of its super class
    }

    create() { //add.rectangle(): add rectangle to scene; x-coord, y-coord, width, height, and color
        //place tile sprite
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0)
        //add new-tile sprite
        this.floor = this.add.tileSprite(0, game.config.height - 32, game.config.width, 32, 'floor').setOrigin(0, 1).setScrollFactor(0);

        //green UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x587D71).setOrigin(0, 0)
        //white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0)
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0)
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0)
        
        //add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width / 2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0)
        
        //add spaceships (x3)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize * 6, borderUISize * 4, 'spaceship', 0, 30).setOrigin(0, 0)
        this.ship02 = new Spaceship(this, game.config.width + borderUISize * 3, borderUISize * 5 + borderPadding * 2, 'spaceship', 0, 20).setOrigin(0, 0)
        this.ship03 = new Spaceship(this, game.config.width, borderUISize * 6 + borderUISize * 4, 'spaceship', 0, 10).setOrigin(0, 0)

        //new smaller spaceship modifier
        this.ship04 = new SmallSpaceship(this, game.config.width + borderUISize * 6, borderUISize * 8, 'small-spaceship', 0, 50).setOrigin(0, 0)

        //define keys
        keyFIRE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F)
        keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
        
        //initialize score
        this.p1Score = 0
        //display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#B5DDA4',
            color: '#4DAA57',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding * 2, this.p1Score, scoreConfig)
        
        //FIRE text
        let fireTextConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            color: '#CC4210',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        };

        this.fireText = this.add.text(game.config.width / 2, borderUISize + borderPadding * 2, 'FIRE', fireTextConfig).setOrigin(1.25, 0);
        this.fireText.setVisible(false); //initially hide FIRE text

        //initialize 30s timer
        this.speedIncreaseTimer = this.time.delayedCall(30000, () => {
            this.speedIncreased = true; //speed increase set to true after 30s
        }, null, this);

        //game over text config
        let gameOverConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#96BBBB',
            color: '#618985',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 400
        }
        //GAME OVER flag
        this.gameOver = false

        //restart/menu text config
        let restartMenuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#96BBBB',
            color: '#618985',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 400
        }

        //countdown timer
        let timerConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F9ECCC',
            color: '#4DAA57',
            align: 'left',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 250
        }
        this.timerText = this.add.text(game.config.width - borderUISize, borderUISize + borderPadding * 2, ' Time Left: ' + Math.floor(game.settings.gameTimer / 1000), timerConfig).setOrigin(1.05, 0)

        //60-second play clock
        this.clock = this.time.delayedCall(0, () => {
            this.clock = this.time.addEvent({
                delay: game.settings.gameTimer,
                loop: false,
                callback: () => {
                    this.add.text(game.config.width / 2, game.config.height / 2, 'GAME OVER', gameOverConfig).setOrigin(0.5)
                    this.add.text(game.config.width / 2, game.config.height / 2 + 64, 'Press [R] to Restart\n or ← for Menu', restartMenuConfig).setOrigin(0.5)
                    this.gameOver = true
                }
            })
        }, null, this)

        /**original 60-second play clock code
        scoreConfig.fixedWidth = 0
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width / 2, game.config.height / 2, 'GAME OVER', scoreConfig).setOrigin(0.5)
            this.add.text(game.config.width / 2, game.config.height / 2 + 64, 'Press [R] to Restart or ← for Menu', scoreConfig).setOrigin(0.5)
            this.gameOver = true
        }, null, this)
        **/

    }

    update(){
        //check key input for restart
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyRESET)) {
            this.scene.restart()
        }

        this.starfield.tilePositionX -= 4
        this.floor.tilePositionX -= 4

        this.fireText.setVisible(this.p1Rocket.isFiring); //toggle FIRE text visbility

        if(!this.gameOver) {
            this.p1Rocket.update() //update rocket sprite
            this.ship01.update() //update spaceships
            this.ship02.update()
            this.ship03.update()
            this.ship04.update()
        }
        
        //update spaceship speeds after 30s
        if (this.speedIncreased) {
            this.ship01.updateSpeed();
            this.ship02.updateSpeed();
            this.ship03.updateSpeed();
            this.ship04.updateSpeed();
        }

        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene")
        }

        //update countdown timer
        this.timerText.text = ' Time Left: ' + Math.floor(game.settings.gameTimer / 1000 - this.clock.getElapsed() / 1000)

        //check collisions
        if(this.checkCollision(this.p1Rocket, this.ship04)) {
            this.p1Rocket.reset()
            this.shipExplode(this.ship04)
        }
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset()
            this.shipExplode(this.ship03)
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset()
            this.shipExplode(this.ship02)
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset()
            this.shipExplode(this.ship01)
        }

        if (this.p1Score > highScore) {
            highScore = this.p1Score;
        }

    }

    checkCollision(rocket, ship) {
        //simple AABB checking
        if(rocket.x < ship.x + ship.width &&
            rocket.x + rocket.width > ship.x &&
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship.y) {
                return true
        }
        else {
            return false
        }
    }

    shipExplode(ship) {
        ship.alpha = 0 //temporarily hide ship
        
        //create explosion sprite at ship position
        //original code: let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        //modifier w/ new spaceship
        let boom
            if (ship.texture.key === 'spaceship') {
                boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
                boom.anims.play ('explode') //play animation
            } 
            else if (ship.texture.key === 'small-spaceship') {
                boom = this.add.sprite(ship.x, ship.y, 'small-explosion').setOrigin(0, 0);
                boom.anims.play ('small-explode') //play animation
            }

        boom.on('animationcomplete', () => { //callback after animation completes
            ship.reset() //reset ship position
            ship.alpha = 1 //make ship visible again
            boom.destroy() //remove explosion sprite
        })
        
        //score add and text update
        this.p1Score += ship.points
        this.scoreLeft.text = this.p1Score

        this.sound.play('sfx-explosion')
    }
}