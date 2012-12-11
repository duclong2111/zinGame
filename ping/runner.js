goog.provide('ping.Runner');
goog.require('lime.Sprite');
goog.require('lime.scheduleManager');

ping.Runner = function() {
  lime.Sprite.call(this);
  this.base = 0;
  this.setSize(30, 57).setAnchorPoint(0.5,0.5);
};
goog.inherits(ping.Runner, lime.Sprite);

ping.Runner.prototype.setBase = function (base){
  this.base = base;
};

ping.Runner.prototype.getBase = function (){
  return this.base;
};
ping.Runner.prototype.setBase = function (){
  return this.base++;
};

ping.Runner.prototype.run = function(base){
  
  if(base + this.base > 4)
    base = 4 - this.base;
  var runner = this;
  for( var i = 0; i < base ; i++ ){
    setTimeout(function(){
      runner.runAnimation();
    },i*605);
  }
  
};

ping.Runner.prototype.runAnimation = function(){
  var base = this.base;
  
  
  var runKeyFrame = new lime.animation.KeyframeAnimation().setDelay(1/7);
  
  switch (this.base) {
  case 0:
    this.setPosition(325,555);
    var runAnim = new lime.animation.MoveTo(520,360);
    runKeyFrame.addFrame(new lime.fill.Frame(ping.Resources.img_path.runnerLeft_1,0,0,20,38).setSize(1,1,true));
    runKeyFrame.addFrame(new lime.fill.Frame(ping.Resources.img_path.runnerLeft_2,0,0,20,38).setSize(1,1,true));
    break;
  case 1:
    this.setPosition(530,360);
    var runAnim = new lime.animation.MoveTo(325,160);
    runKeyFrame.addFrame(new lime.fill.Frame(ping.Resources.img_path.runnerRight_1,0,0,20,38).setSize(1,1,true));
    runKeyFrame.addFrame(new lime.fill.Frame(ping.Resources.img_path.runnerRight_2,0,0,20,38).setSize(1,1,true));
    break;
  case 2:
    this.setPosition(325,160);
    var runAnim = new lime.animation.MoveTo(120,350);
    runKeyFrame.addFrame(new lime.fill.Frame(ping.Resources.img_path.runnerRight_1,0,0,20,38).setSize(1,1,true));
    runKeyFrame.addFrame(new lime.fill.Frame(ping.Resources.img_path.runnerRight_2,0,0,20,38).setSize(1,1,true));
    break;
  case 3:
    this.setPosition(120,350);
    var runAnim = new lime.animation.MoveTo(325,555);
    runKeyFrame.addFrame(new lime.fill.Frame(ping.Resources.img_path.runnerLeft_1,0,0,20,38).setSize(1,1,true));
    runKeyFrame.addFrame(new lime.fill.Frame(ping.Resources.img_path.runnerLeft_2,0,0,20,38).setSize(1,1,true));
    break;
  default:
    break;
  }
  
  runAnim.setDuration(0.6).enableOptimizations();
  runKeyFrame.enableOptimizations();
  this.runAction(runKeyFrame);
  this.runAction(runAnim);
  
  var runner = this;
  var parent  = this.getParent();
  
  var flagStop = 0;
  runner.base++;
  if(runner.base == 4)
    flagStop++;
  
  goog.events.listenOnce(runAnim, lime.animation.Event.STOP, function(){
    runKeyFrame.stop();
    if(runner.base == 4 && flagStop == 1 ){
        setTimeout(function(){
          parent.changeScore(1);
          parent.removeChild(runner);
        },500);
        
    }
  });
  
  
};
