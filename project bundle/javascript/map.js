/*
 *	================================================
 *		Build Section - View Name
 *	=================================== Project name
 */

var blipp   = require('blippar').blipp;
var ANIM_LIB = require('./anim.lib.js');
var TouchController = require('./MRSD_TouchController.lib.js');


// globals
var scene;
var sW;
var sH;
var mW;
var mH;
var layoutRatio;

var VIEWS;

var alphaValue = 0;
var hiddenValue = false;
var controller;




var tnLayoutRatio = 1090/2560;

//touchcontroller globals
var counter = 0;
var tapCounter = 0;
exampleArr = [];


exports.init = function(scn, lRatio, sWidth, sHieght, mWidth, mHieght, viewEnum) {
	// set globals
	scene = scn;
	layoutRatio = lRatio;
	sW = sWidth;
	sH = sHieght;
	mW = mWidth;
	mH = mHieght;
	VIEWS = viewEnum;
	controller = scene.controller;
	// init view	
	var models = defineModels();
	adjustModels(models);
	addEvents(models);
	return models;
};

exports.introAnim = function(models) {
	ANIM_LIB.fadeDescendants(models.root, 250, 1);
	var arr = TouchController.getModelsArr();
	arr[0].setHidden(false);	
};

exports.exitAnim = function(models)  {
	ANIM_LIB.fadeDescendants(models.root, 500, 0).applyToDescendants('setHidden', true);
	//ANIM_LIB.fadeDescendants(scene.objTouchControl, 500,0).applyToDescendants('setHidden',true);
	var arr = TouchController.getModelsArr();
	arr[0].setHidden(true);
	//arr[1].setHidden(true).setScale(0);

	
 	
};

function addEvents(models) {

	var mapDisInFront = false;
	var currentMapD;
	var currentTarget;

	models.bgLogo.on('touchEnd', function(id, x, y) 
		{
			controller.emit('SHOW_VIDEO');
			screenSendToBack(currentTarget, currentMapD);
			mapDisInFront = false;
			sideButtonsSetClickable(true);
		});
	
	


	models.mapD1.on('touchEnd', function(id, x, y)
		{
			screenSendToBack(models.background.target1, models.mapD1);
			mapDisInFront = false;
			sideButtonsSetClickable(true);
			
		});

	


	models.mapD2.on('touchEnd', function(id, x, y)
		{
			screenSendToBack(models.background.target2, models.mapD2);
			mapDisInFront = false;
			sideButtonsSetClickable(true);
		
		});

		models.mapD3.on('touchEnd', function(id, x, y)
		{
			screenSendToBack(models.background.target3, models.mapD3);
			mapDisInFront = false;
			sideButtonsSetClickable(true);
		
		});

		models.mapD4.on('touchEnd', function(id, x, y)
		{
			screenSendToBack(models.background.target4, models.mapD4);
			mapDisInFront = false;
			sideButtonsSetClickable(true);
			
		});

	


	models.mapD5.on('touchEnd', function(id, x, y)
		{
			screenSendToBack(models.background.target5, models.mapD5);
			mapDisInFront = false;
			sideButtonsSetClickable(true);
		
		});

	models.mapD6.on('touchEnd', function(id, x, y)
		{
			screenSendToBack(models.background.target6, models.mapD6);
			mapDisInFront = false;
			sideButtonsSetClickable(true);
		
		});

	var sideButtonsSetClickable = function(boolValue){
		for(i = 0; i < 6; i++){
			models.sideButtons[i].setClickable(boolValue);
		}
	}

	
	
	models.sideButtons[0].on('touchEnd', function(id, x, y)
	{
		if(!mapDisInFront){
			console.log("function has activated button 1");
			screenBringToFront(models.background.target1, models.mapD1);//Animate the screen forwards
			mapDisInFront = true;
			currentMapD = models.mapD1;
			currentTarget = models.background.target1;
			sideButtonsSetClickable(false);

		}else{
			screenSendToBack(currentTarget, currentMapD);

			screenBringToFront(models.background.target1, models.mapD1);//Animate the screen forwards
			mapDisInFront = true;
			currentMapD = models.mapD1;
			currentTarget = models.background.target1;
			sideButtonsSetClickable(false);

		
		}
		
	});

	models.sideButtons[1].on('touchEnd', function(id, x, y)
	{

		if(!mapDisInFront){
			console.log("function has activated button 1");
			screenBringToFront(models.background.target2, models.mapD2);//Animate the screen forwards
			mapDisInFront = true;
			currentMapD = models.mapD2;
			currentTarget = models.background.target2;
			sideButtonsSetClickable(false);

		}else{
			screenSendToBack(currentTarget, currentMapD);

			screenBringToFront(models.background.target2, models.mapD2);//Animate the screen forwards
			mapDisInFront = true;
			currentMapD = models.mapD2;
			currentTarget = models.background.target2;
			sideButtonsSetClickable(false);
		}

		
	});


	models.sideButtons[2].on('touchEnd', function(id, x, y)
	{

		if(!mapDisInFront){
			console.log("function has activated button 1");
			screenBringToFront(models.background.target3, models.mapD3);//Animate the screen forwards
			mapDisInFront = true;
			currentMapD = models.mapD3;
			currentTarget = models.background.target3;
			sideButtonsSetClickable(false);
		
		}else{
			screenSendToBack(currentTarget, currentMapD);

			screenBringToFront(models.background.target3, models.mapD3);//Animate the screen forwards
			mapDisInFront = true;
			currentMapD = models.mapD3;
			currentTarget = models.background.target3;
			sideButtonsSetClickable(false);
		}
		
		
	});

	models.sideButtons[3].on('touchEnd', function(id, x, y)
	{

		if(!mapDisInFront){
			console.log("function has activated button 1");
			screenBringToFront(models.background.target4, models.mapD4);//Animate the screen forwards
			mapDisInFront = true;
			currentMapD = models.mapD4;
			currentTarget = models.background.target4;
			sideButtonsSetClickable(false);
			
		}else{
			screenSendToBack(currentTarget, currentMapD);

			screenBringToFront(models.background.target4, models.mapD4);//Animate the screen forwards
			mapDisInFront = true;
			currentMapD = models.mapD4;
			currentTarget = models.background.target4;
			sideButtonsSetClickable(false);
			
		}
		
	});

	models.sideButtons[4].on('touchEnd', function(id, x, y)
	{

		if(!mapDisInFront){
			console.log("function has activated button 1");
			screenBringToFront(models.background.target5, models.mapD5);//Animate the screen forwards
			mapDisInFront = true;
			currentMapD = models.mapD5;
			currentTarget = models.background.target5;
			sideButtonsSetClickable(false);
		}else{
			screenSendToBack(currentTarget, currentMapD);

			screenBringToFront(models.background.target5, models.mapD5);//Animate the screen forwards
			mapDisInFront = true;
			currentMapD = models.mapD5;
			currentTarget = models.background.target5;
			sideButtonsSetClickable(false);
		}

		
	});

	models.sideButtons[5].on('touchEnd', function(id, x, y)
	{

		if(!mapDisInFront){
			console.log("function has activated button 1");
			screenBringToFront(models.background.target6, models.mapD6);//Animate the screen forwards
			mapDisInFront = true;
			currentMapD = models.mapD6;
			currentTarget = models.background.target6;
			sideButtonsSetClickable(false);
		}else{
			screenSendToBack(currentTarget, currentMapD);

			screenBringToFront(models.background.target6, models.mapD6);//Animate the screen forwards
			mapDisInFront = true;
			currentMapD = models.mapD6;
			currentTarget = models.background.target6;
			sideButtonsSetClickable(false);
			
		}

		
	});

	

}



