<template>

  <div id="scalingModule">

    <!--  // /////////////
          // // SCALING //
          // ///////////// -->

  </div>

</template>

<script>

  export default {

    name: 'ScalingModule',
    data () {
      return {

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

        // Ratio breakpoint
        ratioBreakpoint: 2.5,

        // X scaling
        x: 1.0,

        // Y scaling
        y: 1.0,

        // The max y value
        maxY: 1440,

        // The max x value
        maxX: 1920,

        // Initial screen ratio
        ratio: 1440 / 1920,

        // X margin to center rendering
        xMargin: 0.0,

        // If the max is stored
        maxStored: false,

      }
    },
    props: {

      // Canvas height
      width: Number,

      // Canvas width
      height: Number,

    },
    /**
     * Constructor for the scaling component of the engine.
     * @constructor
     */
    mounted: function() {

      // Scene scaling variables
      this.scale.ratio = this.scale.maxY / this.scale.maxX;

      // Set the window resize function
      // window.addEventListener('resize', this.resize, false);

    },
    methods: {

      /**
       * Calculate the scene scaling.
       */
      calculateScaling: function() {

        // Calc the canavas aspect ratio
        this.calculateScreenRatio();

        // If this is a tall screen...
        if (this.scale.ratio < this.ratioBreakpoint) {

          // Calculate the scale using the max x resolution size
          this.scaleForTallScreen();

        // If this is a wide screen...
        } else if (this.scale.ratio > this.ratioBreakpoint) {

          // Calculate the scale using the max x resolution size
          this.scaleForWideScreen();

        }

        // Get the scene margin
        this.getSceneMargin();

      },

      /**
       * Calculate the scene scaling.
       */
      calculateScreenRatio: function() {

        // Set the ratio to the canvases aspect ratio.
        this.scale.ratio = this.$props.width / this.$props.height;

      },

      /**
       * Calculate scaling for tall screens.
       */
      scaleForTallScreen: function() {

        // Set the flag to false.
        this.scale.maxStored = false;

        // Set the x scale to the canvas width divided by the max x size.
        this.scale.x = this.$props.width / this.scale.maxX;

        // Set the y scale to the canvas width divided by the max x size.
        this.scale.y = this.$props.width / this.scale.maxX;

        // Update storage
        this.setStorage();

      },

      /**
       * Calculate scaling for wide screens.
       */
      scaleForWideScreen: function() {

        // Set an initial scale.
        let tempScale = 1;

        // Set a temporary max scale
        let tempMax = 1440;

        // If the max x res is not stored
        if(!this.scale.maxStored) {

          // Set it to true.
          this.scale.maxStored = true;

          // Set the temp max to the canvas height
          tempMax = this.$props.height;

        }

        // Set the temp scale to the canvas width divided by the max x scale.
        tempScale = this.$props.width / this.scale.maxX;

        // Set the x scale to the canvas height divided by the temp max multiplied by the temp scale.
        this.scale.x = tempScale * ( this.$props.height / tempMax );

        // Set the y scale to the canvas height divided by the temp max multiplied by the temp scale.
        this.scale.y = tempScale * ( this.$props.height / tempMax );

        // Update storage
        this.setStorage();

      },

      /**
       * Calculate the scenes x margin to center the rendering on the screen.
       */
      getSceneMargin: function() {

        // Calculate the scene margin in a given direction
        this.scale.xMargin = ( this.$props.width - this.scale.maxX ) / 2;

      },

      /**
       * Update vars in session storage.
       */
      setStorage: function() {

        // Set the y scale for the scen in the session storage.
        sessionStorage.setItem('sceneScaleY', this.scale.y);

      },

    }

  }

</script>

<style>
</style>
