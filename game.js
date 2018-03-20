var canvas = document.createElement('canvas');
canvas.id = 'canvas';
canvas.width = 800;
canvas.height = 600;
document.body.appendChild(canvas);

var c = canvas.getContext('2d');
var keyCodes = [];
var turnLeft = false;

///////////////////make game entities//////////////////////////
function GameEntity(_sprite, _sheetWidth, _sheetHeight,
                    _cols, _rows, _x, _y, _speed){
  this.sprite = new Image();
  this.sprite.src = _sprite;
  this.sx = 0;
  this.sy = 0;
  this.swidth = _sheetWidth / _cols;
  this.sheight = _sheetHeight / _rows;
  this.x = _x;
  this.y = _y;
  this.speed = _speed;
  this.currFrame = 0;
  this.cols = _cols;
  this.rows = _rows;
}
GameEntity.prototype = {
  update: function(){
    for(var i in keyCodes){
      if(keyCodes[i] === 37){
        this.x -= this.speed;
      }
      if(keyCodes[i] === 39){
        this.x += this.speed;
      }
      if(keyCodes[i] === 38){
        this.y -= this.speed;
      }
      if(keyCodes[i] === 40){
        this.y += this.speed;
      }
    }
  },
  animation: function(){
    if(!keyCodes.includes(37) && !keyCodes.includes(39)){
      if(turnLeft){
        this.sx = 7 * this.swidth;
        this.sy = this.sheight;
      }
      else{
        this.sx = 0;
        this.sy = 0;
      }
    }
    if(this.currFrame >= this.cols){
      this.currFrame = 0;
    }
    for(var i in keyCodes){
      if(keyCodes[i] === 39){
        this.sx = this.currFrame * this.swidth;
        this.sy = 0;
        this.currFrame++;
        turnLeft = false;
      }
      if(keyCodes[i] === 37){
        this.sx = this.currFrame * this.swidth;
        this.sy = this.sheight;
        this.currFrame++;
        turnLeft = true;
      }
    }
  },
  draw: function(){
    c.drawImage(this.sprite, this.sx, this.sy, this.swidth,
                this.sheight, this.x, this.y, 100, 100);
  }
}

var player = new GameEntity('player.png', 864, 280, 8, 2,
                            400, 300, 20);

//////////store pressed and released keys in array///////////

window.addEventListener('keydown', function(e){
  if(!keyCodes.includes(e.keyCode)){
    keyCodes.push(e.keyCode);
  }
});
window.addEventListener('keyup', function(e){
  for(var i in keyCodes){
    if(keyCodes[i] === e.keyCode){
      keyCodes.splice(i, 1);
    }
  }
});


//////////////////////////Game Loop////////////////////////////
setInterval(function () {

    c.clearRect(0, 0, window.innerWidth, window.innerHeight);


    player.animation();
    player.update();
    player.draw();


}, 100);
