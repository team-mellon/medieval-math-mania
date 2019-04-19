////////////////////////////////////////////////////////////////////////////////
// MUSICHANDLER                                                               //
////////////////////////////////////////////////////////////////////////////////
// Handler for music controls calls. This encompasses loading sounds,         //
// manipulating which song is playing, and manipulating the current songs     //
// volume.                                                                    //
////////////////////////////////////////////////////////////////////////////////

// Game Data
import { playlistSources, playlistIDs } from '../game_data/music.js';

class MusicHandler {

  constructor() {

    //registers Menu sounds
    createjs.Sound.registerSound("res/sound_effects/menu.wav", "menu");
    createjs.Sound.registerSound("res/sound_effects/select.wav", "select");
    createjs.Sound.registerSound("res/sound_effects/sword.wav", "sword");

    // Bool for checking if the current song is paused
    this.isPaused = true;

    // Bool for checking if the current song is muted
    this.isMuted = false;

    //
    this.muted = false;

    // Player to play playlist music
    this.playlist = {
      size: playlistSources.length,
      sources: playlistSources,
      ids: playlistIDs,
      current: 0
    }

    // console.log(this.music.playlist);

    //
    this.sound_off = true;

    // Volume for
    this.volume = 0.5;

    for (var i = 0; i < this.playlist.size; i++) {
      createjs.Sound.registerSound(this.playlist.sources[i], this.playlist.ids[i]);
    }

  }

  // Turns on music or plays the current song
  playSound () {

    if (this.sound_off) { // runs once to start music

      this.current_song = createjs.Sound.play(this.playlist.ids[this.playlist.current]);

      this.current_song.on("complete", function() {
        this.playlist.current++;
        if (this.playlist.current >= this.playlist.size ) {
          this.playlist.current = 0;
        }s
        this.current_song.destroy();
        this.current_song = createjs.Sound.play(this.playlist.ids[this.playlist.current]);
    		this.current_song.volume = this.volume;

      });

      this.sound_off = false;

    } else { // runs every other time to play and pause the current song

      this.current_song.paused = !this.current_song.paused;
    	this.current_song.volume = this.volume;

    }

  }

  // Plays the previous song
  previousSound () {

    if (!this.sound_off) {

      this.playlist.current--;

      if (this.playlist.current < 0 ) {
        this.playlist.current = this.playlist.size - 1;
      }

      this.current_song.destroy();
      this.current_song = createjs.Sound.play(this.playlist.ids[this.playlist.current]);
    	this.current_song.volume = this.volume;
    	this.current_song.muted = this.muted;

    }

  }

  // Plays the next song
  nextSound () {

    if (!this.sound_off) {

      this.playlist.current++;

      if (this.playlist.current >= this.playlist.size ) {

        this.playlist.current = 0;

      }

      this.current_song.destroy();
      this.current_song = createjs.Sound.play(this.playlist.ids[this.playlist.current]);
    	this.current_song.volume = this.volume;
    	this.current_song.muted = this.muted;

    }

  }

  // Sets the volume based on an incomimng value from 0-100
  setVolume () {

    this.volume = document.getElementById("volumeSlider").value;
    this.current_song.volume = this.volume;
    console.log(this.volume);

  }

  // Mutes the current song
  muteSound (stage) {

    if (!this.sound_off) {

  //     console.log(this.lute.src);

      if(!this.muted) {

  //       stage.removeChild(this.lute);
  //       this.lute = new createImage("res/antiLute.png", this.luteX, this.luteY);
  //       lute.addEventListener("click", this.muteSound);
  //       this.scaleGUI();

      } else {

  //       stage.removeChild(this.lute);
  //       this.lute = new createImage("res/lute.png", this.luteX, this.luteY);
  //       this.lute.addEventListener("click", this.muteSound);
  //       this.scaleGUI();

      }

      this.current_song.muted = !this.current_song.muted;
      this.this.muted = !this.muted;

    }
  }

}

export default MusicHandler;
