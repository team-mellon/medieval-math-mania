function createStats(engine, canvas, message, database) {                       // function that returns the menu scene

  var scene = new BABYLON.Scene(engine);                                        // create the scene

  var camera = new BABYLON.UniversalCamera(
    "stats_cam",
    new BABYLON.Vector3(0, 0, -10),
    scene);                                                                     // creates camera pointed at the scene
  camera.setTarget(BABYLON.Vector3.Zero());                                     // targets the camera to scene origin
  camera.attachControl(canvas, true);                                           // attaches the camera to the canvas

  var background = new BABYLON.Layer("bg", "res/login.png", scene, true);        // background layer

  // GUI
  var advTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI"); // AdvancedDynamicTexture for the controls of the gui
  advTexture.idealWidth = 1920;                                                 // Ideal screen width for the UI to scale to
  advTexture.idealHeight = 1080;                                                // Ideal screen height for the UI to scale to
  var enable = true;

  var stats1_text = new BABYLON.GUI.TextBlock();
  stats1_text.top = "-140px";
  stats1_text.left = "-43px";
  stats1_text.height = "43px";
  stats1_text.color = "saddlebrown";
  stats1_text.fontFamily = "Blackadder ITC";
  stats1_text.fontStyle = "italic";
  stats1_text.fontSize = 35;
  stats1_text.text = "Hits: " + database.stats.a12b3c4d.hits;
  stats1_text.isEnabled = enable;

  var stats2_text = new BABYLON.GUI.TextBlock();
  stats2_text.top = "-65px";
  stats2_text.left = "-45px";
  stats2_text.height = "43px";
  stats2_text.color = "saddlebrown";
  stats2_text.fontFamily = "Blackadder ITC";
  stats2_text.fontStyle = "italic";
  stats2_text.fontSize = 35;
  stats2_text.text = "Misses: " + database.stats.a12b3c4d.misses;
  stats2_text.isEnabled = enable;

  var menu_button = BABYLON.GUI.Button.CreateImageWithCenterTextButton(
    "menu_button",
    "Menu",
    "res/login-button.png"
  );
	menu_button.top = "350px";
	menu_button.left = "-750px";
  menu_button.height = "90px";
  menu_button.width = "290px";
  menu_button.color = "gold";
  menu_button.thickness = 0;
  menu_button.fontFamily = "Blackadder ITC";
  menu_button.fontStyle = "italic";
  menu_button.fontSize = 36;
  menu_button.isEnabled = enable;
  menu_button.onPointerClickObservable.add(function() {
		message.render = 1;
    // advTexture.dispose();
	});

  advTexture.addControl(stats1_text);
  advTexture.addControl(stats2_text);
	advTexture.addControl(menu_button);

  return scene;

};
