////////////////////
// Engine scaling //
////////////////////

var max_scale_Y = 1440;
var max_scale_X = 1920;

var scene_scale_X;
var scene_scale_Y;

var scene_margin_X;

var added = false;

var mobile = false;

var phone_rotation;
var phone_rotationS = {

  images: ["res/phone-rotation.png"],
  frames: {width:288, height:288, count:2, regX: 0, regY:0, spacing:0, margin:0},
  framerate: 1

};

// Scale the image-like assets
function scale_to_canvas(image, x_lock, x_location, y_lock, y_location, type) {

  var x_start = stage.canvas.width / 2;
  var y_start = stage.canvas.height / 2;

  image.scaleX = scene_scale_X;
  image.scaleY = scene_scale_Y;

  if (mobile) {

    switch (type) {

      case "image":
        break;

      case "gui":
        image.scale = 1.0;
        break;

      case "smallgui":
        image.scale = 0.5;
        break;
    }

  }

  switch (x_lock) {

    case "left":
      var x_start = 0;
      break;

    case "center":
      var x_start = stage.canvas.width / 2;
      break;

    case "right":
      var x_start = stage.canvas.width;
      break;

  }

  switch (y_lock) {

    case "top":
      var y_start = 0;
      break;

    case "center":
      var y_start = stage.canvas.height / 2;
      break;

    case "bottom":
      var y_start = stage.canvas.height;
      break;

  }

  image.x = x_start + x_location;
  image.y = y_start + y_location;

}

// Scale the image-like assets
function scale_assets() {

  for (var i = 0; i < ecs.length; i++) {

    var platform_scale = 1.0;

    var x_start = stage.canvas.width / 2;
    var y_start = stage.canvas.height / 2;

    switch (ecs[i].x_lock) {

      case "left":
        var x_start = 0;
        break;

      case "center":
        var x_start = stage.canvas.width / 2;
        break;

      case "right":
        var x_start = stage.canvas.width;
        break;

    }

    switch (ecs[i].y_lock) {

      case "top":
        var y_start = 0;
        break;

      case "center":
        var y_start = stage.canvas.height / 2;
        break;

      case "bottom":
        var y_start = stage.canvas.height;
        break;

    }

    ecs[i].object.scaleX = scene_scale_X;
    ecs[i].object.scaleY = scene_scale_Y;

    if (mobile) {

      platform_scale = 1.5;

    }

    switch (ecs[i].type) {

    case "image":
      break;

    case "gui":
      // ecs[i].object.scale = 1.0;
      break;

    case "smallgui":
      // ecs[i].object.scale = 0.5;
      break;

    }

    ecs[i].object.x = x_start + ecs[i].x_location * scene_scale_Y * platform_scale;
    ecs[i].object.y = y_start + ecs[i].y_location * scene_scale_Y * platform_scale;

  }

  if (current_scene == 3) {

    for (var i = 0; i < lcs.length; i++) {

      var platform_scale = 1.0;

      var x_start = stage.canvas.width / 2;
      var y_start = stage.canvas.height / 2;

      switch (lcs[i].x_lock) {

        case "left":
          var x_start = 0;
          break;

        case "center":
          var x_start = stage.canvas.width / 2;
          break;

        case "right":
          var x_start = stage.canvas.width;
          break;

      }

      switch (lcs[i].y_lock) {

        case "top":
          var y_start = 0;
          break;

        case "center":
          var y_start = stage.canvas.height / 2;
          break;

        case "bottom":
          var y_start = stage.canvas.height;
          break;

      }

      lcs[i].object.scaleX = scene_scale_X;
      lcs[i].object.scaleY = scene_scale_Y;

      if (mobile) {

        platform_scale = 1.5;

      }

      switch (lcs[i].type) {

      case "image":
        break;

      case "gui":
        // lcs[i].object.scale = 1.0;
        break;

      case "smallgui":
        // lcs[i].object.scale = 0.5;
        break;

      }

      lcs[i].object.x = x_start + lcs[i].x_location * scene_scale_Y * platform_scale;
      lcs[i].object.y = y_start + lcs[i].y_location * scene_scale_Y * platform_scale;

    }

  }

}

// Scale the stage
function resize() {

  mobileCheck();
  orientationCheck();

  // Resize the canvas element with new window size
  stage.canvas.width = window.innerWidth;
  stage.canvas.height = window.innerHeight;

  // if (window.innerWidth < 600) {
  //   // gui_scale = 3;
  // } else if (window.innerWidth < 900) {
  //   // gui_scale = 2;
  // } else {
  //   // gui_scale = 1;
  // }

  // Redraw background before everthing else for Z-axis reasons
  bg.graphics.clear()
  bg.graphics.beginFill(bg_color).drawRect(0, 0, stage.canvas.width, stage.canvas.height);

  // Calculate the scene scaling
  scene_scale_X = ( max_scale_Y - ( max_scale_Y - stage.canvas.height ) ) / max_scale_Y;
  scene_scale_Y = ( max_scale_Y - ( max_scale_Y - stage.canvas.height ) ) / max_scale_Y;

  // Calculate the scene margin in a given direction
  scene_margin_X = ( stage.canvas.width - max_scale_X ) / 2;

  // Log screen scaling for debugging purposes
  //console.log(scene_scale_X);
  //console.log(scene_scale_Y);

  //***********************
  //Somehow get ECS in here
  //***********************

  landscape_warning.graphics.clear()
  landscape_warning.graphics.beginFill("#000000").drawRect(0, 0, stage.canvas.width, stage.canvas.height);

  scale_assets(); // Scale scene appropriately

  stage.update()

}

// Check to see if the current device is mobile
function mobileCheck() {

  // Print out the device if known, if not maybe store it in analytics but at least print it out
  switch (true) {

    case ( /Android/i.test(navigator.userAgent) ): console.log("This is an Android mobile device");
      break;

    case ( /webOS/i.test(navigator.userAgent) ): console.log("This is a webOS mobile device");
      break;

    case ( /iPhone/i.test(navigator.userAgent) ): console.log("This is an iPhone mobile device");
      break;

    case ( /iPad/i.test(navigator.userAgent) ): console.log("This is an iPad mobile device");
      break;

    case ( /iPod/i.test(navigator.userAgent) ): console.log("This is an iPod mobile device");
      break;

    case ( /BlackBerry/i.test(navigator.userAgent) ): console.log("This is a BlackBerry mobile device");
      break;

    case ( /IEMobile/i.test(navigator.userAgent) ): console.log("This is a Microsoft mobile device");
      break;

    case ( /Opera Mini/i.test(navigator.userAgent) ): console.log("This is a mobile device using Opera Mini browser");
      break;

    default: console.log("Unknown device type. Add to the device list.");
      break;

  }

  // Set the mobile flag
  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {

    mobile = true;

  }

}

function orientationCheck() {

  if (window.innerHeight > window.innerWidth) {

    if(!added) {

      stage.addChild(landscape_warning);
      stage.addChild(phone_rotation);
      phone_rotation.gotoAndPlay(0);
      var scene_html = document.getElementById("sceneHTML");
      scene_html.hidden = true;
      added = true;

    }

  } else {

    if(added){

      stage.removeChild(landscape_warning);
      stage.removeChild(phone_rotation);
      var scene_html = document.getElementById("sceneHTML");
      scene_html.hidden = false;
      added = false;

    }

  }

}
