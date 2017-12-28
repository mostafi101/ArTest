///////////////////////////////////////////////////////
// Created by Edgars Adamovics @ London Blippar 2017 //
// Collaboration by Hermes @ NYC Blippar 2017        //
// Version: 1.0.4                                    //
///////////////////////////////////////////////////////
var blipp = require('blippar').blipp;

// var markerW = blipp.getMarker().getWidth();
// var markerH = blipp.getMarker().getHeight();
// var sW = blipp.getScreenWidth() * 1.003;
var sH = blipp.getScreenHeight() * 1.003;

var fingerNo;
var errorNo;

var PinchZoomVariables = {
    objHotSpotSize: [0, 0, 0, sH, sH, sH],
    x1AutoLeftBoundary: 0,
    x2AutoRightBoundary: 0,
    y1AutoTopBoundary: 0,
    y2AutoBottomBoundary: 0,
    x1TrashCanLeftBoundary: 0,
    x2TrashCanRightBoundary: 0,
    y1TrashCanTopBoundary: 0,
    y2TrashCanBottomBoundary: 0,
    trashDebug: false,
    scalerMinSize: 1,
    scalerMaxSize: 8,
    moveEnabled: true,
    rotEnabled: true,
    scaleEnabled: true,
    canMove: true,
    canRotate: true,
    canScale: true,
    clickState: true,
    garbageCollectorEnabled: true,
    boundaryChecker: false
};
var counter = 0;

var mrsdArr = [];


/* 
 * ===========================================================================
 *    PUBLIC METHODS
 * ===========================================================================
 */

exports.getPinchZoomVariables = function () {
    return PinchZoomVariables;
};

exports.getModelsArr = function () {
    return mrsdArr;
};


//==============================================Initiliser ==================================================================================

exports.ObjectTouchControls = function (scene_name) {
    var self = this;
    var objectHolder = {};

    objectHolder.addModel = function (object) {
        var objectHolder = {};

        if (Array.isArray(object)) {
            object.map(function (value, index) {

                mrsdArr.push(value);
                objectHolder.tempObjTransform = scene_name.getScreen().addSprite().setName('tempTransform' + index).setTranslation(0, 0, -1).setAlpha(0).setHidden(false);

                self.MoveControls(scene_name, mrsdArr, value, objectHolder.tempObjTransform);
                self.RotationControls(scene_name, mrsdArr, value, objectHolder.tempObjTransform);
                self.PinchandZoomControls(scene_name, mrsdArr, value, objectHolder.tempObjTransform);
            });

        } else {
            mrsdArr.push(object);
            objectHolder.tempObjTransform = scene_name.getScreen().addSprite().setName('tempTransform' + counter).setTranslation(0, 0, -1).setAlpha(0).setHidden(false);
            self.MoveControls(scene_name, mrsdArr, object, objectHolder.tempObjTransform);
            self.RotationControls(scene_name, mrsdArr, object, objectHolder.tempObjTransform);
            self.PinchandZoomControls(scene_name, mrsdArr, object, objectHolder.tempObjTransform);

            counter++;
        }
        return objectHolder;
    };


    objectHolder.setTouchStateControl = function (move, rot, scale) {
        PinchZoomVariables.moveEnabled = move;
        PinchZoomVariables.rotEnabled = rot;
        PinchZoomVariables.scaleEnabled = scale;
    };

    objectHolder.setTrashCan = function (scene_name, topBoundary, bottomBoundary, leftBoudnary, rightBoundary, debugState) {
        PinchZoomVariables.y1TrashCanTopBoundary = topBoundary;
        PinchZoomVariables.y2TrashCanBottomBoundary = bottomBoundary;
        PinchZoomVariables.x1TrashCanLeftBoundary = leftBoudnary;
        PinchZoomVariables.x2TrashCanRightBoundary = rightBoundary;
        PinchZoomVariables.garbageCollectorEnabled = true;
        PinchZoomVariables.trashDebug = debugState;
        if (PinchZoomVariables.trashDebug === true) {
            console.log('====TrashCan Debug ON====');
            debugSprite = scene_name.getScreen().addSprite().setName("TrashCanDebug").setSides('both').setType('aura').setTranslation((PinchZoomVariables.x1TrashCanLeftBoundary + PinchZoomVariables.x2TrashCanRightBoundary) / 2, (PinchZoomVariables.y1TrashCanTopBoundary + PinchZoomVariables.y2TrashCanBottomBoundary) / 2, 0)
                .setScale(PinchZoomVariables.x1TrashCanLeftBoundary - PinchZoomVariables.x2TrashCanRightBoundary, PinchZoomVariables.y1TrashCanTopBoundary - PinchZoomVariables.y2TrashCanBottomBoundary, 1)
                .setClickable(false).setAlpha(0.6).setHidden(false).setColor('#F9098B');
        }
    };

    objectHolder.setAutoDeleteBoundaries = function (topBoundary, bottomBoundary, leftBoudnary, rightBoundary) {
        PinchZoomVariables.y1AutoTopBoundary = topBoundary;
        PinchZoomVariables.y2AutoBottomBoundary = bottomBoundary;
        PinchZoomVariables.x1AutoLeftBoundary = leftBoudnary;
        PinchZoomVariables.x2AutoRightBoundary = rightBoundary;
        PinchZoomVariables.boundaryChecker = true;
    };

    objectHolder.destroyAllObjects = function () {
        destroyAllObjects(scene_name, mrsdArr);
    };

    objectHolder.setScalerMinMax = function (Min, Max) {
        PinchZoomVariables.scalerMinSize = Min;
        PinchZoomVariables.scalerMaxSize = Max;
    };


    return objectHolder;
};

