goog.provide('ping.Game');


goog.require('ping.Runner');
goog.require('ping.popup');
goog.require('lime.Scene');

ping.Game = function() {
  lime.Scene.call(this);
  var layer = new lime.Layer().setAnchorPoint(0,0).setPosition(-1,0);
  
  this.setAutoResize(lime.AutoResize.ALL);
  
  that = this;
  
  this.Score = 0;
  this.outScore = 0;
  this.strikeScore = 0;
  this.batterScore = 0;
  
  /**
   * Backgound square
   */
  this.bg = new lime.Sprite().setSize(640,640).setFill(ping.Resources.img.bg).setAnchorPoint(0,0);
  layer.appendChild(this.bg);
  
  /**
   * table
   */
  var  table = new lime.Sprite().setSize(98,110).setFill(ping.Resources.img.table).setPosition(500,500).setAnchorPoint(0,0);
  this.bg.appendChild(table);
  
  /**
   * Mark strike score
   */
  var strikeScroller = new lime.Sprite().setSize(48, 24).setPosition(26, -1).setFill(ping.Resources.img.strikeScore).setAnchorPoint(0, 0);
  
  that.markStrike = new lime.Sprite().setPosition(26, -1).setSize(0, 24).setFill(100, 0, 0).setAnchorPoint(0,0);
  
  table.appendChild(strikeScroller);
  
  strikeScroller.setMask(that.markStrike);
  
  table.appendChild(that.markStrike);
  
  /**
   * Mark batter score
   */
  var batterScroller = new lime.Sprite().setSize(72, 24).setPosition(26, 43).setFill(ping.Resources.img.bttScore).setAnchorPoint(0, 0);
  
  that.markBatter = new lime.Sprite().setPosition(26, 43).setSize(0, 24).setFill(100, 0, 0).setAnchorPoint(0,0);
  
  table.appendChild(batterScroller);
  
  batterScroller.setMask(that.markBatter);
  
  table.appendChild(that.markBatter);
  
  /**
   * Mark out score
   */
  var outScroller = new lime.Sprite().setSize(48, 24).setPosition(26, 86).setFill(ping.Resources.img.outScore).setAnchorPoint(0, 0);
  
  that.markOut = new lime.Sprite().setPosition(26, 86).setSize(0, 24).setFill(100, 0, 0).setAnchorPoint(0,0);
  
  table.appendChild(outScroller);
  
  outScroller.setMask(that.markOut);
  
  table.appendChild(that.markOut);
  
  /**
   * batter
   */
  this.batter =  new lime.Sprite().setPosition(275,555).setAnchorPoint(0,0);
  var batterHead = new lime.Sprite().setPosition(0,0).setAnchorPoint(0.5, 0.5).setFill(ping.Resources.img.head).setSize(40,36);
  var batterBody = new lime.Sprite().setPosition(0,32).setAnchorPoint(0.5, 0.5).setFill(ping.Resources.img.body).setSize(34,42);
  this.batter.appendChild(batterBody);
  this.batter.appendChild(batterHead);
  
  //var  character = new lime.Sprite().setSize(42,62).setFill(ping.Resources.img.character).setPosition(260,530).setAnchorPoint(0,0).setScale(1.2);
  this.bg.appendChild(this.batter);
  
  /**
   * gay bong chay
   */
  this.gay = new lime.Sprite().setSize(60,14).setFill(ping.Resources.img.gay).setPosition(285,570).setAnchorPoint(0.05,0).setRotation(-45);
  this.bg.appendChild(this.gay);
 
//flag xac dinh dang danh hay chua danh
  var flag = false;
  
  this.runner = new Array();
  
  /**
   * score bg
   */
  //this.scoreBg = new lime.Sprite().setSize(140,90).setFill(ping.Resources.img.scoreBg).setPosition(20,530).setAnchorPoint(0,0);
  this.scoreBg = new lime.Sprite().setSize(140,90).setPosition(20,530).setAnchorPoint(0,0);
  this.bg.appendChild(this.scoreBg);
  
  this.hunder = new lime.Sprite().setSize(20,31).setFill(ping.Resources.img.s0).setPosition(40,40).setAnchorPoint(0,0);
  this.dozen = new lime.Sprite().setSize(20,31).setFill(ping.Resources.img.s0).setPosition(70,40).setAnchorPoint(0,0);
  this.digit = new lime.Sprite().setSize(20,31).setFill(ping.Resources.img.s0).setPosition(100,40).setAnchorPoint(0,0);
  
  this.scoreBg.appendChild(this.digit);
  this.scoreBg.appendChild(this.dozen);
  this.scoreBg.appendChild(this.hunder);
  
  var playBall = new lime.Sprite().setSize(313,66).setFill(ping.Resources.img.play).setPosition(320,550).setAnchorPoint(0.5,0.5);
  
  that.bg.appendChild(playBall);
  
  var playAnim = new lime.animation.Sequence(
        new lime.animation.MoveTo(320,370).setDuration(0.3).enableOptimizations().setEasing(lime.animation.Easing.EASEOUT),
        new lime.animation.Delay(0.2).enableOptimizations(),
        new lime.animation.MoveTo(320,-0).setDuration(0.3).enableOptimizations().setEasing(lime.animation.Easing.EASEOUT)
      );
  playBall.runAction(playAnim);
  
  goog.events.listenOnce(playAnim, lime.animation.Event.STOP, function() {
    that.bg.removeChild(playBall);
  });
  
  this.balltxt = new lime.Sprite().setSize(83,33).setFill(ping.Resources.img.balltxt).setAnchorPoint(0.5,0.5).setPosition(320,400).setHidden(true);
  this.bg.appendChild(this.balltxt);
  
  //this.startBall = setInterval(this.ball,4500);
  
  
  /**
   * lister event click 
   */
 
  that.isDam = false;
  
  goog.events.listen(that, [ 'touchstart','touchmove','mousedown'], function(e) {
    
    var gayRotation = new lime.animation.Spawn(
                            new lime.animation.RotateBy(90).enableOptimizations().setDuration(0.3).setEasing(lime.animation.Easing.EASE),
                            new lime.animation.MoveBy(-7,2).enableOptimizations().setDuration(0.3).setEasing(lime.animation.Easing.EASE)
                            );
    var gayAnimation = new lime.animation.Sequence(gayRotation, new lime.animation.Delay(.1), gayRotation.reverse());
    
    var batterHeadRotation = new lime.animation.Spawn(
        new lime.animation.RotateBy(45).setDuration(0.25).enableOptimizations().setEasing(lime.animation.Easing.EASE),
        new lime.animation.MoveBy(0,-5).enableOptimizations().setDuration(0.25).setEasing(lime.animation.Easing.EASE)
        );
    
    var batterBodyAnimation = new lime.animation.MoveBy(0,-3).setDuration(0.3).setDuration(0.3).setEasing(lime.animation.Easing.EASE);
   
    if(!flag){
      that.isDam = true;
      that.gay.runAction(gayAnimation);
      batterHead.runAction(new lime.animation.Sequence( batterHeadRotation, new lime.animation.Delay(.2),batterHeadRotation.reverse()));
      batterBody.runAction(new lime.animation.Sequence( batterBodyAnimation, new lime.animation.Delay(.2),batterBodyAnimation.reverse()));
    }
    flag = true;
    goog.events.listenOnce(gayAnimation,lime.animation.Event.STOP,function(){
      flag = false;
      delete gayAnimation,gayRotation,batterHeadRotation,batterBodyAnimation;
    });
  });
  this.appendChild(layer);
  
  
  lime.scheduleManager.scheduleWithDelay(
      ping.Game.startThrow = function() {
        that.ball();
    }, that, 4500);
  
};
goog.inherits(ping.Game,lime.Scene);

