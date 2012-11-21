//set main namespace
goog.provide('spider');

goog.require('spider.Constants');
goog.require('spider.Card');
goog.require('spider.Deck');
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
goog.require('spider.Resources');
goog.require('goog.events');
// entrypoint
spider.start = function() {

  var director = new lime.Director(document.body, 1024, 768);

  scene = new lime.Scene();
  
  var myDeck = new spider.Deck().setPosition(100,300).setAnchorPoint(0,0);
  scene.appendChild(myDeck);
  var btn = new lime.Button(new lime.Label().setText('Deal!').setFill('#f00').setFontSize(30)).setSize(160,50).setPosition(302,594);
  
  scene.appendChild(btn);
  goog.events.listen(myDeck, [ 'mousedown', 'touchstart' ], spider.pressHandler_);
  goog.events.listen(btn, [ 'mousedown', 'touchstart' ], function(){
    var myCards = myDeck.getMyCards();
    var zoomout = new lime.animation.Sequence ( 
        new lime.animation.Spawn(
          new lime.animation.ScaleTo(1.2).setDuration(0.05).enableOptimizations().setEasing(lime.animation.Easing.EASE),
          new lime.animation.MoveBy(0,-200).enableOptimizations().setDuration(0.05).setEasing(lime.animation.Easing.EASE)
          ),
        new lime.animation.Spawn(
            new lime.animation.RotateBy(-180).setDuration(0.1).enableOptimizations(),
            new lime.animation.ScaleTo(0.7).setDuration(0.1).enableOptimizations(),
            new lime.animation.MoveBy(0,50).enableOptimizations().setDuration(0.1)
          )
        );
    for( var i = 0 ;i< 12 ; i++){
      if(myCards[i].getSelect()){
        zoomout.addTarget(myCards[i]);
        myCards[i].setSelect();
      }
    }
    
    var abc = spider.Resources.load();
    console.log(spider.Resources.img);
    zoomout.play();
  });

  director.makeMobileWebAppCapable();

  director.replaceScene(scene);
};

// this is required for outside access after code is compiled in
// ADVANCED_COMPILATIONS mode
goog.exportSymbol('spider.start', spider.start);

spider.pressHandler_ = function(e) {
  //console.log(e.position);
  var pos = e.position;
  // get the cell and row value for the touch
  var c = Math.floor((pos.x ) / 40) ;

  // flick from one cell to another is also supported
  if (this.type == 'mousedown' || this.type == 'touchstart') {
    this.swallow([ 'mouseup', 'touchend' ], spider.pressHandler_);
  }

  //console.log(c);
  //console.log(this.getMyCards());
  this.getMyCards()[c].select();
};
