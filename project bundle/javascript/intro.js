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
	return models;
};

exports.introAnim = function(models) {
	introStopping(true);
	// models.buttons.forEach(function(button) {
	// 	button.animate().duration(500).translation(button.motionTr).scale(button.motionSc);	
	// });
	ANIM_LIB.fadeDescendants(models.root, 250, 1);
	//models.root.setTranslationY(-sH).animate().duration(500).translationY(0);

	
};

exports.exitAnim = function(models)  {
	introStopping(false);
	ANIM_LIB.fadeDescendants(models.root, 500, 0).applyToDescendants('setHidden', true);
};

//private function
function adjustModels(models) {
	models.root.applyToDescendants('setAlpha', 0);
}


function defineModels() {
	var parent = scene.getScreen().addTransform('Intro_Root'); 

	//var timeout = setTimeout(function(){}, 1000);
	console.log('sucessassss');

		// Create the screen object
	scene.tvScreen3 = parent.addMesh("screen.md2")
						.setName("moviescreen3")
						.setTexture("video_preview.png")
						.setTranslation(0, sH / 2.1 , 0) // x is correct, z is correct
						.setRotation(-90, 180, 180)
						.setScale(sW * 0.00075, 0, sW * 0.004); //0.425

	

	// Chroma Key 

	scene.tvScreen3.setTexture('chromakey.png');
	scene.tvScreen3.setBlend('chromakey');
	scene.tvScreen3.setChromakey([120, 0.8, 0.9, 60]);


	scene.tvScreen3.motionTr  = [0, 100, 100];
	scene.tvScreen3.motionSc  = [0.4, 0.4, 0.65];

	
	




	// stop video
	scene.tvScreen3.on('videoTextureEnd', function() { 
		introStopping(false);
		controller.emit('SHOW_INTRO');


	 });

	return {
						root: parent,
					};
}


function introStopping(playFlag) {
	if (playFlag) {
		scene.tvScreen3.playVideo(scene.videoFile, scene.audioFile, false, false, false);
	} else {
		scene.tvScreen3.stopVideo();
	}
}
