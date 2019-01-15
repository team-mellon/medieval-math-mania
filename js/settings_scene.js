var volume_text;
var volume_input;
var time_text;
var time_input;
var menu_button;

function createSettings(scene, camera, advTexture, message, database) {                    // function that returns the settings scene

  var background = new BABYLON.Layer("bg", "res/login.png", scene, true);       // background

  var enable = true;

  volume_text = createSettingsTextBlock("-43px", "-140px", "43px", "100px", "Volume", enable);
  volume_input = createSettingsSlider("0px", "-110px", "20px", "200px", enable, function(value) {
    message.volume = value;
  });
  time_text = createSettingsTextBlock("-45px", "-65px", "43px", "100px", "Time?", enable);
  time_input = createSettingsCheckbox("0px", "-30px", "20px", "20px", enable, function(value) {
  });
  menu_button = createSettingsButton("Menu", "res/login-button.png", "-750px", "350px", "90px", "290px", enable, function() {
    message.render = 1;
  });

  advTexture.addControl(volume_text);
  advTexture.addControl(volume_input);
  advTexture.addControl(time_text);
  advTexture.addControl(time_input);
	advTexture.addControl(menu_button);

  return scene;

};

function destroySettings() {

  volume_text.dispose();
  volume_input.dispose();
  time_text.dispose();
  time_input.dispose();
  menu_button.dispose();

}

function createSettingsTextBlock(x, y, h, w, txt, e) {

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

function createSettingsSlider(x, y, h, w, e, func) {

  var input = new BABYLON.GUI.Slider();

  input.left = x;
  input.top = y;
  input.height = h;
  input.width = w;
  input.minimum = 0;
  input.maximum = 1;
  input.value = 1;
  input.isEnabled = e;
  input.onValueChangedObservable.add(func);

  return input;

};

function createSettingsCheckbox(x, y, h, w, e, func) {

  var input = new BABYLON.GUI.Checkbox();

  input.left = x;
  input.top = y;
  input.height = h;
  input.width = w;
  input.color = "black";
  input.isChecked = true;
  input.isEnabled = e;
  input.onIsCheckedChangedObservable.add(func);

  return input;

};

function createSettingsButton(txt, url, x, y, h, w, e, func) {

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
