class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
        console.log('Play: constructor')
    }

    init(stats) {
        console.log('Play: init')
        this.HP = stats.HP
        this.EXP = stats.EXP
    }

    create() {
        console.log('Play: create')
        console.log(`HP: ${this.HP} EXP: ${this.EXP}`)

        this.scene.add('statsoverlayScene', StatsOverlay, false)
        this.scene.launch('statsoverlayScene')

        this.add.image(0, 0, 'tomato').setOrigin(0).setScale(5) //different scale for each axis -> .setScale(x, y)
    }

    update() {
        //console.log('Play: update')
    }
}