// Creating and staging assets

function createImage(location, width, height, x_lock, x_location, y_lock, y_location, type) {

  var image = new createjs.Bitmap(location);
	stage.addChild(image);
  image.regX = width/2;
  image.regY = height/2;

  var entity_object = {
    object: image,
    width: width,
    height: height,
    x_lock: x_lock,
    x_location: x_location,
    y_lock: y_lock,
    y_location: y_location,
    type: type
  };

  ecs.push(entity_object);

  return image;

}

function createSprite(animation, width, height, x_lock, x_location, y_lock, y_location, type) {

  var spriteSheet = new createjs.SpriteSheet(animation);
  var sprite = new createjs.Sprite(spriteSheet);
  stage.addChild(sprite);
  sprite.regX = width/2;
  sprite.regY = height/2;

  var entity_object = {
    object: sprite,
    width: width,
    height: height,
    x_lock: x_lock,
    x_location: x_location,
    y_lock: y_lock,
    y_location: y_location,
    type: type
  };

  ecs.push(entity_object);

  return sprite;

}

function createLevelSprite(animation, width, height, x_lock, x_location, y_lock, y_location, type) {

  var spriteSheet = new createjs.SpriteSheet(animation);
  var sprite = new createjs.Sprite(spriteSheet);
  stage.addChild(sprite);
  sprite.regX = width/2;
  sprite.regY = height/2;

  var entity_object = {
    object: sprite,
    width: width,
    height: height,
    x_lock: x_lock,
    x_location: x_location,
    y_lock: y_lock,
    y_location: y_location,
    type: type
  };

  lcs.push(entity_object);

  return sprite;

}

function createButton(location, text, width, height, x_lock, x_location, y_lock, y_location, type, handleClick) {

  var image = new createjs.Bitmap(location);
  image.regX = width/2;
  image.regY = height/2;

  var color = "#DAA520";
  var size = "24";
  var font = "Blackadder";

  if (
    text == "Login" || text == "Signup" ||
    text == "Create" || text == "Cancel"
  ) {
    color = "#646464";
  }

  if (text == "Select a level") {
    size = "60";
    font = "Oldstyle";
  }

  if (
    text == "1" ||
    text == "2" ||
    text == "3" ||
    text == "4" ||
    text == "5" ||
    text == "6" ||
    text == "7" ||
    text == "8" ||
    text == "9" ||
    text == "10" ||
    text == "11" ||
    text == "12" ||
    text == "13" ||
    text == "14" ||
    text == "15" ||
    text == "16" ||
    text == "17" ||
    text == "18" ||
    text == "19" ||
    text == "20"
  ) {
    size = "16";
    font = "Oldstyle";
    color = "#FFFFFF"
  }

  var label = new createjs.Text(text, "normal " + size + "px " + font, color);
  // label.name = "label";
  label.textAlign = "center";
  label.textBaseline = "middle";
  // label.x = 216/2;
  // label.y = 72/2;

  var button = new createjs.Container();
  // button.name = "button";
  // button.x = 50;
  // button.y = 25;
  button.addChild(image, label);
  stage.addChild(button);

  // image.on("click", handleClick);
  // label.on("click", handleClick);
  button.on("click", handleClick);

  var entity_object = {
    object: button,
    width: width,
    height: height,
    x_lock: x_lock,
    x_location: x_location,
    y_lock: y_lock,
    y_location: y_location,
    type: type
  };

  ecs.push(entity_object);

  return button;

}

function createText(num, font, size, style, color, width, height, x_lock, x_location, y_lock, y_location, type) {

  var text = new createjs.Text(num, style + " " + size + " " + font, color);
	stage.addChild(text);
  text.regX = width/2;
  text.regY = height/2;

  var entity_object = {
    object: text,
    width: width,
    height: height,
    x_lock: x_lock,
    x_location: x_location,
    y_lock: y_lock,
    y_location: y_location,
    type: type
  };

  ecs.push(entity_object);

  return text;

}

function createLevelText(num, font, size, style, color, width, height, x_lock, x_location, y_lock, y_location, type) {

  var text = new createjs.Text(num, style + " " + size + " " + font, color);
	stage.addChild(text);
  text.regX = width/2;
  text.regY = height/2;

  var entity_object = {
    object: text,
    width: width,
    height: height,
    x_lock: x_lock,
    x_location: x_location,
    y_lock: y_lock,
    y_location: y_location,
    type: type
  };

  lcs.push(entity_object);

  return text;

}

