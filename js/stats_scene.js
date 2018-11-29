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

  var text1 = new BABYLON.GUI.TextBlock();
  text1.text = "Hits: " + database.stats.a12b3c4d.hits;
  text1.color = "saddlebrown";
  text1.height = "43px";
  text1.fontFamily = "Blackadder ITC";
  text1.fontStyle = "italic";
  text1.fontSize = 35;
  advTexture.addControl(text1);

  text1.top = "-65px";
  text1.left = "-45px";

  var text2 = new BABYLON.GUI.TextBlock();
  text2.text = "Misses: " + database.stats.a12b3c4d.misses;
  text2.color = "saddlebrown";
  text2.height = "43px";
  text2.fontFamily = "Blackadder ITC";
  text2.fontStyle = "italic";
  text2.fontSize = 35;
  advTexture.addControl(text2);

  text2.top = "-140px";
  text2.left = "-43px";

  var button = BABYLON.GUI.Button.CreateImageWithCenterTextButton("log_butt", "Menu", "res/login-button.png");
	button.height = "90px";
	button.width = "290px";
	button.fontFamily = "Blackadder ITC";
	button.fontStyle = "italic";
	button.fontSize = 36;
	button.color = "gold";
	button.thickness = 0;
	button.top = "350px";
	button.left = "-750px";
	advTexture.addControl(button);
	// button.left = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;

	button.onPointerClickObservable.add(function() {
		message.render = 1;
    // advTexture.dispose();
	});

  return scene;

};
