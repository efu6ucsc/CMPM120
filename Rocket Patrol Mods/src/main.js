/**
Evelyn Fu
Mod Title: Rocket Patrol Plus
Time Taken: ~12 Hours

1-Point Tier
✓ --> Track a high score that persists across scenes and display it in the UI (1)
✓ --> Implement the 'FIRE' UI text from the original game (1)
✓ --> Implement the speed increase that happens after 30 seconds in the original game (1)
✓ --> Create a new scrolling tile sprite for the background (1)
✓ --> Allow the player to control the Rocket after it's fired (1)

3-Point Tier
✓ --> Display the time remaining (in seconds) on the screen (3)
✓ --> Create a new title screen (e.g., new artwork, typography, layout) (3)

5-Point Tier
✓ --> Create a new enemy Spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (5)
✓ --> Implement mouse control for player movement and left mouse click to fire (5)
    ↪ a little buggy, if you hit refresh and not move the mouse you can use arrow keys but if you move the mouse while the game screen is open the rocket will always lock back to where the mouse cursor is

Citations: W3schools, MDN Web Docs
**/

let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [ Menu, Play ]
}

let game = new Phaser.Game(config)

//UI Sizes
let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3

//reserve keyboard bindings
let keyFIRE, keyRESET, keyLEFT, keyRIGHT

//High Score
let highScore = 0;