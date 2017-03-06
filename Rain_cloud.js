function Rain_cloud(game, spritesheet, x, y, speed, marker) {

  this.spritesheet = spritesheet;
  this.x = x;
  this.y = y;

  this.ctx = game.ctx;
  this.game = game;
  this.speed = speed;
  this.marker = marker;
  this.raining = false;
  this.startSpeed = speed;
}

Rain_cloud.prototype.draw = function() {
  if(this.game.cloudy) {
      this.ctx.drawImage(this.spritesheet,
                   this.x, this.y);
  }else {
    if(this.x < 1000 && !this.game.startGame) {
      this.ctx.drawImage(this.spritesheet,
                   this.x, this.y);
    }
  }

}

Rain_cloud.prototype.update = function () {
  if(this.game.cloudy) {
    if(this.x > 1200) {
      this.x = -450;
    }
    this.speed = this.startSpeed;
    this.raining = true;
  } else {
    this.raining = false;
    this.speed = 500;

  }




  this.x += this.game.clockTick * this.speed;
}
