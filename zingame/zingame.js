//set main namespace
goog.provide('zingame');

goog.require('zingame.Constants');
goog.require('zingame.Card');
goog.require('zingame.Deck');
goog.require('zingame.Waitingroom');
goog.require('zingame.Board');
goog.require('zingame.SocketApi');
goog.require('zingame.Player');
// get requirements
goog.require('lime.Director');
goog.require('lime.Button');
goog.require('lime.Scene');
goog.require('lime.Layer');
goog.require('lime.Circle');
goog.require('lime.Sprite');
goog.require('lime.RoundedRect');
goog.require('lime.Label');
goog.require('lime.animation.Spawn');
goog.require('lime.ui.Scroller');
goog.require('lime.animation.FadeTo');
goog.require('lime.animation.ScaleTo');
goog.require('lime.animation.MoveTo');
goog.require('lime.animation.MoveBy');
goog.require('lime.animation.RotateBy');
goog.require('zingame.Resources');
goog.require('goog.events');

// entrypoint
zingame.start = function() {

  zingame.director = new lime.Director(document.body, 760, 675);
  zingame.director.makeMobileWebAppCapable();
  // auto fix size khi co thay doi man hinh
  zingame.director.setAutoResize(lime.AutoResize.ALL);

  // check load anh
  zingame.Resources.load();

  lime.scheduleManager.scheduleWithDelay(function loading(){
    if(Math.round(zingame.Resources.percentage*100) == 100){
      zingame.waitingroom();
      lime.scheduleManager.unschedule(loading, this);
    }
  }, this, 500);
  
  
  
};

// this is required for outside access after code is compiled in
// ADVANCED_COMPILATIONS mode
goog.exportSymbol('zingame.start', zingame.start);

zingame.waitingroom = function() {
  
  zingame.SocketApi.connect();
  zingame.lobby = new zingame.Waitingroom();
  zingame.director.replaceScene(zingame.lobby);
  
};


zingame.newBoard = function(id) {
  //delete zingame.lobby;
  //zingame.SocketApi.connect();
  //setTimeout(function(){
    zingame.board = new zingame.Board(id);
    zingame.director.replaceScene(zingame.board);
  //},500);
  
};

zingame.createMySelf = function(data){
  zingame.mySelf = new zingame.Player(data.id, data.name, data.cash, data.status, true, true,null);
  var data = {"header":"getInfoServer", "data":{"pid": $("#uid").val()}};
  zingame.SocketApi.send(data);
};