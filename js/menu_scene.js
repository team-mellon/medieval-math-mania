function createMenu(engine, canvas, message, database) {                        // function that returns the menu scene

  var scene = new BABYLON.Scene(engine);                                        // create the scene

  var camera = new BABYLON.UniversalCamera(
    "menu_cam",
    new BABYLON.Vector3(0, 0, -10),
    scene);                                                                     // creates camera pointed at the scene
  camera.setTarget(BABYLON.Vector3.Zero());                                     // targets the camera to scene origin
  camera.attachControl(canvas, true);                                           // attaches the camera to the canvas

  var background = new BABYLON.Layer("bg", "res/menu.png", scene, true);        // background layer
  
  //music
  var music = new BABYLON.Sound("achaidh_cheide", "res/music/achaidh_cheide.wav", scene, null, { loop: true, autoplay: true });
  
  // GUI
  var advTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI"); // AdvancedDynamicTexture for the controls of the gui
  advTexture.idealWidth = 1920;                                                 // Ideal screen width for the UI to scale to
  advTexture.idealHeight = 1080;                                                // Ideal screen height for the UI to scale to
  var enable = true;                                                            // render enable bit for the ADT controls

  var panel1 = new BABYLON.GUI.StackPanel();
  panel1.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
  panel1.top = -200;
  advTexture.addControl(panel1);
  var game_button = BABYLON.GUI.Button.CreateImageWithCenterTextButton("game_button", "Play", "res/menu-button.png");
  game_button.height = "90px";
  game_button.width = "290px";
  game_button.fontFamily = "Blackadder ITC";
  game_button.fontStyle = "italic";
  game_button.fontSize = 36;
  game_button.color = "gold";
  game_button.thickness = 0;
  game_button.onPointerUpObservable.add(function() {
     message.render = 2;
     // advTexture.dispose();
  });
  game_button.isEnabled = enable;

  var panel2 = new BABYLON.GUI.StackPanel();
  panel2.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
  panel2.top = -100;
  advTexture.addControl(panel2);
  var stats_button = BABYLON.GUI.Button.CreateImageWithCenterTextButton("stats_button", "Stats", "res/menu-button.png");
  stats_button.height = "90px";
  stats_button.width = "290px";
  stats_button.fontFamily = "Blackadder ITC";
  stats_button.fontStyle = "italic";
  stats_button.fontSize = 36;
  stats_button.color = "gold";
  stats_button.thickness = 0;
  stats_button.onPointerUpObservable.add(function() {
    message.render = 3;
    // advTexture.dispose();
  });
  stats_button.isEnabled = enable;

  var panel3 = new BABYLON.GUI.StackPanel();
  panel3.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
  panel3.top = 0;
  advTexture.addControl(panel3);
  var h2p_button = BABYLON.GUI.Button.CreateImageWithCenterTextButton("h2p_button", "How to Play", "res/menu-button.png");
  h2p_button.height = "90px";
  h2p_button.width = "290px";
  h2p_button.fontFamily = "Blackadder ITC";
  h2p_button.fontStyle = "italic";
  h2p_button.fontSize = 36;
  h2p_button.color = "gold";
  h2p_button.thickness = 0;
  h2p_button.onPointerUpObservable.add(function() {
    message.render = 4;
    // advTexture.dispose();
  });
  h2p_button.isEnabled = enable;

  var panel4 = new BABYLON.GUI.StackPanel();
  panel4.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
  panel4.top = 100;
  advTexture.addControl(panel4);
  var settings_button = BABYLON.GUI.Button.CreateImageWithCenterTextButton("settings_button", "Settings", "res/menu-button.png");
  settings_button.height = "90px";
  settings_button.width = "290px";
  settings_button.fontFamily = "Blackadder ITC";
  settings_button.fontStyle = "italic";
  settings_button.fontSize = 36;
  settings_button.color = "gold";
  settings_button.thickness = 0;
  settings_button.onPointerUpObservable.add(function() {
    message.render = 5;
    // advTexture.dispose();
  });
  settings_button.isEnabled = enable;

  var panel5 = new BABYLON.GUI.StackPanel();
  panel5.width = .2;
  panel5.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
  panel5.top = -350;
  advTexture.addControl(panel5);
  var logout_button = BABYLON.GUI.Button.CreateImageWithCenterTextButton("logout_button", "Logout", "res/menu-button.png");
  logout_button.height = "90px";
  logout_button.width = "290px";
  logout_button.fontFamily = "Blackadder ITC";
  logout_button.fontStyle = "italic";
  logout_button.fontSize = 36;
  logout_button.color = "gold";
  logout_button.thickness = 0;
  logout_button.onPointerUpObservable.add( function() {
    message.render = 0;
    // advTexture.dispose();
  });
  logout_button.isEnabled = enable;

  var panel6 = new BABYLON.GUI.StackPanel();
  panel6.width = .2;
  panel6.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
  panel6.top = -350;
  advTexture.addControl(panel6);
  var account_button = BABYLON.GUI.Button.CreateImageWithCenterTextButton("account_button", "Account", "res/menu-button.png");
  account_button.height = "90px";
  account_button.width = "290px";
  account_button.fontFamily = "Blackadder ITC";
  account_button.fontStyle = "italic";
  account_button.fontSize = 36;
  account_button.color = "gold";
  account_button.thickness = 0;
  account_button.onPointerUpObservable.add( function() {
    message.render = 6;
    // advTexture.dispose();
  });
  account_button.isEnabled = enable;

  panel1.addControl(game_button);
  panel2.addControl(stats_button);
  panel3.addControl(h2p_button);
  panel4.addControl(settings_button);
  panel5.addControl(logout_button);
  panel6.addControl(account_button);

  return scene;

};
