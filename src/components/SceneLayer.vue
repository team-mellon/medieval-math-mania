<template>

  <div id="sceneLayer">

    <Loader :loading-manifest="manifest" @loaded="preloaded" ref="loader" />

  </div>

</template>

<script>

  // Modules
  import Loader from './Loader.vue';

  // 
  import AssetHandler from '../handlers/AssetHandler.js';

  // Scene Modules
  import GUIHandler from '../handlers/GUIHandler.js';
  import LevelHandler from '../handlers/LevelHandler.js';
  import SoundHandler from '../handlers/SoundHandler.js';

  // Static classes
  import FormHandler from '../handlers/FormHandler.js';
  import APIHandler from '../handlers/APIHandler.js';

  // Game Data
  import constants from '../game_data/constants.js';
  import { sceneData, sceneManifest } from '../game_data/scenes.js';
  import { levelData } from '../game_data/levels.js';

  // Models
  import ObjectConfig from '../structures/ObjectConfig'

  export default {

    name: 'SceneLayer',
    components: {

      Loader

    },
    props: {

      input: Object,
      scale: Object,
      device: Object,

    },
    data () {
      return {

        config: {
          canvasId: 'drawingCanvas',
        },

        sceneCreated: false,
        manifest: [],

        // Authentication handling
        async: {
          error: ''
        },

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

        // Enable mouse events with scene objects
        // ???
        second_title: null,

        //
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
        midground: null,
        foreground: null,

      }
    },

    /**
     * Constructor for the scaling component of the engine.
     * @constructor
     */
    mounted: function() {

      // Stage for drawing pictures and shapes
      this.stage = new createjs.Stage(this.config.canvasId);

      this.manifest = sceneManifest;

      this.sceneComponentSystem = []; // Scene component system for scaling and eventually object storage
      // ecs: [], // Entity component system for scaling and eventually object storage

      this.loadingQueue = new createjs.LoadQueue();
      this.loadingQueue.loadManifest(sceneManifest);

      this.added = false;

      // Landscape warning backdrop
      this.landscape_warning = new createjs.Shape();

      this.phone_rotation = null;

      // Phone rotation sprite variable
      this.phone_rotationS = {
        images: ["res/phone-rotation.png"],
        frames: {width:288, height:288, count:2, regX: 0, regY:0, spacing:0, margin:0},
        framerate: 2
      };

      this.gui = new GUIHandler();
      this.level = new LevelHandler();
      this.sound = new SoundHandler();

      // Grabbing the div that hold the html forms.
      this.sceneHtml = document.getElementById("sceneHTML");

      this.currentScene = 10;
      this.lastScene = 0;

      // Ticker to run game loop
      createjs.Ticker.setFPS(30);                                 // Set FPS (could be depricated?)
      createjs.Ticker.addEventListener('tick', this.tick);        // Set tisk listener for use as game loop

    },

    methods: {

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

      tick: function(event) {

        //  If the assets are loaded and the scene is not created...
        if (this.$refs.loader.loaded && !this.sceneCreated) {

          // Create the first 'currentScene'
          this.createScene(); // Create scene assets

          // Rescale the view to size the scene to the device.
          this.$emit('resize', 'resize')
          // this.resize(); // Resize to set initial scale

          // Set the loaded flag.
          this.sceneCreated = true;

        }

        // Run the scene.
        this.runScene();

        // Update the stage.
        this.stage.update(event);

      },

      /**
       * Callback to run after assets are preloaded.
       */
      preloaded: function(event) {

      },

      /**
       * Function to run the current scene.
       */
      runScene: function() {

          // // ???
          // text: ''

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

        // else if(key == "0" || key == "1" || key == "2" || key == "3" || key == "4" || key == "5" || key == "6" || key == "7" || key == "8" || key == "9" || key == ".") {
        // 	if(param.length < 3) {
        // 		param += key;
        // 		text1.text = param;
        // 		input = parseInt(param);
        // 	}
        // }

        if (this.currentScene == 0) {

          // console.log(this.user.authenticated);

          if (this.$props.input.keys[13]) {  // Enter key

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

        if (this.currentScene == 1) {

          // console.log(this.user.authenticated);

          if (this.$props.input.keys[13]) {
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

        // Game scene
        if (this.currentScene == 3) {

          this.runGame();

        }

        // Update frame counter for drawing
        // frame_counter++;

        // if (frame_counter > 9) {
        //
        //   this.level.reload_counter += frame_counter;
        //   frame_counter = 0;
        //
        // }

      },

      /**
       * Calculate the scene scaling.
       * @param {object} stage - The stage that displays the content.
       */

      /**
       * Function to scale the image-like assets.
       * @param {object} entityComponentSystem - The array of entities.
       */
      generateLevel: function() {

        // Generate the range
        this.level.level_math[this.level.current_level].math();

        this.level.clearMultiplicandBanner();

        this.level.remakeMultiplierBanner();
        this.level.remakeRangeBanner();

        this.level.generated = true;

      },

      runGame() {

        var y_position = (284 * this.$props.scale.y).toString() + "px";
        var x_position = ((window.innerWidth / 2) + (0) * this.$props.scale.y).toString() + "px";

        // console.log(x_position);

        var game_entry_form = document.getElementById("equationBanner");
        game_entry_form.style.bottom = y_position;
        game_entry_form.style.right = x_position;
        if (!this.$props.device.isMobile) {
          document.getElementById("entryInput").focus();
        }

        y_position = (300 * this.$props.scale.y).toString() + "px";
        x_position = ( (window.innerWidth / 2) - (234 + 288 / 2) * this.$props.scale.x).toString() + "px";

        // console.log(x_position);

        var game_history_form = document.getElementById("historyBanner");
        game_history_form.style.bottom = y_position;
        game_history_form.style.right = x_position;

        //Calls external function to generate ranges for each level, this is reset when each level is selected on level select

        // Game not paused...
        if (this.level.pause_menu.visible == false) {

          this.gameNotPaused();

        }

      },

      gameNotPaused: function() {

        // If the range is not generated
        if(!this.level.generated) {
          this.generateLevel();
        }

        // Key checks

        // Spacebar to randomize the range
        // if (keys[32]){
          // randomizeRangeAndMultiplier();
        // }

        // console.log(this.$props.input.drag_up);

        // Enter or swipe up to check input
        if ((this.$props.input.keys[13] || this.$props.input.drag_up) && this.level.catapult.paused) { // Enter or drag up swipe on mobile
          console.log("Enter Pressed");

          // Reset drag_up bool;
          this.$props.input.drag_up = false;

          this.level.runInput(this.$props.device.isMobile);
          this.clearHtml();
          FormHandler.createGameForm(this.level);

        }

        // If on mobile...
        if (this.$props.device.isMobile) {

          // Check which digit is selected and highlight it
          this.level.checkSelectedDigit();

        }

        this.runAnimations();

        //If game over...
        if (this.level.hit_counter >= 3 && this.level.miss_upper_counter >= 1 && this.level.miss_lower_counter >= 1 && this.level.reload == false && this.level.current_level != 0) {

          this.runGameOverSequemce(device);

        }

        this.runLevelTriggers(device);

      },

      runAnimations: function() {

        // Run through and finish animations that play once
        this.level.updateSinglePlayAnimations();

        // Check for hit and miss and then run thier animations
        this.level.runHitAnimations();
        this.level.runMissAnimations( function() {
          createjs.Sound.play("menu");
          this.changeScene(9);
        }.bind(this) );

      },

      runGameOverSequence: function(device) {

        // udpate global total
        this.user.hits += this.level.hit_counter;
        this.user.highs += this.level.miss_upper_counter;
        this.user.lows += this.level.miss_lower_counter;

        this.level.hit_text.text += this.level.hit_counter.toString();
        this.level.low_text.text += this.level.miss_lower_counter.toString();
        this.level.high_text.text += this.level.miss_upper_counter.toString();

        this.gui.menu_button.visible = false;

        // Show the endgame screen
        this.level.createVictoryBanner(this.$props.scale.x, this.$props.scale.y, this.user.badges, this.user.authenticated);

        this.level.visitedLevels[this.level.current_level] = true;
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

      },

      runLevelTriggers: function(device) {

        // Check to see if the tutorial should be displayed
        this.level.checkTutorial();

        // Hide bad guys when hit
        this.level.hideBadGuys();

        // Check if towers are down
        this.level.towerAnimation();

        // Run the catapult animation
        this.level.runCatapultAnimation(this.$props.scale.y);

        // Reload the catapult
        this.level.reloadCatapult(this.stage, this.$props.scale.y)

      },

      /**
       * Function to snap items to the edges of screen.
       */
      createScene: function() {

        // Set the background color to a neutral color
        this.setBackgroundColor("#333333");

        this.stage.addChild(this.background.shape);
        this.background.shape.graphics.clear()
        this.background.shape.graphics.beginFill(this.background.color).drawRect(0, 0, this.stage.canvas.width, this.stage.canvas.height);

        this.setBackground();

        this.setForegroundText();
        this.setForeground();

        this.runCustomCode();

        this.gui.createGUI(this.sceneComponentSystem, this, this.stage, this.user, this.async, this.gui.menu_button);

        // console.log(entity_component_system);

      },

      refreshScene: function() {

        this.loadOrientationAnimation()

        // Redraw background before everthing else for Z-axis reasons
        this.redrawBackground();

        // If window height is greater than width
        this.setOrientationAnimation()
        
        this.resizeCanvas();

      },

      /**
       * Function to load animation to indicate rong orientation of the device.
       */
      loadOrientationAnimation: function() {

        // Load the phone rotation picture but remove it from the stage.
        let config = new ObjectConfig('default', 'image', 288, 288, "center", 0, "center", 0);
        this.phone_rotation = AssetHandler.createSprite(this.phone_rotationS, config, this.sceneComponentSystem, this.stage);
        this.stage.removeChild(this.phone_rotation);

      },

      redrawBackground: function() {

        // Redraw background before everthing else for Z-axis reasons
        this.background.shape.graphics.clear()
        this.background.shape.graphics.beginFill(this.background.color).drawRect(0, 0, this.stage.canvas.width, this.stage.canvas.height);

      },

      resizeCanvas: function() {

        // Resize the canvas element with new window size
        this.stage.canvas.width = window.innerWidth;
        this.stage.canvas.height = window.innerHeight;

      },

      setOrientationAnimation: function() {

        if (this.$props.device) {

          // If window height is greater than width
          if (this.$props.device.isMobile && this.$props.device.isPortrait) {

            if(!this.added) {

              this.stage.addChild(this.landscape_warning);
              this.stage.addChild(this.phone_rotation);
              this.landscape_warning.graphics.clear()
              this.landscape_warning.graphics.beginFill("#000000").drawRect(0, 0, this.stage.canvas.width, this.stage.canvas.height);
              this.phone_rotation.gotoAndPlay(0);
              this.sceneHtml = document.getElementById("sceneHTML");
              this.sceneHtml.hidden = true;
              this.added = true;

            }

          } else {

            if(this.added){

              this.stage.removeChild(this.landscape_warning);
              this.stage.removeChild(this.phone_rotation);
              this.sceneHtml = document.getElementById("sceneHTML");
              this.sceneHtml.hidden = false;
              this.added = false;

            }

          }

        }

      },

      setForegroundText: function() {

        switch (this.currentScene) {

          case 0:
            // scenes[this.currentScene].fg_text] = "Login:\n\nSignup:\n\n";
            sceneData[this.currentScene].fg_text = "";
            break;
          case 1:
            // scenes[this.currentScene].fg_text = "Firstname:\n\nLastname:\n\nUsername:\n\nPassword:\n\nConfirm:\n\n";
            sceneData[this.currentScene].fg_text = "";
            break;
          case 4:
            sceneData[this.currentScene].fg_text = "";
            break;
          case 5:
            sceneData[this.currentScene].fg_text = "How To Play: The goal of the game is to get one hit anywhere above the range, one hit anywhere below the range, and three hits within the range";
            break;
          case 6:
            // scenes[this.currentScene].fg_text = "Volume:\n\nTime:\n\nTutorial\n\n";
            sceneData[this.currentScene].fg_text = "";
            break;
          case 7:
            sceneData[this.currentScene].fg_text = "Username: " + this.user.username + "\n\nName: " + this.user.firstname + " " + this.user.lastname + "\n\n";
            break;
          case 9:
            sceneData[this.currentScene].fg_text = levelData[this.level.current_level].hint;
            break;
          default:

        }

      },

      // Load the scene in the variable currentScene
      setBackgroundColor: function(color) {
        
        // Create a rectangle for clearing the screen
        this.background.shape = new createjs.Shape();
        
        // Set background color to grey
        this.background.color = color;

        // 
        this.background.shape.graphics.clear()
        this.background.shape.graphics.beginFill(this.background.color).drawRect(0, 0, this.stage.canvas.width, this.stage.canvas.height);

        // Add rectangle to the stage
        this.stage.addChild(this.background.shape);

      },

      setBackground: function() {

        let config;

        config = new ObjectConfig('default', 'image', constants.backgroundX, 1440, "center", 0, "center", 0);
        this.background.center = AssetHandler.createImage(this.loadingQueue.getResult(sceneData[this.currentScene].bg_img), config, this.sceneComponentSystem, this.stage);

        config = new ObjectConfig('default', 'image', constants.backgroundX, 1440, "center", 0, "center", -1440);
        this.background.up = AssetHandler.createImage(this.loadingQueue.getResult(sceneData[this.currentScene].bg_img), config, this.sceneComponentSystem, this.stage);
        
        config = new ObjectConfig('default', 'image', constants.backgroundX, 1440, "center", 0, "center", 1440);
        this.background.down = AssetHandler.createImage(this.loadingQueue.getResult(sceneData[this.currentScene].bg_img), config, this.sceneComponentSystem, this.stage);
        
        config = new ObjectConfig('default', 'image', constants.backgroundX, 1440, "center", -constants.backgroundX, "center", 0);
        this.background.left = AssetHandler.createImage(this.loadingQueue.getResult(sceneData[this.currentScene].bg_img), config, this.sceneComponentSystem, this.stage);
        
        config = new ObjectConfig(constants.backgroundX, 1440, "center", constants.backgroundX, "center", 0);
        this.background.right = AssetHandler.createImage(this.loadingQueue.getResult(sceneData[this.currentScene].bg_img), config, this.sceneComponentSystem, this.stage);

      },

      setForeground: function() {

        let config;

        if (this.currentScene != 8 && this.currentScene != 2 && this.currentScene != 3 && this.currentScene != 10) {

          let temp_fg_img = {
            images: [this.loadingQueue.getResult(sceneData[this.currentScene].fg_img.images[0])],
            frames: sceneData[this.currentScene].fg_img.frames,
            framerate: sceneData[this.currentScene].fg_img.framerate
          };

          config = new ObjectConfig('default', 'image', sceneData[this.currentScene].fg_img.frames.width, sceneData[this.currentScene].fg_img.frames.height, "center", 0, "center", 0);
          this.foreground = AssetHandler.createTextContainer(temp_fg_img, sceneData[this.currentScene].fg_text, getComputedStyle(document.documentElement).getPropertyValue('--primary-font'), "32px", "normal", "Saddlebrown", config, 0, this.sceneComponentSystem, this.stage);

        } else if (this.currentScene == 10) {

          config = new ObjectConfig('default', 'image', 1635, 480, "center", 0, "top", 48 + 480 / 2);
          this.foreground = AssetHandler.createImage(this.loadingQueue.getResult("title-text"), config, this.sceneComponentSystem, this.stage);

        } else if (this.currentScene == 8) {

          config = new ObjectConfig('default', 'image', constants.backgroundX, constants.backgroundY, "center", 0, "center", 0);
          this.midground = AssetHandler.createImage(this.loadingQueue.getResult("map"), config, this.sceneComponentSystem, this.stage);

          config = new ObjectConfig('default', 'gui', constants.backgroundX, 108, "center", 0, "top", 0 + (108/2));
          this.foreground = AssetHandler.createButton(this.loadingQueue.getResult("map-banner"), "Select a level", config, function() {}.bind(this), this.sceneComponentSystem, this.stage);

        }

        if (this.currentScene == 2) {

          config = new ObjectConfig('default', 'image', constants.backgroundX, constants.backgroundY, "center", 0, "bottom", -constants.backgroundY / 2);
          this.background.center = AssetHandler.createImage(this.loadingQueue.getResult("menu"), config, this.sceneComponentSystem, this.stage);
          
          config = new ObjectConfig('default', 'image', constants.backgroundX, constants.backgroundY, "center", 0 - (constants.backgroundX), "bottom", -constants.backgroundY / 2);
          this.background.left = AssetHandler.createImage(this.loadingQueue.getResult("menu-left"), config, this.sceneComponentSystem, this.stage);
          
          config = new ObjectConfig('default', 'image', constants.backgroundX, constants.backgroundY, "center", 0 + (constants.backgroundX), "bottom", -constants.backgroundY / 2);
          this.background.right = AssetHandler.createImage(this.loadingQueue.getResult("menu-right"), config, this.sceneComponentSystem, this.stage);

        }

      },

      runCustomCode: function() {

        // Custom scene functionalities
        switch (this.currentScene) {

          case 0: // Login
            FormHandler.createLoginForm();
            break;

          case 1: // Signup
            FormHandler.createSignupForm();
            break;

          case 3: // Game
            FormHandler.createGameForm(this.level);
            this.level.createLevel(this.stage,
              function() { createjs.Sound.play("select"); this.changeScene(8); this.level.visibleForm(true); this.level.destroyLevel(this.stage); }.bind(this),
              function() { createjs.Sound.play("sword"); this.changeScene(9); this.level.visibleForm(true); }.bind(this),
              function() { createjs.Sound.play("menu"); this.changeScene(2); this.level.visibleForm(true); this.level.destroyLevel(this.stage); }.bind(this),
              function() { createjs.Sound.play("menu"); this.changeScene(6); this.level.visibleForm(true); }.bind(this),
              this.user.authenticated,
              function() { this.gui.menu_button.visible = true; }.bind(this),
              this.sound
            );
            break;

          case 6: // Settings
            FormHandler.createSettingsForm(this.level, this.sound.setVolume);
            break;

        }
        
      },

      /**
       * Function to load the current scene.
       * @param {object} entityComponent - The the current entity being scaled.
       * @returns {object} platformScale - The platform specific scale of that entity.
       */
      loadCurrentScene: function() {

        // Clear HTML before creating a new scene
        this.clearHtml();

        // Destroy the last scene
        this.destroyScene();

        // Load background color for the scene
        this.background.color = sceneData[this.currentScene].color;

        // If the current scene is the game load the special level assets
        if (this.currentScene == 3) {

          this.background.color = levelData[this.level.current_level].color;

          if (!this.level.generated) {

            this.level.loadLevel();

          } else {

            FormHandler.createGameForm(this.level);
            this.level.remakeMultiplierBanner();
            this.level.remakeRangeBanner();

          }

        }

        // Create the new scene
        this.createScene();

        // Resize the scene
        this.$emit('resize', 'resize')

        // this.level.visibleForm(true);

      },

      /**
       * A function to change the current scene to a new scene.
       * @param {object} newScene - The index of the scene to navigate to.
       */
      changeScene: function(newScene) {

        // Set the last scene to the current scene
        this.lastScene = this.currentScene;

        // Set the current scene to the new scene
        this.currentScene = newScene;

        // Load the scene
        this.loadCurrentScene();

      },

      oneWayScene: function() {

        // Switch the current and last screen
        var temp = this.currentScene;
        this.currentScene = this.lastScene;
        this.lastScene = temp;

        // Load the scene
        this.loadCurrentScene();

        // // Resize everything for scaling
        this.$emit('resize', 'resize')
        // device.resize();

        // If the last scene was the game open with the pause screen
        if (this.lastScene == 3) {

          this.gui.menu_button.visible = false;

          this.level.openPauseMenu(this.user.authenticated);

        } else if (this.currentScene == 3) {

          this.gui.menu_button.visible = true;
          FormHandler.createGameForm(this.level);
          this.level.remakeMultiplierBanner();
          this.level.remakeRangeBanner();
          this.level.structure_score.text = "Total Lows: " + this.level.miss_lower_counter.toString() + "\nTotal High: " + this.level.miss_upper_counter.toString() + "\nTotal Hits: " + this.level.hit_counter.toString();

        }

      },

      /**
      * A function to clear the stage and entity components.
      * @param {object} entityComponentSystem - The array of entities.
      */
      destroyScene: function() {

        // Clear the stage.
        this.stage.removeAllChildren();

        // Clear the entity component system.
        this.sceneComponentSystem = [];

      },

      /**
      * A function to clear the html currently being added to the screen.
      */
      clearHtml: function() {

        // Get the element that contains the custom HTML for the scene.
        this.sceneHtml = document.getElementById('sceneHTML');

        // Until there are no more children elements...
        while (this.sceneHtml.firstChild) {

          // Remove the first child element.
          this.sceneHtml.removeChild(this.sceneHtml.firstChild);

        }

      },

      indicatorFunction: function(newL) {

        this.level.generated = false;
        createjs.Sound.play("select");
        this.level.current_level = newL;
        this.level.resetLevel();
        this.changeScene(3);

      }

    }

  }

</script>

<style>
</style>
