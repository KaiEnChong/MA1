class room2 extends Phaser.Scene {

    constructor() {
        super({ key: 'room2' });
        
        // Put global variable here
    }


    init(data) {
        this.player = data.player
        this.inventory = data.inventory
    }

    preload() {
        this.load.tilemapTiledJSON("room2", "assets/FruitTiled.tmj");
        
     this.load.image("foodImg", "assets/food.png");
    this.load.image("interiorImg", "assets/interiorFruit.png");
    this.load.image("fruitImg", "assets/roomFruit.png");
   
    }

    create() {
        console.log('*** room2 scene');

        let map = this.make.tilemap({ key: "room2" })

        let foodTiles = map.addTilesetImage("food", "foodImg");
        let interiorTiles = map.addTilesetImage("interiorFruit", "interiorImg");
        let fruitTiles = map.addTilesetImage("roomFruit", "fruitImg");
    
        let tilesArray = [foodTiles,interiorTiles,fruitTiles]

        this.groundLayer = map.createLayer("groundLayer",tilesArray,0,0);
        this.wallLayer = map.createLayer("wallLayer",tilesArray,0,0);
        this.tableLayer = map.createLayer("tableLayer",tilesArray,0,0);
        this.fruitLayer = map.createLayer("fruitLayer",tilesArray,0,0);

        var start = map.findObject("objectLayer",(obj)=> obj.name ==="start")
        var fruit1 = map.findObject("objectLayer",(obj)=> obj.name ==="fruit1")
        var fruit2 = map.findObject("objectLayer",(obj)=> obj.name ==="fruit2")

        this.player = this.physics.add.sprite(start.x, start.y, 'down');
        window.player = this.player
        this.player.setCollideWorldBounds(true);

        this.tableLayer.setCollisionByExclusion(-1,true);
        this.physics.add.collider(this.player,this.tableLayer)
        this.wallLayer.setCollisionByExclusion(-1,true);
        this.physics.add.collider(this.player,this.wallLayer)
        this.fruitLayer.setCollisionByExclusion(-1,true);
        this.physics.add.collider(this.player,this.fruitLayer)




        this.cursors = this.input.keyboard.createCursorKeys();

        // camera follow player
        this.cameras.main.startFollow(this.player);



    }

    update() {

      if ( this.player.x>345 && this.player.x<409 && this.player.y>488 ){
       console.log("world")
      this.world();
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
  }
    }

    world(player, tile) {
        console.log("world function");
        this.scene.start("world")
      } 

}
