class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene")
    }

    preload() {
        //load images / tile sprites
        this.load.image('rocket', './assets/rocket.png')
        this.load.image('spaceship', './assets/spaceship.png')
        this.load.image('starfield', './assets/starfield.png')

        this.load.image('floor', './assets/new-tile.png') //additional tile modifier
        this.load.image('small-spaceship', './assets/small-spaceship.png') //new spaceship
        this.load.image('title-background', './assets/title-background.png')

        //load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {
            frameWidth: 32,
            frameHeight: 32,
            startFrame:0,
            endFrame: 9
        })

        //small spaceship explosion animation spritesheet
        this.load.spritesheet('small-explosion', './assets/small-explosion.png', {
            frameWidth: 24,
            frameHeight: 16,
            startFrame: 0,
            endFrame: 6
        })

        //load audio
        this.load.audio('sfx-select', './assets/sfx-select.wav')
        this.load.audio('sfx-explosion', './assets/sfx-explosion.wav')
        this.load.audio('sfx-shot', './assets/sfx-shot.wav')
    }

    create() {
        //animation configuration
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', {start: 0, end: 9, first: 0}),
            frameRate: 30
        })

        this.anims.create({
            key: 'small-explode',
            frames: this.anims.generateFrameNumbers('small-explosion', {start: 0, end: 6, first: 0}),
            frameRate: 30
        })

        let menuConfig = {
            fontFamily: 'Georgia',
            fontSize: '28px',
            color: '#B3D9FF',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        this.add.image(game.config.width / 2, game.config.height / 2, 'title-background').setOrigin(0.5);
        /* 
        original title screen:
        this.add.text(game.config.width / 2, game.config.height / 2 - borderUISize - borderPadding, 'ROCKET PATROL', menuConfig).setOrigin(0.5)
        this.add.text(game.config.width / 2, game.config.height / 2, 'Use ←→ arrows to move & [F] to fire', menuConfig).setOrigin(0.5)
        menuConfig.backgroundColor = '#FEC196'
        menuConfig.color = '#885053'
        this.add.text(game.config.width / 2, game.config.height / 2 + borderUISize + borderPadding, 'Press ← for Novice or → for Expert', menuConfig).setOrigin(0.5)
        */

        //define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)

        this.add.text(borderUISize + borderPadding, borderUISize + borderPadding, 'High Score: ' + highScore, menuConfig).setOrigin(0);
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            //easy mode
            game.settings = {
                spaceshipSpeed: 3,
                gameTimer: 60000
            }
            this.sound.play('sfx-select')
            this.scene.start('playScene')
        }
        if(Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            //hard mode
            game.settings = {
                spaceshipSpeed: 4,
                gameTimer: 45000
            }
            this.sound.play('sfx-select')
            this.scene.start('playScene')
        }
    }
}