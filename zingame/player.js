goog.provide('zingame.Player');

zingame.Player = function() {
  //goog.base(this);

};

zingame.Card.fill = function(rank, suit) {
  var card = new zingame.Card(rank, suit);
  
  var cardName = rank + "_" + zingame.Constants.CARD_PRIORITY[suit];
  var img = zingame.Resources.img[cardName] ;
  card.setFill(img).setSize(zingame.Constants.CARD_WIDTH, zingame.Constants.CARD_HEIGHT);
  return card;
};