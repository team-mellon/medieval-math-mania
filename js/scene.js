var num_scenes = 7;
var current_scene = 0;
var last_scene = 0;

var lute;
var luteX = 96;
var luteY = 96;

var left_sword_button;
var left_sword_buttonX = 216;
var left_sword_buttonY = 72;

var right_sword_button;
var right_sword_buttonX = 216;
var right_sword_buttonY = 72;

var background;
var foreground;
var backgroundX = 1920;
var backgroundY = 768;

var play_button;
var play_buttonX = 216;
var play_buttonY = 72;

var stats_button;
var stats_buttonX = 216;
var stats_buttonY = 72;

var h2p_button;
var h2p_buttonX = 216;
var h2p_buttonY = 72;

var settings_button;
var settings_buttonX = 216;
var settings_buttonY = 72;

var logout_button;
var logout_buttonX = 216;
var logout_buttonY = 72;

var account_button;
var account_buttonX = 216;
var account_buttonY = 72;

var login_button;
var login_buttonX = 216;
var login_buttonY = 72;

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

    case 3:
			createLevel();
      break;

    default:

  }

	createGUI();

}

function changeScene() {

  loadScene();
  destroyScene();
  createScene();
  resize();
	scaleGUI();

}

function destroyScene() {

	// switch(last_scene) {
  //
	// 	case 0:
  //
  //     stage.removeChild(background);
  //     stage.removeChild(foreground);
  // 		stage.removeChild(login_button);
  //
	// 		break;
  //
  //   case 1:
  //
  //     stage.removeChild(background);
  //     stage.removeChild(foreground);
  // 		stage.removeChild(login_button);
  //
  //     break;
  //
	// 	case 2:
  //
	// 		stage.removeChild(play_button);
	// 		stage.removeChild(stats_button);
	// 		stage.removeChild(h2p_button);
	// 		stage.removeChild(settings_button);
	// 		stage.removeChild(logout_button);
	// 		stage.removeChild(account_button);
  //
	// 		break;
  //
	// 	case 3:
  //
	// 		stage.removeChild(login_button);
	// 		destroyLevel();
  //
	// 		break;
  //
	// 	default:
  //
	// }

  stage.removeAllChildren();

  // stage.clear();

}

