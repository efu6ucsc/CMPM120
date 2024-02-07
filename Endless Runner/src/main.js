/**
Evelyn Fu
Mod Title: Endless Runner
Time Taken: 
Creative Tilt Justification: 

Organization (3 points)
* Submit a link to your GitHub repository that shows a history of multiple meaningful commits with descriptive messages (1)
* Submit a playable link on GitHub pages (1)
* In main.js (or equivalent), include a comment header with your name, game title, approximate hours spent on project, and your creative tilt justification (see below) (1)

Structure and Design (15 points)
Your game should:
* Use multiple Scene classes (dictated by your game's style) (1)
* Properly transition between Scenes and allow the player to restart w/out having to reload the page (1)
* Include in-game instructions using text or other means (e.g., tooltips, tutorial, diagram, etc.) (1)
* Have some form of player input/control appropriate to your game design (1)
* Include one or more animated characters that use a texture atlas* (1)
* Simulate scrolling with a tileSprite (or equivalent means) (1)
* Implement proper collision detection (via Arcade Physics or a custom routine) (1)
* Have looping background music* (1)
* Use a minimum of four sound effects for key mechanics, UI, and/or significant events appropriate to your game design (1)
* Use randomness to generate escalating challenge, e.g. terrain, pickups, etc. (1)
* Include some metric of accomplishment that a player can improve over time, e.g., score, survival time, etc. (1)
* Be theoretically endless (1)
* Be playable for at least 15 seconds for a new player of low to moderate skill (1)
* Run without significant crashes or errors (1)
* Include in-game credits for all roles, assets, music, etc. (1)

** You must make all of your own visual assets (without AI assistance). It's OK to use royalty-free music/SFX.

Creative Tilt (2 points)
Does your game...
* ...do something technically interesting? Are you particularly proud of a programming technique you implemented? Did you look beyond the class examples and learn how to do something new? (1)
* ...have a great visual style? Does it use music or art that you're particularly proud of? Are you trying something new or clever with the endless runner form? (1)
**/

let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [ Menu, Play ]
}

let game = new Phaser.Game(config)