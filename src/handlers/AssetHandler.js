////////////////////////////////////////////////////////////////////////////////
// ASSETHANDLER                                                               //
////////////////////////////////////////////////////////////////////////////////
// Handler for asset creation calls. This encompasses creating                //
// assets assets.                                                             //
////////////////////////////////////////////////////////////////////////////////

class AssetHandler {

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

    var titleFrame = new createjs.Text("TITLE", "bold 19px var(--primary-font)", "white");
    titleFrame.lineWidth = 215;
    titleFrame.name = "titleFrame";
    titleFrame.x = 7;
    titleFrame.y = 7;

    var descripterFrame = new createjs.Text("DESCRIPTER", "17px var(--primary-font)", "white");
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

    var color = getComputedStyle(document.documentElement).getPropertyValue('--dark-gold');
    var size = "24";
    // var font = "Blackadder";
    var font = getComputedStyle(document.documentElement).getPropertyValue('--primary-font');

    if (
      text == "Login" || text == "Signup" ||
      text == "Create" || text == "Cancel"
    ) {
      color = "#646464";
    }

    if (text == "Select a level") {
      size = "60";
      font = getComputedStyle(document.documentElement).getPropertyValue('--primary-font');
    }

    if (
      text == "1" || text == "2" || text == "3" || text == "4" || text == "5" ||
      text == "6" || text == "7" || text == "8" || text == "9" || text == "10" ||
      text == "11" || text == "12" || text == "13" || text == "14" || text == "15" ||
      text == "16" || text == "17" || text == "18" || text == "19" || text == "20"
    ) {
      size = "24";
      font = getComputedStyle(document.documentElement).getPropertyValue('--primary-font');
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

    // this.$emit('pushToEcs', entity_object)

    // Push into the respective ecs
    entityComponentSystem.push(entityObject);

  }

}
export default AssetHandler;
