/*
 *	================================================
 *		Build Section - View Name
 *	=================================== Project name
 */

var blipp   = require('blippar').blipp;
var ANIM_LIB = require('./anim.lib.js');

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
var inside = true;

// google Analytics
var APP_NAME = "SIDEARM.CFP";
var VERSION = "0.8";
var API_URL = "https://mmcloud.herokuapp.com";
var AnalyticsJS = require('./Analytics.js').analyticsManager;
AnalyticsJS.init(APP_NAME, VERSION, API_URL);
var CLIENT_ID = "5a134ed6734d1d7a8aad35c9";



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
	inside = true;
	var models = defineModels();
	//models.buttons[3].setHidden(true);
	adjustModels(models);
	return models;
};

exports.introAnim = function(models) {

	models.buttons[0].setHidden(false);
	models.buttons[1].setHidden(false);
	models.buttons[2].setHidden(false);
	inside = true;
	//--------------------------------------------comment out what feature to have below ------------------------------------------------//
		//videoPlayStop(true);
		//models.buttons[3].setHidden(true);
		introStop(true);
	//------------------------------------------------------------------------------------------------------------------------------------//
	models.buttons.forEach(function(button) {
		button.animate().duration(0).translation(button.motionTr).scale(button.motionSc);	
	});
	ANIM_LIB.fadeDescendants(models.root, 250, 1);
	//models.root.setTranslationY(-sH).animate().duration(500).translationY(0);

	
};

exports.exitAnim = function(models)  {
	models.buttons[0].setHidden(true);
	models.buttons[1].setHidden(true);
	models.buttons[2].setHidden(true);

	//--------------------------------------------comment out what feature to have below ------------------------------------------------//
	inside = false;
		//videoPlayStop(false);
		introStop(false);
		//------------------------------------------------------------------------------------------------------------------------------------//
	ANIM_LIB.fadeDescendants(models.root, 500, 0).applyToDescendants('setHidden', true);
	models.replay_button.setHidden(true);
	
};

//private function
function adjustModels(models) {
	models.root.applyToDescendants('setAlpha', 0);
}







