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
var small_buttonX = 72;
var small_buttonY = 72;

var left_sword_button;
var right_sword_button;

var background;
var background_left;
var background_right;
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

var hint_button;

var level1_indicator;
var level2_indicator;

function createGUI() {

	switch(current_scene) {

		case 0:

			background = createImage("res/login.png", backgroundX, backgroundY);
			background_left = createImage("res/login.png", backgroundX, backgroundY);
			background_right = createImage("res/login.png", backgroundX, backgroundY);
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
			secret_button = createButton("res/secret_button.png", "", backgroundX, backgroundY, function() {	changeScene(8); });

			break;

		case 1:

    // password_error.text = "Passwords did not match.\n Please try again.";
    // fieldInput_error.text = "Please fill-in\n every field";


			background = createImage("res/login.png", backgroundX, backgroundY);
			background_left = createImage("res/login.png", backgroundX, backgroundY);
			background_right = createImage("res/login.png", backgroundX, backgroundY);
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
			background_left = createImage("res/menu-left.png", backgroundX, backgroundY);
			background_right = createImage("res/menu-right.png", backgroundX, backgroundY);

			play_button = createButton("res/menu-button.png", "Play", buttonX, buttonY, function() { changeScene(8); });
			stats_button = createButton("res/menu-button.png", "Stats", buttonX, buttonY, function() { changeScene(4); });
			h2p_button = createButton("res/menu-button.png", "How To Play", buttonX, buttonY, function() { changeScene(5); });
			settings_button = createButton("res/menu-button.png", "Settings", buttonX, buttonY, function() { changeScene(6); });
			logout_button = createButton("res/menu-button.png", "Logout", buttonX, buttonY, function() { changeScene(0); });
			account_button = createButton("res/menu-button.png", "Account", buttonX, buttonY, function() { changeScene(7); });

			break;

		case 3:

			login_button = createButton("res/login-button.png", "Map", buttonX, buttonY, function() { changeScene(8); });
      hint_button = createButton("res/hint-button.png", "Hint", small_buttonX, small_buttonY, function() {  changeScene(9); });

			break;

		case 4:

			background = createImage("res/login.png", backgroundX, backgroundY);
			background_left = createImage("res/login.png", backgroundX, backgroundY);
			background_right = createImage("res/login.png", backgroundX, backgroundY);
			foreground = createImage("res/login_scroll.png", backgroundX, backgroundY);

			login_button = createButton("res/login-button.png", "Menu", buttonX, buttonY, function() { changeScene(2); });

			break;

		case 5:

			background = createImage("res/login.png", backgroundX, backgroundY);
			background_left = createImage("res/login.png", backgroundX, backgroundY);
			background_right = createImage("res/login.png", backgroundX, backgroundY);
			foreground = createImage("res/login_scroll.png", backgroundX, backgroundY);

			login_button = createButton("res/login-button.png", "Menu", buttonX, buttonY, function() { changeScene(2); });

			break;

		case 6:

			background = createImage("res/login.png", backgroundX, backgroundY);
			background_left = createImage("res/login.png", backgroundX, backgroundY);
			background_right = createImage("res/login.png", backgroundX, backgroundY);
			foreground = createImage("res/login_scroll.png", backgroundX, backgroundY);

			login_button = createButton("res/login-button.png", "Menu", buttonX, buttonY, function() { changeScene(2); });

			break;

		case 7:

			background = createImage("res/login.png", backgroundX, backgroundY);
			background_left = createImage("res/login.png", backgroundX, backgroundY);
			background_right = createImage("res/login.png", backgroundX, backgroundY);
			foreground = createImage("res/login_scroll.png", backgroundX, backgroundY);

			login_button = createButton("res/login-button.png", "Menu", buttonX, buttonY, function() { changeScene(2); });

			break;

		case 8:

			background = createImage("res/map.png", backgroundX, backgroundY);
			// foreground = createImage("res/login_scroll.png", backgroundX, backgroundY);

			login_button = createButton("res/login-button.png", "Menu", buttonX, buttonY, function() { changeScene(2); });

			level1_indicator = createButton("res/map-indicator.png", "", indicatorX, indicatorY, function() {
        current_level = 1;
        hide_knight = false;
        hide_archer1 = false;
        hide_archer2 = false;
        hide_archer3 = false;
        hide_archer4 = false;
        hit_counter = 0;
        miss_upper_counter = 0;
        miss_lower_counter = 0;
        changeScene(3);
      });
			level2_indicator = createButton("res/map-indicator.png", "", indicatorX, indicatorY, function() {
        current_level = 2;
        hide_knight = false;
        hide_archer1 = false;
        hide_archer2 = false;
        hide_archer3 = false;
        hide_archer4 = false;
        hit_counter = 0;
        miss_upper_counter = 0;
        miss_lower_counter = 0;
        changeScene(3);
      });

			break;
    case 9:

      background = createImage("res/login.png", backgroundX, backgroundY);
			background_left = createImage("res/login.png", backgroundX, backgroundY);
			background_right = createImage("res/login.png", backgroundX, backgroundY);
      foreground = createImage("res/login_scroll.png", backgroundX, backgroundY);
      login_button = createButton("res/login-button.png", "Back", buttonX, buttonY, function() { changeScene(3); });

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

  landscape_warning = new createjs.Shape();

  phone_rotation = createSprite(phone_rotationS, 288, 288);
  stage.removeChild(phone_rotation);

}

function scaleGUI() {

	switch(current_scene) {

		case 0:

			scale_image(background, stage.canvas.width / 2, stage.canvas.height / 2);
			scale_image(background_left, stage.canvas.width / 2 - (backgroundX) * scene_scale_Y, stage.canvas.height / 2);
			scale_image(background_right, stage.canvas.width / 2 + (backgroundX) * scene_scale_Y, stage.canvas.height / 2);
			scale_image(foreground, stage.canvas.width / 2, stage.canvas.height / 2);

			// scale_image(left_sword_button, stage.canvas.width/2 - (buttonX/2 + 10) * scene_scale_Y, stage.canvas.height/2 + (buttonY/2 + 140) * scene_scale_Y);
			// scale_image(right_sword_button, stage.canvas.width/2 + (buttonX/2 + 50) * scene_scale_Y, stage.canvas.height/2 + (buttonY/2 + 140) * scene_scale_Y);

      if (stage.canvas.width < 900) {
  			scale_gui(left_sword_button, stage.canvas.width/2 - (buttonX/2 + 30) * scene_scale_Y, stage.canvas.height/2 + (buttonY/2 + 200) * scene_scale_Y);
  			scale_gui(right_sword_button, stage.canvas.width/2 + (buttonX/2 + 65) * scene_scale_Y, stage.canvas.height/2 + (buttonY/2 + 200) * scene_scale_Y);
      } else {
  			scale_image(left_sword_button, stage.canvas.width/2 - (buttonX/2 + 30) * scene_scale_Y, stage.canvas.height/2 + (buttonY/2 + 200) * scene_scale_Y);
  			scale_image(right_sword_button, stage.canvas.width/2 + (buttonX/2 + 65) * scene_scale_Y, stage.canvas.height/2 + (buttonY/2 + 200) * scene_scale_Y);
      }
			scale_image(secret_button, stage.canvas.width/2, stage.canvas.height/2);

			break;

		case 1:

			scale_image(background, stage.canvas.width / 2, stage.canvas.height / 2);
			scale_image(background_left, stage.canvas.width / 2 - (backgroundX) * scene_scale_Y, stage.canvas.height / 2);
			scale_image(background_right, stage.canvas.width / 2 + (backgroundX) * scene_scale_Y, stage.canvas.height / 2);
			scale_image(foreground, stage.canvas.width / 2, stage.canvas.height / 2);

      // if (stage.canvas.width < 900) {
  		// 	scale_gui(left_sword_button, stage.canvas.width/2 - (buttonX/2 + 10) * scene_scale_Y, stage.canvas.height/2 + (buttonY/2 + 140) * scene_scale_Y);
  		// 	scale_gui(right_sword_button, stage.canvas.width/2 + (buttonX/2 + 50) * scene_scale_Y, stage.canvas.height/2 + (buttonY/2 + 140) * scene_scale_Y);
      // } else {
  			scale_image(left_sword_button, stage.canvas.width/2 - (buttonX/2 + 30) * scene_scale_Y, stage.canvas.height/2 + (buttonY/2 + 200) * scene_scale_Y);
  			scale_image(right_sword_button, stage.canvas.width/2 + (buttonX/2 + 65) * scene_scale_Y, stage.canvas.height/2 + (buttonY/2 + 200) * scene_scale_Y);
      // }

			break;

		case 2:

			scale_image(background, stage.canvas.width / 2, stage.canvas.height / 2);
			scale_image(background_left, stage.canvas.width / 2 - (backgroundX) * scene_scale_Y, stage.canvas.height / 2);
			scale_image(background_right, stage.canvas.width / 2 + (backgroundX) * scene_scale_Y, stage.canvas.height / 2);

      if (stage.canvas.width < 900) {
  			scale_gui(play_button, stage.canvas.width/2, stage.canvas.height/2 - 105);
  			scale_gui(stats_button, stage.canvas.width/2, stage.canvas.height/2 - 20);
  			scale_gui(h2p_button, stage.canvas.width/2, stage.canvas.height/2 + 65);
  			scale_gui(settings_button, stage.canvas.width/2, stage.canvas.height/2 + 150);
  			scale_gui(logout_button, (buttonX/2 + 10), (buttonY/2 + 10));
  			scale_gui(account_button, stage.canvas.width - (buttonX/2 + 10), (buttonY/2 + 10));
      } else {
  			scale_gui(play_button, stage.canvas.width/2, stage.canvas.height/2 - 200 * scene_scale_Y);
  			scale_gui(stats_button, stage.canvas.width/2, stage.canvas.height/2 - 100 * scene_scale_Y);
  			scale_gui(h2p_button, stage.canvas.width/2, stage.canvas.height/2 - 0 * scene_scale_Y);
  			scale_gui(settings_button, stage.canvas.width/2, stage.canvas.height/2 + 100 * scene_scale_Y);
  			scale_gui(logout_button, (buttonX/2 + 10) * scene_scale_Y,  (buttonY/2 + 10) * scene_scale_Y);
  			scale_gui(account_button, stage.canvas.width - (buttonX/2 + 10) * scene_scale_Y,  (buttonY/2 + 10) * scene_scale_Y);
      }

			break;

		case 3:

      if (stage.canvas.width < 900) {
        scale_gui(login_button, (buttonX/2 + 10), stage.canvas.height - (buttonY/2 + 10));
        scale_gui(hint_button, stage.canvas.width - (small_buttonX/2 + 116), stage.canvas.height - (small_buttonY/2 + 10));
      } else {
        scale_gui(login_button, (buttonX/2 + 10) * scene_scale_Y, stage.canvas.height - (buttonY/2 + 10) * scene_scale_Y);
        scale_gui(hint_button, stage.canvas.width - (small_buttonX/2 + 116) * scene_scale_Y, stage.canvas.height - (small_buttonY/2 + 10) * scene_scale_Y);
      }

			break;

		case 4:

			scale_image(background, stage.canvas.width / 2, stage.canvas.height / 2);
			scale_image(background_left, stage.canvas.width / 2 - (backgroundX) * scene_scale_Y, stage.canvas.height / 2);
			scale_image(background_right, stage.canvas.width / 2 + (backgroundX) * scene_scale_Y, stage.canvas.height / 2);
			scale_image(foreground, stage.canvas.width / 2, stage.canvas.height / 2);

      if (stage.canvas.width < 900) {
        scale_gui(login_button, (buttonX/2 + 10), stage.canvas.height - (buttonY/2 + 10));
      } else {
        scale_gui(login_button, (buttonX/2 + 10) * scene_scale_Y, stage.canvas.height - (buttonY/2 + 10) * scene_scale_Y);
      }

			break;

		case 5:

			scale_image(background, stage.canvas.width / 2, stage.canvas.height / 2);
			scale_image(background_left, stage.canvas.width / 2 - (backgroundX) * scene_scale_Y, stage.canvas.height / 2);
			scale_image(background_right, stage.canvas.width / 2 + (backgroundX) * scene_scale_Y, stage.canvas.height / 2);
			scale_image(foreground, stage.canvas.width / 2, stage.canvas.height / 2);

      if (stage.canvas.width < 900) {
        scale_gui(login_button, (buttonX/2 + 10), stage.canvas.height - (buttonY/2 + 10));
      } else {
        scale_gui(login_button, (buttonX/2 + 10) * scene_scale_Y, stage.canvas.height - (buttonY/2 + 10) * scene_scale_Y);
      }

			break;

		case 6:

			scale_image(background, stage.canvas.width / 2, stage.canvas.height / 2);
			scale_image(background_left, stage.canvas.width / 2 - (backgroundX) * scene_scale_Y, stage.canvas.height / 2);
			scale_image(background_right, stage.canvas.width / 2 + (backgroundX) * scene_scale_Y, stage.canvas.height / 2);
			scale_image(foreground, stage.canvas.width / 2, stage.canvas.height / 2);

      if (stage.canvas.width < 900) {
        scale_gui(login_button, (buttonX/2 + 10), stage.canvas.height - (buttonY/2 + 10));
      } else {
        scale_gui(login_button, (buttonX/2 + 10) * scene_scale_Y, stage.canvas.height - (buttonY/2 + 10) * scene_scale_Y);
      }

			break;

		case 7:

			scale_image(background, stage.canvas.width / 2, stage.canvas.height / 2);
			scale_image(background_left, stage.canvas.width / 2 - (backgroundX) * scene_scale_Y, stage.canvas.height / 2);
			scale_image(background_right, stage.canvas.width / 2 + (backgroundX) * scene_scale_Y, stage.canvas.height / 2);
			scale_image(foreground, stage.canvas.width / 2, stage.canvas.height / 2);

      if (stage.canvas.width < 900) {
        scale_gui(login_button, (buttonX/2 + 10), stage.canvas.height - (buttonY/2 + 10));
      } else {
        scale_gui(login_button, (buttonX/2 + 10) * scene_scale_Y, stage.canvas.height - (buttonY/2 + 10) * scene_scale_Y);
      }

			break;

		case 8:

			scale_image(background, stage.canvas.width / 2, stage.canvas.height / 2);
			// scale_image(foreground, stage.canvas.width / 2, stage.canvas.height / 2);

			scale_image(login_button, (buttonX/2 + 10) * scene_scale_Y, stage.canvas.height - (buttonY/2 + 10) * scene_scale_Y);

      if (stage.canvas.width < 900) {
        scale_gui(login_button, (buttonX/2 + 10), stage.canvas.height - (buttonY/2 + 10));
        scale_gui(level1_indicator, stage.canvas.width / 2 - (indicatorX/2 + 72) * scene_scale_Y, stage.canvas.height - (indicatorY/2 + 285) * scene_scale_Y);
			  scale_gui(level2_indicator, stage.canvas.width / 2 - (indicatorX/2 + 168) * scene_scale_Y, stage.canvas.height - (indicatorY/2 + 150) * scene_scale_Y);
      } else {
        scale_gui(login_button, (buttonX/2 + 10) * scene_scale_Y, stage.canvas.height - (buttonY/2 + 10) * scene_scale_Y);
        scale_gui(level1_indicator, stage.canvas.width / 2 - (indicatorX/2 + 72) * scene_scale_Y, stage.canvas.height - (indicatorY/2 + 285) * scene_scale_Y);
        scale_gui(level2_indicator, stage.canvas.width / 2 - (indicatorX/2 + 168) * scene_scale_Y, stage.canvas.height - (indicatorY/2 + 150) * scene_scale_Y);
      }

			break;

    case 9:

    	scale_image(background, stage.canvas.width / 2, stage.canvas.height / 2);
			scale_image(background_left, stage.canvas.width / 2 - (backgroundX) * scene_scale_Y, stage.canvas.height / 2);
			scale_image(background_right, stage.canvas.width / 2 + (backgroundX) * scene_scale_Y, stage.canvas.height / 2);
    	scale_image(foreground, stage.canvas.width / 2, stage.canvas.height / 2);

      if (stage.canvas.width < 900) {
        scale_gui(login_button, (buttonX/2 + 10), stage.canvas.height - (buttonY/2 + 10));
      } else {
        scale_gui(login_button, (buttonX/2 + 10) * scene_scale_Y, stage.canvas.height - (buttonY/2 + 10) * scene_scale_Y);
      }

	    break;

		default:

	}

	// GUI in front of everything
  if (stage.canvas.width < 900) {
  	scale_gui(previous_indicator, stage.canvas.width - (indicatorX/4 * 13), stage.canvas.height - (indicatorY/4 * 3));
  	scale_gui(pause_indicator, stage.canvas.width - (indicatorX/4 * 8), stage.canvas.height - (indicatorY/4 * 3));
  	scale_gui(next_indicator, stage.canvas.width - (indicatorX/4 * 3), stage.canvas.height - (indicatorY/4 * 3));
  	scale_gui(lute, stage.canvas.width - (luteX/2), stage.canvas.height - (luteY/2 + 32));
  } else {
  	scale_gui(previous_indicator, stage.canvas.width - (indicatorX/4 * 13) * scene_scale_Y, stage.canvas.height - (indicatorY/4 * 3) * scene_scale_Y);
  	scale_gui(pause_indicator, stage.canvas.width - (indicatorX/4 * 8) * scene_scale_Y, stage.canvas.height - (indicatorY/4 * 3) * scene_scale_Y);
  	scale_gui(next_indicator, stage.canvas.width - (indicatorX/4 * 3) * scene_scale_Y, stage.canvas.height - (indicatorY/4 * 3) * scene_scale_Y);
  	scale_gui(lute, stage.canvas.width - (luteX/2) * scene_scale_Y, stage.canvas.height - (luteY/2 + 32) * scene_scale_Y);
  }

  landscape_warning.graphics.clear()
  landscape_warning.graphics.beginFill("#000000").drawRect(0, 0, stage.canvas.width, stage.canvas.height);

  scale_image(phone_rotation, stage.canvas.width / 2, stage.canvas.height / 2);

}
