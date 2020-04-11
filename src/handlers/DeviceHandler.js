//==============================================================================
//                                                                            ||
// DEVICE HANDLER                                                             ||
//============================================================================||
//                                                                            ||
// This module is a handler for managing the current devices specifications.  ||
//                                                                            ||
//==============================================================================

// Static classes
import AssetHandler from './AssetHandler.js';


import MobileHandler from './MobileHandler.js';

// Models
import ObjectConfig from '../structures/ObjectConfig'

class DeviceHandler {

  /**
   * Constructor for the scaling component of the engine.
   * @constructor
   */
  constructor() {

    this.device = new MobileHandler(); // Mobile manager

    this.scale = {
      x: 1.0,
      y: 1.0
    };
    this.maxScaleY = 1440;
    this.maxScaleX = 1920;
    this.screenRatio = this.maxScaleY / this.maxScaleX;
    this.sceneMarginX = 0.0;
    this.added = false;
    this.maxStored = false;
    this.tempScale = 1;
    this.tempMax = 1440

    this.landscape_warning = new createjs.Shape();
    this.phone_rotation = null;

    ////////////
    // MOBILE //
    ////////////

    this.phone_rotationS = {

      images: ["res/phone-rotation.png"],
      frames: {width:288, height:288, count:2, regX: 0, regY:0, spacing:0, margin:0},
      framerate: 2

    };

  }

  /**
   * Function to scale the entire stage.
   * @param {object} entityComponentSystem - The array of entities.
   * @param {object} currentScene - The index of the current scene.
   * @param {object} stage - The stage that displays the content.
   */
    resize(ecs, stage, director) {

      this.loadOrientationAnimation(ecs, stage)

      // Redraw background before everthing else for Z-axis reasons
      director.background.shape.graphics.clear()
      director.background.shape.graphics.beginFill(director.background.color).drawRect(0, 0, stage.canvas.width, stage.canvas.height);

      this.device.mobileCheck(console, navigator);
      this.device.orientationCheck(console, window);

      // If window height is greater than width
      this.checkOrientation(stage, director);

      // Resize the canvas element with new window size
      stage.canvas.width = window.innerWidth;
      stage.canvas.height = window.innerHeight;

      this.screenRatio = stage.canvas.width / stage.canvas.height;

      if (window.innerWidth < 600) {
        // gui_scale = 3;
      } else if (window.innerWidth < 900) {
        // gui_scale = 2;
      } else {
        // gui_scale = 1;
      }

      this.calculateScaling(stage);

      // Calculate the scene margin in a given direction
      this.sceneMarginX = ( stage.canvas.width - this.maxScaleX ) / 2;

      // Log screen scaling for debugging purposes
      // console.log(this.scale.x);
      // console.log(this.scale.y);
      // console.log(this.screenRatio);

      this.landscape_warning.graphics.clear()
      this.landscape_warning.graphics.beginFill("#000000").drawRect(0, 0, stage.canvas.width, stage.canvas.height);

      if (director.currentScene == 3) {
        this.scaleAssets(director.level.lcs, director.currentScene, stage); // Scale scene appropriately
      }

      this.scaleAssets(ecs, director.currentScene, stage); // Scale scene appropriately
      // this.scaleAssets(this.gcs, currentScene, this.scale.y, this.scale.x, stage); // Scale scene appropriately

      stage.update()

    }

    checkOrientation(stage, director) {
      
      // If window height is greater than width
      if (this.device.isPortrait && this.device.isMobile) {

        if(!this.added) {

          stage.addChild(this.landscape_warning);
          stage.addChild(this.phone_rotation);
          this.landscape_warning.graphics.clear()
          this.landscape_warning.graphics.beginFill("#000000").drawRect(0, 0, stage.canvas.width, stage.canvas.height);
          this.phone_rotation.gotoAndPlay(0);
          director.sceneHtml = document.getElementById("sceneHTML");
          director.sceneHtml.hidden = true;
          this.added = true;

        }

      } else {

        if(this.added){

          stage.removeChild(this.landscape_warning);
          stage.removeChild(this.phone_rotation);
          director.sceneHtml = document.getElementById("sceneHTML");
          director.sceneHtml.hidden = false;
          this.added = false;

        }

      }

    }

