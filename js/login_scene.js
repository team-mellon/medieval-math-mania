function createLogin(engine, canvas, message, database) {                         // function that returns the login scene

  var onScene = false;

  // if (message.render == 0) {
    onScene = true;
  // }

  var scene = new BABYLON.Scene(engine);                // create the scene

  var camera = new BABYLON.UniversalCamera("camera1", new BABYLON.Vector3(0, 0, -10), scene);
                                                        // creates camera pointed at the scene
  camera.setTarget(BABYLON.Vector3.Zero());             // targets the camera to scene origin

  camera.attachControl(canvas, true);                   // attaches the camera to the canvas

  // GUI
  var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
  advancedTexture.idealWidth = 1920;
  advancedTexture.idealHeight = 1080;

  var input = new BABYLON.GUI.InputText();
  input.width = "180px";
  input.maxWidth = 0.15;
  input.height = "35px";
  input.color = "black";
  input.background = "lightyellow";
  input.thickness = 0.15;
  input.focusedBackground = "white";
  input.isEnabled = onScene;
  advancedTexture.addControl(input);

  input.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
  input.top = "-110px";

  var input2 = new BABYLON.GUI.InputPassword();
  input2.width = "180px";
  input2.maxwidth = 0.15;
  input2.height = "35px";
  input2.color = "black";
  input2.background = "lightyellow";
  input2.thickness = 0.15;
  input2.focusedBackground = "white";
  input2.isEnabled = onScene;
  advancedTexture.addControl(input2);

  input2.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
  input2.top = "-30px";

  var text1 = new BABYLON.GUI.TextBlock();
  text1.text = "Password";
  text1.color = "saddlebrown";
  text1.height = "43px";
  text1.fontFamily = "Blackadder ITC";
  text1.fontStyle = "italic";
  text1.fontSize = 35;
  text1.isEnabled = onScene;
  advancedTexture.addControl(text1);

  text1.top = "-65px";
  text1.left = "-45px";

  var text2 = new BABYLON.GUI.TextBlock();
  text2.text = "Username";
  text2.color = "saddlebrown";
  text2.height = "43px";
  text2.fontFamily = "Blackadder ITC";
  text2.fontStyle = "italic";
  text2.fontSize = 35;
  text2.isEnabled = onScene;
  advancedTexture.addControl(text2);

  text2.top = "-140px";
  text2.left = "-43px";

  var button = BABYLON.GUI.Button.CreateImageWithCenterTextButton("log_butt", "Login", "login-button.png");
  button.height = "90px";
  button.width = "290px";
  button.fontFamily = "Blackadder ITC";
  button.fontStyle = "italic";
  button.fontSize = 36;
  button.color = "gold";
  button.thickness = 0;
  button.isEnabled = onScene;
  advancedTexture.addControl(button);

  button.top = "40px";
  //button.left = "125px";

  button.onPointerClickObservable.add(function() {
    message.render = 1;
    // advancedTexture.dispose();
  });

  var background = new BABYLON.Layer("back", "login.png", scene);
  background.isBackground = true;

  return scene;

};
