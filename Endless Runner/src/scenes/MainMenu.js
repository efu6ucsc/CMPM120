class MainMenu extends Phaser.Scene {
    constructor() {
        super('menuScene')
    }
    create() {
        this.add.image(game.config.width / 2, game.config.height / 2, 'title-screen').setOrigin(0.5)
        //set up cursor keys
        cursors = this.input.keyboard.createCursorKeys();  
    }

    update() {
        //check for [Space] input
        if (Phaser.Input.Keyboard.JustDown(cursors.space)) {
            //start play scene
            this.sound.play('sfx-start')
            this.scene.start('playScene')
        }
    }
}