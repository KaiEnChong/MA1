class room2 extends Phaser.Scene {

  constructor() {
      super({ key: 'room2' });
      this.foodcounter=0
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

      this.player = this.physics.add.sprite(start.x, start.y, 'amy').play("front-amy");
      window.player = this.player
      this.player.setCollideWorldBounds(true);


      

      this.fruit1=this.physics.add.sprite(fruit1.x,fruit1.y,'fruit1Img').play('apple-anim').setScale(3)
      this.fruit2=this.physics.add.sprite(fruit2.x,fruit2.y,'fruit2Img').play('banana-anim').setScale(3)

     this.tableLayer.setCollisionByExclusion(-1,true);
     this.physics.add.collider(this.player,this.tableLayer)
      this.wallLayer.setCollisionByExclusion(-1,true);
      this.physics.add.collider(this.player,this.wallLayer)
      this.fruitLayer.setCollisionByExclusion(-1,true);
      this.physics.add.collider(this.player,this.fruitLayer)


      this.physics.add.overlap(
        this.player,
        this.fruit1,
        this.collectfruit1,
        null,
        this
      )
      this.physics.add.overlap(
        this.player,
        this.fruit2,
        this.collectfruit2,
        null,
        this
      )

      this.cursors = this.input.keyboard.createCursorKeys();

      // camera follow player
      this.cameras.main.startFollow(this.player);
      this.timedEvent = this.time.addEvent({ delay: 10000, callback: this.gamefinish, callbackScope: this, loop: false });

  }

  update() {

   if ( this.player.x>348 && this.player.x<412 && this.player.y>481 ){
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

  collectfruit1(player,item){
    console.log("this.collectfruit1")
    item.disableBody(true,true)
    this.foodcounter++
  }

  collectfruit2(player,item){
    console.log("this.collectfruit2")
    item.disableBody(true,true)
    this.foodcounter++
  }

  world(player, tile) {
      console.log("world function");
      this.scene.start("world")
}
gamefinish(){

  console.log("checkforoneminute",this.foodcounter)
if(this.foodcounter>=2){
console.log("jumptowinscene")
this.scene.start("win")
}else{
console.log("jumptolosescene")
this.scene.start("lose")
}
}
}
