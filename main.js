var AM = new AssetManager();

function Animation(spriteSheet, frameWidth, frameHeight, sheetWidth, frameDuration, frames, loop, scale) {
    this.spriteSheet = spriteSheet;
    this.frameWidth = frameWidth;
    this.frameDuration = frameDuration;
    this.frameHeight = frameHeight;
    this.sheetWidth = sheetWidth;
    this.frames = frames;
    this.totalTime = frameDuration * frames;
    this.elapsedTime = 0;
    this.loop = loop;
    this.scale = scale;
    this.iterations = 0;
    this.currFrame = 0;
}

Animation.prototype.drawFrame = function (tick, ctx, x, y, row, animating) {
    this.animating = animating;
    this.elapsedTime += tick;
    if (this.loop) {
        if (this.isDone()) {
            this.elapsedTime = 0;
        }
    }

    if(animating) {
      this.currFrame = this.currentFrame();
    } else {
      this.currFrame = 0;
    }

    var xindex = 0;
    var yindex = 0;
    this.row = row;
    xindex = this.currFrame % this.sheetWidth;
    yindex = Math.floor(this.currFrame / this.sheetWidth);

    ctx.drawImage(this.spriteSheet,
                 xindex * this.frameWidth, yindex * this.frameHeight + this.row * this.frameHeight,  // source from sheet
                 this.frameWidth, this.frameHeight,
                 x, y,
                 this.frameWidth * this.scale,
                 this.frameHeight * this.scale);
}

Animation.prototype.currentFrame = function () {
    return Math.floor(this.elapsedTime / this.frameDuration);
}

Animation.prototype.isDone = function () {
    return (this.elapsedTime >= this.totalTime);
}

Animation.prototype.setFrames = function (frames) {
  this.frames = frames;
  this.sheetWidth = frames;
  this.totalTime = this.frameDuration * frames;

}

Animation.prototype.drawSpecifcFrame = function(ctx, x, y, row, col) {
  ctx.drawImage(this.spriteSheet,
               row * this.frameWidth,
               col* this.frameHeight,  // source from sheet
               this.frameWidth, this.frameHeight,
               x, y,
               this.frameWidth * this.scale,
               this.frameHeight * this.scale);
}


// no inheritance
function Background(game, spritesheet, x, y) {
    this.x = x;
    this.y = y;
    this.spritesheet = spritesheet;
    this.game = game;
    this.ctx = game.ctx;
};

Background.prototype.draw = function () {
    this.ctx.drawImage(this.spritesheet,
                   this.x, this.y);
};

Background.prototype.update = function () {
};


//clouds for when sunny
AM.queueDownload("./img/light_clouds/sunny_clouds_1.png");
AM.queueDownload("./img/light_clouds/sunny_clouds_2.png");
AM.queueDownload("./img/light_clouds/sunny_clouds_3.png");
AM.queueDownload("./img/light_clouds/sunny_clouds_4.png");
AM.queueDownload("./img/light_clouds/sunny_clouds_5.png");
AM.queueDownload("./img/light_clouds/sunny_clouds_6.png");
AM.queueDownload("./img/light_clouds/sunny_clouds_7.png");
AM.queueDownload("./img/light_clouds/sunny_clouds_8.png");
AM.queueDownload("./img/light_clouds/sunny_clouds_9.png");
AM.queueDownload("./img/light_clouds/sunny_clouds_10.png");

//clouds when rainy
AM.queueDownload("./img/rain_clouds/rain_clouds_1.png");
AM.queueDownload("./img/rain_clouds/rain_clouds_2.png");
AM.queueDownload("./img/rain_clouds/rain_clouds_3.png");
AM.queueDownload("./img/rain_clouds/rain_clouds_4.png");
AM.queueDownload("./img/rain_clouds/rain_clouds_5.png");
AM.queueDownload("./img/rain_clouds/rain_clouds_6.png");
AM.queueDownload("./img/rain_clouds/rain_clouds_7.png");

//the sun
AM.queueDownload("./img/sun.png");
AM.queueDownload("./img/ground.png");
AM.queueDownload("./img/Tree.png");
AM.queueDownload("./img/Bush_alive.png");
AM.queueDownload("./img/Bush_dead.png");
AM.queueDownload("./img/Grass_alive.png");
AM.queueDownload("./img/Grass_dead.png");





