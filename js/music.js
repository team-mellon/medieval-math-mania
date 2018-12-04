function createMusic(engine, canvas, message, database) {                        // function that returns the menu scene

  var scene = new BABYLON.Scene(engine);                                        // create the scene

  var camera = new BABYLON.UniversalCamera(
    "menu_cam",
    new BABYLON.Vector3(0, 0, -10),
    scene);                                                                     // creates camera pointed at the scene
  camera.setTarget(BABYLON.Vector3.Zero());                                     // targets the camera to scene origin
  camera.attachControl(canvas, true);                                           // attaches the camera to the canvas

  var current_music = 1;

  // GUI
  var advTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI"); // AdvancedDynamicTexture for the controls of the gui
  advTexture.idealWidth = 1920;                                                 // Ideal screen width for the UI to scale to
  advTexture.idealHeight = 1080;                                                // Ideal screen height for the UI to scale to
  var enable = true;

  //music
  var music1 = new BABYLON.Sound("achaidh_cheide", "res/music/achaidh_cheide.wav", scene, null, { loop: false, autoplay: true});
  var music2 = new BABYLON.Sound("cartoon_battle", "res/music/cartoon_battle.wav", scene, null, { loop: false, autoplay: false});
  var music3 = new BABYLON.Sound("celtic_impulse", "res/music/celtic_impulse.wav", scene, null, { loop: false, autoplay: false});
  var music4 = new BABYLON.Sound("clenched_teeth", "res/music/clenched_teeth.wav", scene, null, { loop: false, autoplay: false});
  var music5 = new BABYLON.Sound("failing_defense", "res/music/failing_defense.wav", scene, null, { loop: false, autoplay: false});
  var music6 = new BABYLON.Sound("fiddles_mcGinty", "res/music/fiddles_mcGinty.wav", scene, null, { loop: false, autoplay: false});
  var music7 = new BABYLON.Sound("galway", "res/music/galway.wav", scene, null, { loop: false, autoplay: false});
  var music8 = new BABYLON.Sound("hidden_past", "res/music/hidden_past.wav", scene, null, { loop: false, autoplay: false});
  var music9 = new BABYLON.Sound("one-eyed_maestro", "res/music/one-eyed_maestro.wav", scene, null, { loop: false, autoplay: false});
  var music10 = new BABYLON.Sound("parisian", "res/music/parisian.wav", scene, null, { loop: false, autoplay: false});

  music1.onEndedObservable.add(function(){
	  music2.play();
    current_music = 2;
  });
  music2.onEndedObservable.add(function(){
	  music3.play();
    current_music = 3;
  });
  music3.onEndedObservable.add(function(){
	  music4.play();
    current_music = 4;
  });
  music4.onEndedObservable.add(function(){
	  music5.play();
    current_music = 5;
  });
  music5.onEndedObservable.add(function(){
	  music6.play();
    current_music = 6;
  });
  music6.onEndedObservable.add(function(){
	  music7.play();
    current_music = 7;
  });
  music7.onEndedObservable.add(function(){
	  music8.play();
    current_music = 8;
  });
  music8.onEndedObservable.add(function(){
	  music9.play();
    current_music = 9;
  });
  music9.onEndedObservable.add(function(){
	  music10.play();
    current_music = 10;
  });
  music10.onEndedObservable.add(function(){
	  music1.play();
    current_music = 1;
  });//end music

  // switch (current_music) {
  //   case 1:
  //     music1.setVolume(message.volume);
  //     break;
  //
  //   case 2:
  //     music2.setVolume(message.volume);
  //     break;
  //
  //   case 3:
  //     music3.setVolume(message.volume);
  //     break;
  //
  //   case 4:
  //     music4.setVolume(message.volume);
  //     break;
  //
  //   case 5:
  //     music5.setVolume(message.volume);
  //     break;
  //
  //   case 6:
  //     music6.setVolume(message.volume);
  //     break;
  //
  //   case 7:
  //     music7.setVolume(message.volume);
  //     break;
  //
  //   case 8:
  //     music8.setVolume(message.volume);
  //     break;
  //
  //   case 9:
  //     music9.setVolume(message.volume);
  //     break;
  //
  //   case 10:
  //     music10.setVolume(message.volume);
  //     break;
  // }

  // if (message.music_pause == true) {
  //   switch (current_music) {
  //     case 1:
  //       music1.pause();
  //       break;
  //
  //     case 2:
  //       music2.pause();
  //       break;
  //
  //     case 3:
  //       music3.pause();
  //       break;
  //
  //     case 4:
  //       music4.pause();
  //       break;
  //
  //     case 5:
  //       music5.pause();
  //       break;
  //
  //     case 6:
  //       music6.pause();
  //       break;
  //
  //     case 7:
  //       music7.pause();
  //       break;
  //
  //     case 8:
  //       music8.pause();
  //       break;
  //
  //     case 9:
  //       music9.pause();
  //       break;
  //
  //     case 10:
  //       music10.pause();
  //       break;
  //   }
  // }

  var volume_input = new BABYLON.GUI.Slider();
  volume_input.top = "-110px";
  volume_input.height = "20px";
  volume_input.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
  volume_input.width = "200px";
  volume_input.minimum = 0;
  volume_input.maximum = 1;
  volume_input.value = 1;
  advTexture.addControl(volume_input);
  volume_input.onValueChangedObservable.add(function(value) {
    switch (current_music) {
      case 1:
        music1.setVolume(value);
        break;

      case 2:
        music2.setVolume(value);
        break;

      case 3:
        music3.setVolume(value);
        break;

      case 4:
        music4.setVolume(value);
        break;

      case 5:
        music5.setVolume(value);
        break;

      case 6:
        music6.setVolume(value);
        break;

      case 7:
        music7.setVolume(value);
        break;

      case 8:
        music8.setVolume(value);
        break;

      case 9:
        music9.setVolume(value);
        break;

      case 10:
        music10.setVolume(value);
        break;
    }
  });

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

    switch (current_music) {
      case 1:
        if (music1.isPlaying) {
          music1.pause();
        } else if (music1.isPaused) {
          music1.play();
        }
        break;

      case 2:
        if (music2.isPlaying) {
          music2.pause();
        } else if (music2.isPaused) {
          music2.play();
        }
        break;

      case 3:
        if (music3.isPlaying) {
          music3.pause();
        } else if (music3.isPaused) {
          music3.play();
        }
        break;

      case 4:
        if (music4.isPlaying) {
          music4.pause();
        } else if (music4.isPaused) {
          music4.play();
        }
        break;

      case 5:
        if (music5.isPlaying) {
          music5.pause();
        } else if (music5.isPaused) {
          music5.play();
        }
        break;

      case 6:
        if (music6.isPlaying) {
          music6.pause();
        } else if (music6.isPaused) {
          music6.play();
        }
        break;

      case 7:
        if (music7.isPlaying) {
          music7.pause();
        } else if (music7.isPaused) {
          music7.play();
        }
        break;

      case 8:
        if (music8.isPlaying) {
          music8.pause();
        } else if (music8.isPaused) {
          music8.play();
        }
        break;

      case 9:
        if (music9.isPlaying) {
          music9.pause();
        } else if (music9.isPaused) {
          music9.play();
        }
        break;

      case 10:
        if (music10.isPlaying) {
          music10.pause();
        } else if (music10.isPaused) {
          music10.play();
        }
        break;
    }
  });

  return scene;

};