    loadOrientationAnimation(ecs, stage) {

      // Load the phone rotation picture but remove it from the stage.
      let config = new ObjectConfig('default', 'image', 288, 288, "center", 0, "center", 0);
      this.phone_rotation = AssetHandler.createSprite(this.phone_rotationS, config, ecs, stage);
      stage.removeChild(this.phone_rotation);

    }

  /**
   * Calculate the scene scaling.
   * @param {object} stage - The stage that displays the content.
   */
    calculateScaling(stage) {

      // Calculate the scene scaling
      if (this.screenRatio < 2.5) { // tall screen

        // Calculate the scale with the max x scaling
        this.maxStored = false;
        this.scale.x = stage.canvas.width / this.maxScaleX;
        this.scale.y = stage.canvas.width / this.maxScaleX;

      } else if (this.screenRatio > 2.5) { // wide screen


        if(!this.maxStored) {
          this.maxStored = true;
          this.tempMax = stage.canvas.height;
        }

        this.tempScale = stage.canvas.width / this.maxScaleX;
        this.scale.x = this.tempScale * ( stage.canvas.height / this.tempMax );
        this.scale.y = this.tempScale * ( stage.canvas.height / this.tempMax );
        
      }

    }

  /**
   * Function to scale the image-like assets.
   * @param {object} entityComponentSystem - The array of entities.
   * @param {object} stage - The stage that displays the content.
   */
  scaleAssets(entityComponentSystem, currentScene, stage) {

    // console.log("ECS length: " + entityComponentSystem.length);

    if (currentScene == 3) {
      this.scaleEntryForm();
    }

    for (var i = 0; i < entityComponentSystem.length; i++) {

      let platformScale = this.setScale(entityComponentSystem[i]);
      let startValues = this.snapEdges(stage, entityComponentSystem[i]);

      entityComponentSystem[i].object.x = startValues.x + entityComponentSystem[i].x_location * this.scale.y * platformScale;
      entityComponentSystem[i].object.y = startValues.y + entityComponentSystem[i].y_location * this.scale.y * platformScale;

    }

  }

  /**
   * Function to snap items to the edges of screen.
   * @param {object} stage - The stage that displays the content.
   * @param {object} entityComponent - The the current entity being scaled.
   * @returns {object} startValues : { x: xStart, y: yStart } - The starting location values.
   */
  snapEdges(stage, entityComponent) {

    let xStart = stage.canvas.width / 2;
    let yStart = stage.canvas.height / 2;

    switch (entityComponent.x_lock) {

      case "left":
        xStart = 0;
        break;

      case "center":
        xStart = stage.canvas.width / 2;
        break;

      case "right":
        xStart = stage.canvas.width;
        break;

    }

    switch (entityComponent.y_lock) {

      case "top":
        yStart = 0;
        break;

      case "center":
        yStart = stage.canvas.height / 2;
        break;

      case "bottom":
        yStart = stage.canvas.height;
        break;

    }

    return { x: xStart, y: yStart };

  }

  /**
   * Function to scale an individual entity.
   * @param {object} entityComponent - The the current entity being scaled.
   * @returns {object} platformScale - The platform specific scale of that entity.
   */
  setScale(entityComponent) {

    let platformScale = 1.0;

    if (this.device.isMobile) {

      platformScale = 1.5;
  
      switch (entityComponent.type) {
  
        case "image":
          platformScale = 1.0;
          break;
  
        case "gui":
          platformScale = 1.5;
          // entityComponent.object.scale = 1.0;
          break;
  
        case "smallgui":
          platformScale = 0.5;
          // entityComponent.object.scale = 0.5;
          break;

      }
  
    }
  
    // image.x = x_start + x_location;
    // image.y = y_start + y_location;

    entityComponent.object.scaleX = this.scale.x;
    entityComponent.object.scaleY = this.scale.y;

    return platformScale;

  }

  /**
   * Function to scale the entry form during the game.
   */
  scaleEntryForm() {

    // Set the position values of the form
    var xPosition = (284 * this.scale.y).toString() + "px";
    var yPosition = (960 * this.scale.y).toString() + "px";

    // Set the actual html element values
    var gameEntryForm = document.getElementById("equationBanner");
    gameEntryForm.style.bottom = xPosition;
    gameEntryForm.style.right = yPosition;

  }

}
export default DeviceHandler;
