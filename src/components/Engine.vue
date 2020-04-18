<template>

  <div id="engineFrame">
    <DeviceLayer ref="deviceLayer" />
    <canvas id="drawingCanvas" :width="w" :height="h" :style="style">alternate content</canvas>
    <div id="sceneHTML"></div>
  </div>

</template>

<script>

// Modules
import DeviceLayer from './DeviceLayer.vue';

export default {

  name: 'Engine',

  components: {
    DeviceLayer, // Scales the scene
  },

  data () {
    return {

      // 
      style: {
        background: '#aaa'
      },

      // 
      w: window.innerWidth,
      h: window.innerHeight,

      // 
      text: ''

    }
  },

  // Clear color of screen
    // color was r:0.78, b:1, g:0.98, a:1 (Babylon.Color4)

  // Custom created numberlines
  // make the number line work

  // Put the range text back on screen

    // Generated 5 separate fireballs so the could be in use at the same time
    // Then generated the fireball on top of everything
    // catapult should be at the bottom center

  // Play animations right at the beginning
  // Also play fire animations

  // created a fireball generator to auto gen fireballs but maybe reusing is better

  // iron out the fireball aiming and entrance into the scene more

	// custom input function may be useful

	// else if(key == "0" || key == "1" || key == "2" || key == "3" || key == "4" ||
	// 		key == "5" || key == "6" || key == "7" || key == "8" || key == "9" || key == ".") {
	// 	if(param.length < 3) {
	// 		param += key;
	// 		text1.text = param;
	// 		input = parseInt(param);
	// 	}
	// }

  mounted: function() {

  },

  methods: {

  }

}

</script>

<style>



</style>
