function createScene() {

  stage.addChild(bg);
  bg.graphics.clear()
  bg.graphics.beginFill(bg_color).drawRect(0, 0, stage.canvas.width, stage.canvas.height);

  background = createImage(scene_bg_imgs[current_scene], backgroundX, backgroundY, "center", 0, "center", 0, "image");
  background_left = createImage(scene_bg_imgs[current_scene], backgroundX, backgroundY, "center", -backgroundX, "center", 0, "image");
  background_right = createImage(scene_bg_imgs[current_scene], backgroundX, backgroundY, "center", backgroundX, "center", 0, "image");

  if (current_scene != 8) {
    foreground = createImage(scene_fg_imgs[current_scene], backgroundX, backgroundY, "center", 0, "center", 0, "image");
  }

  if (current_scene == 2) {
    background = createImage("res/menu.png", backgroundX, backgroundY, "center", 0, "center", 0, "image");
    background_left = createImage("res/menu-left.png", backgroundX, backgroundY, "center", 0 - (backgroundX), "center", 0, "image");
    background_right = createImage("res/menu-right.png", backgroundX, backgroundY, "center", 0 + (backgroundX), "center", 0, "image");
  }

  if (current_scene == 3) {
    createLevel();
  }

	createGUI();

  scene_forms[current_scene]();

  // console.log(entity_component_system);

}

// Load the scene in the variable current_scene
function loadCurrentScene() {

  // Load background color for the scene
  bg_color = scene_bg_colors[current_scene];

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
