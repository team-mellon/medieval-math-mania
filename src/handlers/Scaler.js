//==============================================================================
//                                                                            ||
// SCALER                                                                     ||
//============================================================================||
//                                                                            ||
// This module is a handler for asset scaling.                                ||
//                                                                            ||
//==============================================================================

class Scaler {

  maxScaleY = 1440;
  maxScaleX = 1920;
  screen_ratio = this.maxScaleY / this.maxScaleX
  scene_margin_X = 0.0;
  added = false;
  max_stored = false;
  temp_scale = 1;
  temp_max = 1440

  /**
   * Function to scale the image-like assets.
   * @param {object} entityComponentSystem - The array of entities.
   * @param {object} current_scene - The index of the current scene.
   * @param {object} isMobile - The flag that determines if on a mobile device.
   * @param {object} sceneScaling - The scaling of the scenes' dimensions.
   * @param {object} stage - The stage that displays the content.
   */
  static scaleAssets (entityComponentSystem, current_scene, isMobile, sceneScaling, stage) {

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

  // // Scale the image-like assets
  // scale_to_canvas: function(image, x_lock, x_location, y_lock, y_location, type) {
  //
  //   if (mobile) {
  //
  //     switch (type) {
  //
  //       case "image":
  //         break;
  //
  //       case "gui":
  //         image.scale = 1.0;
  //         break;
  //
  //       case "smallgui":
  //         image.scale = 0.5;
  //         break;
  //     }
  //
  //   }
  //
  //   image.x = x_start + x_location;
  //   image.y = y_start + y_location;
  //
  // },

  /**
   * Function to snap items to the edges of screen.
   * @param {object} stage - The stage that displays the content.
   * @param {object} entityComponent - The the current entity being scaled.
   * @returns {object} startValues : { x: xStart, y: yStart } - The starting location values.
   */
  static snapEdges(stage, entityComponent) {

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
  static setScale(isMobile, entityComponent, sceneScaling) {

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

    entityComponent.object.scaleX = sceneScaling.x;
    entityComponent.object.scaleY = sceneScaling.y;

    return platformScale;

  }

  /**
   * Function to scale the entry form during the game.
   * @param {object} sceneScaling - The scaling of the scenes' dimensions.
   */
  static scaleEntryForm(sceneScaling) {

    var xPosition = (284 * sceneScaling.y).toString() + "px";
    var yPosition = (960 * sceneScaling.y).toString() + "px";

    var gameEntryForm = document.getElementById("equationBanner");
    gameEntryForm.style.bottom = xPosition;
    gameEntryForm.style.right = yPosition;

  }

}
export default Scaler;
