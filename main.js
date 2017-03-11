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

function Bush(game, spritesheet, x, y) {
  this.x = x;
  this.y = y;
  this.bushLiving = spritesheet;
  this.bushDead = AM.getAsset("./img/Bush_dead.png")
  this.game = game;
  this.ctx = game.ctx;
};

Bush.prototype.draw = function () {
  if(this.dead) {
    this.ctx.drawImage(this.bushDead,
                   this.x, this.y + 20);
  } else {
    this.ctx.drawImage(this.bushLiving,
                   this.x, this.y);
  }
};

Bush.prototype.update = function () {
  if(this.game.drought) {
    this.dead = true;
  } else{
    this.dead = false;
  }
};

function Grass(game, spritesheet, x, y) {
    this.x = x;
    this.y = y;
    this.grassLiving = spritesheet;
    this.grassDead = AM.getAsset("./img/Grass_dead.png")
    this.game = game;
    this.ctx = game.ctx;
};

Grass.prototype.draw = function () {
    if(this.dead) {
      this.ctx.drawImage(this.grassDead,
                     this.x, this.y);
    } else {
      this.ctx.drawImage(this.grassLiving,
                     this.x, this.y);
    }
};

Grass.prototype.update = function () {
  if(this.game.drought) {
    this.dead = true;
  } else{
    this.dead = false;
  }
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
AM.queueDownload("./img/Rain.png");





AM.downloadAll(function () {
    var canvas = document.getElementById("gameWorld");
    var ctx = canvas.getContext("2d");

    var gameEngine = new GameEngine();
    gameEngine.init(ctx);
    gameEngine.start();






    //add the sunny clouds
    gameEngine.addEntity(new Sun(gameEngine, AM.getAsset("./img/sun.png"), -450, -150, 100));
    gameEngine.updateDay = true;
    gameEngine.sunCreated = true;
    var count = 0;
    gameEngine.addEntity(new Sunny_cloud(gameEngine, AM.getAsset("./img/light_clouds/sunny_clouds_1.png"), -170, -20, 60 + (count * 2)));
    gameEngine.addEntity(new Sunny_cloud(gameEngine, AM.getAsset("./img/light_clouds/sunny_clouds_2.png"), -20, 25, 65 + (count * 2)));
    gameEngine.addEntity(new Sunny_cloud(gameEngine, AM.getAsset("./img/light_clouds/sunny_clouds_3.png"), 130, 100, 70 + (count * 2)));
    gameEngine.addEntity(new Sunny_cloud(gameEngine, AM.getAsset("./img/light_clouds/sunny_clouds_4.png"), 280, 75, 75 + (count * 2)));
    gameEngine.addEntity(new Sunny_cloud(gameEngine, AM.getAsset("./img/light_clouds/sunny_clouds_5.png"), 430, 85, 40 + (count * 2)));
    gameEngine.addEntity(new Sunny_cloud(gameEngine, AM.getAsset("./img/light_clouds/sunny_clouds_6.png"), 580, 0, 45 + (count * 2)));
    gameEngine.addEntity(new Sunny_cloud(gameEngine, AM.getAsset("./img/light_clouds/sunny_clouds_7.png"), 630, 150, 50 + (count * 2)));
    gameEngine.addEntity(new Sunny_cloud(gameEngine, AM.getAsset("./img/light_clouds/sunny_clouds_8.png"), 130, 0, 55 + (count * 2)));
    gameEngine.addEntity(new Sunny_cloud(gameEngine, AM.getAsset("./img/light_clouds/sunny_clouds_9.png"), 280, -30, 60 + (count * 2)));
    gameEngine.addEntity(new Sunny_cloud(gameEngine, AM.getAsset("./img/light_clouds/sunny_clouds_10.png"), 330, 75, 65 + (count * 2)));
    gameEngine.addEntity(new Sunny_cloud(gameEngine, AM.getAsset("./img/light_clouds/sunny_clouds_6.png"), 780, 0, 70 + (count * 2)));

    gameEngine.addEntity(new Sunny_cloud(gameEngine, AM.getAsset("./img/light_clouds/sunny_clouds_7.png"), 1030, 150, 75 + (count * 2)));
    gameEngine.addEntity(new Sunny_cloud(gameEngine, AM.getAsset("./img/light_clouds/sunny_clouds_8.png"), 930, 0, 80 + (count * 2)));
    gameEngine.addEntity(new Sunny_cloud(gameEngine, AM.getAsset("./img/light_clouds/sunny_clouds_9.png"), 830, -40, 85 + (count * 2)));
    gameEngine.addEntity(new Sunny_cloud(gameEngine, AM.getAsset("./img/light_clouds/sunny_clouds_10.png"), 85, 75, 40 + (count * 2)));
    gameEngine.addEntity(new Sunny_cloud(gameEngine, AM.getAsset("./img/light_clouds/sunny_clouds_6.png"), 580, 0, 80 + (count * 2)));
    gameEngine.addEntity(new Sunny_cloud(gameEngine, AM.getAsset("./img/light_clouds/sunny_clouds_7.png"), 630, 130, 75 + (count * 2)));
    gameEngine.addEntity(new Sunny_cloud(gameEngine, AM.getAsset("./img/light_clouds/sunny_clouds_8.png"), 130, 110, 70 + (count * 2)));
    gameEngine.addEntity(new Sunny_cloud(gameEngine, AM.getAsset("./img/light_clouds/sunny_clouds_9.png"), 280, 85, 80 + (count * 2)));
    gameEngine.addEntity(new Sunny_cloud(gameEngine, AM.getAsset("./img/light_clouds/sunny_clouds_10.png"), 330, 30, 45 + (count * 2)));
    gameEngine.addEntity(new Sunny_cloud(gameEngine, AM.getAsset("./img/light_clouds/sunny_clouds_6.png"), 780, 0, 50 + (count * 2)));

    gameEngine.addEntity(new Sunny_cloud(gameEngine, AM.getAsset("./img/light_clouds/sunny_clouds_1.png"), -170, 150, 55 + (count * 2)));
    gameEngine.addEntity(new Sunny_cloud(gameEngine, AM.getAsset("./img/light_clouds/sunny_clouds_2.png"), -20, 330, 45 + (count * 2)));//
    gameEngine.addEntity(new Sunny_cloud(gameEngine, AM.getAsset("./img/light_clouds/sunny_clouds_3.png"), 130, 360, 65 + (count * 2)));
    gameEngine.addEntity(new Sunny_cloud(gameEngine, AM.getAsset("./img/light_clouds/sunny_clouds_4.png"), 280, 280, 75 + (count * 2)));
    gameEngine.addEntity(new Sunny_cloud(gameEngine, AM.getAsset("./img/light_clouds/sunny_clouds_5.png"), 430, 423, 55 + (count * 2)));
    gameEngine.addEntity(new Sunny_cloud(gameEngine, AM.getAsset("./img/light_clouds/sunny_clouds_6.png"), 580, 300, 85 + (count * 2)));
    gameEngine.addEntity(new Sunny_cloud(gameEngine, AM.getAsset("./img/light_clouds/sunny_clouds_7.png"), 630, 345, 50 + (count * 2)));
    gameEngine.addEntity(new Sunny_cloud(gameEngine, AM.getAsset("./img/light_clouds/sunny_clouds_8.png"), 130, 200, 45 + (count * 2)));

    gameEngine.addEntity(new Sunny_cloud(gameEngine, AM.getAsset("./img/light_clouds/sunny_clouds_1.png"), -170, 320, 60 + (count * 2)));
    gameEngine.addEntity(new Sunny_cloud(gameEngine, AM.getAsset("./img/light_clouds/sunny_clouds_2.png"), -20, 423, 65 + (count * 2)));
    gameEngine.addEntity(new Sunny_cloud(gameEngine, AM.getAsset("./img/light_clouds/sunny_clouds_3.png"), 130, 280, 70 + (count * 2)));
    gameEngine.addEntity(new Sunny_cloud(gameEngine, AM.getAsset("./img/light_clouds/sunny_clouds_4.png"), 280, 200, 75 + (count * 2)));
    gameEngine.addEntity(new Sunny_cloud(gameEngine, AM.getAsset("./img/light_clouds/sunny_clouds_5.png"), 430, 345, 40 + (count * 2)));
    gameEngine.addEntity(new Sunny_cloud(gameEngine, AM.getAsset("./img/light_clouds/sunny_clouds_6.png"), 580, 300, 45 + (count * 2)));
    gameEngine.addEntity(new Sunny_cloud(gameEngine, AM.getAsset("./img/light_clouds/sunny_clouds_7.png"), 630, 180, 50 + (count * 2)));
    gameEngine.addEntity(new Sunny_cloud(gameEngine, AM.getAsset("./img/light_clouds/sunny_clouds_8.png"), 130, 280, 55 + (count * 2)));
    gameEngine.addEntity(new Sunny_cloud(gameEngine, AM.getAsset("./img/light_clouds/sunny_clouds_9.png"), 280, 260, 60 + (count * 2)));
    gameEngine.addEntity(new Sunny_cloud(gameEngine, AM.getAsset("./img/light_clouds/sunny_clouds_10.png"), 330, 150, 65 + (count * 2)));
    gameEngine.addEntity(new Sunny_cloud(gameEngine, AM.getAsset("./img/light_clouds/sunny_clouds_6.png"), 780, 210, 70 + (count * 2)));

    count = 0;
    //Add rain for background
    var yAdjust = 50;
    var xAdjust = 70;
    gameEngine.addEntity(new Rain(gameEngine, AM.getAsset("./img/Rain.png"), -50 + xAdjust, 25 + yAdjust, 105 + (count * 2), count));
    gameEngine.addEntity(new Rain_cloud(gameEngine, AM.getAsset("./img/rain_clouds/rain_clouds_4.png"), -50, 25, 105 + (count * 2), count++));

    gameEngine.addEntity(new Rain(gameEngine, AM.getAsset("./img/Rain.png"), 100 + xAdjust, 100 + yAdjust, 110 + (count * 2), count));
    gameEngine.addEntity(new Rain_cloud(gameEngine, AM.getAsset("./img/rain_clouds/rain_clouds_4.png"), 100, 100, 110 + (count * 2), count++));

    gameEngine.addEntity(new Rain(gameEngine, AM.getAsset("./img/Rain.png"), 250 + xAdjust, 75 + yAdjust, 115 + (count * 2), count));
    gameEngine.addEntity(new Rain_cloud(gameEngine, AM.getAsset("./img/rain_clouds/rain_clouds_4.png"), 250, 75, 115 + (count * 2), count++));

    gameEngine.addEntity(new Rain(gameEngine, AM.getAsset("./img/Rain.png"), 400 + xAdjust, 85 + yAdjust, 80 + (count * 2), count));
    gameEngine.addEntity(new Rain_cloud(gameEngine, AM.getAsset("./img/rain_clouds/rain_clouds_4.png"), 400, 85, 80 + (count * 2), count++));

    gameEngine.addEntity(new Rain(gameEngine, AM.getAsset("./img/Rain.png"), 550 + xAdjust, 0 + yAdjust, 85 + (count * 2), count));
    gameEngine.addEntity(new Rain_cloud(gameEngine, AM.getAsset("./img/rain_clouds/rain_clouds_4.png"), 550, 0, 85 + (count * 2), count++));

    gameEngine.addEntity(new Rain(gameEngine, AM.getAsset("./img/Rain.png"), 100 + xAdjust, 0 + yAdjust, 95 + (count * 2), count));
    gameEngine.addEntity(new Rain_cloud(gameEngine, AM.getAsset("./img/rain_clouds/rain_clouds_4.png"), 100, 0, 95 + (count * 2), count++));

    gameEngine.addEntity(new Rain(gameEngine, AM.getAsset("./img/Rain.png"), 250 + xAdjust, -30 + yAdjust, 100 + (count * 2), count));
    gameEngine.addEntity(new Rain_cloud(gameEngine, AM.getAsset("./img/rain_clouds/rain_clouds_4.png"), 250, -30, 100 + (count * 2), count++));

    gameEngine.addEntity(new Rain(gameEngine, AM.getAsset("./img/Rain.png"), 300 + xAdjust, 75 + yAdjust, 105 + (count * 2), count));
    gameEngine.addEntity(new Rain_cloud(gameEngine, AM.getAsset("./img/rain_clouds/rain_clouds_4.png"), 300, 75, 105 + (count * 2), count++));

    gameEngine.addEntity(new Rain(gameEngine, AM.getAsset("./img/Rain.png"), 750 + xAdjust, 0 + yAdjust, 110 + (count * 2), count));
    gameEngine.addEntity(new Rain_cloud(gameEngine, AM.getAsset("./img/rain_clouds/rain_clouds_4.png"), 750, 0, 110 + (count * 2), count++));


    gameEngine.addEntity(new Rain(gameEngine, AM.getAsset("./img/Rain.png"), 900 + xAdjust, 0 + yAdjust, 120 + (count * 2), count));
    gameEngine.addEntity(new Rain_cloud(gameEngine, AM.getAsset("./img/rain_clouds/rain_clouds_4.png"), 900, 0, 120 + (count * 2), count++));

    gameEngine.addEntity(new Rain(gameEngine, AM.getAsset("./img/Rain.png"), 800 + xAdjust, -40 + yAdjust, 125 + (count * 2), count));
    gameEngine.addEntity(new Rain_cloud(gameEngine, AM.getAsset("./img/rain_clouds/rain_clouds_4.png"), 800, -40, 125 + (count * 2), count++));

    gameEngine.addEntity(new Rain(gameEngine, AM.getAsset("./img/Rain.png"), 55 + xAdjust, 75 + yAdjust, 80 + (count * 2), count));
    gameEngine.addEntity(new Rain_cloud(gameEngine, AM.getAsset("./img/rain_clouds/rain_clouds_4.png"), 55, 75, 80 + (count * 2), count++));

    gameEngine.addEntity(new Rain(gameEngine, AM.getAsset("./img/Rain.png"), 550 + xAdjust, 0 + yAdjust, 120 + (count * 2), count));
    gameEngine.addEntity(new Rain_cloud(gameEngine, AM.getAsset("./img/rain_clouds/rain_clouds_4.png"), 550, 0, 120 + (count * 2), count++));

    gameEngine.addEntity(new Rain(gameEngine, AM.getAsset("./img/Rain.png"), 250 + xAdjust, 85 + yAdjust, 120 + (count * 2), count));
    gameEngine.addEntity(new Rain_cloud(gameEngine, AM.getAsset("./img/rain_clouds/rain_clouds_4.png"), 250, 85, 120 + (count * 2), count++));

    gameEngine.addEntity(new Rain(gameEngine, AM.getAsset("./img/Rain.png"), 300 + xAdjust, 30 + yAdjust, 85 + (count * 2), count));
    gameEngine.addEntity(new Rain_cloud(gameEngine, AM.getAsset("./img/rain_clouds/rain_clouds_4.png"), 300, 30, 85 + (count * 2), count++));

    gameEngine.addEntity(new Rain(gameEngine, AM.getAsset("./img/Rain.png"), 750 + xAdjust, 0 + yAdjust, 90 + (count * 2), count));
    gameEngine.addEntity(new Rain_cloud(gameEngine, AM.getAsset("./img/rain_clouds/rain_clouds_4.png"), 750, 0, 90 + (count * 2), count++));


    gameEngine.addEntity(new Rain(gameEngine, AM.getAsset("./img/Rain.png"), -50 + xAdjust, 20 + yAdjust, 85 + (count * 2), count));
    gameEngine.addEntity(new Rain_cloud(gameEngine, AM.getAsset("./img/rain_clouds/rain_clouds_4.png"), -50, 20, 85 + (count * 2), count++));

    gameEngine.addEntity(new Rain(gameEngine, AM.getAsset("./img/Rain.png"), 400 + xAdjust, 0 + yAdjust, 95 + (count * 2), count));
    gameEngine.addEntity(new Rain_cloud(gameEngine, AM.getAsset("./img/rain_clouds/rain_clouds_4.png"), 400, 0, 95 + (count * 2), count++));

    gameEngine.addEntity(new Rain(gameEngine, AM.getAsset("./img/Rain.png"), 550 + xAdjust, 75 + yAdjust, 125 + (count * 2), count));
    gameEngine.addEntity(new Rain_cloud(gameEngine, AM.getAsset("./img/rain_clouds/rain_clouds_4.png"), 550, 75, 125 + (count * 2), count++));

    gameEngine.addEntity(new Rain(gameEngine, AM.getAsset("./img/Rain.png"), 600 + xAdjust, -20 + yAdjust, 90 + (count * 2), count));
    gameEngine.addEntity(new Rain_cloud(gameEngine, AM.getAsset("./img/rain_clouds/rain_clouds_4.png"), 600, -20, 90 + (count * 2), count++));

    gameEngine.addEntity(new Rain(gameEngine, AM.getAsset("./img/Rain.png"), 100 + xAdjust, 10 + yAdjust, 85 + (count * 2), count));
    gameEngine.addEntity(new Rain_cloud(gameEngine, AM.getAsset("./img/rain_clouds/rain_clouds_4.png"), 100, 10, 85 + (count * 2), count++));


    gameEngine.addEntity(new Rain(gameEngine, AM.getAsset("./img/Rain.png"), -200 + xAdjust, -30 + yAdjust, 100 + (count * 2), count));
    gameEngine.addEntity(new Rain_cloud(gameEngine, AM.getAsset("./img/rain_clouds/rain_clouds_4.png"), -200, -30, 100 + (count * 2), count++));

    gameEngine.addEntity(new Rain(gameEngine, AM.getAsset("./img/Rain.png"), -50 + xAdjust, 0 + yAdjust, 105 + (count * 2), count));
    gameEngine.addEntity(new Rain_cloud(gameEngine, AM.getAsset("./img/rain_clouds/rain_clouds_4.png"), -50, 0, 105 + (count * 2), count++));

    gameEngine.addEntity(new Rain(gameEngine, AM.getAsset("./img/Rain.png"), 100 + xAdjust, 50 + yAdjust, 110 + (count * 2), count));
    gameEngine.addEntity(new Rain_cloud(gameEngine, AM.getAsset("./img/rain_clouds/rain_clouds_4.png"), 100, 50, 110 + (count * 2), count++));

    gameEngine.addEntity(new Rain(gameEngine, AM.getAsset("./img/Rain.png"), 250 + xAdjust, -80 + yAdjust, 115 + (count * 2), count));
    gameEngine.addEntity(new Rain_cloud(gameEngine, AM.getAsset("./img/rain_clouds/rain_clouds_4.png"), 250, -80, 115 + (count * 2), count++));

    gameEngine.addEntity(new Rain(gameEngine, AM.getAsset("./img/Rain.png"), 400 + xAdjust, 38 + yAdjust, 80 + (count * 2), count));
    gameEngine.addEntity(new Rain_cloud(gameEngine, AM.getAsset("./img/rain_clouds/rain_clouds_4.png"), 400, 38, 80 + (count * 2), count++));

    gameEngine.addEntity(new Rain(gameEngine, AM.getAsset("./img/Rain.png"), 550 + xAdjust, 62 + yAdjust, 85 + (count * 2), count));
    gameEngine.addEntity(new Rain_cloud(gameEngine, AM.getAsset("./img/rain_clouds/rain_clouds_4.png"), 550, 62, 85 + (count * 2), count++));

    gameEngine.addEntity(new Rain(gameEngine, AM.getAsset("./img/Rain.png"), 600 + xAdjust, -30 + yAdjust, 90 + (count * 2), count));
    gameEngine.addEntity(new Rain_cloud(gameEngine, AM.getAsset("./img/rain_clouds/rain_clouds_4.png"), 600, -30, 90 + (count * 2), count++));

    gameEngine.addEntity(new Rain(gameEngine, AM.getAsset("./img/Rain.png"), 100 + xAdjust, 95 + yAdjust, 95 + (count * 2), count));
    gameEngine.addEntity(new Rain_cloud(gameEngine, AM.getAsset("./img/rain_clouds/rain_clouds_4.png"), 100, 95, 95 + (count * 2), count++));

    gameEngine.addEntity(new Rain(gameEngine, AM.getAsset("./img/Rain.png"), 250 + xAdjust, 105 + yAdjust, 100 + (count * 2), count));
    gameEngine.addEntity(new Rain_cloud(gameEngine, AM.getAsset("./img/rain_clouds/rain_clouds_4.png"), 250, 105, 100 + (count * 2), count++));

    gameEngine.addEntity(new Rain(gameEngine, AM.getAsset("./img/Rain.png"), 750 + xAdjust, 10 + yAdjust, 110 + (count * 2), count));
    gameEngine.addEntity(new Rain_cloud(gameEngine, AM.getAsset("./img/rain_clouds/rain_clouds_4.png"), 750, -100, 110 + (count * 2), count++));


    gameEngine.addEntity(new Background(gameEngine, AM.getAsset("./img/Tree.png"), 0, 276));
    gameEngine.addEntity(new Background(gameEngine, AM.getAsset("./img/Tree.png"), 700, 276));


    //Clouds in front of trees

    gameEngine.addEntity(new Rain(gameEngine, AM.getAsset("./img/Rain.png"), 100 + xAdjust, 150 + yAdjust, 105 + (count * 2), count));
    gameEngine.addEntity(new Rain_cloud(gameEngine, AM.getAsset("./img/rain_clouds/rain_clouds_4.png"), 100, 150, 105 + (count * 2), count++));

    gameEngine.addEntity(new Rain(gameEngine, AM.getAsset("./img/Rain.png"), 300 + xAdjust, 150 + yAdjust, 105 + (count * 2), count));
    gameEngine.addEntity(new Rain_cloud(gameEngine, AM.getAsset("./img/rain_clouds/rain_clouds_4.png"), 300, 150, 105 + (count * 2), count++));

    gameEngine.addEntity(new Rain(gameEngine, AM.getAsset("./img/Rain.png"), 250 + xAdjust, 130 + yAdjust, 115 + (count * 2), count));
    gameEngine.addEntity(new Rain_cloud(gameEngine, AM.getAsset("./img/rain_clouds/rain_clouds_4.png"), 250, 130, 115 + (count * 2), count++));

    gameEngine.addEntity(new Rain(gameEngine, AM.getAsset("./img/Rain.png"), 600 + xAdjust, 150 + yAdjust, 90 + (count * 2), count));
    gameEngine.addEntity(new Rain_cloud(gameEngine, AM.getAsset("./img/rain_clouds/rain_clouds_4.png"), 600, 150, 90 + (count * 2), count++));

    gameEngine.addEntity(new Rain(gameEngine, AM.getAsset("./img/Rain.png"), 600 + xAdjust, 130 + yAdjust, 115 + (count * 2), count));
    gameEngine.addEntity(new Rain_cloud(gameEngine, AM.getAsset("./img/rain_clouds/rain_clouds_4.png"), 600, 130, 115 + (count * 2), count++));

    gameEngine.addEntity(new Rain(gameEngine, AM.getAsset("./img/Rain.png"), 100 + xAdjust, 110 + yAdjust, 110 + (count * 2), count));
    gameEngine.addEntity(new Rain_cloud(gameEngine, AM.getAsset("./img/rain_clouds/rain_clouds_4.png"), 100, 110, 110 + (count * 2), count++));

    gameEngine.addEntity(new Rain(gameEngine, AM.getAsset("./img/Rain.png"), 1000 + xAdjust, 150 + yAdjust, 115 + (count * 2), count));
    gameEngine.addEntity(new Rain_cloud(gameEngine, AM.getAsset("./img/rain_clouds/rain_clouds_4.png"), 1000, 150, 115 + (count * 2), count++));

    gameEngine.addEntity(new Rain(gameEngine, AM.getAsset("./img/Rain.png"), -200 + xAdjust, 150 + yAdjust, 95 + (count * 2), count));
    gameEngine.addEntity(new Rain_cloud(gameEngine, AM.getAsset("./img/rain_clouds/rain_clouds_4.png"), -200, 150, 95 + (count * 2), count++));


    gameEngine.addEntity(new Bush(gameEngine, AM.getAsset("./img/Bush_alive.png"), -50, 448));
    gameEngine.addEntity(new Bush(gameEngine, AM.getAsset("./img/Bush_alive.png"), 400, 448));
    gameEngine.addEntity(new Bush(gameEngine, AM.getAsset("./img/Bush_alive.png"), 600, 448));
    gameEngine.addEntity(new Bush(gameEngine, AM.getAsset("./img/Bush_alive.png"), 300, 448));

    gameEngine.addEntity(new Grass(gameEngine, AM.getAsset("./img/Grass_alive.png"), 0, 486));
    gameEngine.addEntity(new Grass(gameEngine, AM.getAsset("./img/Grass_alive.png"), 25, 486));
    gameEngine.addEntity(new Grass(gameEngine, AM.getAsset("./img/Grass_alive.png"), 100, 486));
    gameEngine.addEntity(new Grass(gameEngine, AM.getAsset("./img/Grass_alive.png"), 138, 486));
    gameEngine.addEntity(new Grass(gameEngine, AM.getAsset("./img/Grass_alive.png"), 256, 486));
    gameEngine.addEntity(new Grass(gameEngine, AM.getAsset("./img/Grass_alive.png"), 491, 486));

    gameEngine.addEntity(new Grass(gameEngine, AM.getAsset("./img/Grass_alive.png"), 680, 486));
    gameEngine.addEntity(new Grass(gameEngine, AM.getAsset("./img/Grass_alive.png"), 900, 486));
    gameEngine.addEntity(new Grass(gameEngine, AM.getAsset("./img/Grass_alive.png"), 750, 486));

    gameEngine.addEntity(new Background(gameEngine, AM.getAsset("./img/ground.png"), 0, 536));







    console.log("All Done!");
});
