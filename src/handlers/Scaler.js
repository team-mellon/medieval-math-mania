//==============================================================================
//                                                                            ||
// SCALER                                                                     ||
//============================================================================||
//                                                                            ||
// This module is a handler for asset scaling.                                ||
//                                                                            ||
//==============================================================================

class Scaler {

  /**
   * Constructor for the scaling component of the engine.
   * @constructor
   */
  constructor() {

    this.maxScaleY = 1440;
    this.maxScaleX = 1920;
    this.screenRatio = this.maxScaleY / this.maxScaleX;
    this.sceneMarginX = 0.0;
    this.added = false;
    this.maxStored = false;
    this.tempScale = 1;
    this.tempMax = 1440

  }

  /**
   * Function to scale the entire stage.
   * @param {object} entityComponentSystem - The array of entities.
   * @param {object} current_scene - The index of the current scene.
   * @param {object} isMobile - The flag that determines if on a mobile device.
   * @param {object} sceneScaling - The scaling of the scenes' dimensions.
   * @param {object} stage - The stage that displays the content.
   */
    resize(mobile, stage, landscape_warning, phone_rotation, scene_html, bg_color, bg, scene_scale_X, scene_scale_Y, scale, level, ecs, current_scene) {

      mobile.mobileCheck(console, navigator);
      mobile.orientationCheck(console, window);

      // If window height is greater than width
      this.checkOrientation(mobile, stage, landscape_warning, phone_rotation, scene_html);

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

      // Redraw background before everthing else for Z-axis reasons
      bg.graphics.clear()
      bg.graphics.beginFill(bg_color).drawRect(0, 0, stage.canvas.width, stage.canvas.height);

      let sceneScalings = this.calculateScaling(scene_scale_X, scene_scale_Y, stage, scale);
      scene_scale_X = sceneScalings.x;
      scale.scene_scale_Y = sceneScalings.y;

      // Calculate the scene margin in a given direction
      this.sceneMarginX = ( stage.canvas.width - this.maxScaleX ) / 2;

      // Log screen scaling for debugging purposes
      // console.log(scene_scale_X);
      // console.log(scale.scene_scale_Y);
      // console.log(this.screenRatio);

      landscape_warning.graphics.clear()
      landscape_warning.graphics.beginFill("#000000").drawRect(0, 0, stage.canvas.width, stage.canvas.height);

      let sceneScaling = {
        x: scene_scale_X,
        y: scale.scene_scale_Y
      }

      if (this.current_scene == 3) {
        this.scaleAssets(level.lcs, current_scene, mobile.isMobile, sceneScaling, stage); // Scale scene appropriately
      }

      this.scaleAssets(ecs, current_scene, mobile.isMobile, sceneScaling, stage); // Scale scene appropriately
      // this.scaleAssets(this.gcs, current_scene, mobile.isMobile, scale.scene_scale_Y, scene_scale_X, stage); // Scale scene appropriately

      stage.update()

    }

    checkOrientation(mobile, stage, landscape_warning, phone_rotation, scene_html) {
      
      // If window height is greater than width
      if (mobile.isPortrait && mobile.isMobile) {

        if(!this.added) {

          stage.addChild(landscape_warning);
          stage.addChild(phone_rotation);
          landscape_warning.graphics.clear()
          landscape_warning.graphics.beginFill("#000000").drawRect(0, 0, stage.canvas.width, stage.canvas.height);
          phone_rotation.gotoAndPlay(0);
          scene_html = document.getElementById("sceneHTML");
          scene_html.hidden = true;
          this.added = true;

        }

      } else {

        if(this.added){

          stage.removeChild(landscape_warning);
          stage.removeChild(phone_rotation);
          scene_html = document.getElementById("sceneHTML");
          scene_html.hidden = false;
          this.added = false;

        }

      }

    }

