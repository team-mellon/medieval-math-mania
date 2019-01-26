var frame_counter = 0;

var touch = false;

var fired = false;
var reload = false;
var reload_counter = 0;
var projectile_speed = 57;

var hide_knight = false;

var soundID = "Thunder";

function tick(event) {

  if (current_scene == 3) {
    //Key checks at the beginning of the update loop
    if (keys[32] || touch) {
      catapult.gotoAndPlay(0);
      fired = true;
      touch = false;
    }

    //Also stop animations
    if (catapult.currentFrame == 23)
      catapult.stop();
  }

  //Update frame counter for drawing
  frame_counter++;

  if (current_scene == 3) {
    //Catapult projectile animtion
    if (fired == true) {
      // if (frame_counter > 9) {
        projectile.y -= projectile_speed * scene_scale_Y;
        projectile_speed -= 3;
      // }
    }

    //Catapult landing animation
    if (projectile_speed < 0 && projectile.y >= boss.y) {
      hide_knight = true;
      reload = true;
    }

    if (hide_knight) {
      boss.alpha = 0;
    } else {
      boss.alpha = 1;
    }

    if (reload) {
      fired = false;
      projectile.alpha = 0;
      projectile.x = stage.canvas.width / 2;
      projectile.y = stage.canvas.height - (projectileY/2 + 57) * scene_scale_Y;
      projectile_speed = 57;
    } else {
      projectile.alpha = 1;
    }

  }

  if (frame_counter > 9) {
    reload_counter += frame_counter;
    frame_counter = 0;
  }

  if (reload_counter > 400) {
    reload = false;
    reload_counter = 0;
  }

  stage.update(event);

}

// function loadImage() {
//   var preload = new createjs.LoadQueue();
//   preload.addEventListener("fileload", handleFileComplete);
//   preload.loadFile("assets/preloadjs-bg-center.png");
// }
//
// function handleFileComplete(event) {
//   document.body.appendChild(event.result);
// }

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
