<template>
  <div id="engineFrame">
    <DeviceLayer ref="deviceLayer" />
    <canvas id="drawingCanvas" :style="style">alternate content</canvas>

    <Loader v-bind:loading-queue="loadingQueue" @loaded="primed" />
    <div id="sceneHTML"></div>

    <!-- <canvas id="changingParametersBasedOnState" :width="w" :height="h" :style="style"></canvas> -->
    <!-- <div id="childThatSendsBackData"> -->
      <!-- <newChild @emittedChildEvent="runParentFunctionOnReturningObject" /> -->
    <!-- </div> -->

  </div>
</template>

<script>

// Modules
import DeviceLayer from './DeviceLayer.vue';
import Loader from './Loader.vue';

// Game Data
import { sceneManifest } from '../game_data/scenes.js';

export default {
  name: 'Engine',
  components: {
    DeviceLayer,
    Loader
  },
  data () {
    return {
      
      // 
      loadingQueue: null,

      // Authentication handling
      async: {
        error: ''
      },

      // 
      text: '',

      // Current user data
      user: {
        authenticated: false,
        firstname: 'Place',
        lastname: 'Holder',
        username: 'CpnPlchlder',
        hits: 0,
        highs: 0,
        lows: 0,
        badges: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      },

      // 
      scale: {
        x: 1.0,
        y: 1.0
      },

      // 
      loader: {
        primed: false,
        loaded: false
      },

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

      // w: 100,
      // h: 200,

      style: {
        background: '#aaa'
      }
    }
  },

  // async created() {
  //
  //   try {
  //
  //     this.stats = await StatService.getStats();
  //     console.log(this.stats);
  //
  //     this.users = await LoginService.getUsers();
  //     console.log(this.users);
  //
  //   } catch (err) {
  //
  //     this.async.error = err.message;
  //     console.log(this.async.error);
  //
  //   }
  //
  // },

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

    // Initialize the engine modules.
    this.$refs.deviceLayer // Scales the scene

    // ???
    this.second_title = null;

    // Loading queue for preloading
    this.loadingQueue = new createjs.LoadQueue();
    this.loadingQueue.loadManifest(sceneManifest);                       // Enable mouse events with scene objects

    // Ticker to run game loop
    createjs.Ticker.setFPS(30);                                 // Set FPS (could be depricated?)
    createjs.Ticker.addEventListener('tick', this.tick);        // Set tisk listener for use as game loop

  },

  methods: {

    tick: function(event) {

      // this.second_title.x = this.$refs.deviceLayer.stage.canvas.width / 3;

      // 
      if (this.loader.primed && !this.loader.loaded) {

        // Create the first 'currentScene'
        this.$refs.deviceLayer.director.createScene(this.$refs.deviceLayer.stage, this.user); // Create scene assets

        // Rescale the view to size the scene to the device.
        this.$refs.deviceLayer.resize(); // Resize to set initial scale

        // Set the loaded flag.
        this.loader.loaded = true;

      }

      // Run the scene.
      this.$refs.deviceLayer.director.runScene(this.$refs.deviceLayer.stage, this.$refs.deviceLayer, this.user);

      // Update the stage.
      this.$refs.deviceLayer.stage.update(event);

    },

    primed: function(event) {

      this.loader.primed = true;
      console.log("Primed!");

      this.second_title = new createjs.Bitmap(this.$refs.deviceLayer.director.loadingQueue.getResult("image"));

      // console.log(this.second_title);
      // OR samething
      // this.$refs.deviceLayer.director.background.shape = new createjs.Bitmap(images['image']);

    }

  }

}

</script>

<style>
</style>
