// Code Practice: Making a Scene
// Name: Evelyn Fu
// Date: Jan. 17, 2023

"use strict"

let config = {
    type: Phaser.AUTO,
    render: {
//      !! scale pixel art up with crisp lines !!
        pixelArt: true
    },
    scene: [ MainMenu, Play ]
}

let game = new Phaser.Game(config)