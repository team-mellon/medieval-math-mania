<template>

  <div id="ldBg" class="ldscreen" hidden>

    <span id="loadingText" hidden>Loading</span>

    <Bar v-bind:progress="loadingQueue.progress" />

    <span id="percentText">Loading</span>

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
        loader: {
          percentage: 0
        }
      }
    },
    watch: { 
      loadingQueue: function(newVal, oldVal) { // watch it
        if (newVal !== null) {
          this.loadingQueue.on("progress", this.handleProgress.bind(this));
          this.loadingQueue.on("complete", this.handleComplete.bind(this));
          // this.loadingQueue.addEventListener("fileload", handleFileComplete);
        }
      }
    },
    methods: {

      handleComplete: function(event) {
        console.log("Loaded!");
        this.$emit('loaded', 'loaded')
      },

      //Loadbar for loading screen
      handleProgress: function(evt) {

        // var progbar = document.getElementById("progressBar");
        var perctext = document.getElementById("percentText");
        var loadtext = document.getElementById("loadingText");

        if(this.loadingQueue.progress * 100  >= 100) {

          progressBar.hidden = true;
          backgroundBar.hidden = true;
          ldBg.hidden = true;

        } else {

          progressBar.hidden = false;
          backgroundBar.hidden = false;
          ldBg.hidden = false;

          loadtext.hidden = false;

          // progbar.style.width = this.loadingQueue.progress * 100 + '%';
          perctext.innerHTML = (Math.floor(this.loadingQueue.progress * 100)).toString() + '%';

        }

      }

    }

  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

  .ldscreen {

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
