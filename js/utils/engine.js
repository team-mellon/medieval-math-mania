// Initialize the engine

var stage;

var bg;
var bg_color;

function init() {

  stage = new createjs.Stage("demoCanvas");
  createjs.Touch.enable(stage);

  bg = new createjs.Shape();
  stage.addChild(bg);

  loadScene();
  createScene();

  createjs.Ticker.setFPS(60);
  createjs.Ticker.addEventListener("tick", tick);

  this.document.onkeydown = keydown;
  this.document.onkeyup = keyup;

  resize();
  scaleGUI();

}

// Key detection

var keys = {};

function keydown(event) {
    keys[event.keyCode] = true;
}

function keyup(event) {
    delete keys[event.keyCode];
}

// Touch detection

function handleEnd(evt) {
  evt.preventDefault();
  touch = true;
  console.log("here");
}

// Scaling the stage and assets

var max_scale_Y = 768;
var max_scale_X = 1920;

var scene_scale_X;
var scene_scale_Y;

var scene_margin_X;

function scale_image(image, x_size, y_size) {

  image.scaleX = scene_scale_X;
  image.scaleY = scene_scale_Y;

}

function resize() {

  // Resize the canvas element with new window size
  stage.canvas.width = window.innerWidth;
  stage.canvas.height = window.innerHeight;

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