//============================================== All the Controlls ==========================================================================

exports.MoveControls = function (scene_name, modelArr, obj, tempTransform) {
    var objPosX = 0;
    var objPosY = 0;
    var drawCounter = 0;


    obj.on('touchStart', function (id, x, y) {
        if (PinchZoomVariables.moveEnabled === true) {
            obj.setParent(tempTransform);
            //obj.addTranslationZ(10);
            tempTransform.addTranslation(-1, -1, -2);
            drawCounter--;
            obj.getParent().setDrawOrder(obj.getDrawOrder() + drawCounter);
            fingerNo = scene_name.getTouchIds();
            console.log("Zoomed from 1");
            if (PinchZoomVariables.canMove === true && fingerNo.length < 2) {
                modelArr.map(function (value, index) {
                    if (obj == value) {
                        obj.setHotspot(PinchZoomVariables.objHotSpotSize);
                        objPosX = x;
                        objPosY = y;
                        
                    } else {

                        value.setClickable(false);
                    }
                });
            }
        }
    });

    obj.on('touchMove', function (id, x, y) {
        fingerNo = scene_name.getTouchIds();
        if (PinchZoomVariables.moveEnabled === true) {
            if (PinchZoomVariables.canMove === true && fingerNo.length < 2) {
                PinchZoomVariables.canRotate = false;
                PinchZoomVariables.canScale = false;
                objPosX = objPosX - x;
                objPosY = objPosY - y;
                try {
                    console.log("Zoomed from 2");
                    obj.getParent().addTranslation(-objPosX, -objPosY, 0);

                } catch (err) {
                    errorNo = 101;
                    errorHandler(err.line);
                }
                objPosX = x;
                objPosY = y;
            }
        }
    });

    obj.on('touchEnd', function (id, x, y) {
        if (PinchZoomVariables.moveEnabled === true) {
            drawCounter--;
            obj.getParent().setDrawOrder(obj.getDrawOrder() + drawCounter);
            if (PinchZoomVariables.canMove === true) {
                obj.setHotspot([0, 0, 0, 1, 1, 1]);
                modelArr.map(function (value, index) {
                    value.setClickable(true);
                });
                PinchZoomVariables.canMove = true;
                PinchZoomVariables.canRotate = true;
                PinchZoomVariables.canScale = true;
                if (PinchZoomVariables.garbageCollectorEnabled) {
                    garbageCollector(modelArr, obj, PinchZoomVariables.y1TrashCanTopBoundary, PinchZoomVariables.y2TrashCanBottomBoundary, PinchZoomVariables.x1TrashCanLeftBoundary, PinchZoomVariables.x2TrashCanRightBoundary);
                }

                if (PinchZoomVariables.boundaryChecker === true) {
                    autoTrashBoundary(modelArr, obj, PinchZoomVariables.y1AutoTopBoundary, PinchZoomVariables.y2AutoBottomBoundary, PinchZoomVariables.x1AutoLeftBoundary, PinchZoomVariables.x2AutoRightBoundary);
                }
            }
        }
    });
};

