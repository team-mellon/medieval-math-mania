<!-- Input and Key Detection -->

<template>
  <div id="inputModule">
  </div>
</template>

<script>

export default {

  name: 'Input',

  data () {
    return {
    }
  },

  mounted: function() {

    ///////////////////
    // Key detection //
    ///////////////////

    // Holds the states of all the keys
    this.keys = {};

    /////////////////////
    // Touch detection //
    /////////////////////

    // Bool to indicate touch event
    this.touch = false;

    // Bool to indicate an upward drag
    this.drag_up = false;
    this.drag_down = false;

    // Location of start and end touches for drag calculations
    this.start_touch = 0;
    this.end_touch = 0;

  },

  methods: {



  }

}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
