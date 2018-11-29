function createGame(engine, canvas, message, database) {                        // function that returns the game scene

  var scene = new BABYLON.Scene(engine);                                        // create the scene

  var camera = new BABYLON.UniversalCamera(
    "game_cam",
    new BABYLON.Vector3(0, 0, -10),
    scene);                                                                     // creates camera pointed at the scene
  camera.setTarget(BABYLON.Vector3.Zero());                                     // targets the camera to scene origin

  var background = new BABYLON.Layer("bg", "res/game.png", scene, true);        // background layer

  // GUI
  var advTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI"); // AdvancedDynamicTexture for the controls of the gui
  advTexture.idealWidth = 1920;                                                 // Ideal screen width for the UI to scale to
  advTexture.idealHeight = 1080;                                                // Ideal screen height for the UI to scale to
  var enable = true;                                                            // render enable bit for the ADT controls

	// var foreground = new BABYLON.Layer("fore", "hit-target-castle-facade-concept-high-res.png", scene);
	// foreground.isBackground = false;

	//><><><><><><><><><>< START OF NUMBER LINE CODE ><><><><><><><><><><

	var line = new BABYLON.GUI.Line();
	line.x1 = 100;
	line.y1 = 50;
	line.x2 = 1700;
	line.y2 = 50;
	line.lineWidth = 60;
	line.dash = [4,100];
	line.color = "black";
	advTexture.addControl(line);

	var line2 = new BABYLON.GUI.Line();
	line2.x1 = 100;
	line2.y1 = 50;
	line2.x2 = 1660;
	line2.y2 = 50;
	line2.lineWidth = 30;
	line2.dash = [2,50];
	line2.color = "black";
	advTexture.addControl(line2);

	var line3 = new BABYLON.GUI.Line();
	line3.x1 = 100;
	line3.y1 = 50;
	line3.x2 = 1660;
	line3.y2 = 50;
	line3.lineWidth = 3;
	//line3.dash = [2,50];
	line3.color = "black";
	advTexture.addControl(line3);

	var line4 = new BABYLON.GUI.Line();
	line4.x1 = 100;
	line4.y1 = 50;
	line4.x2 = 1660;
	line4.y2 = 50;
	line4.lineWidth = 10;
	line4.dash = [1,12];
	line4.color = "black";
	advTexture.addControl(line4);
				// ><><><><><><><><><>< END OF NUMBER LINE CODE ><><><><><><><><><><

	var text1 = new BABYLON.GUI.TextBlock();
	text1.color = "black";
	text1.height = "43px";
	text1.fontFamily = "Arial";
	text1.fontStyle = "bold";
	text1.fontSize = 35;
	text1.top = "100px";
	text1.left = "-40px";
	text1.zIndex = 1;
	advTexture.addControl(text1);

	var text2 = new BABYLON.GUI.TextBlock();
	text2.text = " x  ";
	text2.color = "black";
	text2.height = "43px";
	text2.fontFamily = "Arial";
	text2.fontStyle = "bold";
	text2.fontSize = 35;
	text2.zIndex = 1;
	text2.top = "100px";
	text2.left = "-100px";
	advTexture.addControl(text2);

	// Equals sign
	var text3 = new BABYLON.GUI.TextBlock();
	text3.text = " = ";
	text3.color = "black";
	text3.height = "43px";
	text3.fontFamily = "Arial";
	text3.fontStyle = "bold";
	text3.fontSize = 35;
	text1.zIndex = 1;
	text3.top = "105px";
	text3.left = "30px";
	advTexture.addControl(text3);

	// Answer numbers
	var output = new BABYLON.GUI.TextBlock();
	output.width = "180px";
	output.maxWidth = 0.15;
	output.height = "43px";
	output.color = "black";
	output.fontFamily = "Arial";
	output.thickness = 0.15;
	output.fontSize = 35;
	output.fontStyle = "bold";
	output.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
	output.top = "100px";
	output.left = "90px";
	output.zIndex = 1;
	advTexture.addControl(output);

	// Range text
	var text4 = new BABYLON.GUI.TextBlock();
	text4.text = "Range";
	text4.color = "black";
	text4.height = "70px";
	text4.width = "150px";
	text4.fontFamily = "Arial";
	text4.fontStyle = "bold";
	text4.fontSize = 45;
	text4.top = "79px";
	text4.left = "-340px";
	text4.zIndex = 1;
	advTexture.addControl(text4);

var hitmarker_l = new BABYLON.GUI.TextBlock("lo", "Low");
hitmarker_l.width = "200px";
hitmarker_l.height = "100px";
hitmarker_l.left = "-500px";
hitmarker_l.top = "-345px";
hitmarker_l.color = "red";
hitmarker_l.fontSize = 60;
hitmarker_l.alpha = 0;
advTexture.addControl(hitmarker_l);

var hitmarker_h = new BABYLON.GUI.TextBlock("hi", "High");
hitmarker_h.width = "200px";
hitmarker_h.height = "100px";
hitmarker_h.left = "500px";
hitmarker_h.top = "-345px";
hitmarker_h.color = "red";
hitmarker_h.fontSize = 60;
hitmarker_h.alpha = 0;
advTexture.addControl(hitmarker_h);

var hitmarker_t = new BABYLON.GUI.TextBlock("tar", "Hit");
hitmarker_t.width = "200px";
hitmarker_t.height = "100px";
hitmarker_t.left = "0px";
hitmarker_t.top = "-345px";
hitmarker_t.color = "green";
hitmarker_t.fontSize = 60;
hitmarker_t.alpha = 0;
advTexture.addControl(hitmarker_t);

	// Range numbers
	var range = new BABYLON.GUI.TextBlock();
	range.text = "[]";
	range.color = "black";
	range.height = "70px";
	range.width = "190px";
	range.fontFamily = "Arial";
	range.fontStyle = "bold";
	range.fontSize = 35;
	range.top = "130px";
	range.left = "-345px";
	range.zIndex = 1;
	advTexture.addControl(range);

	var param = "";
	var rand_num1;
	var rand_num2;
	var temp1;
	var temp2;
	var input;
	var result;

	var spriteManagerBadKnight = new BABYLON.SpriteManager("spriteManagerBadKnight", "res/bad-knight.png", 1, {width: 320, height: 320}, scene);
	var spriteManagerBadArcher = new BABYLON.SpriteManager("spriteManagerBadArcher", "res/bad-archer.png", 4, {width: 320, height: 320}, scene);
	var spriteManagerFire = new BABYLON.SpriteManager("spriteManagerFire", "res/ammo.png", 20, {width: 320, height: 320}, scene);
	var spriteManagerCatapult = new BABYLON.SpriteManager("spriteManagerCatapult", "res/catapult.png", 1, {width: 2560, height: 1280}, scene);

	var badKnight1 = new BABYLON.Sprite("badKnight1", spriteManagerBadKnight);
	var badArcher1 = new BABYLON.Sprite("badArcher1", spriteManagerBadArcher);
	var badArcher2 = new BABYLON.Sprite("badArcher2", spriteManagerBadArcher);
	var badArcher3 = new BABYLON.Sprite("badArcher3", spriteManagerBadArcher);
	var badArcher4 = new BABYLON.Sprite("badArcher4", spriteManagerBadArcher);
	var fire1 = new BABYLON.Sprite("fire1", spriteManagerFire);
	var catapult1 = new BABYLON.Sprite("catapult1", spriteManagerCatapult);
	// var fire2 = new BABYLON.Sprite("fire2", spriteManagerFire);
	// var fire3 = new BABYLON.Sprite("fire3", spriteManagerFire);
	// var fire4 = new BABYLON.Sprite("fire4", spriteManagerFire);
	// var fire5 = new BABYLON.Sprite("fire5", spriteManagerFire);

	catapult1.position.x = 0.0;
	catapult1.position.y = -2.275;
	catapult1.width = 8.0;
	catapult1.height =  4.0;

	badKnight1.position.x =  0.02;
	badKnight1.position.y =  0.175;
	badArcher1.position.x = -4.25;
	badArcher1.position.y =  0.02;
	badArcher2.position.x =  4.25;
	badArcher2.position.y =  0.02;
	badArcher3.position.x = -8.0;
	badArcher3.position.y = -0.1;
	badArcher4.position.x =  8.0;
	badArcher4.position.y = -0.1;
	fire1.position.x = 0.0;
	fire1.position.y = -3.6;
	badKnight1.position.y =  0.175;
	badArcher1.position.x = -4.25;
	badArcher1.position.y =  0.02;
	badArcher2.position.x =  4.25;
	badArcher2.position.y =  0.02;
	badArcher3.position.x = -8.0;
	badArcher3.position.y = -0.1;
	badArcher4.position.x =  8.0;
	badArcher4.position.y = -0.1;
	// fire1.position.x =  0.0;
	// fire1.position.y = 1.0;
	// fire2.position.x = -4.25;
	// fire2.position.y = 0.8;
	// fire3.position.x =  4.25;
	// fire3.position.y = 0.8;
	// fire4.position.x = -8.0;
	// fire4.position.y = 0.6;
	// fire5.position.x =  8.0;
	// fire5.position.y = 0.6;

	badKnight1.playAnimation(0, 11, true, 200);
	badArcher1.playAnimation(0, 11, true, 200);
	badArcher2.playAnimation(0, 11, true, 200);
	badArcher3.playAnimation(0, 11, true, 200);
	badArcher4.playAnimation(0, 11, true, 200);
	fire1.playAnimation(0, 11, true, 200);
	// fire2.playAnimation(0, 11, true, 200);
	// fire3.playAnimation(0, 11, true, 200);
	// fire4.playAnimation(0, 11, true, 200);
	// fire5.playAnimation(0, 11, true, 200);

	// for (var i = 0; i < 20; i++) {
	//   var fire = new BABYLON.Sprite("fire", spriteManagerFire);
	//   fire.position.x = Math.random() * 10 - 5;
	//   fire.position.y = 0.2;
	//   fire.playAnimation(0, 11, true, 200);
	//   // tree.isPickable = true;
	// }

	scene.actionManager = new BABYLON.ActionManager(scene);
	action = new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyUpTrigger, function(event) {

		var key = event.sourceEvent.key;
		console.log(key) ;

		if (key == "Enter") {
			result = rand_num1 * input;

			if (result < temp1) {
				hitmarker_l.alpha = 1;
				setTimeout(function(){hitmarker_l.alpha = 0}, 2000);
			}	else if (result > temp2) {
				hitmarker_h.alpha = 1;
				setTimeout(function(){hitmarker_h.alpha = 0}, 2000);
			}	else {
				hitmarker_t.alpha = 1;
				setTimeout(function(){hitmarker_t.alpha = 0}, 2000);
			}

			output.text = result.toString();
			catapult1.playAnimation(0, 23, false, 200);

		} else if (key == "a") {

			rand_num1 = Math.floor((Math.random() * 10) + 1);
			rand_num2 = Math.floor((Math.random() * 100) + 1);
			temp1 = rand_num1 * rand_num2;
			temp2 = rand_num1 * (rand_num2 + 3);

			text2.text = (rand_num1.toString()) + "  x  ";
			range.text = "[" + (temp1.toString()) + " , " + (temp2.toString()) + "]";
			output.text = "";
			text1.text = "";
			param = "";
			input = parseInt(param);

		} else if (key == "Backspace") {

			param = param.substring(0, param.length - 1);
			text1.text = param;
			input = parseInt(param);

		} else if (key == "0" || key == "1" || key == "2" || key == "3" || key == "4" ||
							 key == "5" || key == "6" || key == "7" || key == "8" || key == "9" ||
							 key == ".") {

			if(param.length < 3) {
				param += key;
				text1.text = param;
				input = parseInt(param);
			}

		}

		console.log(text1.text);
		console.log(typeof param);
		console.log(typeof input);

	});
	scene.actionManager.registerAction(action);

	var button = BABYLON.GUI.Button.CreateImageWithCenterTextButton("log_butt", "Menu", "res/login-button.png");
	button.height = "90px";
	button.width = "290px";
	button.fontFamily = "Blackadder ITC";
	button.fontStyle = "italic";
	button.fontSize = 36;
	button.color = "gold";
	button.thickness = 0;
	button.top = "350px";
	button.left = "-750px";
	advTexture.addControl(button);
	// button.left = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;

	button.onPointerClickObservable.add(function() {
		message.render = 1;
    // advTexture.dispose();
	});

	return scene;

};
