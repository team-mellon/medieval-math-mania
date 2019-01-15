var username_text;
var username_input;
var username_line;
var password_text;
var password_input;
var password_line;
var login_error;
var login_button;
var create_account_button;

function createLogin(scene, camera, advTexture, message, database) {

  var background = new BABYLON.Layer("bg", "res/login.png", scene, true);       // background layer

  var enable = true;                                                            // render enable bit for the ADT controls

  var username = "";
  var password = "";

  username_text = createLoginTextBlock("-265px", "-110px", "55px", "250px", "saddlebrown", "Username:", 55, "italic", 1, enable);
  username_input = createLoginInputText("95px", "-105px", "45px", "500px", enable, function() {
    if (username_input.currentKey != "Delete" || username_input.currentKey != "Backspace") {
      username = username_input.text;
    }
  });
  username_line = createLoginLine(805, 370, 1305, 370, 1.5, "saddlebrown");
  password_text = createLoginTextBlock("-270px", "-25px", "55px", "250px", "saddlebrown", "Password:", 55, "italic", 1, enable);
  password_input = createLoginInputPassword("95px", "-25px", "45px", "500px", enable, function() {
    if (password_input.currentKey != "Delete" || password_input.currentKey != "Backspace") {
      password = password_input.text;
    }
  });
  password_line = createLoginLine(805, 451, 1305, 451, 1.5, "saddlebrown");
  login_error = createLoginTextBlock("0px", "200px", "200px", "600px", "darkred", "Username and/or Password did not match.\n Please try again.", 30, "normal", 0, enable);
  login_button = createLoginButton("Login", "res/login-button.png", "-130px", "90px", "60px", "200px", enable, function() {
  	var key = username_input.text;
  	if( key in database.users) {
	    if(database["users"][key]["password"] == password_input.text) {
    		username_input.text = "";
    		password_input.text = "";
    		login_error.alpha = 0;
    		message.render = 1;
    		message.current_user = key;
	    }
	    else {
    		username_input.text = "";
    		password_input.text = "";
    		login_error.alpha = 1;
	    }
  	}
  	else {
	    username_input.text = "";
	    password_input.text = "";
	    login_error.alpha = 1;
  	}
  });
  create_account_button = createLoginButton("Create_Account", "res/login-button.png", "130px", "90px", "60px", "200px", enable, function() {
    username_input.text = "";
    password_input.text = "";
    login_error.alpha = 0;
    message.render = 7;
  });

  advTexture.addControl(username_text);                                         // add controls to texture
  advTexture.addControl(username_input);
  advTexture.addControl(username_line);
  advTexture.addControl(password_text);
  advTexture.addControl(password_input);
  advTexture.addControl(password_line);
  advTexture.addControl(login_error);
  advTexture.addControl(login_button);
  advTexture.addControl(create_account_button);

  return scene;

};

function destroyLogin() {

  username_text.dispose();                                         // add controls to texture
  username_input.dispose();
  username_line.dispose();
  password_text.dispose();
  password_input.dispose();
  password_line.dispose();
  login_error.dispose();
  login_button.dispose();
  create_account_button.dispose();

}

function createLoginLine(x_one, y_one, x_two, y_two, wid, col) {

  var line = new BABYLON.GUI.Line();

  line.x1 = x_one;
  line.y1 = y_one;
  line.x2 = x_two;
  line.y2 = y_two;
  line.lineWidth = wid;
  line.color = col;

  return line;

};

function createLoginTextBlock(x, y, h, w, c, txt, sz, sty, a, e) {

  var text = new BABYLON.GUI.TextBlock();

  text.left = x;
  text.top = y;
  text.height = h;
  text.color = c;
  text.fontFamily = "Blackadder ITC";
  text.fontStyle = sty;
  text.fontSize = sz;
  text.text = txt;
  text.alpha = a;
  text.isEnabled = e;

  return text;

};

function createLoginInputText(x, y, h, w, e, func) {

  var input = new BABYLON.GUI.InputText();

  input.left = x;
  input.top = y;
  input.height = h;
  input.width = w;
  input.maxWidth = 0.15;
  input.color = "black";
  input.background = "lightyellow";
  input.focusedBackground = "white";
  // input.fontFamily = "Blackadder ITC";
  input.thickness = 0;
  input.isEnabled = e;
  input.onTextChangedObservable.add(func);

  return input;

};

function createLoginInputPassword(x, y, h, w, e, func) {

  var input = new BABYLON.GUI.InputPassword();

  input.left = x;
  input.top = y;
  input.height = h;
  input.width = w;
  input.maxWidth = 0.15;
  input.color = "black";
  input.background = "lightyellow";
  input.focusedBackground = "white";
  // input.fontFamily = "Blackadder ITC";
  input.thickness = 0;
  input.isEnabled = e;
  input.onTextChangedObservable.add(func);

  return input;

};

function createLoginButton(txt, url, x, y, h, w, e, func) {

  var button = BABYLON.GUI.Button.CreateImageWithCenterTextButton(txt + "_Button", txt, url);

  button.left = x;
  button.top = y;
  button.height = h;
  button.width = w;
  button.color = "gold";
  button.thickness = 0;
  button.fontFamily = "Blackadder ITC";
  button.fontStyle = "italic";
  button.fontSize = 26;
  button.isEnabled = e;
  button.onPointerClickObservable.add(func);

  return button;

}
