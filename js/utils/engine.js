// Initialize the engine

// Stage for drawing pictures and shapes
var stage;

var bg;
var bg_color;

function init() {

  stage = new createjs.Stage("demoCanvas");
  createjs.Touch.enable(stage);

  bg = new createjs.Shape();
  stage.addChild(bg);

  loadSound();
  console.log(playlist);

  loadScene();
  createScene();

  createjs.Ticker.setFPS(60);
  createjs.Ticker.addEventListener("tick", tick);

  this.document.onkeydown = keydown;
  this.document.onkeyup = keyup;

  resize();
  scaleGUI();

}

//////////////////////
// Scene Management //
//////////////////////

var current_scene = 0;
var last_scene = 0;



function destroyScene() {

	// switch(last_scene) {
	// 	case 0:
	// 		break;
	// 	default:
	// }

  var scene_html = document.getElementById("sceneHTML");
  while (scene_html.firstChild) {
    scene_html.removeChild(scene_html.firstChild);
  }

  stage.removeAllChildren();

}

////////////////////
// Engine scaling //
////////////////////

var max_scale_Y = 768;
var max_scale_X = 1920;

var scene_scale_X;
var scene_scale_Y;

var scene_margin_X;

var added = false;

var phone_rotation;
var phone_rotationS = {
  images: ["res/phone-rotation.png"],
  frames: {width:288, height:288, count:2, regX: 0, regY:0, spacing:0, margin:0},
  framerate: 1
};

// Scale the image-like assets
function scale_image(image, x_loc, y_loc) {

  image.scaleX = scene_scale_X;
  image.scaleY = scene_scale_Y;
  image.x = x_loc;
  image.y = y_loc;

}

// Scale the image-like assets
function scale_gui(image, x_loc, y_loc) {

  image.scaleX = scene_scale_X;
  image.scaleY = scene_scale_Y;
  if (stage.canvas.width < 900) {
    image.scale = 1;
  }
  image.x = x_loc;
  image.y = y_loc;

}

// Scale the image-like assets
function scale_gui2(image, x_loc, y_loc) {

  image.scaleX = scene_scale_X;
  image.scaleY = scene_scale_Y;
  if (stage.canvas.width < 900) {
    image.scale = 0.5;
  }
  image.x = x_loc;
  image.y = y_loc;

}

// Scale the stage
function resize() {

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

  // Redraw background before everthing else for Z-axis reasons
  bg.graphics.clear()
  bg.graphics.beginFill(bg_color).drawRect(0, 0, stage.canvas.width, stage.canvas.height);

  // Calculate the scene scaling
  scene_scale_X = ( max_scale_Y - ( max_scale_Y - stage.canvas.height ) ) / max_scale_Y;
  scene_scale_Y = ( max_scale_Y - ( max_scale_Y - stage.canvas.height ) ) / max_scale_Y;

  // Calculate the scene margin in a given direction
  scene_margin_X = ( stage.canvas.width - max_scale_X ) / 2;

  // Log screen scaling for debugging purposes
  console.log(scene_scale_X);
  console.log(scene_scale_Y);

  //***********************
  //Somehow get ECS in here
  //***********************

  if (current_scene == 3) {
    scaleLevel();
  }

  scaleGUI();

}
