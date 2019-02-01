var frame_counter = 0;

var hit = false;
var miss_upper = false;
var miss_lower = false;

var upper = 100;
var lower = 35;

var fired = false;
var fire_counter = 0;
var hit_counter = 0;
var miss_upper_counter = 0;
var miss_lower_counter = 0;
var reload = false;
var reload_counter = 0;
var projectile_speed = 57;
var projectile_x_speed = 0;

var hide_knight = false;
var hide_archer1 = false;
var hide_archer2 = false;
var hide_archer3 = false;
var hide_archer4 = false;

var database = {
  users: {
    admin: {
      firstname: "john",
      lastname: "Doe",
      password: "1234"
    }
  },
  stats: {
    admin: {
      hits: "9001",
      misses: "0"
    }
  }
};

var multiplicand = 7;
var sign = " x "; //&#37
var equal = " = ";
var solution = 69;

function tick(event) {

  if (current_scene == 3) {
    //Key checks at the beginning of the update loop
    if ((keys[32] || drag_up) && catapult.paused) {
      catapult.gotoAndPlay(0);
      fired = true;
      drag_up = false;
      var multiplier = document.getElementById("entryInput").value;
      console.log(multiplier);
      solution = multiplier * multiplicand;
      console.log(solution);
      var scene_html = document.getElementById("sceneHTML");
      while (scene_html.firstChild) {
        scene_html.removeChild(scene_html.firstChild);
      }
      createGameForm();
      if (solution <= upper && solution >= lower && hit_counter < 3) {
        hit = true;
      } else if (solution > upper && miss_upper_counter == 0) {
        miss_upper = true;
      } else if (solution < lower && miss_lower_counter == 0) {
        miss_lower = true;
      }
    }

    //Also stop animations
    if (!catapult.paused && catapult.currentFrame == 23) {
      catapult.stop();
      reload = false;
    }

    //Also stop animations
    if (!structure_center.paused && structure_center.currentFrame == 11) {
      structure_center.stop();
    }

    //Also stop animations
    if (!structure_left_center.paused && structure_left_center.currentFrame == 5) {
      structure_left_center.stop();
    }

    //Also stop animations
    if (!structure_right_center.paused && structure_right_center.currentFrame == 5) {
      structure_right_center.stop();
    }

    //Also stop animations
    if (!structure_left.paused && structure_left.currentFrame == 5) {
      structure_left.stop();
    }

    //Also stop animations
    if (!structure_right.paused && structure_right.currentFrame == 5) {
      structure_right.stop();
    }

    if (hit) {
      switch (hit_counter) {
        case 0:
          target_x = henchman_left_center.x;
          projectile_x_speed = 12;
          if (projectile_speed < 0 && projectile.y >= boss.y) {
            hide_archer1 = true;
            reload = true;
            structure_left_center.gotoAndPlay(0);
          }
          break;
        case 1:
          target_x = henchman_right_center.x;
          projectile_x_speed = 12;
          if (projectile_speed < 0 && projectile.y >= boss.y) {
            hide_archer2 = true;
            reload = true;
            structure_right_center.gotoAndPlay(0);
          }
          break;
        case 2:
          target_x = boss.x;
          projectile_x_speed = 0;
          if (projectile_speed < 0 && projectile.y >= boss.y) {
            hide_knight = true;
            reload = true;
            structure_center.gotoAndPlay(0);
          }
          break;
        default:
      }
      hit = false;
      hit_counter++;
    }

    if (miss_lower) {
      target_x = henchman_left.x;
      projectile_x_speed = 20;
      if (projectile_speed < 0 && projectile.y >= boss.y) {
        hide_archer3 = true;
        reload = true;
        structure_left.gotoAndPlay(0);
      }
      miss_lower = false;
      miss_lower_counter++;
    }

    if (miss_upper) {
      target_x = henchman_right.x;
      projectile_x_speed = 20;
      if (projectile_speed < 0 && projectile.y >= boss.y) {
        hide_archer4 = true;
        reload = true;
        structure_right.gotoAndPlay(0);
      }
      miss_upper = false;
      miss_upper_counter++;
    }

    if (hit_counter == 3 && miss_upper && miss_lower) {
      big_boss = createSprite(big_bossS, structureX, structureY);
      scale_image(big_boss, stage.canvas.width / 2, stage.canvas.height / 2);
      target_x = 0;
      hit = false;
      miss_upper = false;
      miss_lower = false;
      hit_counter = 0;
      miss_upper_counter = 0;
      miss_lower_counter = 0;
      projectile_x_speed = 0;
    }

    if (hide_knight) {
      boss.alpha = 0;
    } else {
      boss.alpha = 1;
    }

    if (hide_archer1) {
      henchman_left_center.alpha = 0;
    } else {
      henchman_left_center.alpha = 1;
    }

    if (hide_archer2) {
      henchman_right_center.alpha = 0;
    } else {
      henchman_right_center.alpha = 1;
    }

    if (hide_archer3) {
      henchman_left.alpha = 0;
    } else {
      henchman_left.alpha = 1;
    }

    if (hide_archer4) {
      henchman_right.alpha = 0;
    } else {
      henchman_right.alpha = 1;
    }

    //Catapult projectile animtion
    if (fired == true) {
      // if (frame_counter > 9) {
        projectile.y -= projectile_speed * scene_scale_Y;
        if (projectile.x < target_x) {
          projectile.x += projectile_x_speed * scene_scale_Y;
        } else if (projectile.x > target_x) {
          projectile.x -= projectile_x_speed * scene_scale_Y;
        }
        projectile_speed -= 3;
      // }
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

  //Update frame counter for drawing
  frame_counter++;

  if (frame_counter > 9) {
    reload_counter += frame_counter;
    frame_counter = 0;
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
