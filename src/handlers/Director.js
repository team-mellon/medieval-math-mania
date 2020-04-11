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
import FormHandler from '../handlers/FormHandler.js';

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
  constructor() {

    this.loadingQueue = new createjs.LoadQueue();
    this.loadingQueue.loadManifest(sceneManifest);

    this.gui = new GUIHandler();
    this.level = new LevelHandler();

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

  }

  /**
   * Function to scale the entire stage.
   * @param {object} entityComponentSystem - The array of entities.
   * @param {object} currentScene - The index of the current scene.
   * @param {object} isMobile - The flag that determines if on a mobile device.
   * @param {object} stage - The stage that displays the content.
   */

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

  runAnimations(ecs, stage, mobile, music, user, async, device) {

    // Run through and finish animations that play once
    this.level.updateSinglePlayAnimations();

    // Check for hit and miss and then run thier animations
    this.level.runHitAnimations();
    this.level.runMissAnimations( function() {
      createjs.Sound.play("menu");
      this.changeScene(9, ecs, stage, device, music, user, async);
    }.bind(this) );

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
  createScene(ecs, stage, device, music, user, async) {

    // Set the background color to a neutral color
    this.setBackgroundColor(stage, "#333333");

    stage.addChild(this.background.shape);
    this.background.shape.graphics.clear()
    this.background.shape.graphics.beginFill(this.background.color).drawRect(0, 0, stage.canvas.width, stage.canvas.height);

    this.setBackground(ecs, stage);

    this.setForegroundText(user);
    this.setForeground(ecs, stage);

    this.runCustomCode(ecs, stage, music);

    this.gui.createGUI(ecs, this, stage, user, async, device, this.gui.menu_button, this.levels, music);

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

  setBackground(ecs, stage) {

    let config;

    config = new ObjectConfig('default', 'image', constants.backgroundX, 1440, "center", 0, "center", 0);
    this.background.center = AssetHandler.createImage(this.loadingQueue.getResult(sceneData[this.currentScene].bg_img), config, ecs, stage);

    config = new ObjectConfig('default', 'image', constants.backgroundX, 1440, "center", 0, "center", -1440);
    this.background.up = AssetHandler.createImage(this.loadingQueue.getResult(sceneData[this.currentScene].bg_img), config, ecs, stage);
    
    config = new ObjectConfig('default', 'image', constants.backgroundX, 1440, "center", 0, "center", 1440);
    this.background.down = AssetHandler.createImage(this.loadingQueue.getResult(sceneData[this.currentScene].bg_img), config, ecs, stage);
    
    config = new ObjectConfig('default', 'image', constants.backgroundX, 1440, "center", -constants.backgroundX, "center", 0);
    this.background.left = AssetHandler.createImage(this.loadingQueue.getResult(sceneData[this.currentScene].bg_img), config, ecs, stage);
    
    config = new ObjectConfig(constants.backgroundX, 1440, "center", constants.backgroundX, "center", 0);
    this.background.right = AssetHandler.createImage(this.loadingQueue.getResult(sceneData[this.currentScene].bg_img), config, ecs, stage);

  }

  setForeground(ecs, stage) {

    let config;

    if (this.currentScene != 8 && this.currentScene != 2 && this.currentScene != 3 && this.currentScene != 10) {

      let temp_fg_img = {
        images: [this.loadingQueue.getResult(sceneData[this.currentScene].fg_img.images[0])],
        frames: sceneData[this.currentScene].fg_img.frames,
        framerate: sceneData[this.currentScene].fg_img.framerate
      };

      config = new ObjectConfig('default', 'image', sceneData[this.currentScene].fg_img.frames.width, sceneData[this.currentScene].fg_img.frames.height, "center", 0, "center", 0);
      this.foreground = AssetHandler.createTextContainer(temp_fg_img, sceneData[this.currentScene].fg_text, "Oldstyle", "32px", "normal", "Saddlebrown", config, 0, ecs, stage);

    } else if (this.currentScene == 10) {

      config = new ObjectConfig('default', 'image', 1635, 480, "center", 0, "top", 48 + 480 / 2);
      this.foreground = AssetHandler.createImage(this.loadingQueue.getResult("title-text"), config, ecs, stage);

    } else if (this.currentScene == 8) {

      config = new ObjectConfig('default', 'image', constants.backgroundX, constants.backgroundY, "center", 0, "center", 0);
      this.midground = AssetHandler.createImage(this.loadingQueue.getResult("map"), config, ecs, stage);

      config = new ObjectConfig('default', 'gui', constants.backgroundX, 108, "center", 0, "top", 0 + (108/2));
      this.foreground = AssetHandler.createButton(this.loadingQueue.getResult("map-banner"), "Select a level", config, function() {}.bind(this), ecs, stage);

    }

    if (this.currentScene == 2) {

      config = new ObjectConfig('default', 'image', constants.backgroundX, constants.backgroundY, "center", 0, "bottom", -constants.backgroundY / 2);
      this.background.center = AssetHandler.createImage(this.loadingQueue.getResult("menu"), config, ecs, stage);
      
      config = new ObjectConfig('default', 'image', constants.backgroundX, constants.backgroundY, "center", 0 - (constants.backgroundX), "bottom", -constants.backgroundY / 2);
      this.background.left = AssetHandler.createImage(this.loadingQueue.getResult("menu-left"), config, ecs, stage);
      
      config = new ObjectConfig('default', 'image', constants.backgroundX, constants.backgroundY, "center", 0 + (constants.backgroundX), "bottom", -constants.backgroundY / 2);
      this.background.right = AssetHandler.createImage(this.loadingQueue.getResult("menu-right"), config, ecs, stage);

    }

  }

  runCustomCode(ecs, stage, music) {

    // Custom scene functionalities
    switch (this.currentScene) {

      case 0: // Login
        FormHandler.createLoginForm();
        break;

      case 1: // Signup
        FormHandler.createSignupForm();
        break;

      case 3: // Game
        FormHandler.createGameForm(this.level, this.device.isMobile);
        this.level.createLevel(stage,
          function() { createjs.Sound.play("select"); this.changeScene(8, ecs, stage, device, music, user, async); level.visibleForm(true); level.destroyLevel(stage); }.bind(this),
          function() { createjs.Sound.play("sword"); this.changeScene(9, ecs, stage, device, music, user, async); level.visibleForm(true); }.bind(this),
          function() { createjs.Sound.play("menu"); this.changeScene(2, ecs, stage, device, music, user, async); level.visibleForm(true); level.destroyLevel(stage); }.bind(this),
          function() { createjs.Sound.play("menu"); this.changeScene(6, ecs, stage, device, music, user, async); level.visibleForm(true); }.bind(this),
          this.user.authenticated,
          function() { this.gui.menu_button.visible = true; }.bind(this),
          this.music
        );
        break;

      case 6: // Settings
        FormHandler.createSettingsForm(this.level, music.setVolume);
        break;

    }
    
  }

  /**
   * Function to load the current scene.
   * @param {object} isMobile - The flag that determines if on a mobile device.
   * @param {object} entityComponent - The the current entity being scaled.
   * @returns {object} platformScale - The platform specific scale of that entity.
   */    // L
  loadCurrentScene(entityComponentSystem, stage, device, music, user, async) {

    // Clear HTML before creating a new scene
    this.clearHtml();

    // Destroy the last scene
    this.destroyScene(entityComponentSystem, stage);

    // Load background color for the scene
    this.background.color = sceneData[this.currentScene].color;

    // If the current scene is the game load the special level assets
    if (this.currentScene == 3) {

      this.background.color = levelData[this.level.current_level].color;

      if (!this.level.generated) {

        this.level.loadLevel();

      } else {

        FormHandler.createGameForm(this.level, this.device.isMobile);
        this.level.remakeMultiplierBanner();
        this.level.remakeRangeBanner();

      }

    }

    // Create the new scene
    this.createScene(entityComponentSystem, stage, device, music, user, async);

    device.resize(entityComponentSystem, stage, this);

    // this.level.visibleForm(true);

  }

  /**
   * A function to change the current scene to a new scene.
   * @param {object} newScene - The index of the scene to navigate to.
   */
  changeScene(newScene, entityComponentSystem, stage, device, music, user, async) {

    // Set the last scene to the current scene
    this.lastScene = this.currentScene;

    // Set the current scene to the new scene
    this.currentScene = newScene;

    // Load the scene
    this.loadCurrentScene(entityComponentSystem, stage, device, music, user, async);

  }

  oneWayScene(ecs, stage, device, music, user, async) {

    // Switch the current and last screen
    var temp = this.currentScene;
    this.currentScene = this.lastScene;
    this.lastScene = temp;

    // Load the scene
    this.loadCurrentScene(ecs, stage, device, music, user, async);

    // Resize everything for scaling
    device.resize(ecs, stage, this);

    // If the last scene was the game open with the pause screen
    if (this.lastScene == 3) {

      this.gui.menu_button.visible = false;

      this.level.openPauseMenu(this.user.authenticated);

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
  destroyScene(entityComponentSystem, stage) {

    // Clear the stage.
    stage.removeAllChildren();

    // Clear the entity component system.
    entityComponentSystem = [];

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

  indicatorFunction(newL) {

    this.level.generated = false;
    createjs.Sound.play("select");
    this.level.current_level = newL;
    this.level.resetLevel();
    this.changeScene(3, ecs, stage, device, music, user, async);

  }

}
export default Director;
