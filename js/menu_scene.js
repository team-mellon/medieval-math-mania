var game_button;
var stats_button;
var h2p_button;
var settings_button;
var logout_button;
var account_button;

function createMenu(scene, camera, advTexture, message, database) {                        // function that returns the menu scene

  var background = new BABYLON.Layer("bg", "res/menu.png", scene, true);        // background layer

  var enable = true;                                                            // render enable bit for the ADT controls

  game_button = createMenuButton("Play", "res/menu-button.png", "0px", "-200px", "90px", "290px", enable, function() {
		message.render = 2;
	});

  stats_button = createMenuButton("Stats", "res/menu-button.png", "0px", "-100px", "90px", "290px", enable, function() {
		message.render = 3;
	});

  h2p_button = createMenuButton("How to Play", "res/menu-button.png", "0px", "0px", "90px", "290px", enable, function() {
		message.render = 4;
	});

  settings_button = createMenuButton("Settings", "res/menu-button.png", "0px", "100px", "90px", "290px", enable, function() {
		message.render = 5;
	});

  logout_button = createMenuButton("Logout", "res/menu-button.png", "-750px", "-350px", "90px", "290px", enable, function() {
	  message.current_user = "";
		message.render = 0;
	});

  account_button = createMenuButton("Account", "res/menu-button.png", "750px", "-350px", "90px", "290px", enable, function() {
		message.render = 6;
	});

  advTexture.addControl(game_button);
  advTexture.addControl(stats_button);
  advTexture.addControl(h2p_button);
  advTexture.addControl(settings_button);
  advTexture.addControl(logout_button);
  advTexture.addControl(account_button);

  return scene;

};

function destroyMenu() {

  game_button.dispose();
  stats_button.dispose();
  h2p_button.dispose();
  settings_button.dispose();
  logout_button.dispose();
  account_button.dispose();

}

function createMenuButton(txt, url, x, y, h, w, e, func) {

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
