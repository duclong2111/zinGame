goog.provide('zingame.Deck');
goog.require('zingame.Card');
goog.require('zingame.Rule');
goog.require('lime.Layer');
goog.require('goog.array');

zingame.Deck = function() {
  goog.base(this);

  that = this;
  
  this.flagPlayer = 0;
  
  that.flagNext = 0;
  
  this.navigator = new Array();
  
  
  this.navigator.push(new lime.Label("Player 1").setFontFamily('Verdana').setFontSize(20).setFontWeight('bold').setFontColor("#f00").setPosition(370,450).setOpacity(0));

  // cho chua bai nguoi choi 2
  this.navigator.push(new lime.Label("Player 2").setFontFamily('Verdana').setFontSize(20).setFontWeight('bold').setFontColor("#f00").setPosition(600,200).setOpacity(0));

  // cho chua bai nguoi choi 3
  this.navigator.push(new lime.Label("Player 3").setFontFamily('Verdana').setFontSize(20).setFontWeight('bold').setFontColor("#f00").setPosition(370,100).setOpacity(0));

  // cho chua bai nguoi choi 4
  this.navigator.push(new lime.Label("Player 4").setFontFamily('Verdana').setFontSize(20).setFontWeight('bold').setFontColor("#f00").setPosition(160,230).setOpacity(0));

  for ( var i = 0; i < 4; i++) {
    that.appendChild(that.navigator[i]);
  }
  
  
  that.win = ["Ve nhat","Ve nhi","Ve ba","Ve bet",];
  that.counter = 0;
  
  this.flipCards = [];
  this.spriteFlipCards = new lime.Sprite().setPosition(380,280).setAnchorPoint(0.5, 0.5).setSize(200,200);
  that.appendChild(this.spriteFlipCards);
  // mang chua bo bai
  this.Cards = new Array();
  
  // tao ra bo bai 52 cay
  for (var i = 0; i < 4; i++) {
    for(var j = 1 ; j <= 13; j++ ){
      var card = new zingame.Card.fill(j, i);
      this.Cards.push(card);
    }
  }
  
  // trao bai
  for (var i = that.Cards.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = that.Cards[i];
    that.Cards[i] = that.Cards[j];
    that.Cards[j] = tmp;
  }
  
  // chua nguoi choi, moi phan tu chua bo bai nguoi choi co
  this.listPlayer = [new Array(),new Array(),new Array(),new Array()];
  /*goog.array.forEach( this.listPlayer, function(player){
    for(var i = 0 ; i < 13 ; i++)
      player.push(that.Cards.pop());
  });*/
  
  for( var j = 0; j< 4 ; j++ )
    for(var i = 0 ; i < 13 ; i++){
      
      var card = that.Cards.pop();
      
      /**
       * tim quan 3 bich de set luot danh bat dau tu day
       */
      if(card.getRank() == 3 && card.getSuit() == 3 )
        this.flagPlayer = j;
      this.listPlayer[j].push(card);
      
  }
  
  delete this.Cards;
  /* chua bo bai cua ngoi choi */
  this.listPlayerSprite = new Array();
  
  this.PlayerSpriteWidth = zingame.Constants.INSTANCE_CARD * 13 + zingame.Constants.CARD_WIDTH;
  this.PlayerSpriteHeight = zingame.Constants.CARD_HEIGHT;
  /*
  for( var j = 0; j< 4 ; j++ ){
    that.listPlayerSprite.push(
        new lime.Sprite().setPosition(250, 370).
          setSize(that.PlayerSpriteWidth , that.PlayerSpriteHeight).
          setAnchorPoint(0,0)
    );
  }
 */
  
  //cho chua bai nguoi choi 1
  this.listPlayerSprite.push(
      new lime.Sprite().setPosition(250, 370).
      setSize(this.PlayerSpriteWidth , this.PlayerSpriteHeight).
        setAnchorPoint(0,0)
  );
  
  //cho chua bai nguoi choi 2
  this.listPlayerSprite.push(
      new lime.Sprite().setPosition(470, 250).
      setSize(this.PlayerSpriteWidth , this.PlayerSpriteHeight).
        setAnchorPoint(0,0)
  );
  
  //cho chua bai nguoi choi 3
  this.listPlayerSprite.push(
      new lime.Sprite().setPosition(250, 150).
      setSize(this.PlayerSpriteWidth , this.PlayerSpriteHeight).
        setAnchorPoint(0,0)
  );
  
  //cho chua bai nguoi choi 4
  this.listPlayerSprite.push(
      new lime.Sprite().setPosition(5, 250).
      setSize(this.PlayerSpriteWidth , this.PlayerSpriteHeight).
        setAnchorPoint(0,0)
  );
  
  for( var i = 0; i < 4; i++){
    that.appendChild(that.listPlayerSprite[i]);
  }
  delete this.PlayerSpriteWidth, this.PlayerSpriteHeight;
  /* het cho chua bo bai nguoi choi */
  

  /**
   * Bo bai dang duoc up chuan bi chia
   */
  this.myDeck = new lime.Sprite().setPosition(380, 280).setAnchorPoint(0.5, 0.5);
  this.appendChild(this.myDeck);

  /**
   * Lat bai cua minh sau khi chia
   */
 //this.myCardsSprite = new lime.Sprite().setPosition(250, 370).setSize(265, zingame.Constants.CARD_HEIGHT).setAnchorPoint(0,0).setFill('#f00');

  //this.appendChild(this.myCardsSprite);

  this.saiLuat = new lime.Label("Sai luat").setFontFamily('Verdana').setFontSize(30).setFontWeight('bold').setFontColor("#f00").setPosition(380,280).setOpacity(0);
  this.appendChild(this.saiLuat);
  /**
   * Bai cua mih sau khi lat
   
  this.myCards = new Array();
  */
  /**
   * quan bai dang duoc up
   */
  this.myCardBack = new Array();
  for (i = 1; i < 53; i++) {
    var card = new lime.Sprite().setAnchorPoint(0.5, 0.5).setSize(
        zingame.Constants.CARD_WIDTH, zingame.Constants.CARD_HEIGHT).setFill(
        zingame.Resources.img.Back);
    this.myCardBack.push(card);
    this.myDeck.appendChild(card);
  }

  /**
   * Nut chia bai
   */
  var btnDeal = new lime.Button(new lime.Label().setText('Chia bai').setFill(
      '#f00').setFontSize(30).setSize(180,60)).setPosition(150, 600);
  this.appendChild(btnDeal);
  
  /**
   * nut danh bai
   */
  this.btnFlip = new lime.Button(new lime.Label().setText('Danh bai').setFill(
      '#f00').setFontSize(30).setSize(180,60)).setPosition(350, 600);
  this.appendChild( this.btnFlip);
  
  var btnNext = new lime.Button(new lime.Label().setText('Bo luot').setFill(
    '#f00').setFontSize(30).setSize(180,60)).setPosition(550, 600);
  this.appendChild(btnNext);
  
  /**
   * Bat su kien nut bo luot
   */
  goog.events.listen(btnNext, [ 'mousedown', 'touchstart' ], function() {
    
    that.flagNext ++; 
    if(that.flagNext == 3){
      that.flipCards = [];
      that.flagNext = 0;
    }
    if(that.flagPlayer == 3)
      that.flagPlayer = 0;
    else
      that.flagPlayer++;
    that.navigator[that.flagPlayer].setOpacity(1);
    setTimeout(function(){that.navigator[that.flagPlayer].setOpacity(0);},1000);
  });
  
  /**
   * Bat su kien nut chia
   */
  goog.events.listenOnce(btnDeal, [ 'mousedown', 'touchstart' ], function() {
    that.deal();
    that.navigator[that.flagPlayer].setOpacity(1);
  });
  
  /**
   * Bat su kien chon quan bai
   */
  for(var i = 0 ; i < 4 ; i++ ){
    goog.events.listen(that.listPlayerSprite[i], [ 'mousedown', 'touchstart' ], that.pressHandler_);
  }
  
  /**
   * Bat su kien nut danh bai
   */
  
  var counterFlipCard = 1;
  
  var indexFlipCard = 1; 
  
  goog.events.listen( this.btnFlip, [ 'mousedown', 'touchstart' ], function(){
    
    that.navigator[that.flagPlayer].setOpacity(0);

    if(that.length_(that.listPlayer[that.flagPlayer]) > 0){
      if(zingame.Rule.checkSelect(that.listPlayer[that.flagPlayer], that.flipCards) == true){
        
        that.flagNext = 0;
        that.flipCards = [];
        var detalCoor = Math.floor(Math.random()*31) - 15 ;
        var detalAngel = Math.floor(Math.random()*41) - 20 ;
        
        var zoomout = new lime.animation.Spawn(
            new lime.animation.ScaleTo(0.8).setDuration(0.08).enableOptimizations().setEasing(lime.animation.Easing.EASE),
            new lime.animation.MoveTo(new goog.math.Coordinate( detalCoor, detalCoor)).enableOptimizations().setDuration(0.08).setEasing(lime.animation.Easing.EASE),
            new lime.animation.RotateBy(-180 + detalAngel ).setDuration(0.08).enableOptimizations()
        );
  
        var tmpArray = new Array();
        for ( var i = 0; i < that.listPlayer[that.flagPlayer].length; i++) {
          if (that.listPlayer[that.flagPlayer][i] != undefined && that.listPlayer[that.flagPlayer][i].select_ == true) {
            
            zoomout.addTarget(that.listPlayer[that.flagPlayer][i]);
            that.spriteFlipCards.appendChild(that.listPlayer[that.flagPlayer][i]);
            that.listPlayerSprite[that.flagPlayer].removeChild(that.listPlayer[that.flagPlayer][i]);
            that.flipCards.push(that.listPlayer[that.flagPlayer][i]);
            
            delete that.listPlayer[that.flagPlayer][i];
            //goog.array.removeAt(that.listPlayer[that.flagPlayer],i);
            tmpArray.push(i);
            //that.listPlayer[that.flagPlayer].splice(i, 1);
            // that.myCards.splice(i, 1);
          }
        }
  
        /*goog.array.forEach(that.listPlayer[that.flagPlayer], function(p) {
          if (p != undefined && p.select_ == true) {
            zoomout.addTarget(p);
            that.flipCards.push(p);
            var indexOf = that.listPlayer[that.flagPlayer].indexOf(p);
            //delete p;
             goog.array.removeAt(that.listPlayer[that.flagPlayer],indexOf);
          }
        });*/
        
        zoomout.enableOptimizations().play();
  
        //goog.array.forEach(tmpArray, function(n) {
          // goog.array.removeAt(that.myCards,n);
          // that.myCards.splice(n, 1);
          //console.log(n);
        //});
        /**
         * Update lai vi tri quan bai sau khi danh
         */
        // that.updateDeck();
        if(that.length_(that.listPlayer[that.flagPlayer]) == 0){
          
          var length = 0;
          for(var i = 0 ; i < 4 ; i ++){
            length = length + that.length_(that.listPlayer[i])  ;
          }
          if(length == 39){
            that.navigator[that.flagPlayer].setOpacity(1).setText("Thang trang");
            that.counter ++;
          }else{
            that.navigator[that.flagPlayer].setOpacity(1).setText(that.win[that.counter]);
            that.counter ++;
          }
        }
        
        if(that.flagPlayer == 3)
          that.flagPlayer = 0;
        else
          that.flagPlayer++;
        
        that.navigator[that.flagPlayer].setOpacity(1);
        setTimeout(function(){that.navigator[that.flagPlayer].setOpacity(0);},1000);
        
      }else{
        that.saiLuat.setOpacity(1);
        setTimeout(function(){that.saiLuat.setOpacity(0);},1000);
      }
    }else{
      if(that.flagPlayer == 3)
        that.flagPlayer = 0;
      else
        that.flagPlayer++;
    }
  });
  
};
goog.inherits(zingame.Deck, lime.Layer);
//