ping.Game.prototype.ball = function(){
  
  /**
   * ball
   */
  var ballSprite = new lime.Sprite().setSize(25,25).setFill(ping.Resources.img.ball).setPosition(320,250).setAnchorPoint(0.5,0.5);
  that.bg.appendChild(ballSprite);
  
  var animThrowIndex = Math.floor(Math.random()*3);
  //var animThrowIndex = 2;
  var roadBall = that.animationThrow(animThrowIndex);
  
  setTimeout(function(){
    ballSprite.runAction(roadBall);
  },500);
  
  var animHitIndex = Math.floor(Math.random()*10);
  // get animation khi danh trung bong 
  var animHit = new lime.animation.Spawn(
                  that.animationHit(animHitIndex),
                  new lime.animation.FadeTo(1).setDuration(0.2)
                );
  
  var flagDam = false;
  
  /**this.collision = setInterval(function(){
    //console.log(that.gay.getRotation() );
    
   
    if( ballSprite.getPosition().y < that.gay.getPosition().y + 7 && 
        ballSprite.getPosition().y > that.gay.getPosition().y - 3 && 
        that.gay.getRotation() < 45 && that.gay.getRotation() > 0 && ( animThrowIndex == 0 ||  animThrowIndex == 1)){
      flagDam = true;
      roadBall.stop();
      // Bong den cac vi tri
      ballSprite.setOpacity(0);
      ballSprite.runAction(animHit);
    }
  },10);**/
  
  lime.scheduleManager.scheduleWithDelay(
      ping.Game.collision = function() {
        if( ballSprite.getPosition().y < that.gay.getPosition().y + 7 && 
            ballSprite.getPosition().y > that.gay.getPosition().y - 3 && 
            that.gay.getRotation() < 45 && that.gay.getRotation() > 0 && ( animThrowIndex == 0 ||  animThrowIndex == 1)){
          flagDam = true;
          roadBall.stop();
          // Bong den cac vi tri
          ballSprite.setOpacity(0);
          ballSprite.runAction(animHit);
        }
  }, ballSprite, 10);
  
  // danh trung bong
  goog.events.listenOnce(roadBall,lime.animation.Event.STOP, function() {
    
    /**
     * animThrowIndex xac dinh nem bong trung hay truot
     * flagDam xac dinh danh trung hay danh truot hoac ko danh
     * animHitIndex xac dinh danh trung o nao
     */
    that.calcScore(animThrowIndex,flagDam,animHitIndex,that.isDam );
    
  });
  
  setTimeout(function(){
    that.bg.removeChild(ballSprite);
    lime.scheduleManager.unschedule(ping.Game.collision, ballSprite);
  },2500);
 
};

