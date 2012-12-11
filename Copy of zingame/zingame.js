//set main namespace
goog.provide('zingame');

goog.require('zingame.Constants');
goog.require('zingame.Card');
goog.require('zingame.Deck');
// get requirements
goog.require('lime.Director');
goog.require('lime.Button');
goog.require('lime.Scene');
goog.require('lime.Layer');
goog.require('lime.Circle');
goog.require('lime.Label');
goog.require('lime.animation.Spawn');
goog.require('lime.animation.FadeTo');
goog.require('lime.animation.ScaleTo');
goog.require('lime.animation.MoveTo');
goog.require('lime.animation.MoveBy');
goog.require('lime.animation.RotateBy');
goog.require('zingame.Resources');
goog.require('goog.events');

// entrypoint
zingame.start = function() {

  var director = new lime.Director(document.body,760,675);
  // auto fix size khi co thay doi man hinh
  director.setAutoResize(lime.AutoResize.ALL);

  // check load anh
  zingame.Resources.load();
  var scene = new lime.Scene();

  //back ground
  var boardBg = new lime.Sprite().setFill(zingame.Resources.img.Background)
      .setAnchorPoint(0, 0);
  scene.appendChild(boardBg);
  
  var myDeck = new zingame.Deck().setAnchorPoint(0, 0);
  boardBg.appendChild(myDeck);

  director.makeMobileWebAppCapable();

  director.replaceScene(scene);
};

// this is required for outside access after code is compiled in
// ADVANCED_COMPILATIONS mode
goog.exportSymbol('zingame.start', zingame.start);
