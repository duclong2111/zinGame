goog.provide('zingame.Board');
goog.require('lime.Scene');
goog.require('zingame.PlayerSprite');
zingame.Board = function(id) {
    lime.Scene.call(this);
  
    this.id = id;
    //this.maxBet = maxBet;
    //this.minBet = minBet;
    this.status = "waiting";
    
    this.players = new Array();
    
    this.layer = new lime.Layer().setAnchorPoint(0,0).setPosition(0,0);
    this.appendChild(this.layer);
    
    this.setAutoResize(lime.AutoResize.ALL);
    
    this.backGround = new lime.Sprite().setSize(760,675).setFill(zingame.Resources.img.Background).setAnchorPoint(0,0);
    this.layer.appendChild(this.backGround);
    
    // all button
    this.all = new lime.Button(
        new lime.RoundedRect().setFill(zingame.Resources.img.all).setSize(55,17).setAnchorPoint(0,0)
      ).setPosition(135,505);

    this.layer.appendChild(this.all);
    
    // chat button
    this.chat = new lime.Button(
                  new lime.RoundedRect().setFill(zingame.Resources.img.chat).setSize(55,17).setAnchorPoint(0,0)
                ).setPosition(5,505);
    
    this.layer.appendChild(this.chat);
    
    // dealer button
    this.dealer = new lime.Button(
                        new lime.RoundedRect().setFill(zingame.Resources.img.dealer).setSize(55,17).setAnchorPoint(0,0)
                  ).setPosition(70,505);
    
    this.layer.appendChild(this.dealer);
    
    // dealer card action
    if(zingame.mySelf.master){
      goog.events.listen(this.dealer , ['touchstart', 'mousedown'] ,function(e) {
        e.swallow(['mouseup', 'touchend'], function(e) {
            if (!this.enable_){
              var data = {"header":"deal", "data":{"pid":zingame.mySelf.id, "bid" : zingame.board.id}};
              zingame.SocketApi.send(data);
              this.enable_ = true;
            }
          });
      });
    }
    
    zingame.mySelf.profile();
    this.layer.appendChild(zingame.mySelf);
    
    this.players.push(zingame.mySelf);
};
goog.inherits(zingame.Board, lime.Scene);


zingame.Board.prototype.addPlayer = function(data){
  var player = new zingame.Player(data.id, data.name, data.cash, data.status, false, false,data.position);
  
  zingame.board.players.push(player);
  player.profile();
  zingame.board.layer.appendChild(player);
  
};


zingame.Board.prototype.setOrderPlayer = function(data){
  
  zingame.mySelf.order = data.myOrder;
  zingame.mySelf.master = false;
  
  var players = data.players ; 
  
  goog.array.forEach(players,function(p){
    
    var player = new zingame.Player(p.id, p.name, p.cash, p.status, false, p.master,p.position);
    //var player = new zingame.Player(p.id, "Player", 10000, "busy", false, false,p.position);
    
    zingame.board.players.push(player);
    player.profile();
    zingame.board.layer.appendChild(player);
    
  });
};


zingame.Board.prototype.showCards = function(data){
  
  var i =0 ;
  var cards = data.cards;
  goog.array.forEach(cards,function(c){
    
    var card = new zingame.Card(c.rank, c.suit);
    card.fill();
    card.setPosition(i*zingame.Constants.INSTANCE_CARD + zingame.Constants.CARD_WIDTH/2,0);
    //zingame.mySelf.addHandCard();
    zingame.mySelf.handCard.appendChild(card);
    i++;
  });
  
  goog.events.listen(zingame.mySelf.handCard,['touchstart', 'mousedown'] ,function(e){
    e.swallow(['mouseup', 'touchend'], zingame.Board.prototype.pressHandler_);
  });
  //zingame.mySelf.renderCard();
};


zingame.Board.prototype.pressHandler_ = function(e){
  
  
  var pos = e.position;
  // get the cell and row value for the touch
  var c = Math.floor((pos.x ) / zingame.Constants.INSTANCE_CARD)  ;
  console.log(c);
  var card = null;
  if( c < 13 && c >= 0)
    card = this.getChildAt(c);
  if( card !== undefined ){
    card.select();
  }
  
};
