//Rocket Prefab
class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)

        scene.add.existing(this) //add object to existing scene
        this.isFiring = false
        this.moveSpeed = 2

        this.sfxShot = scene.sound.add('sfx-shot')
    }

    update() {
        //keyboard movement + rocket left & right movement while firing
        if(keyLEFT.isDown && this.x >= borderUISize + this.width / 2) {
            this.x -= this.moveSpeed;
        } 
        else if(keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width / 2) {
            this.x += this.moveSpeed;
        }

        //mouse movement
        const mouseX = this.scene.input.mousePointer.worldX;
        if(mouseX >= borderUISize + this.width / 2 && mouseX <= game.config.width - borderUISize - this.width / 2) {
            this.x = mouseX - this.width / 2;
        }

        //fire button
        if(Phaser.Input.Keyboard.JustDown(keyFIRE) && !this.isFiring) {
            this.isFiring = true
            this.sfxShot.play()
        }

        //fire button with left click
        if(this.scene.input.activePointer.isDown && !this.isFiring) {
            this.isFiring = true;
            this.sfxShot.play();
        }
        
        //if fired, move up
        if(this.isFiring && this.y >= borderUISize * 3 + borderPadding) {
            this.y -= this.moveSpeed
        }
        
        //reset on miss
        if(this.y <= borderUISize * 3 + borderPadding) {
            this.isFiring = false
            this.y = game.config.height - borderUISize - borderPadding
        }
    }

    //reset rocket to "ground"
    reset() {
        this.isFiring = false
        this.y = game.config.height - borderUISize - borderPadding
    }
}