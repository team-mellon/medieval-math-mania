var num_scenes = 7;
var current_scene = 0;
var last_scene = 0;

var lute;
var luteX = 96;
var luteY = 96;


var previous_indicator;
var pause_indicator;
var next_indicator;
var indicatorX = 24;
var indicatorY = 24;

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

var level1_indicator;
var level2_indicator;

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

    case 8:
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
      // firstname_text.text = "First Name";
      // lastname_text.text = "Last Name";
      // username_text.text = "Create User Name";
      // password_text.text = "Create Password";
      // re_password_text.text = "Re-Enter Password";
      break;

    case 2:
      // createMenuForm();
      break;

    case 3:
      createGameForm();
			createLevel();
      document.getElementById("entryInput").value = 0; 
      break;

    case 4:
      // This was in stats scene, may need this structure
      // var key = message.current_user;
      // stats1_text.text = "Hits: " + database["stats"][key]["hits"];
      // stats2_text.text = "Misses: " + database["stats"][key]["misses"];
      createStatsForm();
      break;

    case 5:
      createHow2PlayForm();
      break;

    case 6:
      createSettingsForm(); // Make volume slider affect volume and checkbox control time in scene
      break;

    case 7:
      // This was in account scene, may need this structure
      // var key = message.current_user;
      // username_text.text = "Fullname: " + database["users"][key]["firstname"] + " " + database["users"][key]["lastname"];
      // password_text.text = "Password: " + database["users"][key]["password"];
      createAccountForm();
      break;

  case 8:
      createMapForm();
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

			left_sword_button = createButton("res/sword-left.png", "Login", buttonX, buttonY, function() {
        var key = document.getElementById('usernameInput').value;
      	if(key in database.users) {
    	    if(database["users"][key]["password"] == document.getElementById('passwordInput').value) {
            document.getElementById('usernameInput').value = "";
            document.getElementById('passwordInput').value = "";
        		// login_error.alpha = 0;
            // var login_error = createTextBlock("0px", "200px", "200px", "600px", "darkred", 30, "normal", "Username and/or Password did not match.\n Please try again.", 0, enable);
        		// message.render = 1;
        		// message.current_user = key;
            changeScene(2);
    	    } else {
            document.getElementById('usernameInput').value = "";
            document.getElementById('passwordInput').value = "";
        		password_input.text = "";
        		// login_error.alpha = 1;
    	    }
      	}	else {
          document.getElementById('usernameInput').value = "";
          document.getElementById('passwordInput').value = "";
    	    // login_error.alpha = 1;
      	}
      });
			right_sword_button = createButton("res/sword-right.png", "Signup", buttonX, buttonY, function() {	changeScene(1); });

			break;

		case 1:

    // password_error.text = "Passwords did not match.\n Please try again.";
    // fieldInput_error.text = "Please fill-in\n every field";


			background = createImage("res/login.png", backgroundX, backgroundY);
			foreground = createImage("res/login_scroll.png", backgroundX, backgroundY);

			left_sword_button = createButton("res/sword-left.png", "Create", buttonX, buttonY, function() {
        // if(firstname_input.text == "" || lastname_input.text == "" || username_input.text == "" || password_input.text == "" || re_password_input.text == "") {
        //
      	//     fieldInput_error.alpha = 1;
      	//     firstname_input.text = "";
      	//     lastname_input.text = "";
      	//     username_input.text = "";
      	//     password_input.text = "";
      	//     re_password_input.text = "";
        //
      	// } else {
        //
        //   if(password_input.text != re_password_input.text) {
        //
        // 		password_error.alpha = 1;
        // 		fieldInput_error.alpha = 0;
        // 		password_input.text = "";
        // 		re_password_input.text = "";
        //
        //   } else {
        //
        // 		var key = username_input.text;
        //
        // 		database["stats"][key] = {
        // 		    hits: 0,
        // 		    misses: 0
        // 		};
        //
        // 		database["users"][key] = {
        // 		    firstname: firstname_input.text,
        // 		    lastname: lastname_input.text,
        // 		    password: password_input.text
        // 		};
        //
        // 		firstname_input.text = "";
        // 		lastname_input.text = "";
        // 		username_input.text = "";
        // 		password_input.text = "";
        // 		re_password_input.text = "";
        // 		fieldInput_error.alpha = 0;
        // 		password_error.alpha = ;
        // 		message.current_user = key;
        // 		message.render = 0;
        //
        //   }
      	// }
        changeScene(2);
      });
			right_sword_button = createButton("res/sword-right.png", "Cancel", buttonX, buttonY, function() {

      	// firstname_input.text = "";
      	// lastname_input.text = "";
      	// username_input.text = "";
      	// password_input.text = "";
      	// re_password_input.text = "";
      	// fieldInput_error.alpha = 0;
      	// password_error.alpha = 0;
      	// message.render = 0;

        changeScene(0);
      });

			break;

		case 2:

			background = createImage("res/menu.png", backgroundX, backgroundY);

			play_button = createButton("res/menu-button.png", "Play", buttonX, buttonY, function() { changeScene(8); });
			stats_button = createButton("res/menu-button.png", "Stats", buttonX, buttonY, function() { changeScene(4); });
			h2p_button = createButton("res/menu-button.png", "How To Play", buttonX, buttonY, function() { changeScene(5); });
			settings_button = createButton("res/menu-button.png", "Settings", buttonX, buttonY, function() { changeScene(6); });
			logout_button = createButton("res/menu-button.png", "Logout", buttonX, buttonY, function() { changeScene(0); });
			account_button = createButton("res/menu-button.png", "Account", buttonX, buttonY, function() { changeScene(7); });

			break;

		case 3:

			login_button = createButton("res/login-button.png", "Menu", buttonX, buttonY, function() { changeScene(8); });

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

		case 8:

			background = createImage("res/map.png", backgroundX, backgroundY);
			// foreground = createImage("res/login_scroll.png", backgroundX, backgroundY);

			login_button = createButton("res/login-button.png", "Menu", buttonX, buttonY, function() { changeScene(2); });

			level1_indicator = createButton("res/map-indicator.png", "", indicatorX, indicatorY, function() { changeLevel(1); changeScene(3); });
			level2_indicator = createButton("res/map-indicator.png", "", indicatorX, indicatorY, function() { changeLevel(2); changeScene(3); });

			break;

		default:

	}

	previous_indicator = createImage("res/previous-indicator.png", indicatorX, indicatorY);
  previous_indicator.addEventListener("click", previousSound);

	pause_indicator = createImage("res/pause-indicator.png", indicatorX, indicatorY);
  pause_indicator.addEventListener("click", playSound);

	next_indicator = createImage("res/next-indicator.png", indicatorX, indicatorY);
  next_indicator.addEventListener("click", nextSound);

	lute = createImage("res/lute.png", luteX, luteY);
  lute.addEventListener("click", muteSound);

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

		case 8:

			scale_image(background, stage.canvas.width / 2, stage.canvas.height / 2);
			// scale_image(foreground, stage.canvas.width / 2, stage.canvas.height / 2);

			scale_image(login_button, (buttonX/2 + 10) * scene_scale_Y, stage.canvas.height - (buttonY/2 + 10) * scene_scale_Y);

      scale_image(level1_indicator, stage.canvas.width / 2 - (indicatorX/2 + 72) * scene_scale_Y, stage.canvas.height - (indicatorY/2 + 285) * scene_scale_Y);
			scale_image(level2_indicator, stage.canvas.width / 2 - (indicatorX/2 + 168) * scene_scale_Y, stage.canvas.height - (indicatorY/2 + 150) * scene_scale_Y);

			break;

		default:

	}

	// GUI in front of everything
	scale_image(previous_indicator, stage.canvas.width - (indicatorX/4 * 13) * scene_scale_Y, stage.canvas.height - (indicatorY/4 * 3) * scene_scale_Y);
	scale_image(pause_indicator, stage.canvas.width - (indicatorX/4 * 8) * scene_scale_Y, stage.canvas.height - (indicatorY/4 * 3) * scene_scale_Y);
	scale_image(next_indicator, stage.canvas.width - (indicatorX/4 * 3) * scene_scale_Y, stage.canvas.height - (indicatorY/4 * 3) * scene_scale_Y);
	scale_image(lute, stage.canvas.width - (luteX/2) * scene_scale_Y, stage.canvas.height - (luteY/2 + 32) * scene_scale_Y);

}
