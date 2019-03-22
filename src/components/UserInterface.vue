<!-- User Interface creation functions -->

<template>
  <div id="userInterfaceModule">
  </div>
</template>

<script>

export default {

  name: 'UserInterface',

  data () {
    return {
    }
  },

  mounted: function() {

    function createImage(location, width, height, x_lock, x_location, y_lock, y_location, type) {

      var image = new createjs.Bitmap(location);
    	stage.addChild(image);
      image.regX = width/2;
      image.regY = height/2;

      var entity_object = {
        object: image,
        width: width,
        height: height,
        x_lock: x_lock,
        x_location: x_location,
        y_lock: y_lock,
        y_location: y_location,
        type: type
      };

      this.$emit('pushToEcs', entity_object)

      return image;

    }

    function createSprite(animation, width, height, x_lock, x_location, y_lock, y_location, type) {

      console.log("Spritesheet loading starting.");

      var spriteSheet = new createjs.SpriteSheet(animation);

      var listener = spriteSheet.on("error", function(evt, data) {
        console.log("'" + evt.src + "' failed to load");
      });

      var listener2 = spriteSheet.on("complete", function(evt) {
        console.log("Spritesheet loading complete. Check for errors.");
      });

      var sprite = new createjs.Sprite(spriteSheet);
      stage.addChild(sprite);
      sprite.regX = width/2;
      sprite.regY = height/2;

      var entity_object = {
        object: sprite,
        width: width,
        height: height,
        x_lock: x_lock,
        x_location: x_location,
        y_lock: y_lock,
        y_location: y_location,
        type: type
      };

      this.$emit('pushToEcs', entity_object)

      return sprite;

    }

    function createLevelSprite(animation, width, height, x_lock, x_location, y_lock, y_location, type) {

      var spriteSheet = new createjs.SpriteSheet(animation);

      let listener = spriteSheet.on("error", function(evt, data) {
        console.log("'" + evt.src + "' failed to load");
      });

      let listener2 = spriteSheet.on("complete", function(evt) {
        console.log("Spritesheet loading complete. Check for errors.");
      });

      var sprite = new createjs.Sprite(spriteSheet);
      stage.addChild(sprite);
      sprite.regX = width/2;
      sprite.regY = height/2;

      var entity_object = {
        object: sprite,
        width: width,
        height: height,
        x_lock: x_lock,
        x_location: x_location,
        y_lock: y_lock,
        y_location: y_location,
        type: type
      };

      this.$emit('pushToLcs', entity_object)

      return sprite;

    }

    function createButton(location, text, width, height, x_lock, x_location, y_lock, y_location, type, handleClick) {

      var image = new createjs.Bitmap(location);
      image.regX = width/2;
      image.regY = height/2;

      var color = "#DAA520";
      var size = "24";
      var font = "Blackadder";

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
        text == "1" ||
        text == "2" ||
        text == "3" ||
        text == "4" ||
        text == "5" ||
        text == "6" ||
        text == "7" ||
        text == "8" ||
        text == "9" ||
        text == "10" ||
        text == "11" ||
        text == "12" ||
        text == "13" ||
        text == "14" ||
        text == "15" ||
        text == "16" ||
        text == "17" ||
        text == "18" ||
        text == "19" ||
        text == "20"
      ) {
        size = "16";
        font = "Oldstyle";
        color = "#FFFFFF"
      }

      var label = new createjs.Text(text, "normal " + size + "px " + font, color);
      // label.name = "label";
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

      var entity_object = {
        object: button,
        width: width,
        height: height,
        x_lock: x_lock,
        x_location: x_location,
        y_lock: y_lock,
        y_location: y_location,
        type: type
      };

      this.$emit('pushToEcs', entity_object)

      return button;

    }

    function createText(num, font, size, style, color, width, height, x_lock, x_location, y_lock, y_location, type) {

      var text = new createjs.Text(num, style + " " + size + " " + font, color);
    	stage.addChild(text);
      text.regX = width/2;
      text.regY = height/2;

      var entity_object = {
        object: text,
        width: width,
        height: height,
        x_lock: x_lock,
        x_location: x_location,
        y_lock: y_lock,
        y_location: y_location,
        type: type
      };

      this.$emit('pushToEcs', entity_object)

      return text;

    }

    function createLevelText(num, font, size, style, color, width, height, x_lock, x_location, y_lock, y_location, type) {

      var text = new createjs.Text(num, style + " " + size + " " + font, color);
    	stage.addChild(text);
      text.regX = width/2;
      text.regY = height/2;

      var entity_object = {
        object: text,
        width: width,
        height: height,
        x_lock: x_lock,
        x_location: x_location,
        y_lock: y_lock,
        y_location: y_location,
        type: type
      };

      this.$emit('pushToLcs', entity_object)

      return text;

    }

    function createTextContainer(animation, words, font, size, style, color, width, height, x_lock, x_location, y_lock, y_location, type, reg) { // }, handleClick) {

      var spriteSheet = new createjs.SpriteSheet(animation);
      var sprite = new createjs.Sprite(spriteSheet);
      sprite.regX = width/2;
      sprite.regY = height/2;

      var text = new createjs.Text(words, style + " " + size + " " + font, color);
      text.textAlign = "center";
      text.textBaseline = "middle";
      text.regY = reg / 2;

      var container = new createjs.Container();
      container.addChild(sprite, text);
      stage.addChild(container);

      // button.on("click", handleClick);

      var entity_object = {
        object: container,
        width: width,
        height: height,
        x_lock: x_lock,
        x_location: x_location,
        y_lock: y_lock,
        y_location: y_location,
        type: type
      };

      this.$emit('pushToEcs', entity_object)

      return text;

    }

    function createLevelTextContainer(animation, words, font, size, style, color, width, height, x_lock, x_location, y_lock, y_location, type, reg) { // }, handleClick) {

      var spriteSheet = new createjs.SpriteSheet(animation);
      var sprite = new createjs.Sprite(spriteSheet);
      sprite.regX = width/2;
      sprite.regY = height/2;

      var text = new createjs.Text(words, style + " " + size + " " + font, color);
      text.textAlign = "center";
      text.textBaseline = "middle";
      text.regY = reg / 2;

      var container = new createjs.Container();
      container.addChild(sprite, text);
      stage.addChild(container);

      // button.on("click", handleClick);

      var entity_object = {
        object: container,
        width: width,
        height: height,
        x_lock: x_lock,
        x_location: x_location,
        y_lock: y_lock,
        y_location: y_location,
        type: type
      };

      this.$emit('pushToLcs', entity_object)

      return text;

    }

  },

  methods: {

    createImage: function(location, width, height, x_lock, x_location, y_lock, y_location, type) {

      var image = new createjs.Bitmap(location);
    	stage.addChild(image);
      image.regX = width/2;
      image.regY = height/2;

      var entity_object = {
        object: image,
        width: width,
        height: height,
        x_lock: x_lock,
        x_location: x_location,
        y_lock: y_lock,
        y_location: y_location,
        type: type
      };

      this.$emit('pushToEcs', entity_object)

      return image;

    },

    createSprite: function(animation, width, height, x_lock, x_location, y_lock, y_location, type) {

      console.log("Spritesheet loading starting.");

      var spriteSheet = new createjs.SpriteSheet(animation);

      var listener = spriteSheet.on("error", function(evt, data) {
        console.log("'" + evt.src + "' failed to load");
      });

      var listener2 = spriteSheet.on("complete", function(evt) {
        console.log("Spritesheet loading complete. Check for errors.");
      });

      var sprite = new createjs.Sprite(spriteSheet);
      stage.addChild(sprite);
      sprite.regX = width/2;
      sprite.regY = height/2;

      var entity_object = {
        object: sprite,
        width: width,
        height: height,
        x_lock: x_lock,
        x_location: x_location,
        y_lock: y_lock,
        y_location: y_location,
        type: type
      };

      this.$emit('pushToEcs', entity_object)

      return sprite;

    },

    createLevelSprite: function(animation, width, height, x_lock, x_location, y_lock, y_location, type) {

      var spriteSheet = new createjs.SpriteSheet(animation);

      let listener = spriteSheet.on("error", function(evt, data) {
        console.log("'" + evt.src + "' failed to load");
      });

      let listener2 = spriteSheet.on("complete", function(evt) {
        console.log("Spritesheet loading complete. Check for errors.");
      });

      var sprite = new createjs.Sprite(spriteSheet);
      stage.addChild(sprite);
      sprite.regX = width/2;
      sprite.regY = height/2;

      var entity_object = {
        object: sprite,
        width: width,
        height: height,
        x_lock: x_lock,
        x_location: x_location,
        y_lock: y_lock,
        y_location: y_location,
        type: type
      };

      this.$emit('pushToLcs', entity_object)

      return sprite;

    },

    createButton: function(location, text, width, height, x_lock, x_location, y_lock, y_location, type, handleClick) {

      var image = new createjs.Bitmap(location);
      image.regX = width/2;
      image.regY = height/2;

      var color = "#DAA520";
      var size = "24";
      var font = "Blackadder";

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
        text == "1" ||
        text == "2" ||
        text == "3" ||
        text == "4" ||
        text == "5" ||
        text == "6" ||
        text == "7" ||
        text == "8" ||
        text == "9" ||
        text == "10" ||
        text == "11" ||
        text == "12" ||
        text == "13" ||
        text == "14" ||
        text == "15" ||
        text == "16" ||
        text == "17" ||
        text == "18" ||
        text == "19" ||
        text == "20"
      ) {
        size = "16";
        font = "Oldstyle";
        color = "#FFFFFF"
      }

      var label = new createjs.Text(text, "normal " + size + "px " + font, color);
      // label.name = "label";
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

      var entity_object = {
        object: button,
        width: width,
        height: height,
        x_lock: x_lock,
        x_location: x_location,
        y_lock: y_lock,
        y_location: y_location,
        type: type
      };

      this.$emit('pushToEcs', entity_object)

      return button;

    },

    createText: function(num, font, size, style, color, width, height, x_lock, x_location, y_lock, y_location, type) {

      var text = new createjs.Text(num, style + " " + size + " " + font, color);
    	stage.addChild(text);
      text.regX = width/2;
      text.regY = height/2;

      var entity_object = {
        object: text,
        width: width,
        height: height,
        x_lock: x_lock,
        x_location: x_location,
        y_lock: y_lock,
        y_location: y_location,
        type: type
      };

      this.$emit('pushToEcs', entity_object)

      return text;

    },

    createLevelText: function(num, font, size, style, color, width, height, x_lock, x_location, y_lock, y_location, type) {

      var text = new createjs.Text(num, style + " " + size + " " + font, color);
    	stage.addChild(text);
      text.regX = width/2;
      text.regY = height/2;

      var entity_object = {
        object: text,
        width: width,
        height: height,
        x_lock: x_lock,
        x_location: x_location,
        y_lock: y_lock,
        y_location: y_location,
        type: type
      };

      this.$emit('pushToLcs', entity_object)

      return text;

    },

    createTextContainer: function(animation, words, font, size, style, color, width, height, x_lock, x_location, y_lock, y_location, type, reg) { // }, handleClick) {

      var spriteSheet = new createjs.SpriteSheet(animation);
      var sprite = new createjs.Sprite(spriteSheet);
      sprite.regX = width/2;
      sprite.regY = height/2;

      var text = new createjs.Text(words, style + " " + size + " " + font, color);
      text.textAlign = "center";
      text.textBaseline = "middle";
      text.regY = reg / 2;

      var container = new createjs.Container();
      container.addChild(sprite, text);
      stage.addChild(container);

      // button.on("click", handleClick);

      var entity_object = {
        object: container,
        width: width,
        height: height,
        x_lock: x_lock,
        x_location: x_location,
        y_lock: y_lock,
        y_location: y_location,
        type: type
      };

      this.$emit('pushToEcs', entity_object)

      return text;

    },

    createLevelTextContainer: function(animation, words, font, size, style, color, width, height, x_lock, x_location, y_lock, y_location, type, reg) { // }, handleClick) {

      var spriteSheet = new createjs.SpriteSheet(animation);
      var sprite = new createjs.Sprite(spriteSheet);
      sprite.regX = width/2;
      sprite.regY = height/2;

      var text = new createjs.Text(words, style + " " + size + " " + font, color);
      text.textAlign = "center";
      text.textBaseline = "middle";
      text.regY = reg / 2;

      var container = new createjs.Container();
      container.addChild(sprite, text);
      stage.addChild(container);

      // button.on("click", handleClick);

      var entity_object = {
        object: container,
        width: width,
        height: height,
        x_lock: x_lock,
        x_location: x_location,
        y_lock: y_lock,
        y_location: y_location,
        type: type
      };

      lcs.push(entity_object);

      return text;

    }

  }

}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
