<template>

  <div id="backgroundBar" class="background-bar" hidden>

    <div id="progressBar" class="progress-bar" hidden></div>

  </div>

</template>

<script>

  export default {
    name: 'Bar',
    props: {
      progress: 0
    },
    watch: { 
      progress: function(next, previous) {

        // If the new value is valid...
        if (next !== null) {

          // Get the progress bar from the template.
          let progressBar = document.getElementById("progressBar");

          // Set the incoming value to a percent
          let percentage = next * 100;

          // Set the width of the progress based on the percentage value
          progressBar.style.width = percentage + '%';

          // Loading is complete...
          if(next * 100  >= 100) {

            // Hide the progress bar.
            progressBar.hidden = true;
            backgroundBar.hidden = true;

          } else {

            // Show the progress bar.
            progressBar.hidden = false;
            backgroundBar.hidden = false;

          }

        }
      },
    },
  }

</script>

<style scoped>

  .background-bar {

    /* Position */
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;

    /* Properties */
    background-color: LightGray;
    height: 50px;
    width: 90%;
    z-index: 2;

  }

  .progress-bar {

    /* Position */
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;

    /* Properties */
    background-color: Gold;
    height: 100%;
    width: 100%;
    z-index: 2;

  }

</style>