<template>
  <div id="deviceLayer">

    <canvas id="drawingCanvas" :style="style">alternate content</canvas>

    <Loader v-bind:loading-queue="loadingQueue" @loaded="preloaded" />

    <div id="sceneHTML"></div>

    <!-- <canvas id="changingParametersBasedOnState" :width="w" :height="h" :style="style"></canvas> -->
    <!-- <div id="childThatSendsBackData"> -->
      <!-- <newChild @emittedChildEvent="runParentFunctionOnReturningObject" /> -->
    <!-- </div> -->

  </div>
</template>

<script>

import Loader from './Loader.vue'

// Static classes
import FormHandler from '../handlers/FormHandler.js';
import APIHandler from '../handlers/APIHandler.js';

// Modules
import Director from '../handlers/Director.js';
import DeviceHandler from '../handlers/DeviceHandler.js';

// Normal classes
import InputHandler from '../handlers/InputHandler.js';
import SoundHandler from '../handlers/SoundHandler.js';

// Game Data
import constants from '../game_data/constants.js';
import { sceneData, sceneManifest } from '../game_data/scenes.js';
import { levelData } from '../game_data/levels.js';

// Models
import ObjectConfig from '../structures/ObjectConfig'

export default {

  name: 'Engine',

  components: {
    DeviceLayer,
    Loader
  },

  data () {

    return {

      config: {
        canvasId: 'drawingCanvas',
      },

      loadingQueue: null,

      // Authentication handling
      async: {
        error: ''
      },

      text: '',

      // Current user data
      user: {
        authenticated: false,
        firstname: 'Place',
        lastname: 'Holder',
        username: 'CpnPlchlder',
        hits: 0,
        highs: 0,
        lows: 0,
        badges: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      },

      scale: {
        x: 1.0,
        y: 1.0
      },

      loader: {
        preloaded: false,
        loaded: false
      },

      background: {
        entity: {},
        shape: null,
        color: '#808080',
        center: null,
        left: null,
        right: null,
        up: null,
        down: null
      },

      // w: 100,
      // h: 200,

      animations: {
        // ecs: [], // Entity component system for scaling and eventually object storage
        // gcs: [] // GUI component system for scaling and eventually object storage
      },

      style: {
        background: '#aaa'
      }
    }
  },

  // async created() {
  //
  //   try {
  //
  //     this.stats = await StatService.getStats();
  //     console.log(this.stats);
  //
  //     this.users = await LoginService.getUsers();
  //     console.log(this.users);
  //
  //   } catch (err) {
  //
  //     this.async.error = err.message;
  //     console.log(this.async.error);
  //
  //   }
  //
  // },

  // Clear color of screen
    // color was r:0.78, b:1, g:0.98, a:1 (Babylon.Color4)

  // Custom created numberlines
  // make the number line work

  // Put the range text back on screen

    // Generated 5 separate fireballs so the could be in use at the same time
    // Then generated the fireball on top of everything
    // catapult should be at the bottom center

  // Play animations right at the beginning
  // Also play fire animations

  // created a fireball generator to auto gen fireballs but maybe reusing is better

  // iron out the fireball aiming and entrance into the scene more

	// custom input function may be useful

	// else if(key == "0" || key == "1" || key == "2" || key == "3" || key == "4" ||
	// 		key == "5" || key == "6" || key == "7" || key == "8" || key == "9" || key == ".") {
	// 	if(param.length < 3) {
	// 		param += key;
	// 		text1.text = param;
	// 		input = parseInt(param);
	// 	}
	// }


  mounted: function() {

    // Stage for drawing pictures and shapes
    this.stage = new createjs.Stage(this.config.canvasId);

    // Grab the canvas that the stage is attached to.
    this.drawingCanvas = document.getElementById(this.config.canvasId);



    // Initialize the scene manager.
    this.director = new Director();
    
    // Initialize the engine modules.
    this.input = new InputHandler(this.drawingCanvas); // Input handler
    this.device = new DeviceHandler(); // Scales the scene

    // Initialize the sound handler, maybe put in director 
    this.music = new SoundHandler();



    this.second_title = null;

    // SCALER MAYBE
    // Set the window resize function to the one
    window.addEventListener('resize', function () { 
      this.device.resize(this.ecs, this.stage, this.director)
    }.bind(this), false);



    // INPUT MAYBE //
    // Add keydown listener
    document.onkeydown = this.input.keyDown.bind(this.input);

    // Add keyup listener
    document.onkeyup = this.input.keyUp.bind(this.input);



    // SCENE MAYBE //
    // console.log("initialized.");
    this.ecs = []; // Entity component system for scaling and eventually object storage



    // INPUT MAYBE //
    createjs.Touch.enable(this.stage);                          // Enable touch interaction for mobile
    this.stage.enableMouseOver();                               // Enable mouse events with scene objects



    createjs.Ticker.setFPS(30);                                 // Set FPS (could be depricated?)
    createjs.Ticker.addEventListener('tick', this.tick);        // Set tisk listener for use as game loop

  },

  methods: {

    tick: function(event) {

      // this.second_title.x = this.stage.canvas.width / 3;
      if (this.loader.preloaded && !this.loader.loaded) {

        // Create the first 'currentScene'
        this.director.createScene(this.ecs, this.stage, this.director.level, this.device, this.music, this.user, this.async); // Create scene assets

        // Rescale the view to size the scene to the device.
        this.device.resize(this.ecs, this.stage, this.director); // Resize to set initial scale

        // Set the loaded flag.
        this.loader.loaded = true;

        // if(this.director.loadingQueue.progress * 100  >= 100) {
        //   progressBar.hidden = true;
        //   progressBackground.hidden = true;
        //   ldBg.hidden = true;
        // }

      }

      if (this.director.currentScene == 0) {

        // console.log(this.user.authenticated);

        if (this.input.keys[13]) {  // Enter key

          createjs.Sound.play("sword");

          var key = document.getElementById('usernameInput').value;

          var text = {
            "uname": document.getElementById('usernameInput').value,
            "pass": document.getElementById('passwordInput').value
          };

          APIHandler.verifyUser(text, this.user, this.async);

        }

        if (this.user.authenticated) {
          this.director.changeScene(2, this.ecs, this.stage, this.device, this.music, this.user, this.async);
        }

      }

      if (this.director.currentScene == 1) {

        // console.log(this.user.authenticated);

        if (this.input.keys[13]) {
          createjs.Sound.play("sword");
          var key = document.getElementById('usernameInput').value;
          if( /*key in this.database.users ||*/ key == "" ) {
            document.getElementById('errorText').textContent = "Invalid username";
          }	else {
            if(document.getElementById('firstnameInput').value == "") {
              document.getElementById('errorText').textContent = "Invalid firstname";
            } else {
              if(document.getElementById('lastnameInput').value == "") {
                document.getElementById('errorText').textContent = "Invalid lastname";
              } else {
                if(document.getElementById('passwordInput').value == "") {
                  document.getElementById('errorText').textContent = "Invalid password";
                } else {
                  if(document.getElementById('passwordInput').value != document.getElementById('confirmInput').value) {
                    document.getElementById('errorText').textContent = "Passwords do not match";
                  } else {
                    var text = {
                      "uname": document.getElementById('usernameInput').value,
                      "pass": document.getElementById('passwordInput').value,
                      "fname": document.getElementById('firstnameInput').value,
                      "lname": document.getElementById('lastnameInput').value,
                      "confirm": document.getElementById('confirmInput').value
                    };
                    APIHandler.createUser(text, this.user, this.async);
                    this.director.changeScene(2, this.ecs, this.stage, this.device, this.music, this.user, this.async);
                  }
                }
              }
            }
          }
        }

      }

      // Game scene
      if (this.director.currentScene == 3) {

        var y_position = (284 * this.device.scale.y).toString() + "px";
        var x_position = ((window.innerWidth / 2) + (0) * this.device.scale.y).toString() + "px";

        // console.log(x_position);

        var game_entry_form = document.getElementById("equationBanner");
        game_entry_form.style.bottom = y_position;
        game_entry_form.style.right = x_position;
        if (!this.device.device.isMobile) {
          document.getElementById("entryInput").focus();
        }

        y_position = (300 * this.device.scale.y).toString() + "px";
        x_position = ( (window.innerWidth / 2) - (234 + 288 / 2) * this.device.scale.x).toString() + "px";

        // console.log(x_position);

        var game_history_form = document.getElementById("historyBanner");
        game_history_form.style.bottom = y_position;
        game_history_form.style.right = x_position;

      }

      //Calls external function to generate ranges for each level, this is reset when each level is selected on level select

      // Game scene && pause menu
      if (this.director.currentScene == 3 && this.director.level.pause_menu.visible == false) {

        // If the range is not generated
        if(!this.director.level.generated) {
          this.director.generateLevel();
        }

        // Key checks

        // Spacebar to randomize the range
        // if (keys[32]){
          // randomizeRangeAndMultiplier();
        // }

        // console.log(this.input.drag_up);

        // Enter or swipe up to check input
        if ((this.input.keys[13] || this.input.drag_up) && this.director.level.catapult.paused) { // Enter or drag up swipe on mobile
          console.log("Enter Pressed");

          // Reset drag_up bool;
          this.input.drag_up = false;

          this.director.level.runInput(this.device.device.isMobile);
          this.director.clearHtml();
          FormHandler.createGameForm(this.director.level, this.device.device.isMobile);

        }

        // If on mobile
        if (this.device.device.isMobile) {
          // Check which digit is selected and highlight it
          this.director.level.checkSelectedDigit();
        }

        this.director.runAnimations(this.ecs, this.stage, this.music, this.user, this.async, this.device);

        //If game over
        if (this.director.level.hit_counter >= 3 && this.director.level.miss_upper_counter >= 1 && this.director.level.miss_lower_counter >= 1 && this.director.level.reload == false && this.director.level.current_level != 0) {

          // udpate global total
          this.user.hits += this.director.level.hit_counter;
          this.user.highs += this.director.level.miss_upper_counter;
          this.user.lows += this.director.level.miss_lower_counter;

          this.director.level.hit_text.text += this.director.level.hit_counter.toString();
          this.director.level.low_text.text += this.director.level.miss_lower_counter.toString();
          this.director.level.high_text.text += this.director.level.miss_upper_counter.toString();

          this.director.gui.menu_button.visible = false;

          // Show the endgame screen
          this.director.level.createVictoryBanner(this.device.scale.x, this.device.scale.y, this.user.badges, this.user.authenticated);

          this.director.level.visitedLevels[this.director.level.current_level] = true;
          this.user.badges[(this.director.level.current_level - 1)] = 1;

          // update database
          APIHandler.updateStats(
            {
              user: this.user.username,
              hits: this.user.hits,
              highs: this.user.highs,
              lows: this.user.lows,
              badges: this.user.badges
            },
            this.user,
            this.async
          );

          // Also maybe check if boss level is active
          // this.director.level.checkBossFight();
        }

        this.director.runLevelTriggers(this.stage, this.device);

      }

      // Update frame counter for drawing
      // frame_counter++;

      // if (frame_counter > 9) {
      //
      //   this.director.level.reload_counter += frame_counter;
      //   frame_counter = 0;
      //
      // }

      this.stage.update(event);

    },

    preloaded: function(event) {

      this.second_title = new createjs.Bitmap(this.director.loadingQueue.getResult("image"));
      // console.log(this.second_title);
      this.loader.preloaded = true;
      console.log("Preloaded!");
      // OR samething
      // this.director.background.shape = new createjs.Bitmap(images['image']);
      
    }

  }

}

</script>

<style>

</style>
