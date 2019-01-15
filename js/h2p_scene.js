var h2p_text;
var menu_button;

function createHow2Play(scene, camera, advTexture, message, database) {         // function that returns the how to play scene

  var background = new BABYLON.Layer("bg", "res/login.png", scene, true);       // background layer

  var enable = true;

  h2p_text = createHow2PlayTextBlock("-43px", "-140px", "43px", "100px", "Its just math..", enable);
  menu_button = createHow2PlayButton("Menu", "res/login-button.png", "-750px", "350px", "90px", "290px", enable, function() {
		message.render = 1;
	});

  advTexture.addControl(h2p_text);
	advTexture.addControl(menu_button);

  return scene;

};

function destroyHow2Play() {

  h2p_text.dispose();
  menu_button.dispose();

}

function createHow2PlayTextBlock(x, y, h, w, txt, e) {

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

function createHow2PlayButton(txt, url, x, y, h, w, e, func) {

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
