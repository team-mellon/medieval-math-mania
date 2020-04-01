////////////////////////////////////////////////////////////////////////////////
// ASSETHANDLER                                                               //
////////////////////////////////////////////////////////////////////////////////
// Handler for asset creation abd scaling calls. This encompasses creating    //
// assets and scaling assets.                                                 //
////////////////////////////////////////////////////////////////////////////////

class AssetHandler {

  // Scale the image-like assets
  static scaleAssets (entity_component_system, current_scene, isMobile, scene_scale_Y, scene_scale_X, stage) {

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

      switch (entity_component_system[i].x_lock) {

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

      switch (entity_component_system[i].y_lock) {

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

      // switch (entity_component_system[i].type) {
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

      entity_component_system[i].object.x = x_start + entity_component_system[i].x_location * scene_scale_Y * platform_scale;
      entity_component_system[i].object.y = y_start + entity_component_system[i].y_location * scene_scale_Y * platform_scale;

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

  static createImage (location, width, height, x_lock, x_location, y_lock, y_location, type, entity_component_system, stage) {

    let image = new createjs.Bitmap(location);

    // let listener = image.on("error", function(evt, data) {
    //   console.log("'" + evt.src + "' failed to load");
    // });
    //
    // let listener2 = image.on("complete", function(evt) {
    //   console.log("Spritesheet loading complete. Check for errors.");
    // });

    stage.addChild(image);
    image.regX = width/2;
    image.regY = height/2;

    this.createAndPushEntity(entity_component_system, image, width, height, x_lock, x_location, y_lock, y_location, type);

    return image;

  }

  static createSprite (animation, width, height, x_lock, x_location, y_lock, y_location, type, entity_component_system, stage) {

    let spriteSheet = new createjs.SpriteSheet(animation);

    let listener = spriteSheet.on("error", function(evt, data) {
      console.log("'" + evt.src + "' failed to load");
    });

    let listener2 = spriteSheet.on("complete", function(evt) {
      console.log("Spritesheet loading complete. Check for errors.");
    });

    let sprite = new createjs.Sprite(spriteSheet);
    stage.addChild(sprite);
    sprite.regX = width/2;
    sprite.regY = height/2;

    this.createAndPushEntity(entity_component_system, sprite, width, height, x_lock, x_location, y_lock, y_location, type);

    return sprite;

  }

  static createText (num, font, size, style, color, width, height, x_lock, x_location, y_lock, y_location, type, entity_component_system, stage) {

    var text = new createjs.Text(num, style + " " + size + " " + font, color);
    stage.addChild(text);
    text.regX = width/2;
    text.regY = height/2;

    this.createAndPushEntity(entity_component_system, text, width, height, x_lock, x_location, y_lock, y_location, type);

    return text;

  }

  static createStatsContainer (arr, asset, num, font, size, style, color, width, height, x_lock, x_location, y_lock, y_location, type, entity_component_system, stage) {

    var text = new createjs.Text(num, style + " " + size + " " + font, color);
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

		temp.regX = width / 2;
		temp.regY = height / 2;
		temp.scale = 0.25;
		temp.name = "badge " + (count + 1);
		temp.x = j * 70;
		temp.y = -70 + i;
		container.addChild(temp);

		count++;
	    }
	}


/*
	var image = new createjs.Bitmap(asset);
	//stage.addChild(image);
	image.regX = width/2;
	image.regY = height/2;
	image.scale = 0.50;
	//image.x = 100;
	//image.y = 100;
*/

    this.createAndPushEntity(entity_component_system, container, width, height, x_lock, x_location, y_lock, y_location, type);

    return text;

  }

  static createTextContainer (animation, words, font, size, style, color, width, height, x_lock, x_location, y_lock, y_location, type, reg, entity_component_system, stage) { // }, handleClick) {

    var spriteSheet = new createjs.SpriteSheet(animation);

    let listener = spriteSheet.on("error", function(evt, data) {
      console.log("'" + evt.src + "' failed to load");
    });

    let listener2 = spriteSheet.on("complete", function(evt) {
      console.log("Spritesheet loading complete. Check for errors.");
    });

    var sprite = new createjs.Sprite(spriteSheet);
    sprite.regX = width/2;
    sprite.regY = height/2;

    var text = new createjs.Text(words, style + " " + size + " " + font, color);
    text.textAlign = "center";
    text.textBaseline = "middle";
    text.lineWidth = 700;
    text.regY = reg / 2;
    // text.regY = text.getMeasuredHeight() / 2;

    var container = new createjs.Container();
    container.addChild(sprite, text);
    stage.addChild(container);

    // button.on("click", handleClick);

    this.createAndPushEntity(entity_component_system, container, width, height, x_lock, x_location, y_lock, y_location, type);

    return container;

  }

  static createContainerFrame(width, height, x_lock, x_location, y_lock, y_location, type, entity_component_system, stage){

    var squareFrame = new createjs.Shape();
    squareFrame.graphics.beginFill("black").drawRect(0,0,220,320);
    squareFrame.name = "squareFrame";
    squareFrame.alpha = 0.8;

    var titleFrame = new createjs.Text("TITLE", "bold 19px Oldstyle", "white");
    titleFrame.lineWidth = 215;
    titleFrame.name = "titleFrame";
    titleFrame.x = 7;
    titleFrame.y = 7;

    var descripterFrame = new createjs.Text("DESCRIPTER", "17px Oldstyle", "white");
    descripterFrame.lineWidth = 215;
    descripterFrame.name = "descripterFrame";
    descripterFrame.x = 7;
    descripterFrame.y = 52;

    var containerFrame = new createjs.Container();
    containerFrame.addChild(squareFrame, titleFrame, descripterFrame);
    containerFrame.x = 100;
    containerFrame.y = 100;
    stage.addChild(containerFrame);

    this.createAndPushEntity(entity_component_system, containerFrame, width, height, x_lock, x_location, y_lock, y_location, type);

    return containerFrame;

  }

  static createButton (location, text, width, height, x_lock, x_location, y_lock, y_location, type, handleClick, entity_component_system, stage) {

    var image = new createjs.Bitmap(location);
    image.regX = width/2;
    image.regY = height/2;

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
    hit.graphics.beginFill("#000").drawRect(-25, -25, width, height);
		label.hitArea = hit;
    label.textAlign = "center";
    label.textBaseline = "middle";
    // label.x = 216/2;
    // label.y = 72/2;

    var button = new createjs.Container();
    // button.name = "button";
    // button.x = 50;
    // button.y = 25;
    button.addChild(image, label);
    stage.addChild(button);

    // image.on("click", handleClick);
    // label.on("click", handleClick);
    button.on("click", handleClick);

    this.createAndPushEntity(entity_component_system, button, width, height, x_lock, x_location, y_lock, y_location, type);

    return button;

  }

  static createAndPushEntity (entity_component_system, obj, obj_width, obj_height, obj_x_lock, obj_x_location, obj_y_lock, obj_y_location, obj_type) {

    // Create the object to go in the respective entity component system
    let entity_object = {
      object: obj,
      width: obj_width,
      height: obj_height,
      x_lock: obj_x_lock,
      x_location: obj_x_location,
      y_lock: obj_y_lock,
      y_location: obj_y_location,
      type: obj_type
    };

    // Push into the respective ecs
    entity_component_system.push(entity_object);

  }

}
export default AssetHandler;
