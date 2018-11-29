function createMenu(engine, canvas, message, database) {

  var onScene = false;

  // if (message.render == 1) {
    onScene = true;
  // }

  // This creates a basic Babylon Scene object (non-mesh)
  var scene = new BABYLON.Scene(engine);

  // This creates and positions a free camera (non-mesh)
  var camera = new BABYLON.Camera("menu cam",BABYLON.Vector3.Zero());

  // This attaches the camera to the canvas
  camera.attachControl(canvas, true);

  // GUI
  var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("ui1");

  var panel1 = new BABYLON.GUI.StackPanel();
  panel1.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
  panel1.top = -200;
  advancedTexture.addControl(panel1);
  var button1 = BABYLON.GUI.Button.CreateImageWithCenterTextButton("PLAYbut", "Play", "menu-button.png");
  button1.height = "90px";
  button1.width = "290px";
  button1.fontFamily = "Blackadder ITC";
  button1.fontStyle = "italic";
  button1.fontSize = 36;
  button1.color = "gold";
  button1.thickness = 0;
  button1.onPointerUpObservable.add(function() {
     message.render = 2;
     // advancedTexture.dispose();
  });
  button1.isEnabled = onScene;
  panel1.addControl(button1);

  var panel2 = new BABYLON.GUI.StackPanel();
  panel2.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
  panel2.top = -100;
  advancedTexture.addControl(panel2);
  var button2 = BABYLON.GUI.Button.CreateImageWithCenterTextButton("STATSbut", "Stats", "menu-button.png");
  button2.height = "90px";
  button2.width = "290px";
  button2.fontFamily = "Blackadder ITC";
  button2.fontStyle = "italic";
  button2.fontSize = 36;
  button2.color = "gold";
  button2.thickness = 0;
  button2.onPointerUpObservable.add(function() {
    message.render = 3;
    // advancedTexture.dispose();
  });
  button2.isEnabled = onScene;
  panel2.addControl(button2);

  var panel3 = new BABYLON.GUI.StackPanel();
  panel3.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
  panel3.top = 0;
  advancedTexture.addControl(panel3);
  var button3 = BABYLON.GUI.Button.CreateImageWithCenterTextButton("HOW2but", "How to Play", "menu-button.png");
  button3.height = "90px";
  button3.width = "290px";
  button3.fontFamily = "Blackadder ITC";
  button3.fontStyle = "italic";
  button3.fontSize = 36;
  button3.color = "gold";
  button3.thickness = 0;
  button3.onPointerUpObservable.add(function() {
    message.render = 4;
    // advancedTexture.dispose();
  });
  button3.isEnabled = onScene;
  panel3.addControl(button3);

  var panel4 = new BABYLON.GUI.StackPanel();
  panel4.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
  panel4.top = 100;
  advancedTexture.addControl(panel4);
  var button4 = BABYLON.GUI.Button.CreateImageWithCenterTextButton("SETTINGSbut", "Settings", "menu-button.png");
  button4.height = "90px";
  button4.width = "290px";
  button4.fontFamily = "Blackadder ITC";
  button4.fontStyle = "italic";
  button4.fontSize = 36;
  button4.color = "gold";
  button4.thickness = 0;
  button4.onPointerUpObservable.add(function() {
    message.render = 5;
    // advancedTexture.dispose();
  });
  button4.isEnabled = onScene;
  panel4.addControl(button4);

  var panel5 = new BABYLON.GUI.StackPanel();
  panel5.width = .2;
  panel5.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
  panel5.top = -300;
  advancedTexture.addControl(panel5);
  var button5 = BABYLON.GUI.Button.CreateImageWithCenterTextButton("LOGOUTbut", "Logout", "menu-button.png");
  button5.height = "90px";
  button5.width = "290px";
  button5.fontFamily = "Blackadder ITC";
  button5.fontStyle = "italic";
  button5.fontSize = 36;
  button5.color = "gold";
  button5.thickness = 0;
  button5.onPointerUpObservable.add(function() {
    message.render = 0;
    // advancedTexture.dispose();
  });
  button5.isEnabled = onScene;
  panel5.addControl(button5);

  var panel6 = new BABYLON.GUI.StackPanel();
  panel6.width = .2;
  panel6.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
  panel6.top = -300;
  advancedTexture.addControl(panel6);
  var button6 = BABYLON.GUI.Button.CreateImageWithCenterTextButton("NAMEbut", "Account", "menu-button.png");
  button6.height = "90px";
  button6.width = "290px";
  button6.fontFamily = "Blackadder ITC";
  button6.fontStyle = "italic";
  button6.fontSize = 36;
  button6.color = "gold";
  button6.thickness = 0;
  button6.onPointerUpObservable.add(function() {
    message.render = 6;
    // advancedTexture.dispose();
  });
  button6.isEnabled = onScene;
  panel6.addControl(button6);

  var background = new BABYLON.Layer("back", "menu.png", scene);
  background.isBackground = true;

  return scene;

};
