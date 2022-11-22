class room3 extends Phaser.Scene {

    constructor() {
        super({ key: 'room3' });
        
        // Put global variable here
    }


    init(data) {
        this.player = data.player
        this.inventory = data.inventory
    }

    preload() {
        this.load.tilemapTiledJSON("room3", "assets/FastFoodTiled.tmj");
        
     this.load.image("foodImg", "assets/food.png");
    this.load.image("interiorImg", "assets/interiorFruit.png");
    this.load.image("fruitImg", "assets/roomFruit.png");
    
    }

    create() {
        console.log('*** room3 scene');

        let map = this.make.tilemap({ key: "room3" })

        let foodTiles = map.addTilesetImage("food", "foodImg");
        let interiorTiles = map.addTilesetImage("interiorFruit", "interiorImg");
        let fruitTiles = map.addTilesetImage("roomFruit", "fruitImg");



        let tilesArray = [foodTiles,interiorTiles,fruitTiles]

        this.groundLayer = map.createLayer("groundLayer",tilesArray,0,0);
        this.wallLayer = map.createLayer("wallLayer",tilesArray,0,0);
        this.tableLayer = map.createLayer("tableLayer",tilesArray,0,0);
        this.fastfoodLayer = map.createLayer("fastfoodLayer",tilesArray,0,0);

  
        var start = map.findObject("objectLayer",(obj)=> obj.name ==="start")
        var fastfood1 = map.findObject("objectLayer",(obj)=> obj.name ==="fastfood1")
        var fastfood2 = map.findObject("objectLayer",(obj)=> obj.name ==="fastfood2")

        this.player = this.physics.add.sprite(start.x, start.y, 'amy').play("front-amy");
        window.player = this.player
        this.player.setCollideWorldBounds(true);

       
        this.fastfood1=this.physics.add.sprite(fastfood1.x,fastfood1.y,'fastfood1Img').play('fries-anim').setScale(1.5)
        this.fastfood2=this.physics.add.sprite(fastfood2.x,fastfood2.y,'fastfood2Img').play('coke-anim').setScale(1.5)

        this.tableLayer.setCollisionByExclusion(-1,true);
        this.physics.add.collider(this.player,this.tableLayer)
        this.wallLayer.setCollisionByExclusion(-1,true);
        this.physics.add.collider(this.player,this.wallLayer)
        this.fastfoodLayer.setCollisionByExclusion(-1,true);
        this.physics.add.collider(this.player,this.fastfoodLayer)

        this.physics.add.overlap(
          this.player,
          this.fastfood1,
          this.collectfastfood1,
          null,
          this
        )
        this.physics.add.overlap(
          this.player,
          this.fastfood2,
          this.collectfastfood2,
          null,
          this
        )

        this.cursors = this.input.keyboard.createCursorKeys();

        // camera follow player
        this.cameras.main.startFollow(this.player);




    }

    update() {

      if ( this.player.x>368 && this.player.x<432 && this.player.y>488){
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
    collectfastfood1(player,item){
      console.log("this.collectfastfood1")
      item.disableBody(true,true)
    }
  
    collectfastfood2(player,item){
      console.log("this.collectfastfood2")
      item.disableBody(true,true)
    }
  
    world(player, tile) {
        console.log("world function");
        this.scene.start("world")
      } 

}
