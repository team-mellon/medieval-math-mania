//==============================================================================
//                                                                            ||
// OBJECT                                                                     ||
//============================================================================||
//                                                                            ||
// Handler for asset creation abd scaling calls. This encompasses creating    ||
// assets and scaling assets.                                                 ||
//                                                                            ||
//==============================================================================

class Object {

  /**
   * Represents a object rendered by the engine.
   * @constructor
   * @param {string} title - The title of the book.
   * @param {string} author - The author of the book.
   * @param {string} author - The author of the book.
   */
  createBase(config, entity_component_system, stage) {

    let bitmap;
    let shape;
    let text;
    let subText;
    let container;

    let stagedObject;
    let entityObject;

    if (config.objectType === 'bitmap') {

      bitmap = new createjs.Bitmap(location);

      // addListeners(image);

      stagedObject = bitmap;

    } else if (config.objectType === 'sprite' || config.objectType === 'text_container') {

      let spriteSheet = new createjs.SpriteSheet(animation);

      addListeners(spriteSheet);

      bitmap = new createjs.Sprite(spriteSheet);

      stagedObject = bitmap;

    } else if (config.objectType === "info_container") {

      shape = new createjs.Shape();
      shape.graphics.beginFill("black").drawRect(0,0,220,320);
      shape.name = "Background";
      shape.alpha = 0.8;
  
      text = new createjs.Text("TITLE", "bold 19px Oldstyle", "white");
      text.lineWidth = 215;
      text.name = "Title";
      text.x = 7;
      text.y = 7;
  
      subText = new createjs.Text("DESCRIPTION", "17px Oldstyle", "white");
      subText.lineWidth = 215;
      subText.name = "Description";
      subText.x = 7;
      subText.y = 52;

      container = new createjs.Container();
      container.addChild(shape, text, subText);
      container.x = 100;
      container.y = 100;

      stagedObject = container;

    } else if (config.objectType === "stats_container") {

      text = new createjs.Text(num, style + " " + size + " " + font, color);
      //stage.addChild(text);
      text.regX = 50;
      text.regY = 100;
      text.x = -250;
  
      var container = new createjs.Container();
      container.addChild(text);
      stage.addChild(container);
  
  
    // NEW VERSION OF BADGES FOR STATS PAGE
  
      let count = 0;
      for(var i = 0; i <= 195; i += 65){
        for(var j = 0; j < 5; j++){
          if(arr[count] == 1)
            var temp = new createjs.Bitmap("res/badges/badge-level-" + (count + 1) + ".png");
          else
            var temp = new createjs.Bitmap(asset);

          temp.regX = config.width / 2;
          temp.regY = config.height / 2;
          temp.scale = 0.25;
          temp.name = "badge " + (count + 1);
          temp.x = j * 70;
          temp.y = -70 + i;
          container.addChild(temp);
    
          count++;
        }
      }

      entityObject = this.createEntity(container, config);
      this.pushEntity(entity_component_system, entityObject);
  
      return text;

      // stagedObject = container;

    } else if (config.objectType === "button") {

      var image = new createjs.Bitmap(location);
      image.regX = config.width/2;
      image.regY = config.height/2;
  
      var color = "#DAA520";
      var size = "24";
      // var font = "Blackadder";
      var font = "Oldstyle";
  
      if (
        text == "Login" || text == "Signup" ||
        text == "Create" || text == "Cancel"
      ) {
        color = "#646464";
      }
  
      if (text == "Select a level") {
        size = "60";
        font = "Oldstyle";
      }
  
      if (
        text == "1" || text == "2" || text == "3" || text == "4" || text == "5" ||
        text == "6" || text == "7" || text == "8" || text == "9" || text == "10" ||
        text == "11" || text == "12" || text == "13" || text == "14" || text == "15" ||
        text == "16" || text == "17" || text == "18" || text == "19" || text == "20"
      ) {
        size = "24";
        font = "Oldstyle";
        color = "#FFFFFF"
      }
  
      var label = new createjs.Text(text, "normal " + size + "px " + font, color);
      // label.name = "label";
      var hit = new createjs.Shape();
      hit.graphics.beginFill("#000").drawRect(-25, -25, config.width, config.height);
      label.hitArea = hit;
      label.textAlign = "center";
      label.textBaseline = "middle";
      // label.x = 216/2;
      // label.y = 72/2;
  
      container = new createjs.Container();
      // container.name = "button";
      // container.x = 50;
      // container.y = 25;
      container.addChild(image, label);
  
      // image.on("click", handleClick);
      // label.on("click", handleClick);
      container.on("click", handleClick);

      stagedObject = container;

    }
    
    if (config.objectType === 'text' || config.objectType === 'text_container') {

      text = new createjs.Text(num, style + " " + size + " " + font, color);

      stagedObject = text;

    }
    
    if (config.objectType === 'text_container') {

      centerRegister(bitmap, config);
  
      text.textAlign = "center";
      text.textBaseline = "middle";
      text.lineWidth = 700;
      text.regY = reg / 2;
      // text.regY = text.getMeasuredHeight() / 2;

      container = new createjs.Container();
      container.addChild(bitmap, text);

      stagedObject = container;

    }

    stage.addChild(stagedObject);
    // button.on("click", handleClick);

    if (config.objectType === 'bitmap' || config.objectType === 'sprite' || config.objectType === 'text') {
      centerRegister(stagedObject, config);
    }

    entityObject = this.createEntity(stagedObject, config);
    this.pushEntity(entity_component_system, entityObject);

    return stagedObject;

  }