ping.Game.prototype.calcScore = function(animThrowIndex,flagDam,animHitIndex,isDam ){
  
  // nem trung
  if(animThrowIndex == 0 || animThrowIndex == 1){
    //danh trung
    if(flagDam){
      // home run
      if(animHitIndex == 0){
        that.strikeScore = 0;
        that.batterScore = 0;
        setTimeout(function(){
          that.headShoot();
          that.homeRun();
        },800);
      }
      // 1 hr
      else if (animHitIndex == 1 || animHitIndex == 2) {
        
        that.strikeScore = 0;
        that.batterScore = 0;
        setTimeout(function(){
          that.go(1);
          that.hit();
        },400);
      }
      // 3 hr 
      else if (animHitIndex == 3) {
        that.strikeScore = 0;
        that.batterScore = 0;
        setTimeout(function(){
          that.go(3);
          that.threeBase();
        },700);
      }
      // 2 hr 
      else if (animHitIndex == 4) {
        that.strikeScore = 0;
        that.batterScore = 0;
        setTimeout(function(){
          that.go(2);
          that.twoBase();
        },600);
      }
      // out
      else if(animHitIndex == 5 || animHitIndex == 6 || animHitIndex == 7 || animHitIndex == 8){
          that.batterScore = 0;
          that.outScore++;
          setTimeout(function(){
            that.out();
          },700);
          
      }
      // foul
      else if(animHitIndex == 9 || animHitIndex == 10){
          if(that.outScore == 2)
            that.outScore++;
          else
            that.strikeScore++;
          that.foul();
      }
    }else{ //danh truot hoac ko danh
        that.strikeScore++;
        that.strikeAnim();
    }
  }else if(animThrowIndex == 2){// nem truot
    if(isDam){ // co danh nhung truot
        that.strikeScore++;
        that.strikeAnim();
    }else{ // ko danh
      that.batterScore++;
      setTimeout(function(){
        that.balltxt.setHidden(false);
      },1200);
      
      setTimeout(function(){
        that.balltxt.setHidden(true);
      },2000);
    }
  }
  
  if( that.strikeScore > 2){
    that.outScore++;
    that.batterScore = 0;
    that.strikeScore = 0;
  }
  if(that.batterScore > 3){
    that.strikeScore = 0;
    that.batterScore = 0;
    //setTimeout(function(){
      that.changeScore(1,true);
      that.go(1);
    //},400);
    
  }
  if(that.outScore > 2){
    that.calledEnd();
  }
    
//  console.log(that.strikeScore);
  that.isDam = false;
  that.setMark_(that.markStrike ,that.strikeScore);
  that.setMark_(that.markBatter ,that.batterScore);
  that.setMark_(that.markOut ,that.outScore);
};