zingame.Deck.prototype.length_ = function(array){
  var counter = 0;
  for(var i = 0 ; i < array.length ; i++){
    if(array[i] != undefined )
      counter++;
  }
  return counter;
};

/**
 * Chia bai
 */
zingame.Deck.prototype.deal = function() {
  var counter = 1;
  var i = 1;
  var myDeal = setInterval(function() {
    if (that.myCardBack.length <= 0) {
      //if (i > 53) {
      window.clearInterval(myDeal);

      // hien bai cua minh
      that.flipMyCards();

      delete that.myCardBack;

    } else{
      var card_ = that.myCardBack.pop();
      if (counter > 4)
        counter = 1;
      var position = new goog.math.Coordinate(0, 0);
      switch (counter) {
      case 1:
        position = new goog.math.Coordinate(i * zingame.Constants.INSTANCE_BACK
            - 30, 130);
        //that.myCards.push(card_);
        break;
      case 2:
        position = new goog.math.Coordinate(250 + i
            * zingame.Constants.INSTANCE_BACK, 0);
        break;
      case 3:
        position = new goog.math.Coordinate(i * zingame.Constants.INSTANCE_BACK
            - 30, -130);
        break;
      case 4:
        position = new goog.math.Coordinate(i * zingame.Constants.INSTANCE_BACK
            - 300, 0);
        break;
      default:
        break;
      }
      var move = new lime.animation.MoveBy(position).setDuration(0.3)
          .setEasing(lime.animation.Easing.EASE).enableOptimizations();
      card_.runAction(move);
      card_.getParent().setChildIndex(card_, i);
      counter++;
      i++;
    }
  }, 100);

};

