//////////////////////
// Scene Management //
//////////////////////

var current_scene = 0;
var last_scene = 0;

// Load the scene in the variable current_scene
function loadCurrentScene() {

  // Load background color for the scene
  bg_color = scenes[current_scene].color;

  // If the current scene is the game load the special level assets
  if (current_scene == 3) {

      loadLevel();

  }

  // Destroy the last scene
  destroyScene();

  // Create the new scene
  createScene();

  // Resize everything for scaling
  resize();

}

function changeScene(new_scene) {

  // Set the current scene to the new scene
  last_scene = current_scene;
  current_scene = new_scene;

  // Load the scene
  loadCurrentScene();

}

function createScene() {

  stage.addChild(bg);
  bg.graphics.clear()
  bg.graphics.beginFill(bg_color).drawRect(0, 0, stage.canvas.width, stage.canvas.height);

  background = createImage(scenes[current_scene].bg_img, backgroundX, 1440, "center", 0, "center", 0, "image");
  background_left = createImage(scenes[current_scene].bg_img, backgroundX, 1440, "center", -backgroundX, "center", 0, "image");
  background_right = createImage(scenes[current_scene].bg_img, backgroundX, 1440, "center", backgroundX, "center", 0, "image");

  switch (current_scene) {
    case 0:
      // scenes[current_scene].fg_text] = "Login:\n\nSignup:\n\n";
      scenes[current_scene].fg_text = "";
      break;
    case 1:
      // scenes[current_scene].fg_text = "Firstname:\n\nLastname:\n\nUsername:\n\nPassword:\n\nConfirm:\n\n";
      scenes[current_scene].fg_text = "";
      break;
    case 4:
      scenes[current_scene].fg_text = "Hits: " + database.stats.admin.hits + "\n\nMisses: " + database.stats.admin.misses + "\n\n";
      break;
    case 5:
      scenes[current_scene].fg_text = "How To Play:\nThe goal of the game is to get\none hit anywhere above the range,\none hit anywhere below the range,\nand three hits within the range";
      break;
    case 6:
      // scenes[current_scene].fg_text = "Volume:\n\nTime:\n\nTutorial\n\n";
      scenes[current_scene].fg_text = "";
      break;
    case 7:
      scenes[current_scene].fg_text = "Username: " + "admin" + "\n\nFirstname: " + database.users.admin.firstname + " " + database.users.admin.lastname + "\n\n";
      break;
    case 9:
      scenes[current_scene].fg_text = levels[current_level - 1].hint;
      break;
    default:

  }

  if (current_scene != 8 && current_scene != 2 && current_scene != 3) {
    foreground = createTextContainer(scenes[current_scene].fg_img, scenes[current_scene].fg_text, "Oldstyle", "32px", "normal", "Saddlebrown", scenes[current_scene].fg_img.frames.width, scenes[current_scene].fg_img.frames.height, "center", 0, "center", 0, "image", 0);
  }

  if (current_scene == 2) {
    background = createImage("res/menu.png", backgroundX, backgroundY, "center", 0, "center", 0, "image");
    background_left = createImage("res/menu-left.png", backgroundX, backgroundY, "center", 0 - (backgroundX), "center", 0, "image");
    background_right = createImage("res/menu-right.png", backgroundX, backgroundY, "center", 0 + (backgroundX), "center", 0, "image");
  }

  scenes[current_scene].custom();

  createGUI();

  // console.log(entity_component_system);

}

function oneWayScene() {

  // Switch the current and last screen
  var temp = current_scene;
  current_scene = last_scene;
  last_scene = temp;

  // Load the scene
  loadCurrentScene();

  // If the last scene was the game open with the pause screen
  if (last_scene == 3) {

  	pauseAnimation(true);
  	visibleButton(true);
  	visibleForm(false);

  }

}

function destroyScene() {

	// switch(last_scene) {
	// 	case 0:
	// 		break;
	// 	default:
	// }

  clearHtml();

  stage.removeAllChildren();

}

function clearHtml() {

	var scene_html = document.getElementById("sceneHTML");

  while (scene_html.firstChild) {

    scene_html.removeChild(scene_html.firstChild);

  }

}

function indicatorFunction(newL) {

  generated = false;
  createjs.Sound.play("select");
  current_level = newL;
  resetLevel();
  changeScene(3);

}
