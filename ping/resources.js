goog.provide('ping.Resources');
ping.Resources.listFileName = [
                              'assets/MSGOTHIC.TTC',
                              'assets/MSMINCHO.TTC',
                              'assets/back.png',
                              'assets/ball.png',
                              'assets/balltxt.png',
                              'assets/bg.png',
                              'assets/bg_1.png',
                              'assets/body.png',
                              'assets/btnStart.png',
                              'assets/bttScore.png',
                              'assets/character.png',
                              'assets/endGame.png',
                              'assets/falling.png',
                              'assets/gameOver.png',
                              'assets/gay.png',
                              'assets/getCoint.png',
                              'assets/guide.png',
                              'assets/head.png',
                              'assets/homerun.gif',
                              'assets/howto.png',
                              'assets/hr.png',
                              'assets/light.png',
                              'assets/mc.png',
                              'assets/next.png',
                              'assets/noteBg.png',
                              'assets/outScore.png',
                              'assets/play.png',
                              'assets/ranking.png',
                              'assets/rankurl.png',
                              'assets/retry.png',
                              'assets/runnerLeft_1.png',
                              'assets/runnerLeft_2.png',
                              'assets/runnerRight_1.png',
                              'assets/runnerRight_2.png',
                              'assets/s0.png',
                              'assets/s1.png',
                              'assets/s2.png',
                              'assets/s3.png',
                              'assets/s4.png',
                              'assets/s5.png',
                              'assets/s6.png',
                              'assets/s7.png',
                              'assets/s8.png',
                              'assets/s9.png',
                              'assets/scoreBg.png',
                              'assets/star.gif',
                              'assets/start.png',
                              'assets/starttxt.png',
                              'assets/strike.png',
                              'assets/strikeScore.png',
                              'assets/table.png',
                              'assets/threeBase.png',
                              'assets/tunghoa.png',
                              'assets/twoBase.png',
                              'assets/txtfound.png',
                              'assets/txthit.png',
                              'assets/txtout.png',
                              'assets/yeah.png'
                                ];
ping.Resources.percentage = 0;
ping.Resources.listName = [];
//ping.Resources.listAddedName = [];
ping.Resources.img = {};
ping.Resources.img_path = {};


ping.Resources.load = function(){
    var length1 = ping.Resources.listFileName.length;
//    var length2 = ping.Resources.listAddedName.length;
    for(var i = 0; i<length1; i++){
        var arr = ping.Resources.listFileName[i].split('/');
        ping.Resources.listName[i] = arr[arr.length - 1].split('.')[0];

        ping.Resources.img[ping.Resources.listName[i]] = 
            new lime.fill.Image( ping.Resources.listFileName[i]);
        
        ping.Resources.img_path[ping.Resources.listName[i]] =  ping.Resources.listFileName[i];
    }
    
    lime.scheduleManager.scheduleWithDelay(ping.Resources.checkLoaded_ = function(){
        var count = 0;
        for(var j = 0; j<length1; j++){
            if(ping.Resources.img[ping.Resources.listName[j]].isLoaded()){
                count++;
            }
        }
        ping.Resources.percentage = count/(length1);
        if(count === length1 ){
            ping.Resources.percentage = 1;
            lime.scheduleManager.unschedule(ping.Resources.checkLoaded_, 
                    ping.Resources.img[ping.Resources.listName[0]]);
        }
    }, ping.Resources.img[ping.Resources.listName[0]], 500);
};
