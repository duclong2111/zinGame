goog.provide('zingame.Rule');

zingame.Rule.checkSelect = function(Cards,flipCards) {
  
  var tmpCards = new Array();
  
  var lg = Cards.length;
  for( var i = 0 ; i < lg ; i ++){
    if(Cards[i] != undefined && Cards[i].select_ == true){
      tmpCards.push(Cards[i]);
    }
  }
  
  var lgTmp = tmpCards.length;
  var lgFlip = flipCards.length;
  
  if( lgTmp == 4 && lgFlip == 1 ){
    if(this.cutTwo(Cards,flipCards))
      return true;
  }
  
  if(lgTmp != lgFlip && lgFlip > 0 )
    return false;
  
  if(lgTmp > 1)
    tmpCards.sort(function(a,b){return a.getRank() - b.getRank();});
    
  if( flipCards != undefined  && lgFlip > 1 )
    flipCards.sort(function(a,b){return a.getRank() - b.getRank();});
  
  var result = false;
  switch (lgTmp) {
  case 1:
    result = true;
    break;
  case 2:
    result = this.two(tmpCards);
    break;
  case 3:
    result = this.three(tmpCards);
    break;
  case 4:
    result = this.four(tmpCards);
    break;
  case 5:
    result = this.five(tmpCards);
    break;
  default:
    break;
  };
  
  if(result == false){
    return false;
  }else{
    if(flipCards == undefined  || lgFlip == 0)
      return true;
    else{
      console.log(lgFlip);
      return  this.checkFlip(lgTmp,tmpCards,flipCards);
    }
  }
  return false;
};

zingame.Rule.cutTwo = function(Cards,flipCards){
  if(flipCards[0].getRank() == 2 && 
      Cards[0].getRank() == Cards[1].getRank() &&
      Cards[1].getRank() == Cards[2].getRank() &&
      Cards[2].getRank() == Cards[3].getRank() 
      )
    return true;
  
  return false;
    
};

zingame.Rule.checkFlip = function(lgTmp,tmpCards,flipCards){
  
  var result_ = false;
  if(tmpCards[0].getRank() == 2){
    
    switch (lgTmp) {
    case 1:
      result_ = (tmpCards[0].getSuit() < flipCards[0].getSuit() || flipCards[0].getRank() != 2 ) ? true : false;
      break;
    case 2:
      result_ = (tmpCards[0].getRank() > flipCards[0].getRank() && tmpCards[0].getSuit() == flipCards[0].getSuit()) ? true : false;
      if(flipCards[0].getRank() != 2)
        result_ = true;
      else{
        tmpCards.sort(function(a,b){return a.getSuit() - b.getSuit();});
        flipCards.sort(function(a,b){return a.getSuit() - b.getSuit();});
        if( tmpCards[0].getSuit() >  flipCards[0].getSuit && tmpCards[1].getSuit() >  flipCards[1].getSuit)
          result_= true;
        else 
          result_ = false;
      }
      break;
    case 3:
      result_ =  true ;
      break;
    case 4:
      result_ = true;
      break;
    default:
      break;
    }
    
  }else
    result_ = ( 
                ((tmpCards[0].getRank() + 10) % 13) > ((flipCards[0].getRank() + 10) % 13 ) 
                && ( tmpCards[0].getSuit() == flipCards[0].getSuit() ) 
               ) ? true : false;
  
  return result_;
};

// check doi
zingame.Rule.two = function(CardsCheck){
  
  if( CardsCheck[0].getRank() == CardsCheck[1].getRank() )
    if(CardsCheck[0].getSuit()%2 != CardsCheck[1].getSuit()%2 )
      return true;
  return false;
};

// check sam co hoac sanh
zingame.Rule.three = function(CardsCheck){
  
 
  if( CardsCheck[0].getRank() == CardsCheck[1].getRank() && 
      CardsCheck[1].getRank() == CardsCheck[2].getRank()){
    return true;
  }
  
  for(var i = 0; i < CardsCheck.length ; i++){
    if(CardsCheck[i].getRank() == 2)
      return false;
  }
  
  if( CardsCheck[0].getSuit() == CardsCheck[1].getSuit() && 
    CardsCheck[1].getSuit() == CardsCheck[2].getSuit()){
    if(CardsCheck[0].getRank() + 1 == CardsCheck[1].getRank() && 
        CardsCheck[1].getRank() +1 == CardsCheck[2].getRank()){
      return true;
    }
  }
  return false;
};

// check sam co hoac tu quy
zingame.Rule.four = function(CardsCheck){
  
  if( CardsCheck[0].getRank() == CardsCheck[1].getRank() && 
      CardsCheck[1].getRank() == CardsCheck[2].getRank() &&
      CardsCheck[2].getRank() == CardsCheck[3].getRank() ){
    return true;
  }
  
  for(var i = 0; i < CardsCheck.length ; i++){
    if(CardsCheck[i].getRank() == 2)
      return false;
  }
  
  if( CardsCheck[0].getSuit() == CardsCheck[1].getSuit() &&
      CardsCheck[1].getSuit() == CardsCheck[2].getSuit() &&
      CardsCheck[2].getSuit() == CardsCheck[3].getSuit()){
    if(CardsCheck[0].getRank() + 1 == CardsCheck[1].getRank() && 
        CardsCheck[1].getRank() +1 == CardsCheck[2].getRank() && 
        CardsCheck[2].getRank() +1 == CardsCheck[3].getRank()){
      return true;
    }
  }
  
  return false;
};

// check sanh rong
zingame.Rule.five = function(CardsCheck){
  
  for(var i = 0; i < CardsCheck.length ; i++){
    if(CardsCheck[i].getRank() == 2)
      return false;
  }
  
  
  if( CardsCheck[0].getSuit()  == CardsCheck[1].getSuit() &&
      CardsCheck[1].getSuit()  == CardsCheck[2].getSuit() &&
      CardsCheck[2].getSuit() == CardsCheck[3].getSuit() &&
      CardsCheck[3].getSuit() == CardsCheck[4].getSuit() ){
    if(CardsCheck[0].getRank() + 1 == CardsCheck[1].getRank() && 
        CardsCheck[1].getRank() +1 == CardsCheck[2].getRank() && 
        CardsCheck[2].getRank() +1 == CardsCheck[3].getRank() && 
        CardsCheck[3].getRank() +1 == CardsCheck[4].getRank()){
      return true;
    }
  }
  
  return false;
};
