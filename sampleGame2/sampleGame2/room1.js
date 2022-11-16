class room1 extends Phaser.Scene {

    constructor() {
        super({ key: 'room1' });
        
        // Put global variable here
    }


    init(data) {
        this.player = data.player
        this.inventory = data.inventory
    }

    preload() {
        this.load.tilemapTiledJSON("room1map","assets/DessertTiled.tmj");

        this.load.image("villageImg", "assets/village32x32.png");
        this.load.image("treeImg", "assets/house.png");
        this.load.image("houseImg", "assets/firsttileset.png");




    }

    create() {
        console.log('*** room1 scene');
        
        let map = this.make.tilemap({key:'room1map'});
        let villageTiles = map.addTilesetImage("village32x32", "villageImg");
        let treeTiles = map.addTilesetImage("house", "treeImg");
        let houseTiles = map.addTilesetImage("firsttileset", "houseImg");


        let tilesArray = [villageTiles,treeTiles,houseTiles]

        this.groundLayer = map.createLayer("groundLayer",tilesArray,0,0);
        this.treeLayer = map.createLayer("treeLayer",tilesArray,0,0);
        this.houseLayer = map.createLayer("houseLayer",tilesArray,0,0);

    }

    update() {

    }

    

}
