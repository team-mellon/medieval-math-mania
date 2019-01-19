var stage;
var bg;
var bg_color;
var logo, content, monalisa;

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
	monalisa = new Image();
	monalisa.src = "res/castle-facade.png";
	monalisa.onload = handleImageLoad;


}

function handleImageLoad() {

	// Create a CreateJS bitmap from the loaded image
	var bmpMonaLisa = new createjs.Bitmap(monalisa);

	// Add the bitmap to the Container
	content.addChild(bmpMonaLisa);

	// Set the registration point of the content Container to center
	content.regX = bmpMonaLisa.image.width/2
	content.regY = bmpMonaLisa.image.height/2

	// Set the scale value
	// It could be useful to properly handle different mobile resolutions
	content.scaleX = 0.29;
	content.scaleY = 0.29;


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

  // draw();

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