ping.Game.prototype.strikeAnim = function(){
  
  var strike = new lime.Sprite().setSize(126,27).setFill(ping.Resources.img.strike).setAnchorPoint(0.5,0.5).setPosition(320,450);
  that.bg.appendChild(strike);
  var animStrike = new lime.animation.MoveTo(320,400).enableOptimizations().setDuration(1).setEasing(lime.animation.Easing.EASE);
  strike.runAction(animStrike);
  goog.events.listenOnce(animStrike,lime.animation.Event.STOP,function(){
    that.bg.removeChild(strike);
  });
};

ping.Game.prototype.threeBase = function(){
  
  var strike = new lime.Sprite().setSize(229,32).setFill(ping.Resources.img.threeBase).setAnchorPoint(0.5,0.5).setPosition(320,420).setScale(0.5);
  that.bg.appendChild(strike);
  
  var animStrike = new lime.animation.Sequence( 
      new lime.animation.Spawn(
        new lime.animation.MoveTo(320,370).enableOptimizations().setDuration(0.6).setEasing(lime.animation.Easing.EASEOUT),
        new lime.animation.ScaleTo(1.2).enableOptimizations().setDuration(0.6).setEasing(lime.animation.Easing.EASEOUT)
        ),
        new lime.animation.ScaleTo(0.7).enableOptimizations().setDuration(0.2).setEasing(lime.animation.Easing.EASEOUT),
        new lime.animation.ScaleTo(1.2).enableOptimizations().setDuration(0.2).setEasing(lime.animation.Easing.EASEOUT),
        new lime.animation.ScaleTo(1).enableOptimizations().setDuration(0.2).setEasing(lime.animation.Easing.EASEOUT),
      new lime.animation.Delay(0.1)
    );
  

  var tunghoa = new lime.Sprite().setSize(448,442).setFill(ping.Resources.img.tunghoa).setAnchorPoint(0.5,0.5).setPosition(300,500).setScale(0.3);
  
  var rotateAnim = new lime.animation.Sequence(
                      new lime.animation.RotateTo(5).enableOptimizations(),
                      new lime.animation.RotateTo(-5).enableOptimizations(),
                      new lime.animation.RotateTo(5).enableOptimizations(),
                      new lime.animation.RotateTo(-5).enableOptimizations(),
                      new lime.animation.RotateTo(5).enableOptimizations(),
                      new lime.animation.RotateTo(-5).enableOptimizations(),
                      new lime.animation.RotateTo(5).enableOptimizations(),
                      new lime.animation.RotateTo(-5).enableOptimizations(),
                      new lime.animation.RotateTo(5).enableOptimizations(),
                      new lime.animation.RotateTo(-5).enableOptimizations(),
                      new lime.animation.RotateTo(5).enableOptimizations(),
                      new lime.animation.RotateTo(-5).enableOptimizations()
                    ).setDuration(0.3);
  var tunghoaAnim = new lime.animation.Sequence(
                      new lime.animation.Spawn(
                          new lime.animation.MoveTo(300,300).enableOptimizations(),
                          new lime.animation.ScaleTo(1).enableOptimizations()
                      ).setDuration(0.4).setEasing(lime.animation.Easing.EASE),
                      rotateAnim
                    );
  that.bg.appendChild(tunghoa);
  tunghoa.runAction(tunghoaAnim);
  
  strike.runAction(animStrike);
  
  goog.events.listenOnce(animStrike,lime.animation.Event.STOP,function(){
    tunghoaAnim.stop();
    that.bg.removeChild(tunghoa);
    that.bg.removeChild(strike);
  });
};

