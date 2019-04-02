<template>
  <div id="app">
    <Engine/>
  </div>
</template>

<script>

import Engine from './components/Engine.vue'

export default {
  name: 'app',
  components: {
    Engine
  }
}

</script>

<style>

@font-face {
  font-family: Blackadder;
  src: url('./assets/fonts/Blackadder.TTF') format('truetype');
}

@font-face {
  font-family: Oldstyle;
  src: url('./assets/fonts/Oldstyle.TTF') format('truetype');
}

#app {
  margin  : 0px;
  padding : 0px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  /* color: #2c3e50; */
}

html, body {
  overflow: hidden;
  width   : 100%;
  height  : 100%;
  margin  : 0px;
  padding : 0px;
}

</style>
