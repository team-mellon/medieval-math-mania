<template>
  <div id="engineHolder">

    <canvas id="drawingCanvas" :style="style">alternate content</canvas>
    <!-- <canvas id="drawingCanvas" :width="w" :height="h" :style="style"></canvas> -->

    <div id="sceneHTML"></div>

    <div id="ldBg" class="ldscreen">
      <span id="loadingText">Loading</span>
      <div id="progressBackground" class="bgbar">
        <div id="progressBar" class="pgbar"></div>
      </div>
      <span id="percentText">Loading</span>
    </div>

    <!-- <div id="moduleHolder"> -->
      <!-- <UserInterface @pushToEcs="pushEcs" @pushToLcs="pushLcs"/> -->
    <!-- </div> -->

  </div>
</template>

<script>

import UserInterface from './UserInterface.vue';

// Static classes
import AssetHandler from '../classes/AssetHandler.js';
import FormHandler from '../classes/FormHandler.js';
import APIHandler from '../classes/APIHandler.js';

import InputHandler from '../classes/InputHandler.js';
import MobileHandler from '../classes/MobileHandler.js';
import MusicHandler from '../classes/MusicHandler.js';
import LevelHandler from '../classes/LevelHandler.js';

import StatService from '../StatService.js';
import LoginService from '../LoginService.js';

// Game Data
import { sceneData, indicatorCoordinates, levelDescriptors } from '../game_data/scenes.js';
import { levelData } from '../game_data/levels.js';