function createGUI() {

	switch(current_scene) {

		case 0:

				background = createImage("res/login.png", backgroundX, backgroundY);

				foreground = createImage("res/login_scroll.png", backgroundX, backgroundY);

				left_sword_button = createButton("res/sword-left.png", "Login", left_sword_buttonX, left_sword_buttonY, function() {
					last_scene = current_scene;
					current_scene = 2;
					changeScene();
				});

				left_sword_button.addEventListener("click", function() {
					last_scene = current_scene;
					current_scene = 2;
					changeScene();
				});

				right_sword_button = createButton("res/sword-right.png", "Signup", right_sword_buttonX, right_sword_buttonY, function() {
					last_scene = current_scene;
					current_scene = 1;
					changeScene();
				});

				right_sword_button.addEventListener("click", function() {
					last_scene = current_scene;
					current_scene = 1;
					changeScene();
				});

			break;

		case 1:

				background = createImage("res/login.png", backgroundX, backgroundY);

				foreground = createImage("res/login_scroll.png", backgroundX, backgroundY);

				left_sword_button = createButton("res/sword-left.png", "Create", left_sword_buttonX, left_sword_buttonY, function() {
					last_scene = current_scene;
					current_scene = 2;
					changeScene();
				});

				left_sword_button.addEventListener("click", function() {
					last_scene = current_scene;
					current_scene = 2;
					changeScene();
				});

				right_sword_button = createButton("res/sword-right.png", "Cancel", right_sword_buttonX, right_sword_buttonY, function() {
					last_scene = current_scene;
					current_scene = 0;
					changeScene();
				});

				right_sword_button.addEventListener("click", function() {
					last_scene = current_scene;
					current_scene = 0;
					changeScene();
				});

			break;

		case 2:

				background = createImage("res/menu.png", backgroundX, backgroundY);

				play_button = createButton("res/menu-button.png", "Play", play_buttonX, play_buttonY, function() {
					last_scene = current_scene;
					current_scene = 3;
					changeScene();
				});

        play_button.addEventListener("click", function() {
          last_scene = current_scene;
          current_scene = 3;
          changeScene();
        });

				stats_button = createButton("res/menu-button.png", "Stats", play_buttonX, play_buttonY, function() {
					last_scene = current_scene;
					current_scene = 4;
					changeScene();
				});

        stats_button.addEventListener("click", function() {
          last_scene = current_scene;
          current_scene = 4;
          changeScene();
        });

				h2p_button = createButton("res/menu-button.png", "How To Play", play_buttonX, play_buttonY, function() {
					last_scene = current_scene;
					current_scene = 5;
					changeScene();
				});

        h2p_button.addEventListener("click", function() {
          last_scene = current_scene;
          current_scene = 5;
          changeScene();
        });

				settings_button = createButton("res/menu-button.png", "Settings", play_buttonX, play_buttonY, function() {
					last_scene = current_scene;
					current_scene = 6;
					changeScene();
				});

        settings_button.addEventListener("click", function() {
          last_scene = current_scene;
          current_scene = 6;
          changeScene();
        });

				logout_button = createButton("res/menu-button.png", "Logout", play_buttonX, play_buttonY, function() {
					last_scene = current_scene;
					current_scene = 0;
					changeScene();
				});

        logout_button.addEventListener("click", function() {
          last_scene = current_scene;
          current_scene = 0;
          changeScene();
        });

				account_button = createButton("res/menu-button.png", "Account", play_buttonX, play_buttonY, function() {
					last_scene = current_scene;
					current_scene = 7;
					changeScene();
				});

        account_button.addEventListener("click", function() {
          last_scene = current_scene;
          current_scene = 7;
          changeScene();
        });

			break;

		case 3:

				login_button = createButton("res/login-button.png", "Menu", login_buttonX, login_buttonY, function() {
					last_scene = current_scene;
					current_scene = 2;
					changeScene();
				});

				login_button.addEventListener("click", function() {
					last_scene = current_scene;
					current_scene = 2;
					changeScene();
				});

			break;

		case 4:

				background = createImage("res/login.png", backgroundX, backgroundY);

				foreground = createImage("res/login_scroll.png", backgroundX, backgroundY);

				login_button = createButton("res/login-button.png", "Menu", login_buttonX, login_buttonY, function() {
					last_scene = current_scene;
					current_scene = 2;
					changeScene();
				});

				login_button.addEventListener("click", function() {
					last_scene = current_scene;
					current_scene = 2;
					changeScene();
				});

			break;

		case 5:

				background = createImage("res/login.png", backgroundX, backgroundY);

				foreground = createImage("res/login_scroll.png", backgroundX, backgroundY);

				login_button = createButton("res/login-button.png", "Menu", login_buttonX, login_buttonY, function() {
					last_scene = current_scene;
					current_scene = 2;
					changeScene();
				});

				login_button.addEventListener("click", function() {
					last_scene = current_scene;
					current_scene = 2;
					changeScene();
				});

			break;

		case 6:

				background = createImage("res/login.png", backgroundX, backgroundY);

				foreground = createImage("res/login_scroll.png", backgroundX, backgroundY);

				login_button = createButton("res/login-button.png", "Menu", login_buttonX, login_buttonY, function() {
					last_scene = current_scene;
					current_scene = 2;
					changeScene();
				});

				login_button.addEventListener("click", function() {
					last_scene = current_scene;
					current_scene = 2;
					changeScene();
				});

			break;

		case 7:

				background = createImage("res/login.png", backgroundX, backgroundY);

				foreground = createImage("res/login_scroll.png", backgroundX, backgroundY);

				login_button = createButton("res/login-button.png", "Menu", login_buttonX, login_buttonY, function() {
					last_scene = current_scene;
					current_scene = 2;
					changeScene();
				});

				login_button.addEventListener("click", function() {
					last_scene = current_scene;
					current_scene = 2;
					changeScene();
				});

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

				scale_image(background, backgroundX, backgroundY);
				background.x = stage.canvas.width/2;
				background.y = stage.canvas.height/2;

				scale_image(foreground, backgroundX, backgroundY);
				foreground.x = stage.canvas.width/2;
				foreground.y = stage.canvas.height/2;

				scale_image(left_sword_button, left_sword_buttonX, left_sword_buttonY);
				left_sword_button.x = stage.canvas.width/2 - (left_sword_buttonX/2 + 10) * scene_scale_Y;
				left_sword_button.y = stage.canvas.height/2 + (left_sword_buttonY/2 + 140) * scene_scale_Y;

				scale_image(right_sword_button, right_sword_buttonX, right_sword_buttonY);
				right_sword_button.x = stage.canvas.width/2 + (right_sword_buttonX/2 + 50) * scene_scale_Y;
				right_sword_button.y = stage.canvas.height/2 + (right_sword_buttonY/2 + 140) * scene_scale_Y;

			break;

		case 1:

				scale_image(background, backgroundX, backgroundY);
				background.x = stage.canvas.width/2;
				background.y = stage.canvas.height/2;

				scale_image(foreground, backgroundX, backgroundY);
				foreground.x = stage.canvas.width/2;
				foreground.y = stage.canvas.height/2;

				scale_image(left_sword_button, left_sword_buttonX, left_sword_buttonY);
				left_sword_button.x = stage.canvas.width/2 - (left_sword_buttonX/2 + 10) * scene_scale_Y;
				left_sword_button.y = stage.canvas.height/2 + (left_sword_buttonY/2 + 140) * scene_scale_Y;

				scale_image(right_sword_button, right_sword_buttonX, right_sword_buttonY);
				right_sword_button.x = stage.canvas.width/2 + (right_sword_buttonX/2 + 50) * scene_scale_Y;
				right_sword_button.y = stage.canvas.height/2 + (right_sword_buttonY/2 + 140) * scene_scale_Y;

			break;

		case 2:

				scale_image(background, backgroundX, backgroundY);
				background.x = stage.canvas.width/2;
				background.y = stage.canvas.height/2;

				scale_image(play_button, play_buttonX, play_buttonY);
				play_button.x = stage.canvas.width/2;
				play_button.y = stage.canvas.height/2 - 200 * scene_scale_Y;
				scale_image(stats_button, play_buttonX, play_buttonY);
				stats_button.x = stage.canvas.width/2;
				stats_button.y = stage.canvas.height/2 - 100 * scene_scale_Y;
				scale_image(h2p_button, play_buttonX, play_buttonY);
				h2p_button.x = stage.canvas.width/2;
				h2p_button.y = stage.canvas.height/2 - 0 * scene_scale_Y;
				scale_image(settings_button, play_buttonX, play_buttonY);
				settings_button.x = stage.canvas.width/2;
				settings_button.y = stage.canvas.height/2 + 100 * scene_scale_Y;
				scale_image(logout_button, play_buttonX, play_buttonY);
				logout_button.x = (play_buttonX/2 + 10) * scene_scale_Y;
				logout_button.y = stage.canvas.height/2 - 300 * scene_scale_Y;
				scale_image(account_button, play_buttonX, play_buttonY);
				account_button.x = stage.canvas.width - (play_buttonX/2 + 10) * scene_scale_Y;
				account_button.y = stage.canvas.height/2 - 300 * scene_scale_Y;

			break;

		case 3:

				scale_image(login_button, login_buttonX, login_buttonY);
				login_button.x = (login_buttonX/2 + 10) * scene_scale_Y;
				login_button.y = stage.canvas.height - (login_buttonY/2 + 10) * scene_scale_Y;

			break;

		case 4:

				scale_image(background, backgroundX, backgroundY);
				background.x = stage.canvas.width/2;
				background.y = stage.canvas.height/2;

				scale_image(foreground, backgroundX, backgroundY);
				foreground.x = stage.canvas.width/2;
				foreground.y = stage.canvas.height/2;

				scale_image(login_button, login_buttonX, login_buttonY);
				login_button.x = (login_buttonX/2 + 10) * scene_scale_Y;
				login_button.y = stage.canvas.height - (login_buttonY/2 + 10) * scene_scale_Y;

			break;

		case 5:

				scale_image(background, backgroundX, backgroundY);
				background.x = stage.canvas.width/2;
				background.y = stage.canvas.height/2;

				scale_image(foreground, backgroundX, backgroundY);
				foreground.x = stage.canvas.width/2;
				foreground.y = stage.canvas.height/2;

				scale_image(login_button, login_buttonX, login_buttonY);
				login_button.x = (login_buttonX/2 + 10) * scene_scale_Y;
				login_button.y = stage.canvas.height - (login_buttonY/2 + 10) * scene_scale_Y;

			break;

		case 6:

				scale_image(background, backgroundX, backgroundY);
				background.x = stage.canvas.width/2;
				background.y = stage.canvas.height/2;

				scale_image(foreground, backgroundX, backgroundY);
				foreground.x = stage.canvas.width/2;
				foreground.y = stage.canvas.height/2;

				scale_image(login_button, login_buttonX, login_buttonY);
				login_button.x = (login_buttonX/2 + 10) * scene_scale_Y;
				login_button.y = stage.canvas.height - (login_buttonY/2 + 10) * scene_scale_Y;

			break;

		case 7:

				scale_image(background, backgroundX, backgroundY);
				background.x = stage.canvas.width/2;
				background.y = stage.canvas.height/2;

				scale_image(foreground, backgroundX, backgroundY);
				foreground.x = stage.canvas.width/2;
				foreground.y = stage.canvas.height/2;

				scale_image(login_button, login_buttonX, login_buttonY);
				login_button.x = (login_buttonX/2 + 10) * scene_scale_Y;
				login_button.y = stage.canvas.height - (login_buttonY/2 + 10) * scene_scale_Y;

			break;

		default:

	}

	// GUI in front of everything
	scale_image(lute, luteX, luteY);
	lute.x = stage.canvas.width - (luteX/2) * scene_scale_Y;
	lute.y = stage.canvas.height - (luteY/2) * scene_scale_Y;

}
