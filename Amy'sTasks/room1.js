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
        this.load.tilemapTiledJSON("room1", "assets/DessertTiled.tmj");
        
     this.load.image("foodImg", "assets/food.png");
    this.load.image("interiorImg", "assets/interiorFruit.png");
    this.load.image("fruitImg", "assets/roomFruit.png");
   
   
   
    }

    create() {
        console.log('*** room1 scene');

        let map = this.make.tilemap({ key: "room1" })

        let foodTiles = map.addTilesetImage("food", "foodImg");
        let interiorTiles = map.addTilesetImage("interiorFruit", "interiorImg");
        let fruitTiles = map.addTilesetImage("roomFruit", "fruitImg");

        let tilesArray = [foodTiles,interiorTiles,fruitTiles]

        this.groundLayer = map.createLayer("groundLayer",tilesArray,0,0);
        this.wallLayer = map.createLayer("wallLayer",tilesArray,0,0);
        this.tableLayer = map.createLayer("tableLayer",tilesArray,0,0);
        this.dessertLayer = map.createLayer("dessertLayer",tilesArray,0,0);

 
        var start = map.findObject("objectLayer",(obj)=> obj.name ==="start")
        var dessert1 = map.findObject("objectLayer",(obj)=> obj.name ==="dessert1")
        var dessert2 = map.findObject("objectLayer",(obj)=> obj.name ==="dessert2")

        this.player = this.physics.add.sprite(start.x, start.y, 'amy').play("front-amy");
        window.player = this.player
        this.player.setCollideWorldBounds(true);



        this.dessert1=this.physics.add.sprite(dessert1.x,dessert1.y,'desset1Img').play('donut-anim').setScale(1.5)
        this.dessert2=this.physics.add.sprite(dessert2.x,dessert2.y,'dessert2Img').play('icecream-anim').setScale(1.5)

       this.tableLayer.setCollisionByExclusion(-1,true);
       this.physics.add.collider(this.player,this.tableLayer)
        this.wallLayer.setCollisionByExclusion(-1,true);
        this.physics.add.collider(this.player,this.wallLayer)
        this.dessertLayer.setCollisionByExclusion(-1,true);
        this.physics.add.collider(this.player,this.dessertLayer)


        this.physics.add.overlap(
          this.player,
          this.dessert1,
          this.collectdessert1,
          null,
          this
        )
        this.physics.add.overlap(
          this.player,
          this.dessert2,
          this.collectdessert2,
          null,
          this
        )

        this.cursors = this.input.keyboard.createCursorKeys();

        // camera follow player
        this.cameras.main.startFollow(this.player);

    }

    update() {

      if ( this.player.x>380 && this.player.x<440 && this.player.y>440 ){
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

    collectdessert1(player,item){
      console.log("this.collectdessert1")
      item.disableBody(true,true)
    }

    collectdessert2(player,item){
      console.log("this.collectdessert2")
      item.disableBody(true,true)
    }

    world(player, tile) {
        console.log("world function");
        this.scene.start("world")
      } 

}
