var num_scenes = 7;
var current_scene = 0;
var last_scene = 0;

var phone_rotation;
var phone_rotationS = {
  images: ["res/phone-rotation.png"],
  frames: {width:288, height:288, count:2, regX: 0, regY:0, spacing:0, margin:0},
  framerate: 1
};

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
      bg_color = "#fffcd8";
      break;

    case 9:
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
      document.getElementById("myDropdown").classList.toggle("show");
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

  case 9:
      createHintForm();
      break;

    default:

  }

	createGUI();

}

function destroyScene() {

	switch(last_scene) {
		case 0:
			break;
		default:
	}

  var scene_html = document.getElementById("sceneHTML");
  while (scene_html.firstChild) {
    scene_html.removeChild(scene_html.firstChild);
  }

  stage.removeAllChildren();

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
