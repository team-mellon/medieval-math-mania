function createMusic(scene, camera, advTexture, message, database) {                       // function that returns the menu scene

  var current_music = 1;

  // GUI
  var advTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI"); // AdvancedDynamicTexture for the controls of the gui
  advTexture.idealWidth = 1920;                                                 // Ideal screen width for the UI to scale to
  advTexture.idealHeight = 1080;                                                // Ideal screen height for the UI to scale to

  var enable = true;

  //music
  var music1 = new BABYLON.Sound("achaidh_cheide", "res/music/achaidh_cheide.wav", scene, null, { loop: false, autoplay: true});
  var music2 = new BABYLON.Sound("cartoon_battle", "res/music/cartoon_battle.wav", scene, null, { loop: false, autoplay: false});
  // var music3 = new BABYLON.Sound("celtic_impulse", "res/music/celtic_impulse.wav", scene, null, { loop: false, autoplay: false});
  // var music4 = new BABYLON.Sound("clenched_teeth", "res/music/clenched_teeth.wav", scene, null, { loop: false, autoplay: false});
  // var music5 = new BABYLON.Sound("failing_defense", "res/music/failing_defense.wav", scene, null, { loop: false, autoplay: false});
  // var music6 = new BABYLON.Sound("fiddles_mcGinty", "res/music/fiddles_mcGinty.wav", scene, null, { loop: false, autoplay: false});
  // var music7 = new BABYLON.Sound("galway", "res/music/galway.wav", scene, null, { loop: false, autoplay: false});
  // var music8 = new BABYLON.Sound("hidden_past", "res/music/hidden_past.wav", scene, null, { loop: false, autoplay: false});
  // var music9 = new BABYLON.Sound("one-eyed_maestro", "res/music/one-eyed_maestro.wav", scene, null, { loop: false, autoplay: false});
  // var music10 = new BABYLON.Sound("parisian", "res/music/parisian.wav", scene, null, { loop: false, autoplay: false});

  music1.onEndedObservable.add(function(){
	  music2.play();
    current_music = 2;
  });
  // music2.onEndedObservable.add(function(){
	 //  music3.play();
  //   current_music = 3;
  // });
  // music3.onEndedObservable.add(function(){
	 //  music4.play();
  //   current_music = 4;
  // });
  // music4.onEndedObservable.add(function(){
	 //  music5.play();
  //   current_music = 5;
  // });
  // music5.onEndedObservable.add(function(){
	 //  music6.play();
  //   current_music = 6;
  // });
  // music6.onEndedObservable.add(function(){
	 //  music7.play();
  //   current_music = 7;
  // });
  // music7.onEndedObservable.add(function(){
	 //  music8.play();
  //   current_music = 8;
  // });
  // music8.onEndedObservable.add(function(){
	 //  music9.play();
  //   current_music = 9;
  // });
  // music9.onEndedObservable.add(function(){
	 //  music10.play();
  //   current_music = 10;
  // });
  // music10.onEndedObservable.add(function(){
	 //  music1.play();
  //   current_music = 1;
  // });//end music

  return scene;

};
