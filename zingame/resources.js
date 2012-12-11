goog.provide('zingame.Resources');
zingame.Resources.listFileName = [
                                // Global
                                'assets/cards/10_club.png',
                                'assets/cards/10_diamond.png',
                                'assets/cards/10_heart.png',
                                'assets/cards/10_spade.png',
                                'assets/cards/11_club.png',
                                'assets/cards/11_diamond.png',
                                'assets/cards/11_heart.png',
                                'assets/cards/11_spade.png',
                                'assets/cards/12_club.png',
                                'assets/cards/12_diamond.png',
                                'assets/cards/12_heart.png',
                                'assets/cards/12_spade.png',
                                'assets/cards/13_club.png',
                                'assets/cards/13_diamond.png',
                                'assets/cards/13_heart.png',
                                'assets/cards/13_spade.png',
                                'assets/cards/14_club.png',
                                'assets/cards/14_diamond.png',
                                'assets/cards/14_heart.png',
                                'assets/cards/14_spade.png',
                                'assets/cards/1_club.png',
                                'assets/cards/1_diamond.png',
                                'assets/cards/1_heart.png',
                                'assets/cards/1_spade.png',
                                'assets/cards/2_club.png',
                                'assets/cards/2_diamond.png',
                                'assets/cards/2_heart.png',
                                'assets/cards/2_spade.png',
                                'assets/cards/3_club.png',
                                'assets/cards/3_diamond.png',
                                'assets/cards/3_heart.png',
                                'assets/cards/3_spade.png',
                                'assets/cards/4_club.png',
                                'assets/cards/4_diamond.png',
                                'assets/cards/4_heart.png',
                                'assets/cards/4_spade.png',
                                'assets/cards/5_club.png',
                                'assets/cards/5_diamond.png',
                                'assets/cards/5_heart.png',
                                'assets/cards/5_spade.png',
                                'assets/cards/6_club.png',
                                'assets/cards/6_diamond.png',
                                'assets/cards/6_heart.png',
                                'assets/cards/6_spade.png',
                                'assets/cards/7_club.png',
                                'assets/cards/7_diamond.png',
                                'assets/cards/7_heart.png',
                                'assets/cards/7_spade.png',
                                'assets/cards/8_club.png',
                                'assets/cards/8_diamond.png',
                                'assets/cards/8_heart.png',
                                'assets/cards/8_spade.png',
                                'assets/cards/9_club.png',
                                'assets/cards/9_diamond.png',
                                'assets/cards/9_heart.png',
                                'assets/cards/9_spade.png',
                                'assets/cards/Back.png',
                                'assets/background/Background.png',
                                'assets/background/profile_bg.png',
                                'assets/icon/ava_default.png',
                                'assets/icon/dealer.png',
                                'assets/icon/chat.png',
                                'assets/icon/all.png',
                                ];
zingame.Resources.percentage = 0;
zingame.Resources.listName = [];
zingame.Resources.listAddedName = [];
zingame.Resources.img = {};
zingame.Resources.img_path = {};


zingame.Resources.load = function(){
    var length1 = zingame.Resources.listFileName.length;
    var length2 = zingame.Resources.listAddedName.length;
    for(var i = 0; i<length1; i++){
        var arr = zingame.Resources.listFileName[i].split('/');
        zingame.Resources.listName[i] = arr[arr.length - 1].split('.')[0];

        zingame.Resources.img[zingame.Resources.listName[i]] = new lime.fill.Image(zingame.Resources.listFileName[i]);
        zingame.Resources.img_path[zingame.Resources.listName[i]] =  zingame.Resources.listFileName[i];
    }
    for(var i = 0; i<length2; i++){
        for(key in zingame.Resources.listAddedName[i]){
            zingame.Resources.listName[i+length1] = key;
                zingame.Resources.img[key] =  new lime.fill.Image(zingame.Resources.listAddedName[i][key]);
                break;
        }
    }
    lime.scheduleManager.scheduleWithDelay(zingame.Resources.checkLoaded_ = function(){
        var count = 0;
        for(var j = 0; j<length1+length2; j++){
            if(zingame.Resources.img[zingame.Resources.listName[j]].isLoaded()){
                count++;
            }
        }
        zingame.Resources.percentage = count/(length1+length2);
        if(count === length1 + length2){
            zingame.Resources.percentage = 1;
            lime.scheduleManager.unschedule(zingame.Resources.checkLoaded_, 
                    zingame.Resources.img[zingame.Resources.listName[0]]);
//            goog.events.removeAll();
        }
    }, zingame.Resources.img[zingame.Resources.listName[0]], 500);
};
