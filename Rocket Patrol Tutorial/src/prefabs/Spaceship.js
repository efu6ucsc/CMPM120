//Spaceship Prefab
class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame)

        scene.add.existing(this) //add object to existing scene
        this.points = pointValue
        this.moveSpeed = game.settings.spaceshipSpeed
    }

    update() {
        this.x -= this.moveSpeed //move spaceship left

        if(this.x <= 0 - this.width) { //wrap from left to right edge
            this.x = game.config.width
        }
    }

    reset() { //reset position
        this.x = game.config.width
    }
}