//set main namespace
goog.provide('demo');

// get requirements
goog.require('lime.Director');
goog.require('lime.Scene');
goog.require('lime.Layer');
goog.require('lime.Circle');
goog.require('lime.Label');
goog.require('lime.animation.Spawn');
goog.require('lime.animation.FadeTo');
goog.require('lime.animation.ScaleTo');
goog.require('lime.animation.MoveTo');
goog.require('lime.animation.MoveBy');

// entrypoint
demo.start = function() {

	var director = new lime.Director(document.body, 1024, 768), scene = new lime.Scene(),

	target = new lime.Layer();

	board = new lime.Sprite().setPosition(400, 400).setSize(600, 400).setFill(
			255, 100, 100, 0.5);
	deck = new lime.Sprite().setPosition(300.200).setAnchorPoint(0.5, 0.5);
	myCard = new Array();
	for (i = 1; i < 53 ; i++) {
		var card = new lime.Sprite().setAnchorPoint(0.5, 0.5).setSize(74, 110)
				.setFill('rumble_poker_card_back.jpg');
		myCard.push(card);
		deck.appendChild(card);
//		console.log(i);
//		deck.setChildIndex(card,i);
//		console.log(deck.getChildIndex(card));
	}

	board.appendChild(deck);
	// add target and title to the scene
	target.appendChild(board);
	scene.appendChild(target);

	demo.deal();
	director.makeMobileWebAppCapable();

	// set current scene active
	director.replaceScene(scene);

};

// this is required for outside access after code is compiled in
// ADVANCED_COMPILATIONS mode
goog.exportSymbol('demo.start', demo.start);

demo.deal = function() {
	var counter = 1;
	var i = 1;
	myDeal = setInterval(function() {
		if (myCard.length <= 0) {
			window.clearInterval(myDeal);
		} else {
			var card_ = myCard.pop();
			if (counter > 4)
				counter = 1;
			var position = new goog.math.Coordinate(0, 0);
			switch (counter) {
			case 1:
				position = new goog.math.Coordinate(i*3 - 80, 200);
				break;
			case 2:
				position = new goog.math.Coordinate(220 + i*3,0);
				break;
			case 3:
				position = new goog.math.Coordinate(i*3 - 80,-200);
				break;
			case 4:
				position = new goog.math.Coordinate(i*3 -370 ,0);
				break;
			default:
				break;
			}

			var move = new lime.animation.MoveBy(position).setDuration(0.7).setEasing(lime.animation.Easing.EASE).enableOptimizations();
			card_.runAction(move);
			card_.getParent().setChildIndex(card_,i);
			counter ++;
			i++;
		}
	}, 300);

};
