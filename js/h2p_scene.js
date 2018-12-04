function createHow2Play(engine, canvas, message, database) {                    // function that returns the how to play scene

  var scene = new BABYLON.Scene(engine);                                        // create the scene
  scene.attachControl();

  var camera = new BABYLON.UniversalCamera(
    "h2p_cam",
    new BABYLON.Vector3(0, 0, -10),
    scene);                                                                     // creates camera pointed at the scene
  camera.setTarget(BABYLON.Vector3.Zero());                                     // targets the camera to scene origin
  camera.attachControl(canvas, true);                                           // attaches the camera to the canvas

  var background = new BABYLON.Layer("bg", "res/login.png", scene, true);       // background layer

  // GUI
  var advTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI"); // AdvancedDynamicTexture for the controls of the gui
  advTexture.idealWidth = 1920;                                                 // Ideal screen width for the UI to scale to
  advTexture.idealHeight = 1080;                                                // Ideal screen height for the UI to scale to
  advTexture.attach();
  var enable = true;

  var h2p_text = new BABYLON.GUI.TextBlock();
  h2p_text.top = "-140px";
  h2p_text.left = "-43px";
  h2p_text.height = "43px";
  h2p_text.color = "saddlebrown";
  h2p_text.fontFamily = "Blackadder ITC";
  h2p_text.fontStyle = "italic";
  h2p_text.fontSize = 35;
  h2p_text.text = "Its just math..";
  h2p_text.isEnabled = enable;

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
	});


	var lute = BABYLON.GUI.Button.CreateImageWithCenterTextButton("lute_butt", "", "res/lute.png");
	lute.height = "110px";
	lute.width = "110px";
	lute.fontFamily = "Blackadder ITC";
	lute.fontStyle = "italic";
	lute.fontSize = 36;
	lute.color = "gold";
	lute.thickness = 0;
	lute.top = "350px";
  lute.left = "875px";
	advTexture.addControl(lute);
	// lute.left = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
	lute.onPointerClickObservable.add(function() {
    message.music_pause = !message.music_pause;
	});

  advTexture.addControl(h2p_text);
	advTexture.addControl(menu_button);

  return scene;

};
