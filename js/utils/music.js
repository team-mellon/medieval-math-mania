var muted = false;
var playlistSources = [
  "res/music/one-eyed_maestro.wav",
  "res/music/achaidh_cheide.wav",
  "res/music/cartoon_battle.wav",
  "res/music/celtic_impulse.wav",
  "res/music/clenched_teeth.wav",
  "res/music/failing_defense.wav",
  "res/music/fiddles_mcGinty.wav",
  "res/music/galway.wav",
  "res/music/hidden_past.wav",
  "res/music/parisian.wav",
  "res/music/bobbin_beeps.wav",
  "res/music/whirlwind.wav",
  "res/music/drums_in_the_deep.wav"
];

var playlistIDs = [
  "OneEyedMaestro",
  "AchaidhCheide",
  "CartoonBattle",
  "CelticImpulse",
  "ClenchedTeeth",
  "FailingDefense",
  "FiddlesMcGinty",
  "Galway",
  "HiddenPast",
  "Parisian",
  "BoppinBeeps",
  "whirlwind",
  "DrumsInTheDeep"
];

// Player to play playlist music
var playlist = {
  size: 0,
  sources: [],
  ids: [],
  current: 0
}
var current_song;
var sound_off = true;

// Volume for
var volume = 0.5;

// Loads sounds when game starts
function loadSound () {

  playlist.size = playlistSources.length;
  playlist.sources = playlistSources;
  playlist.ids = playlistIDs;

  for (i = 0; i < playlist.size; i++) {
    createjs.Sound.registerSound(playlist.sources[i], playlist.ids[i]);
  }

}



// Turns on music or plays the current song
function playSound () {

  if (sound_off) { // runs once to start music

    current_song = createjs.Sound.play(playlist.ids[playlist.current]);
    current_song.on("complete", function() {
        playlist.current++;
        if (playlist.current >= playlist.size ) {
          playlist.current = 0;
        }
        current_song.destroy();
        current_song = createjs.Sound.play(playlist.ids[playlist.current]);
		current_song.volume = volume;
    });
    sound_off = false;

  } else { // runs every other time to play and pause the current song

    current_song.paused = !current_song.paused;
	current_song.volume = volume;

  }

}



// Plays the previous song
function previousSound () {

  if (!sound_off) {
    playlist.current--;
    if (playlist.current < 0 ) {
      playlist.current = playlist.size - 1;
    }
    current_song.destroy();
    current_song = createjs.Sound.play(playlist.ids[playlist.current]);
	current_song.volume = volume;
	current_song.muted = muted;
  }

}



// Plays the next song
function nextSound () {

  if (!sound_off) {
    playlist.current++;
    if (playlist.current >= playlist.size ) {
      playlist.current = 0;
    }
    current_song.destroy();
    current_song = createjs.Sound.play(playlist.ids[playlist.current]);
	current_song.volume = volume;
	current_song.muted = muted;
  }

}



// Mutes the current song
function muteSound () {

  if (!sound_off) {
	  console.log(lute.src);
	if(!muted)
	{
		stage.removeChild(lute);
		lute = new createImage("res/antiLute.png", luteX, luteY);
		lute.addEventListener("click", muteSound);
		scaleGUI();
	}
	else
	{
		stage.removeChild(lute);
		lute = new createImage("res/lute.png", luteX, luteY);
		lute.addEventListener("click", muteSound);
		scaleGUI();
	}
    current_song.muted = !current_song.muted;
	muted = !muted;
  }
}



// Sets the volume based on an incomimng value from 0-100
function setVolume() {
  volume = document.getElementById("volumeSlider").value;
  current_song.volume = volume;
  console.log(volume);
}