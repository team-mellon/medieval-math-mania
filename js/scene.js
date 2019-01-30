var num_scenes = 7;
var current_scene = 0;
var last_scene = 0;

var lute;
var luteX = 96;
var luteY = 96;

var buttonX = 216;
var buttonY = 72;

var left_sword_button;
var right_sword_button;

var background;
var foreground;
var backgroundX = 1920;
var backgroundY = 768;

var play_button;
var stats_button;
var h2p_button;
var settings_button;
var logout_button;
var account_button;
var login_button;

function loadScene() {

  switch(current_scene) {

    case 0:
      bg_color = "#919191";
      break;

    case 1:
      bg_color = "#919191";
      break;

    case 2:
      bg_color = "#8ac5dc";
			//loadGUI();
      break;

    case 3:
			loadLevel();
			//loadGUI();
      break;

    case 4:
      bg_color = "#919191";
      break;

    case 5:
      bg_color = "#919191";
      break;

    case 6:
      bg_color = "#919191";
      break;

    case 7:
      bg_color = "#919191";
      break;

    default:

  }

}

function createScene() {

  stage.addChild(bg);
  bg.graphics.clear()
  bg.graphics.beginFill(bg_color).drawRect(0, 0, stage.canvas.width, stage.canvas.height);

  switch(current_scene) {

    case 0:
      createLoginForm();
      break;

    case 1:
      createSignupForm();
      break;

    case 2:
      // createMenuForm();
      break;

    case 3:
			createLevel();
      break;

    case 4:
      createStatsForm();
      break;

    case 5:
      createHow2PlayForm();
      break;

    case 6:
      createSettingsForm(); // Make volume slider affect volume and checkbox control time in scene
      break;

    case 7:
      createAccountForm();
      break;

    default:

  }

	createGUI();

}

function changeScene(new_scene) {

  last_scene = current_scene;
  current_scene = new_scene;

  loadScene();
  destroyScene();
  createScene();
  resize();
	scaleGUI();

}

function destroyScene() {

	switch(last_scene) {

		case 0:

      // var scene_html = document.getElementById("sceneHTML");
      // while (scene_html.firstChild) {
      //   scene_html.removeChild(scene_html.firstChild);
      // }

			break;

    case 1:

      // var scene_html = document.getElementById("sceneHTML");
      // while (scene_html.firstChild) {
      //   scene_html.removeChild(scene_html.firstChild);
      // }

      break;

		case 3:

      // var scene_html = document.getElementById("sceneHTML");
      // while (scene_html.firstChild) {
      //   scene_html.removeChild(scene_html.firstChild);
      // }

  		// destroyLevel();

			break;

		default:

	}

  var scene_html = document.getElementById("sceneHTML");
  while (scene_html.firstChild) {
    scene_html.removeChild(scene_html.firstChild);
  }

  stage.removeAllChildren();

  // stage.clear();

}

function createGUI() {

	switch(current_scene) {

		case 0:

			background = createImage("res/login.png", backgroundX, backgroundY);
			foreground = createImage("res/login_scroll.png", backgroundX, backgroundY);

			left_sword_button = createButton("res/sword-left.png", "Login", buttonX, buttonY, function() { changeScene(2); });
			right_sword_button = createButton("res/sword-right.png", "Signup", buttonX, buttonY, function() {	changeScene(1); });

			break;

		case 1:

			background = createImage("res/login.png", backgroundX, backgroundY);
			foreground = createImage("res/login_scroll.png", backgroundX, backgroundY);

			left_sword_button = createButton("res/sword-left.png", "Create", buttonX, buttonY, function() {	changeScene(2); });
			right_sword_button = createButton("res/sword-right.png", "Cancel", buttonX, buttonY, function() {	changeScene(0); });

			break;

		case 2:

			background = createImage("res/menu.png", backgroundX, backgroundY);

			play_button = createButton("res/menu-button.png", "Play", buttonX, buttonY, function() { changeScene(3); });
			stats_button = createButton("res/menu-button.png", "Stats", buttonX, buttonY, function() { changeScene(4); });
			h2p_button = createButton("res/menu-button.png", "How To Play", buttonX, buttonY, function() { changeScene(5); });
			settings_button = createButton("res/menu-button.png", "Settings", buttonX, buttonY, function() { changeScene(6); });
			logout_button = createButton("res/menu-button.png", "Logout", buttonX, buttonY, function() { changeScene(0); });
			account_button = createButton("res/menu-button.png", "Account", buttonX, buttonY, function() { changeScene(7); });

			break;

		case 3:

			login_button = createButton("res/login-button.png", "Menu", buttonX, buttonY, function() { changeScene(2); });

			break;

		case 4:

			background = createImage("res/login.png", backgroundX, backgroundY);
			foreground = createImage("res/login_scroll.png", backgroundX, backgroundY);

			login_button = createButton("res/login-button.png", "Menu", buttonX, buttonY, function() { changeScene(2); });

			break;

		case 5:

			background = createImage("res/login.png", backgroundX, backgroundY);
			foreground = createImage("res/login_scroll.png", backgroundX, backgroundY);

			login_button = createButton("res/login-button.png", "Menu", buttonX, buttonY, function() { changeScene(2); });

			break;

		case 6:

			background = createImage("res/login.png", backgroundX, backgroundY);
			foreground = createImage("res/login_scroll.png", backgroundX, backgroundY);

			login_button = createButton("res/login-button.png", "Menu", buttonX, buttonY, function() { changeScene(2); });

			break;

		case 7:

			background = createImage("res/login.png", backgroundX, backgroundY);
			foreground = createImage("res/login_scroll.png", backgroundX, backgroundY);

			login_button = createButton("res/login-button.png", "Menu", buttonX, buttonY, function() { changeScene(2); });

			break;

		default:

	}

	lute = createImage("res/lute.png", luteX, luteY);
  lute.addEventListener("click", playSound);

  // lute.regX = 160;
  // lute.regY = 160;
  // createjs.Tween.get(lute, {loop: false})
  //   .to({x: 400}, 1000, createjs.Ease.getPowInOut(4))
  //   .to({alpha: 0, y: 75}, 500, createjs.Ease.getPowInOut(2))
  //   .to({alpha: 0, y: 125}, 100)
  //   .to({alpha: 1, y: 100}, 500, createjs.Ease.getPowInOut(2))
  //   .to({x: 100}, 800, createjs.Ease.getPowInOut(2));

}

