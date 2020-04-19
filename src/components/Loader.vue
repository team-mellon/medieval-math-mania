<template>

  <div id="loaderBackground" class="loader-background" hidden>

    <span id="loadingText" hidden>Loading</span>
    <Bar v-bind:progress="loadingQueue.progress" />
    <span id="percentText" hidden>Loading</span>

  </div>

</template>

<script>

  import Bar from './Loader/Bar.vue'

  export default {

    name: 'Loader',
    components: {
      Bar
    },
    props: {
      loadingQueue: Object
    },
    data () {
      return {

        // Loading queue for preloading
        loadingQueue: new createjs.LoadQueue(),

        // Loader variables
        loader: {
          percentage: 0,
        },

        // Flag for the status of loading
        loaded: false

      }
    },
    watch: { 
      loadingQueue: function(next, previous) {

        if (next !== null) {

          // Handler that runs when file loading progresses.
          this.loadingQueue.on("progress", this.handleProgress.bind(this));

          // Handler that runs when each file completes.
          // this.loadingQueue.addEventListener("fileload", handleFileComplete);

          // Handler that run when the entire loading queue completes.
          this.loadingQueue.on("complete", this.handleComplete.bind(this));

        }

      }
    },
    methods: {

      handleComplete: function(event) {

        // Emit to the engine that the canvas assets are ready.
        // this.$emit('loaded', 'loaded')

        this.loaded = true;

        console.log("Assets Loaded!");

      },

      //Loadbar for loading screen
      handleProgress: function(evt) {
        

        // Get the background from the template.
        var lbBg = document.getElementById("loaderBackground");

        // Get the copy text and the progress text from the template.
        var loadingText = document.getElementById("loadingText");
        var percentText = document.getElementById("percentText");

        // Loading is complete...
        if(this.loadingQueue.progress * 100  >= 100) {

          // Hide the background.
          loaderBackground.hidden = true;

          // Hide loading and percent text.
          loadingText.hidden = true;
          percentText.hidden = true;

        } else {

          // Show the background.
          loaderBackground.hidden = false;

          // Show loading and percent text.
          loadingText.hidden = false;
          percentText.hidden = false;

          // Set the incoming value to a percent.
          let percentage = Math.floor(this.loadingQueue.progress * 100);

          // The the percent text to the percent loaded.
          percentText.innerHTML = percentage.toString() + '%';

        }

      }

    }

  }

</script>

<style scoped>

  .loader-background {

    /* Position */
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;

    /* Properties */
    height: 100%;
    width: 100%;
    background-color: #919191;
    z-index: 2;

  }

  #loadingText {

    /* Position */
    position: absolute;
    transform: translate(-50%, -50%);
    top: 30%;
    left: 50%;

    /* Properties */
    font-family: "Blackadder";
    font-size: 15vh;
    z-index: 2;
    color: Gold;

  }

  #percentText {

    /* Position */
    position: absolute;
    transform: translate(-50%, -50%);
    top: 70%;
    left: 50%;

    /* Properties */
    font-family: "Oldstyle";
    font-size: 10vh;
    z-index: 2;
    color: Gold;

  }

</style>
