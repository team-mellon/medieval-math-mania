function createLine(x_one, y_one, x_two, y_two, wid, col) {

  var line = new BABYLON.GUI.Line();

  line.x1 = x_one;
  line.y1 = y_one;
  line.x2 = x_two;
  line.y2 = y_two;
  line.lineWidth = wid;
  line.color = col;

  return line;

};

function createTextBlock(x, y, h, w, c, sz, sty, txt, a, e) {

  var text = new BABYLON.GUI.TextBlock();

  text.left = x;
  text.top = y;
  text.height = h;
  // text.width = w;
  text.color = c;
  text.fontFamily = "Blackadder ITC";
  // text.fontFamily = fm;
  text.fontSize = sz;
  text.fontStyle = sty;
  text.text = txt;
  text.alpha = a;
  text.isEnabled = e;

  return text;

};

function createInputText(x, y, h, w, c, bg, fbg, th, e, func) {

  var input = new BABYLON.GUI.InputText();

  input.left = x;
  input.top = y;
  input.height = h;
  input.width = w;
  input.maxWidth = 0.15;
  input.color = c;
  input.background = bg;
  input.focusedBackground = fbg;
  // input.fontFamily = "Blackadder ITC";
  // input.fontFamily = fm;
  input.thickness = th;
  input.isEnabled = e;
  input.onTextChangedObservable.add(func);

  return input;

};

function createInputPassword(x, y, h, w, c, bg, fbg, th, e, func) {

  var input = new BABYLON.GUI.InputPassword();

  input.left = x;
  input.top = y;
  input.height = h;
  input.width = w;
  input.maxWidth = 0.15;
  input.color = c;
  input.background = bg;
  input.focusedBackground = fbg;
  // input.fontFamily = "Blackadder ITC";
  // input.fontFamily = fm;
  input.thickness = th;
  input.isEnabled = e;
  input.onTextChangedObservable.add(func);

  return input;

};

function createSlider(x, y, h, w, e, func) {

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

function createCheckbox(x, y, h, w, e, func) {

  var input = new BABYLON.GUI.Checkbox();

  input.left = x;
  input.top = y;
  input.height = h;
  input.width = w;
  input.color = "black";
  // input.color = c;
  input.isChecked = true;
  // input.isChecked = d;
  input.isEnabled = e;
  input.onIsCheckedChangedObservable.add(func);

  return input;

};

function createButton(txt, url, x, y, h, w, c, sty, sz, th, e, func) {

  var button = BABYLON.GUI.Button.CreateImageWithCenterTextButton(txt + "_Button", txt, url);

  button.left = x;
  button.top = y;
  button.height = h;
  button.width = w;
  button.color = c;
  button.fontFamily = "Blackadder ITC";
  // button.fontFamily = fm;
  button.fontStyle = sty;
  button.fontSize = sz;
  button.thickness = th;
  button.isEnabled = e;
  button.onPointerClickObservable.add(func);

  return button;

}