ping.Game.prototype.twoBase = function(){
  
  var strike = new lime.Sprite().setSize(229,32).setFill(ping.Resources.img.twoBase).setAnchorPoint(0.5,0.5).setPosition(320,330).setScale(0.5);
  that.bg.appendChild(strike);
  var animStrike = new lime.animation.Sequence( 
      new lime.animation.Spawn(
        new lime.animation.MoveTo(320,380).enableOptimizations().setDuration(0.6).setEasing(lime.animation.Easing.EASEOUT),
        new lime.animation.ScaleTo(1.2).enableOptimizations().setDuration(0.6).setEasing(lime.animation.Easing.EASEOUT)
        ),
      new lime.animation.Delay(0.1)
    );
  
var tunghoa = new lime.Sprite().setSize(448,442).setFill(ping.Resources.img.tunghoa).setAnchorPoint(0.5,0.5).setPosition(300,500).setScale(0.3);
  
  var rotateAnim = new lime.animation.Sequence(
                      new lime.animation.RotateTo(5).enableOptimizations(),
                      new lime.animation.RotateTo(-5).enableOptimizations(),
                      new lime.animation.RotateTo(5).enableOptimizations(),
                      new lime.animation.RotateTo(-5).enableOptimizations(),
                      new lime.animation.RotateTo(5).enableOptimizations(),
                      new lime.animation.RotateTo(-5).enableOptimizations(),
                      new lime.animation.RotateTo(5).enableOptimizations(),
                      new lime.animation.RotateTo(-5).enableOptimizations(),
                      new lime.animation.RotateTo(5).enableOptimizations(),
                      new lime.animation.RotateTo(-5).enableOptimizations(),
                      new lime.animation.RotateTo(5).enableOptimizations(),
                      new lime.animation.RotateTo(-5).enableOptimizations()
                    ).setDuration(0.3);
  var tunghoaAnim = new lime.animation.Sequence(
                      new lime.animation.Spawn(
                          new lime.animation.MoveTo(300,300).enableOptimizations(),
                          new lime.animation.ScaleTo(1).enableOptimizations()
                      ).setDuration(0.4).setEasing(lime.animation.Easing.EASE),
                      rotateAnim
                    );
  that.bg.appendChild(tunghoa);
  tunghoa.runAction(tunghoaAnim);
  
  strike.runAction(animStrike);
  goog.events.listenOnce(animStrike,lime.animation.Event.STOP,function(){
    tunghoaAnim.stop();
    that.bg.removeChild(tunghoa);
    that.bg.removeChild(strike);
  });
};

ping.Game.prototype.foul = function(){
  
  var strike = new lime.Sprite().setSize(107,32).setFill(ping.Resources.img.txtfound).setAnchorPoint(0.5,0.5).setPosition(320,400);
  that.bg.appendChild(strike);
  var animStrike = new lime.animation.Delay(0.1);
  strike.runAction(animStrike);
  goog.events.listenOnce(animStrike,lime.animation.Event.STOP,function(){
    that.bg.removeChild(strike);
  });
};