AM.downloadAll(function () {
    var canvas = document.getElementById("gameWorld");
    var ctx = canvas.getContext("2d");

    var gameEngine = new GameEngine();
    gameEngine.init(ctx);
    gameEngine.start();
    var isSunny = false;
    var init = Math.random();
    if (init >.5) {
      isSunny = true;
    }

    //add the sunny clouds
    gameEngine.addEntity(new Sunny_cloud(gameEngine, AM.getAsset("./img/sun.png"), -450, -150, 20));


    gameEngine.addEntity(new Sunny_cloud(gameEngine, AM.getAsset("./img/light_clouds/sunny_clouds_1.png"), -200, -20, 60, isSunny));
    gameEngine.addEntity(new Sunny_cloud(gameEngine, AM.getAsset("./img/light_clouds/sunny_clouds_2.png"), -50, 25, 65, isSunny));
    gameEngine.addEntity(new Sunny_cloud(gameEngine, AM.getAsset("./img/light_clouds/sunny_clouds_3.png"), 100, 100, 70, isSunny));
    gameEngine.addEntity(new Sunny_cloud(gameEngine, AM.getAsset("./img/light_clouds/sunny_clouds_4.png"), 250, 75, 75, isSunny));
    gameEngine.addEntity(new Sunny_cloud(gameEngine, AM.getAsset("./img/light_clouds/sunny_clouds_5.png"), 400, 85, 40, isSunny));
    gameEngine.addEntity(new Sunny_cloud(gameEngine, AM.getAsset("./img/light_clouds/sunny_clouds_6.png"), 550, 0, 45, isSunny));
    gameEngine.addEntity(new Sunny_cloud(gameEngine, AM.getAsset("./img/light_clouds/sunny_clouds_7.png"), 600, 150, 50,isSunny));
    gameEngine.addEntity(new Sunny_cloud(gameEngine, AM.getAsset("./img/light_clouds/sunny_clouds_8.png"), 100, 0, 55, isSunny));
    gameEngine.addEntity(new Sunny_cloud(gameEngine, AM.getAsset("./img/light_clouds/sunny_clouds_9.png"), 250, -30, 60, isSunny));
    gameEngine.addEntity(new Sunny_cloud(gameEngine, AM.getAsset("./img/light_clouds/sunny_clouds_10.png"), 300, 75, 65, isSunny));
    gameEngine.addEntity(new Sunny_cloud(gameEngine, AM.getAsset("./img/light_clouds/sunny_clouds_6.png"), 750, 0, 70, isSunny));

    gameEngine.addEntity(new Sunny_cloud(gameEngine, AM.getAsset("./img/light_clouds/sunny_clouds_7.png"), 1000, 150, 75, isSunny));
    gameEngine.addEntity(new Sunny_cloud(gameEngine, AM.getAsset("./img/light_clouds/sunny_clouds_8.png"), 900, 0, 80, isSunny));
    gameEngine.addEntity(new Sunny_cloud(gameEngine, AM.getAsset("./img/light_clouds/sunny_clouds_9.png"), 800, -40, 85, isSunny));
    gameEngine.addEntity(new Sunny_cloud(gameEngine, AM.getAsset("./img/light_clouds/sunny_clouds_10.png"), 55, 75, 40, isSunny));
    gameEngine.addEntity(new Sunny_cloud(gameEngine, AM.getAsset("./img/light_clouds/sunny_clouds_6.png"), 550, 0, 80, isSunny));
    gameEngine.addEntity(new Sunny_cloud(gameEngine, AM.getAsset("./img/light_clouds/sunny_clouds_7.png"), 600, 130, 75, isSunny));
    gameEngine.addEntity(new Sunny_cloud(gameEngine, AM.getAsset("./img/light_clouds/sunny_clouds_8.png"), 100, 110, 70, isSunny));
    gameEngine.addEntity(new Sunny_cloud(gameEngine, AM.getAsset("./img/light_clouds/sunny_clouds_9.png"), 250, 85, 80, isSunny));
    gameEngine.addEntity(new Sunny_cloud(gameEngine, AM.getAsset("./img/light_clouds/sunny_clouds_10.png"), 300, 30, 45, isSunny));
    gameEngine.addEntity(new Sunny_cloud(gameEngine, AM.getAsset("./img/light_clouds/sunny_clouds_6.png"), 750, 0, 50, isSunny));

    gameEngine.addEntity(new Sunny_cloud(gameEngine, AM.getAsset("./img/light_clouds/sunny_clouds_1.png"), -200, 150, 55, isSunny));
    gameEngine.addEntity(new Sunny_cloud(gameEngine, AM.getAsset("./img/light_clouds/sunny_clouds_2.png"), -50, 330, 45, isSunny));
    gameEngine.addEntity(new Sunny_cloud(gameEngine, AM.getAsset("./img/light_clouds/sunny_clouds_3.png"), 100, 360, 65, isSunny));
    gameEngine.addEntity(new Sunny_cloud(gameEngine, AM.getAsset("./img/light_clouds/sunny_clouds_4.png"), 250, 280, 75, isSunny));
    gameEngine.addEntity(new Sunny_cloud(gameEngine, AM.getAsset("./img/light_clouds/sunny_clouds_5.png"), 400, 423, 55, isSunny));
    gameEngine.addEntity(new Sunny_cloud(gameEngine, AM.getAsset("./img/light_clouds/sunny_clouds_6.png"), 550, 300, 85, isSunny));
    gameEngine.addEntity(new Sunny_cloud(gameEngine, AM.getAsset("./img/light_clouds/sunny_clouds_7.png"), 600, 345, 50,isSunny));
    gameEngine.addEntity(new Sunny_cloud(gameEngine, AM.getAsset("./img/light_clouds/sunny_clouds_8.png"), 100, 200, 45, isSunny));

    gameEngine.addEntity(new Sunny_cloud(gameEngine, AM.getAsset("./img/light_clouds/sunny_clouds_1.png"), -200, 320, 60, isSunny));
    gameEngine.addEntity(new Sunny_cloud(gameEngine, AM.getAsset("./img/light_clouds/sunny_clouds_2.png"), -50, 423, 65, isSunny));
    gameEngine.addEntity(new Sunny_cloud(gameEngine, AM.getAsset("./img/light_clouds/sunny_clouds_3.png"), 100, 280, 70, isSunny));
    gameEngine.addEntity(new Sunny_cloud(gameEngine, AM.getAsset("./img/light_clouds/sunny_clouds_4.png"), 250, 200, 75, isSunny));
    gameEngine.addEntity(new Sunny_cloud(gameEngine, AM.getAsset("./img/light_clouds/sunny_clouds_5.png"), 400, 345, 40, isSunny));
    gameEngine.addEntity(new Sunny_cloud(gameEngine, AM.getAsset("./img/light_clouds/sunny_clouds_6.png"), 550, 300, 45, isSunny));
    gameEngine.addEntity(new Sunny_cloud(gameEngine, AM.getAsset("./img/light_clouds/sunny_clouds_7.png"), 600, 180, 50,isSunny));
    gameEngine.addEntity(new Sunny_cloud(gameEngine, AM.getAsset("./img/light_clouds/sunny_clouds_8.png"), 100, 280, 55, isSunny));
    gameEngine.addEntity(new Sunny_cloud(gameEngine, AM.getAsset("./img/light_clouds/sunny_clouds_9.png"), 250, 260, 60, isSunny));
    gameEngine.addEntity(new Sunny_cloud(gameEngine, AM.getAsset("./img/light_clouds/sunny_clouds_10.png"), 300, 150, 65, isSunny));
    gameEngine.addEntity(new Sunny_cloud(gameEngine, AM.getAsset("./img/light_clouds/sunny_clouds_6.png"), 750, 210, 70, isSunny));
    //Rainclouds
    // gameEngine.addEntity(new Sunny_cloud(gameEngine, AM.getAsset("./img/light_clouds/sunny_clouds_1.png"), -200, -20, 60, isSunny));
    // gameEngine.addEntity(new Sunny_cloud(gameEngine, AM.getAsset("./img/light_clouds/sunny_clouds_2.png"), -50, 25, 65, isSunny));
    // gameEngine.addEntity(new Sunny_cloud(gameEngine, AM.getAsset("./img/light_clouds/sunny_clouds_3.png"), 100, 100, 70, isSunny));
    // gameEngine.addEntity(new Sunny_cloud(gameEngine, AM.getAsset("./img/light_clouds/sunny_clouds_4.png"), 250, 75, 75, isSunny));
    // gameEngine.addEntity(new Sunny_cloud(gameEngine, AM.getAsset("./img/light_clouds/sunny_clouds_5.png"), 400, 85, 40, isSunny));
    // gameEngine.addEntity(new Sunny_cloud(gameEngine, AM.getAsset("./img/light_clouds/sunny_clouds_6.png"), 550, 0, 45, isSunny));
    // gameEngine.addEntity(new Sunny_cloud(gameEngine, AM.getAsset("./img/light_clouds/sunny_clouds_7.png"), 600, 150, 50,isSunny));
    // gameEngine.addEntity(new Sunny_cloud(gameEngine, AM.getAsset("./img/light_clouds/sunny_clouds_8.png"), 100, 0, 55, isSunny));
    // gameEngine.addEntity(new Sunny_cloud(gameEngine, AM.getAsset("./img/light_clouds/sunny_clouds_9.png"), 250, -30, 60, isSunny));
    // gameEngine.addEntity(new Sunny_cloud(gameEngine, AM.getAsset("./img/light_clouds/sunny_clouds_10.png"), 300, 75, 65, isSunny));
    // gameEngine.addEntity(new Sunny_cloud(gameEngine, AM.getAsset("./img/light_clouds/sunny_clouds_6.png"), 750, 0, 70, isSunny));
    // gameEngine.addEntity(new Sunny_cloud(gameEngine, AM.getAsset("./img/light_clouds/sunny_clouds_7.png"), 1000, 150, 75, isSunny));
    // gameEngine.addEntity(new Sunny_cloud(gameEngine, AM.getAsset("./img/light_clouds/sunny_clouds_8.png"), 900, 0, 80, isSunny));
    // gameEngine.addEntity(new Sunny_cloud(gameEngine, AM.getAsset("./img/light_clouds/sunny_clouds_9.png"), 800, -40, 85, isSunny));
    // gameEngine.addEntity(new Sunny_cloud(gameEngine, AM.getAsset("./img/light_clouds/sunny_clouds_10.png"), 55, 75, 40, isSunny));
    // gameEngine.addEntity(new Sunny_cloud(gameEngine, AM.getAsset("./img/light_clouds/sunny_clouds_6.png"), 550, 0, 80, isSunny));
    // gameEngine.addEntity(new Sunny_cloud(gameEngine, AM.getAsset("./img/light_clouds/sunny_clouds_7.png"), 600, 130, 75, isSunny));
    // gameEngine.addEntity(new Sunny_cloud(gameEngine, AM.getAsset("./img/light_clouds/sunny_clouds_8.png"), 100, 110, 70, isSunny));
    // gameEngine.addEntity(new Sunny_cloud(gameEngine, AM.getAsset("./img/light_clouds/sunny_clouds_9.png"), 250, 85, 80, isSunny));
    // gameEngine.addEntity(new Sunny_cloud(gameEngine, AM.getAsset("./img/light_clouds/sunny_clouds_10.png"), 300, 30, 45, isSunny));
    // gameEngine.addEntity(new Sunny_cloud(gameEngine, AM.getAsset("./img/light_clouds/sunny_clouds_6.png"), 750, 0, 50, isSunny));

    gameEngine.addEntity(new Background(gameEngine, AM.getAsset("./img/ground.png"), 0, 536));
    gameEngine.addEntity(new Background(gameEngine, AM.getAsset("./img/Bush_alive.png"), -50, 448));
    gameEngine.addEntity(new Background(gameEngine, AM.getAsset("./img/Tree.png"), 0, 276));
    gameEngine.addEntity(new Background(gameEngine, AM.getAsset("./img/Tree.png"), 700, 276));
    gameEngine.addEntity(new Background(gameEngine, AM.getAsset("./img/Bush_alive.png"), 400, 448));
    gameEngine.addEntity(new Background(gameEngine, AM.getAsset("./img/Bush_alive.png"), 600, 448));
    gameEngine.addEntity(new Background(gameEngine, AM.getAsset("./img/Bush_alive.png"), 300, 448));

    gameEngine.addEntity(new Background(gameEngine, AM.getAsset("./img/Grass_alive.png"), 0, 486));
    gameEngine.addEntity(new Background(gameEngine, AM.getAsset("./img/Grass_alive.png"), 25, 486));
    gameEngine.addEntity(new Background(gameEngine, AM.getAsset("./img/Grass_alive.png"), 100, 486));
    gameEngine.addEntity(new Background(gameEngine, AM.getAsset("./img/Grass_alive.png"), 138, 486));
    gameEngine.addEntity(new Background(gameEngine, AM.getAsset("./img/Grass_alive.png"), 256, 486));
    gameEngine.addEntity(new Background(gameEngine, AM.getAsset("./img/Grass_alive.png"), 491, 486));

    gameEngine.addEntity(new Background(gameEngine, AM.getAsset("./img/Grass_alive.png"), 680, 486));
    gameEngine.addEntity(new Background(gameEngine, AM.getAsset("./img/Grass_alive.png"), 900, 486));
    gameEngine.addEntity(new Background(gameEngine, AM.getAsset("./img/Grass_alive.png"), 750, 486));
    





    console.log("All Done!");
});
