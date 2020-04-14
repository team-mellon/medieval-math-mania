//==============================================================================
//                                                                            ||
// DIRECTOR                                                                   ||
//============================================================================||
//                                                                            ||
// This module is a handler for managing scenes.                              ||
//                                                                            ||
//==============================================================================

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

class Director {

  /**
   * Constructor for the scaling component of the engine.
   * @constructor
   */
  constructor(stage, device, user) {

		this.sceneComponentSystem = []; // Scene component system for scaling and eventually object storage
    // ecs: [], // Entity component system for scaling and eventually object storage

    this.loadingQueue = new createjs.LoadQueue();
    this.loadingQueue.loadManifest(sceneManifest);

    this.gui = new GUIHandler();
    this.level = new LevelHandler();
    // Initialize the sound handler, maybe put in director 
    this.sound = new SoundHandler();

    // Grabbing the div that hold the html forms.
    this.sceneHtml = document.getElementById("sceneHTML");

    this.currentScene = 10;
    this.lastScene = 0;

    this.foreground = null;
    this.midground = null;
    this.background = {
      entity: {},
      shape: null,
      color: '#808080',
      center: null,
      left: null,
      right: null,
      up: null,
      down: null
    };

    this.async = '';

  }

  /**
   * Function to scale the entire stage.
   * @param {object} entityComponentSystem - The array of entities.
   * @param {object} currentScene - The index of the current scene.
   * @param {object} isMobile - The flag that determines if on a mobile device.
   * @param {object} stage - The stage that displays the content.
   */

