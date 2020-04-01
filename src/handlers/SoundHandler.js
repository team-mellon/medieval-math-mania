////////////////////////////////////////////////////////////////////////////////
// SOUNDHANDLER                                                               //
////////////////////////////////////////////////////////////////////////////////
// Handler for music controls calls. This encompasses loading songs and       //
// sounds, manipulating which song is playing, and manipulating the current   //
// songs volume.                                                              //
////////////////////////////////////////////////////////////////////////////////

// Game Data
import { musicSources, musicIDs, soundSources, soundIDs } from '../game_data/sounds.js';

class SoundHandler {

  // Constructor to initialize music and sound effects variables
  constructor() {

    // Player to play music
    this.musicPlayer = {
      size: musicSources.length, // Int to keep track of the playlist size
      sources: musicSources, // String loactions to locate the song files
      ids: musicIDs, // String ids to identify the songs on the playlist
      current: 0, // Int to represent the current song
      volume: 0.5, // 0-1 float for control of the music volume
      isPaused: true, // Bool for checking if the current song is paused
      isMuted: false, // Bool for checking if the current song is muted
      isOff: true // Bool for checking if the player is off
    }

    // Player to play sound effects
    this.soundPlayer = {
      size: soundSources.length, // Int to keep track of the sound effect list size
      sources: soundSources, // String locations to locate the sound effect files
      ids: soundIDs, // String ids to identify the sound effects on the list
      // current: 0, // Int to represent the current sound effect
      volume: 0.5, // 0-1 float for control of the music volume
      // isPaused: true, // Bool for checking if the current sound is paused
      isMuted: false, // Bool for checking if the current sound is muted
      // isOff: true // Bool for checking if the player is off
    }

    for (var i = 0; i < this.musicPlayer.size; i++) {

      // For the lenght of the playlist, register the songs
      createjs.Sound.registerSound(this.musicPlayer.sources[i], this.musicPlayer.ids[i]);

    }

    for (var i = 0; i < this.soundPlayer.size; i++) {

      // For the lenght of the playlist, register the sound effects
      createjs.Sound.registerSound(this.soundPlayer.sources[i], this.soundPlayer.ids[i]);

    }

  }

  // Destroy the old song and creates the new song
  createCurrentSong() {

    // Destroy the current song
    this.current_song.destroy();
    // Create the new song
    this.current_song = createjs.Sound.play(this.musicPlayer.ids[this.musicPlayer.current]);
    // Set the current volume to the player volume
    this.current_song.volume = this.musicPlayer.volume;
    // Set mute state to the player mute state
    this.current_song.muted = this.musicPlayer.isMuted;

  }

  // Turns on music or plays the current song
  playSound () {

    // If the musicplayer isn't started yet
    if (this.musicPlayer.isOff) {

      // Set the current song
      this.current_song = createjs.Sound.play(this.musicPlayer.ids[this.musicPlayer.current]);

      // When the current song ends
      this.current_song.on("complete", function() {

        // Increment current
        this.musicPlayer.current++;
        // If it runs over the playlist size
        if (this.musicPlayer.current >= this.musicPlayer.size ) {
          // Set current to the first song
          this.musicPlayer.current = 0;
        }

        // Destroy the current song
        this.current_song.destroy();
        // Create the next song
        this.current_song = createjs.Sound.play(this.musicPlayer.ids[this.musicPlayer.current]);

      });

      // Set the musicplayer flag to on
      this.musicPlayer.isOff = false;

    } else { // If its already turned on

      // Pause/Unpause the current song
      this.current_song.paused = !this.current_song.paused;
      // Set the musicplayer flag to paused/unpaused
      this.musicPlayer.isPaused = !this.musicPlayer.isPaused;

    }

    // Set the current volume to the player volume
    this.current_song.volume = this.musicPlayer.volume;

  }

  // Plays the previous song
  previousSound () {

    // If the musicplayer is off
    if (!this.musicPlayer.isOff) {

      // Decrement current
      this.musicPlayer.current--;
      // If it runs under the playlist size
      if (this.musicPlayer.current < 0 ) {
          // Set current to the last song
        this.musicPlayer.current = this.musicPlayer.size - 1;

      }

      // Destroy the old song and creates the new song
      this.createCurrentSong();

    }

  }

  // Plays the next song
  nextSound () {

    // If the musicplayer is on
    if (!this.musicPlayer.isOff) {

      // Increment current
      this.musicPlayer.current++;
      // If it runs over the playlist size
      if (this.musicPlayer.current >= this.musicPlayer.size ) {
        // Set current to the first song
        this.musicPlayer.current = 0;
      }

      // Destroy the old song and creates the new song
      this.createCurrentSong();

    }

  }

  // Sets the volume based on an incomimng value from 0-100
  setVolume () {

    // Set the musicplayer volume to the slider volume
    this.musicPlayer.volume = document.getElementById("volumeSlider").value;
    // Set the current song volume to the music player volume
    this.current_song.volume = this.musicPlayer.volume;
    // Log the volume
    console.log(this.musicPlayer.volume);

  }

  // Mutes the current song
  muteSound (stage) {

    // If the musicplayer is off
    if (!this.musicPlayer.isOff) {

      // If the musicplayer is muted
      if(!this.musicPlayer.isMuted) {

  //       stage.removeChild(this.lute);
  //       this.lute = new createImage("res/antiLute.png", this.luteX, this.luteY);
  //       lute.addEventListener("click", this.muteSound);
  //       this.scaleGUI();

} else { // If the musicplayer is on

  //       stage.removeChild(this.lute);
  //       this.lute = new createImage("res/lute.png", this.luteX, this.luteY);
  //       this.lute.addEventListener("click", this.muteSound);
  //       this.scaleGUI();

      }

      // Mute/Unmute current song
      this.current_song.muted = !this.current_song.muted;
      // Mute/Unmute musicplayer
      this.musicPlayer.isMuted = !this.musicPlayer.isMuted;

    }
  }

}

export default SoundHandler;
