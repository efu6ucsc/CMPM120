//SmallSpaceship Prefab
class SmallSpaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame)

        scene.add.existing(this) //add object to existing scene
        this.points = pointValue
        this.moveSpeed = game.settings.spaceshipSpeed * 1.75 //move faster
    }

    update() {
        this.x -= this.moveSpeed //move spaceship left

        if(this.x <= 0 - this.width) { //wrap from left to right edge
            this.x = game.config.width
        }
    }

    updateSpeed() {
        this.moveSpeed = game.settings.spaceshipSpeed * 1.75 * (this.scene.speedIncreased ? 1.5 : 1);
    }

    reset() { //reset position
        this.x = game.config.width
    }
}
