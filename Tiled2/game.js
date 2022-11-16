var config = {
    type: Phaser.AUTO,
    // pixel size * tile map size * zoom 
    width: 32 * 30,
    height: 32 * 40,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
 },
    backgroundColor: '#5DBB63',
    pixelArt: true,
    scene: [main, world, room1,room2,room3]
};

var game = new Phaser.Game(config);