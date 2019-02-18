var num_scenes = 10;

var scene_bg_colors = [
    "#919191",
    "#919191",
    "#8ac5dc",
    "#000000",
    "#919191",
    "#919191",
    "#919191",
    "#919191",
    "#fffcd8",
    "#919191"
];

var scene_forms = [
    function() {createLoginForm();},
    function() {createSignupForm();},
    // firstname_text.text = "First Name";
    // lastname_text.text = "Last Name";
    // username_text.text = "Create User Name";
    // password_text.text = "Create Password";
    // re_password_text.text = "Re-Enter Password";
    function() {createMenuForm();},
    function() {
      createGameForm();
      createLevel();
      document.getElementById("entryInput").value = 0;
      document.getElementById("myDropdown").classList.toggle("show");
    },
    // This was in stats scene, may need this structure
    // var key = message.current_user;
    // stats1_text.text = "Hits: " + database["stats"][key]["hits"];
    // stats2_text.text = "Misses: " + database["stats"][key]["misses"];
    function() {createStatsForm();},
    function() {createHow2PlayForm();},
    function() {createSettingsForm();},
    // This was in account scene, may need this structure
    // var key = message.current_user;
    // username_text.text = "Fullname: " + database["users"][key]["firstname"] + " " + database["users"][key]["lastname"];
    // password_text.text = "Password: " + database["users"][key]["password"];
    function() {createAccountForm();},
    function() {createMapForm();},
    function() {createHintForm();}
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

function oneWayScene() {
    var temp = current_scene;
    current_scene = last_scene;
    last_scene = temp;

    loadScene();
    destroyScene();
    createScene();
    resize();
    scaleGUI();
}
