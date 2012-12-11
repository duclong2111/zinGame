goog.provide('zingame.Board');

goog.require('lime.Circle');
goog.require('lime.Label');
goog.require('lime.RoundedRect');
goog.require('lime.Sprite');
goog.require('lime.animation.FadeTo');
goog.require('lime.fill.LinearGradient');
goog.require('goog.events');
goog.require('lime.Scene');
zingame.Board = function(scene) {
    lime.Scene.call(this);
    /*this.layers = [];
    for (i = 0; i < 12; i++) {
      this.layers[i] = new lime.Layer();
      scene.appendChild(this.layers[i]);
    }
    myCards = new Array(12);
    //this.fillCards();
    for ( i = 0; i < 12; i++) {
      var card = new zingame.Card.fill(6, 0);
      
      card.setPosition(100 + i*40, 100);
//      card.setStatus(true);
      myCards[i]=(card);
      this.layers[i].appendChild(card);
    }
    */
//    goog.events.listen(this, ['mousedown', 'touchstart'], this.pressHandler123);
    var deck =  new Deck();
    this.appenChild(deck);
};
goog.inherits(zingame.Board, lime.Scene);


