"map"<template>
  <div id="engineHolder">
    <canvas id="drawingCanvas" :style="style">alternate content</canvas>

    <div id="ldBg" class="ldscreen" hidden>
      <span id="loadingText" hidden>Loading</span>
      <div id="progressBackground" class="bgbar" hidden>
        <div id="progressBar" class="pgbar" hidden></div>
      </div>
      <span id="percentText">Loading</span>
    </div>

    <div id="sceneHTML"></div>

    <!-- <canvas id="changingParametersBasedOnState" :width="w" :height="h" :style="style"></canvas> -->
    <!-- <div id="childThatSendsBackData"> -->
      <!-- <newChild @emittedChildEvent="runParentFunctionOnReturningObject" /> -->
    <!-- </div> -->

  </div>
</template>

<script>

// Static classes
import AssetHandler from '../handlers/AssetHandler.js';
import FormHandler from '../handlers/FormHandler.js';
import APIHandler from '../handlers/APIHandler.js';

// Normal classes
import InputHandler from '../handlers/InputHandler.js';
import MobileHandler from '../handlers/MobileHandler.js';
import SoundHandler from '../handlers/SoundHandler.js';
import GUIHandler from '../handlers/GUIHandler.js';
import LevelHandler from '../handlers/LevelHandler.js';

// Game Data
import constants from '../game_data/constants.js';
import { sceneData, sceneManifest } from '../game_data/scenes.js';
import { levelData } from '../game_data/levels.js';