function defineModels() {
	var parent = scene.getScreen().addTransform('Video_Root'); 

	//var timeout = setTimeout(function(){}, 1000);
	console.log("scene 2");

		// Create the screen object
	//--------------------------------------------comment out what feature to have below ------------------------------------------------//
	
	//Portrait video 
	var portraitSW = sW * 0.00073
	scene.tvScreen = parent.addMesh()
						.setName("moviescreen")
						.setTexture("video_preview.png")
						.setTranslation(0, 0 , 0)
						.setRotation(0, 0, 0)
						.setScale(sW, sW * (3120/1440), 0);

	// Chroma Key 

	scene.tvScreen.setTexture('chromakey2.png');
	scene.tvScreen.setBlend('chromakey');
	scene.tvScreen.setChromakey([300, 0.8, 0.9, 60]);

	scene.tvScreen.motionTr  = [0, 100, 100];
	scene.tvScreen.motionSc  = [0.4, 0.4, 0.65];
	
	//Landscape Video
	// scene.tvScreen2 = parent.addMesh("screen.md2")
	// 					.setName("moviescreen2")
	// 					.setTexture("video_preview.png")
	// 					.setTranslation(0, sH/8, 0) // x is correct, z is correct
	// 					.setRotation(-90, 180, 180)
	// 					//.setScale(sW * 0.00075, 0, sW * 0.004);
	// 					.setScale(sW * 0.00075, 0, sW * 0.001);

	// scene.replay2 = parent.addSprite("replay_icon.png")
	// 					.setName("videoReplay")
	// 					.setScale(100)
	// 					.setTranslation(0, 0, 1)
	// 					.setHidden(true);

	//------------------------------------------------------------------------------------------------------------------------------------//






	// stop video
	scene.tvScreen.on('videoTextureEnd', function() {
		if(inside){
			replay_button.setHidden(false);
		}else{
			replay_button.setHidden(true);
		}
		
		introStop(false);

		
			
		//buttons[4].setHidden(true); 
	 });

	//  scene.tvScreen2.on('videoTextureEnd', function() { 
	// 	introStop(false);
	// 	buttons[4].setHidden(false);
	// 	// scene.replay2.setHidden(false);
	// 	// console.log("Video End");
	//  });

	//--------------------------------------------comment out what feature to have below ------------------------------------------------//

	// Bookend Sprite
	// var bookends = parent.addSprite(['Layer0.jpg', 'Layer0-A.jpg']) 
	// 								.setName('Layer0') 
	// 								.setTranslationX(sH*layoutRatio*-0.001) 
	// 								.setTranslationY(sH*0.025) 
	// 								// .setScaleX(sH*layoutRatio*0.501) 
	// 								// .setScaleY(sH*0.872) 
	// 								.setScaleX(sH*layoutRatio*0.501*0.8)
	// 								.setScaleY(sH*0.872*0.8)
	// 								.setAlpha(alphaValue) 
	// 								.setHidden() 
	// 								.setRotationZ(0);	

	//------------------------------------------------------------------------------------------------------------------------------------//	



	// Manage the video buttons
	var buttonSize = (sH/6);
	var buttonPosX = (sW/6);
	var buttonPosY = (sH/2) - (sH/15);
	var butt       = scene.addSprite("replay_icon.png");
	var buttW      = butt.getWidth("replay_icon.png");
	var buttH      = butt.getHeight("replay_icon.png");

	var buttons = [];
	// Create the reset video button
	buttons.push(createButton("map", "button1_icon.png", parent));
	buttons.push(createButton("selfi", "button2_icon.png", parent));
	buttons.push(createButton("Link1", "button3_icon.png", parent));
	//buttons.push(createButton("Link2", "button4_icon.png", parent));
	//buttons.push(createButton("Replay_Screen", "replay_icon.png", parent));


	buttons[0].initialTr  = [0, 0, 0];
	buttons[0].initialSc  = 0;
	buttons[0].motionTr   = [-buttonPosX*2, -buttonPosY+ (buttonSize*0.7)/8, 0];
	buttons[0].motionSc   = buttonSize*0.7;
	buttons[0].on('touchEnd', function(id, x, y) {
		showMapPage();
		//Analytics
		var thisMarker = blipp.getMarker();
		var sessionId = blipp.getSystem().getSessionId();
		var uniqueId = blipp.getSystem().getUniqueId();
		var platform = blipp.getSystem().getPlatform();

		AnalyticsJS.addAnalytics('event', 'button', 'button1', 'map', {
			'client_id': CLIENT_ID,
			'app_name': APP_NAME,
			'platform': platform,
			'markerName': thisMarker.name,
			'sessionId': sessionId,
			'unigueId': uniqueId,
			'experienceNumber':'1.1'
		});
	//Analytics end
	});

	// Create the video information button
	buttons[1].initialTr  = [0, 0, 0];
	buttons[1].initialSc  = 0;
	buttons[1].motionTr   = [0 , -buttonPosY+ (buttonSize*0.7)/8, 0];
	buttons[1].motionSc   = buttonSize*0.7;
	buttons[1].on('touchEnd', function(id, x, y) {
		
		showInfoPage();
		//videoPlayStop(true);
		//Analytics
		var thisMarker = blipp.getMarker();
		var sessionId = blipp.getSystem().getSessionId();
		var uniqueId = blipp.getSystem().getUniqueId();
		var platform = blipp.getSystem().getPlatform();
		AnalyticsJS.addAnalytics('event', 'button', 'button2', "selfie", {
			'client_id': CLIENT_ID,
			'app_name': APP_NAME,
			'platform': platform,
			'markerName': thisMarker.name,
			'sessionId': sessionId,
			'unigueId': uniqueId,
			'experienceNumber':'1.1'
		});
		//Analytics end
	});


	// Create the video play/pause button
	buttons[2].initialTr  = [0, 0, 0];
	buttons[2].initialSc  = 0;
	buttons[2].motionTr   = [buttonPosX*2, -buttonPosY+ (buttonSize*0.7)/8, 0];
	buttons[2].motionSc   = buttonSize*0.7;
	buttons[2].on('touchEnd', function(id, x, y) {
		blipp.openURL('http://www.espn.com/college-football/story/_/id/21652444/first-look-college-football-playoff-semifinal-matchups'); 
		//Analytics
		var thisMarker = blipp.getMarker();
		var sessionId = blipp.getSystem().getSessionId();
		var uniqueId = blipp.getSystem().getUniqueId();
		var platform = blipp.getSystem().getPlatform();
		AnalyticsJS.addAnalytics('event', 'link', 'button3', 'ESPN', {
			'client_id': CLIENT_ID,
			'app_name': APP_NAME,
			'platform': platform,
			'markerName': thisMarker.name,
			'sessionId': sessionId,
			'unigueId': uniqueId,
			'experienceNumber':'1.1'
		});
	//Analytics end
	});

	// // Create the video play/pause button
	// buttons[3].initialTr  = [0, 0, 0];
	// buttons[3].initialSc  = 0;
	// buttons[3].motionTr   = [buttonPosX, -buttonPosY, 0];
	// buttons[3].motionSc   = buttonSize*0.7;
	// buttons[3].on('touchEnd', function(id, x, y) {
	// 	blipp.openURL('https://www.mandt.com/'); 
	// });

	

	// buttons[3].initialTr  = [0, 0, 0];
	// buttons[3].initialSc  = 0;
	// buttons[3].motionTr   = [0, 0, 0];
	// buttons[3].motionSc   = buttonSize*0.7;
	// buttons[3].setHidden(true);
	// buttons[3].on('touchEnd', function(id, x, y) {
	// 	buttons[3].setHidden(true);
	// 	//--------------------------------------------comment out what feature to have below ------------------------------------------------//
	// 	//videoPlayStop(true);
	// 	introStop(true);
	// 	//------------------------------------------------------------------------------------------------------------------------------------//

	// });

	var replay_button = scene.getScreen().addSprite("replay_icon.png")
							.setWidth(0)
							.setName("Replay_Screen")
							.setTranslation(0, 0, 0)
							.setHeight(0)
							.setScale(buttonSize*0.7)
							.setHidden(true);

	replay_button.on('touchEnd', function(id, x, y){
		replay_button.setHidden(true);
		introStop(true);
	});
	


	scene.buttons = buttons; // attach buttons array to the scene  (keep from breaking play/pause code)

	// Load additional assets
	scene.setRequiredAssets([scene.videoFile, scene.audioFile, scene.userVideoFile, scene.userAudioFile]);

	return {
						root: parent,
						buttons: buttons,
						replay_button: replay_button
					};

}


function videoPlayStop(playFlag) {
	if (playFlag) {
		scene.tvScreen.playVideo(scene.userVideoFile, '', false, false, false);
	} else {
		scene.tvScreen.stopVideo();
	}
}

function createButton(name, textureFile1, parent) {
	var button = parent.addSprite()
								  .setName(name)
								  .setTexture(textureFile1)
								  .setTranslation(0, 0, 0)
								  .setRotation(0, 0, 0)
								  .setScale(0);
	return button;
}


function introStop(playFlag) {
	if (playFlag) {
		scene.tvScreen.playVideo(scene.userVideoFile, scene.userAudioFile, false, false, false);
	} else {
		scene.tvScreen.stopVideo();
	}
}



function showInfoPage() {
	controller.emit('SHOW_INFO');
}

function showMapPage() {
	controller.emit('SHOW_MAP');
}

