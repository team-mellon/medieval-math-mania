///////////////////////////
// Engine initialization //
///////////////////////////

var stage; // Stage for drawing pictures and shapes

var bg; // Background rectangle to clear screen
var bg_color; // Background color

var ecs = []; // Entity component system for scaling and eventually object storage
var lcs = []; // Level component system for scaling and eventually object storage
var gcs = []; // GUI component system for scaling and eventually object storage

function init() {

  stage = new createjs.Stage("demoCanvas"); // Create the stage and attach it to canvas
  createjs.Touch.enable(stage); // Enable touch interaction for mobile

  bg = new createjs.Shape(); // Create a rectangle for clearing the screen
  stage.addChild(bg); // Add rectangle to the stage

  loadSound(); // Load sounds from file
  console.log(playlist);

  createScene(); // Create scene assets

  createjs.Ticker.setFPS(60); // Set FPS (could be depricated?)
  createjs.Ticker.addEventListener("tick", tick); // Set tisk listener for use as game loop

  this.document.onkeydown = keydown; // Add keydown listener
  this.document.onkeyup = keyup; // Add keyup listener

  resize(); // Resize to set initial scale
  stage.update(); //

}
