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
var VIEWS;
var layoutRatio;


var alphaValue = 0;
var hiddenValue = false;
var controller;



//touchcontroller globals
var counter = 0;
var tapCounter = 0;
exampleArr = [];

var Selfie_TouchController = require('./SELFI_TOUCH_CONTROLLER.js');
var cameraMode = "back";


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
	
	var arr = Selfie_TouchController.getModelsArr();
	arr[0].setHidden(true).setAlpha(1).setScale(mW);
	models.trophy.setHidden(false);
	models.camera.setHidden(false);
	models.flip_camera.setHidden(false);
	models.bgLogo.setHidden(false);

};

exports.exitAnim = function(models)  {
	
	
	var arr = Selfie_TouchController.getModelsArr();
	arr[0].setHidden(true).setScale(0);

	models.trophy.setHidden(true);
	models.camera.setHidden(true);
	models.flip_camera.setHidden(true);
	models.bgLogo.setHidden(true);
 	
};

function addEvents(models) {


	models.bgLogo.on('touchEnd', function(id, x, y) 
		{
			if(cameraMode === "front"){
				blipp.setCameraMode('back');
				cameraMode = "back";
			}
			controller.emit('SHOW_VIDEO');

			
		});
	

	models.camera.on("touchEnd", function(){
		models.flip_camera.setHidden(true);
		models.camera.setHidden(true);
		models.bgLogo.setHidden(true);

		blipp.takePhoto({ saveToAssets: true, 
			saveToGallery: true, 
			saveToServer: false, 
			filename: "photoBooth.jpg", 
			size: 800, 
			mode: 'screen' }, afterPhoto);

		
	});

	function afterPhoto(result) {
		//console.log("This is after Photo");
		console.log("Result" + result);
		if (result === "OK") {
			models.flip_camera.setHidden(false);
			models.camera.setHidden(false);
			models.bgLogo.setHidden(false);
		}
	}



	models.flip_camera.on("touchEnd", function(){
		
		var orientationValue = blipp.getSystem().getScreenOrientation();

		
		
		if(cameraMode === "back"){
			blipp.setCameraMode('front');
			cameraMode = "front";
			}else{
				blipp.setCameraMode('back');
				cameraMode = "back";
			}
		
				
	});

	scene.on('orientationChange', function(id, x, y) {
		
				
				
				var orientationValue = blipp.getSystem().getScreenOrientation();
		
				if(orientationValue === 0){
					models.trophy.setRotation(0,0,0);
				}else if(orientationValue === 180){
					models.trophy.setRotation(0,0,180);
				}else if(orientationValue === 90){
					if(cameraMode === "front"){
						models.trophy.setRotation(0,0,-90);
					}else{
						models.trophy.setRotation(0,0,-90);
					}
					
				}else if(orientationValue === 270){
					if(cameraMode === "front"){
						models.trophy.setRotation(0,0,-270);
						
					}else{
						models.trophy.setRotation(0,0,-270);
					}
					
				}
		
				
			});


}



// private
function adjustModels(models) {


	models.root.applyToDescendants('setAlpha', 0).applyToDescendants('setHidden', true);

	//touch controller 
	scene.objTouchControl = Selfie_TouchController.ObjectTouchControls(scene);
	scene.objTouchControl.setTouchStateControl(true, true, true);
	scene.objTouchControl.setScalerMinMax(0.4,5);

	
    scene.objTouchControl.addModel(models.trophy);
    
}

function defineModels() {
	
	var parent = scene.getScreen().addTransform('INFO_ROOT'); 
	
	var message;

	// Manage the video buttons
	var buttonSize = (sH/8);
	var buttonPosX = (sW/6);
	var buttonPosY = (sH/2) - (sH/15);

	//Manage animation duration 
	var animDuration 	 = 1000;
	var screenIsOn		 = false;

	

	var trophy = scene.getScreen().addSprite("trophy.png")
				.setName("trophy")
				.setScale(sW * 0.9)
				.setTranslation(0, 0, -10)
				.setHidden(true);
							 
	
	//Side buttons

	

	var camera = scene.getScreen().addSprite("camera.png")
					.setName("camera")
					.setScale(sW * 0.15)
					.setTranslation(0, -buttonPosY, 0)
					.setHidden(true);

	var flip_camera = scene.getScreen().addSprite("flip_camera_icon.png")
					.setName("flip_camera")
					.setScale(sW*0.15)
					.setTranslation(buttonPosX*3 - buttonSize*0.7, -buttonPosY, 0)
					.setHidden(true);

	

	//Navigation
	var backlogo_selfi = scene.getScreen().addSprite("back_icon.png")
					.setName("backlogo_selfi")
					.setTranslation(-buttonPosX*3 + buttonSize*0.7  , -buttonPosY, 0)
					.setScale(buttonSize*0.7)
					.setHidden(true);


	return {
						root: parent,
						bgLogo: backlogo_selfi,
						
						animDuration: animDuration,
		 				screenIsOn: screenIsOn,
		 				 
						 trophy: trophy,
						 camera: camera,
						 flip_camera: flip_camera
					};

}


