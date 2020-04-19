<template>

  <div id="engineFrame">

    <DeviceLayer ref="deviceLayer" />
    <canvas id="drawingCanvas" :width="w" :height="h" :style="style">The canvas seems to be broken</canvas>
    <div id="sceneHTML"></div>

  </div>

</template>

<script>

  // Import the 'Device Layer' to handle device specifications
  import DeviceLayer from './DeviceLayer.vue';

  export default {

    name: 'Engine',
    components: {

      // Interfaces with the device this is being run on
      DeviceLayer,

    },
    data () {
      return {

        // Default canvas styles
        style: {
          background: '#aaa'
        },

        // Default canvas dimensions
        w: window.innerWidth,
        h: window.innerHeight,

      }
    },
    mounted: function() {

      // Initialize the engine modules.

      // Log for debug purposes
      console.log('Engine mounted!');

    },
    methods: { }

  }

</script>

<style>
</style>
