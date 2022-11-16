class world extends Phaser.Scene {
  constructor() {
    super({
      key: "world",
    });

    // Put global variable here
  }

  preload() {
    // Step 1, load JSON
    //this.load.tilemapTiledJSON("world1", "assets/Tutorial1.json");

    this.load.tilemapTiledJSON("world1", "assets/MapTiled.tmj");

    // Step 2 : Preload any images here
    //this.load.image("building", "assets/Buildings32x32.png");
    //this.load.image("street", "assets/Street32x32.png");

    this.load.image("villageImg", "assets/village32x32.png");
    this.load.image("treeImg", "assets/house.png");
    this.load.image("houseImg", "assets/firsttileset.png");


    //amy
  this.load.spritesheet('amy', 'assets/amy.png',{ frameWidth:32, frameHeight:64 });
 
  this.load.audio("sneaky","assets/sneaky.mp3");

}

  create() {
    console.log("*** world scene");

    //Step 3 - Create the map from main
    //let map = this.make.tilemap({ key: "world1" });
this.sneakySnd = this.sound.add('sneaky');
this.sneaky = this.sound.add("sneaky",{loop : true,}).setVolume(0.5)
this.sneaky.stop();
this.sneaky.play();

    let map = this.make.tilemap({ key: "world1" })

    // Step 4 Load the game tiles
    // 1st parameter is name in Tiled,
    // 2nd parameter is key in Preload
    //let buildingTiles = map.addTilesetImage("Buildings32x32", "building");
    //let streetTiles = map.addTilesetImage("Street32x32", "street");

    let villageTiles = map.addTilesetImage("village32x32", "villageImg");
    let treeTiles = map.addTilesetImage("house", "treeImg");
    let houseTiles = map.addTilesetImage("firsttileset", "houseImg");

    // Step 5  create an array of tiles
    // let tilesArray = [
    //   buildingTiles,
    //   streetTiles,
    // ];
    let tilesArray = [villageTiles,treeTiles,houseTiles]


    // Step 6  Load in layers by layers
    //this.groundLayer = map.createLayer("groundLayer",tilesArray,0,0);

    //this.streetLayer = map.createLayer("streetLayer",tilesArray,0,0);

    //this.buildingLayer = map.createLayer("buildingLayer",tilesArray,0,0);

    this.groundLayer = map.createLayer("groundLayer",tilesArray,0,0);
    this.treeLayer = map.createLayer("treeLayer",tilesArray,0,0);
    this.houseLayer = map.createLayer("houseLayer",tilesArray,0,0);
    
    this.physics.world.bounds.width = this.groundLayer.width;
    this.physics.world.bounds.height = this.groundLayer.height;

   this.player = this.physics.add.sprite(660, 1260, 'down');
    window.player = this.player

    this.player.setCollideWorldBounds(true)
    // Add main player here with physics.add.sprite
    console.log("animationScene")

    this.anims.create({
      key:'right-amy',
      frames:this.anims.generateFrameNumbers('amy',
      { start:0, end:2}),
      frameRate:10,
      repeat:-1
  });
  this.anims.create({
      key:'back-amy',
      frames:this.anims.generateFrameNumbers('amy',
      { start:6, end:8}),
      frameRate:10,
      repeat:-1
  });

  this.anims.create({
      key:'front-amy',
      frames:this.anims.generateFrameNumbers('amy',
      { start:3, end:5}),
      frameRate:10,
      repeat:-1
  });

  this.anims.create({
      key:'left-amy',
      frames:this.anims.generateFrameNumbers('amy',
      { start:9, end:12}),
      frameRate:10,
      repeat:-1
  });

//this.add.sprite(660,1260,'amy').play('left-amy')
//this.add.sprite(660,1260,'amy').play('right-amy')
//this.add.sprite(660,1260,'amy').play('front-amy')
//this.add.sprite(660,1200,'amy').play('back-amy')

var startPoint = map.findObject("objectLayer",(obj) => obj.name === "start");

//this.player.setColliderWorldBounds(true);

    // Add time event / movement here
this.treeLayer.setCollisionByExclusion(-1,true);
this.physics.add.collider(this.player,this.treeLayer)
this.houseLayer.setCollisionByExclusion(-1,true);
this.physics.add.collider(this.player,this.houseLayer)
    // get the tileIndex number in json, +1
    //mapLayer.setTileIndexCallback(11, this.room1, this);

    // Add custom properties in Tiled called "mouintain" as bool

    // What will collider witg what layers
    //this.physics.add.collider(mapLayer, this.player);

    // create the arrow keys
    this.cursors = this.input.keyboard.createCursorKeys();

    // camera follow player
    this.cameras.main.startFollow(this.player);
  } /////////////////// end of create //////////////////////////////
//
//
//
//
//
  update() 

  {
    
    if ( this.player.x>440 && this.player.x<480 && this.player.y<368 && this.player.y>350 ){
      console.log("room1")
      this.room1();
    }
    
    if ( this.player.x>241 && this.player.x<304 && this.player.y<1120 && this.player.y>1088 ){
      console.log("room2")
      this.room2();
   }
    
  if ( this.player.x>1074 && this.player.x<1238 && this.player.y<342 && this.player.y>288 ){
  console.log("room3")
    this.room2();
    }
   
    
    if (this.cursors.left.isDown) {
    this.player.body.setVelocityX(-200);
    this.player.anims.play("right-amy", true); // walk left
    
    //console.log('left');
  } else if (this.cursors.right.isDown) {
    this.player.body.setVelocityX(200);
    this.player.anims.play("left-amy", true);
   
    //console.log('right');
  } else if (this.cursors.up.isDown) {
    this.player.body.setVelocityY(-200);
    this.player.anims.play("front-amy", true);
    //console.log('up');
  } else if (this.cursors.down.isDown) {
    this.player.body.setVelocityY(200);
    this.player.anims.play("back-amy", true);
    //console.log('down');
  } else {
    this.player.anims.stop();
    this.player.body.setVelocity(0, 0);
    //console.log('idle');
  }} /////////////////// end of update //////////////////////////////

  room1(player, tile) {
    console.log("room1 function");
    this.scene.start("room1")
  }
  room2(player, tile) {
    console.log("room2 function");
    this.scene.start("room2")
  }
  room3(player, tile) {
    console.log("room3 function");
    this.scene.start("room3")
  }

} //////////// end of class world ////////////////////////