/**
 * Lat bai
 */

zingame.Deck.prototype.sort_ = function (Cards){
  
  var lg =  Cards.length;
  for (var i = 0; i < lg - 1  ; i++)
    for (var j = i + 1 ; j < lg ; j++) {
      if ((Cards[j].getRank() + 10 ) % 13 < (Cards[i].getRank() + 10 ) % 13 ) {
        var tmp = Cards[i];
        Cards[i] = Cards[j];
        Cards[j] = tmp;
      }else if(Cards[j].getRank() == Cards[i].getRank()){
        if (Cards[j].getSuit() > Cards[i].getSuit()  ){
          var tmp = Cards[i];
          Cards[i] = Cards[j];
          Cards[j] = tmp;
        }
      }
    }
  return Cards;
};

zingame.Deck.prototype.render_ = function(Cards, CardSprites){
  
  var lg =  Cards.length;
  for (var i = 0; i < lg  ; i++){
    Cards[i].setPosition(i * zingame.Constants.INSTANCE_CARD + zingame.Constants.CARD_WIDTH/2, zingame.Constants.CARD_HEIGHT/2).setAnchorPoint(0.5, 0.5);
    CardSprites.appendChild(Cards[i]);
   // CardSprites.setChildIndex(Cards[i], i);
  }
  return CardSprites;
};

