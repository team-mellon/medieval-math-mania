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


#entryDisplay {
  display: inline;
}

.scrollMenu {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 5px;
  z-index: 1;
  text-align: center;
  /* font-family: "Blackadder"; */
  font-family: "Oldstyle";
  /* font-size: 3vh; */
  font-size: 1.75vw;
  color: saddlebrown;
  width: 500px;
}

#equationBanner {
  font-family: "Oldstyle";
  color: transparent;
  position: absolute;
  transform: translate(50%, 50%);
}

#multiplicandText {
  font-size: 1.0vh;
  display: inline;
}

#solutionText {
  font-size: 1.0vh;
  display: inline;
}

#historyBanner {
  font-family: "Oldstyle";
  position: absolute;
  transform: translate(50%, 50%);
}

.login {
  /* display: block;
  align-content: center; */
}

.signup {
  display: inline-block;
  align-content: center;
}

.tutorial_title {
  font-family: "Blackadder";
  color: saddlebrown;
  position: absolute;
  width: 20vw;
  top: 15%;
  left: 12.5%;
  transform: translate(-50%, -50%);
  margin: 5px;
  font-size: 6vh;
  /* line-height: 0.7; */
}

.tutorial {
  font-family: "Oldstyle";
  color: saddlebrown;
  position: absolute;
  width: 20vw;
  font-size: 3vh;
  /* line-height: 0.7; */
}

input {
  width: 100%;
  /* max-width: 200px; */
  max-width: 10em;
  box-sizing: border-box;
  border: none;
  /* font-family: "Blackadder"; */
  font-family: "Oldstyle";
  font-size: 1.75vw;
  color: saddlebrown;
  border-bottom: 2px solid saddlebrown;
  background-color: blanchedalmond;
}

#entryInput {
  font-family: "Oldstyle";
  width: 2.5em;
  font-size: 1.75vw;
  -moz-appearance:textfield !important;
}

#errorText {
  color: red;
}

input::-webkit-inner-spin-button,
input::-webkit-outer-spin-button {
  -webkit-appearance: none !important;;
  margin: 0 !important;
}

#myInput {
  border-box: box-sizing;
  /* background-image: url('searchicon.png'); */
  background-position: 14px 12px;
  background-repeat: no-repeat;
  font-size: 16px;
  padding: 14px 20px 12px 45px;
  border: none;
  border-bottom: 1px solid #ddd;
}

#myInput:focus {
  outline: 3px solid #ddd;
}

.dropdown {
  position: relative;
  display: inline-block;
  width: 13vw;
}

.dropdown-content {
  color: Gold;
  font-size: 2vh;
  /* display: none; */
  position: absolute;
  background-color: none;
  min-width: 13vw;
  overflow: auto;
  border: 0px solid #ddd;
  z-index: 1;
  overflow-y: auto;
  height: 4vw;
  text-align: center;
}

.dropdown-content a {
  color: Gold;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  text-align: center;
}

.dropdown a:hover {background-color: #ddd;}

.show {display: block;}

/* @media only screen and (max-width: 900px) { */
  /* body { */
    /* font-size: 15vh; */
  /* } */

  /* input {
    font-size: 7vh;
  }

  .scrollMenu {
    line-height: 75%;
    font-size: 7vh;
  }

  #equationBanner {
    font-size: 5vh;
  }

  #multiplicandText {
    font-size: 5vh;
  }

  #solutionText {
    font-size: 5vh;
  }

  #historyText {
    font-size: 5vh;
  }

  #historyBanner {
    font-size: 5vh;
  } */

  /* #entryInput { */
    /* font-size: 5vh; */
    /* font-family: "Arial"; */
    /* width: 2.5em; */
    /* max-width: 50px */
    /* -moz-appearance:textfield !important; */
  /* } */
/* } */

</style>