// private
function adjustModels(models) {


	models.root.applyToDescendants('setAlpha', 0).applyToDescendants('setHidden', true);

	//touch controller 
	scene.objTouchControl = TouchController.ObjectTouchControls(scene);
	scene.objTouchControl.setTouchStateControl(true, false, true);
	scene.objTouchControl.setScalerMinMax(1 ,6);

	
    scene.objTouchControl.addModel(models.background);
    
	}

function defineModels() {
	
	var parent = scene.getScreen().addTransform('MAP_ROOT'); 
	//var mapDetail;
	var message;

	// Manage the video buttons
	var buttonSize = (sH/8);
	var buttonPosX = (sW/8);
	var buttonPosY = (sH/2) - (sH/15);

	//Manage animation duration 
	var animDuration 	 = 1000;
	var screenIsOn		 = false;

	// Create the background plane
	var background = parent.addSprite("map.png")
							.setName("background")
							.setScale(sW * 0.95, (sW * 0.95)*(2000/2642))//(sW * 0.95 * 0.757, sW * 0.95 , 1)
							.setTranslation(0, 0, -10);
							 
	
	//Side buttons

	var sideButtons = [];

	for(i=0; i < 6; i++) {
		console.log("Button " + (i+1) + " Called");;
		var button = parent.addSprite("button"+(i+1)+"_legend.png")
							.setName("Button_"+ (i+1))
							.setScale(sW/8, sW/8, 1)
							.setTranslation(sW/2 - (sW/16),0 + (2.5 * (sW/8)) - i * (sW/8) , 1);

		sideButtons.push(button);
		
	}
	


	// Create the text objects
	background.target1 = parent.addSprite("mapD1.png")
							.setWidth(0)
							.setName("background.target1")
							.setTranslation(0, 200, 1)
							.setHeight(0);

	
		





	background.target2 = parent.addSprite("mapD2.png")
							.setWidth(0)
							.setName("background.target2")
							.setTranslation(0, -200, 1)
							.setClickable(true)
							.setHeight(0);


	//For testinf 
	//TODO: Will change when final asset will come

	background.target3 = parent.addSprite("mapD3.png")
								.setWidth(0)
								.setName("background.target3")
								.setTranslation(0, 200, 1)
								.setHeight(0);

	background.target4 = parent.addSprite("mapD4.png")
								.setWidth(0)
								.setName("background.target4")
								.setTranslation(0, 200, 1)
								.setHeight(0);

	background.target5 = parent.addSprite("mapD5.png")
								.setWidth(0)
								.setName("background.target5")
								.setTranslation(0, 200, 1)
								.setHeight(0);

	background.target6 = parent.addSprite("mapD6.png")
								.setWidth(0)
								.setName("background.target6")
								.setTranslation(0, 200, 1)
								.setHeight(0);

	var targets = [background.target1, background.target2, background.target3, background.target4, background.target5, background.target6];
	

	
	








	// Create explosion Sprite
	var mapD1 = parent.addSprite("mapD1.png")
							.setName("mapD1")
							.setScale(0)
							.setClickable(true);

	mapD1.initialTr = [0, 0, 0];
	mapD1.initialSc = [0, 0, 0];
	mapD1.motionTr  = [0, 0, 0];
	mapD1.motionSc  = [sW, sW , 100];



	var mapD2 = parent.addSprite("mapD2.png")
							.setName("mapD2")
							.setScale(0)
							.setClickable(true);

	mapD2.initialTr = [0, 0, 0];
	mapD2.initialSc = [0, 0, 0];
	mapD2.motionTr  = [0, 0, 0];
	mapD2.motionSc  = [sW , sW , 100];

	var mapD3 = parent.addSprite("mapD3.png")
				.setName("mapD3")
				.setScale(0)
				.setClickable(true);

	mapD3.initialTr = [0, 0, 0];
	mapD3.initialSc = [0, 0, 0];
	mapD3.motionTr  = [0, 0, 0];
	mapD3.motionSc  = [sW , sW , 100];

	var mapD4 = parent.addSprite("mapD4.png")
				.setName("mapD4")
				.setScale(0)
				.setClickable(true);

	mapD4.initialTr = [0, 0, 0];
	mapD4.initialSc = [0, 0, 0];
	mapD4.motionTr  = [0, 0, 0];
	mapD4.motionSc  = [sW , sW , 100];

	var mapD5 = parent.addSprite("mapD5.png")
				.setName("mapD5")
				.setScale(0)
				.setClickable(true);

	mapD5.initialTr = [0, 0, 0];
	mapD5.initialSc = [0, 0, 0];
	mapD5.motionTr  = [0, 0, 0];
	mapD5.motionSc  = [sW , sW , 100];

	var mapD6 = parent.addSprite("mapD6.png")
				.setName("mapD6")
				.setScale(0)
				.setClickable(true);

	mapD6.initialTr = [0, 0, 0];
	mapD6.initialSc = [0, 0, 0];
	mapD6.motionTr  = [0, 0, 0];
	mapD6.motionSc  = [sW , sW , 100];


	var mapDs = [mapD1, mapD2, mapD3, mapD4, mapD5, mapD6];

	

	//Navigation
	var backlogo = parent.addSprite("back_icon.png")
					.setName("backlogo")
					.setTranslation(-buttonPosX*3, -buttonPosY, 0)
					.setScale(buttonSize*0.7);


	return {
						root: parent,
						bgLogo: backlogo,
						// background.target1: background.target1,
						// background.target2: background.target2,
						animDuration: animDuration,
		 				screenIsOn: screenIsOn,
		 				mapD1: mapD1,
						mapD2: mapD2,
						mapD3: mapD3,
						mapD4: mapD4,
						mapD5: mapD5,
						mapD6: mapD6,
						mapDs: mapDs,
						targets: targets,
						sideButtons: sideButtons, 
		 				background: background
					};

}




function screenBringToFront(targetNode, mapdNode) {

	console.log(targetNode + mapdNode);


	// Fade-out button
	targetNode.animate().alpha(0).duration(1000);

	
	// make sure map detail is in the right position
	mapdNode.setTranslation(mapdNode.initialTr)
				  .setScale(mapdNode.initialSc);
	
	
	// Animate the map detail forwards
	var anim = mapdNode.animate();
	anim.translation(mapdNode.motionTr)
			.scale(mapdNode.motionSc)
			.duration(1000)
			.alpha(1);
	
}

function screenSendToBack(targetNode, mapdNode) {

	

	// Animate the screen backwards
	var anim = mapdNode.animate();
	anim.translation(mapdNode.initialTr)
		.scale(mapdNode.initialSc)
		.duration(1000)
		.alpha(0);
	
	// Fade-in "Click to learn more" text
	targetNode.animate().alpha(1).duration(1000);
}