zingame.Deck.prototype.flipMyCards = function() {

  that.myDeck.removeAllChildren();
  delete that.myDeck;
  
  for( var i = 0 ; i < 4 ;i++ ){
    that.listPlayer[i] = that.sort_(that.listPlayer[i]);
    
    that.listPlayerSprite[i] = that.render_(that.listPlayer[i], that.listPlayerSprite[i]);
  }
  this.checkFastWin();
};

// update lai vi tri
zingame.Deck.prototype.updateDeck = function(){
  
  var lenghtMyCards = that.myCards.length;
  console.log(lenghtMyCards);return;
  var index = 0;                          // The index where the element should be
  for( var key in that.myCards )                 // Iterate the array
  {
      if( parseInt( key ) !== index )     // If the element is out of sequence
        that.myCards.length[index] = that.myCards.length[key];      // Move it to the correct, earlier position in the array
      ++index;                            // Update the index
  }
  
  //var lenghtMyCards = that.myCards.length;
  if( lenghtMyCards > 0 ){
    var middleX = (12-lenghtMyCards)*zingame.Constants.INSTANCE_CARD/2 + zingame.Constants.CARD_WIDTH/2 ;
    console.log(lenghtMyCards);
    for(var i = 0; i < lenghtMyCards ; i++){
      that.myCards[i].setPosition(middleX + i*zingame.Constants.INSTANCE_CARD ,that.myCards[i].getPosition().y);
    }
  }
  
};