  /**
   * Calculate the scene scaling.
   * @param {object} sceneScaling - The scaling of the scenes' dimensions.
   * @param {object} sceneScaling - The scaling of the scenes' dimensions.
   * @param {object} stage - The stage that displays the content.
   * @param {object} scale - The scaling of the scenes' dimensions.
   */
    calculateScaling(scene_scale_X, scene_scale_Y, stage, scale) {

      // Calculate the scene scaling
      if (this.screenRatio < 2.5) { // tall screen

        this.maxStored = false;
        scene_scale_X = stage.canvas.width / this.maxScaleX;
        scale.scene_scale_Y = stage.canvas.width / this.maxScaleX;

      } else if (this.screenRatio > 2.5) { // wide screen

        if(!this.maxStored) {
          this.maxStored = true;
          this.tempMax = stage.canvas.height;
        }

        this.tempScale = stage.canvas.width / this.maxScaleX;
        scene_scale_X = this.tempScale * ( stage.canvas.height / this.tempMax );
        scale.scene_scale_Y = this.tempScale * ( stage.canvas.height / this.tempMax );
        
      }

      return { x: scene_scale_X, y: scale.scene_scale_Y }

    }

  /**
   * Function to scale the image-like assets.
   * @param {object} entityComponentSystem - The array of entities.
   * @param {object} current_scene - The index of the current scene.
   * @param {object} isMobile - The flag that determines if on a mobile device.
   * @param {object} sceneScaling - The scaling of the scenes' dimensions.
   * @param {object} stage - The stage that displays the content.
   */
  scaleAssets(entityComponentSystem, current_scene, isMobile, sceneScaling, stage) {

    if (current_scene == 3) {
      this.scaleEntryForm(sceneScaling);
    }

    // console.log("ECS length: " + entityComponentSystem.length);

    for (var i = 0; i < entityComponentSystem.length; i++) {

      let platformScale = this.setScale(isMobile, entityComponentSystem[i], sceneScaling);
      let startValues = this.snapEdges(stage, entityComponentSystem[i]);

      entityComponentSystem[i].object.x = startValues.x + entityComponentSystem[i].x_location * sceneScaling.y * platformScale;
      entityComponentSystem[i].object.y = startValues.y + entityComponentSystem[i].y_location * sceneScaling.y * platformScale;

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
   * @param {object} isMobile - The flag that determines if on a mobile device.
   * @param {object} entityComponent - The the current entity being scaled.
   * @param {object} sceneScaling - The scaling of the scenes' dimensions.
   * @returns {object} entity_object - The entity object produced.
   */
  setScale(isMobile, entityComponent, sceneScaling) {

    let platformScale = 1;

    if (isMobile) {
    
    //   platformScale = 1.5;
    
    }

    // switch (entityComponent.type) {
    
    //   case "image":
    //     break;
    
    //   case "gui":
    //     // entityComponent.object.scale = 1.0;
    //     break;
    
    //   case "smallgui":
    //     // entityComponent.object.scale = 0.5;
    //     break;
    
    // }

    // if (mobile) {
  
    //   switch (type) {
  
    //     case "image":
    //       break;
  
    //     case "gui":
    //       image.scale = 1.0;
    //       break;
  
    //     case "smallgui":
    //       image.scale = 0.5;
    //       break;
    //   }
  
    // }
  
    // image.x = x_start + x_location;
    // image.y = y_start + y_location;

    entityComponent.object.scaleX = sceneScaling.x;
    entityComponent.object.scaleY = sceneScaling.y;

    return platformScale;

  }

  /**
   * Function to scale the entry form during the game.
   * @param {object} sceneScaling - The scaling of the scenes' dimensions.
   */
  scaleEntryForm(sceneScaling) {

    var xPosition = (284 * sceneScaling.y).toString() + "px";
    var yPosition = (960 * sceneScaling.y).toString() + "px";

    var gameEntryForm = document.getElementById("equationBanner");
    gameEntryForm.style.bottom = xPosition;
    gameEntryForm.style.right = yPosition;

  }

}
export default Scaler;
