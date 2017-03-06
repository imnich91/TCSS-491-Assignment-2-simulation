function Sun(game, spritesheet, x, y, speed) {

  this.spritesheet = spritesheet;
  this.x = x;
  this.y = y;

  this.ctx = game.ctx;
  this.game = game;
  this.speed = speed;
}

Sun.prototype.draw = function() {
    this.ctx.drawImage(this.spritesheet,
                 this.x, this.y);

}

Sun.prototype.update = function () {

    if(this.x > 1000) {
      this.x = -450;
      this.game.startGame = false;
    }
    this.x += this.game.clockTick * this.speed;

  if(this.game.sun) {
    if(this.game.entities[0].x > 850) {
      document.getElementById("gameWorld").style.background = '#000000';
    } else if(this.game.entities[0].x > 800) {
      document.getElementById("gameWorld").style.background = '#14365D';
    } else if(this.game.entities[0].x > 750) {
      document.getElementById("gameWorld").style.background = '#1F468F';
    } else if(this.game.entities[0].x > 700) {
      document.getElementById("gameWorld").style.background = '#3A6FAB';
    } else if(this.game.entities[0].x > 650) {
      document.getElementById("gameWorld").style.background = '#5D96D6';
    } else if(this.game.entities[0].x < -450) {
      document.getElementById("gameWorld").style.background = '#00000';
    }else if(this.game.entities[0].x < -400) {
      document.getElementById("gameWorld").style.background = '#14365D';
    } else if(this.game.entities[0].x < -350) {
      document.getElementById("gameWorld").style.background = '#1F468F';
    } else if(this.game.entities[0].x < -300) {
      document.getElementById("gameWorld").style.background = '#3A6FAB';
    } else if(this.game.entities[0].x < -250) {
      document.getElementById("gameWorld").style.background = '#5D96D6';
    } else{
      document.getElementById("gameWorld").style.background = '#A1C5ED';
    }
  }


  if(!this.game.sun) {
    if(this.game.entities[0].x > 850) {
      document.getElementById("gameWorld").style.background = '#000000';
    } else if(this.game.entities[0].x > 800) {
      document.getElementById("gameWorld").style.background = '#081835';
    } else if(this.game.entities[0].x > 750) {
      document.getElementById("gameWorld").style.background = '#0B1D40';
    } else if(this.game.entities[0].x > 700) {
      document.getElementById("gameWorld").style.background = '#0C2046';
    } else if(this.game.entities[0].x > 650) {
      document.getElementById("gameWorld").style.background = '#102753';
    } else if(this.game.entities[0].x < -450) {
      document.getElementById("gameWorld").style.background = '#00000';
    }else if(this.game.entities[0].x < -400) {
      document.getElementById("gameWorld").style.background = '#081835';
    } else if(this.game.entities[0].x < -350) {
      document.getElementById("gameWorld").style.background = '#0B1D40';
    } else if(this.game.entities[0].x < -300) {
      document.getElementById("gameWorld").style.background = '#0C2046';
    } else if(this.game.entities[0].x < -250) {
      document.getElementById("gameWorld").style.background = '#102753';
    } else{
      document.getElementById("gameWorld").style.background = '#142D5D';
    }
  }

}
