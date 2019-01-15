var username_text;
var password_text;
var menu_button;

function createAccount(scene, camera, advTexture, message, database) {          // function that returns the account scene

  var background = new BABYLON.Layer("bg", "res/login.png", scene, true);       // background

  var enable = true;

  var key = message.current_user;

  username_text = createAccountTextBlock("-43px", "-140px", "43px", "100px", "Fullname: " + database["users"][key]["firstname"] + " " + database["users"][key]["lastname"], enable);
  password_text = createAccountTextBlock("-45px", "-65px", "43px", "100px", "Password: " + database["users"][key]["password"], enable);
  menu_button = createAccountButton("Menu", "res/login-button.png", "-750px", "350px", "90px", "290px", enable, function() {
		message.render = 1;
	});

  advTexture.addControl(username_text);
  advTexture.addControl(password_text);
	advTexture.addControl(menu_button);

  return scene;

};

function destroyAccount() {

  username_text.dispose();
  password_text.dispose();
  menu_button.dispose();

}

function createAccountTextBlock(x, y, h, w, txt, e) {

  var text = new BABYLON.GUI.TextBlock();

  text.left = x;
  text.top = y;
  text.height = h;
  text.color = "saddlebrown";
  text.fontFamily = "Blackadder ITC";
  text.fontStyle = "italic";
  text.fontSize = 35;
  text.text = txt;
  text.isEnabled = e;

  return text;

};

function createAccountButton(txt, url, x, y, h, w, e, func) {

  var button = BABYLON.GUI.Button.CreateImageWithCenterTextButton(txt + "_Button", txt, url);

  button.left = x;
  button.top = y;
  button.height = h;
  button.width = w;
  button.color = "gold";
  button.thickness = 0;
  button.fontFamily = "Blackadder ITC";
  button.fontStyle = "italic";
  button.fontSize = 36;
  button.isEnabled = e;
  button.onPointerClickObservable.add(func);

  return button;

}
