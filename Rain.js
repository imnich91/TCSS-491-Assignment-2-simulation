function Rain(game, spritesheet, x, y, speed, marker) {

  this.spritesheet = spritesheet;
  this.x = x;
  this.y = y;
  this.startY = y;

  this.ctx = game.ctx;
  this.game = game;
  this.speed = speed;
  this.rain = false;
  this.startSpeed = this.speed;
}

Rain.prototype.draw = function() {
  if(this.rain) {
      this.ctx.drawImage(this.spritesheet,
                   this.x, this.y);
  }
}

Rain.prototype.update = function () {
    if(this.game.cloudy) {

      if(this.x > 1200) {
        this.x = -380;
      }
      this.rain = true;
      this.speed = this.startSpeed;

    } else {
      this.rain = false;
      this.speed = 500;

    }

    if(this.y  > this.startY + 25) {
      this.y = this.startY;
    }

    this.y += this.game.clockTick * this.speed;
    this.x += this.game.clockTick * this.speed;

}
