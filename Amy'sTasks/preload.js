class preload extends Phaser.Scene {

    constructor() {
        super({
            key: 'preload'
        });

        // Put global variable here
    }

    preload() {

        // Preload all the assets here
        this.load.spritesheet('amy', 'assets/amy.png',{ frameWidth:32, frameHeight:64 });
        // Preload any images here
        this.load.image("start","assets/1.jpg");
        // Preload any sound and music here
        this.load.spritesheet('fruit1Img', 'assets/apple.png',{ frameWidth:13, frameHeight:12 });
  this.load.spritesheet('fruit2Img', 'assets/banana.png',{ frameWidth:12, frameHeight:13 });
  this.load.spritesheet('dessert1Img', 'assets/donut.png',{ frameWidth:13, frameHeight:14 });
  this.load.spritesheet('dessert2Img', 'assets/icecream.png',{ frameWidth:15, frameHeight:17 });
  this.load.spritesheet('fastfood1Img', 'assets/fries.png',{ frameWidth:10, frameHeight:12 });
    this.load.spritesheet('fastfood2Img', 'assets/coke.png',{ frameWidth:13, frameHeight:17 });
    
        // this.load.audio('ping', 'assets/ping.mp3');
        // this.load.audio('bgMusic', 'assets/bgMusic.mp3');
    }

    create() {

        console.log('*** preload scene');
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
        // Add any sound and music here
        // ( 0 = mute to 1 is loudest )
        //this.music = this.sound.add('bgMusic').setVolume(0.3) // 10% volume
        this.anims.create({
            key:'apple-anim',
            frames:this.anims.generateFrameNumbers('fruit1Img',
            { start:0, end:1}),
            frameRate:2,
            repeat:-1
        });
        this.anims.create({
          key:'banana-anim',
          frames:this.anims.generateFrameNumbers('fruit2Img',
          { start:0, end:1}),
          frameRate:2,
          repeat:-1
      });
      
      this.anims.create({
        key:'donut-anim',
        frames:this.anims.generateFrameNumbers('dessert1Img',
        { start:0, end:1}),
        frameRate:2,
        repeat:-1
    });
    this.anims.create({
      key:'icecream-anim',
      frames:this.anims.generateFrameNumbers('dessert2Img',
      { start:0, end:1}),
      frameRate:2,
      repeat:-1
  });

   
  this.anims.create({
    key:'fries-anim',
    frames:this.anims.generateFrameNumbers('fastfood1Img',
    { start:0, end:1}),
    frameRate:2,
    repeat:-1
});
this.anims.create({
  key:'coke-anim',
  frames:this.anims.generateFrameNumbers('fastfood2Img',
  { start:0, end:1}),
  frameRate:2,
  repeat:-1
});
        //this.music.play()
        //window.music = this.music
        this.add.image(0, 0, 'start').setOrigin(0,0);
        // Add image and detect spacebar keypress
       

        // Check for spacebar or any key here
        var spaceDown = this.input.keyboard.addKey('SPACE');

        // On spacebar event, call the world scene        
        spaceDown.on('down', function () {
            console.log('Jump to storyline scene');

            this.scene.start('storyline',
                // Optional parameters
                {

                }
            );
        }, this);


        // Add any text in the main page
        //this.add.text(90, 600, 'Press spacebar to continue', {
        //    font: '30px Courier',
         //   fill: '#FFFFFF'
      //  });


        // Create all the game animations here

    }


}