  var h2p_text = new BABYLON.GUI.TextBlock();
  h2p_text.top = "-140px";
  h2p_text.left = "-43px";
  h2p_text.height = "43px";
  h2p_text.color = "saddlebrown";
  h2p_text.fontFamily = "Blackadder ITC";
  h2p_text.fontStyle = "italic";
  h2p_text.fontSize = 35;
  h2p_text.text = "Its just math..";
  h2p_text.isEnabled = enable;

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
