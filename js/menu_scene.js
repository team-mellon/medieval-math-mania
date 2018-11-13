var createMenu = function () {

  // This creates a basic Babylon Scene object (non-mesh)
  var scene = new BABYLON.Scene(engine);

  // This creates and positions a free camera (non-mesh)
  var camera = new BABYLON.Camera("menu cam",BABYLON.Vector3.Zero());

  // This attaches the camera to the canvas
  camera.attachControl(canvas, true);

  // GUI
  var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("ui1");

  var panel1 = new BABYLON.GUI.StackPanel();
  panel1.width = .5;
  panel1.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
  panel1.top = -50;
  advancedTexture.addControl(panel1);
  var button1 = BABYLON.GUI.Button.CreateSimpleButton("PLAYbut", "PLAY");
  button1.width = 100;
  button1.height = "40px";
  button1.color = "black";
  button1.background = "lightblue";
  button1.onPointerUpObservable.add(function() {
     engine.runRenderLoop(function(){
      game_scene.render();
    });
  });
  panel1.addControl(button1);

  var panel2 = new BABYLON.GUI.StackPanel();
  panel2.width = .5;
  panel2.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
  panel2.top = 0;
  advancedTexture.addControl(panel2);
  var button2 = BABYLON.GUI.Button.CreateSimpleButton("STATSbut", "STATS");
  button2.width = 100;
  button2.height = "40px";
  button2.color = "black";
  button2.background = "lightblue";
  button2.onPointerUpObservable.add(function() {
    button2.background = "blue";
  });
  panel2.addControl(button2);

  var panel3 = new BABYLON.GUI.StackPanel();
  panel3.width = .5;
  panel3.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
  panel3.top = 100;
  advancedTexture.addControl(panel3);
  var button3 = BABYLON.GUI.Button.CreateSimpleButton("SETTINGSbut", "SETTINGS");
  button3.width = 100;
  button3.height = "40px";
  button3.color = "black";
  button3.background = "lightblue";
  button3.onPointerUpObservable.add(function() {
    button3.background = "blue";
  });
  panel3.addControl(button3);

  var panel4 = new BABYLON.GUI.StackPanel();
  panel4.width = .5;
  panel4.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
  panel4.top = 50;
  advancedTexture.addControl(panel4);
  var button4 = BABYLON.GUI.Button.CreateSimpleButton("HOW2but", "HOW TO PLAY");
  button4.width = 100;
  button4.height = "40px";
  button4.color = "black";
  button4.background = "lightblue";
  button4.onPointerUpObservable.add(function() {
    button4.background = "blue";
  });
  panel4.addControl(button4);

  var panel5 = new BABYLON.GUI.StackPanel();
  panel5.width = .2;
  panel5.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
  panel5.top = -250;
  advancedTexture.addControl(panel5);
  var button5 = BABYLON.GUI.Button.CreateSimpleButton("LOGOUTbut", "LOGOUT");
  button5.width = 100;
  button5.height = "40px";
  button5.color = "black";
  button5.background = "lightblue";
  button5.onPointerUpObservable.add(function() {
    engine.runRenderLoop(function()
    {
      login_scene.render();
    });
  });
  panel5.addControl(button5);

  var panel6 = new BABYLON.GUI.StackPanel();
  panel6.width = .2;
  panel6.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
  panel6.top = -250;
  advancedTexture.addControl(panel6);
  var button6 = BABYLON.GUI.Button.CreateSimpleButton("NAMEbut", "USERNAME");
  button6.width = 100;
  button6.height = "40px";
  button6.color = "black";
  button6.background = "lightblue";
  button6.onPointerUpObservable.add(function() {
    button6.background = "blue";
  });
  panel6.addControl(button6);

  var background = new BABYLON.Layer("back", "hit-target-castle-concept-high-res.png", scene);
  background.isBackground = true;

  return scene;

};
