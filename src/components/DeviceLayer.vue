<template>

  <div id="deviceLayer">

    <Loader v-bind:loading-manifest="manifest" @loaded="primed" ref="loader" />
    <!-- <SceneLayer /> -->

  </div>

</template>

<script>

  // Modules
  import Loader from './Loader.vue';
  import Director from '../handlers/Director.js';

  // Static classes
  import AssetHandler from '../handlers/AssetHandler.js';

  // Submodules
  import MobileHandler from '../handlers/MobileHandler.js';
  import InputHandler from '../handlers/InputHandler.js';

  // Models
  import ObjectConfig from '../structures/ObjectConfig'

  // Game Data
  import { sceneManifest } from '../game_data/scenes.js';

  export default {

    name: 'DeviceLayer',
    components: {
      Loader
    },
    data () {
      return {

        sceneCreated: false,
        manifest: [],

        // config: {
        //   canvasId: 'drawingCanvas',
        // },

        // Authentication handling
        async: {
          error: ''
        },

        // Scene manager.
        director: null,

        // ////////////
        // // MOBILE //
        // ////////////

        // Mobile manager
        device: new MobileHandler(),

        // Landscape warning backdrop
        landscape_warning: new createjs.Shape(),

        phone_rotation: null,

        // Phone rotation image variable
        phone_rotationS: {
          images: ["res/phone-rotation.png"],
          frames: {width:288, height:288, count:2, regX: 0, regY:0, spacing:0, margin:0},
          framerate: 2
        },

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
        added: false,
        maxStored: false,
        tempScale: 1,
        tempMax: 1440,

        //
        background: {
          entity: {},
          shape: null,
          color: '#808080',
          center: null,
          left: null,
          right: null,
          up: null,
          down: null
        },
      }
    },

    /**
     * Constructor for the scaling component of the engine.
     * @constructor
     */
    mounted: function() {

      this.manifest = sceneManifest;

      // Initialize the scene manager.
      this.director = new Director(),

      // Initialize the engine modules.

      // Create the Input handler
      this.input = new InputHandler(this.director.stage);

      // Scene scaling variables
      this.screenRatio = this.maxScaleY / this.maxScaleX;

      // Set the window resize function
      window.addEventListener('resize', this.resize, false);

      // Ticker to run game loop
      createjs.Ticker.setFPS(30);                                 // Set FPS (could be depricated?)
      createjs.Ticker.addEventListener('tick', this.tick);        // Set tisk listener for use as game loop

    },

    methods: {

      tick: function(event) {

        //  If the assets are loaded and the scene is not created...
        if (this.$refs.loader.loaded && !this.sceneCreated) {

          // Create the first 'currentScene'
          this.director.createScene(); // Create scene assets

          // Rescale the view to size the scene to the device.
          this.resize(); // Resize to set initial scale

          // Set the loaded flag.
          this.sceneCreated = true;

        }

        // Run the scene.
        this.director.runScene(this);

        // Update the stage.
        this.director.stage.update(event);

      },

      primed: function(event) {

      },

      /**
       * Callback to run after assets are preloaded.
       */
      preloaded: function(event) {

      },

      /**
       * Function to scale the entire stage.
       */
      resize: function() {

        this.loadOrientationAnimation(this.director.sceneComponentSystem)

        // Redraw background before everthing else for Z-axis reasons
        this.director.background.shape.graphics.clear()
        this.director.background.shape.graphics.beginFill(this.director.background.color).drawRect(0, 0, this.director.stage.canvas.width, this.director.stage.canvas.height);

        this.device.mobileCheck(console, navigator);
        this.device.orientationCheck(console, window);

        // If window height is greater than width
        this.checkOrientation();

        // Resize the canvas element with new window size
        this.director.stage.canvas.width = window.innerWidth;
        this.director.stage.canvas.height = window.innerHeight;

        this.screenRatio = this.director.stage.canvas.width / this.director.stage.canvas.height;

        if (window.innerWidth < 600) {
          // gui_scale = 3;
        } else if (window.innerWidth < 900) {
          // gui_scale = 2;
        } else {
          // gui_scale = 1;
        }

        this.calculateScaling();

        // Calculate the scene margin in a given direction
        this.sceneMarginX = ( this.director.stage.canvas.width - this.maxScaleX ) / 2;

        // Log screen scaling for debugging purposes
        // console.log(this.scale.x);
        // console.log(this.scale.y);
        // console.log(this.screenRatio);

        this.landscape_warning.graphics.clear()
        this.landscape_warning.graphics.beginFill("#000000").drawRect(0, 0, this.director.stage.canvas.width, this.director.stage.canvas.height);

        if (this.director.currentScene == 3) {
          this.scaleAssets(this.director.level.lcs, this.director.currentScene); // Scale scene appropriately
        }

        this.scaleAssets(this.director.sceneComponentSystem, this.director.currentScene); // Scale scene appropriately
        // this.scaleAssets(this.gcs, currentScene, this.scale.y, this.scale.x); // Scale scene appropriately

        this.director.stage.update()

      },

      /**
       * Function to check the orientation of the device.
       */
      checkOrientation: function() {

        // If window height is greater than width
        if (this.device.isPortrait && this.device.isMobile) {

          if(!this.added) {

            this.director.stage.addChild(this.landscape_warning);
            this.director.stage.addChild(this.phone_rotation);
            this.landscape_warning.graphics.clear()
            this.landscape_warning.graphics.beginFill("#000000").drawRect(0, 0, this.director.stage.canvas.width, this.director.stage.canvas.height);
            this.phone_rotation.gotoAndPlay(0);
            this.director.sceneHtml = document.getElementById("sceneHTML");
            this.director.sceneHtml.hidden = true;
            this.added = true;

          }

        } else {

          if(this.added){

            this.director.stage.removeChild(this.landscape_warning);
            this.director.stage.removeChild(this.phone_rotation);
            this.director.sceneHtml = document.getElementById("sceneHTML");
            this.director.sceneHtml.hidden = false;
            this.added = false;

          }

        }


      },

      /**
       * Function to load animation to indicate rong orientation of the device.
       */
      loadOrientationAnimation: function(ecs) {

        // Load the phone rotation picture but remove it from the stage.
        let config = new ObjectConfig('default', 'image', 288, 288, "center", 0, "center", 0);
        this.phone_rotation = AssetHandler.createSprite(this.phone_rotationS, config, ecs, this.director.stage);
        this.director.stage.removeChild(this.phone_rotation);

      },

      /**
       * Calculate the scene scaling.
       */
      calculateScaling: function() {

        // Calculate the scene scaling
        if (this.screenRatio < 2.5) { // tall screen

          // Calculate the scale with the max x scaling
          this.maxStored = false;
          this.scale.x = this.director.stage.canvas.width / this.maxScaleX;
          this.scale.y = this.director.stage.canvas.width / this.maxScaleX;
          let key = 'sceneScaleY';
          sessionStorage.setItem(key, this.scale.y);

        } else if (this.screenRatio > 2.5) { // wide screen


          if(!this.maxStored) {
            this.maxStored = true;
            this.tempMax = this.director.stage.canvas.height;
          }

          this.tempScale = this.director.stage.canvas.width / this.maxScaleX;
          this.scale.x = this.tempScale * ( this.director.stage.canvas.height / this.tempMax );
          this.scale.y = this.tempScale * ( this.director.stage.canvas.height / this.tempMax );
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

        let xStart = this.director.stage.canvas.width / 2;
        let yStart = this.director.stage.canvas.height / 2;

        switch (entityComponent.x_lock) {

          case "left":
            xStart = 0;
            break;

          case "center":
            xStart = this.director.stage.canvas.width / 2;
            break;

          case "right":
            xStart = this.director.stage.canvas.width;
            break;

        }

        switch (entityComponent.y_lock) {

          case "top":
            yStart = 0;
            break;

          case "center":
            yStart = this.director.stage.canvas.height / 2;
            break;

          case "bottom":
            yStart = this.director.stage.canvas.height;
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