function scaleGUI() {

	switch(current_scene) {

		case 0:

			scale_image(background, stage.canvas.width / 2, stage.canvas.height / 2);
			scale_image(foreground, stage.canvas.width / 2, stage.canvas.height / 2);

			scale_image(left_sword_button, stage.canvas.width/2 - (buttonX/2 + 10) * scene_scale_Y, stage.canvas.height/2 + (buttonY/2 + 140) * scene_scale_Y);
			scale_image(right_sword_button, stage.canvas.width/2 + (buttonX/2 + 50) * scene_scale_Y, stage.canvas.height/2 + (buttonY/2 + 140) * scene_scale_Y);

			break;

		case 1:

			scale_image(background, stage.canvas.width / 2, stage.canvas.height / 2);
			scale_image(foreground, stage.canvas.width / 2, stage.canvas.height / 2);

			scale_image(left_sword_button, stage.canvas.width/2 - (buttonX/2 + 10) * scene_scale_Y, stage.canvas.height/2 + (buttonY/2 + 140) * scene_scale_Y);
			scale_image(right_sword_button, stage.canvas.width/2 + (buttonX/2 + 50) * scene_scale_Y, stage.canvas.height/2 + (buttonY/2 + 140) * scene_scale_Y);

			break;

		case 2:

			scale_image(background, stage.canvas.width / 2, stage.canvas.height / 2);

			scale_image(play_button, stage.canvas.width/2, stage.canvas.height/2 - 200 * scene_scale_Y);
			scale_image(stats_button, stage.canvas.width/2, stage.canvas.height/2 - 100 * scene_scale_Y);
			scale_image(h2p_button, stage.canvas.width/2, stage.canvas.height/2 - 0 * scene_scale_Y);
			scale_image(settings_button, stage.canvas.width/2, stage.canvas.height/2 + 100 * scene_scale_Y);
			scale_image(logout_button, (buttonX/2 + 10) * scene_scale_Y, stage.canvas.height/2 - 300 * scene_scale_Y);
			scale_image(account_button, stage.canvas.width - (buttonX/2 + 10) * scene_scale_Y, stage.canvas.height/2 - 300 * scene_scale_Y);

			break;

		case 3:

      scale_image(login_button, (buttonX/2 + 10) * scene_scale_Y, stage.canvas.height - (buttonY/2 + 10) * scene_scale_Y);

			break;

		case 4:

			scale_image(background, stage.canvas.width / 2, stage.canvas.height / 2);
			scale_image(foreground, stage.canvas.width / 2, stage.canvas.height / 2);

			scale_image(login_button, (buttonX/2 + 10) * scene_scale_Y, stage.canvas.height - (buttonY/2 + 10) * scene_scale_Y);

			break;

		case 5:

			scale_image(background, stage.canvas.width / 2, stage.canvas.height / 2);
			scale_image(foreground, stage.canvas.width / 2, stage.canvas.height / 2);

			scale_image(login_button, (buttonX/2 + 10) * scene_scale_Y, stage.canvas.height - (buttonY/2 + 10) * scene_scale_Y);

			break;

		case 6:

			scale_image(background, stage.canvas.width / 2, stage.canvas.height / 2);
			scale_image(foreground, stage.canvas.width / 2, stage.canvas.height / 2);

			scale_image(login_button, (buttonX/2 + 10) * scene_scale_Y, stage.canvas.height - (buttonY/2 + 10) * scene_scale_Y);

			break;

		case 7:

			scale_image(background, stage.canvas.width / 2, stage.canvas.height / 2);
			scale_image(foreground, stage.canvas.width / 2, stage.canvas.height / 2);

			scale_image(login_button, (buttonX/2 + 10) * scene_scale_Y, stage.canvas.height - (buttonY/2 + 10) * scene_scale_Y);

			break;

		default:

	}

	// GUI in front of everything
	scale_image(lute, stage.canvas.width - (luteX/2) * scene_scale_Y, stage.canvas.height - (luteY/2) * scene_scale_Y);

}