ping.Game.prototype.hit = function(){
  
  var fallingAnim = new lime.animation.Sequence(
                        new lime.animation.ScaleTo(1).setDuration(1.5).enableOptimizations(),
                        new lime.animation.ScaleTo(0).setDuration(1.5).enableOptimizations()
                    );
  
  var fallingZone = new lime.Sprite().setAnchorPoint(0,0).setPosition(100,100);
  that.bg.appendChild(fallingZone);
  
  for(var i = 1 ; i < 6 ; i++){
    var falling = new lime.Sprite().setSize(58,59).setFill(ping.Resources.img.falling).setAnchorPoint(0.5,0.5).setPosition(Math.floor(Math.random()*301 + 100), Math.floor(Math.random()*301 + 100)).setScale(0);
    fallingZone.appendChild(falling);
    falling.runAction(fallingAnim);
  }
  
  setTimeout(function(){
      fallingAnim.stop();
      that.bg.removeChild(fallingZone);
  },1700);
  
  
  var strike = new lime.Sprite().setSize(116,49).setFill(ping.Resources.img.txthit).setAnchorPoint(0.5,0.5).setPosition(500,350).setScale(0.6);
  that.bg.appendChild(strike);
  var animStrike = new lime.animation.Sequence( 
                    new lime.animation.Spawn(
                      new lime.animation.MoveTo(320,350).enableOptimizations().setDuration(0.6).setEasing(lime.animation.Easing.EASEOUT),
                      new lime.animation.ScaleTo(1.2).enableOptimizations().setDuration(0.4).setEasing(lime.animation.Easing.EASEOUT)
                      ),
                    new lime.animation.Delay(0.1)
                  );
  strike.runAction(animStrike);
  goog.events.listenOnce(animStrike,lime.animation.Event.STOP,function(){
    that.bg.removeChild(strike);
  });
};

ping.Game.prototype.homeRun = function(){
  
  var strike = new lime.Sprite().setSize(155,55).setPosition(320,50).setFill(ping.Resources.img.homerun).setAnchorPoint(0.5,0.5).setScale(0.5);
  that.bg.appendChild(strike);
  var animStrike = new lime.animation.Sequence( 
                      new lime.animation.ScaleTo(1.3).setDuration(0.2).enableOptimizations().setEasing(lime.animation.Easing.EASE),
                      new lime.animation.ScaleTo(0.8).setDuration(0.15).enableOptimizations().setEasing(lime.animation.Easing.EASE),
                      new lime.animation.ScaleTo(1).setDuration(0.08).enableOptimizations().setEasing(lime.animation.Easing.EASE)
                  );
  strike.runAction(animStrike);
  goog.events.listenOnce(animStrike,lime.animation.Event.STOP,function(){
    setTimeout(function(){that.bg.removeChild(strike);},400);
  });
};

ping.Game.prototype.out = function(){
  
  var strike = new lime.Sprite().setSize(115,46).setFill(ping.Resources.img.txtout).setAnchorPoint(0.5,0.5).setPosition(320,330).setScale(1.5);
  that.bg.appendChild(strike);
  var animStrike = new lime.animation.Sequence( 
                    new lime.animation.Spawn(
                      new lime.animation.MoveTo(320,370).enableOptimizations().setDuration(0.4).setEasing(lime.animation.Easing.EASEOUT),
                      new lime.animation.ScaleTo(1).enableOptimizations().setDuration(0.4).setEasing(lime.animation.Easing.EASEOUT)
                      ),
                    new lime.animation.Delay(0.1)
                  );
  strike.runAction(animStrike);
  goog.events.listenOnce(animStrike,lime.animation.Event.STOP,function(){
    that.bg.removeChild(strike);
  });
};

ping.Game.prototype.go = function(base){
  if(that.runner.length == 0 || goog.array.peek(that.runner).base > 0){
    var runner = new ping.Runner();
    that.appendChild(runner);
    that.runner.push(runner);
    goog.array.forEach(that.runner,function(r){
      r.run(base);
    });
  }else{
    goog.array.forEach(that.runner,function(r){
      r.run(base);
    });
  }
  
};

