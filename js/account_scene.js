  var key = message.current_user;

  var username_text = new BABYLON.GUI.TextBlock();
  username_text.top = "-140px";
  username_text.left = "-43px";
  username_text.height = "43px";
  username_text.color = "saddlebrown";
  username_text.fontFamily = "Blackadder ITC";
  username_text.fontStyle = "italic";
  username_text.fontSize = 35;
  username_text.text = "Fullname: " + database["users"][key]["firstname"] + " " + database["users"][key]["lastname"];
  username_text.isEnabled = enable;

  var password_text = new BABYLON.GUI.TextBlock();
  password_text.top = "-65px";
  password_text.left = "-45px";
  password_text.height = "43px";
  password_text.color = "saddlebrown";
  password_text.fontFamily = "Blackadder ITC";
  password_text.fontStyle = "italic";
  password_text.fontSize = 35;
    password_text.text = "Password: " + database["users"][key]["password"];
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
	});
