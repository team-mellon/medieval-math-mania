  var username = "";
  var password = "";

  var username_text = createTextBlock("-265px", "-110px", "55px", "250px", "saddlebrown", 55, "italic", "Username:", 1, enable);
  var username_input = createInputText("95px", "-105px", "45px", "500px", "black", "lightyellow", "white", 0, enable, function() {
    if (username_input.currentKey != "Delete" || username_input.currentKey != "Backspace") {
      username = username_input.text;
    }
  });
  var username_line = createLine(805, 370, 1305, 370, 1.5, "saddlebrown");

  var password_text = createTextBlock("-270px", "-25px", "55px", "250px", "saddlebrown", 55, "italic", "Password:", 1, enable);
  var password_input = createInputPassword("95px", "-25px", "45px", "500px", "black", "lightyellow", "white", 0, enable, function() {
    if (password_input.currentKey != "Delete" || password_input.currentKey != "Backspace") {
      password = password_input.text;
    }
  });
  var password_line = createLine(805, 451, 1305, 451, 1.5, "saddlebrown");

  var login_error = createTextBlock("0px", "200px", "200px", "600px", "darkred", 30, "normal", "Username and/or Password did not match.\n Please try again.", 0, enable);

  var login_button = createButton("Login", "res/login-button.png", "-130px", "90px", "60px", "200px", "gold", "italic", 26, 0, enable, function() {
    var key = username_input.text;
  	if(key in database.users) {
	    if(database["users"][key]["password"] == password_input.text) {
    		username_input.text = "";
    		password_input.text = "";
    		login_error.alpha = 0;
    		message.render = 1;
    		message.current_user = key;
	    } else {
    		username_input.text = "";
    		password_input.text = "";
    		login_error.alpha = 1;
	    }
  	}	else {
	    username_input.text = "";
	    password_input.text = "";
	    login_error.alpha = 1;
  	}
  });

  var account_button = createButton("Create_Account", "res/login-button.png", "130px", "90px", "60px", "200px", "gold", "italic", 26, 0, enable, function() {
    username_input.text = "";
    password_input.text = "";
    login_error.alpha = 0;
    message.render = 7;
  });

  var mute_button = createButton("", "res/lute.png", "875px", "350px", "110px", "110px", "gold", "italic", 36, 0, enable, function() {
    message.music_pause = !message.music_pause;
    console.log(message.music_pause);
  });

  // var lute = BABYLON.GUI.Button.CreateImageWithCenterTextButton("lute_butt", "", "res/lute.png");
  // lute.height = "110px";
  // lute.width = "110px";
  // lute.fontFamily = "Blackadder ITC";
  // lute.fontStyle = "italic";
  // lute.fontSize = 36;
  // lute.color = "gold";
  // lute.thickness = 0;
  // lute.top = "350px";
  // lute.left = "875px";
  // // lute.left = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
  // lute.onPointerClickObservable.add(function() {
  //   message.music_pause = !message.music_pause;
  //   console.log(message.music_pause);
  // });