ping.Game.prototype.changeScore = function(score, remove ){
  //co runner dung o lo 3 thi ko cong diem
  if(that.runner[0] != undefined && that.runner[0].base == 3 && remove == true )
    that.Score = that.Score;
  else
    that.Score = that.Score + score;
  if(!goog.array.isEmpty(that.runner) && !remove)
    goog.array.removeAt(that.runner,0);
  
  that.renderScore();
};

ping.Game.prototype.headShoot = function(){
  
  /*
  var numberRunner = that.runner.length;
  
  goog.array.forEach(that.runner,function(r){
    that.removeChild(r);
  });
  that.runner = [];
  
  var runner = new ping.Runner();
  runner.run(4);
  that.appendChild(runner);
  if(numberRunner > 0){
    that.changeScore(2);
  }
  */
  that.go(4);
  var tunghoa = new lime.Sprite().setSize(448,442).setFill(ping.Resources.img.tunghoa).setAnchorPoint(0.5,0.5).setPosition(300,500).setScale(0.3);
  
  var rotateAnim = new lime.animation.Sequence(
                      new lime.animation.RotateTo(5).enableOptimizations(),
                      new lime.animation.RotateTo(-5).enableOptimizations(),
                      new lime.animation.RotateTo(5).enableOptimizations(),
                      new lime.animation.RotateTo(-5).enableOptimizations(),
                      new lime.animation.RotateTo(5).enableOptimizations(),
                      new lime.animation.RotateTo(-5).enableOptimizations(),
                      new lime.animation.RotateTo(5).enableOptimizations(),
                      new lime.animation.RotateTo(-5).enableOptimizations(),
                      new lime.animation.RotateTo(5).enableOptimizations(),
                      new lime.animation.RotateTo(-5).enableOptimizations(),
                      new lime.animation.RotateTo(5).enableOptimizations(),
                      new lime.animation.RotateTo(-5).enableOptimizations()
                    ).setDuration(0.3);
  var tunghoaAnim = new lime.animation.Sequence(
                      new lime.animation.Spawn(
                          new lime.animation.MoveTo(300,300).enableOptimizations(),
                          new lime.animation.ScaleTo(1).enableOptimizations()
                      ).setDuration(0.4).setEasing(lime.animation.Easing.EASE),
                      rotateAnim
                    );
  var yeah =  new lime.Sprite().setSize(228,359).setFill(ping.Resources.img.yeah).setAnchorPoint(0,0).setPosition(170,180).setScale(1.3);
  
  //setTimeout(function(){
  that.bg.appendChild(tunghoa);
  tunghoa.runAction(tunghoaAnim);
  that.appendChild(yeah);
  
  that.setChildIndex(yeah,that.getNumberOfChildren() + 4);
      //},1000);
  
  setTimeout(function(){
    tunghoaAnim.stop();
    that.removeChild(yeah);
    that.bg.removeChild(tunghoa);
  },1000);
};

ping.Game.prototype.setMark_ = function(mark, score){
  mark.setSize(score*24,mark.getSize().height);
};

ping.Game.prototype.calledEnd = function(){
  lime.scheduleManager.unschedule(ping.Game.startThrow, that);
  //var box = ping.popup.remind((10-that.Score).toString());
  //that.appendChild(box);
  var mc = new lime.Sprite().setSize(141,406).setFill(ping.Resources.img.mc).setAnchorPoint(0,0).setPosition(650,210).setScale(1.3);
  mc.id = "mc";
  that.appendChild(mc);
  mc.runAction(new lime.animation.MoveTo(450,210).setDuration(0.6).enableOptimizations().setEasing(lime.animation.Easing.EASE));
};

ping.Game.prototype.resume = function(){
  lime.scheduleManager.scheduleWithDelay(
      ping.Game.startThrow = function() {
        that.ball();
  }, that, 4500);
  goog.array.forEach(that.children_, function(object){
    if(object.id == "mc"){
      that.removeChild(object);
    }
  });
  that.outScore = 2;
};