export default {

  name: 'Engine',

  data () {

    return {

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
        scene_scale_X: 1.0,
        scene_scale_Y: 1.0,
        max_scale_Y: 1440,
        max_scale_X: 1920,
        screen_ratio: 1920 / 1440,
        scene_margin_X: 0.0,
        added: false,
        max_stored: false,
        temp_scale: 1,
        temp_max: 1440
      },
      // Scaling for engine assets

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

    // this.$emit('pushToEcs', entity_object)

    /////////////////////
    // INITIIALIZATION //
    /////////////////////

    this.second_title = {};

    this.preloaded = false;
    this.loaded = false;

    this.menu_loading_queue = new createjs.LoadQueue();
    this.menu_loading_queue.on("progress", this.handleProgress.bind(this));
    // this.menu_loading_queue.onComplete = this.handleComplete;
    this.menu_loading_queue.on("complete", this.handleComplete.bind(this));
    // this.menu_loading_queue.addEventListener("fileload", handleFileComplete);

    this.menu_loading_queue.loadManifest(sceneManifest);

    // Set the window resize function to the one
    window.addEventListener('resize', this.resize, false);

  // Grabbing the canvas to set touch cozntrols
    this.drawingCanvas = document.getElementById("drawingCanvas");

    // Grabbing the div that hold the html stuff
    this.scene_html = document.getElementById("sceneHTML");

    // Initialize all the handlers
    this.input = new InputHandler(this.drawingCanvas);
    this.mobile = new MobileHandler();
    this.music = new SoundHandler();
    this.gui = new GUIHandler();
    this.level = new LevelHandler();

    document.onkeydown = this.input.keyDown.bind(this.input);   // Add keydown listener
    document.onkeyup = this.input.keyUp.bind(this.input);       // Add keyup listener

    // console.log("initialized.");

    this.ecs = []; // Entity component system for scaling and eventually object storage

    // var landscape_warning;

    /////////////
    // SCALING //
    /////////////

    this.max_scale_Y = 1440;
    this.max_scale_X = 1920;

    this.screen_ratio = this.max_scale_X / this.max_scale_Y

    this.scene_margin_X = 0.0;

    this.added = false;

    this.max_stored = false;

    this.temp_scale = 1;
    this.temp_max = 1440

    ////////////
    // SCENES //
    ////////////

    this.scene_html;

    this.current_scene = 10;
    this.last_scene = 0;

    ////////////
    // LEVELS //
    ////////////

    this.levels = [

      { // Tutorial
        open: function () {
          this.indicatorFunction(0);
        }.bind(this)
      },

      { // City
        open: function () {
          this.indicatorFunction(1);
        }.bind(this)
      },

      { // Grasslands
        open: function () {
          this.indicatorFunction(2);
        }.bind(this)
      },

      { // Volcano
        open: function () {
          this.indicatorFunction(3);
        }.bind(this)
      },

      { // Sea
        open: function () {
          this.indicatorFunction(4);
        }.bind(this)
      },

      { // Mountains
        open: function () {
          this.indicatorFunction(5);
        }.bind(this)
      },

      { // Summit
        open: function () {
          this.indicatorFunction(6);
        }.bind(this)
      },

      { // Cave
        open: function () {
          this.indicatorFunction(7);
        }.bind(this)
      },

      { // Forest
        open: function () {
          this.indicatorFunction(8);
        }.bind(this)
      },

      { // Alpine
        open: function () {
          this.indicatorFunction(9);
        }.bind(this)
      },

      { // Woods
        open: function () {
          this.indicatorFunction(10);
        }.bind(this)
      },

      { // Swamp
        open: function () {
          this.indicatorFunction(11);
        }.bind(this)
      },

      { // Deadlands
        open: function () {
          this.indicatorFunction(12);
        }.bind(this)
      },

      { // Sky
        open: function () {
          this.indicatorFunction(13);
        }.bind(this)
      },

      { // Underwater
        open: function () {
          this.indicatorFunction(14);
        }.bind(this)
      },

      { // Fungi
        open: function () {
          this.indicatorFunction(15);
        }.bind(this)
      },

      { // Tundra
        open: function () {
          this.indicatorFunction(16);
        }.bind(this)
      },

      { // Tarpit
        open: function () {
          this.indicatorFunction(17);
        }.bind(this)
      },

      { // Desert
        open: function () {
          this.indicatorFunction(18);
        }.bind(this)
      },

      { // Boreal
        open: function () {
          this.indicatorFunction(19);
        }.bind(this)
      },

      { // Monolith
        open: function () {
          this.indicatorFunction(20);
        }.bind(this)
      }

    ];

    ////////////
    // MOBILE //
    ////////////

    this.phone_rotationS = {

      images: ["res/phone-rotation.png"],
      frames: {width:288, height:288, count:2, regX: 0, regY:0, spacing:0, margin:0},
      framerate: 2

    };

    this.stage = new createjs.Stage('drawingCanvas');           // Stage for drawing pictures and shapes

    createjs.Touch.enable(this.stage);                          // Enable touch interaction for mobile
    this.stage.enableMouseOver();                               // Enable mouse events with scene objects

    createjs.Ticker.setFPS(30);                                 // Set FPS (could be depricated?)
    createjs.Ticker.addEventListener('tick', this.tick);        // Set tisk listener for use as game loop

  },

  methods: {

    tick: function(event) {

      // console.log(this.second_title);
      // this.second_title.x = this.stage.canvas.width / 3;
      if (this.preloaded && !this.loaded) {

        this.bg = new createjs.Shape();                             // Create a rectangle for clearing the screen
        this.bg_color = "#333333";                                  // Background color
        this.stage.addChild(this.bg);                               // Add rectangle to the stage

        this.createScene();                                         // Create scene assets

        this.landscape_warning = new createjs.Shape();

        this.phone_rotation = AssetHandler.createSprite(this.phone_rotationS, 288, 288, "center", 0, "center", 0, "image", this.ecs, this.stage);
        this.stage.removeChild(this.phone_rotation);

        this.resize(); // Resize to set initial scale
        this.loaded = true;

        if(this.menu_loading_queue.progress * 100  >= 100) {

          progressBar.hidden = true;
          progressBackground.hidden = true;
          ldBg.hidden = true;

        }

      }

      if (this.current_scene == 0) {

        // console.log(this.user.authenticated);

        if (this.input.keys[13]) {

          createjs.Sound.play("sword");

          var key = document.getElementById('usernameInput').value;

          var text = {
            "uname": document.getElementById('usernameInput').value,
            "pass": document.getElementById('passwordInput').value
          };

          APIHandler.verifyUser(text, this.user, this.async);

        }

        if (this.user.authenticated) {
          this.changeScene(2);
        }

      }

      if (this.current_scene == 1) {

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
                    this.changeScene(2);
                  }
                }
              }
            }
          }
        }

      }

      if (this.current_scene == 3) {

        var y_position = (284 * this.scale.scene_scale_Y).toString() + "px";
        var x_position = ((window.innerWidth / 2) + (0) * this.scale.scene_scale_Y).toString() + "px";

        // console.log(x_position);

        var game_entry_form = document.getElementById("equationBanner");
        game_entry_form.style.bottom = y_position;
        game_entry_form.style.right = x_position;
        if (!this.mobile.isMobile) {
          document.getElementById("entryInput").focus();
        }

        y_position = (300 * this.scale.scene_scale_Y).toString() + "px";
        x_position = ( (window.innerWidth / 2) - (234 + 288 / 2) * this.scene_scale_X).toString() + "px";

        // console.log(x_position);

        var game_history_form = document.getElementById("historyBanner");
        game_history_form.style.bottom = y_position;
        game_history_form.style.right = x_position;

      }

      //Calls external function to generate ranges for each level, this is reset when each level is selected on level select

      if (this.current_scene == 3 && this.level.pause_menu.visible == false) {

        // If the range is not generated
      	if(!this.level.generated) {

          // Generate the range
      		this.level.level_math[this.level.current_level].math();

          this.level.clearMultiplicandBanner();

          this.level.remakeMultiplierBanner();
          this.level.remakeRangeBanner();

      		this.level.generated = true;

      	}

        // Key checks at the beginning of the update loop
        // Spacebar to randomize the range
        // if (keys[32]){
          // randomizeRangeAndMultiplier();
        // }

        // console.log(this.input.drag_up);

        // Enter or swipe up to check input
        if ((this.input.keys[13] || this.input.drag_up) && this.level.catapult.paused) { // Enter or drag up swipe on mobile
          console.log("Enter Pressed");

          // Reset drag_up bool;
          this.input.drag_up = false;

          this.level.runInput(this.mobile.isMobile);
          this.clearHtml();
          FormHandler.createGameForm(this.level.multiplicand, this.level.sign, this.level.equal, this.level.solution, this.level.history_list2, this.level.play_tutorial, this.mobile.isMobile);

        }

        // If on mobile
        if (this.mobile.isMobile) {
          // Check which digit is selected and highlight it
          this.level.checkSelectedDigit();
        }

        // Run through and finish animations that play once
        this.level.updateSinglePlayAnimations();

        // Check for hit and miss and then run thier animations
        this.level.runHitAnimations();
        this.level.runMissAnimations( function() { createjs.Sound.play("menu"); this.changeScene(9); }.bind(this) );

        // Check to see if the tutorial should be displayed
        this.level.checkTutorial();

        //If game over
        if (this.level.hit_counter >= 3 && this.level.miss_upper_counter >= 1 && this.level.miss_lower_counter >= 1 && this.level.reload == false && this.level.current_level != 0) {

          // udpate global total
          this.user.hits += this.level.hit_counter;
          this.user.highs += this.level.miss_upper_counter;
          this.user.lows += this.level.miss_lower_counter;

          this.level.hit_text.text += this.level.hit_counter.toString();
          this.level.low_text.text += this.level.miss_lower_counter.toString();
          this.level.high_text.text += this.level.miss_upper_counter.toString();

          this.gui.menu_button.visible = false;

          // Show the endgame screen
          this.level.createVictoryBanner(this.scene_scale_X, this.scale.scene_scale_Y, this.user.badges, this.user.authenticated);

	        this.user.badges[(this.level.current_level - 1)] = 1;

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
          // this.level.checkBossFight();
        }

        // Hide bad guys when hit
        this.level.hideBadGuys();

        // Check if towers are down
        this.level.towerAnimation();

        // Run the catapult animation
        this.level.runCatapultAnimation(this.scale.scene_scale_Y);

        // Reload the catapult
        this.level.reloadCatapult(this.stage, this.scale.scene_scale_Y)

      }

      // Update frame counter for drawing
      // frame_counter++;

      // if (frame_counter > 9) {
        //
        // this.level.reload_counter += frame_counter;
        // frame_counter = 0;
        //
      // }

      this.stage.update(event);

    },

    handleComplete: function(event) {
      this.second_title = new createjs.Bitmap(this.menu_loading_queue.getResult("image"));
      // console.log(this.second_title);
      this.preloaded = true;
      console.log("Loaded!");
      //OR samething
      //var bg = new createjs.Bitmap(images['image']);
    },

    /////////////
    // SCALING //
    /////////////

    // Scale the stage
    resize: function() {

      this.mobile.mobileCheck(console, navigator);
      this.mobile.orientationCheck(console, window);

      // If window height is greater than width
      if (this.mobile.isPortrait && this.mobile.isMobile) {

        if(!this.added) {

          this.stage.addChild(this.landscape_warning);
          this.stage.addChild(this.phone_rotation);
          this.landscape_warning.graphics.clear()
          this.landscape_warning.graphics.beginFill("#000000").drawRect(0, 0, this.stage.canvas.width, this.stage.canvas.height);
          this.phone_rotation.gotoAndPlay(0);
          this.scene_html = document.getElementById("sceneHTML");
          this.scene_html.hidden = true;
          this.added = true;

        }

      } else {

        if(this.added){

          this.stage.removeChild(this.landscape_warning);
          this.stage.removeChild(this.phone_rotation);
          this.scene_html = document.getElementById("sceneHTML");
          this.scene_html.hidden = false;
          this.added = false;

        }

      }

      // Resize the canvas element with new window size
      this.stage.canvas.width = window.innerWidth;
      this.stage.canvas.height = window.innerHeight;

      this.screen_ratio = this.stage.canvas.width / this.stage.canvas.height;

      if (window.innerWidth < 600) {
        // gui_scale = 3;
      } else if (window.innerWidth < 900) {
        // gui_scale = 2;
      } else {
        // gui_scale = 1;
      }

      // Redraw background before everthing else for Z-axis reasons
      this.bg.graphics.clear()
      this.bg.graphics.beginFill(this.bg_color).drawRect(0, 0, this.stage.canvas.width, this.stage.canvas.height);

      // Calculate the scene scaling
      if (this.screen_ratio < 2.5) { // tall screen

        this.max_stored = false;
        this.scene_scale_X = this.stage.canvas.width / this.max_scale_X;
        this.scale.scene_scale_Y = this.stage.canvas.width / this.max_scale_X;

      } else if (this.screen_ratio > 2.5) { // wide screen
        if(!this.max_stored) {
          this.max_stored = true;
          this.temp_max = this.stage.canvas.height;
        }
        this.temp_scale = this.stage.canvas.width / this.max_scale_X;
        this.scene_scale_X = this.temp_scale * ( this.stage.canvas.height / this.temp_max );
        this.scale.scene_scale_Y = this.temp_scale * ( this.stage.canvas.height / this.temp_max );
      }

      // Calculate the scene margin in a given direction
      this.scene_margin_X = ( this.stage.canvas.width - this.max_scale_X ) / 2;

      // Log screen scaling for debugging purposes
      // console.log(this.scene_scale_X);
      // console.log(this.scale.scene_scale_Y);
      console.log(this.screen_ratio);

      this.landscape_warning.graphics.clear()
      this.landscape_warning.graphics.beginFill("#000000").drawRect(0, 0, this.stage.canvas.width, this.stage.canvas.height);

      if (this.current_scene == 3) {
        AssetHandler.scaleAssets(this.level.lcs, this.current_scene, this.mobile.isMobile, this.scale.scene_scale_Y, this.scene_scale_X, this.stage); // Scale scene appropriately
      } // else {
        AssetHandler.scaleAssets(this.ecs, this.current_scene, this.mobile.isMobile, this.scale.scene_scale_Y, this.scene_scale_X, this.stage); // Scale scene appropriately
      // }
      // this.scaleAssets(this.gcs, this.current_scene, this.mobile.isMobile, this.scale.scene_scale_Y, this.scene_scale_X, this.stage); // Scale scene appropriately

      this.stage.update()

    },

    ////////////
    // SCENES //
    ////////////

    // Load the scene in the variable current_scene
    loadCurrentScene: function() {

      // Load background color for the scene
      this.bg_color = sceneData[this.current_scene].color;

      // If the current scene is the game load the special level assets
      if (this.current_scene == 3) {

          this.bg_color = levelData[this.level.current_level].color;

          if (!this.level.generated) {

            this.level.loadLevel();

          } else {

            FormHandler.createGameForm(this.level.multiplicand, this.level.sign, this.level.equal, this.level.solution, this.level.history_list2, this.level.play_tutorial, this.mobile.isMobile);
            this.level.remakeMultiplierBanner();
            this.level.remakeRangeBanner();

          }

      }

      // Clear HTML before creating a new scene
      this.clearHtml();

      // Destroy the last scene
      this.destroyScene();

      // Create the new scene
      this.createScene();

      // this.level.visibleForm(true);

      // Resize everything for scaling
      this.resize();

    },

    changeScene: function(new_scene) {

      // Set the current scene to the new scene

      this.last_scene = this.current_scene;
      this.current_scene = new_scene;
      console.log("Last Scene: " + this.last_scene);
      console.log("Current Scene: " + this.current_scene);

      // Load the scene
      this.loadCurrentScene();

    },

    createScene: function() {

      this.stage.addChild(this.bg);
      this.bg.graphics.clear()
      this.bg.graphics.beginFill(this.bg_color).drawRect(0, 0, this.stage.canvas.width, this.stage.canvas.height);

      this.background = AssetHandler.createImage(this.menu_loading_queue.getResult(sceneData[this.current_scene].bg_img), constants.backgroundX, 1440, "center", 0, "center", 0, "image", this.ecs, this.stage);
      this.background_top = AssetHandler.createImage(this.menu_loading_queue.getResult(sceneData[this.current_scene].bg_img), constants.backgroundX, 1440, "center", 0, "center", -1440, "image", this.ecs, this.stage);
      this.background_bottom = AssetHandler.createImage(this.menu_loading_queue.getResult(sceneData[this.current_scene].bg_img), constants.backgroundX, 1440, "center", 0, "center", 1440, "image", this.ecs, this.stage);
      this.background_left = AssetHandler.createImage(this.menu_loading_queue.getResult(sceneData[this.current_scene].bg_img), constants.backgroundX, 1440, "center", -constants.backgroundX, "center", 0, "image", this.ecs, this.stage);
      this.background_right = AssetHandler.createImage(this.menu_loading_queue.getResult(sceneData[this.current_scene].bg_img), constants.backgroundX, 1440, "center", constants.backgroundX, "center", 0, "image", this.ecs, this.stage);

      switch (this.current_scene) {

        case 0:
          // scenes[this.current_scene].fg_text] = "Login:\n\nSignup:\n\n";
          sceneData[this.current_scene].fg_text = "";
          break;
        case 1:
          // scenes[this.current_scene].fg_text = "Firstname:\n\nLastname:\n\nUsername:\n\nPassword:\n\nConfirm:\n\n";
          sceneData[this.current_scene].fg_text = "";
          break;
        case 4:
          sceneData[this.current_scene].fg_text = "";
          break;
        case 5:
          sceneData[this.current_scene].fg_text = "How To Play: The goal of the game is to get one hit anywhere above the range, one hit anywhere below the range, and three hits within the range";
          break;
        case 6:
          // scenes[this.current_scene].fg_text = "Volume:\n\nTime:\n\nTutorial\n\n";
          sceneData[this.current_scene].fg_text = "";
          break;
        case 7:
          sceneData[this.current_scene].fg_text = "Username: " + this.user.username + "\n\nName: " + this.user.firstname + " " + this.user.lastname + "\n\n";
          break;
        case 9:
          sceneData[this.current_scene].fg_text = levelData[this.level.current_level].hint;
          break;
        default:

      }

      if (this.current_scene != 8 && this.current_scene != 2 && this.current_scene != 3 && this.current_scene != 10) {
        var temp_fg_img = {
          images: [this.menu_loading_queue.getResult(sceneData[this.current_scene].fg_img.images[0])],
          frames: sceneData[this.current_scene].fg_img.frames,
          framerate: sceneData[this.current_scene].fg_img.framerate
        };
        this.foreground = AssetHandler.createTextContainer(temp_fg_img, sceneData[this.current_scene].fg_text, "Oldstyle", "32px", "normal", "Saddlebrown", sceneData[this.current_scene].fg_img.frames.width, sceneData[this.current_scene].fg_img.frames.height, "center", 0, "center", 0, "image", 0, this.ecs, this.stage);
      } else if (this.current_scene == 10) {
        this.foreground = AssetHandler.createImage(this.menu_loading_queue.getResult("title-text"), 1635, 480, "center", 0, "top", 48 + 480 / 2, "image", this.ecs, this.stage);
      } else if (this.current_scene == 8) {
        this.midground = AssetHandler.createImage(this.menu_loading_queue.getResult("map"), constants.backgroundX, constants.backgroundY, "center", 0, "center", 0, "image", this.ecs, this.stage);
        this.foreground = AssetHandler.createButton(this.menu_loading_queue.getResult("map-banner"), "Select a level", constants.backgroundX, 108, "center", 0, "top", 0 + (108/2), "image", function() {}.bind(this), this.ecs, this.stage);
      }

      if (this.current_scene == 2) {
        this.background = AssetHandler.createImage(this.menu_loading_queue.getResult("menu"), constants.backgroundX, constants.backgroundY, "center", 0, "bottom", -constants.backgroundY / 2, "image", this.ecs, this.stage);
        this.background_left = AssetHandler.createImage(this.menu_loading_queue.getResult("menu-left"), constants.backgroundX, constants.backgroundY, "center", 0 - (constants.backgroundX), "bottom", -constants.backgroundY / 2, "image", this.ecs, this.stage);
        this.background_right = AssetHandler.createImage(this.menu_loading_queue.getResult("menu-right"), constants.backgroundX, constants.backgroundY, "center", 0 + (constants.backgroundX), "bottom", -constants.backgroundY / 2, "image", this.ecs, this.stage);
      }

      // Custom scene functionalities
      switch (this.current_scene) {

        case 0: // Login

          FormHandler.createLoginForm();

          break;

        case 1: // Signup

          FormHandler.createSignupForm();

          break;

        case 3: // Game

          FormHandler.createGameForm(
            this.level.multiplicand,
            this.level.sign,
            this.level.equal,
            this.level.solution,
            this.level.history_list2,
            this.level.play_tutorial,
            this.mobile.isMobile
          );

          this.level.createLevel(this.stage,
            function() { createjs.Sound.play("select"); this.changeScene(8); this.level.visibleForm(true); this.level.destroyLevel(this.stage); }.bind(this),
            function() { createjs.Sound.play("sword"); this.changeScene(9); this.level.visibleForm(true); }.bind(this),
            function() { createjs.Sound.play("menu"); this.changeScene(2); this.level.visibleForm(true); this.level.destroyLevel(this.stage); }.bind(this),
            function() { createjs.Sound.play("menu"); this.changeScene(6); this.level.visibleForm(true); }.bind(this),
            this.user.authenticated,
            function() { this.gui.menu_button.visible = true; }.bind(this),
            this.music
          );

          break;

        case 6: // Settings

          FormHandler.createSettingsForm(
            this.level.boss_fight,
            this.level.play_tutorial,
            this.level.setTutorial,
            this.level.setBoss,
            this.music.setVolume
          );

          break;

      }

      this.gui.createGUI(this.ecs, this.current_scene, this.stage, this.user, this.async, this.changeScene, this.oneWayScene, this.indicatorFunction, this.level, this.mobile, this.gui.menu_button, this.levels, this.scale);

      // console.log(entity_component_system);

    },

    oneWayScene: function() {

      // Switch the current and last screen
      var temp = this.current_scene;
      this.current_scene = this.last_scene;
      this.last_scene = temp;

      // Load the scene
      this.loadCurrentScene();

      // If the last scene was the game open with the pause screen
      if (this.last_scene == 3) {

        this.gui.menu_button.visible = false;

        this.level.openPauseMenu(this.user.authenticated);

        // this.level.pauseAnimation(true);
        // this.level.visibleButton(true);
        // this.level.visibleForm(false);

      } else if (this.current_scene == 3) {

        this.gui.menu_button.visible = true;
        FormHandler.createGameForm(this.level.multiplicand, this.level.sign, this.level.equal, this.level.solution, this.level.history_list2, this.level.play_tutorial, this.mobile.isMobile);
        this.level.remakeMultiplierBanner();
        this.level.remakeRangeBanner();
        this.level.structure_score.text = "Total Lows: " + this.level.miss_lower_counter.toString() + "\nTotal High: " + this.level.miss_upper_counter.toString() + "\nTotal Hits: " + this.level.hit_counter.toString();

      }

    },

    destroyScene: function() {

      this.stage.removeAllChildren();

      this.ecs = [];

    },

    clearHtml: function() {

      this.scene_html = document.getElementById("sceneHTML");

      while (this.scene_html.firstChild) {

        this.scene_html.removeChild(this.scene_html.firstChild);

      }

    },

    indicatorFunction: function(newL) {

      this.level.generated = false;
      createjs.Sound.play("select");
      this.level.current_level = newL;
      this.level.resetLevel();
      this.changeScene(3);

    },

    //Loadbar for loading screen
    handleProgress: function(evt) {

      var progbar = document.getElementById("progressBar");
      var perctext = document.getElementById("percentText");
      var loadtext = document.getElementById("loadingText");
      progressBar.hidden = false;
      progressBackground.hidden = false;
      ldBg.hidden = false;

      loadtext.hidden = false;

      progbar.style.width = this.menu_loading_queue.progress * 100 + '%';
      perctext.innerHTML = (Math.floor(this.menu_loading_queue.progress * 100)).toString() + '%';

    }



  }

}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

.ldscreen {

  /* Position */
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;

  /* Properties */
  height: 100%;
  width: 100%;
  background-color: #919191;
	z-index: 2;

}

.bgbar {

  /* Position */
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;

  /* Properties */
  background-color: LightGray;
  height: 50px;
  width: 90%;
	z-index: 2;

}

.pgbar {

  /* Position */
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;

  /* Properties */
  background-color: Gold;
  height: 100%;
  width: 100%;
	z-index: 2;

}

#loadingText {

  /* Position */
  position: absolute;
  transform: translate(-50%, -50%);
  top: 30%;
  left: 50%;

  /* Properties */
  font-family: "Blackadder";
  font-size: 15vh;
  z-index: 2;
  color: Gold;

}

#percentText {

  /* Position */
  position: absolute;
  transform: translate(-50%, -50%);
  top: 70%;
  left: 50%;

  /* Properties */
  font-family: "Oldstyle";
  font-size: 10vh;
  z-index: 2;
  color: Gold;

}

</style>
