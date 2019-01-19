var stage;
var bg;
var bg_color;
var logo, content;
var y_scale, x_max, y_max;
var castle_center_tower,
    castle_left_center_tower,
    castle_right_center_tower,
    castle_body,
    castle_left_tower,
    castle_right_tower,
    castle_facade;

function init() {

  stage = new createjs.Stage("demoCanvas");
  createjs.Touch.enable(stage);

  bg_color = "#89a7a0";
  createBackground();

  createLogo();
  createContent();

  createjs.Ticker.addEventListener("tick", tick);

  resize();

}

function createBackground() {

	bg = new createjs.Shape();
  bg.addEventListener("click", bg_change);
	stage.addChild(bg);

}

/**
 * create and display logo (top-right)
 */
function createLogo() {

	logo = new createjs.Bitmap("res/lute.png");
	logo.y = 10;
	stage.addChild(logo);

}


/**
 * create content (centered)
 */
function createContent() {


	content = new createjs.Container();
	stage.addChild(content);

	// Load the Monalisa Image
	// (You should also use PreloadJS to avoid the onload listener)
	castle_center_tower = new Image();
	castle_center_tower.src = "res/castle/center-tower.png";
	castle_center_tower.onload = handleImageLoad;
	castle_left_center_tower = new Image();
	castle_left_center_tower.src = "res/castle/left-center-tower.png";
	castle_left_center_tower.onload = handleImageLoad;
	castle_right_center_tower = new Image();
	castle_right_center_tower.src = "res/castle/right-center-tower.png";
	castle_right_center_tower.onload = handleImageLoad;
	castle_body = new Image();
	castle_body.src = "res/castle/body.png";
	castle_body.onload = handleImageLoad;
	castle_left_tower = new Image();
	castle_left_tower.src = "res/castle/left-tower.png";
	castle_left_tower.onload = handleImageLoad;
	castle_right_tower = new Image();
	castle_right_tower.src = "res/castle/right-tower.png";
	castle_right_tower.onload = handleImageLoad;
	castle_facade = new Image();
	castle_facade.src = "res/castle/facade.png";
	castle_facade.onload = handleImageLoad;


}

function handleImageLoad() {

	// Create a CreateJS bitmap from the loaded image
	var bmpCastleCenterTower = new createjs.Bitmap(castle_center_tower);
	var bmpCastleLeftCenterTower = new createjs.Bitmap(castle_left_center_tower);
	var bmpCastleRightCenterTower = new createjs.Bitmap(castle_right_center_tower);
	var bmpCastleBody = new createjs.Bitmap(castle_body);
	var bmpCastleLeftTower = new createjs.Bitmap(castle_left_tower);
	var bmpCastleRightTower = new createjs.Bitmap(castle_right_tower);
	var bmpCastleFacade = new createjs.Bitmap(castle_facade);

	// Add the bitmap to the Container
	content.addChild(bmpCastleCenterTower);
	content.addChild(bmpCastleLeftCenterTower);
	content.addChild(bmpCastleRightCenterTower);
	content.addChild(bmpCastleBody);
	content.addChild(bmpCastleLeftTower);
	content.addChild(bmpCastleRightTower);
	content.addChild(bmpCastleFacade);

  x_max = bmpCastleCenterTower.image.width;
  y_max = bmpCastleCenterTower.image.height;

	// Set the scale value
	// It could be useful to properly handle different mobile resolutions

  // Set the registration point of the content Container to center
  content.regX = x_max/2;
  content.regY = y_max/2;

  y_scale = (y_max - (y_max - stage.canvas.height) ) / y_max;

	content.scaleX = y_scale;
	content.scaleY = y_scale;

}

function tick() {
  stage.update();
}


function resize() {

  // Resize the canvas element
  stage.canvas.width = window.innerWidth;
  stage.canvas.height = window.innerHeight;

  // Logo: top-right position (canvasWidth - image width - 10 px padding)
  logo.x = stage.canvas.width - 120 - 10

  // Background: full screen redraw
  draw_bg();

  // Content: centered
  content.x = stage.canvas.width / 2;
  content.y = stage.canvas.height / 2;

  // Set the registration point of the content Container to center
  content.regX = x_max/2;
  content.regY = y_max/2;

  console.log(y_max);
  console.log(stage.canvas.height);

  y_scale = (y_max - (y_max - stage.canvas.height) ) / y_max;

	content.scaleX = y_scale;
	content.scaleY = y_scale;

}

function draw_bg() {
  bg.graphics.clear()
  bg.graphics.beginFill(bg_color).drawRect(0, 0, stage.canvas.width, stage.canvas.height);
}

function bg_change(){
  bg_color = "#460a14";
  draw_bg();
}

// function runGame(renderingCanvas) {
//
//   var canvas = document.getElementById('renderCanvas');                   // get the canvas DOM element context
//   var engine = new BABYLON.Engine(canvas, true);                          // load the babylon.js engine
//
//   var database = {
//   users: {
//   admin: {
//   firstname: "john",
//   lastname: "Doe",
//   password: "1234"
//   }
//   },
//   stats: {
//   admin: {
//   hits: "420",
//   misses: "69"
//   }
//   }
//   };
//
//   var current = null;
//   var message = {
//     render: 0,
//     music_pause: false,
//     volume: 1,
//     current_user: "admin"
//   };                                                                      // possible message passing system???
//
//   var current_scene = createLogin(engine, canvas, message, database);
//   var music = createMusic(engine, canvas, message, database);
//
//   engine.runRenderLoop( function() {                                      // run the render loop function
//     console.log("loop");
//     if (current != message.render) {
//       console.log(message.render + " : " + current)
//       current = message.render;
//       current_scene.dispose();
//       switch(current) {                                                   // scene rendering switcher
//         case 0:
//           current_scene = createLogin(engine, canvas, message, database);
//           break;
//         case 1:
//           current_scene = createMenu(engine, canvas, message, database);
//           break;
//         case 2:
//           current_scene = createGame(engine, canvas, message, database);
//           break;
//         case 3:
//           current_scene = createStats(engine, canvas, message, database);
//           break;
//         case 4:
//           current_scene = createHow2Play(engine, canvas, message, database);
//           break;
//         case 5:
//           current_scene = createSettings(engine, canvas, message, database);
//           break;
//         case 6:
//           current_scene = createAccount(engine, canvas, message, database);
//           break;
//         case 7:
//           current_scene = createCreateAcc(engine, canvas, message, database);
//           break;
//         default:
//           current_scene = createLogin(engine, canvas, message, database);
//           break;
//       }
//       console.log(message.render + " :: " + current)
//     }
//
//     music.render();
//     current_scene.render();
//     current_scene.attachControl();
//
//   });
//
//   window.addEventListener('resize', function() {
//       engine.resize();
//   });                                                                     // the canvas/window resize event handler
//
// }