exports.RotationControls = function (scene_name, modelArr, obj, tempTransform) {
    var pi = 3.1415926;
    var touch_pinch_dist = 0;
    var currentObjRot = 0;
    var center_y;
    var center_x;
    var center_y1;
    var center_x1;
    var angleRadians;
    var angleDegree;

    var startAngle = 0;
    var touchStartDistance = 0;
    var touchStartAngle = 0;
    var currentRotation = 0;


    obj.on('touchStart', function (id, x, y) {
        obj.setParent(tempTransform);
        if (PinchZoomVariables.rotEnabled === true) {
            fingerNo = scene_name.getTouchIds();
            if (PinchZoomVariables.canRotate === true && fingerNo.length >= 2) {
                modelArr.map(function (value, index) {
                    PinchZoomVariables.canMove = false;
                    if (obj == value) {
                        obj.setHotspot(PinchZoomVariables.objHotSpotSize);
                        var dx = scene_name.getTouch(1)[4] - scene_name.getTouch(0)[4];
                        var dy = scene_name.getTouch(1)[5] - scene_name.getTouch(0)[5];

                        touchStartDistance = Math.sqrt(dx * dx + dy * dy);
                        touchStartAngle = Math.atan2(dy, dx);
                        //  startAngle = currentRotation;

                    } else {
                        value.setClickable(false);
                    }
                });
            } else {
                PinchZoomVariables.canRotate = false;
            }
        }
    });

    obj.on('touchMove', function (id, x, y) {
        fingerNo = scene_name.getTouchIds();
        if (PinchZoomVariables.rotEnabled === true) {
            if (PinchZoomVariables.canRotate === true && fingerNo.length >= 2) {


                PinchZoomVariables.canMove = false;
                PinchZoomVariables.canScale = true;


                var dx = scene_name.getTouch(1)[4] - scene_name.getTouch(0)[4];
                var dy = scene_name.getTouch(1)[5] - scene_name.getTouch(0)[5];

                var touchDistance = Math.sqrt(dx * dx + dy * dy);
                var touchAngle = Math.atan2(dy, dx);
                var angleChange = touchAngle - touchStartAngle;
                currentRotation = startAngle - (angleChange * 180 / Math.PI);

                obj.getParent().addRotation(0, 0, currentRotation);


                touchStartDistance = touchDistance;
                touchStartAngle = touchAngle;
                currentRotation = angleChange * 180 / Math.PI;
            }
        }
    });

    obj.on('touchEnd', function (id, x, y) {
        if (PinchZoomVariables.rotEnabled === true) {
            obj.setHotspot([0, 0, 0, 1, 1, 1]);
            modelArr.map(function (value, index) {
                value.setClickable(true);
            });
            PinchZoomVariables.canMove = true;
            PinchZoomVariables.canRotate = true;
            PinchZoomVariables.canScale = true;
        }
    });
};

