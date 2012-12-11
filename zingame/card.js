goog.provide('zingame.Card');

goog.require('lime.RoundedRect');

zingame.Card = function(rank, suit) {
  lime.RoundedRect.call(this);

  // bai up hay ngua
  this.status = false;
  /*
   * gia tri quan bai bao gom thu tu va do uu tien order : 3 - 15 ~ 3 4 5 6 7 8
   * 9 10 J Q K A 2 priority: 1-4 ~ bich nhep ro co
   */
  this.suit = suit;
  this.rank = rank;

  //var height = zingame.Constants.CARD_HEIGHT;
  //var width = zingame.Constants.CARD_WIDTH;

  this.select_ = false;
  // this.CoordinateX = 100;
  // this.CoordinateY = 100;
  
  //var sprite = new lime.Sprite().setPosition(
      //this.CoordinateX, this.CoordinateY).setSize(zingame.Constants.CARD_WIDTH, zingame.Constants.CARD_HEIGHT);

  //this.appendChild(sprite);
  /*
   * var img = "assets/" + this.order + "_" +
   * zingame.Constants.CARD_PRIORITY[this.priority] + ".png"; if (this.status)
   * this.sprite.setFill(img); else this.sprite.setFill('#f0f');
   */
  
};
goog.inherits(zingame.Card, lime.RoundedRect);

zingame.Card.prototype.getSuit = function() {
  return this.suit;
};

zingame.Card.prototype.getRank = function() {
  return this.rank;
};
/*
 * zingame.Card.prototype.setCardPosition = function(x, y) { this.CoordinateX =
 * x; this.CoordinateY = y; };
 */
/*
zingame.Card.prototype.setStatus = function(stt) {

  var img = "assets/" + rank + "_" + zingame.Constants.CARD_PRIORITY[suit] + ".png";
  if (stt)
    sprite.setFill(img);
  else
    sprite.setFill('#f0f');
};
*/
zingame.Card.prototype.select = function() {
  if (this.select_) {
    this.select_ = false;
    var pos = this.getPosition();
    this.setPosition(pos.x, pos.y + zingame.Constants.CARD_SELECT);
  } 
  else {
    this.select_ = true;
    var pos = this.getPosition();
    this.setPosition(pos.x, pos.y - zingame.Constants.CARD_SELECT);
  }
  return this;
};

zingame.Card.prototype.fill = function() {
  var cardName = this.rank + "_" + zingame.Constants.CARD_PRIORITY[this.suit - 1];
  var img = zingame.Resources.img[cardName] ;
  this.setFill(img).setSize(zingame.Constants.CARD_WIDTH, zingame.Constants.CARD_HEIGHT);
  return this;
};