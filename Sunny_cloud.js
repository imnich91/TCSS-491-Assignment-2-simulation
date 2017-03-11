function Sunny_cloud(game, spritesheet, x, y, speed) {

  this.spritesheet = spritesheet;
  this.x = x;
  this.y = y;

  this.ctx = game.ctx;
  this.game = game;
  this.speed = speed;
  this.startSpeed = speed;
}

Sunny_cloud.prototype.draw = function() {
  if(this.game.sun) {
      this.ctx.drawImage(this.spritesheet,
                   this.x, this.y);
  } else {
    if(this.x < 1000 && !this.game.startGame) {
      this.ctx.drawImage(this.spritesheet,
                   this.x, this.y);
    }
  }
}

Sunny_cloud.prototype.update = function () {
  if(this.game.sun) {
    if(this.x > 850) {
      this.x = -450;
    }
    this.speed = this.startSpeed;
  } else {
    this.speed = 500;
  }
  this.x += this.game.clockTick * this.speed;


}
