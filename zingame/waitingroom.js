goog.provide('zingame.Waitingroom');
goog.require('lime.Scene');
/**
 * @constructor
 * @extends lime.Scene
 */
zingame.Waitingroom = function(level) {
    lime.Scene.call(this);

    this.layer = new lime.Layer();
    this.appendChild(this.layer);
    
    this.tablePlayer = new lime.Sprite().setSize(260, 600).setFill('#f00').setPosition(0,0).setAnchorPoint(0,0);
    this.layer.appendChild(this.tablePlayer);
    
    this.tableBoard = new lime.Sprite().setSize(500, 600).setFill('#ff0').setPosition(270,0).setAnchorPoint(0,0);
    this.layer.appendChild(this.tableBoard);
    
    this.listPlayer = new lime.ui.Scroller().setFill('#ccc').setAnchorPoint(0, 0).setSize(240, 580).setPosition(10, 10).setDirection(lime.ui.Scroller.Direction.VERTICAL);
    this.tablePlayer.appendChild(this.listPlayer);
    
    this.listBoard = new lime.ui.Scroller().setFill('#ccc').setAnchorPoint(0, 0).setSize(580, 580).setPosition(10, 10).setDirection(lime.ui.Scroller.Direction.VERTICAL);
    this.tableBoard.appendChild(this.listBoard);
    
    
    //nut lua chon option tao ban moi
    var btnNewBoard = new lime.Button(new lime.Label().setText("Tao ban moi").setFill("#ccc")).setPosition(700, 630).setSize(30,50);
    
    this.layer.appendChild(btnNewBoard);
    
    
    // su kien tao ban moi
    goog.events.listenOnce(btnNewBoard, ['touchstart', 'mousedown'],function(){
      var data = {"header":"newBoard", "data":{"maxBet": 1000,"minBet": 1000,"pid": $("#uid").val()}};
      zingame.SocketApi.send(data);
    });
    
    goog.events.listenOnce(this.listBoard,['touchstart', 'mousedown'], this.handler_);
    
    
};
goog.inherits(zingame.Waitingroom, lime.Scene);


zingame.Waitingroom.prototype.handler_ = function(e){
  
  e.swallow(['mouseup', 'touchend'], function(e) {
    var c = Math.floor((e.position.y ) / 30) ;
    if( this.moving_.getChildAt(c) != undefined){
      var data = {"header":"joinBoard", "data":{"bid":this.moving_.getChildAt(c).id}};
      zingame.SocketApi.send(data);
    }
  });
  
};


zingame.Waitingroom.prototype.bindData = function(result){
  
  var sizeLabel= 26;
  var itemHeight = 30;
  
  var i = 0;
  if( result.players != undefined )
    if( ! goog.array.isEmpty(result.players) ){
      goog.array.forEach(result.players,function(p){
          
          var item = new lime.RoundedRect().setPosition(0, i * itemHeight)
            .setSize(250, itemHeight).setAnchorPoint(0, 0);
          
          item.id = p.pid;
          
          item.appendChild(
              new lime.Label().setText(p.pid).setPosition(5, 0).setFontSize(
                  sizeLabel).setAnchorPoint(0, 0));
          
          item.appendChild(
              new lime.Label().setText(p.cash).setPosition(140, 0).setFontSize(
                  sizeLabel).setAnchorPoint(0, 0));
          zingame.lobby.listPlayer.appendChild(item);
          i++;
        }
      );
    }
  
  if( result.boards != undefined )
    if( ! goog.array.isEmpty(result.boards) ){
      i = 0;
      goog.array.forEach(result.boards, function(b) {
    
          var item = new lime.RoundedRect().setPosition(0, i *itemHeight).setAnchorPoint(0, 0)
              .setSize(480, itemHeight);
          
          item.id = b.bid;
          
          item.appendChild(new lime.Label().setText(b.bid).setPosition(5, 0).setFontSize(sizeLabel)
              .setAnchorPoint(0, 0));
          item.appendChild(new lime.Label().setText(b.maxBet).setPosition(200, 0).setFontSize(sizeLabel)
              .setAnchorPoint(0, 0));
          item.appendChild(new lime.Label().setText(b.minBet).setPosition(290, 0).setFontSize(sizeLabel)
              .setAnchorPoint(0, 0));
          //item.appendChild(new lime.Label().setText(b.rule).setPosition(180, 0)
              //.setAnchorPoint(0, 0));
          item.appendChild(new lime.Label().setText(b.status).setPosition(380, 0).setFontSize(sizeLabel)
              .setAnchorPoint(0, 0));
          zingame.lobby.listBoard.appendChild(item);
          i++;
          
          
        }
      );
    }
  
};


zingame.Waitingroom.prototype.addPlayer = function(result){
  
  var sizeLabel= 26;
  var itemHeight = 30;
  
  
  var item = new lime.RoundedRect().setPosition(0,zingame.lobby.listPlayer.moving_.getNumberOfChildren()*itemHeight )
      .setAnchorPoint(0, 0).setSize(250,itemHeight);
  item.id = result.pid;
  item.appendChild(
      new lime.Label().setText(result.pid).setPosition(5, 0).setFontSize(
          sizeLabel).setAnchorPoint(0, 0));
  
  item.appendChild(
      new lime.Label().setText(result.cash).setPosition(140, 0).setFontSize(
          sizeLabel).setAnchorPoint(0, 0));
  
  zingame.lobby.listPlayer.appendChild(item);

};

zingame.Waitingroom.prototype.addBoard = function(result){
  
  var sizeLabel= 26;
  var itemHeight = 30;
  
  var item = new lime.RoundedRect().setPosition(0, zingame.lobby.listBoard.moving_.getNumberOfChildren()*itemHeight).setAnchorPoint(0, 0)
    .setSize(480, itemHeight);

  item.id = result.bid;
  
  item.appendChild(new lime.Label().setText(result.bid).setPosition(5, 0).setFontSize(sizeLabel)
    .setAnchorPoint(0, 0));
  item.appendChild(new lime.Label().setText(result.maxBet).setPosition(200, 0).setFontSize(sizeLabel)
    .setAnchorPoint(0, 0));
  item.appendChild(new lime.Label().setText(result.minBet).setPosition(290, 0).setFontSize(sizeLabel)
    .setAnchorPoint(0, 0));
  //item.appendChild(new lime.Label().setText(b.rule).setPosition(180, 0)
    //.setAnchorPoint(0, 0));
  item.appendChild(new lime.Label().setText(result.status).setPosition(380, 0).setFontSize(sizeLabel)
    .setAnchorPoint(0, 0));
  zingame.lobby.listBoard.appendChild(item);
  
  zingame.lobby.listBoard.appendChild(item);

};

