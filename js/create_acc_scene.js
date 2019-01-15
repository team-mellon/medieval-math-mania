var firstname_text;
var firstname_input;
var lastname_text;
var lastname_input;
var username_text;
var username_input;
var password_text;
var password_input
var re_password_text;
var re_password_input;
var password_error;
var fieldInput_error;
var submit_button;
var cancel_button;


function createCreateAcc(scene, camera, advTexture, message, database) {           //function that returns the create account scene

    var background = new BABYLON.Layer("bg", "res/login.png", scene, true);   //background layer

    var enable = true;            //render enable bit for the ADT controls

    firstname_text = createCreateAccTextBlock("-240px", "-217px", "48px", "300px", "black", "First Name", 28, "bold", 1, enable);
    firstname_input = createCreateAccInputText("-154px", "-167px", "40px", "300px", enable, function() {
      // if (username_input.currentKey != "Delete" || username_input.currentKey != "Backspace") {
      //   username = username_input.text;
      // }
    });
    lastname_text = createCreateAccTextBlock("114px", "-217px", "48px", "300px", "black", "Last Name", 28, "bold", 1, enable);
    lastname_input = createCreateAccInputText("200px", "-167px", "40px", "300px", enable, function() {
      // if (username_input.currentKey != "Delete" || username_input.currentKey != "Backspace") {
      //   username = username_input.text;
      // }
    });
    username_text = createCreateAccTextBlock("-200px", "-100px", "48px", "300px", "black", "Create User Name", 28, "bold", 1, enable);
    username_input = createCreateAccInputText("-154px", "-51px", "40px", "300px", enable, function() {
      // if (username_input.currentKey != "Delete" || username_input.currentKey != "Backspace") {
      //   username = username_input.text;
      // }
    });
    password_text = createCreateAccTextBlock("-205px", "0px", "48px", "300px", "black", "Create Password", 28, "bold", 1, enable);
    password_input = createCreateAccInputPassword("-154px", "49px", "40px", "300px", enable, function() {
      // if (username_input.currentKey != "Delete" || username_input.currentKey != "Backspace") {
      //   username = username_input.text;
      // }
    });
    re_password_text = createCreateAccTextBlock("167px", "0px", "48px", "300px", "black", "Re-Enter Password", 28, "bold", 1, enable);
    re_password_input = createCreateAccInputPassword("200px", "49px", "40px", "300px", enable, function() {
      // if (username_input.currentKey != "Delete" || username_input.currentKey != "Backspace") {
      //   username = username_input.text;
      // }
    });
    password_error = createCreateAccTextBlock("170px", "-70px", "150px", "600px", "darkred", "Passwords did not match.\n Please try again.", 32, "normal", 0, enable);
    fieldInput_error = createCreateAccTextBlock("170px", "-70px", "150px", "600px", "darkred", "Please fill-in\n every field", 32, "normal", 0, enable);
    submit_button = createCreateAccButton("Submit", "res/sword-button-left.png", "-120px", "150px", "70px", "290px", enable, function() {

    	if(firstname_input.text == "" || lastname_input.text == "" || username_input.text == "" || password_input.text == "" || re_password_input.text == "") {

    	    fieldInput_error.alpha = 1;
    	    firstname_input.text = "";
    	    lastname_input.text = "";
    	    username_input.text = "";
    	    password_input.text = "";
    	    re_password_input.text = "";

    	}	else {

  	    if(password_input.text != re_password_input.text) {

      		password_error.alpha = 1;
      		fieldInput_error.alpha = 0;
      		password_input.text = "";
      		re_password_input.text = "";

  	    } else {

      		var key = username_input.text;

      		database["stats"][key] = {
      		    hits: 0,
      		    misses: 0
      		};

      		database["users"][key] = {
      		    firstname: firstname_input.text,
      		    lastname: lastname_input.text,
      		    password: password_input.text
      		};

      		firstname_input.text = "";
      		lastname_input.text = "";
      		username_input.text = "";
      		password_input.text = "";
      		re_password_input.text = "";
      		fieldInput_error.alpha = 0;
      		password_error.alpha =0;
      		message.current_user = key;
          message.render = 0;

        }

      }

    });
    cancel_button = createCreateAccButton("Cancel", "res/sword-button-right.png", "180px", "150px", "70px", "290px", enable, function() {

    	firstname_input.text = "";
    	lastname_input.text = "";
    	username_input.text = "";
    	password_input.text = "";
    	re_password_input.text = "";
    	fieldInput_error.alpha = 0;
    	password_error.alpha = 0;
    	message.render = 0;

    });

    //adds control of all text blocks and input boxes to texture
    advTexture.addControl(firstname_text);
    advTexture.addControl(firstname_input);
    advTexture.addControl(lastname_text);
    advTexture.addControl(lastname_input);
    advTexture.addControl(username_text);
    advTexture.addControl(username_input);
    advTexture.addControl(password_text);
    advTexture.addControl(password_input);
    advTexture.addControl(re_password_text);
    advTexture.addControl(re_password_input);
    advTexture.addControl(password_error);
    advTexture.addControl(fieldInput_error);
    advTexture.addControl(submit_button);
    advTexture.addControl(cancel_button);

    return scene;
};

function destroyCreateAcc() {

  firstname_text.dispose();
  firstname_input.dispose();
  lastname_text.dispose();
  lastname_input.dispose();
  username_text.dispose();
  username_input.dispose();
  password_text.dispose();
  password_input.dispose();
  re_password_text.dispose();
  re_password_input.dispose();
  password_error.dispose();
  fieldInput_error.dispose();
  submit_button.dispose();
  cancel_button.dispose();

}

function createCreateAccLine(x_one, y_one, x_two, y_two, wid, col) {

  var line = new BABYLON.GUI.Line();

  line.x1 = x_one;
  line.y1 = y_one;
  line.x2 = x_two;
  line.y2 = y_two;
  line.lineWidth = wid;
  line.color = col;

  return line;

};

function createCreateAccTextBlock(x, y, h, w, c, txt, sz, sty, a, e) {

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

function createCreateAccInputText(x, y, h, w, e, func) {

  var input = new BABYLON.GUI.InputText();

  input.left = x;
  input.top = y;
  input.height = h;
  input.width = w;
  input.maxWidth = 0.15;
  input.color = "black";
  input.background = "white";
  input.focusedBackground = "white";
  // input.fontFamily = "Blackadder ITC";
  input.thickness = 1;
  input.isEnabled = e;
  input.onTextChangedObservable.add(func);

  return input;

};

function createCreateAccInputPassword(x, y, h, w, e, func) {

  var input = new BABYLON.GUI.InputPassword();

  input.left = x;
  input.top = y;
  input.height = h;
  input.width = w;
  input.maxWidth = 0.15;
  input.color = "black";
  input.background = "white";
  input.focusedBackground = "white";
  // input.fontFamily = "Blackadder ITC";
  input.thickness = 1;
  input.isEnabled = e;
  input.onTextChangedObservable.add(func);

  return input;

};

function createCreateAccButton(txt, url, x, y, h, w, e, func) {

  var button = BABYLON.GUI.Button.CreateImageWithCenterTextButton(txt + "_Button", txt, url);

  button.left = x;
  button.top = y;
  button.height = h;
  button.width = w;
  button.color = "firebrick";
  button.thickness = 0;
  button.fontFamily = "Blackadder ITC";
  button.fontStyle = "normal";
  button.fontSize = 25;
  button.isEnabled = e;
  button.onPointerClickObservable.add(func);

  return button;

}
