//==============================================================================
//                                                                            ||
// DEVICE HANDLER                                                             ||
//============================================================================||
//                                                                            ||
// This module is a handler for managing the current devices specifications.  ||
//                                                                            ||
//==============================================================================

// Modules
import Director from '../handlers/Director.js';

// Static classes
import AssetHandler from './AssetHandler.js';

// Submodules
import MobileHandler from './MobileHandler.js';
import InputHandler from '../handlers/InputHandler.js';

// Models
import ObjectConfig from '../structures/ObjectConfig'

class DeviceHandler {

  /**
   * Constructor for the scaling component of the engine.
   * @constructor
   */
  constructor() {

    // 
    this.config = {
      canvasId: 'drawingCanvas',
    };

    // Stage for drawing pictures and shapes
    this.stage = new createjs.Stage(this.config.canvasId);

    ////////////
    // MOBILE //
    ////////////

    // Mobile manager
    this.device = new MobileHandler();

    // Current user data
    this.user = {
      authenticated: false,
      firstname: 'Place',
      lastname: 'Holder',
      username: 'CpnPlchlder',
      hits: 0,
      highs: 0,
      lows: 0,
      badges: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }

    // Initialize the scene manager.
    this.director = new Director(this.stage, this, this.user);

    // Landscape warning backdrop
    this.landscape_warning = new createjs.Shape();

    // Phone rotation image variables
    this.phone_rotation = null;
    this.phone_rotationS = {
      images: ["res/phone-rotation.png"],
      frames: {width:288, height:288, count:2, regX: 0, regY:0, spacing:0, margin:0},
      framerate: 2
    };

    ///////////
    // INPUT //
    ///////////

    // Input handler
    this.input = new InputHandler(this.stage);

    /////////////
    // SCALING //
    /////////////

    // Scene scaling variables
    this.scale = {
      x: 1.0,
      y: 1.0,
      maxY: 1440,
      maxX: 1920,
      ratio: 1440 / 1920,
    };

    this.maxScaleY = 1440;
    this.maxScaleX = 1920;
    this.screenRatio = this.maxScaleY / this.maxScaleX;
    this.sceneMarginX = 0.0;
    this.added = false;
    this.maxStored = false;
    this.tempScale = 1;
    this.tempMax = 1440

    // Set the window resize function to the one
    window.addEventListener('resize', function() { this.resize() }.bind(this), false);

  }

  /**
   * Function to scale the entire stage.
   */
  resize() {

    this.loadOrientationAnimation(this.director.sceneComponentSystem)

    // Redraw background before everthing else for Z-axis reasons
    this.director.background.shape.graphics.clear()
    this.director.background.shape.graphics.beginFill(this.director.background.color).drawRect(0, 0, this.stage.canvas.width, this.stage.canvas.height);

    this.device.mobileCheck(console, navigator);
    this.device.orientationCheck(console, window);

    // If window height is greater than width
    this.checkOrientation();

    // Resize the canvas element with new window size
    this.stage.canvas.width = window.innerWidth;
    this.stage.canvas.height = window.innerHeight;

    this.screenRatio = this.stage.canvas.width / this.stage.canvas.height;

    if (window.innerWidth < 600) {
      // gui_scale = 3;
    } else if (window.innerWidth < 900) {
      // gui_scale = 2;
    } else {
      // gui_scale = 1;
    }

    this.calculateScaling();

    // Calculate the scene margin in a given direction
    this.sceneMarginX = ( this.stage.canvas.width - this.maxScaleX ) / 2;

    // Log screen scaling for debugging purposes
    // console.log(this.scale.x);
    // console.log(this.scale.y);
    // console.log(this.screenRatio);

    this.landscape_warning.graphics.clear()
    this.landscape_warning.graphics.beginFill("#000000").drawRect(0, 0, this.stage.canvas.width, this.stage.canvas.height);

    if (this.director.currentScene == 3) {
      this.scaleAssets(this.director.level.lcs, this.director.currentScene); // Scale scene appropriately
    }

    this.scaleAssets(this.director.sceneComponentSystem, this.director.currentScene); // Scale scene appropriately
    // this.scaleAssets(this.gcs, currentScene, this.scale.y, this.scale.x); // Scale scene appropriately

    this.stage.update()

  }