  // Scale the image-like assets
  static scale(entity_component_system, current_scene, isMobile, scene_scale_Y, scene_scale_X, stage) {

    if (current_scene == 3) {

      var x_position = (284 * scene_scale_Y).toString() + "px";
      var y_position = (960 * scene_scale_Y).toString() + "px";

      // console.log(x_position);

      var game_entry_form = document.getElementById("equationBanner");
      game_entry_form.style.bottom = x_position;
      game_entry_form.style.right = y_position;

    }

    // console.log("ECS length: " + entity_component_system.length);

    for (var i = 0; i < entity_component_system.length; i++) {

      let platform_scale = 1.0;

      let x_start = stage.canvas.width / 2;
      let y_start = stage.canvas.height / 2;

      switch (entity_component_system[i].config.xLock) {

        case "left":
          x_start = 0;
          break;

        case "center":
          x_start = stage.canvas.width / 2;
          break;

        case "right":
          x_start = stage.canvas.width;
          break;

      }

      switch (entity_component_system[i].config.yLock) {

        case "top":
          y_start = 0;
          break;

        case "center":
          y_start = stage.canvas.height / 2;
          break;

        case "bottom":
          y_start = stage.canvas.height;
          break;

      }

      entity_component_system[i].object.scaleX = scene_scale_X;
      entity_component_system[i].object.scaleY = scene_scale_Y;

      // if (isMobile) {
      //
      //   platform_scale = 1.5;
      //
      // }

      // switch (entity_component_system[i].config.type) {
      //
      //   case "image":
      //     break;
      //
      //   case "gui":
      //     // ecs[i].object.scale = 1.0;
      //     break;
      //
      //   case "smallgui":
      //     // ecs[i].object.scale = 0.5;
      //     break;
      //
      // }

      entity_component_system[i].object.x = x_start + entity_component_system[i].config.xLocation * scene_scale_Y * platform_scale;
      entity_component_system[i].object.y = y_start + entity_component_system[i].config.yLocation * scene_scale_Y * platform_scale;

    }

  }

  // // Scale the image-like assets
  // scale_to_canvas: function(image, config.xLock, config.xLocation, config.yLock, config.yLocation, config.type) {
  //
  //   var x_start = stage.canvas.width / 2;
  //   var y_start = stage.canvas.height / 2;
  //
  //   image.scaleX = scene_scale_X;
  //   image.scaleY = scene_scale_Y;
  //
  //   if (mobile) {
  //
  //     switch (config.type) {
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
  //   switch (config.xLock) {
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
  //   switch (config.yLock) {
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
  //   image.x = x_start + config.xLocation;
  //   image.y = y_start + config.yLocation;
  //
  // },

  /**
   * Function to create an entity to push entity into a an entity component system.
   * @param {object} obj - The object to make into and entity.
   * @param {object} config - The object config that contains the details of the object.
   * @returns {object} entity_object - The entity object produced.
   */
  createEntity(obj, config) {

    // Create the object to go in the respective entity component system
    let entity_object = {
      object: obj,
      width: config.width,
      height: config.height,
      x_lock: config.xLock,
      x_location: config.xLocation,
      y_lock: config.yLock,
      y_location: config.yLocation,
      type: config.type
    };

    return entity_object;

  }

  /**
   * Function to push entity into a an entity component system.
   * @param {object} entityComponentSystem - The entity component system to push into.
   * @param {object} entityObject - The object to push into the ECS.
   */
  pushEntity(entityComponentSystem, entityObject) {

    // Push into the respective ecs
    entityComponentSystem.push(entityObject);

  }

  /*****************************************
  ** Object creation helpers              **
  *****************************************/

  /**
   * Function to register local object origin to to the center of the object.
   * @param {object} object - The object to re-register.
   * @param {object} config - The object config that contains the details of the object.
   */
  centerRegister(object, config) {

    // Move the object center to it relative 0, 0 coordinates
    object.regX = config.width/2;
    object.regY = config.height/2;

  }

  /**
   * Function to add loading listeners on an object.
   * @param {object} object - The object on which to add the listeners.
   */
  addListeners(object) {

    // Add error listener for object loading
    let error = object.on("error", function(evt, data) {
      console.log("'" + evt.src + "' failed to load");
    });

    // Add completion listener for object loading
    let complete = object.on("complete", function(evt) {
      console.log("Spritesheet loading complete. Check for errors.");
    });

  }

}

export default Object;