function createGame(scene, camera, advTexture, message, database) {                         // function that returns the game scene

  var enable = true;  

  camera.mode = BABYLON.Camera.ORTHOGRAPHIC_CAMERA;

  camera.orthoTop = 384;
  camera.orthoBottom = -384;
  camera.orthoLeft = -960;
  camera.orthoRight = 960;                                                        // targets the camera to scene origin

  scene.clearColor = new BABYLON.Color4(0.78, 1, 0.98, 1);                                                          // render enable bit for the ADT controls

	// var foreground = new BABYLON.Layer("fore", "hit-target-castle-facade-concept-high-res.png", scene);
	// foreground.isBackground = false;

	//sound effects initialized
	var firing  = new BABYLON.Sound("firing", "res/sound_effects/catapult_firing.wav", scene, null, { loop: false, autoplay: false});
	var reload  = new BABYLON.Sound("reloading", "res/sound_effects/catapult_cocking.wav", scene, null, { loop: false, autoplay: false});
	var lighting  = new BABYLON.Sound("lighting", "res/sound_effects/fire_lighting.wav", scene, null, { loop: false, autoplay: false});

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

  // lighting.play();
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

	var param = "";
	var rand_num1;
	var rand_num2;
	var temp1;
	var temp2;
	var input;
	var result;

  var spriteManagerLCT = new BABYLON.SpriteManager("spriteManagerLCT", "res/castle/left-center-tower.png", 1, {width: 1920, height: 768}, scene);
	var spriteManagerCT = new BABYLON.SpriteManager("spriteManagerCT", "res/castle/center-tower.png", 1, {width: 1920, height: 768}, scene);
	var spriteManagerRCT = new BABYLON.SpriteManager("spriteManagerRCT", "res/castle/right-center-tower.png", 1, {width: 1920, height: 768}, scene);
	var spriteManagerBadKnight = new BABYLON.SpriteManager("spriteManagerBadKnight", "res/bad-knight.png", 1, {width: 320, height: 320}, scene);
	var spriteManagerBadArcher = new BABYLON.SpriteManager("spriteManagerBadArcher", "res/bad-archer.png", 4, {width: 320, height: 320}, scene);
	var spriteManagerLT = new BABYLON.SpriteManager("spriteManagerLT", "res/castle/left-tower.png", 1, {width: 1920, height: 768}, scene);
	var spriteManagerRT = new BABYLON.SpriteManager("spriteManagerRT", "res/castle/right-tower.png", 1, {width: 1920, height: 768}, scene);
	var spriteManagerBody = new BABYLON.SpriteManager("spriteManagerBody", "res/castle/body.png", 1, {width: 1920, height: 768}, scene);
	var spriteManagerFacade = new BABYLON.SpriteManager("spriteManagerFacade", "res/castle/facade.png", 1, {width: 1920, height: 768}, scene);
	var spriteManagerFire = new BABYLON.SpriteManager("spriteManagerFire", "res/ammo.png", 5, {width: 320, height: 320}, scene);
	var spriteManagerCatapult = new BABYLON.SpriteManager("spriteManagerCatapult", "res/catapult.png", 1, {width: 2560, height: 1280}, scene);

  var badArcher1 = new BABYLON.Sprite("badArcher1", spriteManagerBadArcher);
  var lt1 = new BABYLON.Sprite("lt1", spriteManagerLT);
	var badArcher2 = new BABYLON.Sprite("badArcher2", spriteManagerBadArcher);
  var lct1 = new BABYLON.Sprite("lct1", spriteManagerLCT);
	var badArcher3 = new BABYLON.Sprite("badArcher3", spriteManagerBadArcher);
  var ct1 = new BABYLON.Sprite("ct1", spriteManagerCT);
	var badKnight1 = new BABYLON.Sprite("badKnight1", spriteManagerBadKnight);
  var rct1 = new BABYLON.Sprite("rct1", spriteManagerRCT);
	var badArcher4 = new BABYLON.Sprite("badArcher4", spriteManagerBadArcher);
  var rt1 = new BABYLON.Sprite("rt1", spriteManagerRT);
  var body1 = new BABYLON.Sprite("body1", spriteManagerBody);
  var facade1 = new BABYLON.Sprite("facade1", spriteManagerFacade);
	var fire1 = new BABYLON.Sprite("fire1", spriteManagerFire);
	var fire2 = new BABYLON.Sprite("fire2", spriteManagerFire);
	var fire3 = new BABYLON.Sprite("fire3", spriteManagerFire);
	var fire4 = new BABYLON.Sprite("fire4", spriteManagerFire);
	var fire5 = new BABYLON.Sprite("fire5", spriteManagerFire);
	var catapult1 = new BABYLON.Sprite("catapult1", spriteManagerCatapult);

	catapult1.position.x = 0.0;
	catapult1.position.y = -2.0;
	catapult1.width = 8.0;
	catapult1.height =  4.0;

  // console.log(engine.getRenderHeight());
  // console.log(engine.getRenderWidth());

  var g_height = 768.0;
  var g_width = 1920.0;

  lt1.width = g_width;
  lt1.height = g_height;
  lct1.width = g_width;
  lct1.height = g_height;
  ct1.width = g_width;
  ct1.height = g_height;
  rct1.width = g_width;
  rct1.height = g_height;
  rt1.width = g_width;
  rt1.height = g_height;
  body1.width = g_width;
  body1.height = g_height;
  facade1.width = g_width;
  facade1.height = g_height;

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
	fire1.position.x = -20.0;
	fire1.position.y = -20.0;
	fire2.position.x = -20.0;
	fire2.position.y = -20.0;
	fire3.position.x = -20.0;
	fire3.position.y = -20.0;
	fire4.position.x = -20.0;
	fire4.position.y = -20.0;
	fire5.position.x = -20.0;
	fire5.position.y = -20.0;

	badKnight1.playAnimation(0, 11, true, 200);
	badArcher1.playAnimation(0, 11, true, 200);
	badArcher2.playAnimation(0, 11, true, 200);
	badArcher3.playAnimation(0, 11, true, 200);
	badArcher4.playAnimation(0, 11, true, 200);
	fire1.playAnimation(0, 11, true, 200);
	fire2.playAnimation(0, 11, true, 200);
	fire3.playAnimation(0, 11, true, 200);
	fire4.playAnimation(0, 11, true, 200);
	fire5.playAnimation(0, 11, true, 200);

	// for (var i = 0; i < 20; i++) {
	//   var fire = new BABYLON.Sprite("fire", spriteManagerFire);
	//   fire.position.x = Math.random() * 10 - 5;
	//   fire.position.y = 0.2;
	//   fire.playAnimation(0, 11, true, 200);
	//   // tree.isPickable = true;
	// }
  var hit_count = 0;
  var fire_switch = 0;
	scene.actionManager = new BABYLON.ActionManager(scene);
	action = new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyUpTrigger, function(event) {
		var key = event.sourceEvent.key;
		console.log(key) ;
		var x = 0.0;
		if (key == "Enter")
		{
			firing.play();
			result = rand_num1 * input;
			if (result < temp1)
			{
				hitmarker_l.alpha = 1;
				setTimeout(function(){hitmarker_l.alpha = 0}, 2000);
				x = -7.5;
        fire_switch = 0;
				reload.play(2.5);
			}
			else if (result > temp2) {
				hitmarker_h.alpha = 1;
				setTimeout(function(){hitmarker_h.alpha = 0}, 2000);
				x = 8.5;
        fire_switch = 1;
				reload.play(2.5);
			}
			else
			{
				hitmarker_t.alpha = 1;
				setTimeout(function(){hitmarker_t.alpha = 0}, 2000);
				switch (hit_count)
				{
					case 0: x = -3.75; break;
					case 1: x = 4.75; break;
					case 2: x = 0.52; break;
				}
        fire_switch = 2 + hit_count;
				hit_count++;
				reload.play(2.5);
			}
			output.text = result.toString();
			catapult1.playAnimation(0, 23, false, 200);
			var frameRate = 10;
			var xSlide = new BABYLON.Animation("xSlide", "position.x", frameRate, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
			var ySlide = new BABYLON.Animation("ySlide", "position.y", frameRate, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
			var xKeyFrames = [];
			var yKeyFrames = [];
			var frame_count = 7;
			var xDist = (0 + x) / frame_count - 0.1;
			for (var i = 0; i < frame_count; i += 0.1)
			{
				xKeyFrames.push(
				{
					frame: frameRate * i,
					value: xDist * i
				});
				yKeyFrames.push(
				{
					frame: frameRate * i,
					value: -0.5 * Math.pow(i,2) + (4.0 * i) + -3.6
				});
			}
			xSlide.setKeys(xKeyFrames);
			ySlide.setKeys(yKeyFrames);
      console.log(fire_switch);
      switch (fire_switch) {
        case 0:
			     scene.beginDirectAnimation(fire1, [xSlide], 0, frame_count * frameRate, true);
			     scene.beginDirectAnimation(fire1, [ySlide], 0, frame_count * frameRate, true);
           // , function() {
           //   lt1.isVisible = false;
           // });
           break;
        case 1:
			     scene.beginDirectAnimation(fire2, [xSlide], 0, frame_count * frameRate, true);
			     scene.beginDirectAnimation(fire2, [ySlide], 0, frame_count * frameRate, true);
           // , function() {
           //   lct1.isVisible = false;
           // });
           break;
        case 2:
			     scene.beginDirectAnimation(fire3, [xSlide], 0, frame_count * frameRate, true);
			     scene.beginDirectAnimation(fire3, [ySlide], 0, frame_count * frameRate, true);
           // , function() {
           //   ct1.isVisible = false;
           // });
           break;
        case 3:
			     scene.beginDirectAnimation(fire4, [xSlide], 0, frame_count * frameRate, true);
			     scene.beginDirectAnimation(fire4, [ySlide], 0, frame_count * frameRate, true);
           // , function() {
           //   rct1.isVisible = false;
           // });
           break;
        case 4:
			     scene.beginDirectAnimation(fire5, [xSlide], 0, frame_count * frameRate, true);
			     scene.beginDirectAnimation(fire5, [ySlide], 0, frame_count * frameRate, true);
           // , function() {
           //   rt1.isVisible = false;
           // });
           break;
      }

			// fire1.position.y += 0.01;
		}
		else if (key == "a")
		{
			// lighting.play();
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
		}
		else if (key == "Backspace")
		{
			param = param.substring(0, param.length - 1);
			text1.text = param;
			input = parseInt(param);
		}
		else if(key == "0" || key == "1" || key == "2" || key == "3" || key == "4" ||
				key == "5" || key == "6" || key == "7" || key == "8" || key == "9" || key == ".")
		{
			if(param.length < 3)
			{
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
	});

  //Level Down button with sword image
  var cancel_button = BABYLON.GUI.Button.CreateImageWithCenterTextButton("cancel_button", "PREVIOUS " + message.level.toString(), "res/sword-button-right.png");
  cancel_button.top = "400px";
  cancel_button.left= "-325px";
  cancel_button.height = "70px";
  cancel_button.width = "290px";
  cancel_button.color = "firebrick";
  cancel_button.thickness = 0;
  cancel_button.fontFamily = "Blackadder ITC";
  cancel_button.fontSize = 25;
  cancel_button.isEnabled = enable;
  cancel_button.onPointerClickObservable.add(function() {
    message.level--;
    if (message.level < 1) {
      message.level = 1;
    }
  });

  // Level Up button with sword image
  var submit_button = BABYLON.GUI.Button.CreateImageWithCenterTextButton("submit_button", "NEXT", "res/sword-button-left.png");
  submit_button.top = "400px";
  submit_button.left= "325px";
  submit_button.height = "70px";
  submit_button.width = "290px";
  submit_button.color = "firebrick";
  submit_button.thickness = 0;
  submit_button.fontFamily = "Blackadder ITC";
  submit_button.fontSize = 25;
  submit_button.isEnabled = enable;
  submit_button.onPointerClickObservable.add(function() {
    message.level++;
    if (message.level > 10) {
      message.level = 10;
    }
  });
  advTexture.addControl(submit_button);
  advTexture.addControl(cancel_button);

	var lute = BABYLON.GUI.Button.CreateImageWithCenterTextButton("lute_butt", "", "res/lute.png");
	lute.height = "110px";
	lute.width = "110px";
	lute.fontFamily = "Blackadder ITC";
	lute.fontStyle = "italic";
	lute.fontSize = 36;
	lute.color = "gold";
	lute.thickness = 0;
	lute.top = "350px";
  lute.left = "875px";
	advTexture.addControl(lute);
	// lute.left = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
	lute.onPointerClickObservable.add(function() {
    message.music_pause = !message.music_pause;
	});
	return scene;
};
