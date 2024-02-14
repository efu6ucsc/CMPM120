class Load extends Phaser.Scene {
    constructor() {
        super('loadScene')
    }

    preload() {
        this.load.path = './assets/'
        
        //graphics assets
        this.load.image('background', 'img/background.png')
        this.load.image('barrier', 'img/barrier.png')
        this.load.image('title-screen', 'img/title-screen.png')

        //player entity spritesheet
        this.load.spritesheet('orb', 'img/orb.png', {
            frameWidth: 32, 
            frameHeight: 32, 
        })

        //gameover animation spritesheet
        this.load.spritesheet('explosion', 'img/explosion.png', {
            frameWidth: 32,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 8
        })
        
        //audio assets
        this.load.audio('music-background', ['sfx/background.mp3'])
        this.load.audio('sfx-start', ['sfx/start.mp3'])
        this.load.audio('sfx-transition', ['sfx/transition-mode-ping.mp3'])
        this.load.audio('sfx-gameover', ['sfx/gameover.mp3'])
    }

    create() {
        //player entity animation creation
        this.anims.create({
            key: 'player',
            frames: this.anims.generateFrameNumbers('orb', {start: 0, end: 7, first: 0}),
            frameRate: 12
        })

        //create player entity
        this.player = this.physics.add.sprite(width/2, height/2,'orb', 1).setScale(2)
        this.player.body.setCollideWorldBounds(true)

        //set player body size
        this.player.body.setSize(32, 32)

        this.scene.start('menuScene')
    }
}