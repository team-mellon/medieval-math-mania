  var volume_text = new BABYLON.GUI.TextBlock();
  volume_text.top = "-140px";
  volume_text.left = "-43px";
  volume_text.height = "43px";
  volume_text.color = "saddlebrown";
  volume_text.fontFamily = "Blackadder ITC";
  volume_text.fontStyle = "italic";
  volume_text.fontSize = 35;
  volume_text.text = "Volume";
  volume_text.isEnabled = enable;

  var volume_input = new BABYLON.GUI.Slider();
  volume_input.top = "-110px";
  volume_input.height = "20px";
  volume_input.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
  volume_input.width = "200px";
  volume_input.minimum = 0;
  volume_input.maximum = 1;
  volume_input.value = 1;
  volume_input.onValueChangedObservable.add(function(value) {
    message.volume = value;
  });

  var time_text = new BABYLON.GUI.TextBlock();
  time_text.top = "-65px";
  time_text.left = "-45px";
  time_text.height = "43px";
  time_text.color = "saddlebrown";
  time_text.fontFamily = "Blackadder ITC";
  time_text.fontStyle = "italic";
  time_text.fontSize = 35;
  time_text.text = "Time?";
  time_text.isEnabled = enable;

  var time_input = new BABYLON.GUI.Checkbox();
  time_input.top = "-30px";
  time_input.width = "20px";
  time_input.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
  time_input.height = "20px";
  time_input.color = "black";
  time_input.isChecked = true;
  time_input.onIsCheckedChangedObservable.add(function(value) {
  });

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