exports.PinchandZoomControls = function (scene_name, modelArr, obj, tempTransform) {
    var touch_pinch_dist = 0;
    var scaler = [1, 1, 1];

    obj.on('touchStart', function (id, x, y) {
        if (PinchZoomVariables.scaleEnabled === true) {
            obj.setParent(tempTransform);
            fingerNo = scene_name.getTouchIds();
            if (PinchZoomVariables.canScale === true && fingerNo.length >= 2) {
                modelArr.map(function (value, index) {
                    PinchZoomVariables.canMove = false;
                    PinchZoomVariables.canRotate = true;
                    if (obj == value) {
                        touch_pinch_dist = Math.sqrt(((scene_name.getTouch(0)[4] - scene_name.getTouch(1)[4]) * (scene_name.getTouch(0)[4] - scene_name.getTouch(1)[4])) + ((scene_name.getTouch(0)[5] - scene_name.getTouch(1)[5]) * (scene_name.getTouch(0)[5] - scene_name.getTouch(1)[5])));
                    } else {
                        value.setClickable(true);
                    }
                });
            }// else {
            //     PinchZoomVariables.canScale = false;
            // }
        }
    });

    obj.on('touchMove', function (id, x, y) {
        fingerNo = scene_name.getTouchIds();
        if (PinchZoomVariables.scaleEnabled === true) {
            if (PinchZoomVariables.canScale === true && fingerNo.length >= 2) {
                PinchZoomVariables.canRotate = true;
                PinchZoomVariables.canMove = false;
                var pinch_del = Math.sqrt(((scene_name.getTouch(0)[4] - scene_name.getTouch(1)[4]) * (scene_name.getTouch(0)[4] - scene_name.getTouch(1)[4])) + ((scene_name.getTouch(0)[5] - scene_name.getTouch(1)[5]) * (scene_name.getTouch(0)[5] - scene_name.getTouch(1)[5])))/2 - touch_pinch_dist;
                try {
                    scaler = [(obj.getParent().getScale()[0] + 0.01 * pinch_del), (obj.getParent().getScale()[1] + 0.01 * pinch_del), (obj.getParent().getScale()[2] + 0.01 * pinch_del)];
                    obj.getParent().setScale(clamp(scaler[0], PinchZoomVariables.scalerMinSize, PinchZoomVariables.scalerMaxSize), clamp(scaler[1], PinchZoomVariables.scalerMinSize, PinchZoomVariables.scalerMaxSize), clamp(scaler[2], PinchZoomVariables.scalerMinSize, PinchZoomVariables.scalerMaxSize));
                } catch (err) {
                    errorNo = 101;
                    errorHandler(err.line);
                }
                touch_pinch_dist = Math.sqrt(((scene_name.getTouch(0)[4] - scene_name.getTouch(1)[4]) * (scene_name.getTouch(0)[4] - scene_name.getTouch(1)[4])) + ((scene_name.getTouch(0)[5] - scene_name.getTouch(1)[5]) * (scene_name.getTouch(0)[5] - scene_name.getTouch(1)[5])))/2;
            }
        }
    });

    obj.on('touchEnd', function (id, x, y) {
        if (PinchZoomVariables.scaleEnabled === true) {
            modelArr.map(function (value, index) {
                value.setClickable(true);
            });
            PinchZoomVariables.canScale = true;
            PinchZoomVariables.canMove = true;
            PinchZoomVariables.canScale = true;
        }
    });
};

/* 
 * ===========================================================================
 *    PRIVATE METHODS
 * ===========================================================================
 */


function clamp(val, min, max) {
    return Math.max(min, Math.min(val, max));
}

//============================================== GARBAGE Collectors ==========================================================================

function garbageCollector(modelArr, obj, y1, y2, x1, x2) {

    
    obj.on('touchEnd', function (id, x, y) {
        if (betweenChecker(y, y1, y2) && betweenChecker(x, x1, x2)) {
            modelArr.map(function (value, index) {
                if (obj.getName() == value.getName()) {
                    modelArr.splice(index, 1);
                    value.destroy();
                    console.log("DELETED....");
                }
            });
        }
    });
}

function destroyAllObjects(scene_name, modelArr) {
    if (modelArr.length > 0) {
        modelArr.map(function (value, index) {
            value.destroy();
        });
        modelArr.length = 0;
    }
}

function autoTrashBoundary(modelArr, obj, Ytop, Ybottom, Xleft, Xright) {
    obj.on('touchEnd', function (id, x, y) {
        //console.log("Values " + Ytop + ' ' + Ybottom+ ' ' + Xleft + ' ' + Xright)
        if (y > Ytop || y < Ybottom || x < Xleft || x > Xright) {
            console.log("DELETING....");
            modelArr.map(function (value, index) {
                if (obj == value) {
                    modelArr.splice(index, 1);
                    value.destroy();
                }
            });
        }
    });
}

function betweenChecker(Number, first, last) {
    return (first < last ? Number >= first && Number <= last : Number >= last && Number <= first);
}

//============================================= Error handler =================================================================================
function errorHandler(lineNo) {
    var stack = new Error().stack;
    if (errorNo == 101) {
        console.log("ERROR at line " + lineNo + " :Please add Sprite to an object being passed in PinchZoomRotate.js");
    }
};


Math.radians = function (degrees) {
    return degrees * Math.PI / 180;
};

Math.degrees = function (radians) {
    return radians * 180 / Math.PI;
};