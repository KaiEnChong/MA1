class world extends Phaser.Scene {
  constructor() {
    super("world");
  }

  // incoming data from scene below
  init(data) {}

  preload() {
    // Step 1, load JSON
    this.load.tilemapTiledJSON("worldmap","assets/RafflesklMap.json");

    // this.load.image("road", "assets/road.png");
    this.load.image("kenny","assets/kenny.png");
    this.load.image("pippoya","assets/pippoya.png");
    this.load.image("raffles","assets/rafflesTiless-01.png");
    this.load.image("tree","assets/tree.png");

    this.load.atlas( 'left', 'assets/left.png', 'assets/left.json');
    this.load.atlas( 'right', 'assets/right.png', 'assets/right.json');
    this.load.atlas( 'up', 'assets/up.png', 'assets/up.json');
    this.load.atlas( 'down', 'assets/down.png', 'assets/down.json');

  }

  create() {
    console.log("*** world scene");

    //Step 3 - Create the map from main
    let map = this.make.tilemap({key:'worldmap'}); 

    // Step 4 Load the game tiles
    // 1st parameter is name in Tiled,
    // 2nd parameter is key in Preload
    let kennyTiles = map.addTilesetImage("kenny03", "kenny");
    let rafflesTiles = map.addTilesetImage("raffles01", "raffles");
    let pippoyaTiles = map.addTilesetImage("pippoya05", "pippoya");
    let treeTiles = map.addTilesetImage("tree04", "tree");

    let tilesArray = [ kennyTiles,rafflesTiles, pippoyaTiles,treeTiles ]
    
    // Step 5  Load in layers by layers 
    this.groundLayer = map.createLayer("groundLayer", tilesArray, 0, 0);
    this.decorLayer = map.createLayer("decorLayer", tilesArray, 0, 0);
    this.buildingLayer = map.createLayer("BuildingLayer", tilesArray, 0, 0);

      

  this.anims.create({
      key: 'left',
      frames: [
        { key: 'left', frame: 'left_13'},
        { key: 'left', frame: 'left_14'},
        { key: 'left', frame: 'left_15'},
        { key: 'left', frame: 'left_16'},
        { key: 'left', frame: 'left_17'},
        { key: 'left', frame: 'left_18'},
        { key: 'left', frame: 'left_19'},
        { key: 'left', frame: 'left_20'},
        { key: 'left', frame: 'left_21'},
      ],
      frameRate: 10,
      repeat: -1
    })

    this.anims.create({
      key: 'right',
      frames: [
        { key: 'right', frame: 'right_13'},
        { key: 'right', frame: 'right_14'},
        { key: 'right', frame: 'right_15'},
        { key: 'right', frame: 'right_16'},
        { key: 'right', frame: 'right_17'},
        { key: 'right', frame: 'right_18'},
        { key: 'right', frame: 'right_19'},
        { key: 'right', frame: 'right_20'},
        { key: 'right', frame: 'right_21'}, 
      ],
      frameRate: 10,
      repeat: -1
    })

    this.anims.create({
      key: 'up',
      frames: [
        { key: 'up', frame: 'up-07'},
        { key: 'up', frame: 'up-08'},
        { key: 'up', frame: 'up-09'},
        { key: 'up', frame: 'up-10'},
        { key: 'up', frame: 'up-11'},
        { key: 'up', frame: 'up-12'},
      ],
      frameRate: 10,
      repeat: -1
    })

     this.anims.create({
      key: 'down',
      frames: [
        { key: 'down', frame: 'down-01'},
        { key: 'down', frame: 'down-02'},
        { key: 'down', frame: 'down-03'},
        { key: 'down', frame: 'down-04'},
        { key: 'down', frame: 'down-05'},
        { key: 'down', frame: 'down-06'},
      ],
      frameRate: 10,
      repeat: -1
    })

    this.physics.world.bounds.width = this.groundLayer.width;
    this.physics.world.bounds.height = this.groundLayer.height;

    this.player = this.physics.add.sprite(200, 200, 'down');

    this.player.setCollideWorldBounds(true); // don't go out of the this.map

    // // create the arrow keys
     this.cursors = this.input.keyboard.createCursorKeys();

    // // camera follow player
    this.cameras.main.startFollow(this.player);


    this.decorLayer.setCollisionByExclusion(-1, true)
    this.buildingLayer.setCollisionByExclusion(-1, true)

    this.physics.add.collider(this.player, this.decorLayer);
    this.physics.add.collider(this.player, this.buildingLayer);

  } /////////////////// end of create //////////////////////////////

  update() {

    if (this.cursors.left.isDown) {
      this.player.body.setVelocityX(-200);
      this.player.anims.play("left", true); // walk left
    } 
    else if (this.cursors.right.isDown) {
      this.player.body.setVelocityX(200);
      this.player.anims.play("right", true);
    } else if (this.cursors.up.isDown) {
      this.player.body.setVelocityY(-200);
      this.player.anims.play("up", true);
      //console.log('up');
    } else if (this.cursors.down.isDown) {
      this.player.body.setVelocityY(200);
      this.player.anims.play("down", true);
      //console.log('down');
    } else {
      this.player.anims.stop();
      this.player.body.setVelocity(0, 0);
    }
  } /////////////////// end of update //////////////////////////////

  // Function to jump to room1
  room1(player, tile) {
    console.log("room1 function");
  }
} //////////// end of class world ////////////////////////
