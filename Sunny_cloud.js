function Sunny_cloud(game, spritesheet, x, y, speed) {

  this.spritesheet = spritesheet;
  this.x = x;
  this.y = y;

  this.ctx = game.ctx;
  this.game = game;
  this.animating = true;
  this.speed = speed;
  this.sunny = true;
}

Sunny_cloud.prototype.draw = function() {
  if(this.sunny) {
      this.ctx.drawImage(this.spritesheet,
                   this.x, this.y);
  }
  
}

Sunny_cloud.prototype.update = function () {
  if(this.x > 1000) {
    this.x = -280;
  }
  this.x += this.game.clockTick * this.speed;

}