  checkOrientation() {
    
    // If window height is greater than width
    if (this.device.isPortrait && this.device.isMobile) {

      if(!this.added) {

        this.stage.addChild(this.landscape_warning);
        this.stage.addChild(this.phone_rotation);
        this.landscape_warning.graphics.clear()
        this.landscape_warning.graphics.beginFill("#000000").drawRect(0, 0, this.stage.canvas.width, this.stage.canvas.height);
        this.phone_rotation.gotoAndPlay(0);
        this.director.sceneHtml = document.getElementById("sceneHTML");
        this.director.sceneHtml.hidden = true;
        this.added = true;

      }

    } else {

      if(this.added){

        this.stage.removeChild(this.landscape_warning);
        this.stage.removeChild(this.phone_rotation);
        this.director.sceneHtml = document.getElementById("sceneHTML");
        this.director.sceneHtml.hidden = false;
        this.added = false;

      }

    }

  }

  loadOrientationAnimation(ecs) {

    // Load the phone rotation picture but remove it from the stage.
    let config = new ObjectConfig('default', 'image', 288, 288, "center", 0, "center", 0);
    this.phone_rotation = AssetHandler.createSprite(this.phone_rotationS, config, ecs, this.stage);
    this.stage.removeChild(this.phone_rotation);

  }

  /**
   * Calculate the scene scaling.
   */
  calculateScaling() {

    // Calculate the scene scaling
    if (this.screenRatio < 2.5) { // tall screen

      // Calculate the scale with the max x scaling
      this.maxStored = false;
      this.scale.x = this.stage.canvas.width / this.maxScaleX;
      this.scale.y = this.stage.canvas.width / this.maxScaleX;
      let key = 'sceneScaleY';
      sessionStorage.setItem(key, this.scale.y);

    } else if (this.screenRatio > 2.5) { // wide screen


      if(!this.maxStored) {
        this.maxStored = true;
        this.tempMax = this.stage.canvas.height;
      }

      this.tempScale = this.stage.canvas.width / this.maxScaleX;
      this.scale.x = this.tempScale * ( this.stage.canvas.height / this.tempMax );
      this.scale.y = this.tempScale * ( this.stage.canvas.height / this.tempMax );
      let key = 'sceneScaleY';
      sessionStorage.setItem(key, this.scale.y);
      
    }

  }

  /**
   * Function to scale the image-like assets.
   * @param {object} entityComponentSystem - The array of entities.
   */
  scaleAssets(entityComponentSystem, currentScene) {

    // console.log("ECS length: " + entityComponentSystem.length);

    if (currentScene == 3) {
      this.scaleEntryForm();
    }

    for (var i = 0; i < entityComponentSystem.length; i++) {

      let platformScale = this.setScale(entityComponentSystem[i]);
      let startValues = this.snapEdges(entityComponentSystem[i]);

      entityComponentSystem[i].object.x = startValues.x + entityComponentSystem[i].x_location * this.scale.y * platformScale;
      entityComponentSystem[i].object.y = startValues.y + entityComponentSystem[i].y_location * this.scale.y * platformScale;

    }

  }

  /**
   * Function to snap items to the edges of screen..
   * @param {object} entityComponent - The the current entity being scaled.
   * @returns {object} startValues : { x: xStart, y: yStart } - The starting location values.
   */
  snapEdges(entityComponent) {

    let xStart = this.stage.canvas.width / 2;
    let yStart = this.stage.canvas.height / 2;

    switch (entityComponent.x_lock) {

      case "left":
        xStart = 0;
        break;

      case "center":
        xStart = this.stage.canvas.width / 2;
        break;

      case "right":
        xStart = this.stage.canvas.width;
        break;

    }

    switch (entityComponent.y_lock) {

      case "top":
        yStart = 0;
        break;

      case "center":
        yStart = this.stage.canvas.height / 2;
        break;

      case "bottom":
        yStart = this.stage.canvas.height;
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

    // Set default value.
    let platformScale = 1.0;

    // If the device is a mobile device...
    if (this.device.isMobile) {

      // Set mobile scale.
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
