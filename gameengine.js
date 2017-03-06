window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (/* function */ callback, /* DOMElement */ element) {
                window.setTimeout(callback, 1000 / 60);
            };
})();

//Uses markov model for weather simulation to see if animals are kept alive.
//If drought for more than 5 days and nothing for them to eat then they die.
//Drought occurs after
function GameEngine() {
    this.entities = [];
    this.chars = [];
    this.ctx = null;
    this.surfaceWidth = null;
    this.surfaceHeight = null;
    this.updateDay = false;
    this.sunCreated = false;
    this.sun = true;
    this.cloudy = false;
    this.drought = false;
    this.transitionTable = [.9, .1, .3, .7];
    this.initialState = true;
    this.sunny = 1;
    this.rainy = 0;
}

//Index 1 of sun rain prob is probability of sunny.
GameEngine.prototype.calculateDailyProbability = function() {
    //var sun_rain_prob = [];
    if(this.initialState) {
        //sun_rain_prob.push(this.sunny);
        //sun_rain_prob.push(this.rainy);
        this.initialState = false;
        this.calcX1 = true;
        console.log("sunny x0: " + this.sunny);
        console.log('rainy x0:' + this.rainy);
    } else if(this.calcX1) {
        this.sunny = (this.transitionTable[0] * this.sunny).toFixed(2);
        this.rainy = 1- this.sunny;
        //sun_rain_prob.push(this.sunny);
        //sun_rain_prob.push(this.rainy);
        this.calcX1 = false;
        console.log("sunny x1: " + this.sunny);
        console.log('rainy x1:' + this.rainy);
    } else {
        this.sunny = ((this.transitionTable[0] * this.sunny) + (this.transitionTable[1] * this.rainy)).toFixed(2);
        this.rainy = 1 - this.sunny;
        //sun_rain_prob.push(this.sunny);
        //sun_rain_prob.push(this.rainy);

        console.log("sunny x2: " + this.sunny);
        console.log('rainy x2:' + this.rainy);
    }

    //return sun_rain_prob;



}

GameEngine.prototype.init = function (ctx) {
    this.ctx = ctx;
    this.surfaceWidth = this.ctx.canvas.width;
    this.surfaceHeight = this.ctx.canvas.height;
    this.timer = new Timer();
    console.log('game initialized');
    this.startGame = true;
}

GameEngine.prototype.start = function () {
    console.log("starting game");
    var that = this;
    (function gameLoop() {
        that.loop();
        requestAnimFrame(gameLoop, that.ctx.canvas);
    })();
}

GameEngine.prototype.addEntity = function (entity) {
    console.log('added entity');


    this.entities.push(entity);


}

GameEngine.prototype.draw = function () {
    this.ctx.clearRect(0, 0, this.surfaceWidth, this.surfaceHeight);
    this.ctx.save();
    for (var i = 0; i < this.entities.length; i++) {
        this.entities[i].draw(this.ctx);
    }
    this.ctx.restore();
}


GameEngine.prototype.update = function () {
  if(this.sunCreated) {
    if(this.entities[0].x < -400  && this.updateDay) {
      this.calculateDailyProbability(); //.5

      this.higher_prob = Math.max(this.sunny, this.rainy);
      console.log("HIGHER PROBABILITY:" + this.higher_prob.toFixed(2))
      var random = Math.random();
      console.log("RANDOM " + random);//.37  < sunny .55


      if (random.toFixed(2) < this.higher_prob) {
        if(this.higher_prob === this.sunny) {
          this.sun = true;
          this.cloudy = false;
          this.drought = true;
          console.log("PICKED SUNNY, it had higher probability too ")
        } else {
          this.cloudy = true;
          this.sun = false;
          this.drought = false;
          console.log("PICKED Rainy , it had lower probability too ")
        }

      } else if(random.toFixed(2) >= this.higher_prob) {
        if(this.higher_prob === this.sunny) {
          console.log("PICKED Rainy , it had higher probability too ")

          this.cloudy = true;
          this.sun = false;
          this.drought = false;
        } else {
          this.sun = true;
          this.cloudy = false;
          this.drought = true;
          console.log("PICKED SUNNY, it had lower probability too ")

        }
      }
      this.updateDay = false;
    }
    if(this.entities[0].x > 850) {
      this.updateDay = true;
    }
  }


    var entitiesCount = this.entities.length;

    for (var i = 0; i < entitiesCount; i++) {
        var entity = this.entities[i];

        entity.update();
    }
}

GameEngine.prototype.loop = function () {
    this.clockTick = this.timer.tick();
    this.update();
    this.draw();

}

function Timer() {
    this.gameTime = 0;
    this.maxStep = 0.05;
    this.wallLastTimestamp = 0;
}

Timer.prototype.tick = function () {
    var wallCurrent = Date.now();
    var wallDelta = (wallCurrent - this.wallLastTimestamp) / 1000;
    this.wallLastTimestamp = wallCurrent;

    var gameDelta = Math.min(wallDelta, this.maxStep);
    this.gameTime += gameDelta;
    return gameDelta;
}

function Entity(game, x, y) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.removeFromWorld = false;
}

Entity.prototype.update = function () {
}

Entity.prototype.draw = function (ctx) {
    if (this.game.showOutlines && this.radius) {
        this.game.ctx.beginPath();
        this.game.ctx.strokeStyle = "green";
        this.game.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        this.game.ctx.stroke();
        this.game.ctx.closePath();
    }
}

Entity.prototype.rotateAndCache = function (image, angle) {
    var offscreenCanvas = document.createElement('canvas');
    var size = Math.max(image.width, image.height);
    offscreenCanvas.width = size;
    offscreenCanvas.height = size;
    var offscreenCtx = offscreenCanvas.getContext('2d');
    offscreenCtx.save();
    offscreenCtx.translate(size / 2, size / 2);
    offscreenCtx.rotate(angle);
    offscreenCtx.translate(0, 0);
    offscreenCtx.drawImage(image, -(image.width / 2), -(image.height / 2));
    offscreenCtx.restore();
    //offscreenCtx.strokeStyle = "red";
    //offscreenCtx.strokeRect(0,0,size,size);
    return offscreenCanvas;
}