ping.Game.prototype.gameOver = function(){
  
  this.bg.removeChild(this.balltxt);
  //goog.events.unlisten(this.bg, [ 'mousedown', 'touchstart' ], function(e){console.log('fdaf');});
  that.batterScore = 0 ;
  that.outScore = 0 ; 
  that.strikeScore = 0 ;
  
  setTimeout(function(){
    that.bg.removeChild(that.gay);
    that.bg.removeChild(that.batter);
    
    var btnRetry = new lime.Button(new lime.Sprite().setFill(ping.Resources.img.retry).setSize(226,54)).setPosition(320, 600);
    
    that.appendChild(btnRetry);
    
    var gameOverTxt = new  lime.Sprite().setFill(ping.Resources.img.gameOver).setSize(204,33).setScale(2).setPosition(120,50).setAnchorPoint(0,0);
    that.appendChild(gameOverTxt);
    
    goog.events.listenOnce(btnRetry,[ 'mousedown', 'touchstart' ],function(){
      /**
       * TODO
       */
      that.destructor_();
      ping.start_();
      //that.getParent().newGame(that.getScene()) ;
      
    });
    /*
    goog.events.listenOnce(btnRanking,[ 'mousedown', 'touchstart' ],function(){
      window.location = "http://www.yahoo.co.jp/";
    });
    */
  },1000);
  
};

ping.Game.prototype.destructor_ = function(){
  delete that,this;
};

ping.Game.prototype.renderScore = function(){
  
  var hunder = Math.floor(that.Score / 100);
  var dozen = Math.floor((that.Score - hunder*100)/10);
  var digit = that.Score - hunder*100 - dozen*10;
  
  that.digit.setFill(ping.Resources.img["s" + digit.toString()]);
  that.dozen.setFill(ping.Resources.img["s" + dozen.toString()]);
  that.hunder.setFill(ping.Resources.img["s" + hunder.toString()]);
};

ping.Game.prototype.win = function(){
  
};

ping.Game.prototype.animationThrow = function (index){

  var anim = '';
  switch (index) {
  // nem trung
  case 0:
    anim = new lime.animation.MoveBy(0,400);
    break;
  case 1:
    anim = new lime.animation.MoveBy(0,400);
    break;
  // nem truot
  case 2:
    anim = new lime.animation.MoveBy(50,400);
    break;
  default:
    break;
  }
  return anim.setDuration(1.3 - Math.random()/1.5).enableOptimizations().setEasing(lime.animation.Easing.LINEAR);
};


ping.Game.prototype.animationHit = function (index){

  var anim = '';
  switch (index) {
  //hr
  case 0:
    anim = new lime.animation.MoveTo(320, 50);
    break;
  //1 hr
  case 1:
    anim = new lime.animation.MoveTo(260, 120);
    break;
  //1 hr
  case 2:
    anim = new lime.animation.MoveTo(380, 120);
    break;
  //3 hr
  case 3:
    anim = new lime.animation.MoveTo(95, 200);
    break;
  //2 hr
    /**
     * TODO
     */
  case 4:
    anim = new lime.animation.MoveTo(540, 200);
    break;
  //out
  case 5:
    anim = new lime.animation.MoveTo(80, 300);
    break;
  //out
  case 6:
    anim = new lime.animation.MoveTo(560, 300);
    break;
  //out 
  //case 7:
    //anim = new lime.animation.MoveTo(260, 120);
    //break;
  //out
  case 7:
    anim = new lime.animation.MoveTo(240, 330);
    break;
  //foul
  case 8:
    anim = new lime.animation.MoveTo(400, 330);
    break;
  //foul
  case 9:
    anim = new lime.animation.MoveTo(60, 410);
    break;
  //foul
  case 10:
    anim = new lime.animation.MoveTo(590, 410);
    break;
  default:
    break;
  }
  return anim.setDuration(1).enableOptimizations().setEasing(lime.animation.Easing.EASE);
};