// Chọn bài để đánh
zingame.Deck.prototype.pressHandler_ = function(e) {

  
  var pos = e.position;
  // get the cell and row value for the touch
  var c = Math.floor((pos.x ) / zingame.Constants.INSTANCE_CARD) ;

  if( c < 13 && c >= 0)
    this.card = this.getChildAt(c);
  
  // flick from one cell to another is also supported
  if (this.type == 'mousedown' || this.type == 'touchstart') {
    this.swallow([ 'mouseup', 'touchend' ], that.pressHandler_);
  }

  if( this.card !== undefined ){
    this.card.select();
    //console.log("select " + c);
  }
  
  delete this.card;
};



zingame.Deck.prototype.checkFastWin = function (){
  for( var i = 0 ; i < 4 ;i++ ){
    if(this.checkMyCards(that.listPlayer[i])){
      that.navigator[i].setOpacity(1).setText("Thang toi trang");
      this.btnFlip.setHidden(true);
      break;
    }
  }
};

zingame.Deck.prototype.checkMyCards = function(myCards){
  
  var counter = 0;
  var suit = 0;
  var rank = 0;
  //check 4 2
  console.log("check 4 2");
  for(var i = 0 ; i < myCards.length; i++){
      if(counter == 4)
        return true;
      if(myCards[i].getRank() == 2){
        counter++;
      }
  }
  
  counter = 0;
  //check 4 3
  console.log("check 4 3");
  for(var i = 0 ; i < myCards.length ; i++){
      if(counter == 4)
        return true;
      if(myCards[i].getRank() == 3){
        counter++;
      }
  }
  
  console.log("sanh 3 - A");
  counter = 0;
  suit = 0;
  this.rank = new Array();
  //check sanh 3 -> A
  for(var i = 0 ; i < myCards.length ; i++){
    //this.suit.push(myCards[i].getSuit());
    this.rank.push(myCards[i].getRank());
    if(counter == 0)
      suit = myCards[i].getSuit();
    if(suit == myCards[i])
      counter++;
  }
  
  this.rank.sort(function(a,b){return a - b;});
  
  if(this.rank[0] == 3 && counter == 2){
    return true;
  }
  delete this.rank;
  
  /**
  //4 sam co
  console.log("4 sam co");
  counter = 0;
  suit = 0;
  rank = 0;
  var tmp = 0;
  for(var i = 0 ; i < myCards.length -1 ; i++){
    for(var j = 0 ; j < myCards.length; j++){
      
      if(myCards[i].getRank() == myCards[j].getRank()){
        tmp++;
      }
      if( tmp == 3 ){
        counter++;
        tmp = 0;
      }
      if(counter == 4){
        console.log(counter);
        return true;
      }
      
    }
  }
  **/
  
  counter = 0;
  suit = 0;
  rank = 1;
  console.log("6 doi le");
  // check 6 doi le
  for(var i = 0 ; i < myCards.length - 1; i++){
    for(var j = 0 ; j < myCards.length; j++){
      if(counter == 6)
        return true;
      if(myCards[i].getRank() == myCards[j].getRank() && myCards[i].getSuit() == myCards[j].getSuit()){
        if( counter == 0 ){
          suit = myCards[i].getSuit();
          rank = myCards[i].getRank();
        }
        else if(suit == myCards[i].getSuit())
          counter++;
      }
    }
  }
  
  counter = 0;
  suit = 0;
  rank = 1;
  
  //check 5 doi thong
  console.log("5 doi thong");
  for(var i = 0 ; i < myCards.length - 1; i++){
    for(var j = 0 ; j < myCards.length; j++){
      if(counter == 5)
        return true;
      if(myCards[i].getRank() == myCards[j].getRank() && myCards[i].getSuit() == myCards[j].getSuit()){
        if( counter == 0 ){
          suit = myCards[i].getSuit();
          rank = myCards[i].getRank();
        }
        else if(suit == myCards[i].getSuit())
          counter++;
      }
    }
  }
  
  
};