export default {

  name: 'Engine',

  components: {
    UserInterface
  },

  data () {
    return {
      error: '',
      text: '',
      user: {
        authenticated: false,
        firstname: 'Place',
        lastname: 'Holder',
        username: 'CpnPlchlder',
        hits: 101010101,
        highs: 101010101,
        lows: 101010101
      },
      // w: 100,
      // h: 200,
      style: {
        background: '#aaa'
      }
    }
  },

  async created() {

    try {

      this.stats = await StatService.getStats();
      console.log(this.stats);

      this.users = await LoginService.getUsers();
      console.log(this.users);

    } catch (err) {

      this.error = err.message;
      console.log(this.error);

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

    /////////////////////
    // INITIIALIZATION //
    /////////////////////

    this.input = new InputHandler();
    this.mobile = new MobileHandler();
    this.music = new MusicHandler();
    this.level = new LevelHandler();

    window.addEventListener('resize', this.resize, false);

    var el = document.getElementById("drawingCanvas");
    el.addEventListener("touchstart", this.input.handleStart.bind(this.input), false);
    el.addEventListener('touchend', this.input.handleEnd.bind(this.input), false);
    // el.addEventListener("touchcancel", this.input.handleCancel, false);
    // el.addEventListener("touchmove", this.input.handleMove, false);
    console.log("initialized.");

    // window.addEventListener('DOMContentLoaded', function() {                  // start game when DOM loads
    //   runGame('renderCanvas');
    // });

    this.ecs = []; // Entity component system for scaling and eventually object storage
    this.lcs = []; // Level component system for scaling and eventually object storage
    this.gcs = []; // GUI component system for scaling and eventually object storage

    // var landscape_warning;

    //registers Menu sounds
    createjs.Sound.registerSound("res/sound_effects/menu.wav", "menu");
    createjs.Sound.registerSound("res/sound_effects/select.wav", "select");
    createjs.Sound.registerSound("res/sound_effects/sword.wav", "sword");

    //Setting properties for delays for sounds
    this.delayRe = new createjs.PlayPropsConfig().set({delay : 250});
    this.delayIn = new createjs.PlayPropsConfig().set({delay : 500});
    this.delayOut = new createjs.PlayPropsConfig().set({delay : 750});
    this.delayWin = new createjs.PlayPropsConfig().set({delay : 2000});

    /////////////
    // SCALING //
    /////////////

    this.max_scale_Y = 1440;
    this.max_scale_X = 1920;

    this.scene_scale_X = 1.0;
    this.scene_scale_Y = 1.0;

    this.screen_ratio = this.max_scale_X / this.max_scale_Y

    this.scene_margin_X = 0.0;

    this.added = false;

    this.max_stored = false;

    this.temp_scale = 1;
    this.temp_max = 1440

    ////////////
    // SCENES //
    ////////////

    this.current_scene = 10;
    this.last_scene = 0;

    this.num_scenes = 11;

    this.scenes = [

      { // Login
        custom:   function() {

          FormHandler.createLoginForm();

        }.bind(this)
      },

      { // Signup
        custom:   function() {

          FormHandler.createSignupForm();

        }.bind(this)
      },

      { // Menu
        custom: function () { }.bind(this)
      },

      { // Game
        custom: function() {

          // Creates username display text
          var multiplicand_div = document.createElement("div");
          multiplicand_div.id = "multiplicandText";
          var multiplicand_text = document.createTextNode(this.level.multiplicand);
          multiplicand_div.appendChild(multiplicand_text);
          var sign_text = document.createTextNode(this.level.sign);
          var entry_input;
          if (this.mobile.isMobile) {

            entry_input = document.createElement("div");
            entry_input.id = "entryDisplay";
            var hundreds = document.createElement("span");
            hundreds.id = "hundredsPlace";
            var hundreds_place = document.createTextNode("0");
            hundreds.appendChild(hundreds_place);
            var tens = document.createElement("span");
            tens.id = "tensPlace";
            var tens_place = document.createTextNode("0");
            tens.appendChild(tens_place);
            var ones = document.createElement("span");
            ones.id = "onesPlace";
            var ones_place = document.createTextNode("0");
            ones.appendChild(ones_place);
            entry_input.appendChild(hundreds);
            entry_input.appendChild(tens);
            entry_input.appendChild(ones);

          } else {

            entry_input = document.createElement("input");
            entry_input.id = "entryInput";
            entry_input.setAttribute("type", "number");
            entry_input.setAttribute("placeholder", "###");
            entry_input.setAttribute("value", "");
            entry_input.setAttribute("maxlength", "3");
            entry_input.setAttribute("size", "4");
            entry_input.setAttribute("min", "-999");
            entry_input.setAttribute("max", "999");
            entry_input.setAttribute("name", "entry");
            entry_input.addEventListener('keypress', function(event) {
              if (event.keyCode == 13) {
                event.preventDefault();
              }
            });

          }

          var equal_text = document.createTextNode(this.level.equal);
          var solution_div = document.createElement("div");
          solution_div.id = "solutionText";
          var solution_text = document.createTextNode(this.level.solution);
          solution_div.appendChild(solution_text);

          // Creates username div to hold display text and input box
          var game_entry_div = document.createElement("div");
          game_entry_div.className = "login";
          game_entry_div.appendChild(multiplicand_div);
          game_entry_div.appendChild(sign_text);
          game_entry_div.appendChild(entry_input);
          game_entry_div.appendChild(equal_text);
          game_entry_div.appendChild(solution_div);

          // Creates username display text
          var button_text = document.createTextNode("");
          var history_button = document.createElement("button");
          var history_div = document.createElement("div");
          history_button.className = "dropbtn";
          history_button.addEventListener('click', this.myFunction);
          history_div.className = "dropdown-content";
          history_div.id = "myDropdown";
          history_button.appendChild(button_text);

          for (var x in this.level.history_list) {
            var history_entry = document.createTextNode(this.level.history_list[x]);
            var line_break = document.createElement("br");
            history_div.appendChild(history_entry);
            history_div.appendChild(line_break);
          }

          var history_dropdown = document.createElement("div");
          history_dropdown.className = "dropdown";
          history_dropdown.appendChild(history_button);
          history_dropdown.appendChild(history_div);

        	// Does a thing
        	var game_history_div = document.createElement("div");
        	game_history_div.className = "login";
        	game_history_div.appendChild(history_dropdown);

          // Creates Tutorial display text
        	if (this.level.play_tutorial) {
        	  var tutorial_label = document.createTextNode("Tutorial");
        	  var br1 = document.createElement("br");
        	  var tutorial_text = document.createElement("span");
        	  tutorial_text.className = "tutorial";
        	  tutorial_text.id = "tutorialText";
        	  var tutorial_words = document.createTextNode("The tutorial is broken");
        	  tutorial_text.appendChild(tutorial_words);
        	  var tutorial_div = document.createElement("div");
        	  tutorial_div.className = "tutorial_title";
        	  tutorial_div.id = "tutorialDiv"
        	  tutorial_div.appendChild(tutorial_label);
        	  tutorial_div.appendChild(br1);
        	  tutorial_div.appendChild(tutorial_text);
          }

          // Creates login form to hold username and password divs
          var game_entry_form = document.createElement("form");
          game_entry_form.id = "equationBanner";
          // game_entry_form.className = "scrollMenu";
          game_entry_form.appendChild(game_entry_div);

          // Creates login form to hold username and password divs
          var game_history_form = document.createElement("form");
          game_history_form.id = "historyBanner";
          // game_history_form.className = "scrollMenu";
          game_history_form.appendChild(game_history_div);

          // Injecting login form into existing html
          var scene_html = document.getElementById("sceneHTML");
          scene_html.appendChild(game_entry_form);
          scene_html.appendChild(game_history_form);

        	if (this.level.play_tutorial) {
        		scene_html.appendChild(tutorial_div);
          }

          this.level.createLevel(this.stage, this.lcs,
            function() { createjs.Sound.play("select"); this.changeScene(8); this.level.visibleForm(true); }.bind(this),
            function() { createjs.Sound.play("sword"); this.changeScene(9); this.level.visibleForm(true); }.bind(this),
            function() { createjs.Sound.play("menu"); this.changeScene(2); this.level.visibleForm(true); }.bind(this),
            function() { createjs.Sound.play("menu"); this.changeScene(6); this.level.visibleForm(true); }.bind(this),
            this.user.authenticated
          );

          if (this.mobile.isMobile) {

          } else {
            document.getElementById("entryInput").value = 0;
          }
          document.getElementById("myDropdown").classList.toggle("show");

        }.bind(this)
      },

      { // Stats
        custom: function () { }.bind(this)
      },

      { // How To Play
        custom: function () { }.bind(this)
      },

      { // Settings

        custom: function() {

          // Creates username display text and input slider
          var volume_text = document.createTextNode("Volume:");
          var volume_input = document.createElement("input");  // document.getElementById("").value
          volume_input.id = "volumeSlider";
          volume_input.setAttribute("type", "range");
          volume_input.setAttribute("name", "volume");
          volume_input.setAttribute("min", "0");
          volume_input.setAttribute("max", "1");
          volume_input.setAttribute("step", "0.1");
          volume_input.setAttribute("value", "0.5");
          volume_input.setAttribute(oninput, "SetVolume(this.value)");
          volume_input.setAttribute(onchange, "SetVolume(this.value)");
          volume_input.addEventListener('change', this.setVolume);
          volume_input.addEventListener('input', this.setVolume);
          // Creates username div to hold display text and input slider
          var settings_volume_div = document.createElement("div");
          settings_volume_div.className = "login";
          settings_volume_div.appendChild(volume_text);
          settings_volume_div.appendChild(volume_input);

          // Creates password display text and check box
          var time_text = document.createTextNode("Time:");
          var time_input = document.createElement("input");
          time_input.id = "bossValue";
          time_input.setAttribute("type", "checkbox");
          time_input.setAttribute("name", "time");
          if (this.level.boss_fight) {
            time_input.checked = true;
          } else {
            time_input.checked = false;
          }
          time_input.addEventListener('change', this.level.setBoss);

          // Creates password div to hold display text and check box
          var settings_time_div = document.createElement("div");
          settings_time_div.className = "login";
          settings_time_div.appendChild(time_text);
          settings_time_div.appendChild(time_input);

        	// Creates password display text and check box
        	var tutorial_text = document.createTextNode("Tutorial:");
        	var tutorial_input = document.createElement("input");
        	tutorial_input.id = "tutorialValue";
        	tutorial_input.setAttribute("type", "checkbox");
        	tutorial_input.setAttribute("name", "tutorial");
        	if (this.level.play_tutorial) {
        	  tutorial_input.checked = true;
        	} else {
        	  tutorial_input.checked = false;
        	}
        	tutorial_input.addEventListener('change', this.level.setTutorial);

          // Creates password div to hold display text and check box
          var settings_tutorial_div = document.createElement("div");
          settings_tutorial_div.className = "login";
          settings_tutorial_div.appendChild(tutorial_text);
          settings_tutorial_div.appendChild(tutorial_input);

          // Creates login form to hold username and password divs
          var settings_form = document.createElement("form");
          settings_form.id = "settingsForm";
          settings_form.className = "scrollMenu";
          settings_form.appendChild(settings_volume_div);
          settings_form.appendChild(settings_time_div);
          settings_form.appendChild(settings_tutorial_div);

          // Injecting login form into existing html
          var scene_html = document.getElementById("sceneHTML");
          scene_html.appendChild(settings_form);

        }.bind(this)
      },

      { // Account
        custom: function () { }.bind(this)
      },

      { // Map
        custom: function () { }.bind(this)
      },

      { // Hint
        custom: function () { }.bind(this)
      },

      { // Start
        custom: function () {

        	//putting this here because I dont know how else to initialize this as hidden
        	progressBar.hidden = true;
        	progressBackground.hidden = true;
        	ldBg.hidden = true;

        }.bind(this)
      }

    ];

    /////////
    // GUI //
    /////////

    this.buttonX = 216;
    this.buttonY = 72;

    this.backgroundX = 1920;
    this.backgroundY = 768;

    this.indicators = [];

    this.indicator_counter = 0;

    ////////////
    // LEVELS //
    ////////////

    this.num_levels = 20;

    this.levels = [

      { // Tutorial
        // Exactly one multiple of multiplicand in range, single digit multiplicand
        math: function () {
          this.level.multiplicand = 1;
          this.level.lower = 5;
          this.level.upper = 10;
        }.bind(this),
        open: function () {
          this.indicatorFunction(0);
        }
      },

      { // City
        // Exactly one multiple of multiplicand in range, single digit multiplicand
        math: function () {
          this.level.multiplicand = Math.floor(Math.random() * 7) + 2;
          this.level.multiple = Math.floor(Math.random() * 7) + 2;
          this.level.lower = (this.level.multiple * this.level.multiplicand) - Math.floor(this.level.multiplicand/2);
          this.level.upper = (this.level.multiple * this.level.multiplicand) + Math.floor(this.level.multiplicand/2);
        }.bind(this),
        open: function () {
          this.indicatorFunction(1);
        }
      },

      { // Grasslands
        // No multiples of multiplicand in range, single digit multiplicand
        math: function () {
          this.level.multiplicand = Math.floor(Math.random() * 7) + 2;
          this.level.multiple = Math.floor(Math.random() * 7) + 2;
          this.level.lower = (this.level.multiple * this.level.multiplicand) + 1;
          this.level.upper = (this.level.multiple * (this.level.multiplicand+1)) - 1;
        }.bind(this),
        open: function () {
          this.indicatorFunction(2);
        }
      },

      { // Volcano
        // Starting number is a two-digit number, target range includes the value which is one tenth of the number, and is bounded by positive single-digit integers.
        math: function () {
          this.level.multiplicand = Math.floor(Math.random() * 90)+ 10;
          this.level.factor = (0.1) * this.level.multiplicand;
          this.level.lower = Math.floor(this.level.factor);
          this.level.upper = Math.ceil(this.level.factor);
          if(this.level.lower == this.level.upper) {
            this.level.upper++;
          }
        }.bind(this),
        open: function () {
          this.indicatorFunction(3);
        }
      },

      { // Sea
        // Starting number is a two-digit number, target range goes from 0 to a single-digit positive integer.
        math: function () {
          this.level.multiplicand = Math.floor(Math.random() * 90) + 10;
          this.level.lower = 0;
          this.level.upper = Math.floor(Math.random() * 7) + 2;
        }.bind(this),
        open: function () {
          this.indicatorFunction(4);
        }
      },

      { // Mountains
        /*Starting number is a single-digit number. For target range, choose another single-digit number,
        multiply it by 10 times the starting number, and make sure that the target range contains that number.
        The lower boundary is an integer at least 10 below the product and the upper boundary is an integer
        at least 10 above the product.*/
        math: function () {
          this.level.multiplicand = Math.floor(Math.random() * 7) + 2;
          this.level.multiple = Math.floor(Math.random() * 7) + 2;
          this.level.storage = this.level.multiplicand * this.level.multiple * 10;
          this.level.lower = this.level.storage - 10;
          this.level.upper = this.level.storage + 10;
        }.bind(this),
        open: function () {
          this.indicatorFunction(5);
        }
      },

      { // Summit
        /*Starting number is a single-digit number n, target range contains 100n,
      	and the range makes it so there is only one integer answer
      	(i.e. the lower bound is above 100n − n and the upper bound is below 100n + n.*/
        math: function () {
      		this.level.multiplicand = Math.floor(Math.random() * 7) + 2;
      		this.level.multiple = 100 * this.level.multiplicand;
      		this.level.lower = this.level.multiple - Math.floor(this.level.multiplicand/2);
      		this.level.upper = this.level.multiple + Math.floor(this.level.multiplicand/2);
        }.bind(this),
        open: function () {
          this.indicatorFunction(6);
        }
      },

      { // Cave
        //Starting number is a two-digit number, target range contains 0 (flanked by single-digit integers)
        math: function () {
      		this.level.multiplicand = Math.floor(Math.random() * 90) + 10;
      		this.level.lower = -Math.abs(Math.floor(Math.random() * 7) + 2);
      		this.level.upper = Math.floor(Math.random() * 7) + 2;
        }.bind(this),
        open: function () {
          this.indicatorFunction(7);
        }
      },

      { // Forest
        //Starting number is a two-digit number, target range numbers are both 3-digit, with no integer
        math: function () {
      		this.level.multiplicand = Math.round((Math.random() * 90)) + 10;
      		this.level.lower = (Math.round((Math.random() * 90)+ 10 * 11) / 10);
      		if(this.level.lower % 1 == 0)
      		{
      			this.level.lower += 0.7;
      		}
      		this.level.upper = Math.round((this.level.lower * this.level.lower/8)*10 + this.level.lower/2) / 10;
      		if(this.level.upper % 1 == 0)
      		{
      			this.level.upper += 0.4;
      		}
        }.bind(this),
        open: function () {
          this.indicatorFunction(8);
        }
      },

      { // Alpine
        //Starting number is a three-digit number, target range goes from 0 to a single-digit positive integer.
        math: function () {
      		this.level.multiplicand = Math.floor((Math.random() * 900) + 100);
      		this.level.lower = 0;
      		this.level.upper = Math.floor(Math.random() * 7) + 2;
        }.bind(this),
        open: function () {
          this.indicatorFunction(9);
        }
      },

      { // Woods
        /*Starting number is a number between 0 and .1 with three decimal places. Lower bound of target
      	range is 1000 times the starting number, and upper bound is one more than the lower bound. */
        math: function () {
      		this.level.multiplicand = Math.floor((Math.random() * 990) + 10) / 1000;
      		this.level.lower = 1000 * this.level.multiplicand;
      		this.level.upper = this.level.lower + 1;
        }.bind(this),
        open: function () {
          this.indicatorFunction(10);
        }
      },

      { // Swamp
        /*Starting number is a number between 10 and 100 with one decimal place. Lower bound of target
      	range is 1000 times the starting number, and upper bound is one more than the lower bound.*/
        math: function () {
      		this.level.multiplicand = Math.floor(Math.random() * 90 * 10 + 10) / 10;
      		this.level.lower = 1000 * this.level.multiplicand;
      		this.level.upper = this.level.lower + 1;
        }.bind(this),
        open: function () {
          this.indicatorFunction(11);
        }
      },

      { // Deadlands
        /*Starting number is a whole number greater than 1,000,000. Target range contains the number which is .0001 times the size of the starting number.
      	The lower bound may be up to 50 less than this value and the upper bound may be up to 50 greater than this value.*/
        math: function () {
      		this.level.multiplicand = Math.floor(Math.random() * 10000000);
      		this.level.lower = (Math.floor(this.level.multiplicand * 0.0001)) - (Math.floor(Math.random() * 50) + 10);
      		this.level.upper = (Math.floor(this.level.multiplicand * 0.0001)) + (Math.floor(Math.random() * 50) + 10);
        }.bind(this),
        open: function () {
          this.indicatorFunction(12);
        }
      },

      { // Sky
        /*Starting number is an integer less than 200. Target range contains the number which is half the value
      	with an overall range less than 10. */
        math: function () {
      		this.level.multiplicand = Math.floor(Math.random() * 100 + 100);
      		this.level.lower = Math.floor(this.level.multiplicand / 2) - 4;
      		this.level.upper = Math.floor(this.level.multiplicand / 2) + 4;
        }.bind(this),
        open: function () {
          this.indicatorFunction(13);
        }
      },

      { // Underwater
        /*Starting number is a number less than 10 with one decimal place.
      	Target range has three-digit bounding numbers, does not contain an
      	integer multiple of the starting number, and the range of the interval is 1.*/
        math: function () {
      		this.level.multiplicand = Math.floor(Math.random() * 90 + 9) / 10;
      		this.level.lower = Math.floor(Math.random() * 900 + 100);
      		this.level.upper = this.level.lower + 1;
        }.bind(this),
        open: function () {
          this.indicatorFunction(14);
        }
      },

      { // Fungi
        /*Starting number is a negative single-digit integer. Target range contains only positive values, one of
      	which is a multiple of the starting number.*/
        math: function ()  {
      		this.level.multiplicand = -Math.abs(Math.floor(Math.random() * 7) + 2);
      		this.level.lower = this.level.multiplicand * this.level.multiplicand;
      		this.level.upper = this.level.lower + (Math.floor(Math.random() * 7) + 2);
        }.bind(this),
        open: function () {
          this.indicatorFunction(15);
        }
      },

      { // Tundra
        /*Starting number is a positive two-digit integer. Target range is bounded by two-digit negative integers
        5 away from each other.*/
        math: function () {
          this.level.multiplicand = Math.floor(Math.random() * 90 + 9);
          this.level.lower = -Math.abs(Math.floor(Math.random() * 84) + 15);
          this.level.upper = this.level.lower + 5;
        }.bind(this),
        open: function () {
          this.indicatorFunction(16);
        }
      },

      { // Tarpit
        /*Starting number is a number between -100 and -10 with one decimal place. Target range bounds are
        any two integers between -20 and 0.*/
        math: function () {
          this.level.multiplicand = -Math.abs(Math.floor(Math.random() * 90) + 10);
          this.level.lower = -Math.abs(Math.floor(Math.random() * 10) + 10);
          this.level.upper = -Math.abs(Math.floor(Math.random() * 10));
        }.bind(this),
        open: function () {
          this.indicatorFunction(17);
        }
      },

      { // Desert
        /*Starting number is a number between -100 and -10 with one decimal place. Target range bounds are
        any two integers between 0 and 20. */
        math: function () {
          this.level.multiplicand = -Math.abs(Math.floor(Math.random() * 90 * 10 + 10) / 10);
          this.level.lower = Math.floor(Math.random() * 10);
          this.level.upper = Math.floor(Math.random() * 10 + 10);
        }.bind(this),
        open: function () {
          this.indicatorFunction(18);
        }
      },

      { // Boreal
        /*Starting number is an integer between -100 and -10 with one decimal place. Target range bounds are
        positive numbers between 0 and 1 with two decimal places that are one hundredth apart. */
        math: function () {
          this.level.multiplicand = -Math.abs(Math.floor(Math.random() * 90 * 10 + 10) / 10);
          this.level.lower = Math.floor((Math.random() * 90) + 9) / 100;
          this.level.upper = Math.floor((this.level.lower + 0.01)* 100)/100;
        }.bind(this),
        open: function () {
          this.indicatorFunction(19);
        }
      },

      { // Monolith
        /*Starting number is any positive three digit integer. Target range is bounded by two numbers between
        -10 and -5, with three decimal places, and within one hundredth of each other. */
        math: function () {
          this.level.multiplicand = Math.floor(Math.random() * 900) + 100;
          this.level.lower = -Math.abs((Math.floor(Math.random() * 10000) + 5000) /1000);
          this.level.upper = this.level.lower + 0.01;
        }.bind(this),
        open: function () {
          this.indicatorFunction(20);
        }
      }

    ];

    this.number_spacing = 10;
    this.number_spacer = 25;

    this.structureX = 1920;
    this.structureY = 1440;

    ////////////
    // MOBILE //
    ////////////

    this.phone_rotationS = {

      images: ["res/phone-rotation.png"],
      frames: {width:288, height:288, count:2, regX: 0, regY:0, spacing:0, margin:0},
      framerate: 2

    };

    this.stage = new createjs.Stage('drawingCanvas');           // Stage for drawing pictures and shapes
    createjs.Touch.enable(this.stage);                          // Enable touch interaction for mobile
    this.stage.enableMouseOver();                               // Enable mouse events with scene objects
    this.bg = new createjs.Shape();                             // Create a rectangle for clearing the screen
    this.bg_color = "#333333";                                  // Background color
    this.stage.addChild(this.bg);                               // Add rectangle to the stage

    this.music.loadSound();                                     // Load sounds from file
    console.log(this.music.playlist);

    this.createScene();                                         // Create scene assets

    this.landscape_warning = new createjs.Shape();

    this.phone_rotation = AssetHandler.createSprite(this.phone_rotationS, 288, 288, "center", 0, "center", 0, "image", this.ecs, this.stage);
    this.stage.removeChild(this.phone_rotation);

    createjs.Ticker.setFPS(30);                                 // Set FPS (could be depricated?)
    createjs.Ticker.addEventListener('tick', this.tick);        // Set tisk listener for use as game loop

    document.onkeydown = this.input.keyDown.bind(this.input);   // Add keydown listener
    document.onkeyup = this.input.keyUp.bind(this.input);       // Add keyup listener

    this.resize(); // Resize to set initial scale

  },

  methods: {

    /////////////
    // SCALING //
    /////////////

    // Scale the stage
    resize: function() {

      this.mobile.mobileCheck.bind(this.mobile);
      this.mobile.orientationCheck.bind(this.mobile);

      // Resize the canvas element with new window size
      this.stage.canvas.width = window.innerWidth;
      this.stage.canvas.height = window.innerHeight;

      this.screen_ratio = this.stage.canvas.width / this.stage.canvas.height;

      if (window.innerWidth < 600) {
        // gui_scale = 3;
      } else if (window.innerWidth < 900) {
        // gui_scale = 2;
      } else {
        // gui_scale = 1;
      }

      // Redraw background before everthing else for Z-axis reasons
      this.bg.graphics.clear()
      this.bg.graphics.beginFill(this.bg_color).drawRect(0, 0, this.stage.canvas.width, this.stage.canvas.height);

      // Calculate the scene scaling
      if (this.screen_ratio < 2.5) { // tall screen
        this.max_stored = false;
        this.scene_scale_X = this.stage.canvas.width / this.max_scale_X;
        this.scene_scale_Y = this.stage.canvas.width / this.max_scale_X;
      } else if (this.screen_ratio > 2.5) { // wide screen
        if(!this.max_stored) {
          this.max_stored = true;
          this.temp_max = this.stage.canvas.height;
        }
        this.temp_scale = this.stage.canvas.width / this.max_scale_X;
        this.scene_scale_X = this.temp_scale * ( this.stage.canvas.height / this.temp_max );
        this.scene_scale_Y = this.temp_scale * ( this.stage.canvas.height / this.temp_max );
      }

      // Calculate the scene margin in a given direction
      this.scene_margin_X = ( this.stage.canvas.width - this.max_scale_X ) / 2;

      // Log screen scaling for debugging purposes
      // console.log(this.scene_scale_X);
      // console.log(this.scene_scale_Y);
      console.log(this.screen_ratio);

      this.landscape_warning.graphics.clear()
      this.landscape_warning.graphics.beginFill("#000000").drawRect(0, 0, this.stage.canvas.width, this.stage.canvas.height);

      if (this.current_scene == 3) {
        AssetHandler.scaleAssets(this.lcs, this.current_scene, this.mobile.isMobile, this.scene_scale_Y, this.scene_scale_X, this.stage); // Scale scene appropriately
      } // else {
        AssetHandler.scaleAssets(this.ecs, this.current_scene, this.mobile.isMobile, this.scene_scale_Y, this.scene_scale_X, this.stage); // Scale scene appropriately
      // }
      // this.scaleAssets(this.gcs, this.current_scene, this.mobile.isMobile, this.scene_scale_Y, this.scene_scale_X, this.stage); // Scale scene appropriately

      this.stage.update()

    },

    tick: function(event) {

      if (this.current_scene == 0) {

        // console.log(this.user.authenticated);

        if (this.user.authenticated) {
          this.changeScene(2);
        }

      }

      if (this.current_scene == 3) {

        var y_position = (284 * this.scene_scale_Y).toString() + "px";
        var x_position = (960 * this.scene_scale_Y).toString() + "px";

        // console.log(x_position);

        var game_entry_form = document.getElementById("equationBanner");
        game_entry_form.style.bottom = y_position;
        game_entry_form.style.right = x_position;
        document.getElementById("entryInput").focus();

        y_position = (310 * this.scene_scale_Y).toString() + "px";
        x_position = ( (960 - 282) * this.scene_scale_X).toString() + "px";

        // console.log(x_position);

        var game_history_form = document.getElementById("historyBanner");
        game_history_form.style.bottom = y_position;
        game_history_form.style.right = x_position;

      }

      //Calls external function to generate ranges for each level, this is reset when each level is selected on level select

      if (this.current_scene == 3 && this.level.pause_menu.visible == false) {

        // If the range is not generated
      	if(!this.level.generated) {

          // Generate the range
      		this.levels[this.level.current_level].math();

          this.level.clearMultiplicandBanner();

          this.level.remakeMultiplierBanner();
          this.level.remakeRangeBanner();

      		this.level.generated = true;

      	}

        // Key checks at the beginning of the update loop
        // Spacebar to randomize the range
        // if (keys[32]){
          // randomizeRangeAndMultiplier();
        // }

        // console.log(this.input.drag_up);

        // Enter or swipe up to check input
        if ((this.input.keys[13] || this.input.drag_up) && this.level.catapult.paused) { // Enter or drag up swipe on mobile
          console.log("Enter Pressed");

          // Reset drag_up bool;
          this.input.drag_up = false;

          this.level.runInput(this.mobile.isMobile);
          this.clearHtml();
          this.level.makeGameForm(this.mobile.isMobile);

        }

        // If on mobile
        if (this.mobile.isMobile) {
          // Check which digit is selected and highlight it
          this.level.checkSelectedDigit();
        }

        // Run through and finish animations that play once
        this.level.updateSinglePlayAnimations();

        // Check for hit and miss and then run thier animations
        this.level.runHitAnimations();
        this.level.runMissAnimations( function() { createjs.Sound.play("menu"); this.changeScene(9); }.bind(this) );

        // Check to see if the tutorial should be displayed
        this.level.checkTutorial();

        //If game over
        if (this.level.hit_counter >= 3 && this.level.miss_upper_counter >= 1 && this.level.miss_lower_counter >= 1 && this.level.reload == false) {

          // udpate global total
          this.user.hits += this.level.hit_counter;
          this.user.highs += this.level.miss_upper_counter;
          this.user.lows += this.level.miss_lower_counter;

          this.level.hit_text.text += this.level.hit_counter.toString();
          this.level.low_text.text += this.level.miss_lower_counter.toString();
          this.level.high_text.text += this.level.miss_upper_counter.toString();

          this.menu_button.visible = false;

          // Show the endgame screen
          this.level.createVictoryBanner(this.scene_scale_X, this.scene_scale_Y);

          // update database
          this.updateStats({
            user: this.user.username,
            hits: this.user.hits,
            highs: this.user.highs,
            lows: this.user.lows
          });

          // Also maybe check if boss level is active
          // this.level.checkBossFight();
        }

        // Hide bad guys when hit
        this.level.hideBadGuys();

        // Run the catapult animation
        this.level.runCatapultAnimation(this.scene_scale_Y);

        // Reload the catapult
        this.level.reloadCatapult(this.stage, this.scene_scale_Y)

      }

      // Update frame counter for drawing
      // frame_counter++;

      // if (frame_counter > 9) {
        //
        // this.level.reload_counter += frame_counter;
        // frame_counter = 0;
        //
      // }

      this.stage.update(event);

    },

    ////////////
    // SCENES //
    ////////////

    // Load the scene in the variable current_scene
    loadCurrentScene: function() {

      // Load background color for the scene
      this.bg_color = sceneData[this.current_scene].color;

      // If the current scene is the game load the special level assets
      if (this.current_scene == 3) {

          this.bg_color = levelData[this.level.current_level].color;

          if (!this.level.generated) {
            this.level.loadLevel();
          } else {
            this.level.makeGameForm(this.mobile.isMobile);
            this.level.remakeMultiplierBanner();
            this.level.remakeRangeBanner();
          }

      }

      // Destroy the last scene
      this.destroyScene();

      // Create the new scene
      this.createScene();

      // this.level.visibleForm(true);

      // Resize everything for scaling
      this.resize();

    },

    changeScene: function(new_scene) {

      // Set the current scene to the new scene

      this.last_scene = this.current_scene;
      this.current_scene = new_scene;
      console.log("Last Scene: " + this.last_scene);
      console.log("Current Scene: " + this.current_scene);

      // Load the scene
      this.loadCurrentScene();

    },

    createScene: function() {

      this.stage.addChild(this.bg);
      this.bg.graphics.clear()
      this.bg.graphics.beginFill(this.bg_color).drawRect(0, 0, this.stage.canvas.width, this.stage.canvas.height);

      this.background = AssetHandler.createImage(sceneData[this.current_scene].bg_img, this.backgroundX, 1440, "center", 0, "center", 0, "image", this.ecs, this.stage);
      this.background_top = AssetHandler.createImage(sceneData[this.current_scene].bg_img, this.backgroundX, 1440, "center", 0, "center", -1440, "image", this.ecs, this.stage);
      this.background_bottom = AssetHandler.createImage(sceneData[this.current_scene].bg_img, this.backgroundX, 1440, "center", 0, "center", 1440, "image", this.ecs, this.stage);
      this.background_left = AssetHandler.createImage(sceneData[this.current_scene].bg_img, this.backgroundX, 1440, "center", -this.backgroundX, "center", 0, "image", this.ecs, this.stage);
      this.background_right = AssetHandler.createImage(sceneData[this.current_scene].bg_img, this.backgroundX, 1440, "center", this.backgroundX, "center", 0, "image", this.ecs, this.stage);

      switch (this.current_scene) {

        case 0:
          // scenes[this.current_scene].fg_text] = "Login:\n\nSignup:\n\n";
          sceneData[this.current_scene].fg_text = "";
          break;
        case 1:
          // scenes[this.current_scene].fg_text = "Firstname:\n\nLastname:\n\nUsername:\n\nPassword:\n\nConfirm:\n\n";
          sceneData[this.current_scene].fg_text = "";
          break;
        case 4:
          sceneData[this.current_scene].fg_text = "Hits: " + this.user.hits + "\n\nHighs: " + this.user.highs + "\n\nLows: " + this.user.lows + "\n\nTotal Misses: " + (this.user.highs + this.user.lows) + "\n\n";
          break;
        case 5:
          sceneData[this.current_scene].fg_text = "How To Play:\nThe goal of the game is to get\none hit anywhere above the range,\none hit anywhere below the range,\nand three hits within the range";
          break;
        case 6:
          // scenes[this.current_scene].fg_text = "Volume:\n\nTime:\n\nTutorial\n\n";
          sceneData[this.current_scene].fg_text = "";
          break;
        case 7:
          sceneData[this.current_scene].fg_text = "Username: " + this.user.username + "\n\nName: " + this.user.firstname + " " + this.user.lastname + "\n\n";
          break;
        case 9:
          sceneData[this.current_scene].fg_text = levelData[this.level.current_level].hint;
          break;
        default:

      }

      if (this.current_scene != 8 && this.current_scene != 2 && this.current_scene != 3 && this.current_scene != 10) {
        this.foreground = AssetHandler.createTextContainer(sceneData[this.current_scene].fg_img, sceneData[this.current_scene].fg_text, "Oldstyle", "32px", "normal", "Saddlebrown", sceneData[this.current_scene].fg_img.frames.width, sceneData[this.current_scene].fg_img.frames.height, "center", 0, "center", 0, "image", 0, this.ecs, this.stage);
      } else if (this.current_scene == 10) {
        this.foreground = AssetHandler.createImage("res/title-text.png", 1635, 480, "center", 0, "top", 144 + 480 / 2, "image", this.ecs, this.stage);
      }

      if (this.current_scene == 2) {
        this.background = AssetHandler.createImage("res/menu.png", this.backgroundX, this.backgroundY, "center", 0, "bottom", -this.backgroundY / 2, "image", this.ecs, this.stage);
        this.background_left = AssetHandler.createImage("res/menu-left.png", this.backgroundX, this.backgroundY, "center", 0 - (this.backgroundX), "bottom", -this.backgroundY / 2, "image", this.ecs, this.stage);
        this.background_right = AssetHandler.createImage("res/menu-right.png", this.backgroundX, this.backgroundY, "center", 0 + (this.backgroundX), "bottom", -this.backgroundY / 2, "image", this.ecs, this.stage);
      }

      this.scenes[this.current_scene].custom();

      this.createGUI();

      // console.log(entity_component_system);

    },

    oneWayScene: function() {

      // Switch the current and last screen
      var temp = this.current_scene;
      this.current_scene = this.last_scene;
      this.last_scene = temp;

      // Load the scene
      this.loadCurrentScene();

      // If the last scene was the game open with the pause screen
      if (this.last_scene == 3) {

        this.menu_button.visible = false;

        this.level.openPauseMenu(user_authentication);

        // this.level.pauseAnimation(true);
        // this.level.visibleButton(true);
        // this.level.visibleForm(false);

      } else if (this.current_scene == 3) {

        this.level.makeGameForm(this.mobile.isMobile);
        this.level.remakeMultiplierBanner();
        this.level.remakeRangeBanner();
        this.level.structure_score.text = "Total Lows: " + this.level.miss_lower_counter.toString() + "\nTotal High: " + this.level.miss_upper_counter.toString() + "\nTotal Hits: " + this.level.hit_counter.toString();

      }

    },

    destroyScene: function() {

      // switch(last_scene) {
      // 	case 0:
      // 		break;
      // 	default:
      // }

      this.clearHtml();

      this.stage.removeAllChildren();

    },

    clearHtml: function() {

      var scene_html = document.getElementById("sceneHTML");

      while (scene_html.firstChild) {

        scene_html.removeChild(scene_html.firstChild);

      }

    },

    indicatorFunction: function(newL) {

      this.level.generated = false;
      createjs.Sound.play("select");
      this.level.current_level = newL;
      this.level.resetLevel();
      this.changeScene(3);

    },

    /////////
    // GUI //
    /////////

    createGUI: function() {

    	switch(this.current_scene) {

    		case 0:

    			// scale_to_canvas(left_sword_button, "center", 0 - (this.buttonX/2 + 10) * scene_scale_Y, "center", 0 + (this.buttonY/2 + 140) * scene_scale_Y, "image");
    			// scale_to_canvas(right_sword_button, "center", 0 + (this.buttonX/2 + 50) * scene_scale_Y, "center", 0 + (this.buttonY/2 + 140) * scene_scale_Y, "image");

    			this.left_sword_button = AssetHandler.createButton("res/sword-left.png", "Login", this.buttonX, this.buttonY, "center", -(this.buttonX/2 + 30), "center", (this.buttonY/2 + 200), "image", function() {
    				createjs.Sound.play("sword");
    				var key = document.getElementById('usernameInput').value;
            var text = {
              "uname": document.getElementById('usernameInput').value,
              "pass": document.getElementById('passwordInput').value
            };
            this.verifyUser(text);
    			}.bind(this), this.ecs, this.stage);

    			this.right_sword_button = AssetHandler.createButton("res/sword-right.png", "Signup", this.buttonX, this.buttonY, "center", (this.buttonX/2 + 65), "center", (this.buttonY/2 + 200), "image", function() {
    				createjs.Sound.play("sword");
            this.changeScene(1);
    			}.bind(this), this.ecs, this.stage);

    			// this.secret_button = AssetHandler.createButton("res/secret_button.png", "", this.backgroundX, 1440, "center", 0, "center", 0, "image", function() {
    			// 	createjs.Sound.play("sword");
          //   this.changeScene(8);
    			// }.bind(this), this.ecs, this.stage);

    			// if (mobile) {
    			// 	scale_to_canvas(left_sword_button, "center", 0 - (this.buttonX/2 + 30) * scene_scale_Y, "center", 0 + (this.buttonY/2 + 200) * scene_scale_Y, "smallgui");
    			// 	scale_to_canvas(right_sword_button, "center", 0 + (this.buttonX/2 + 65) * scene_scale_Y, "center", 0 + (this.buttonY/2 + 200) * scene_scale_Y, "smallgui");
    			// } else {

    			break;
    		case 1:

    		// if (mobile) {
    		// 	scale_to_canvas(left_sword_button, "center", 0 - (this.buttonX/2 + 10) * scene_scale_Y, "center", 0 + (this.buttonY/2 + 140) * scene_scale_Y, "gui");
    		// 	scale_to_canvas(right_sword_button, "center", 0 + (this.buttonX/2 + 50) * scene_scale_Y, "center", 0 + (this.buttonY/2 + 140) * scene_scale_Y, "gui");
    		// } else {

    		this.left_sword_button = AssetHandler.createButton("res/sword-left.png", "Cancel", this.buttonX, this.buttonY, "center", -(this.buttonX/2 + 30), "center", (this.buttonY/2 + 200), "image", function() {
            // fieldInput_error.alpha = 0; // password_error.alpha = 0; // message.render = 0;
      			createjs.Sound.play("sword");
      			this.changeScene(0);
    			}.bind(this), this.ecs, this.stage);

    		this.right_sword_button = AssetHandler.createButton("res/sword-right.png", "Signup", this.buttonX, this.buttonY, "center", (this.buttonX/2 + 65), "center", (this.buttonY/2 + 200), "image", function() {
          createjs.Sound.play("sword");
          var key = document.getElementById('usernameInput').value;
          if( /*key in this.database.users ||*/ key == "" ) {
            document.getElementById('errorText').textContent = "Invalid username";
          }	else {
            if(document.getElementById('firstnameInput').value == "") {
              document.getElementById('errorText').textContent = "Invalid firstname";
            } else {
              if(document.getElementById('lastnameInput').value == "") {
                document.getElementById('errorText').textContent = "Invalid lastname";
              } else {
                if(document.getElementById('passwordInput').value == "") {
                  document.getElementById('errorText').textContent = "Invalid password";
                } else {
                  if(document.getElementById('passwordInput').value != document.getElementById('confirmInput').value) {
                    document.getElementById('errorText').textContent = "Passwords do not match";
                  } else {
                    var text = {
                      "uname": document.getElementById('usernameInput').value,
                      "pass": document.getElementById('passwordInput').value,
                      "fname": document.getElementById('firstnameInput').value,
                      "lname": document.getElementById('lastnameInput').value,
                      "confirm": document.getElementById('confirmInput').value
                    };
                    this.createUser(text);
                    this.changeScene(2);
                  }
                }
              }
            }
          }
    		}.bind(this), this.ecs, this.stage);

        break;

    		case 2:

    			// if (mobile) {
    			// 	scale_to_canvas(play_button, "center", 0, "center", 0 - 105, "gui");
    			// 	scale_to_canvas(stats_button, "center", 0, "center", 0 - 20, "gui");
    			// 	scale_to_canvas(h2p_button, "center", 0, "center", 0 + 65, "gui");
    			// 	scale_to_canvas(settings_button, "center", 0, "center", 0 + 150, "gui");
    			// 	scale_to_canvas(logout_button, "left", (this.buttonX/2 + 10), "top", (this.buttonY/2 + 10), "gui");
    			// 	scale_to_canvas(account_button, "right", 0 - (this.buttonX/2 + 10), "top", (this.buttonY/2 + 10), "gui");
    			// } else {

    			this.play_button = AssetHandler.createButton("res/menu-button.png", "Play", this.buttonX, this.buttonY, "center", 0, "center", 0 - 200, "gui", function() { createjs.Sound.play("menu"); this.changeScene(8); }.bind(this), this.ecs, this.stage);
    			this.stats_button = AssetHandler.createButton("res/menu-button.png", "Stats", this.buttonX, this.buttonY, "center", 0, "center", 0 - 100, "gui", function() { createjs.Sound.play("menu"); this.changeScene(4); this.getUserData(this.user.username); }.bind(this), this.ecs, this.stage);
    			this.h2p_button = AssetHandler.createButton("res/menu-button.png", "How To Play", this.buttonX, this.buttonY, "center", 0, "center", 0 - 0, "gui", function() { createjs.Sound.play("menu"); this.indicatorFunction(0); }.bind(this), this.ecs, this.stage);
    			this.settings_button = AssetHandler.createButton("res/menu-button.png", "Settings", this.buttonX, this.buttonY, "center", 0, "center", 0 + 100, "gui", function() { createjs.Sound.play("menu"); this.changeScene(6); }.bind(this), this.ecs, this.stage);
    			this.logout_button = AssetHandler.createButton("res/menu-button.png", "Logout", this.buttonX, this.buttonY, "left", (this.buttonX/2 + 10), "top", (this.buttonY/2 + 10), "gui", function() { createjs.Sound.play("menu"); this.user.authenticated = false; this.changeScene(0); this.signoutUser(); }.bind(this), this.ecs, this.stage);
    			this.account_button = AssetHandler.createButton("res/menu-button.png", "Account", this.buttonX, this.buttonY, "right", 0 - (this.buttonX/2 + 10), "top", (this.buttonY/2 + 10), "gui", function() { createjs.Sound.play("menu"); this.changeScene(7); this.getUserData(this.user.username); }.bind(this), this.ecs, this.stage);

    			break;

    		case 3:

      		// if (mobile) {
          //
      		// 	scale_to_canvas(pause_menu, "center", 0, "center", 0, "image");
      		// 	scale_to_canvas(close_button, "center", 0 + 445 * scene_scale_Y, "center", 0 - 281 * scene_scale_Y, "gui");
      		// 	scale_to_canvas(main_menu_button, "center", 0, "center", 0 - 180 * scene_scale_Y, "gui");
      		// 	scale_to_canvas(exit_level_button, "center", 0, "center", 0 - 110 * scene_scale_Y, "gui");
      		// 	scale_to_canvas(settings_button, "center", 0, "center", 0 - 40 * scene_scale_Y, "gui");
          //
      		// 	scale_to_canvas(end_level_scene, "center", 0, "center", 0, "image");
      		// 	scale_to_canvas(end_level_button, "center", 0, "center", 0 + 250 * scene_scale_Y, "gui");
      		// 	scale_to_canvas(end_text, "center", 0, "center", 0 - 140 * scene_scale_Y, "image");
      		// 	scale_to_canvas(hit_text, "center", 0 - 120 * scene_scale_Y, "center", 0, "image");
      		// 	scale_to_canvas(low_text, "center", 0 - 120 * scene_scale_Y, "center", 0 + 40 * scene_scale_Y, "image");
      		// 	scale_to_canvas(high_text, "center", 0 - 120 * scene_scale_Y, "center", 0 + 80 * scene_scale_Y, "image");
          //
      		// 	scale_to_canvas(hit_text_counter, "left", 30, "center", 0 + 225 * scene_scale_Y, "image");
      		// 	scale_to_canvas(low_text_counter, "left", 30, "center", 0 + 280 * scene_scale_Y, "image");
      		// 	scale_to_canvas(high_text_counter, "left", 30, "center", 0 + 300 * scene_scale_Y, "image");
          //
      		// 	scale_to_canvas(menu_button, "right", 0 - (this.buttonX/2 + 10), "bottom", 0 - (this.buttonY/2 + 10), "gui");
      		// 	scale_to_canvas(hint_button, "center", 0 - 313 * scene_scale_Y, "center", 0 + 194 * scene_scale_Y, "gui");
          //
      		// } else {

          this.menu_button = AssetHandler.createButton("res/login-button.png", "Pause", this.buttonX, this.buttonY, "right", -(this.buttonX/2 + 10), "bottom", -(this.buttonY/2 + 10), "gui", function() {
            createjs.Sound.play("menu");

        		this.menu_button.visible = false;

            this.level.openPauseMenu(user_authentication);

            // this.level.pauseAnimation(true);
            // this.level.visibleButton(true);
            // this.level.visibleForm(false);

          }.bind(this), this.ecs, this.stage);

    			if (this.mobile.isMobile) {

    				this.ll_number_button = AssetHandler.createButton("res/number-button-ll.png", "", this.backgroundX, 288, "center", 0, "bottom", 0 - (288/2), "image", function() {
    					if(this.level.digit > 0)
    						this.level.digit--;
    					if(this.level.digit < 0)
    						this.level.digit = 0;
    					console.log(this.level.digit);
    				}.bind(this), this.ecs, this.stage);

    				this.lr_number_button = AssetHandler.createButton("res/number-button-lr.png", "", this.backgroundX, 288, "center", 0, "bottom", 0 - (288/2), "image", function() {
    					if(this.level.digit < 2)
    						this.level.digit++;
    					if(this.level.digit > 2)
    						this.level.digit = 2;
    					console.log(digit);
    				}.bind(this), this.ecs, this.stage);

    				this.rl_number_button = AssetHandler.createButton("res/number-button-rl.png", "", this.backgroundX, 288, "center", 0, "bottom", 0 - (288/2), "image", function() {
    					this.level.multiplier -= this.level.adder;
    					document.getElementById("hundredsPlace").textContent = Math.floor(this.level.multiplier/100 % 10);
    					document.getElementById("tensPlace").textContent = Math.abs(Math.floor(this.level.multiplier/10 % 10));
    					document.getElementById("onesPlace").textContent = Math.abs(Math.floor(this.level.multiplier % 10));
    				}.bind(this), this.ecs, this.stage);

    				this.rr_number_button = AssetHandler.createButton("res/number-button-rr.png", "", this.backgroundX, 288, "center", 0, "bottom", 0 - (288/2), "image", function() {
    					this.level.multiplier += this.level.adder;
    					document.getElementById("hundredsPlace").textContent = Math.floor(this.level.multiplier/100 % 10);
    					document.getElementById("tensPlace").textContent = Math.abs(Math.floor(this.level.multiplier/10 % 10));
    					document.getElementById("onesPlace").textContent = Math.abs(Math.floor(this.level.multiplier % 10));
    				}.bind(this), this.ecs, this.stage);

    			}

    			break;

    		case 4:

    			this.menu_button = AssetHandler.createButton("res/login-button.png", "Menu", this.buttonX, this.buttonY, "left", (this.buttonX/2 + 10), "bottom", -(this.buttonY/2 + 10), "gui", function() { createjs.Sound.play("menu"); this.changeScene(2); }.bind(this), this.ecs, this.stage);

    			break;

    		case 5:

    			this.menu_button = AssetHandler.createButton("res/login-button.png", "Menu", this.buttonX, this.buttonY, "left", (this.buttonX/2 + 10), "bottom", -(this.buttonY/2 + 10), "gui", function() { createjs.Sound.play("menu"); this.changeScene(2); }.bind(this), this.ecs, this.stage);

    			break;

    		case 6:

    			this.menu_button = AssetHandler.createButton("res/login-button.png", "Menu", this.buttonX, this.buttonY, "left", (this.buttonX/2 + 10), "bottom", -(this.buttonY/2 + 10), "gui", function() { createjs.Sound.play("menu"); this.oneWayScene(); }.bind(this), this.ecs, this.stage);

    			break;

    		case 7:

    			this.menu_button = AssetHandler.createButton("res/login-button.png", "Menu", this.buttonX, this.buttonY, "left", (this.buttonX/2 + 10), "bottom", -(this.buttonY/2 + 10), "gui", function() { createjs.Sound.play("menu"); this.changeScene(2); }.bind(this), this.ecs, this.stage);

    			break;

    		case 8:

    			var reefS = {
    				images: ["res/reef.png"],
    				frames: {width:120, height:108, count:6, regX: 0, regY:0, spacing:0, margin:0},
    				framerate: 3
    			};

    			var skylandS = {
    				images: ["res/skyland.png"],
    				frames: {width:180, height:120, count:6, regX: 0, regY:0, spacing:0, margin:0},
    				framerate: 3
    			};

    			this.midground = AssetHandler.createImage("res/map.png", this.backgroundX, this.backgroundY, "center", 0, "center", 0, "image", this.ecs, this.stage);
    			this.foreground = AssetHandler.createButton("res/map-banner.png", "Select a level", this.backgroundX, 108, "center", 0, "top", 0 + (108/2), "image", function() {}.bind(this), this.ecs, this.stage);

    			var reef = AssetHandler.createSprite(reefS, 120, 108, "center", -480 + 120 / 2, "center", 96 + 108 / 2, "image", this.ecs, this.stage);
    			reef.gotoAndPlay(0);

    			var skyland = AssetHandler.createSprite(skylandS, 180, 120, "center", -243 + 180 / 2, "center", -246 + 120 / 2, "image", this.ecs, this.stage);
    			skyland.gotoAndPlay(0);

          if (this.user.authenticated) {

  			     this.menu_button = AssetHandler.createButton("res/login-button.png", "Menu", this.buttonX, this.buttonY, "left", (this.buttonX/2 + 10), "bottom", -(this.buttonY/2 + 10), "gui", function() { createjs.Sound.play("menu"); this.changeScene(2); }.bind(this), this.ecs, this.stage);

          } else {

  			     this.menu_button = AssetHandler.createButton("res/login-button.png", "How To Play", this.buttonX, this.buttonY, "left", (this.buttonX/2 + 10), "bottom", -(this.buttonY/2 + 10), "gui", function() { createjs.Sound.play("menu"); this.indicatorFunction(0); }.bind(this), this.ecs, this.stage);

          }

    			for (var i = 1; i < (this.num_levels + 1); i++) {

    				var temp = AssetHandler.createButton("res/map-indicator.png", (i).toString(), 48, 48, "center", indicatorCoordinates[i].x/* + 48/2*/, "center", indicatorCoordinates[i].y/* + 48/2*/, "gui", this.levels[i].open.bind(this), this.ecs, this.stage);
            temp.on("mouseover", this.handleMouseEvent);
    				temp.on("mouseout", this.handleMouseEvent);

    				this.indicators.push(temp);

    			}

			    this.containerFrame = AssetHandler.createContainerFrame(210, 310, "center", 200, "center", 200, "gui", this.ecs, this.stage);
			    this.containerFrame.visible = false;

    			break;

        case 9:

    			this.menu_button = AssetHandler.createButton("res/login-button.png", "Menu", this.buttonX, this.buttonY, "left", (this.buttonX/2 + 10), "bottom", -(this.buttonY/2 + 10), "gui", function() {
            createjs.Sound.play("menu");
            // this.changeScene(3);
            this.oneWayScene();

        		this.menu_button.visible = false;

            console.log(this.level.multiplicand);
            console.log(this.level.lower);
            console.log(this.level.upper);

            // this.level.openPauseMenu();

            // this.level.pauseAnimation(true);
            // this.level.visibleButton(true);
            // this.level.visibleForm(false);

          }.bind(this), this.ecs, this.stage);

          break;

    		case 10:

    			this.logout_button = AssetHandler.createButton("res/login-button.png", "Login", this.buttonX, this.buttonY, "right", -(this.buttonX/2 + 10), "top", (this.buttonY/2 + 10), "gui", function() { createjs.Sound.play("menu"); this.changeScene(0); }.bind(this), this.ecs, this.stage);
    			this.play_button = AssetHandler.createButton("res/login-button.png", "Start", this.buttonX, this.buttonY, "center", 0, "bottom", - 2.5 * (this.buttonY/2 + 10), "gui", function() { createjs.Sound.play("menu"); this.changeScene(8); }.bind(this), this.ecs, this.stage);

    			break;

    		default:

    	}

      this.landscape_warning = new createjs.Shape();

      this.phone_rotation = AssetHandler.createSprite(this.phone_rotationS, 288, 288, "center", 0, "center", 0, "image", this.ecs, this.stage);
      this.stage.removeChild(this.phone_rotation);

    },

    ////////////
    // LEVELS //
    ////////////

    destroyLevel: function() {

      for (var i = 0; i < lcs.length; i++) {

        this.stage.removeChild(this.lcs[i].object)

      }

      this.lcs = [];

    },

    handleMouseEvent: function(evt) {

      if(evt.type == "mouseover"){

        console.log("level " + evt.target.text);
        let temp = this.containerFrame.getChildByName("titleFrame");
        temp.text = levelDescriptors[evt.target.text].title;
        temp = this.containerFrame.getChildByName("descripterFrame");
        temp.text = levelDescriptors[evt.target.text].description;
        this.containerFrame.x = this.scene_scale_Y * indicatorCoordinates[evt.target.text].x + this.stage.canvas.width / 2 + 15;
        this.containerFrame.y = this.scene_scale_Y * indicatorCoordinates[evt.target.text].y + this.stage.canvas.height / 2 + 15;
        this.containerFrame.visible = true;

      }

      if(evt.type == "mouseout"){

          this.containerFrame.visible = false;
          this.containerFrame.x = 100;
          this.containerFrame.y = 100;

      }

    },

    ///////////////////////
    // DATABASE REQUESTS //
    ///////////////////////

    async createUser(text) {

      try {

        await LoginService.registerUser(text, this.user);

      } catch (err) {

        this.error = err.message;
        console.log(this.error);

      }

      try {

        let stats = await StatService.findUserStats(text.uname);
        console.log(stats.data);
        this.user.hits = stats.data.hits;
        this.user.highs = stats.data.highs;
        this.user.lows = stats.data.lows;

      } catch (err) {

        this.error = err.message;
        console.log(this.error);

      }

    },

    async getUserData(text) {

      try {

        let stats = await StatService.findUserAccount(text);
        console.log(stats.data);
        this.user.username = stats.data.uname;
        this.user.firstname = stats.data.fname;
        this.user.lastname = stats.data.lname;

      } catch (err) {

        this.error = err.message;
        console.log(this.error);

      }

      try {

        let stats = await StatService.findUserStats(text);
        console.log(stats.data);
        this.user.hits = stats.data.hits;
        this.user.highs = stats.data.highs;
        this.user.lows = stats.data.lows;

      } catch (err) {

        this.error = err.message;
        console.log(this.error);

      }

    },

    async verifyUser(text) {

      try {

        await LoginService.loginUser(text, this.user);
        console.log(this.user.authenticated);
        // this.user = await LoginService.loginUser(text);
        console.log("User: " + this.user.username);

      } catch (err) {

        this.error = err.message;
        console.log(this.error);

      }

      try {

        let stats = await StatService.findUserStats(text.uname);
        console.log(stats.data);
        this.user.hits = stats.data.hits;
        this.user.highs = stats.data.highs;
        this.user.lows = stats.data.lows;

      } catch (err) {

        this.error = err.message;
        console.log(this.error);

      }

      // if (this.user.authenticated) {
      //   this.changeScene(2);
      // }

      try {
        this.posts = await LoginService.getUsers();
      } catch (err) {
        this.error = err.message;
        console.log(this.error);
      }

    },

    async updateStats(text) {

      try {

        let stats = await StatService.updateUserStats(text);
        console.log(stats.data);
        this.user.hits = stats.data.hits;
        this.user.highs = stats.data.highs;
        this.user.lows = stats.data.lows;

      } catch (err) {

        this.error = err.message;
        console.log(this.error);

      }

    },

    async signoutUser() {

      try {

        await LoginService.logoutUser();

      } catch (err) {

        this.error = err.message;
        console.log(this.error);

      }

    }

  }

}

// function loadImage() {
//   var preload = new createjs.LoadQueue();
//   preload.addEventListener("fileload", handleFileComplete);
//   preload.loadFile("assets/preloadjs-bg-center.png");
// }
//
// function handleFileComplete(event) {
//   document.body.appendChild(event.result);
// }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

#entryDisplay {
  display: inline;
}

