goog.provide('zingame.Player');

//goog.provide('zingame.PlayerSprite');

goog.require('lime.Sprite');
goog.require('lime.RoundedRect');

/**
 * Base object Player
 * @param id
 * @param name
 * @param cash
 * @param status
 */
zingame.Player = function(id, name, cash, status, mySelf, isMaster,order) {
  
  lime.Sprite.call(this);
  
  this.id = id;
  
  this.cash = cash ;
  
  this.name = name;
  
  this.status = status;
  
  this.mySelf = mySelf;
  /**
   * Chủ bàn
   */
  this.isMaster = isMaster;
  
  this.order = order;
  /**
   * Quân bài khi chơi
   * @handCard array card
   */
  this.profile_ = new lime.Sprite().setFill(zingame.Resources.img.profile_bg).setSize(70,101).setAnchorPoint(0,0);
  this.appendChild(this.profile_);
  
  
  this.handCard = new lime.Sprite().setSize(600,58).setAnchorPoint(0,0.5).setPosition(120,430);
  this.appendChild(this.handCard);
};

goog.inherits(zingame.Player, lime.Sprite);



/**
 * Fill info of player
 */
zingame.Player.prototype.profile = function(){
  
  /**
   * TODO
   * Check myself
   */
  if(this.mySelf){
    this.profile_.setPosition(zingame.Player.Pos.PLAYER1);
    
  }else{
    var pos = this.order - zingame.mySelf.order;
    var namePlayer = "PLAYER";
    switch (pos) {
    case 1:
      namePlayer += 2 ;  
      break;
    case 2:
      namePlayer += 3 ;  
      break;
    case 3:
      namePlayer += 4 ;  
      break;
    case -1:
      namePlayer += 4 ;  
      break;
    case -2:
      namePlayer += 3 ;  
      break;
    case -3:
      namePlayer += 2 ;  
      break;
    default:
      break;
    }
    console.log(namePlayer);
    this.profile_.setPosition(zingame.Player.Pos[namePlayer]);
  }
  
  /* bind name player */
  var name = new lime.Label().setText(this.name).setFontColor(zingame.Player.Label.COLOR).setAnchorPoint(0, 0).setPosition(5, 3)
            .setSize(zingame.Player.Label.SIZE);
  this.profile_.appendChild(name);
  
  /*bind avartar*/
  var avartar = new lime.RoundedRect().setFill(zingame.Resources.img.ava_default).setAnchorPoint(0, 0).setPosition(4, 20)
                .setSize(zingame.Player.Ava.SIZE);
  this.profile_.appendChild(avartar);
  
  /* bind Cash of player */
  var cash = new lime.Label().setText("$"+this.cash).setFontColor(zingame.Player.Label.COLOR).setAnchorPoint(0, 0).setPosition(5, 82)
            .setSize(zingame.Player.Label.SIZE);
  this.profile_.appendChild(cash);
  
};



zingame.Player.prototype.addHandCard = function(){
  
  if(this.mySelf){
    this.handCard = new lime.Sprite().setSize(600,58).setAnchorPoint(0,0.5).setPosition(120,430);
    this.appendChild(this.handCard);
  }
};
/**
 * Fill card 
 */
zingame.Player.prototype.renderCard = function(){
  /**
   * TODO
   * check myself
   */
  goog.array.forEach(data.cards,function(c){
    
    var card = new zingame.Card(c.rank, c.suit);
    
    zingame.mySelf.handCard.push(card);
  });
};



/**
 * Constant to config position, sizes
 */

/* Position of player */
zingame.Player.Pos ={ 
    PLAYER1   : new goog.math.Coordinate(40, 380),
    PLAYER2   : new goog.math.Coordinate(680, 220),
    PLAYER3   : new goog.math.Coordinate(350, 50),
    PLAYER4   : new goog.math.Coordinate(20, 220)
};
/* ------------------------------------------------- */

/* Size of Label for profile: Name, cash */
zingame.Player.Label = {
    SIZE  : new goog.math.Size(60,20),
    COLOR : "#ff0"
};
/* ------------------------------------------------- */

/* Size of avartar */
zingame.Player.Ava = {
    SIZE: new goog.math.Size(62,62)
};
/* ------------------------------------------------- */