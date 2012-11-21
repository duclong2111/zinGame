goog.provide('zingame.Card');

goog.require('lime.RoundedRect');
goog.require('lime.Sprite');

zingame.Card = function(rank, suit) {
  goog.base(this);

  // bai up hay ngua
  var status = false;
  /*
   * gia tri quan bai bao gom thu tu va do uu tien order : 3 - 15 ~ 3 4 5 6 7 8
   * 9 10 J Q K A 2 priority: 1-4 ~ bich nhep ro co
   */
  var suit = suit;
  var rank = rank;

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
  this.qualityRenderer = true;
  
  this.getSuit = function(){return suit;};
  
  this.getRank = function(){return rank;};
  
  this.getSelect = function(){
    return this.select_;
  };
  /*
  this.setSelect = function(){
    if(select_)
    select_ = false;
  };
  */
  this.select = function() {
	  if (this.select_ == false) {
	    this.select_ = true;
	    var pos = this.getPosition();
	    this.setPosition(pos.x, pos.y - 30);
	  } 
	  else {
	    this.select_ = false;
	    var pos = this.getPosition();
	    this.setPosition(pos.x, pos.y + 30);

	  }
	};
	
};
goog.inherits(zingame.Card, lime.Sprite);

//zingame.Card.prototype.getSuit = function() {
//  return suit;
//};
/*
zingame.Card.prototype.getRank = function() {
  return rank;
};*/
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

zingame.Card.prototype.select = function() {
  if (select_) {
    select_ = false;
    var pos = this.getPosition();
    this.setPosition(pos.x, pos.y - 40);
  } 
  else {
    select_ = true;
    var pos = this.getPosition();
    this.setPosition(pos.x, pos.y + 40);

  }
};
*/
zingame.Card.fill = function(rank, suit) {
  var card = new zingame.Card(rank, suit);
  
  var cardName = rank + "_" + zingame.Constants.CARD_PRIORITY[suit];
  var img = zingame.Resources.img[cardName] ;
  card.setFill(img).setSize(zingame.Constants.CARD_WIDTH, zingame.Constants.CARD_HEIGHT);
  return card;
};