<template>

  <div id="deviceLayer">

    <SceneLayer :input="input" :scale="scale" :mobile="mobile" @resize="resize" ref="sceneLayer" />
    <Scaling ref="scaling" :width="width" :height="height" />

  </div>

</template>

<script>

  // Modules
  import SceneLayer from './SceneLayer.vue';
  import Scaling from './Scaling.vue'
  // import Mobile from './Mobile.vue'
  // import Input from './Input.vue'

  // Submodules
  import MobileHandler from '../handlers/MobileHandler.js';
  import InputHandler from '../handlers/InputHandler.js';

  export default {

    name: 'DeviceLayer',
    components: {

      // Initialize the scene manager.
      SceneLayer,
      Scaling

    },
    data () {
      return {

        // Authentication handling
        async: {
          error: ''
        },

        height: window.innerHeight,
        width: window.innerWidth,

        // ////////////
        // // MOBILE //
        // ////////////

        // Mobile handler
        mobile: null,

        // ///////////
        // // INPUT //
        // ///////////

        // Input handler
        input: null,

        // Enable mouse events with scene objects
        // ???
        second_title: null,

        // Scene scaling variables
        scale: {
          x: 1.0,
          y: 1.0,
          maxY: 1440,
          maxX: 1920,
          ratio: 1440 / 1920,
          xMargin: 0.0,
          maxStored: false,
        },

      }
    },

    /**
     * Constructor for the scaling component of the engine.
     * @constructor
     */
    mounted: function() {

      // Create the Mobile handler
      this.mobile = new MobileHandler();

      // Create the Input handler
      this.input = new InputHandler(this.$refs.sceneLayer.stage);



      // Create the Scaling handler
      // this.scaling = new ScalingHandler();

      // Set the window resize function
      window.addEventListener('resize', this.resize, false);



    },

    methods: {

      /**
       * Function to scale the entire stage.
       */
      resize: function() {

        this.mobile.mobileDeviceCheck();

        this.$refs.sceneLayer.refreshScene();

        this.width = this.$refs.sceneLayer.stage.canvas.width;
        this.height = this.$refs.sceneLayer.stage.canvas.height;

        this.$refs.scaling.calculateScaling();



        // Re-create the landscape warning background
        this.$refs.sceneLayer.landscape_warning.graphics.clear()
        this.$refs.sceneLayer.landscape_warning.graphics.beginFill("#000000").drawRect(0, 0, this.$refs.sceneLayer.stage.canvas.width, this.$refs.sceneLayer.stage.canvas.height);



        if (this.$refs.sceneLayer.currentScene == 3) {
          this.scaleAssets(this.$refs.sceneLayer.level.lcs); // Scale scene appropriately
        }

        this.scaleAssets(this.$refs.sceneLayer.sceneComponentSystem); // Scale scene appropriately
        // this.scaleAssets(this.gcs, this.$refs.sceneLayer.currentScene, this.$refs.scaling.scale.y, this.$refs.scaling.scale.x); // Scale scene appropriately



        this.$refs.sceneLayer.stage.update()

      },

      /**
       * Function to scale the image-like assets.
       * @param {object} entityComponentSystem - The array of entities.
       */
      scaleAssets: function(entityComponentSystem) {

        // console.log("ECS length: " + entityComponentSystem.length);

        if (this.$refs.sceneLayer.currentScene == 3) {

          this.scaleEntryForm();

        }

        for (var i = 0; i < entityComponentSystem.length; i++) {

          let platformScale = this.setScale(entityComponentSystem[i]);
          let startValues = this.snapEdges(entityComponentSystem[i]);

          entityComponentSystem[i].object.x = startValues.x + entityComponentSystem[i].x_location * this.$refs.scaling.scale.y * platformScale;
          entityComponentSystem[i].object.y = startValues.y + entityComponentSystem[i].y_location * this.$refs.scaling.scale.y * platformScale;

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
        if (this.mobile.isMobile) {

          // Set mobile scale.
          platformScale = 1.5;

          switch (entityComponent.type) {

            case "image":
              platformScale = 1.0;
              break;

            case "gui":
              platformScale = 2.5;
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

        let additionalScaling = 1.0;

        // If the entity is a gui...
        if (entityComponent.type == 'largegui') {

          additionalScaling = 2.0;
          // platformScale = 2.0;

        }

        entityComponent.object.scaleX = this.$refs.scaling.scale.x * additionalScaling;
        entityComponent.object.scaleY = this.$refs.scaling.scale.y * additionalScaling;

        return platformScale;

      },

      /**
       * Function to scale the entry form during the game.
       */
      scaleEntryForm: function() {

        // Set the position values of the form
        var xPosition = (284 * this.$refs.scaling.scale.y).toString() + "px";
        var yPosition = (960 * this.$refs.scaling.scale.y).toString() + "px";

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
