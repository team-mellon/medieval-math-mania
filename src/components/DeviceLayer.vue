<template>

  <div id="deviceLayer">
    
    <SceneLayer v-bind:input="input" v-bind:scale="scale" v-bind:mobile="device" @resize="resize" ref="sceneLayer" />

  </div>

</template>

<script>

  // Modules
  import SceneLayer from './SceneLayer.vue';

  // Submodules
  import MobileHandler from '../handlers/MobileHandler.js';
  import InputHandler from '../handlers/InputHandler.js';

  export default {

    name: 'DeviceLayer',
    components: {

      // Initialize the scene manager.
      SceneLayer

    },
    data () {
      return {

        // Authentication handling
        async: {
          error: ''
        },

        // ////////////
        // // MOBILE //
        // ////////////

        device: null,

        // ///////////
        // // INPUT //
        // ///////////

        // Input handler
        input: null,

        // Enable mouse events with scene objects
        // ???
        second_title: null,

        // /////////////
        // // SCALING //
        // /////////////

        // Scene scaling variables
        scale: {
          x: 1.0,
          y: 1.0,
          maxY: 1440,
          maxX: 1920,
          ratio: 1440 / 1920,
        },

        maxScaleY: 1440,
        maxScaleX: 1920,
        screenRatio: 1440 / 1920,
        sceneMarginX: 0.0,
        maxStored: false,
        tempScale: 1,
        tempMax: 1440,

      }
    },

    /**
     * Constructor for the scaling component of the engine.
     * @constructor
     */
    mounted: function() {

      // Initialize the engine modules.

      // Mobile manager
      this.device = new MobileHandler();

      // Create the Input handler
      this.input = new InputHandler(this.$refs.sceneLayer.stage);

      // Scene scaling variables
      this.screenRatio = this.maxScaleY / this.maxScaleX;

      // Set the window resize function
      window.addEventListener('resize', this.resize, false);

    },

    methods: {

      /**
       * Function to scale the entire stage.
       */
      resize: function() {

        this.$refs.sceneLayer.loadOrientationAnimation()
        // Redraw background before everthing else for Z-axis reasons
        this.$refs.sceneLayer.redrawBackground();



        this.device.mobileCheck(console, navigator);
        this.device.orientationCheck(console, window);



        // If window height is greater than width
        this.$refs.sceneLayer.setOrientationAnimation(this.device.isMobile, this.device.isPortrait)
        this.$refs.sceneLayer.resizeCanvas();

        this.screenRatio = this.$refs.sceneLayer.stage.canvas.width / this.$refs.sceneLayer.stage.canvas.height;

        if (window.innerWidth < 600) {
          // gui_scale = 3;
        } else if (window.innerWidth < 900) {
          // gui_scale = 2;
        } else {
          // gui_scale = 1;
        }



        this.calculateScaling();

        // Calculate the scene margin in a given direction
        this.sceneMarginX = ( this.$refs.sceneLayer.stage.canvas.width - this.maxScaleX ) / 2;

        // Log screen scaling for debugging purposes
        // console.log(this.scale.x);
        // console.log(this.scale.y);
        // console.log(this.screenRatio);


        // Re-create the landscape warning background
        this.$refs.sceneLayer.landscape_warning.graphics.clear()
        this.$refs.sceneLayer.landscape_warning.graphics.beginFill("#000000").drawRect(0, 0, this.$refs.sceneLayer.stage.canvas.width, this.$refs.sceneLayer.stage.canvas.height);



        if (this.$refs.sceneLayer.currentScene == 3) {
          this.scaleAssets(this.$refs.sceneLayer.level.lcs, this.$refs.sceneLayer.currentScene); // Scale scene appropriately
        }



        this.scaleAssets(this.$refs.sceneLayer.sceneComponentSystem, this.$refs.sceneLayer.currentScene); // Scale scene appropriately
        // this.scaleAssets(this.gcs, currentScene, this.scale.y, this.scale.x); // Scale scene appropriately



        this.$refs.sceneLayer.stage.update()

      },

      /**
       * Function to check the orientation of the device.
       */

      /**
       * Calculate the scene scaling.
       */
      calculateScaling: function() {

        // Calculate the scene scaling
        if (this.screenRatio < 2.5) { // tall screen

          // Calculate the scale with the max x scaling
          this.maxStored = false;
          this.scale.x = this.$refs.sceneLayer.stage.canvas.width / this.maxScaleX;
          this.scale.y = this.$refs.sceneLayer.stage.canvas.width / this.maxScaleX;
          let key = 'sceneScaleY';
          sessionStorage.setItem(key, this.scale.y);

        } else if (this.screenRatio > 2.5) { // wide screen


          if(!this.maxStored) {
            this.maxStored = true;
            this.tempMax = this.$refs.sceneLayer.stage.canvas.height;
          }

          this.tempScale = this.$refs.sceneLayer.stage.canvas.width / this.maxScaleX;
          this.scale.x = this.tempScale * ( this.$refs.sceneLayer.stage.canvas.height / this.tempMax );
          this.scale.y = this.tempScale * ( this.$refs.sceneLayer.stage.canvas.height / this.tempMax );
          let key = 'sceneScaleY';
          sessionStorage.setItem(key, this.scale.y);

        }

      },

      /**
       * Function to scale the image-like assets.
       * @param {object} entityComponentSystem - The array of entities.
       */
      scaleAssets: function(entityComponentSystem, currentScene) {

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

      },

      /**
       * Function to snap items to the edges of screen.
       * @param {object} entityComponent - The the current entity being scaled.
       * @returns {object} startValues : { x: xStart, y: yStart } - The starting location values.
       */
      snapEdges: function(entityComponent) {

        let xStart = this.$refs.sceneLayer.stage.canvas.width / 2;
        let yStart = this.$refs.sceneLayer.stage.canvas.height / 2;

        switch (entityComponent.x_lock) {

          case "left":
            xStart = 0;
            break;

          case "center":
            xStart = this.$refs.sceneLayer.stage.canvas.width / 2;
            break;

          case "right":
            xStart = this.$refs.sceneLayer.stage.canvas.width;
            break;

        }

        switch (entityComponent.y_lock) {

          case "top":
            yStart = 0;
            break;

          case "center":
            yStart = this.$refs.sceneLayer.stage.canvas.height / 2;
            break;

          case "bottom":
            yStart = this.$refs.sceneLayer.stage.canvas.height;
            break;

        }

        return { x: xStart, y: yStart };

      },

      /**
       * Function to scale an individual entity.
       * @param {object} entityComponent - The the current entity being scaled.
       * @returns {object} platformScale - The platform specific scale of that entity.
       */
      setScale: function(entityComponent) {

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

      },

      /**
       * Function to scale the entry form during the game.
       */
      scaleEntryForm: function() {

        // Set the position values of the form
        var xPosition = (284 * this.scale.y).toString() + "px";
        var yPosition = (960 * this.scale.y).toString() + "px";

        // Set the actual html element values
        var gameEntryForm = document.getElementById("equationBanner");
        gameEntryForm.style.bottom = xPosition;
        gameEntryForm.style.right = yPosition;

      }

    }

  }

</script>

<style>
</style>