  runScene(stage, device, user) {

    if (this.currentScene == 0) {

      // console.log(user.authenticated);

      if (device.input.keys[13]) {  // Enter key

        createjs.Sound.play("sword");

        var key = document.getElementById('usernameInput').value;

        var text = {
          "uname": document.getElementById('usernameInput').value,
          "pass": document.getElementById('passwordInput').value
        };

        APIHandler.verifyUser(text, user, this.async);

      }

      if (user.authenticated) {
        this.changeScene(2, stage, device, user);
      }

    }

    if (this.currentScene == 1) {

      // console.log(user.authenticated);

      if (device.input.keys[13]) {
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
                  APIHandler.createUser(text, user, this.async);
                  this.changeScene(2, stage, device, user);
                }
              }
            }
          }
        }
      }

    }

    // Game scene
    if (this.currentScene == 3) {

      var y_position = (284 * device.scale.y).toString() + "px";
      var x_position = ((window.innerWidth / 2) + (0) * device.scale.y).toString() + "px";

      // console.log(x_position);

      var game_entry_form = document.getElementById("equationBanner");
      game_entry_form.style.bottom = y_position;
      game_entry_form.style.right = x_position;
      if (!device.device.isMobile) {
        document.getElementById("entryInput").focus();
      }

      y_position = (300 * device.scale.y).toString() + "px";
      x_position = ( (window.innerWidth / 2) - (234 + 288 / 2) * device.scale.x).toString() + "px";

      // console.log(x_position);

      var game_history_form = document.getElementById("historyBanner");
      game_history_form.style.bottom = y_position;
      game_history_form.style.right = x_position;

    }

    //Calls external function to generate ranges for each level, this is reset when each level is selected on level select

    // Game scene && not paused
    if (this.currentScene == 3 && this.level.pause_menu.visible == false) {

      this.gameRunning(stage, device, user);

    }

    // Update frame counter for drawing
    // frame_counter++;

    // if (frame_counter > 9) {
    //
    //   this.level.reload_counter += frame_counter;
    //   frame_counter = 0;
    //
    // }

  }

  /**
   * Calculate the scene scaling.
   * @param {object} stage - The stage that displays the content.
   */

  /**
   * Function to scale the image-like assets.
   * @param {object} entityComponentSystem - The array of entities.
   * @param {object} currentScene - The index of the current scene.
   * @param {object} isMobile - The flag that determines if on a mobile device.
   * @param {object} stage - The stage that displays the content.
   */
  generateLevel() {

    // Generate the range
    this.level.level_math[this.level.current_level].math();

    this.level.clearMultiplicandBanner();

    this.level.remakeMultiplierBanner();
    this.level.remakeRangeBanner();

    this.level.generated = true;

  }

  gameRunning(stage, device, user) {

    // If the range is not generated
    if(!this.level.generated) {
      this.generateLevel();
    }

    // Key checks

    // Spacebar to randomize the range
    // if (keys[32]){
      // randomizeRangeAndMultiplier();
    // }

    // console.log(device.input.drag_up);

    // Enter or swipe up to check input
    if ((device.input.keys[13] || device.input.drag_up) && this.level.catapult.paused) { // Enter or drag up swipe on mobile
      console.log("Enter Pressed");

      // Reset drag_up bool;
      device.input.drag_up = false;

      this.level.runInput(device.device.isMobile);
      this.clearHtml();
      FormHandler.createGameForm(this.level, device.device.isMobile);

    }

    // If on mobile...
    if (device.device.isMobile) {

      // Check which digit is selected and highlight it
      this.level.checkSelectedDigit();

    }

    this.runAnimations(stage, user, device);

    //If game over...
    if (this.level.hit_counter >= 3 && this.level.miss_upper_counter >= 1 && this.level.miss_lower_counter >= 1 && this.level.reload == false && this.level.current_level != 0) {

      this.runGameOverSequemce(user, device);

    }

    this.runLevelTriggers(stage, device);

  }

  runAnimations(stage, mobile, user, device) {

    // Run through and finish animations that play once
    this.level.updateSinglePlayAnimations();

    // Check for hit and miss and then run thier animations
    this.level.runHitAnimations();
    this.level.runMissAnimations( function() {
      createjs.Sound.play("menu");
      this.changeScene(9, stage, device, user);
    }.bind(this) );

  }

  runGameOverSequence(user, device) {

    // udpate global total
    user.hits += this.level.hit_counter;
    user.highs += this.level.miss_upper_counter;
    user.lows += this.level.miss_lower_counter;

    this.level.hit_text.text += this.level.hit_counter.toString();
    this.level.low_text.text += this.level.miss_lower_counter.toString();
    this.level.high_text.text += this.level.miss_upper_counter.toString();

    this.gui.menu_button.visible = false;

    // Show the endgame screen
    this.level.createVictoryBanner(device.scale.x, device.scale.y, user.badges, user.authenticated);

    this.level.visitedLevels[this.level.current_level] = true;
    user.badges[(this.level.current_level - 1)] = 1;

    // update database
    APIHandler.updateStats(
      {
        user: user.username,
        hits: user.hits,
        highs: user.highs,
        lows: user.lows,
        badges: user.badges
      },
      user,
      this.async
    );

    // Also maybe check if boss level is active
    // this.level.checkBossFight();

  }

  runLevelTriggers(stage, device) {

    // Check to see if the tutorial should be displayed
    this.level.checkTutorial();

    // Hide bad guys when hit
    this.level.hideBadGuys();

    // Check if towers are down
    this.level.towerAnimation();

    // Run the catapult animation
    this.level.runCatapultAnimation(device.scale.y);

    // Reload the catapult
    this.level.reloadCatapult(stage, device.scale.y)

  }

  /**
   * Function to snap items to the edges of screen.
   * @param {object} stage - The stage that displays the content.
   * @param {object} entityComponent - The the current entity being scaled.
   * @returns {object} startValues : { x: xStart, y: yStart } - The starting location values.
   */
  createScene(stage, device, user) {

    // Set the background color to a neutral color
    this.setBackgroundColor(stage, "#333333");

    stage.addChild(this.background.shape);
    this.background.shape.graphics.clear()
    this.background.shape.graphics.beginFill(this.background.color).drawRect(0, 0, stage.canvas.width, stage.canvas.height);

    this.setBackground(stage);

    this.setForegroundText(user);
    this.setForeground(stage);

    this.runCustomCode(stage, device, user);

    this.gui.createGUI(this.sceneComponentSystem, this, stage, user, this.async, device, this.gui.menu_button);

    // console.log(entity_component_system);

  }

  setForegroundText(user) {

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
        sceneData[this.currentScene].fg_text = "Username: " + user.username + "\n\nName: " + user.firstname + " " + user.lastname + "\n\n";
        break;
      case 9:
        sceneData[this.currentScene].fg_text = levelData[this.level.current_level].hint;
        break;
      default:

    }

  }

  // Load the scene in the variable currentScene
  setBackgroundColor(stage, color) {
    
    // Create a rectangle for clearing the screen
    this.background.shape = new createjs.Shape();
    
    // Set background color to grey
    this.background.color = color;

    // 
    this.background.shape.graphics.clear()
    this.background.shape.graphics.beginFill(this.background.color).drawRect(0, 0, stage.canvas.width, stage.canvas.height);

    // Add rectangle to the stage
    stage.addChild(this.background.shape);

  }

  setBackground(stage) {

    let config;

    config = new ObjectConfig('default', 'image', constants.backgroundX, 1440, "center", 0, "center", 0);
    this.background.center = AssetHandler.createImage(this.loadingQueue.getResult(sceneData[this.currentScene].bg_img), config, this.sceneComponentSystem, stage);

    config = new ObjectConfig('default', 'image', constants.backgroundX, 1440, "center", 0, "center", -1440);
    this.background.up = AssetHandler.createImage(this.loadingQueue.getResult(sceneData[this.currentScene].bg_img), config, this.sceneComponentSystem, stage);
    
    config = new ObjectConfig('default', 'image', constants.backgroundX, 1440, "center", 0, "center", 1440);
    this.background.down = AssetHandler.createImage(this.loadingQueue.getResult(sceneData[this.currentScene].bg_img), config, this.sceneComponentSystem, stage);
    
    config = new ObjectConfig('default', 'image', constants.backgroundX, 1440, "center", -constants.backgroundX, "center", 0);
    this.background.left = AssetHandler.createImage(this.loadingQueue.getResult(sceneData[this.currentScene].bg_img), config, this.sceneComponentSystem, stage);
    
    config = new ObjectConfig(constants.backgroundX, 1440, "center", constants.backgroundX, "center", 0);
    this.background.right = AssetHandler.createImage(this.loadingQueue.getResult(sceneData[this.currentScene].bg_img), config, this.sceneComponentSystem, stage);

  }

  setForeground(stage) {

    let config;

    if (this.currentScene != 8 && this.currentScene != 2 && this.currentScene != 3 && this.currentScene != 10) {

      let temp_fg_img = {
        images: [this.loadingQueue.getResult(sceneData[this.currentScene].fg_img.images[0])],
        frames: sceneData[this.currentScene].fg_img.frames,
        framerate: sceneData[this.currentScene].fg_img.framerate
      };

      config = new ObjectConfig('default', 'image', sceneData[this.currentScene].fg_img.frames.width, sceneData[this.currentScene].fg_img.frames.height, "center", 0, "center", 0);
      this.foreground = AssetHandler.createTextContainer(temp_fg_img, sceneData[this.currentScene].fg_text, "Oldstyle", "32px", "normal", "Saddlebrown", config, 0, this.sceneComponentSystem, stage);

    } else if (this.currentScene == 10) {

      config = new ObjectConfig('default', 'image', 1635, 480, "center", 0, "top", 48 + 480 / 2);
      this.foreground = AssetHandler.createImage(this.loadingQueue.getResult("title-text"), config, this.sceneComponentSystem, stage);

    } else if (this.currentScene == 8) {

      config = new ObjectConfig('default', 'image', constants.backgroundX, constants.backgroundY, "center", 0, "center", 0);
      this.midground = AssetHandler.createImage(this.loadingQueue.getResult("map"), config, this.sceneComponentSystem, stage);

      config = new ObjectConfig('default', 'gui', constants.backgroundX, 108, "center", 0, "top", 0 + (108/2));
      this.foreground = AssetHandler.createButton(this.loadingQueue.getResult("map-banner"), "Select a level", config, function() {}.bind(this), this.sceneComponentSystem, stage);

    }

    if (this.currentScene == 2) {

      config = new ObjectConfig('default', 'image', constants.backgroundX, constants.backgroundY, "center", 0, "bottom", -constants.backgroundY / 2);
      this.background.center = AssetHandler.createImage(this.loadingQueue.getResult("menu"), config, this.sceneComponentSystem, stage);
      
      config = new ObjectConfig('default', 'image', constants.backgroundX, constants.backgroundY, "center", 0 - (constants.backgroundX), "bottom", -constants.backgroundY / 2);
      this.background.left = AssetHandler.createImage(this.loadingQueue.getResult("menu-left"), config, this.sceneComponentSystem, stage);
      
      config = new ObjectConfig('default', 'image', constants.backgroundX, constants.backgroundY, "center", 0 + (constants.backgroundX), "bottom", -constants.backgroundY / 2);
      this.background.right = AssetHandler.createImage(this.loadingQueue.getResult("menu-right"), config, this.sceneComponentSystem, stage);

    }

  }

  runCustomCode(stage, device, user) {

    // Custom scene functionalities
    switch (this.currentScene) {

      case 0: // Login
        FormHandler.createLoginForm();
        break;

      case 1: // Signup
        FormHandler.createSignupForm();
        break;

      case 3: // Game
        FormHandler.createGameForm(this.level, device.isMobile);
        this.level.createLevel(stage,
          function() { createjs.Sound.play("select"); this.changeScene(8, stage, device, user); this.level.visibleForm(true); this.level.destroyLevel(stage); }.bind(this),
          function() { createjs.Sound.play("sword"); this.changeScene(9, stage, device, user); this.level.visibleForm(true); }.bind(this),
          function() { createjs.Sound.play("menu"); this.changeScene(2, stage, device, user); this.level.visibleForm(true); this.level.destroyLevel(stage); }.bind(this),
          function() { createjs.Sound.play("menu"); this.changeScene(6, stage, device, user); this.level.visibleForm(true); }.bind(this),
          user.authenticated,
          function() { this.gui.menu_button.visible = true; }.bind(this),
          this.sound
        );
        break;

      case 6: // Settings
        FormHandler.createSettingsForm(this.level, this.sound.setVolume);
        break;

    }
    
  }

  /**
   * Function to load the current scene.
   * @param {object} isMobile - The flag that determines if on a mobile device.
   * @param {object} entityComponent - The the current entity being scaled.
   * @returns {object} platformScale - The platform specific scale of that entity.
   */    // L
  loadCurrentScene(stage, device, user) {

    // Clear HTML before creating a new scene
    this.clearHtml();

    // Destroy the last scene
    this.destroyScene(stage);

    // Load background color for the scene
    this.background.color = sceneData[this.currentScene].color;

    // If the current scene is the game load the special level assets
    if (this.currentScene == 3) {

      this.background.color = levelData[this.level.current_level].color;

      if (!this.level.generated) {

        this.level.loadLevel();

      } else {

        FormHandler.createGameForm(this.level, device.isMobile);
        this.level.remakeMultiplierBanner();
        this.level.remakeRangeBanner();

      }

    }

    // Create the new scene
    this.createScene(stage, device, user);

    device.resize(stage, this);

    // this.level.visibleForm(true);

  }

  /**
   * A function to change the current scene to a new scene.
   * @param {object} newScene - The index of the scene to navigate to.
   */
  changeScene(newScene, stage, device, user) {

    // Set the last scene to the current scene
    this.lastScene = this.currentScene;

    // Set the current scene to the new scene
    this.currentScene = newScene;

    // Load the scene
    this.loadCurrentScene(stage, device, user);

  }

  oneWayScene(stage, device, user) {

    // Switch the current and last screen
    var temp = this.currentScene;
    this.currentScene = this.lastScene;
    this.lastScene = temp;

    // Load the scene
    this.loadCurrentScene(stage, device, user);

    // Resize everything for scaling
    device.resize(stage, this);

    // If the last scene was the game open with the pause screen
    if (this.lastScene == 3) {

      this.gui.menu_button.visible = false;

      this.level.openPauseMenu(user.authenticated);

    } else if (this.currentScene == 3) {

      this.gui.menu_button.visible = true;
      FormHandler.createGameForm(this.level, this.mobile.isMobile);
      this.level.remakeMultiplierBanner();
      this.level.remakeRangeBanner();
      this.level.structure_score.text = "Total Lows: " + this.level.miss_lower_counter.toString() + "\nTotal High: " + this.level.miss_upper_counter.toString() + "\nTotal Hits: " + this.level.hit_counter.toString();

    }

  }

  /**
   * A function to clear the stage and entity components.
   * @param {object} entityComponentSystem - The array of entities.
   * @param {object} stage - The stage that displays the content.
   */
  destroyScene(stage) {

    // Clear the stage.
    stage.removeAllChildren();

    // Clear the entity component system.
    this.sceneComponentSystem = [];

  }

  /**
   * A function to clear the html currently being added to the screen.
   */
  clearHtml() {

    // Get the element that contains the custom HTML for the scene.
    this.sceneHtml = document.getElementById("sceneHTML");

    // Until there are no more children elements...
    while (this.sceneHtml.firstChild) {

      // Remove the first child element.
      this.sceneHtml.removeChild(this.sceneHtml.firstChild);

    }

  }

  indicatorFunction(newL, stage, device, user) {

    this.level.generated = false;
    createjs.Sound.play("select");
    this.level.current_level = newL;
    this.level.resetLevel();
    this.changeScene(3, stage, device, user);

  }

}
export default Director;
