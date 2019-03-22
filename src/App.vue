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
  /* margin-top: 60px; */
}

div {
  margin  : 0px;
  padding : 0px;
}

</style>
