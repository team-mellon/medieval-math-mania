<template>

  <div id="engineFrame">
    <DeviceLayer ref="deviceLayer" />
    <canvas id="drawingCanvas" :width="w" :height="h" :style="style">The canvas is broken</canvas>
    <div id="sceneHTML"></div>
  </div>

</template>

<script>

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

      console.log('Engine mounted!');

    },
    methods: { }

  }

</script>

<style>
</style>