/* #renderCanvas {
  width   : 100%;
  height  : 100%;
  touch-action: none;
} */

.ldscreen {
  position: absolute;
  transform: translate(0%, -100%);
  background-color: #919191;
  height: 100%;
  width: 100%;
	z-index: 3;
}

#loadingText {
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: "Blackadder";
  font-size: 15vh;
  z-index: 2;
  color: Gold;
}

#percentText {
  position: absolute;
  top: 70%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: "Oldstyle";
  font-size: 10vh;
  z-index: 2;
  color: Gold;
}

.bgbar {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: LightGray;
  height: 50px;
  width: 1000px;
	z-index: 2;
}

.pgbar {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: Gold;
  height: 100%;
  width: 100%;
	z-index: 2;
}

.scrollMenu {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 5px;
  z-index: 1;
  text-align: center;
  font-family: "Blackadder";
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
  display: inline;
}

#solutionText {
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
  font-family: "Blackadder";
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

.dropbtn {
  background-color: transparent;
  font-family: "Blackadder";
  letter-spacing: 0px;
  color: darkred;
  /* padding: 5px 10px 3px 3px; */
  /* font-size: 3vh; */
  border: none;
  /* cursor: pointer; */
  /* border-radius: 30px; */
  /* margin: 0px 82px; */
}

.dropbtn:hover, .dropbtn:focus {
  background-color: none;
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
  width: 130px;
}

.dropdown-content {
  color: Gold;
  font-size: 2vh;
  /* display: none; */
  position: absolute;
  background-color: none;
  min-width: 130px;
  overflow: auto;
  border: 0px solid #ddd;
  z-index: 1;
  overflow-y: auto;
  height: 60px;
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
