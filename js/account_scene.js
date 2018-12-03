function createAccount(engine, canvas, message, database) {                     // function that returns the account scene

  var scene = new BABYLON.Scene(engine);                                        // create the scene

  var camera = new BABYLON.UniversalCamera(
    "account_cam",
    new BABYLON.Vector3(0, 0, -10),
    scene
  );                                                                     // creates camera pointed at the scene
  camera.setTarget(BABYLON.Vector3.Zero());                                     // targets the camera to scene origin
  camera.attachControl(canvas, true);                                           // attaches the camera to the canvas

  var background = new BABYLON.Layer("bg", "res/login.png", scene, true);       // background

  // GUI
  var advTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI"); // AdvancedDynamicTexture for the controls of the gui
  advTexture.idealWidth = 1920;                                                 // Ideal screen width for the UI to scale to
  advTexture.idealHeight = 1080;                                                // Ideal screen height for the UI to scale to
  var enable = true;

  var username_text = new BABYLON.GUI.TextBlock();
  username_text.top = "-140px";
  username_text.left = "-43px";
  username_text.height = "43px";
  username_text.color = "saddlebrown";
  username_text.fontFamily = "Blackadder ITC";
  username_text.fontStyle = "italic";
  username_text.fontSize = 35;
    username_text.text = "Username: ";// + database.users.a12b3c4d.username;
  username_text.isEnabled = enable;

  var password_text = new BABYLON.GUI.TextBlock();
  password_text.top = "-65px";
  password_text.left = "-45px";
  password_text.height = "43px";
  password_text.color = "saddlebrown";
  password_text.fontFamily = "Blackadder ITC";
  password_text.fontStyle = "italic";
  password_text.fontSize = 35;
    password_text.text = "Password: ";// + database.users.a12b3c4d.password;
  password_text.isEnabled = enable;

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

  advTexture.addControl(username_text);
  advTexture.addControl(password_text);
	advTexture.addControl(menu_button);

  return scene;

};