function createTextContainer(location, text, font, size, style, color, width, height, x_lock, x_location, y_lock, y_location, type) { // }, handleClick) {

  var image = new createjs.Bitmap(location);
  image.regX = width/2;
  image.regY = height/2;

  var text = new createjs.Text(num, style + " " + size + " " + font, color);
  text.textAlign = "center";
  text.textBaseline = "middle";

  var container = new createjs.Container();
  button.addChild(image, text);
  stage.addChild(button);

  // button.on("click", handleClick);

  var entity_object = {
    object: container,
    width: width,
    height: height,
    x_lock: x_lock,
    x_location: x_location,
    y_lock: y_lock,
    y_location: y_location,
    type: type
  };

  ecs.push(entity_object);

  return text;

}

function createLevelTextContainer(animation, words, font, size, style, color, width, height, x_lock, x_location, y_lock, y_location, type, reg) { // }, handleClick) {

  var spriteSheet = new createjs.SpriteSheet(animation);
  var sprite = new createjs.Sprite(spriteSheet);
  sprite.regX = width/2;
  sprite.regY = height/2;

  var text = new createjs.Text(words, style + " " + size + " " + font, color);
  text.textAlign = "center";
  text.textBaseline = "middle";
  text.regY = reg / 2;

  var container = new createjs.Container();
  container.addChild(sprite, text);
  stage.addChild(container);

  // button.on("click", handleClick);

  var entity_object = {
    object: container,
    width: width,
    height: height,
    x_lock: x_lock,
    x_location: x_location,
    y_lock: y_lock,
    y_location: y_location,
    type: type
  };

  lcs.push(entity_object);

  return text;

}

// function createLine(x_one, y_one, x_two, y_two, wid, col) {
//
//   var line = new BABYLON.GUI.Line();
//
//   line.x1 = x_one;
//   line.y1 = y_one;
//   line.x2 = x_two;
//   line.y2 = y_two;
//   line.lineWidth = wid;
//   line.color = col;
//
//   return line;
//
// };
//
// function createTextBlock(x, y, h, w, c, sz, sty, txt, a, e) {
//
//   var text = new BABYLON.GUI.TextBlock();
//
//   text.left = x;
//   text.top = y;
//   text.height = h;
//   // text.width = w;
//   text.color = c;
//   text.fontFamily = "Blackadder ITC";
//   // text.fontFamily = fm;
//   text.fontSize = sz;
//   text.fontStyle = sty;
//   text.text = txt;
//   text.alpha = a;
//   text.isEnabled = e;
//
//   return text;
//
// };
//
// function createInputText(x, y, h, w, c, bg, fbg, th, e, func) {
//
//   var input = new BABYLON.GUI.InputText();
//
//   input.left = x;
//   input.top = y;
//   input.height = h;
//   input.width = w;
//   input.maxWidth = 0.15;
//   input.color = c;
//   input.background = bg;
//   input.focusedBackground = fbg;
//   // input.fontFamily = "Blackadder ITC";
//   // input.fontFamily = fm;
//   input.thickness = th;
//   input.isEnabled = e;
//   input.onTextChangedObservable.add(func);
//
//   return input;
//
// };
//
// function createInputPassword(x, y, h, w, c, bg, fbg, th, e, func) {
//
//   var input = new BABYLON.GUI.InputPassword();
//
//   input.left = x;
//   input.top = y;
//   input.height = h;
//   input.width = w;
//   input.maxWidth = 0.15;
//   input.color = c;
//   input.background = bg;
//   input.focusedBackground = fbg;
//   // input.fontFamily = "Blackadder ITC";
//   // input.fontFamily = fm;
//   input.thickness = th;
//   input.isEnabled = e;
//   input.onTextChangedObservable.add(func);
//
//   return input;
//
// };
//
// function createSlider(x, y, h, w, e, func) {
//
//   var input = new BABYLON.GUI.Slider();
//
//   input.left = x;
//   input.top = y;
//   input.height = h;
//   input.width = w;
//   input.minimum = 0;
//   input.maximum = 1;
//   input.value = 1;
//   input.isEnabled = e;
//   input.onValueChangedObservable.add(func);
//
//   return input;
//
// };
//
// function createCheckbox(x, y, h, w, e, func) {
//
//   var input = new BABYLON.GUI.Checkbox();
//
//   input.left = x;
//   input.top = y;
//   input.height = h;
//   input.width = w;
//   input.color = "black";
//   // input.color = c;
//   input.isChecked = true;
//   // input.isChecked = d;
//   input.isEnabled = e;
//   input.onIsCheckedChangedObservable.add(func);
//
//   return input;
//
// };
