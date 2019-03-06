var num_scenes = 10;

var scene_bg_colors = [

  "#919191", // login
  "#919191", // signup
  "#8ac5dc", // menu
  "#000000", // game
  "#919191", // stats
  "#919191", // how 2 play
  "#919191", // settings
  "#919191", // account
  "#fffcd8", // map
  "#919191"  // hint

];

var scene_forms = [

  function() { createLoginForm(); },
  function() { createSignupForm(); },
  function() { createMenuForm(); },
  function() { createGameForm();
    createLevel();
    if (stage.canvas.width < 900) {

    } else {
      document.getElementById("entryInput").value = 0;
    }
    document.getElementById("myDropdown").classList.toggle("show");
  },
  // This was in stats scene, may need this structure
  // var key = message.current_user;
  // stats1_text.text = "Hits: " + database["stats"][key]["hits"];
  // stats2_text.text = "Misses: " + database["stats"][key]["misses"];
  function() { createStatsForm(); },
  function() { createHow2PlayForm(); },
  function() { createSettingsForm(); },
  // This was in account scene, may need this structure
  // var key = message.current_user;
  // username_text.text = "Fullname: " + database["users"][key]["firstname"] + " " + database["users"][key]["lastname"];
  // password_text.text = "Password: " + database["users"][key]["password"];
  function() { createAccountForm(); },
  function() { },
  // function() { createMapForm(); },
  function() { createHintForm(); }

];

function loadScene() {

  bg_color = scene_bg_colors[current_scene];

  switch(current_scene) {

    case 3:
  		loadLevel();
  		//loadGUI();
      break;

  }

}

function createScene() {

  stage.addChild(bg);
  bg.graphics.clear()
  bg.graphics.beginFill(bg_color).drawRect(0, 0, stage.canvas.width, stage.canvas.height);

  scene_forms[current_scene]();

	createGUI();

  console.log(entity_component_system);

}

function changeScene(new_scene) {

  last_scene = current_scene;
  current_scene = new_scene;

  loadScene();
  destroyScene();
  createScene();
  resize();

}

function oneWayScene() {

  if(last_scene != 3){

  	var temp = current_scene;
  	current_scene = last_scene;
  	last_scene = temp;

  	loadScene();
  	destroyScene();
  	createScene();
  	resize();

  } else{

  	var temp = current_scene;
  	current_scene = last_scene;
  	last_scene = temp;

  	loadScene();
  	destroyScene();
  	createScene();
  	resize();
  	pauseAnimation(true);
  	visibleButton(true);
  	visibleForm(false);

  }

}
