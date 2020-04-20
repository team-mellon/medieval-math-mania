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

        this.scale.ratio = this.$props.width / this.$props.height;

        // Calculate the scene scaling
        if (this.scale.ratio < 2.5) { // tall screen

          // Calculate the scale with the max x scaling
          this.scale.maxStored = false;
          this.scale.x = this.$props.width / this.scale.maxX;
          this.scale.y = this.$props.width / this.scale.maxX;
          let key = 'sceneScaleY';
          sessionStorage.setItem(key, this.scale.y);

        } else if (this.scale.ratio > 2.5) { // wide screen

          let tempScale = 1;
          let tempMax = 1440;

          if(!this.scale.maxStored) {
            this.scale.maxStored = true;
            tempMax = this.$props.height;
          }

          tempScale = this.$props.width / this.scale.maxX;
          this.scale.x = tempScale * ( this.$props.height / tempMax );
          this.scale.y = tempScale * ( this.$props.height / tempMax );
          let key = 'sceneScaleY';
          sessionStorage.setItem(key, this.scale.y);

        }

        // Calculate the scene margin in a given direction
        this.scale.xMargin = ( this.$props.width - this.scale.maxX ) / 2;

      }

    }

  }

</script>

<style>
</style>
