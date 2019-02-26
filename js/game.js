var frame_counter = 0;

var entry_is_correct;

var hit = false;
var miss_upper = false;
var miss_lower = false;

var upper = 100;
var lower = 35;

var waiting_hit = false;
var waiting_miss = false;

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

var boss_fight = false;

var landscape_warning;

var multiplier = 0;
var digit = 2;
var last_digit = 0;
var adder = 1;

var history_list = [];

var valid = true;

var database = {
  "users": {
    "admin": {
      "firstname": "Eric",
      "lastname": "Bitikofer",
      "password": "1234"
    }
  },
  "stats": {
    "admin": {
      "hits": "9001",
      "misses": "0"
    }
  }
};

var multiplicand = 5;
var sign = " x "; //&#37
var equal = " = ";
var solution = 0;

function tick(event) {

  if (current_scene == 3 && pause_menu.visible == false) {

    //Key checks at the beginning of the update loop
    if (keys[32]){ // Spacebar to randomize the range

      // Generate new range
      rand_num1 = Math.floor((Math.random() * 10) + 1);
      rand_num2 = Math.floor((Math.random() * 100) + 1);
      multiplicand = Math.floor(Math.random() * 11);
      lower = rand_num1 * rand_num2;
      upper = rand_num1 * (rand_num2 + 3);

      // Clear the range banner
      var range_div = document.getElementById("rangeDiv");
      while (range_div.firstChild) {
        range_div.removeChild(range_div.firstChild);
      }

      var multip_div = document.getElementById("multiplicandText");
      while (multip_div.firstChild) {
        multip_div.removeChild(multip_div.firstChild);
      }

      var multip = document.createTextNode(multiplicand);
      multip_div.appendChild( multip);

      // Remake the display for the banner
      var left_paren = document.createTextNode("[");
      var lower_number = document.createTextNode(lower);
      var middle_comma = document.createTextNode(", ");
      var upper_number = document.createTextNode(upper);
      var right_paren = document.createTextNode("]");

      // Append the display
      range_div.appendChild(left_paren);
      range_div.appendChild(lower_number);
      range_div.appendChild(middle_comma);
      range_div.appendChild(upper_number);
      range_div.appendChild(right_paren);

    }

    if ((keys[13] || drag_up) && catapult.paused) { // Enter or drag up swipe on mobile

      // Reset drag_up bool;
      drag_up = false;

      console.log("HIT: " + hit_counter);
      console.log("MU" + miss_upper_counter);
      console.log("ML" + miss_lower_counter);

      // Need to check for input correctness here
      // No letters or symbols only numbers

      valid = true;

        if (stage.canvas.width < 900) {

          for (var x in history_list) {
            console.log(history_list[x]);
            console.log(entry);
            if (multiplier == history_list[x]) {
              valid = false;
            }
          }

          if (valid) {

            // Add to history
            console.log(history_list);
            history_list.push(multiplier);
            var dropdown = document.getElementById("myDropdown");
            var history_entry = document.createTextNode(multiplier);
            var line_break = document.createElement("br");
            dropdown.appendChild(history_entry);
            dropdown.appendChild(line_break);

            // Actual math
            solution = multiplier * multiplicand;

            var solut_div = document.getElementById("solutionText");
            while (solut_div.firstChild) {
              solut_div.removeChild(solut_div.firstChild);
            }

            var solut = document.createTextNode(solution);
            solut_div.appendChild(solut);

            // var scene_html = document.getElementById("sceneHTML");
            // while (scene_html.firstChild) {
            //   scene_html.removeChild(scene_html.firstChild);
            // }
            // createGameForm();

            if (solution <= upper && solution >= lower && hit_counter < 3) {
              hit = true;
              console.log("hit");
              catapult.gotoAndPlay(0);
              // Triggering other fired events
              fired = true;
            } else if (solution > upper && miss_upper_counter == 0) {
              miss_upper = true;
              console.log("miss upper");
              catapult.gotoAndPlay(0);
              // Triggering other fired events
              fired = true;
            } else if (solution < lower && miss_lower_counter == 0) {
              miss_lower = true;
              console.log("miss lower");
              catapult.gotoAndPlay(0);
              // Triggering other fired events
              fired = true;
            }

            multiplier = 0;
            document.getElementById("hundredsPlace").textContent = Math.floor(multiplier/100 % 10);
            document.getElementById("tensPlace").textContent = Math.abs(Math.floor(multiplier/10 % 10));
            document.getElementById("onesPlace").textContent = Math.abs(Math.floor(multiplier % 10));

          }

        } else {

          // Parse entry
          var entry = parseInt(document.getElementById("entryInput").value);
          console.log("Entry type: " + typeof entry);
          console.log("Entry: " + entry);

          if ((typeof entry) == "number") {

            if (Number.isNaN(entry)) {
              entry_is_correct = false;
            } else {

              if (current_level == 1) {

                if (document.getElementById("entryInput").value % 1 == 0) {
                  entry_is_correct = true;
                } else {
                  entry_is_correct = false;
                }

              } else if (current_level == 2) {

                if (document.getElementById("entryInput").value % 1 != 0) {
                  entry_is_correct = true;
                } else {
                  entry_is_correct = false;
                }

              }

            }

          } else {
            entry_is_correct = false;
          }

          for (var x in history_list) {
            console.log(history_list[x]);
            console.log(entry);
            if (entry == history_list[x]) {
              valid = false;
            }
          }

          // Animate the catapult
          if (entry_is_correct && valid) {

            multiplier = document.getElementById("entryInput").value;

            // Add to history
            history_list.push(multiplier);
            console.log(history_list);
            var dropdown = document.getElementById("myDropdown");
            var history_entry = document.createTextNode(multiplier);
            var line_break = document.createElement("br");
            dropdown.appendChild(history_entry);
            dropdown.appendChild(line_break);

            // Actual math
            solution = multiplier * multiplicand;

            var solut_div = document.getElementById("solutionText");
            while (solut_div.firstChild) {
              solut_div.removeChild(solut_div.firstChild);
            }

            var solut = document.createTextNode(solution);
            solut_div.appendChild(solut);

            // var scene_html = document.getElementById("sceneHTML");
            // while (scene_html.firstChild) {
            //   scene_html.removeChild(scene_html.firstChild);
            // }
            // createGameForm();

            document.getElementById("entryInput").value = "";

            if (solution <= upper && solution >= lower && hit_counter < 3) {
              hit = true;
              console.log("hit");
              catapult.gotoAndPlay(0);
              // Triggering other fired events
              fired = true;
            } else if (solution > upper && miss_upper_counter == 0) {
              miss_upper = true;
              console.log("miss upper");
              catapult.gotoAndPlay(0);
              // Triggering other fired events
              fired = true;
            } else if (solution < lower && miss_lower_counter == 0) {
              miss_lower = true;
              console.log("miss lower");
              catapult.gotoAndPlay(0);
              // Triggering other fired events
              fired = true;
            }

          }

        }

      // console.log(projectile.alpha);

    }

    if (stage.canvas.width < 900) {

      if (digit != last_digit) {

        switch(digit) {

          case 0:
            adder = 100;
            document.getElementById("hundredsPlace").style.color = "red";
            document.getElementById("tensPlace").style.color = "black";
            document.getElementById("onesPlace").style.color = "black";
            break;
          case 1:
            adder = 10;
            document.getElementById("hundredsPlace").style.color = "black";
            document.getElementById("tensPlace").style.color = "red";
            document.getElementById("onesPlace").style.color = "black";
            break;
          case 2:
            adder = 1;
            document.getElementById("hundredsPlace").style.color = "black";
            document.getElementById("tensPlace").style.color = "black";
            document.getElementById("onesPlace").style.color = "red";
            break;

        }

        last_digit = digit;

      }

    }

    updateSinglePlayAnimations();

    if (hit) {
      switch (hit_counter) {
        case 0:
          console.log("henchmanLC");
          target_x = henchman_left_center.x;
          projectile_x_speed = 12;
          break;
        case 1:
          console.log("henchmanRC");
          target_x = henchman_right_center.x;
          projectile_x_speed = 12;
          break;
        case 2:
          console.log("bossC");
          target_x = boss.x;
          projectile_x_speed = 0;
          break;
        default:
      }
      hit = false;
      waiting_hit = true;
    }

    if (waiting_hit) {
      if (projectile_speed < 0 && projectile.y >= boss.y) {
        switch (hit_counter) {
          case 0:
            hide_archer1 = true;
            structure_left_center.gotoAndPlay(0);
            break;
          case 1:
            hide_archer2 = true;
            structure_right_center.gotoAndPlay(0);
            break;
          case 2:
            hide_knight = true;
            structure_center.gotoAndPlay(0);
            break;
          default:
        }
        reload = true;
        waiting_hit = false;
        hit_counter++;
      }
    }

    if (miss_lower) {
      target_x = henchman_left.x;
      projectile_x_speed = 20;
      // miss_lower = false;
      waiting_miss = true;
    }

    if (miss_upper) {
      target_x = henchman_right.x;
      projectile_x_speed = 20;
      // miss_upper = false;
      waiting_miss = true;
    }

    if (waiting_miss) {
      if (miss_lower) {
        if (projectile_speed < 0 && projectile.y >= boss.y) {
          hide_archer3 = true;
          structure_left.gotoAndPlay(0);
          reload = true;
          miss_lower = false;
          miss_lower_counter++;
        }
      }

      if (miss_upper) {
        if (projectile_speed < 0 && projectile.y >= boss.y) {
          hide_archer4 = true;
          structure_right.gotoAndPlay(0);
          reload = true;
          miss_upper = false;
          miss_upper_counter++;
        }
      }
    }

    if (current_level == 1) {
      if (miss_lower_counter != 1) {
        document.getElementById("tutorialText").textContent = "Try finding an INTEGER multiplier that produces a solution below the range";
      } else {
        if (miss_upper_counter != 1) {
          document.getElementById("tutorialText").textContent = "Try finding an INTEGER multiplier that produces a solution above the range";
        } else {
          if (hit_counter != 3) {
            document.getElementById("tutorialText").textContent = "Try finding 3 INTEGER multipliers that produce solutions within the range";
          } else {

          }
        }
      }
    }

    if (current_level == 2) {
      if (miss_lower_counter != 1) {
        document.getElementById("tutorialText").textContent = "Try finding a DECIMAL multiplier that produces a solution below the range and does not end in '.0'";
      } else {
        if (miss_upper_counter != 1) {
          document.getElementById("tutorialText").textContent = "Try finding a DECIMAL multiplier that produces a solution above the range and does not end in '.0'";
        } else {
          if (hit_counter != 3) {
            document.getElementById("tutorialText").textContent = "Try finding 3 DECIMAL multipliers that produce solutions within the range and does not end in '.0'";
          } else {

          }
        }
      }
    }

    if (hit_counter == 3 && miss_upper_counter == 1 && miss_lower_counter == 1 && reload == false) {

      target_x = 0;
      hit = false;
      miss_upper = false;
      miss_lower = false;
      hit_counter = 0;
      miss_upper_counter = 0;
      miss_lower_counter = 0;
      projectile_x_speed = 0;

	visibleForm(false);
	end_level_scene.visible = true;
	end_level_button.visible = true;
	end_text.visible = true;
	login_button.visible = false;
	console.log("next level");
	
     /* if (boss_fight) {
        big_boss = createSprite(big_bossS, structureX, structureY);
        scale_image(big_boss, stage.canvas.width / 2, stage.canvas.height / 2);
        console.log("boss");
      } else {
        changeLevel();
        
      }*/
	

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

    if (catapult.currentFrame == 11){
      reload = false;
    }

    if (reload) {
      console.log("reload");
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

function updateSinglePlayAnimations() {

  //Catapult or whatever it is in the scene
  if (!catapult.paused && catapult.currentFrame == 11) {
    catapult.stop();
    reload = false;
  }

  // Structure in the scene
  if (!structure_center.paused && structure_center.currentFrame == 11) {
    structure_center.stop();
  }
  if (!structure_left_center.paused && structure_left_center.currentFrame == 5) {
    structure_left_center.stop();
  }
  if (!structure_right_center.paused && structure_right_center.currentFrame == 5) {
    structure_right_center.stop();
  }
  if (!structure_left.paused && structure_left.currentFrame == 5) {
    structure_left.stop();
  }
  if (!structure_right.paused && structure_right.currentFrame == 5) {
    structure_right.stop();
  }

}

function setBoss() {
  boss_fight = document.getElementById("bossValue").checked;
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
