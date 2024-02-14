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
        this.anims.create({
            key: 'player',
            frames: this.anims.generateFrameNumbers('orb', {start: 0, end: 7, first: 0}),
            frameRate: 12
        })
    }
}