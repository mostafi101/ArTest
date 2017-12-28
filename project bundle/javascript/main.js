/* 
 *	Project: 	-	
 */


var blipp   = require('blippar').blipp; // Require Blippar API

/* Set Peel State Params */
blipp.getPeel()
	.setOrientation('portrait')
	.setType("fit")
	.setScale(80);

// blipp.setAutoRequiredAssets(true); // automatically download all assets

/* 
 * ===========================================================================
 * 		DEPENDENCIES						     		 
 * ===========================================================================
 */


	/* Require all views */
var VIDEO = require('./video.js'); 
var INFO = require('./info.js'); 
var INTRO = require('./intro.js');
var MAP = require('./map.js'); 

// google Analytics
var APP_NAME = "SIDEARM.CFP";
var VERSION = "0.8";
var API_URL = "https://mmcloud.herokuapp.com";
var AnalyticsJS = require('./Analytics.js').analyticsManager;
AnalyticsJS.init(APP_NAME, VERSION, API_URL);
var CLIENT_ID = "5a134ed6734d1d7a8aad35c9";

/* 
 * ===========================================================================
 * 		GLOBALS						     		 
 * ===========================================================================
 */		 
	 
var scene = blipp.addScene('default');

// scene vars
var sW = blipp.getScreenWidth()  * 1.003;
var sH = blipp.getScreenHeight() * 1.003;
var mW = blipp.getMarker().getWidth(); 
var mH = blipp.getMarker().getHeight(); 

// Define the screen space
var screen = scene.getScreen();

var layoutRatio = 1024/768;

var VIEWS_ENUM = {
	video: 'video',
	info: 'info',
	intro: 'intro',
	map: 'map',
};


// Scene variables
scene.animDuration       = 1000;
scene.defaultVideoFile   = "introVideo.mp4";
scene.defaultAudioFile   = "CFP_animation.mp3";
scene.userVideoFile      = "heroVideo.mp4";
scene.userAudioFile      = "heroVideo.mp3";
scene.videoFile          = scene.defaultVideoFile;
scene.audioFile          = scene.defaultAudioFile;
scene.userVideoRes       = "quarterNative"; // 360x480|720x1280|1920x1080|native|halfNative|quarterNative
scene.userVideoFrameRate = 15;
scene.userVideoLandscape = true;
scene.buttons            = [3];
scene.screenIsOn         = false;


scene.scroller = {};

/* 
 * ===========================================================================
 * 		SCENE EVENTS					     		 
 * ===========================================================================
 */	

scene.on('create', function() {
	console.log('onCreate'); 
	scene.setScreenScaleRotate(false); // restrict user from being able to scale blipp in peel
	blipp.hideUiComponents('navBar');
	scene.controller = scene.addTransform('CONTROLLER');
	scene.models = scene.defineModels();
	scene.addListeners();
	// Include any files that are needed but not defined as part of a model
	 //scene.setRequiredAssets(['CFP_animation.mp3']);
});

scene.on('show', function() {
	//console.log('onShow');
	//Analytics
	var thisMarker = blipp.getMarker();
	var sessionId = blipp.getSystem().getSessionId();
	var uniqueId = blipp.getSystem().getUniqueId();
	var platform = blipp.getSystem().getPlatform();
	AnalyticsJS.addScreenAnalytics('screen', 'launch', {
		'client_id': CLIENT_ID,
		'app_name': APP_NAME,
		'platform': platform,
		'markerName': thisMarker.name,
		'sessionId': sessionId,
		'unigueId': uniqueId,
		'experienceNumber':'1.1'
	});

	AnalyticsJS.addAnalytics('event', 'launch', 'App Name', APP_NAME, {
		'client_id': CLIENT_ID,
		'app_name': APP_NAME,
		'platform': platform,
		'markerName': thisMarker.name,
		'sessionId': sessionId,
		'unigueId': uniqueId,
		'experienceNumber':'1.1'
	});
	//Analytics end
	INTRO.introAnim(scene.models.intro);
});

scene.on('track', function() {
	//console.log('onTrack');
	
	//INTRO.introAnim(scene.models.intro);
});

scene.on('trackLost', function() {
	//console.log('onTrackLost');
	
});

scene.on('resume', function () {
	var thisMarker = blipp.getMarker();
	var sessionId = blipp.getSystem().getSessionId();
	var uniqueId = blipp.getSystem().getUniqueId();
	var platform = blipp.getSystem().getPlatform();
	AnalyticsJS.addAnalytics('event', 'resume', 'App Name', APP_NAME, {
		'client_id': CLIENT_ID,
		'app_name': APP_NAME,
		'platform': platform,
		'markerName': thisMarker.name,
		'sessionId': sessionId,
		'unigueId': uniqueId,
		'experienceNumber':'1.1' 
	});
});



/* 
 * ===========================================================================
 * 		SCENE METHODS
 * ===========================================================================
 */	

scene.defineModels = function() {
	var rootNode = scene.addTransform('SceneRootNode');

	// Init all views
	var videoModels = VIDEO.init(scene, layoutRatio, sW, sH, mW, mH, VIEWS_ENUM);
	var infoModels = INFO.init(scene, layoutRatio, sW, sH, mW, mH, VIEWS_ENUM);
	var introModels = INTRO.init(scene, layoutRatio, sW, sH, mW, mH, VIEWS_ENUM);
	var mapModels = MAP.init(scene, layoutRatio, sW, sH, mW, mH, VIEWS_ENUM);

	return {
		// root: rootNode,
		video: videoModels,
		info: infoModels,
		intro: introModels,
		map: mapModels
	};
};

scene.addListeners = function() {
	scene.controller.addListener('SHOW_INFO', showInfo);
	scene.controller.addListener('SHOW_VIDEO', showVideo);
	scene.controller.addListener('SHOW_INTRO', showIntro);
	scene.controller.addListener('SHOW_MAP', showMap);
};


function showInfo() {
	
	MAP.exitAnim(scene.models.map);
	VIDEO.exitAnim(scene.models.video);
	INFO.introAnim(scene.models.info);
}

function showMap() {
	INFO.exitAnim(scene.models.info);
	VIDEO.exitAnim(scene.models.video);
	MAP.introAnim(scene.models.map);
}

function showVideo() {
	MAP.exitAnim(scene.models.map);
	INFO.exitAnim(scene.models.info);
	VIDEO.introAnim(scene.models.video);
}

function showIntro() {
	MAP.exitAnim(scene.models.map);
	INTRO.exitAnim(scene.models.intro);
	INFO.exitAnim(scene.models.info);
	VIDEO.introAnim(scene.models.video);
}




