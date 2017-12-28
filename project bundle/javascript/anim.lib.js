/*
 *  ================================================
 *    Blippar JS Animations Lib
 *  ==================================== version 1.2.1
 */

// standard fades
exports.fade = function(node, duration, alpha, delay, callback) {
  if(node === undefined || duration === undefined || alpha === undefined) {
    console.log('Anim Lib ERROR: Fade is missing requird arguments:\n-node: ' + node.getName() + '\n-duration: ' + duration + '\n-alpha: ' + alpha);
    return null;
  } else {
    delay = checkArg(delay, 0);
    var anim = node.animate().delay(delay).duration(duration).alpha(alpha);
    anim.on('start',function() {
      if(alpha > 0) {
        node.setHidden(false);
      }
    });
    anim.on('end',function() {
      if(alpha === 0) {
        node.setHidden(true);
      }
      if(callback !== undefined && typeof callback === 'function'){
        callback();
      }
    });
    return anim; //returns a reference to the anim
  }
};

exports.fadeIn = function(node, duration, delay) {
  var self = this;
  if(node === undefined || duration === undefined) {
    console.log('Anim Lib ERROR: FadeIn is missing required arguments');
    return null;
  } else {
    if(Array.isArray(node)){
      node.forEach(function(child) {
        if (child.isOfClass("Model")) {
          self.fade(child, duration, 1, delay);
        }
      });
    } else {
      return self.fade(node, duration, 1, delay);
    }
  }
};

exports.fadeInButton = function(node, duration, delay) {
  var self = this;
  if(node === undefined || duration === undefined) {
    console.log('Anim Lib ERROR: fadeInButton is missing requird arguments');
    return null;
  } else {
    return self.fade(node, duration, 1, delay, function() {
      node.setClickable(true);
    });
  }
};

exports.fadeOut = function(node, duration, delay) {
  var self = this;
  if(node === undefined || duration === undefined) {
    console.log('Anim Lib ERROR: FadeOut is missing requird arguments');
    return null;
  } else {
    if(Array.isArray(node)){
      node.forEach(function(child) {
        if (child.isOfClass("Model")) {
          self.fade(child, duration, 0, delay);
        }
      });
    } else {
      return self.fade(node, duration, 0, delay);
    }
  }
};

exports.fadeParentAndDescendants = function(node, duration, alpha, delay) {
  var self = this;
  if(node === undefined  || duration === undefined || alpha === undefined) {
    console.log('Anim Lib ERROR: FadeParentAndDescendants is missing requird arguments');
    return null;
  } else {
    delay = checkArg(delay, 0);
    var anim = self.fade(node, duration, alpha, delay);
    self.fadeDescendants(node, duration, alpha, delay);
    return anim;
  }
};

exports.fadeDescendants = function(node, duration, alpha, delay) {
  var self = this;
  if(node === undefined  || duration === undefined || alpha === undefined) {
    console.log('Anim Lib ERROR: FadeDescendants is missing requird arguments');
  } else {
    delay = checkArg(delay, 0);
    node.getChildren().forEach(function(child) {
      if (child.isOfClass("Model")) {
        self.fade(child, duration, alpha, delay);
      }
      self.fadeDescendants(child, duration, alpha, delay);
    });
    return node.animate().duration(duration).delay(delay); // return an animation reference for timing events
  }
};

// cascading fades
exports.fadeParentAndDescendantsCascading = function(node, duration, alpha, delay, timingEvent) {
// var fadeParentAndDescendantsCascading = function(node, duration, alpha, delay, timingEvent) {
  var self = this;
  delay = checkArg(delay, 0);
  timingEvent = checkArg(timingEvent, 'end');
  if(node === undefined  || duration === undefined || alpha === undefined) {
    console.log('Anim Lib ERROR: FadeParentAndDescendantsCascading is missing requird arguments');
    return null;
  } else {
    var anim = self.fade(node, duration, alpha, delay);
    anim.on(timingEvent,function() {
      self.fadeDescendantsCascading(node, duration, alpha, delay, timingEvent);
    });
    return anim;
  }
};

exports.fadeDescendantsCascading = function(node, duration, alpha, delay, timingEvent) {
  var self = this;
  if(node === undefined  || duration === undefined || alpha === undefined) {
    console.log('Anim Lib ERROR: FadeDescendantsCascading is missing requird arguments');
  } else {
    delay = checkArg(delay, 0);
    timingEvent = checkArg(timingEvent, 'end');
    node.getChildren().forEach(function(child) {
      if (child.isOfClass("Model")) {
        var anim = self.fade(child, duration, alpha, delay);
        anim.on(timingEvent,function() {
          self.fadeDescendantsCascading(child, duration, alpha, delay, timingEvent);
        });
      } else {
        self.fadeDescendantsCascading(child, duration, alpha, delay, timingEvent);
      }
    });
  }
};

// private || internal
function checkArg(argument, defaultValue) {
  if(argument !== undefined) {
    return argument;
  } else {
    return defaultValue;
  }
}
