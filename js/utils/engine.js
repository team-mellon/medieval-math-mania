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

// Engine scaling

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
