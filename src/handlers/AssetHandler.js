////////////////////////////////////////////////////////////////////////////////
// ASSETHANDLER                                                               //
////////////////////////////////////////////////////////////////////////////////
// Handler for asset creation abd scaling calls. This encompasses creating    //
// assets and scaling assets.                                                 //
////////////////////////////////////////////////////////////////////////////////

class AssetHandler {

  // Scale the image-like assets
  static scaleAssets (entityComponentSystem, current_scene, isMobile, scene_scale_Y, scene_scale_X, stage) {

    let sceneScaling = {
      x: scene_scale_X,
      y: scene_scale_Y
    }

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

  static createImage(location, config, entityComponentSystem, stage) {

    let image = new createjs.Bitmap(location);

    // let listener = image.on("error", function(evt, data) {
    //   console.log("'" + evt.src + "' failed to load");
    // });
    
    // let listener2 = image.on("complete", function(evt) {
    //   console.log("Spritesheet loading complete. Check for errors.");
    // });

    stage.addChild(image);
    image.regX = config.width/2;
    image.regY = config.height/2;

    this.createAndPushEntity(entityComponentSystem, image, config);

    return image;

  }

  static createSprite (animation, config, entityComponentSystem, stage) {

    let spriteSheet = new createjs.SpriteSheet(animation);

    let listener = spriteSheet.on("error", function(evt, data) {
      console.log("'" + evt.src + "' failed to load");
    });

    let listener2 = spriteSheet.on("complete", function(evt) {
      console.log("Spritesheet loading complete. Check for errors.");
    });

    let sprite = new createjs.Sprite(spriteSheet);
    stage.addChild(sprite);
    sprite.regX = config.width/2;
    sprite.regY = config.height/2;

    this.createAndPushEntity(entityComponentSystem, sprite, config);

    return sprite;

  }

  static createText (num, font, size, style, color, config, entityComponentSystem, stage) {

    var text = new createjs.Text(num, style + " " + size + " " + font, color);
    stage.addChild(text);
    text.regX = config.width/2;
    text.regY = config.height/2;

    this.createAndPushEntity(entityComponentSystem, text, config);

    return text;

  }

  static createTextContainer (animation, words, font, size, style, color, config, reg, entityComponentSystem, stage) { // }, handleClick) {

    var spriteSheet = new createjs.SpriteSheet(animation);

    let listener = spriteSheet.on("error", function(evt, data) {
      console.log("'" + evt.src + "' failed to load");
    });

    let listener2 = spriteSheet.on("complete", function(evt) {
      console.log("Spritesheet loading complete. Check for errors.");
    });

    var sprite = new createjs.Sprite(spriteSheet);
    sprite.regX = config.width/2;
    sprite.regY = config.height/2;

    var text = new createjs.Text(words, style + ' ' + size + ' ' + font, color);
    text.textAlign = 'center';
    text.textBaseline = 'middle';
    text.lineWidth = 700;
    text.regY = reg / 2;
    // text.regY = text.getMeasuredHeight() / 2;

    var container = new createjs.Container();
    container.addChild(sprite, text);
    stage.addChild(container);

    // button.on("click", handleClick);

    this.createAndPushEntity(entityComponentSystem, text, config);

    return container;

  }

  static createStatsContainer (arr, asset, num, font, size, style, color, config, entityComponentSystem, stage) {

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

    this.createAndPushEntity(entityComponentSystem, text, config);

    return text;

  }

  static createContainerFrame(config, entityComponentSystem, stage){

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

    this.createAndPushEntity(entityComponentSystem, containerFrame, config);

    return containerFrame;

  }

  static createButton (location, text, config, handleClick, entityComponentSystem, stage) {

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

    var button = new createjs.Container();
    // button.name = "button";
    // button.x = 50;
    // button.y = 25;
    button.addChild(image, label);
    stage.addChild(button);

    // image.on("click", handleClick);
    // label.on("click", handleClick);
    button.on("click", handleClick);

    this.createAndPushEntity(entityComponentSystem, button, config);

    return button;

  }

  static createAndPushEntity(entityComponentSystem, obj, config) {

    // Create the object to go in the respective entity component system
    let entityObject = {
      object: obj,
      width: config.width,
      height: config.height,
      x_lock: config.xLock,
      x_location: config.xOffset,
      y_lock: config.yLock,
      y_location: config.yOffset,
      type: config.type
    };

    this.pushEntity(entityComponentSystem, entityObject);

  }

  static pushEntity(entityComponentSystem, entityObject) {

    // Push into the respective ecs
    entityComponentSystem.push(entityObject);

  }

}
export default AssetHandler;
