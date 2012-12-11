goog.provide('ping.popup');

ping.popup.blank = function() {
    var popup = new lime.RoundedRect().
        setRadius(40).setSize(640, 640).setPosition(320, 320).setAnchorPoint(0.5, 0.5).setOpacity(1);
    goog.events.listen(popup ,['touchstart','mousedown'],function(e){
        e.event.stopPropagation();
    });
    return popup;
};

ping.popup.remind = function(score) {
    var b = ping.popup.blank();

    var noteBg = new lime.Sprite().setFill(ping.Resources.img.noteBg).setPosition(-70, -70);
    b.appendChild(noteBg);
    var noteText = new lime.Label().setText("あと"+ score +"点でクーポン ＧＥＴだったのに～").setSize(310, 160).setPosition(-10, 30).setFontSize(30).setLineHeight(1.5);
    noteBg.appendChild(noteText);
    
    var btnBuyCoint = new lime.Button(new lime.RoundedRect().setFill(ping.Resources.img.getCoint).setSize(260, 127)).setSize(260, 127).setPosition(0,140);
    b.appendChild(btnBuyCoint);
    
    var btnEndGame = new lime.Button(new lime.RoundedRect().setFill(ping.Resources.img.endGame).setRadius(12).setSize(260, 69)).setSize(260, 69).setPosition(0,255);
    b.appendChild(btnEndGame);
    
    goog.events.listenOnce(btnBuyCoint ,['touchstart','mousedown'],function(e){
      
      b.getParent().appendChild(ping.popup.buyCoint(score));
      b.getParent().removeChild(b);
      e.event.stopPropagation();
    });
    
    goog.events.listenOnce(btnEndGame ,['touchstart','mousedown'],function(e){
      b.getParent().appendChild(ping.popup.endGame(score));
      b.getParent().removeChild(b);
      e.event.stopPropagation();
    });
    
    return b;
};

ping.popup.buyCoint = function (score){
  var b = ping.popup.blank();
  
  var noteBg = new lime.Sprite().setFill(ping.Resources.img.noteBg).setPosition(-70, -70);
  b.appendChild(noteBg);
  
  var noteText = new lime.Label().setText("ヤマダゲームコイン を10コイン消費します。").setSize(310, 160).setPosition(-10, 10).setFontSize(28).setLineHeight(1.4);
  noteBg.appendChild(noteText);
  
  var btnNext = new lime.Button(new lime.RoundedRect().setFill(ping.Resources.img.next).setSize(168, 69)).setSize(168, 69).setPosition(0,150);
  b.appendChild(btnNext);
  
  var btnCancel = new lime.Button(new lime.RoundedRect().setFill(ping.Resources.img.back).setSize(168, 69)).setSize(168, 69).setPosition(0,250);
  b.appendChild(btnCancel);
  
  goog.events.listenOnce(btnNext ,['touchstart','mousedown'],function(e){
    /**
     * TODO submit to api
     */
    b.getParent().appendChild(ping.popup.sending());
    b.getParent().removeChild(b);
    e.event.stopPropagation();
  });
  
  goog.events.listenOnce(btnCancel ,['touchstart','mousedown'],function(e){
    b.getParent().appendChild(ping.popup.remind(score));
    b.getParent().removeChild(b);
    e.event.stopPropagation();
  });
  
  return b;
};


ping.popup.sending = function (){
  var b = ping.popup.blank();
  
  var noteBg = new lime.Sprite().setFill(ping.Resources.img.noteBg).setPosition(-70, -70);
  b.appendChild(noteBg);
  
  var noteText = new lime.Label().setText("通信中").setSize(310, 160).setPosition(-10, 50).setFontSize(28).setLineHeight(1.4);
  noteBg.appendChild(noteText);
  
  var btnRetry = new lime.Button(new lime.RoundedRect().setFill(ping.Resources.img.retry).setSize(226,54)).setPosition(60,350);
  noteBg.appendChild(btnRetry);
  
  goog.events.listenOnce(btnRetry ,['touchstart','mousedown'],function(e){
    b.getParent().resume();
    b.getParent().removeChild(b);
    e.event.stopPropagation();
  });
  
  return b;
};

ping.popup.endGame = function (score){
  var b = ping.popup.blank();
  
  var noteBg = new lime.Sprite().setFill(ping.Resources.img.noteBg).setPosition(-70, -70);
  b.appendChild(noteBg);
  
  var noteText = new lime.Label().setText("本当にやめちゃう の？").setSize(310, 160).setPosition(-10, 50).setFontSize(28).setLineHeight(1.4);
  noteBg.appendChild(noteText);
  
  var btnNext = new lime.Button(new lime.RoundedRect().setFill(ping.Resources.img.next).setSize(168, 69)).setSize(168, 69).setPosition(0,150);
  b.appendChild(btnNext);
  
  var btnCancel = new lime.Button(new lime.RoundedRect().setFill(ping.Resources.img.back).setSize(168, 69)).setSize(168, 69).setPosition(0,250);
  b.appendChild(btnCancel);
  
  goog.events.listenOnce(btnNext ,['touchstart','mousedown'],function(e){
    /**
     * TODO submit to api
     */
    b.getParent().gameOver();
    b.getParent().removeChild(b);
    e.event.stopPropagation();
  });
  
  goog.events.listenOnce(btnCancel ,['touchstart','mousedown'],function(e){
    b.getParent().appendChild(ping.popup.remind(score));
    b.getParent().removeChild(b);
    e.event.stopPropagation();
  });
  
  return b;
};


