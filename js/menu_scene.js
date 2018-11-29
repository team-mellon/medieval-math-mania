function createMenu(engine, canvas, message, database) {                        // function that returns the menu scene

  var scene = new BABYLON.Scene(engine);                                        // create the scene

  var camera = new BABYLON.UniversalCamera(
    "menu_cam",
    new BABYLON.Vector3(0, 0, -10),
    scene);                                                                     // creates camera pointed at the scene
  camera.setTarget(BABYLON.Vector3.Zero());                                     // targets the camera to scene origin
  camera.attachControl(canvas, true);                                           // attaches the camera to the canvas

  var background = new BABYLON.Layer("bg", "res/menu.png", scene, true);        // background layer

  // GUI
  var advTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI"); // AdvancedDynamicTexture for the controls of the gui
  advTexture.idealWidth = 1920;                                                 // Ideal screen width for the UI to scale to
  advTexture.idealHeight = 1080;                                                // Ideal screen height for the UI to scale to
  var enable = true;                                                            // render enable bit for the ADT controls

  var panel1 = new BABYLON.GUI.StackPanel();
  panel1.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
  panel1.top = -200;
  advTexture.addControl(panel1);
  var button1 = BABYLON.GUI.Button.CreateImageWithCenterTextButton("PLAYbut", "Play", "res/menu-button.png");
  button1.height = "90px";
  button1.width = "290px";
  button1.fontFamily = "Blackadder ITC";
  button1.fontStyle = "italic";
  button1.fontSize = 36;
  button1.color = "gold";
  button1.thickness = 0;
  button1.onPointerUpObservable.add(function() {
     message.render = 2;
     // advTexture.dispose();
  });
  button1.isEnabled = enable;
  panel1.addControl(button1);

  var panel2 = new BABYLON.GUI.StackPanel();
  panel2.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
  panel2.top = -100;
  advTexture.addControl(panel2);
  var button2 = BABYLON.GUI.Button.CreateImageWithCenterTextButton("STATSbut", "Stats", "res/menu-button.png");
  button2.height = "90px";
  button2.width = "290px";
  button2.fontFamily = "Blackadder ITC";
  button2.fontStyle = "italic";
  button2.fontSize = 36;
  button2.color = "gold";
  button2.thickness = 0;
  button2.onPointerUpObservable.add(function() {
    message.render = 3;
    // advTexture.dispose();
  });
  button2.isEnabled = enable;
  panel2.addControl(button2);

  var panel3 = new BABYLON.GUI.StackPanel();
  panel3.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
  panel3.top = 0;
  advTexture.addControl(panel3);
  var button3 = BABYLON.GUI.Button.CreateImageWithCenterTextButton("HOW2but", "How to Play", "res/menu-button.png");
  button3.height = "90px";
  button3.width = "290px";
  button3.fontFamily = "Blackadder ITC";
  button3.fontStyle = "italic";
  button3.fontSize = 36;
  button3.color = "gold";
  button3.thickness = 0;
  button3.onPointerUpObservable.add(function() {
    message.render = 4;
    // advTexture.dispose();
  });
  button3.isEnabled = enable;
  panel3.addControl(button3);

  var panel4 = new BABYLON.GUI.StackPanel();
  panel4.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
  panel4.top = 100;
  advTexture.addControl(panel4);
  var button4 = BABYLON.GUI.Button.CreateImageWithCenterTextButton("SETTINGSbut", "Settings", "res/menu-button.png");
  button4.height = "90px";
  button4.width = "290px";
  button4.fontFamily = "Blackadder ITC";
  button4.fontStyle = "italic";
  button4.fontSize = 36;
  button4.color = "gold";
  button4.thickness = 0;
  button4.onPointerUpObservable.add(function() {
    message.render = 5;
    // advTexture.dispose();
  });
  button4.isEnabled = enable;
  panel4.addControl(button4);

  var panel5 = new BABYLON.GUI.StackPanel();
  panel5.width = .2;
  panel5.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
  panel5.top = -350;
  advTexture.addControl(panel5);
  var button5 = BABYLON.GUI.Button.CreateImageWithCenterTextButton("LOGOUTbut", "Logout", "res/menu-button.png");
  button5.height = "90px";
  button5.width = "290px";
  button5.fontFamily = "Blackadder ITC";
  button5.fontStyle = "italic";
  button5.fontSize = 36;
  button5.color = "gold";
  button5.thickness = 0;
  button5.onPointerUpObservable.add( function() {
    message.render = 0;
    // advTexture.dispose();
  });
  button5.isEnabled = enable;
  panel5.addControl(button5);

  var panel6 = new BABYLON.GUI.StackPanel();
  panel6.width = .2;
  panel6.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
  panel6.top = -350;
  advTexture.addControl(panel6);
  var button6 = BABYLON.GUI.Button.CreateImageWithCenterTextButton("NAMEbut", "Account", "res/menu-button.png");
  button6.height = "90px";
  button6.width = "290px";
  button6.fontFamily = "Blackadder ITC";
  button6.fontStyle = "italic";
  button6.fontSize = 36;
  button6.color = "gold";
  button6.thickness = 0;
  button6.onPointerUpObservable.add( function() {
    message.render = 6;
    // advTexture.dispose();
  });
  button6.isEnabled = enable;
  panel6.addControl(button6);

  return scene;

};
