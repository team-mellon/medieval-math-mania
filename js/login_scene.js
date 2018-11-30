function createLogin(engine, canvas, message, database) {                       // function that returns the login scene

  var scene = new BABYLON.Scene(engine);                                        // create the scene

  var camera = new BABYLON.UniversalCamera(
    "login_cam",
    new BABYLON.Vector3(0, 0, -10),
    scene);                                                                     // creates camera pointed at the scene
  camera.setTarget(BABYLON.Vector3.Zero());                                     // targets the camera to scene origin
  camera.attachControl(canvas, true);                                           // attaches the camera to the canvas

  var background = new BABYLON.Layer("bg", "res/login.png", scene, true);       // background layer

  // GUI
  var advTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI"); // AdvancedDynamicTexture for the controls of the gui
  advTexture.idealWidth = 1920;                                                 // Ideal screen width for the UI to scale to
  advTexture.idealHeight = 1080;                                                // Ideal screen height for the UI to scale to
  var enable = true;                                                            // render enable bit for the ADT controls

  var username_text = new BABYLON.GUI.TextBlock();                              // username textblock
  username_text.top = "-110px";
  username_text.left = "-265px";
  username_text.height = "55px";
  username_text.width = "250px";
  username_text.color = "saddlebrown";
  username_text.fontFamily = "Blackadder ITC";
  username_text.fontStyle = "italic";
  username_text.fontSize = 55;
  username_text.text = "Username:";
  username_text.isEnabled = enable;

  var username_input = new BABYLON.GUI.InputText();                             // username input box
  username_input.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
  username_input.top = "-105px";
  username_input.left = "95px";
  username_input.width = "500px";
  username_input.height = "45px";
  username_input.maxWidth = 0.15;
  username_input.color = "black";
  username_input.background = "lightyellow";
  username_input.thickness = 0;
  username_input.focusedBackground = "white";
  username_input.isEnabled = enable;

  var password_text = new BABYLON.GUI.TextBlock();                              // password textblock
  password_text.top = "-25px";
  password_text.left = "-270px";
    password_text.height = "55px";
    password_text.width = "250px";
  password_text.color = "saddlebrown";
  password_text.fontFamily = "Blackadder ITC";
  password_text.fontStyle = "italic";
  password_text.fontSize = 55;
  password_text.text = "Password:";
  password_text.isEnabled = enable;

  var password_input = new BABYLON.GUI.InputPassword();                         // password input box
  password_input.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    password_input.top = "-25px";
    password_input.left = "95px";
  password_input.width = "500px";
  password_input.height = "45px";
  password_input.maxwidth = 0.15;
  password_input.color = "black";
  password_input.background = "lightyellow";
  password_input.thickness = 0;
  password_input.focusedBackground = "white";
  password_input.isEnabled = enable;

    var login_button = BABYLON.GUI.Button.CreateImageWithCenterTextButton("login_button", "Login", "res/login-button.png");         // login button
    login_button.top = "90px";
    login_button.left ="-130px";
  login_button.height = "60px";
  login_button.width = "200px";
  login_button.color = "gold";
  login_button.thickness = 0;
  login_button.fontFamily = "Blackadder ITC";
  login_button.fontStyle = "italic";
  login_button.fontSize = 26;
  login_button.isEnabled = enable;
  login_button.onPointerClickObservable.add(function() {
    message.render = 1;
    // advTexture.dispose();
  });

    var account_button = BABYLON.GUI.Button.CreateImageWithCenterTextButton("account_button", "Create Account", "res/login-button.png");
    account_button.top = "90px";
    account_button.left = "130px";
    account_button.width = "200px";
    account_button.height = "60px";
    account_button.color = "gold";
    account_button.thickness = 0;
    account_button.fontFamily = "Blackadder ITC";
    account_button.fontStyle = "italic";
    account_button.fontSize = 26;
    account_button.isEnabled = enable;
    account_button.onPointerClickObservable.add(function() {
	message.render = 7;
    });


    var username_line = new BABYLON.GUI.Line();
    username_line.x1 = 805;
    username_line.y1 = 370;
    username_line.x2 = 1305;
    username_line.y2 = 370;
    username_line.lineWidth = 1.5;
    username_line.color ="saddlebrown";


    var password_line = new BABYLON.GUI.Line();
    password_line.x1 = 805;
    password_line.y1 = 451;
    password_line.x2 = 1305;
    password_line.y2 = 451;
    password_line.lineWidth = 1.5;
    password_line.color ="saddlebrown";

    

  advTexture.addControl(username_text);                                         // add controls to texture
  advTexture.addControl(username_input);
  advTexture.addControl(password_text);
  advTexture.addControl(password_input);
  advTexture.addControl(login_button);
    advTexture.addControl(account_button);
    advTexture.addControl(username_line);
    advTexture.addControl(password_line);
  return scene;

};
