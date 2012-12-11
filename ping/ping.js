//set main namespace
goog.provide('ping');

goog.require('ping.Game');
goog.require('ping.Resources');
// get requirements
goog.require('lime.Director');
goog.require('lime.Scene');
goog.require('lime.Layer');
goog.require('lime.Label');
goog.require('lime.animation.Spawn');
goog.require('lime.animation.Sequence');
goog.require('lime.animation.FadeTo');
goog.require('lime.animation.ScaleTo');
goog.require('lime.animation.MoveTo');
goog.require('lime.animation.MoveBy');
goog.require('lime.animation.Loop');
goog.require('lime.animation.RotateBy');
goog.require('lime.animation.RotateTo');
goog.require('lime.animation.Delay');
goog.require('lime.Button');
goog.require('lime.Sprite');
goog.require('lime.fill.Frame');
goog.require('lime.animation.KeyframeAnimation');
goog.require('lime.transitions.Dissolve'); 

// entrypoint
ping.start = function() {

  ping.director = new lime.Director(document.body, 640, 640).setAutoResize(lime.AutoResize.ALL);
  ping.director.setDisplayFPS(false);
  
  lime.Label.defaultFont = 'JP';
  lime.Label.installFont('JP', 'assets/MSMINCHO.TTC');
  new ping.Resources.load();
  lime.scheduleManager.scheduleWithDelay(function loading(){
    if(Math.round(ping.Resources.percentage*100) == 100){
      ping.start_();
      lime.scheduleManager.unschedule(loading, this);
    }
  }, this, 500);
  ping.director.makeMobileWebAppCapable();
  
 
  
  // set current scene active
};

goog.exportSymbol('ping.start', ping.start);


ping.start_ = function() {
  var scene = new lime.Scene();
  var layer = new lime.Layer();
  
  scene.appendChild(layer);
  
  var bg = new lime.Sprite().setSize(640,640).setFill(ping.Resources.img.bg_1).setAnchorPoint(0,0);
  layer.appendChild(bg);

  var light1 = new lime.Sprite().setSize(216,279).setPosition(320,-30).setFill(ping.Resources.img.light).setAnchorPoint(1,0).setScale(2.2).setRotation(-10);
  
  bg.appendChild(light1);
  
  var light2 = new lime.Sprite().setSize(216,279).setPosition(320,-30).setFill(ping.Resources.img.light).setAnchorPoint(1,0).setScale(2.2).setRotation(10);
  
  bg.appendChild(light2);
  
  var light3 = new lime.Sprite().setSize(216,279).setPosition(320,-30).setFill(ping.Resources.img.light).setAnchorPoint(1,0).setScale(2.2).setRotation(30);
  
  bg.appendChild(light3);
  
  var action1 = new lime.animation.RotateBy(60).setDuration(0.8).enableOptimizations();
  
  var action2 = new lime.animation.RotateBy(60).setDuration(0.6).enableOptimizations();
  
  var action3 = new lime.animation.RotateBy(60).setDuration(0.4).enableOptimizations();
  
  light1.runAction(new lime.animation.Loop(new lime.animation.Sequence(action1,action1.reverse())));
  light2.runAction(new lime.animation.Loop(new lime.animation.Sequence(action2,action2.reverse())));
  light3.runAction(new lime.animation.Loop(new lime.animation.Sequence(action3,action3.reverse())));
  
  var mc = new lime.Sprite().setSize(141,406).setFill(ping.Resources.img.mc).setAnchorPoint(0,0).setPosition(450,300).setScale(1.3);
  bg.appendChild(mc);
  
  //var btnRetry = new lime.Button(new lime.Sprite().setFill(ping.Resources.img.rankurl).setSize(226,54)).setPosition(180, 600);
  var btnRanking = new lime.Button(new lime.Sprite().setFill(ping.Resources.img.btnStart).setSize(226,54)).setPosition(320, 600);
  
  //bg.appendChild(btnRetry);
  bg.appendChild(btnRanking);
  
  /*goog.events.listenOnce(btnRetry,[ 'touchstart','touchmove','mousedown'],function(){
    window.location = "http://www.yahoo.co.jp/";
  });*/
  
  var star = new lime.Sprite().setSize(252,194).setPosition(130,250).setFill(ping.Resources.img.star).setAnchorPoint(0,0);
  bg.appendChild(star);
  
  var sologan = new lime.Sprite().setSize(407,265).setPosition(100,50).setFill(ping.Resources.img.start).setAnchorPoint(0,0).setScale(1.2);
  bg.appendChild(sologan);
  
  goog.events.listenOnce(btnRanking,[ 'touchstart','touchmove','mousedown'],function(e){
    ping.howtoplay();
  });
  ping.director.replaceScene(scene,lime.transitions.Dissolve);
};


ping.howtoplay = function(){
  var scene = new lime.Scene();
  var layer = new lime.Layer();
  
  scene.appendChild(layer);
  
  var bg = new lime.Sprite().setSize(640,640).setFill(ping.Resources.img.bg_1).setAnchorPoint(0,0).setOpacity(0.5);
  layer.appendChild(bg);

  var howto = new lime.Sprite().setSize(410,57).setPosition(100,10).setFill(ping.Resources.img.howto).setAnchorPoint(0,0);
  layer.appendChild(howto);
  
  var guide = new lime.Sprite().setSize(473,209).setPosition(100,150).setFill(ping.Resources.img.guide).setAnchorPoint(0,0);
  layer.appendChild(guide);
  
  
  var start = new lime.Button(new lime.Sprite().setSize(233,54).setFill(ping.Resources.img.starttxt).setAnchorPoint(0,0)).setPosition(390,580);
  layer.appendChild(start);
  
  goog.events.listenOnce(start,[ 'touchstart','touchend','mousedown'],function(e){
    ping.newgame();
  });
  ping.director.replaceScene(scene,lime.transitions.Dissolve);
  
};


ping.newgame = function() {
  var scene = new ping.Game();
  scene.setRenderer(lime.Renderer.CANVAS); 
  ping.director.replaceScene(scene,lime.transitions.Dissolve);
  
};

