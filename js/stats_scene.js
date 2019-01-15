var stats1_text;
var stats2_text;
var menu_button;

function createStats(scene, camera, advTexture, message, database) {                       // function that returns the menu scene

  var background = new BABYLON.Layer("bg", "res/login.png", scene, true);        // background layer

  var enable = true;

  var key = message.current_user;

  stats1_text = createStatsTextBlock("-43px", "-140px", "43px", "100px", "Hits: " + database["stats"][key]["hits"], enable);
  stats2_text = createStatsTextBlock("-45px", "-65px", "43px", "100px", "Misses: " + database["stats"][key]["misses"], enable);
  menu_button = createStatsButton("Menu", "res/login-button.png", "-750px", "350px", "90px", "290px", enable, function() {
		message.render = 1;
	});

  advTexture.addControl(stats1_text);
  advTexture.addControl(stats2_text);
	advTexture.addControl(menu_button);

  return scene;

};

function destroyStats() {

  stats1_text.dispose();
  stats2_text.dispose();
  menu_button.dispose();

}

function createStatsTextBlock(x, y, h, w, txt, e) {

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

function createStatsButton(txt, url, x, y, h, w, e, func) {

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
