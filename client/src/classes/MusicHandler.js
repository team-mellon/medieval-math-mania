//////////////////
// MUSICHANDLER //
//////////////////

// Game Data
import { playlistSources, playlistIDs } from '../game_data/music.js';

// import createjs from 'createjs';

class MusicHandler {

  constructor() {

    this.muted = false;

    // Player to play playlist music
    this.playlist = {
      size: 0,
      sources: [],
      ids: [],
      current: 0
    }
    this.sound_off = true;

    // Volume for
    this.volume = 0.5;

  }

  // Loads sounds when game starts
  loadSound () {

    this.playlist.size = playlistSources.length;
    this.playlist.sources = playlistSources;
    this.playlist.ids = playlistIDs;

    this.playlist.size = this.playlist.sources.length;

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
          }
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

}

export default MusicHandler;
