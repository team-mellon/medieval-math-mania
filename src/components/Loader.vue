<template>

  <div id="loaderBackground" class="loader-background full-window centered element-centered" hidden>

    <span id="loadingText" class="element-centered" hidden>Loading</span>
    <Bar :progress="loadingQueue.progress" />
    <span id="percentText" class="element-centered" hidden>Loading</span>

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

      loadingManifest: Array

    },
    data () {
      return {

        // Loading queue for preloading
        loadingQueue: {
          progress: 0
        },

        // Loader variables
        loader: {
          percentage: 0,
        },

        // Flag for the status of loading
        loaded: false

      }
    },
    watch: { 
      loadingManifest: function(next, previous) {

        if (next !== null) {

          // Load the scene manifest
          this.loadingQueue = new createjs.LoadQueue();
          this.loadingQueue.loadManifest(next);

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

        // this.second_title.x = this.stage.canvas.width / 3;

        // this.second_title = new createjs.Bitmap(this.loadingQueue.getResult("image"));

        // console.log(this.second_title);
        // OR samething
        // this.director.background.shape = new createjs.Bitmap(images['image']);

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

    /* Properties */
    background-color: var(--dark-black);
    /* background-color: #919191; */
    z-index: 2;

  }

  #loadingText {

    /* Position */
    position: absolute;
    top: 30%;
    left: 50%;

    /* Properties */
    font-family: "Blackadder";
    font-size: 15vh;
    z-index: 2;
    color: var(--medium-gold);

  }

  #percentText {

    /* Position */
    position: absolute;
    top: 70%;
    left: 50%;

    /* Properties */
    font-family: var(--primary-font);
    font-size: 10vh;
    z-index: 2;
    color: var(--medium-gold);

  }

</style>
