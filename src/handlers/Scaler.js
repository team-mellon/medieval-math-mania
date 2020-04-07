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
  // screen_ratio = this.maxScaleY / this.maxScaleX
  scene_margin_X = 0.0;
  added = false;
  max_stored = false;
  temp_scale = 1;
  temp_max = 1440

  // Scale the image-like assets
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
  //   var x_start = stage.canvas.width / 2;
  //   var y_start = stage.canvas.height / 2;
  //
  //   image.scaleX = scene_scale_X;
  //   image.scaleY = scene_scale_Y;
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
  //   switch (x_lock) {
  //
  //     case "left":
  //       var x_start = 0;
  //       break;
  //
  //     case "center":
  //       var x_start = stage.canvas.width / 2;
  //       break;
  //
  //     case "right":
  //       var x_start = stage.canvas.width;
  //       break;
  //
  //   }
  //
  //   switch (y_lock) {
  //
  //     case "top":
  //       var y_start = 0;
  //       break;
  //
  //     case "center":
  //       var y_start = stage.canvas.height / 2;
  //       break;
  //
  //     case "bottom":
  //       var y_start = stage.canvas.height;
  //       break;
  //
  //   }
  //
  //   image.x = x_start + x_location;
  //   image.y = y_start + y_location;
  //
  // },

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

    return { x: xStart, y: yStart }

  }

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

  static scaleEntryForm(sceneScaling) {

    var xPosition = (284 * sceneScaling.y).toString() + "px";
    var yPosition = (960 * sceneScaling.y).toString() + "px";

    var gameEntryForm = document.getElementById("equationBanner");
    gameEntryForm.style.bottom = xPosition;
    gameEntryForm.style.right = yPosition;

  }

}
export default Scaler;
