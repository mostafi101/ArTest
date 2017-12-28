/*
 *	================================================
 *		Blippar JS Utils
 *	==================================== version 1.5
 */

	exports.getDescendantNode = function(node, nodeName) {
		node.getChildren().forEach(function(child) {
			if (child.getName() == nodeName) {
				return child;
			} else {
				var result = this.getDescendantNode(child, nodeName);
				if (result) return result;
			}
		});	
	};

	exports.newArrayFrom = function(srcArr) {
		return srcArr.map(function(value) {
			return value;
		});
	};

	exports.flipForFrontCam = function(node) {
		var self = this;
		console.log('flipping node' +  node.getName());
		if(node.getName() !== 'screen'){
			node.getChildren().forEach(function(child) {
				if (child.isOfClass("Model")) {
					var currRot = child.getRotationY();
					var newRot = currRot + 180;
					child.animate().delay(0).rotationY(newRot).duration(250);
				}
				self.flipForFrontCam(child);
			});			
		}

	};

	exports.flipBackFromFrontCam = function(node) {
		var self = this;
		if(node.getName() !== 'screen'){
			node.getChildren().forEach(function(child) {
				if (child.isOfClass("Model")) {
					var currRot = child.getRotationY();
					var newRot = currRot - 180;
					child.animate().delay(0).rotationY(newRot).duration(250);
				}
				self.flipBackFromFrontCam(child);
			});
		}
	};

	exports.incrementTexture = function(model) {
		var currentTexture = model.getActiveTexture();
		model.setActiveTexture((currentTexture+1)%model.getTextures().length);
	};

	exports.decrementTexture = function(model) {
		var currentTexture = model.getActiveTexture();
		model.setActiveTexture(modulus((currentTexture-1), model.getTextures().length));
	};

	function modulus(x, y) {
		return ((x % y) + y) % y;
	}

	exports.spinModel = function(model,degrees) {
		model.animating = true;
		model.anim = model.animate().delay(150).duration(1500).rotateZ(model.rotation[2] + degrees);
		model.anim.delay(150).loop().onEnd = function(){};
	};
	
	// untested
	exports.stopSpinModel = function(model) {
		model.animating = false;
		model.anim.stop();
	};

	// untested
	exports.rotateModel = function(model,axis,degrees,loop) {
		model.animating = true;
		model.anim = model.animate().delay(150).duration(1500);
		switch(axis) {
			case axis === 'x' || axis === 'x-axis':
				model.anim.rotateX(model.rotation[0] + degrees);
				break;
			case axis === 'y' || axis === 'y-axis':
				model.anim.rotateY(model.rotation[1] + degrees);
				break;
			case axis === 'z' || axis === 'z-axis':
				model.anim.rotateZ(model.rotation[2] + degrees);
				break;			
			default:
				console.log('rotateModel Error - unable to determine axis');
				model.animating = false;
				return;
		}
		if(loop){
			model.anim.loop();
		}
		
	};

	exports.bounceModel = function(model, startScale, endScale) {
		model.animate().delay(0).duration(150).scale(startScale).onEnd = function(){
			this.animate().delay(0).duration(75).scale(endScale).onEnd = function(){};
		};
	};

	exports.bounceButton = function(model, startScale, endScale, onEndFunc) {
		model.animate().delay(0).duration(150).scale(startScale).onEnd = function(){
			this.animate().delay(0).duration(75).scale(endScale).onEnd = function(){
				onEndFunc();
			};
		};
	};

	exports.bounceModelFast = function(model, startScale, endScale) {
		model.animate().delay(0).duration(100).scale(startScale).onEnd = function(){
			this.animate().delay(0).duration(50).scale(endScale).onEnd = function(){};
		};
	};

	// exports.dragModel = function(model, x, y) {
	// 	var deltaXY = [(x - model.startXY[0]),(model.startXY[1]-y)];
		
	// 	var lastLoc = model.getTranslation();
		
	// 	var newLoc = [
	// 					lastLoc[0] + (deltaXY[0]*5),
	// 			   		lastLoc[1] - (deltaXY[1]*5),
	// 			   		lastLoc[2]
	// 			   	 ];
	// 	model.animate().duration(200).translation(newLoc).onEnd = function(){};
	// 	model.startXY = [x,y];
	// };

	exports.dragModel = function(allTouches, model, x, y, clamp, sW, sH) {
		if(clamp === undefined) {
	    clamp = false;
	  } else if(clamp) {
	  	if(sW === undefined) {
		    sW = 0;
		  }
		  if(sH === undefined) {
		    sW = 0;
		  }
	  }
		if (allTouches.length === 1) {
			if(model.startXY === undefined || model.startXY === null){
				model.startXY = [x,y];
			}
			var deltaXY = [(x - model.startXY[0]),(model.startXY[1]-y)];
			var currentLoc = model.getTranslation();
			var newLoc = [currentLoc[0] + (deltaXY[0]*5.5),
					   currentLoc[1] - (deltaXY[1]*5.5),
					   currentLoc[2]];
			if (clamp) {
				var MATH_LIB = require('./math.lib.js');
				newLoc[0] = MATH_LIB.Clamp(newLoc[0], -sW/2.9, sW/2.9);
				newLoc[1] = MATH_LIB.Clamp(newLoc[1], -sH/0.9, sH/1.5);
			}
			model.animate().duration(150).translation(newLoc).on('end',function() {});
			model.startXY = [x,y];
		}
	};
	
	exports.dragTrackingModel = function(model, x, y) {
		var deltaXY = [(y - model.startXY[1]),(x - model.startXY[0]),0];
		
		var lastLoc = model.getTranslation();
		
		var newLoc = [
						lastLoc[0] + (deltaXY[0]*5),
				   		lastLoc[1] - (deltaXY[1]*5),
				   		lastLoc[2]
				   	 ];
		model.animate().duration(200).translation(newLoc).onEnd = function(){};
		model.startXY = [x,y];
	};

	// untested
	exports.dragModelOnX = function(model, x) {
		if(model.startX === undefined) {
			model.startX = x;
		}
		var deltaX = (x - model.startX);
		
		var lastLoc = model.getTranslation();
		
		var newLoc = [lastLoc[0] + (deltaX*5),
				   lastLoc[1],
				   lastLoc[2]];
		model.animate().duration(200).translation(newLoc).onEnd = function(){};
		model.startX = x;
	};
	
	// untested
	exports.dragModelOnY = function(model, y) {
		if(model.startY === undefined) {
			model.startY = y;
		}
		var deltaY = model.startY-y;
		
		var lastLoc = model.getTranslation();
		
		var newLoc = [lastLoc[0],
				   lastLoc[1] - (deltaY*5),
				   lastLoc[2]];
		model.animate().duration(200).translation(newLoc).onEnd = function(){};
		model.startY = y;
	};

	exports.jiggleModel = function(model) {
		var jiggleRotation = 3;
		var restRotation = model.getGlobalRotationZ();
		var jiggleInterval = setInterval(function() {
			if (jiggleRotation < 0) {
				clearInterval(jiggleInterval);
				model.animate().globalRotationZ(restRotation).delay(0).duration(100);
			} else {
				model.animate().globalRotationZ(jiggleRotation).delay(0).duration(100).onEnd = function() {
					model.animate().globalRotationZ(-jiggleRotation).duration(100).onEnd = function() {
						jiggleRotation -= 0.5;
					};
				};
			}
		}, 210);
	};
