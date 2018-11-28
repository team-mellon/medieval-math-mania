function createSettings(engine, canvas, message) {                         // function that returns the login scene

  var scene = new BABYLON.Scene(engine);                // create the scene

  var camera = new BABYLON.UniversalCamera("camera1", new BABYLON.Vector3(0, 0, -10), scene);
                                                        // creates camera pointed at the scene
  camera.setTarget(BABYLON.Vector3.Zero());             // targets the camera to scene origin

  camera.attachControl(canvas, true);                   // attaches the camera to the canvas

  // GUI
  var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

  var input = new BABYLON.GUI.Slider();
  input.minimum = 0;
  input.maximum = 2 * Math.PI;
  input.value = 0;
  input.height = "20px";
  input.width = "200px";
  input.onValueChangedObservable.add(function(value) {
  });
  advancedTexture.addControl(input);

  input.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
  input.top = "-110px";

  var input2 = new BABYLON.GUI.Checkbox();
  input2.width = "20px";
  input2.height = "20px";
  input2.isChecked = true;
  input2.color = "green";
  input2.onIsCheckedChangedObservable.add(function(value) {
  });
  advancedTexture.addControl(input2);

  input2.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
  input2.top = "-30px";

  var text1 = new BABYLON.GUI.TextBlock();
  text1.text = "Time?";
  text1.color = "saddlebrown";
  text1.height = "43px";
  text1.fontFamily = "Blackadder ITC";
  text1.fontStyle = "italic";
  text1.fontSize = 35;
  advancedTexture.addControl(text1);

  text1.top = "-65px";
  text1.left = "-45px";

  var text2 = new BABYLON.GUI.TextBlock();
  text2.text = "Volume";
  text2.color = "saddlebrown";
  text2.height = "43px";
  text2.fontFamily = "Blackadder ITC";
  text2.fontStyle = "italic";
  text2.fontSize = 35;
  advancedTexture.addControl(text2);

  text2.top = "-140px";
  text2.left = "-43px";

	var button = BABYLON.GUI.Button.CreateImageWithCenterTextButton("log_butt", "Menu", "login-button.png");
	button.height = "90px";
	button.width = "290px";
	button.fontFamily = "Blackadder ITC";
	button.fontStyle = "italic";
	button.fontSize = 36;
	button.color = "gold";
	button.thickness = 0;
	advancedTexture.addControl(button);

	button.top = "300px";
	button.left = "-600px"
	// button.left = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;

	button.onPointerClickObservable.add(function() {
		message.render = 1;
    // advancedTexture.dispose();
	});

  var background = new BABYLON.Layer("back", "login.png", scene);
  background.isBackground = true;

  return scene;

};
