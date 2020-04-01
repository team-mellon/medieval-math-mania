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
      <!-- <Scaling /> -->
      <!-- <Gui /> -->
    <!-- </div> -->

  </div>
</template>

<script>

import UserInterface from './UserInterface.vue';

import InputHandler from '../classes/InputHandler.js';
import MobileHandler from '../classes/MobileHandler.js';
import MusicHandler from '../classes/MusicHandler.js';
import AssetHandler from '../classes/AssetHandler.js';

import StatService from '../StatService.js';
import LoginService from '../LoginService.js';

// Game Data
import { sceneData, indicatorCoordinates, levelDescripters } from '../game_data/scenes.js';
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

    this.containerFrame = {};

    this.input = new InputHandler();
    this.mobile = new MobileHandler();
    this.music = new MusicHandler();
    this.assets = new AssetHandler();

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

    // Animation
    this.frame_counter = 0;
    this.waiting_hit = false;
    this.waiting_miss = false;
    this.hide_knight = false;
    this.hide_archer1 = false;
    this.hide_archer2 = false;
    this.hide_archer3 = false;
    this.hide_archer4 = false;

    // Gameplay
    this.entry_is_correct;
    this.hit = false;
    this.miss_upper = false;
    this.miss_lower = false;
    this.upper = 101010101;
    this.lower = 101010101;
    this.generated = false;

    this.fired = false;
    this.fire_counter = 0;
    this.hit_counter = 0;
    this.miss_upper_counter = 0;
    this.miss_lower_counter = 0;
    this.h_counter = 0;
    this.u_counter = 0;
    this.l_counter = 0;
    this.reload = false;
    this.reload_counter = 0;
    this.projectile_speed = 57;
    this.projectile_x_speed = 0;

    this.boss_fight = false;
    this.play_tutorial = true;

    // var landscape_warning;

    this.storage = 0;
    this.factor = 0;
    this.multiple = 0;
    this.multiplier = 0;
    this.digit = 2;
    this.last_digit = 0;
    this.adder = 1;

    this.multiplicand = 0;
    this.sign = " x "; //&#37
    this.equal = " = ";
    this.solution = 0;

    this.history_list = [];

    this.valid = true;

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

    this.scene_margin_X = 0.0;

    this.added = false;

    ////////////
    // SCENES //
    ////////////

    this.current_scene = 0;
    this.last_scene = 0;

    this.num_scenes = 10;

    this.scenes = [

      { // Login
        custom:   function() {

          	//putting this here because I dont know how else to initialize this as hidden
          	progressBar.hidden = true;
          	progressBackground.hidden = true;
          	ldBg.hidden = true;

          	//registers Menu sounds
          	createjs.Sound.registerSound("res/sound_effects/menu.wav", "menu");
          	createjs.Sound.registerSound("res/sound_effects/select.wav", "select");
          	createjs.Sound.registerSound("res/sound_effects/sword.wav", "sword");

            // Creates username display label and input box
            var username_text = document.createTextNode("Username");
            var username_input = document.createElement("input");
            username_input.id = "usernameInput";
            username_input.setAttribute("type", "text");
            username_input.setAttribute("name", "uname");

            // Creates username div to hold display text and input box
            var login_username_div = document.createElement("div");
            login_username_div.className = "login";
            login_username_div.appendChild(username_text);
            // Creates line break for form div spacing
            login_username_div.appendChild(document.createElement("br"));
            login_username_div.appendChild(username_input);

            // Creates password display label and input box
            var password_text = document.createTextNode("Password");
            var password_input = document.createElement("input");
            password_input.id = "passwordInput";
            password_input.setAttribute("type", "password");
            password_input.setAttribute("name", "pass");

            // Creates password div to hold display text and input box
            var login_password_div = document.createElement("div");
            login_password_div.className = "login";
            login_password_div.appendChild(password_text);
            // Creates line break for form div spacing
            login_password_div.appendChild(document.createElement("br"));
            login_password_div.appendChild(password_input);

            // Creates password display text and input box
            var error_text = document.createTextNode("");

            var error_div = document.createElement("div");
            error_div.id = "errorText";
            error_div.appendChild(error_text);

            // Creates login form to hold username and password divs
            var login_form = document.createElement("form");
            login_form.id = "loginForm";
            login_form.className = "scrollMenu";
            login_form.appendChild(login_username_div);
            // Creates line break for form div spacing
            login_form.appendChild(document.createElement("br"));
            login_form.appendChild(login_password_div);
            // Creates line break for form div spacing
            login_form.appendChild(document.createElement("br"));
            login_form.appendChild(error_div);

            // Injecting login form into existing html
            var scene_html = document.getElementById("sceneHTML");
            scene_html.appendChild(login_form);

          }.bind(this)
      },

      { // Signup
        custom:   function() {
            // Creates firstname display label and input box
            var firstname_text = document.createTextNode("Firstname:");
            var firstname_input = document.createElement("input");
            firstname_input.id = "firstnameInput";
            firstname_input.setAttribute("type", "text");
            firstname_input.setAttribute("name", "fname");

            // Creates firstname div to hold display text and input box
            var signup_firstname_div = document.createElement("div");
            signup_firstname_div.className = "signup";
            signup_firstname_div.appendChild(firstname_text);
            signup_firstname_div.appendChild(firstname_input);

            // Creates lastname display text and input box
            var lastname_text = document.createTextNode("Lastname:");
            var lastname_input = document.createElement("input");
            lastname_input.id = "lastnameInput";
            lastname_input.setAttribute("type", "text");
            lastname_input.setAttribute("name", "lname");

            // Creates lastname div to hold display text and input box
            var signup_lastname_div = document.createElement("div");
            signup_lastname_div.className = "signup";
            signup_lastname_div.appendChild(lastname_text);
            signup_lastname_div.appendChild(lastname_input);

            // Creates line break for form div spacing
            var br1 = document.createElement("br");

            // Creates username display text and input box
            var username_text = document.createTextNode("Username:");
            var username_input = document.createElement("input");
            username_input.id = "usernameInput";
            username_input.setAttribute("type", "text");
            username_input.setAttribute("name", "uname");

            // Creates username div to hold display text and input box
            var signup_username_div = document.createElement("div");
            signup_username_div.className = "signup";
            signup_username_div.appendChild(username_text);
            signup_username_div.appendChild(username_input);

            // Creates line break for form div spacing
            var br2 = document.createElement("br");

            // Creates password display text and input box
            var password_text = document.createTextNode("Password:");
            var password_input = document.createElement("input");
            password_input.id = "passwordInput";
            password_input.setAttribute("type", "password");
            password_input.setAttribute("name", "pass");

            // Creates password div to hold display text and input box
            var signup_password_div = document.createElement("div");
            signup_password_div.className = "signup";
            signup_password_div.appendChild(password_text);
            signup_password_div.appendChild(password_input);

            // Creates confirm display text and input box
            var confirm_text = document.createTextNode("Confirm:");
            var confirm_input = document.createElement("input");
            confirm_input.id = "confirmInput";
            confirm_input.setAttribute("type", "password");
            confirm_input.setAttribute("name", "confirm");

            // Creates confirm div to hold display text and input box
            var signup_confirm_div = document.createElement("div");
            signup_confirm_div.className = "signup";
            signup_confirm_div.appendChild(confirm_text);
            signup_confirm_div.appendChild(confirm_input);

            // Creates line break for form div spacing
            var br3 = document.createElement("br");

            // Creates password display text and input box
            var error_text = document.createTextNode("");

            var error_div = document.createElement("div");
            error_div.id = "errorText";
            error_div.appendChild(error_text);

            // Creates signup form to hold firstname, lastname, username, password and confirm divs
            var signup_form = document.createElement("form");
            signup_form.id = "signupForm";
            signup_form.className = "scrollMenu";
            signup_form.appendChild(signup_firstname_div);
            signup_form.appendChild(signup_lastname_div);
            signup_form.appendChild(br1);
            signup_form.appendChild(signup_username_div);
            signup_form.appendChild(br2);
            signup_form.appendChild(signup_password_div);
            signup_form.appendChild(signup_confirm_div);
            signup_form.appendChild(br3);
            signup_form.appendChild(error_div);

            //Injecting signup form into existing html
            var scene_html = document.getElementById("sceneHTML");
            scene_html.appendChild(signup_form);

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
          var multiplicand_text = document.createTextNode(this.multiplicand);
          multiplicand_div.appendChild(multiplicand_text);
          var sign_text = document.createTextNode(this.sign);
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

          var equal_text = document.createTextNode(this.equal);
          var solution_div = document.createElement("div");
          solution_div.id = "solutionText";
          var solution_text = document.createTextNode(this.solution);
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

          for (var x in this.history_list) {
            var history_entry = document.createTextNode(this.history_list[x]);
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
        	if (this.play_tutorial) {
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

        	if (this.play_tutorial) {
        		scene_html.appendChild(tutorial_div);
          }

          this.createLevel();
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
          if (this.boss_fight) {
            time_input.checked = true;
          } else {
            time_input.checked = false;
          }
          time_input.addEventListener('change', this.setBoss);

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
        	if (this.play_tutorial) {
        	  tutorial_input.checked = true;
        	} else {
        	  tutorial_input.checked = false;
        	}
        	tutorial_input.addEventListener('change', this.setTutorial);

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

    this.current_level = 1;

    this.levels = [

      { // City
        // Exactly one multiple of multiplicand in range, single digit multiplicand
        math: function () {
          this.multiplicand = Math.floor(Math.random() * 7) + 2;
          this.multiple = Math.floor(Math.random() * 7) + 2;
          this.lower = (this.multiple * this.multiplicand) - Math.floor(this.multiplicand/2);
          this.upper = (this.multiple * this.multiplicand) + Math.floor(this.multiplicand/2);
        }.bind(this),
        open: function () {
          this.indicatorFunction(1);
        }
      },

      { // Grasslands
        // No multiples of multiplicand in range, single digit multiplicand
        math: function () {
          this.multiplicand = Math.floor(Math.random() * 7) + 2;
          this.multiple = Math.floor(Math.random() * 7) + 2;
          this.lower = (this.multiple * this.multiplicand) + 1;
          this.upper = (this.multiple * (this.multiplicand+1)) - 1;
        }.bind(this),
        open: function () {
          this.indicatorFunction(2);
        }
      },

      { // Volcano
        // Starting number is a two-digit number, target range includes the value which is one tenth of the number, and is bounded by positive single-digit integers.
        math: function () {
          this.multiplicand = Math.floor(Math.random() * 90)+ 10;
          this.factor = (0.1) * this.multiplicand;
          this.lower = Math.floor(this.factor);
          this.upper = Math.ceil(this.factor);
          if(this.lower == this.upper) {
            this.upper++;
          }
        }.bind(this),
        open: function () {
          this.indicatorFunction(3);
        }
      },

      { // Sea
        // Starting number is a two-digit number, target range goes from 0 to a single-digit positive integer.
        math: function () {
          this.multiplicand = Math.floor(Math.random() * 90) + 10;
          this.lower = 0;
          this.upper = Math.floor(Math.random() * 7) + 2;
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
          this.multiplicand = Math.floor(Math.random() * 7) + 2;
          this.multiple = Math.floor(Math.random() * 7) + 2;
          this.storage = this.multiplicand * this.multiple * 10;
          this.lower = this.storage - 10;
          this.upper = this.storage + 10;
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
      		this.multiplicand = Math.floor(Math.random() * 7) + 2;
      		this.multiple = 100 * this.multiplicand;
      		this.lower = this.multiple - Math.floor(this.multiplicand/2);
      		this.upper = this.multiple + Math.floor(this.multiplicand/2);
        }.bind(this),
        open: function () {
          this.indicatorFunction(6);
        }
      },

      { // Cave
        //Starting number is a two-digit number, target range contains 0 (flanked by single-digit integers)
        math: function () {
      		this.multiplicand = Math.floor(Math.random() * 90) + 10;
      		this.lower = -Math.abs(Math.floor(Math.random() * 7) + 2);
      		this.upper = Math.floor(Math.random() * 7) + 2;
        }.bind(this),
        open: function () {
          this.indicatorFunction(7);
        }
      },

      { // Forest
        //Starting number is a two-digit number, target range numbers are both 3-digit, with no integer
        math: function () {
      		this.multiplicand = Math.round((Math.random() * 90)) + 10;
      		this.lower = (Math.round((Math.random() * 90)+ 10 * 11) / 10);
      		if(this.lower % 1 == 0)
      		{
      			this.lower += 0.7;
      		}
      		this.upper = Math.round((this.lower * this.lower/8)*10 + this.lower/2) / 10;
      		if(this.upper % 1 == 0)
      		{
      			this.upper += 0.4;
      		}
        }.bind(this),
        open: function () {
          this.indicatorFunction(8);
        }
      },

      { // Alpine
        //Starting number is a three-digit number, target range goes from 0 to a single-digit positive integer.
        math: function () {
      		this.multiplicand = Math.floor((Math.random() * 900) + 100);
      		this.lower = 0;
      		this.upper = Math.floor(Math.random() * 7) + 2;
        }.bind(this),
        open: function () {
          this.indicatorFunction(9);
        }
      },

      { // Woods
        /*Starting number is a number between 0 and .1 with three decimal places. Lower bound of target
      	range is 1000 times the starting number, and upper bound is one more than the lower bound. */
        math: function () {
      		this.multiplicand = Math.floor((Math.random() * 990) + 10) / 1000;
      		this.lower = 1000 * this.multiplicand;
      		this.upper = this.lower + 1;
        }.bind(this),
        open: function () {
          this.indicatorFunction(10);
        }
      },

      { // Swamp
        /*Starting number is a number between 10 and 100 with one decimal place. Lower bound of target
      	range is 1000 times the starting number, and upper bound is one more than the lower bound.*/
        math: function () {
      		this.multiplicand = Math.floor(Math.random() * 90 * 10 + 10) / 10;
      		this.lower = 1000 * this.multiplicand;
      		this.upper = this.lower + 1;
        }.bind(this),
        open: function () {
          this.indicatorFunction(11);
        }
      },

      { // Deadlands
        /*Starting number is a whole number greater than 1,000,000. Target range contains the number which is .0001 times the size of the starting number.
      	The lower bound may be up to 50 less than this value and the upper bound may be up to 50 greater than this value.*/
        math: function () {
      		this.multiplicand = Math.floor(Math.random() * 10000000);
      		this.lower = (Math.floor(this.multiplicand * 0.0001)) - (Math.floor(Math.random() * 50) + 10);
      		this.upper = (Math.floor(this.multiplicand * 0.0001)) + (Math.floor(Math.random() * 50) + 10);
        }.bind(this),
        open: function () {
          this.indicatorFunction(12);
        }
      },

      { // Sky
        /*Starting number is an integer less than 200. Target range contains the number which is half the value
      	with an overall range less than 10. */
        math: function () {
      		this.multiplicand = Math.floor(Math.random() * 100 + 100);
      		this.lower = Math.floor(this.multiplicand / 2) - 4;
      		this.upper = Math.floor(this.multiplicand / 2) + 4;
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
      		this.multiplicand = Math.floor(Math.random() * 90 + 9) / 10;
      		this.lower = Math.floor(Math.random() * 900 + 100);
      		this.upper = this.lower + 1;
        }.bind(this),
        open: function () {
          this.indicatorFunction(14);
        }
      },

      { // Fungi
        /*Starting number is a negative single-digit integer. Target range contains only positive values, one of
      	which is a multiple of the starting number.*/
        math: function ()  {
      		this.multiplicand = -Math.abs(Math.floor(Math.random() * 7) + 2);
      		this.lower = this.multiplicand * this.multiplicand;
      		this.upper = this.lower + (Math.floor(Math.random() * 7) + 2);
        }.bind(this),
        open: function () {
          this.indicatorFunction(15);
        }
      },

      { // Tundra
        /*Starting number is a positive two-digit integer. Target range is bounded by two-digit negative integers
        5 away from each other.*/
        math: function () {
          this.multiplicand = Math.floor(Math.random() * 90 + 9);
          this.lower = -Math.abs(Math.floor(Math.random() * 84) + 15);
          this.upper = this.lower + 5;
        }.bind(this),
        open: function () {
          this.indicatorFunction(16);
        }
      },

      { // Tarpit
        /*Starting number is a number between -100 and -10 with one decimal place. Target range bounds are
        any two integers between -20 and 0.*/
        math: function () {
          this.multiplicand = -Math.abs(Math.floor(Math.random() * 90) + 10);
          this.lower = -Math.abs(Math.floor(Math.random() * 10) + 10);
          this.upper = -Math.abs(Math.floor(Math.random() * 10));
        }.bind(this),
        open: function () {
          this.indicatorFunction(17);
        }
      },

      { // Desert
        /*Starting number is a number between -100 and -10 with one decimal place. Target range bounds are
        any two integers between 0 and 20. */
        math: function () {
          this.multiplicand = -Math.abs(Math.floor(Math.random() * 90 * 10 + 10) / 10);
          this.lower = Math.floor(Math.random() * 10);
          this.upper = Math.floor(Math.random() * 10 + 10);
        }.bind(this),
        open: function () {
          this.indicatorFunction(18);
        }
      },

      { // Boreal
        /*Starting number is an integer between -100 and -10 with one decimal place. Target range bounds are
        positive numbers between 0 and 1 with two decimal places that are one hundredth apart. */
        math: function () {
          this.multiplicand = -Math.abs(Math.floor(Math.random() * 90 * 10 + 10) / 10);
          this.lower = Math.floor((Math.random() * 90) + 9) / 100;
          this.upper = Math.floor((this.lower + 0.01)* 100)/100;
        }.bind(this),
        open: function () {
          this.indicatorFunction(19);
        }
      },

      { // Monolith
        /*Starting number is any positive three digit integer. Target range is bounded by two numbers between
        -10 and -5, with three decimal places, and within one hundredth of each other. */
        math: function () {
          this.multiplicand = Math.floor(Math.random() * 900) + 100;
          this.lower = -Math.abs((Math.floor(Math.random() * 10000) + 5000) /1000);
          this.upper = this.lower + 0.01;
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
    this.bg = new createjs.Shape();                             // Create a rectangle for clearing the screen
    this.bg_color = "#333333";                                  // Background color
    this.stage.addChild(this.bg);                               // Add rectangle to the stage

    this.music.loadSound();                                     // Load sounds from file
    console.log(this.music.playlist);

    this.createScene();                                         // Create scene assets

    this.landscape_warning = new createjs.Shape();

    this.phone_rotation = this.assets.createSprite(this.phone_rotationS, 288, 288, "center", 0, "center", 0, "image", this.ecs, this.stage);
    this.stage.removeChild(this.phone_rotation);

    createjs.Ticker.setFPS(60);                                 // Set FPS (could be depricated?)
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
      this.scene_scale_X = this.stage.canvas.width / this.max_scale_X;
      this.scene_scale_Y = this.stage.canvas.width / this.max_scale_X;
      // this.scene_scale_X = ( this.max_scale_Y - ( this.max_scale_Y - this.stage.canvas.height ) ) / this.max_scale_Y;
      // this.scene_scale_Y = ( this.max_scale_Y - ( this.max_scale_Y - this.stage.canvas.height ) ) / this.max_scale_Y;

      // Calculate the scene margin in a given direction
      this.scene_margin_X = ( this.stage.canvas.width - this.max_scale_X ) / 2;

      // Log screen scaling for debugging purposes
      console.log(this.scene_scale_X);
      console.log(this.scene_scale_Y);

      this.landscape_warning.graphics.clear()
      this.landscape_warning.graphics.beginFill("#000000").drawRect(0, 0, this.stage.canvas.width, this.stage.canvas.height);

      if (this.current_scene == 3) {
        this.assets.scaleAssets(this.lcs, this.current_scene, this.mobile.isMobile, this.scene_scale_Y, this.scene_scale_X, this.stage); // Scale scene appropriately
      } // else {
        this.assets.scaleAssets(this.ecs, this.current_scene, this.mobile.isMobile, this.scene_scale_Y, this.scene_scale_X, this.stage); // Scale scene appropriately
      // }
      // this.scaleAssets(this.gcs, this.current_scene, this.mobile.isMobile, this.scene_scale_Y, this.scene_scale_X, this.stage); // Scale scene appropriately

      this.stage.update()

    },

    // Scale the image-like assets
    scale_to_canvas: function(image, x_lock, x_location, y_lock, y_location, type) {

      var x_start = stage.canvas.width / 2;
      var y_start = stage.canvas.height / 2;

      image.scaleX = scene_scale_X;
      image.scaleY = scene_scale_Y;

      if (mobile) {

        switch (type) {

          case "image":
            break;

          case "gui":
            image.scale = 1.0;
            break;

          case "smallgui":
            image.scale = 0.5;
            break;
        }

      }

      switch (x_lock) {

        case "left":
          var x_start = 0;
          break;

        case "center":
          var x_start = stage.canvas.width / 2;
          break;

        case "right":
          var x_start = stage.canvas.width;
          break;

      }

      switch (y_lock) {

        case "top":
          var y_start = 0;
          break;

        case "center":
          var y_start = stage.canvas.height / 2;
          break;

        case "bottom":
          var y_start = stage.canvas.height;
          break;

      }

      image.x = x_start + x_location;
      image.y = y_start + y_location;

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

      if (this.current_scene == 3 && this.pause_menu.visible == false) {

        // If the range is not generated
      	if(!this.generated) {

          // Generate the range
      		this.levels[this.current_level - 1].math();

          this.clearMultiplicandBanner();

          this.remakeMultiplierBanner();
          this.remakeRangeBanner();

      		this.generated = true;

      	}

        // Key checks at the beginning of the update loop
        // Spacebar to randomize the range
        // if (keys[32]){
          // randomizeRangeAndMultiplier();
        // }

        // console.log(this.input.drag_up);

        // Enter or swipe up to check input
        if ((this.input.keys[13] || this.input.drag_up) && this.catapult.paused) { // Enter or drag up swipe on mobile
          console.log("Enter Pressed");
          this.runInput();
        }

        // If on mobile
        if (this.mobile.isMobile) {
          // Check which digit is selected and highlight it
          this.checkSelectedDigit();
        }

        // Run through and finish animations that play once
        this.updateSinglePlayAnimations();

        // Check for hit and miss and then run thier animations
        this.runHitAnimations();
        this.runMissAnimations();

        // Check to see if the tutorial should be displayed
        this.checkTutorial();

        //If game over
        if (this.hit_counter >= 3 && this.miss_upper_counter >= 1 && this.miss_lower_counter >= 1 && this.reload == false) {
          // Show the endgame screen
          this.createVictoryBanner();
          // Also maybe check if boss level is active
          // checkBossFight();
        }

        // Hide bad guys when hit
        this.hideBadGuys();

        // Run the catapult animation
        this.runCatapultAnimation();

        // Reload the catapult
        this.reloadCatapult()

      }

      // Update frame counter for drawing
      // frame_counter++;

      // if (frame_counter > 9) {
        //
        // reload_counter += frame_counter;
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

          this.loadLevel();

      }

      // Destroy the last scene
      this.destroyScene();

      // Create the new scene
      this.createScene();

      // this.visibleForm(true);

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

      this.background = this.assets.createImage(sceneData[this.current_scene].bg_img, this.backgroundX, 1440, "center", 0, "center", 0, "image", this.ecs, this.stage);
      this.background_left = this.assets.createImage(sceneData[this.current_scene].bg_img, this.backgroundX, 1440, "center", -this.backgroundX, "center", 0, "image", this.ecs, this.stage);
      this.background_right = this.assets.createImage(sceneData[this.current_scene].bg_img, this.backgroundX, 1440, "center", this.backgroundX, "center", 0, "image", this.ecs, this.stage);

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
          sceneData[this.current_scene].fg_text = levelData[this.current_level - 1].hint;
          break;
        default:

      }

      if (this.current_scene != 8 && this.current_scene != 2 && this.current_scene != 3) {
        this.foreground = this.assets.createTextContainer(sceneData[this.current_scene].fg_img, sceneData[this.current_scene].fg_text, "Oldstyle", "32px", "normal", "Saddlebrown", sceneData[this.current_scene].fg_img.frames.width, sceneData[this.current_scene].fg_img.frames.height, "center", 0, "center", 0, "image", 0, this.ecs, this.stage);
      }

      if (this.current_scene == 2) {
        this.background = this.assets.createImage("res/menu.png", this.backgroundX, this.backgroundY, "center", 0, "bottom", -this.backgroundY / 2, "image", this.ecs, this.stage);
        this.background_left = this.assets.createImage("res/menu-left.png", this.backgroundX, this.backgroundY, "center", 0 - (this.backgroundX), "bottom", -this.backgroundY / 2, "image", this.ecs, this.stage);
        this.background_right = this.assets.createImage("res/menu-right.png", this.backgroundX, this.backgroundY, "center", 0 + (this.backgroundX), "bottom", -this.backgroundY / 2, "image", this.ecs, this.stage);
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

        this.pauseAnimation(true);
        this.visibleButton(true);
        this.visibleForm(false);

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

      this.generated = false;
      createjs.Sound.play("select");
      this.current_level = newL;
      this.resetLevel();
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

    			this.left_sword_button = this.assets.createButton("res/sword-left.png", "Login", this.buttonX, this.buttonY, "center", -(this.buttonX/2 + 30), "center", (this.buttonY/2 + 200), "image", function() {
    				createjs.Sound.play("sword");
    				var key = document.getElementById('usernameInput').value;
            var text = {
              "uname": document.getElementById('usernameInput').value,
              "pass": document.getElementById('passwordInput').value
            };
            this.verifyUser(text);
    			}.bind(this), this.ecs, this.stage);

    			this.right_sword_button = this.assets.createButton("res/sword-right.png", "Signup", this.buttonX, this.buttonY, "center", (this.buttonX/2 + 65), "center", (this.buttonY/2 + 200), "image", function() {
    				createjs.Sound.play("sword");
            this.changeScene(1);
    			}.bind(this), this.ecs, this.stage);

    			this.secret_button = this.assets.createButton("res/secret_button.png", "", this.backgroundX, 1440, "center", 0, "center", 0, "image", function() {
    				createjs.Sound.play("sword");
            this.changeScene(8);
    			}.bind(this), this.ecs, this.stage);

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

    			this.left_sword_button = this.assets.createButton("res/sword-left.png", "Signup", this.buttonX, this.buttonY, "center", -(this.buttonX/2 + 30), "center", (this.buttonY/2 + 200), "image", function() {
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

    		this.right_sword_button = this.assets.createButton("res/sword-right.png", "Cancel", this.buttonX, this.buttonY, "center", (this.buttonX/2 + 65), "center", (this.buttonY/2 + 200), "image", function() {
    			// fieldInput_error.alpha = 0; // password_error.alpha = 0; // message.render = 0;
    			createjs.Sound.play("sword");
    			this.changeScene(0);
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

    			this.play_button = this.assets.createButton("res/menu-button.png", "Play", this.buttonX, this.buttonY, "center", 0, "center", 0 - 200, "gui", function() { createjs.Sound.play("menu"); this.changeScene(8); }.bind(this), this.ecs, this.stage);
    			this.stats_button = this.assets.createButton("res/menu-button.png", "Stats", this.buttonX, this.buttonY, "center", 0, "center", 0 - 100, "gui", function() { createjs.Sound.play("menu"); this.changeScene(4); this.getUserData(this.user.username); }.bind(this), this.ecs, this.stage);
    			this.h2p_button = this.assets.createButton("res/menu-button.png", "How To Play", this.buttonX, this.buttonY, "center", 0, "center", 0 - 0, "gui", function() { createjs.Sound.play("menu"); this.changeScene(5); }.bind(this), this.ecs, this.stage);
    			this.settings_button = this.assets.createButton("res/menu-button.png", "Settings", this.buttonX, this.buttonY, "center", 0, "center", 0 + 100, "gui", function() { createjs.Sound.play("menu"); this.changeScene(6); }.bind(this), this.ecs, this.stage);
    			this.logout_button = this.assets.createButton("res/menu-button.png", "Logout", this.buttonX, this.buttonY, "left", (this.buttonX/2 + 10), "top", (this.buttonY/2 + 10), "gui", function() { createjs.Sound.play("menu"); this.user.authenticated = false; this.changeScene(0); this.signoutUser(); }.bind(this), this.ecs, this.stage);
    			this.account_button = this.assets.createButton("res/menu-button.png", "Account", this.buttonX, this.buttonY, "right", 0 - (this.buttonX/2 + 10), "top", (this.buttonY/2 + 10), "gui", function() { createjs.Sound.play("menu"); this.changeScene(7); this.getUserData(this.user.username); }.bind(this), this.ecs, this.stage);

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

    	    this.end_level_scene = this.assets.createImage("res/login_scroll.png", this.backgroundX, this.backgroundY, "center", 0, "center", 0, "image", this.ecs, this.stage);
    	    this.end_level_scene.visible = false;

    	    this.end_level_button = this.assets.createButton("res/login-button.png", "Next Level", this.buttonX, this.buttonY, "center", 0, "center", 0 + 250, "gui", function() { createjs.Sound.play("select"); this.changeScene(8); this.visibleForm(true);}.bind(this), this.ecs, this.stage);
    	    this.end_level_button.visible = false;
    	    this.end_level_button.alpha = 0;

	    var sting = this.victoryGenerator();  // temp fix for sending victory string to function

    	    this.end_text = this.assets.createText(sting, "Oldstyle", "65px", "bold", "gold", 10, 10, "center", 0, "center", 0 - 140, "image", this.ecs, this.stage);
    	    this.end_text.visible = false;
    	    //end_text.skewX = -5;
    	    this.end_text.skewY = -15;
    	    this.end_text.textAlign = "center";

    	    this.hit_text = this.assets.createText("Total Hits:      ", "Oldstyle", "25px", "", "gold", 10, 10, "center", 0 - 120, "center", 0, "image", this.ecs, this.stage);
    	    this.hit_text.visible = false;
    	    this.hit_text.alpha = 0;

    	    this.low_text = this.assets.createText("Total Lows:     ", "Oldstyle", "25px", "", "gold", 10, 10, "center", 0 - 120, "center", 0 + 40, "image", this.ecs, this.stage);
    	    this.low_text.visible = false;
    	    this.low_text.alpha = 0;

    	    this.high_text = this.assets.createText("Total Highs:    ", "Oldstyle", "25px", "", "gold", 10, 10, "center", 0 - 120, "center", 0 + 80, "image", this.ecs, this.stage);
    	    this.high_text.visible = false;
    	    this.high_text.alpha = 0;

    	    this.pause_menu = this.assets.createImage("res/hit-target-pause-menu.png", this.backgroundX, this.backgroundY, "center", 0, "center", 0, "image", this.ecs, this.stage);
    	    this.pause_menu.visible = false;

    	    this.close_button = this.assets.createButton("res/hit-target-pause-close-button.png", "", this.buttonX, this.buttonY, "center", 0 + 445, "center", 0 - 281, "gui", function() {
    				createjs.Sound.play("menu");
    				this.pauseAnimation(false);
    				this.visibleButton(false);
    				this.visibleForm(true);
    	    }.bind(this), this.ecs, this.stage);

    	    this.close_button.visible = false;

    	    this.main_menu_button = this.assets.createButton("res/hit-target-pause-button.png", "Main Menu", this.buttonX, this.buttonY, "center", 0, "center", 0 - 180, "gui", function() { createjs.Sound.play("menu"); this.changeScene(2); this.visibleForm(true);}.bind(this), this.ecs, this.stage);
    	    this.main_menu_button.visible = false;

    	    this.exit_level_button = this.assets.createButton("res/hit-target-pause-button.png", "Exit Level", this.buttonX, this.buttonY, "center", 0, "center", 0 - 110, "gui", function() { createjs.Sound.play("menu"); this.changeScene(8); this.visibleForm(true);}.bind(this), this.ecs, this.stage);
    	    this.exit_level_button.visible = false;

    	    this.settings_button = this.assets.createButton("res/hit-target-pause-button.png", "Settings", this.buttonX, this.buttonY, "center", 0, "center", 0 - 40, "gui", function() { createjs.Sound.play("menu"); this.changeScene(6); this.visibleForm(true);}.bind(this), this.ecs, this.stage);
    	    this.settings_button.visible = false;

    	    this.menu_button = this.assets.createButton("res/login-button.png", "Pause", this.buttonX, this.buttonY, "right", -(this.buttonX/2 + 10), "bottom", -(this.buttonY/2 + 10), "gui", function() {
    				createjs.Sound.play("menu");
    				this.pauseAnimation(true);
    				this.visibleButton(true);
    				this.visibleForm(false);
    	    }.bind(this), this.ecs, this.stage);

    	    this.hint_button = this.assets.createButton("res/hint-button.png", "Hint", 72, 72, "center", 0 - 313, "center", 0 + 194, "gui", function() { createjs.Sound.play("sword"); this.changeScene(9); this.visibleForm(true); }.bind(this), this.ecs, this.stage);
    	    this.hint_button.visible = false;

    			if (this.mobile.isMobile) {

    				this.ll_number_button = this.assets.createButton("res/number-button-ll.png", "", this.backgroundX, 288, "center", 0, "bottom", 0 - (288/2), "image", function() {
    					if(this.digit > 0)
    						this.digit--;
    					if(this.digit < 0)
    						this.digit = 0;
    					console.log(this.digit);
    				}.bind(this), this.ecs, this.stage);

    				this.lr_number_button = this.assets.createButton("res/number-button-lr.png", "", this.backgroundX, 288, "center", 0, "bottom", 0 - (288/2), "image", function() {
    					if(this.digit < 2)
    						this.digit++;
    					if(this.digit > 2)
    						this.digit = 2;
    					console.log(digit);
    				}.bind(this), this.ecs, this.stage);

    				this.rl_number_button = this.assets.createButton("res/number-button-rl.png", "", this.backgroundX, 288, "center", 0, "bottom", 0 - (288/2), "image", function() {
    					this.multiplier -= this.adder;
    					document.getElementById("hundredsPlace").textContent = Math.floor(this.multiplier/100 % 10);
    					document.getElementById("tensPlace").textContent = Math.abs(Math.floor(this.multiplier/10 % 10));
    					document.getElementById("onesPlace").textContent = Math.abs(Math.floor(this.multiplier % 10));
    				}.bind(this), this.ecs, this.stage);

    				this.rr_number_button = this.assets.createButton("res/number-button-rr.png", "", this.backgroundX, 288, "center", 0, "bottom", 0 - (288/2), "image", function() {
    					this.multiplier += this.adder;
    					document.getElementById("hundredsPlace").textContent = Math.floor(this.multiplier/100 % 10);
    					document.getElementById("tensPlace").textContent = Math.abs(Math.floor(this.multiplier/10 % 10));
    					document.getElementById("onesPlace").textContent = Math.abs(Math.floor(this.multiplier % 10));
    				}.bind(this), this.ecs, this.stage);

    			}

    			break;

    		case 4:

    			this.menu_button = this.assets.createButton("res/login-button.png", "Menu", this.buttonX, this.buttonY, "left", (this.buttonX/2 + 10), "bottom", -(this.buttonY/2 + 10), "gui", function() { createjs.Sound.play("menu"); this.changeScene(2); }.bind(this), this.ecs, this.stage);

    			break;

    		case 5:

    			this.menu_button = this.assets.createButton("res/login-button.png", "Menu", this.buttonX, this.buttonY, "left", (this.buttonX/2 + 10), "bottom", -(this.buttonY/2 + 10), "gui", function() { createjs.Sound.play("menu"); this.changeScene(2); }.bind(this), this.ecs, this.stage);

    			break;

    		case 6:

    			this.menu_button = this.assets.createButton("res/login-button.png", "Menu", this.buttonX, this.buttonY, "left", (this.buttonX/2 + 10), "bottom", -(this.buttonY/2 + 10), "gui", function() { createjs.Sound.play("menu"); this.oneWayScene(); }.bind(this), this.ecs, this.stage);

    			break;

    		case 7:

    			this.menu_button = this.assets.createButton("res/login-button.png", "Menu", this.buttonX, this.buttonY, "left", (this.buttonX/2 + 10), "bottom", -(this.buttonY/2 + 10), "gui", function() { createjs.Sound.play("menu"); this.changeScene(2); }.bind(this), this.ecs, this.stage);

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

    			this.midground = this.assets.createImage("res/map.png", this.backgroundX, this.backgroundY, "center", 0, "center", 0, "image", this.ecs, this.stage);
    			this.foreground = this.assets.createButton("res/map-banner.png", "Select a level", this.backgroundX, 108, "center", 0, "top", 0 + (108/2), "image", function() {}.bind(this), this.ecs, this.stage);

    			var reef = this.assets.createSprite(reefS, 120, 108, "center", -480 + 120 / 2, "center", 96 + 108 / 2, "image", this.ecs, this.stage);
    			reef.gotoAndPlay(0);

    			var skyland = this.assets.createSprite(skylandS, 180, 120, "center", -243 + 180 / 2, "center", -246 + 120 / 2, "image", this.ecs, this.stage);
    			skyland.gotoAndPlay(0);

    			this.menu_button = this.assets.createButton("res/login-button.png", "Menu", this.buttonX, this.buttonY, "left", (this.buttonX/2 + 10), "bottom", -(this.buttonY/2 + 10), "gui", function() { createjs.Sound.play("menu"); this.changeScene(2); }.bind(this), this.ecs, this.stage);

    			for (var i = 0; i < this.num_levels; i++) {

    				var temp = this.assets.createButton("res/map-indicator.png", (i + 1).toString(), 48, 48, "center", indicatorCoordinates[i].x/* + 48/2*/, "center", indicatorCoordinates[i].y/* + 48/2*/, "gui", this.levels[i].open.bind(this), this.ecs, this.stage);
				temp.on("mouseover", this.handleMouseEvent);
				temp.on("mouseout", this.handleMouseEvent);
    				this.indicators.push(temp);

    			}

			this.containerFrame = this.assets.createContainerFrame(210, 310, "center", 200, "center", 200, "gui", this.ecs, this.stage);
			this.containerFrame.visible = false;

    			break;

        case 9:

    			this.menu_button = this.assets.createButton("res/login-button.png", "Menu", this.buttonX, this.buttonY, "left", (this.buttonX/2 + 10), "bottom", -(this.buttonY/2 + 10), "gui", function() {
            createjs.Sound.play("menu");
            this.changeScene(3);
            this.pauseAnimation(true);
            this.visibleButton(true);
            this.visibleForm(false);
          }.bind(this), this.ecs, this.stage);

          break;

    		default:

    	}

    	this.previous_indicator = this.assets.createImage("res/previous-indicator.png", 24, 24, "center", 0 - 50, "center", 0 + 194, "gui", this.ecs, this.stage);
      // this.previous_indicator.addEventListener("click", previousSound);
      this.previous_indicator.visible = false;

    	this.pause_indicator = this.assets.createImage("res/pause-indicator.png", 24, 24, "center", 0, "center", 0 + 194, "gui", this.ecs, this.stage);
      // this.pause_indicator.addEventListener("click", playSound);
      this.pause_indicator.visible = false;

    	this.next_indicator = this.assets.createImage("res/next-indicator.png", 24, 24, "center", 0 + 50, "center", 0 + 194, "gui", this.ecs, this.stage);
      // this.next_indicator.addEventListener("click", nextSound);
      this.next_indicator.visible = false;

    	this.lute = this.assets.createImage("res/lute.png", 96, 96, "center", 0 + 313, "center", 0 + 194, "gui", this.ecs, this.stage);
    	// antiLute = createImage("res/antiLute.png", 96, 96, 2);
      // this.lute.addEventListener("click", muteSound);
      this.lute.visible = false;
    	// antiLute.visible = false;
    	// antiLute.hidden = true;

      this.landscape_warning = new createjs.Shape();

      this.phone_rotation = this.assets.createSprite(this.phone_rotationS, 288, 288, "center", 0, "center", 0, "image", this.ecs, this.stage);
      this.stage.removeChild(this.phone_rotation);

    },

    ////////////
    // LEVELS //
    ////////////

    loadLevel: function() {

      this.bg_color = levelData[this.current_level - 1].color;

      this.loadImage();

      this.end_level_flagS = {
        images: ["res/endgame-flag.png"],
        frames: {width:1920, height:1440, count:12, regX: 0, regY:0, spacing:0, margin:0},
        framerate: 6
      };

      this.numberlineS = {
        images: ["res/numberline.png"],
        frames: {width:1920, height:24, count:1, regX: 0, regY:0, spacing:0, margin:0},
        framerate: 6
      };

      this.bossS = {
        images: ["res/level" + this.current_level + "/boss.png"],
        frames: {width:96, height:96, count:12, regX: 0, regY:0, spacing:0, margin:0},
        framerate: 6
      };

      this.henchmanS = {
        images: ["res/level" + this.current_level + "/henchman.png"],
        frames: {width:96, height:96, count:12, regX: 0, regY:0, spacing:0, margin:0},
        framerate: 6
      };

      this.projectileS = {
        images: ["res/ammo.png"],
        frames: {width:96, height:96, count:12, regX: 0, regY:0, spacing:0, margin:0},
        framerate: 6
      };

      this.catapultS = {
        images: ["res/catapult.png"],
        frames: {width:288, height:384, count:12, regX: 0, regY:0, spacing:0, margin:0},
        framerate: 6
      };

      this.centerS = {
        images: ["res/level" + this.current_level + "/center.png"],
        frames: {width:1920, height:1440, count:12, regX: 0, regY:0, spacing:0, margin:0},
        framerate: 6
      };

      this.left_centerS = {
        images: ["res/level" + this.current_level + "/left-center.png"],
        frames: {width:1920, height:1440, count:6, regX: 0, regY:0, spacing:0, margin:0},
        framerate: 6
      };

      this.right_centerS = {
        images: ["res/level" + this.current_level + "/right-center.png"],
        frames: {width:1920, height:1440, count:6, regX: 0, regY:0, spacing:0, margin:0},
        framerate: 6
      };

      this.bannerS = {
        images: ["res/banners.png"],
        frames: {width:1920, height:768, count:1, regX: 0, regY:0, spacing:0, margin:0},
        framerate: 6
      };

      this.range_bannerS = {
        images: ["res/range-banner.png"],
        frames: {width:192, height:126, count:1, regX: 0, regY:0, spacing:0, margin:0},
        framerate: 6
      };

      this.equation_bannerS = {
        images: ["res/equation-banner.png"],
        frames: {width:300, height:78, count:1, regX: 0, regY:0, spacing:0, margin:0},
        framerate: 6
      };

      this.history_bannerS = {
        images: ["res/history-banner.png"],
        frames: {width:192, height:126, count:1, regX: 0, regY:0, spacing:0, margin:0},
        framerate: 6
      };

      this.bodyS = {
        images: ["res/level" + this.current_level + "/body.png"],
        frames: {width:1920, height:1440, count:6, regX: 0, regY:0, spacing:0, margin:0},
        framerate: 6
      };

      this.leftS = {
        images: ["res/level" + this.current_level + "/left.png"],
        frames: {width:1920, height:1440, count:6, regX: 0, regY:0, spacing:0, margin:0},
        framerate: 6
      };

      this.rightS = {
        images: ["res/level" + this.current_level + "/right.png"],
        frames: {width:1920, height:1440, count:6, regX: 0, regY:0, spacing:0, margin:0},
        framerate: 6
      };

      this.facadeS = {
        images: ["res/level" + this.current_level + "/facade.png"],
        frames: {width:1920, height:1440, count:6, regX: 0, regY:0, spacing:0, margin:0},
        framerate: 6
      };

      this.big_bossS = {
        images: ["res/level" + this.current_level + "/big-boss.png"],
        frames: {width:1920, height:768, count:1, regX: 0, regY:0, spacing:0, margin:0},
        framerate: 6
      };

      this.firework_lowS = {
        images: ["res/firework-low.png"],
        frames: {width:1920, height:768, count:12, regX: 0, regY:0, spacing:0, margin:0},
        framerate: 6
      };

      this.firework_hitS = {
        images: ["res/firework-hit.png"],
        frames: {width:1920, height:768, count:12, regX: 0, regY:0, spacing:0, margin:0},
        framerate: 6
      };

      this.firework_highS = {
        images: ["res/firework-high.png"],
        frames: {width:1920, height:768, count:12, regX: 0, regY:0, spacing:0, margin:0},
        framerate: 6
      };

      this.score_bannerS = {
        images: ["res/score-banner.png"],
        frames: {width:192, height:126, count:1, regX: 0, regY:0, spacing:0, margin:0},
        framerate: 6
      };

      this.number_text = [];
    },

    loadImage: function() {

    	this.preload = new createjs.LoadQueue();
    	this.preload.on("progress", this.loading);
      // preload.addEventListener("fileload", handleFileComplete);
    	this.preload.loadFile("res/numberline.png");
    	this.preload.loadFile("res/level" + this.current_level + "/boss.png");
    	this.preload.loadFile("res/level" + this.current_level + "/henchman.png");
    	this.preload.loadFile("res/ammo.png");
    	this.preload.loadFile("res/catapult.png");
    	this.preload.loadFile("res/level" + this.current_level + "/center.png");
    	this.preload.loadFile("res/level" + this.current_level + "/left-center.png");
    	this.preload.loadFile("res/level" + this.current_level + "/right-center.png");
    	this.preload.loadFile("res/level" + this.current_level + "/body.png");
    	this.preload.loadFile("res/level" + this.current_level + "/left.png");
    	this.preload.loadFile("res/level" + this.current_level + "/right.png");
    	this.preload.loadFile("res/level" + this.current_level + "/facade.png");
    	this.preload.loadFile("res/level" + this.current_level + "/big-boss.png");
    	//The 1 at the end on these makes it so only one instance can play at once
    	createjs.Sound.registerSound("res/sound_effects/catapult_cocking.wav", "reload");
    	createjs.Sound.registerSound("res/sound_effects/catapult_firing.wav", "firing");
    	createjs.Sound.registerSound("res/sound_effects/victory.wav", "win", 1);
    	createjs.Sound.registerSound("res/sound_effects/fire_lighting.wav", "light", 1);
    	createjs.Sound.registerSound("res/sound_effects/crumbling.wav", "crumble");

    },

    // function handleFileComplete(event) {
    //   document.body.appendChild(event.result);
    // }

    createLevel: function() {

      // Level structure in background
      this.structure_center = this.assets.createSprite(this.centerS, this.structureX, this.structureY, "center", 0, "bottom", -this.structureY / 2, "image", this.lcs, this.stage);
      this.structure_left_center = this.assets.createSprite(this.left_centerS, this.structureX, this.structureY, "center", 0, "bottom", -this.structureY / 2, "image", this.lcs, this.stage);
      this.structure_right_center = this.assets.createSprite(this.right_centerS, this.structureX, this.structureY, "center", 0, "bottom", -this.structureY / 2, "image", this.lcs, this.stage);

      // Bad guys in midground
      this.henchman_left_center = this.assets.createSprite(this.henchmanS, 96, 96, "center", 0 - (96/2 + 375), "bottom", -384, "image", this.lcs, this.stage);
      this.henchman_left_center.gotoAndPlay(0);
      this.boss = this.assets.createSprite(this.bossS, 96, 96, "center", 0, "bottom", -384, "image", this.lcs, this.stage);
      this.boss.gotoAndPlay(0);
      this.henchman_right_center = this.assets.createSprite(this.henchmanS, 96, 96, "center", 0 + (96/2 + 375), "bottom", -384, "image", this.lcs, this.stage);
      this.henchman_right_center.gotoAndPlay(0);

      // Level structure in foreground
      this.structure_left = this.assets.createSprite(this.leftS, this.structureX, this.structureY, "center", 0, "bottom", -this.structureY / 2, "image", this.lcs, this.stage);
      this.structure_right = this.assets.createSprite(this.rightS, this.structureX, this.structureY, "center", 0, "bottom", -this.structureY / 2, "image", this.lcs, this.stage);

      this.henchman_left = this.assets.createSprite(this.henchmanS, 96, 96, "center", 0 - (96/2 + 705), "bottom", -207 + (24), "image", this.lcs, this.stage);
      this.henchman_left.gotoAndPlay(0);
      this.henchman_right = this.assets.createSprite(this.henchmanS, 96, 96, "center", 0 + (96/2 + 705), "bottom", -207 + (24), "image", this.lcs, this.stage);
      this.henchman_right.gotoAndPlay(0);

      this.structure_body = this.assets.createSprite(this.bodyS, this.structureX, this.structureY, "center", 0, "bottom", -this.structureY / 2, "image", this.lcs, this.stage);
      // structure_banner = this.assets.createSprite(bannerS, this.structureX, this.structureY, "center", 0, "bottom", -this.structureY / 2, "image", this.lcs, this.stage);
      this.structure_range = this.assets.createTextContainer(this.range_bannerS, "[ #, # ]", "Oldstyle", "32px", "normal", "Gold", 192, 126, "center", -378 + 192 / 2, "bottom", -336 + 126 / 2, "image", 0, this.lcs, this.stage);
      this.structure_equation_banner = this.assets.createTextContainer(this.equation_bannerS, "# x              = #", "Oldstyle", "26px", "normal", "Gold", 300, 78, "center", -150 + 300 / 2, "bottom", -321 + 78 / 2, "image", 0, this.lcs, this.stage);
      this.structure_history = this.assets.createTextContainer(this.history_bannerS, "History", "Oldstyle", "18px", "normal", "Gold", 192, 126, "center", 186 + 192 / 2, "bottom", -336 + 126 / 2, "image", 126 / 2, this.lcs, this.stage);
      this.structure_facade = this.assets.createSprite(this.facadeS, this.structureX, this.structureY, "center", 0, "bottom", -this.structureY / 2, "image", this.lcs, this.stage);  // Level structure in foreground

      this.firework_low = this.assets.createSprite(this.firework_lowS, this.structureX, this.structureY, "center", 0, "top", this.structureY / 2, "image", this.lcs, this.stage);
      this.firework_hit = this.assets.createSprite(this.firework_hitS, this.structureX, this.structureY, "center", 0, "top", this.structureY / 2, "image", this.lcs, this.stage);
      this.firework_high = this.assets.createSprite(this.firework_highS, this.structureX, this.structureY, "center", 0, "top", this.structureY / 2, "image", this.lcs, this.stage);

      // Main character in foreground
      this.projectile = this.assets.createSprite(this.projectileS, 96, 96, "center", 0, "bottom", 0 - (96/2 + 57), "image", this.lcs, this.stage);
      this.projectile.gotoAndPlay(0);
      this.catapult = this.assets.createSprite(this.catapultS, 288, 384, "center", 0, "bottom", 0 - (384/2 - 57), "image", this.lcs, this.stage);

      // number_spacing = 10;
      this.number_spacer = 25;

      for(var i = -25; i <= 25; i++){

      	var temp = this.assets.createText(i.toString(), "Arial", "16px", "bold", "black", this.structureX, this.structureY, "center", 0 - (((this.number_spacer * 48) + 5)), "top", 30, "image", this.lcs, this.stage);
      	this.number_text.push(temp);
        // number_spacing += 48;
        this.number_spacer--;

      }

      this.structure_score = this.assets.createTextContainer(this.score_bannerS, "Total Lows: 0\nTotal High: 0\nTotal Hits: 0", "Oldstyle", "24px", "normal", "Gold", 192, 126, "left", (10 + 192 / 2), "bottom", -(10 + 126 / 2), "image", 126 / 2, this.lcs, this.stage);

      this.end_level_flag = this.assets.createSprite(this.end_level_flagS, this.structureX, this.structureY, "center", 0, "center", 0, "image", this.lcs, this.stage);
      this.end_level_flag.visible = false;

    },

    destroyLevel: function() {

      for (var i = 0; i < lcs.length; i++) {

        this.stage.removeChild(this.lcs[i].object)

      }

      this.lcs = [];

    },

    changeLevel: function(new_level) {

      this.resetLevel();

      this.current_level++;

      if (this.current_level > this.num_levels) {
        this.current_level = 1;
      }

      this.loadLevel();
      this.destroyScene();
      this.createScene();
      this.resize();

    },

    myFunction: function(e) {

      e.preventDefault();
      document.getElementById("myDropdown").classList.toggle("show");

    },

    remakeRangeBanner: function() {

      var range = "[ " + this.lower + ", " + this.upper + "]";

      this.structure_range.text = range;

    },

    //////////
    // GAME //
    //////////

    randomizeRangeAndMultiplier: function() {

      // Generate new range
      this.rand_num1 = Math.floor((Math.random() * 10) + 1);
      this.rand_num2 = Math.floor((Math.random() * 100) + 1);
      this.multiplicand = Math.floor(Math.random() * 11);
      this.lower = this.rand_num1 * this.rand_num2;
      this.upper = this.rand_num1 * (this.rand_num2 + 3);

      var multip_div = document.getElementById("multiplicandText");
      while (multip_div.firstChild) {
        multip_div.removeChild(multip_div.firstChild);
      }

      var multip = document.createTextNode(this.multiplicand);
      multip_div.appendChild(multip);

    },

    runInput: function() {

      // Reset drag_up bool;
      this.input.drag_up = false;

      console.log("HIT: " + this.hit_counter);
      console.log("MU" + this.miss_upper_counter);
      console.log("ML" + this.miss_lower_counter);

      // Need to check for input correctness here
      // No letters or symbols only numbers

      this.valid = true;

      if (this.mobile.isMobile) {

        for (var x in this.history_list) {
          console.log(this.history_list[x]);
          console.log(this.entry);
          // if (multiplier == history_list[x]){
          //   valid = false;
          // }
        }
        if (this.valid) {

          // Add to history
          console.log(this.history_list);
          this.history_list.push(this.multiplier);
          var dropdown = document.getElementById("myDropdown");
          var history_entry = document.createTextNode(this.multiplier);
          var line_break = document.createElement("br");
          dropdown.appendChild(history_entry);
          dropdown.appendChild(line_break);

          // Actual math
          this.solution = this.multiplier * this.multiplicand;
          console.log(this.solution);
          this.solution = Math.floor10(this.solution, -1);
          console.log(this.solution);

          var solut_div = document.getElementById("solutionText");
          while (solut_div.firstChild) {
            solut_div.removeChild(solut_div.firstChild);
          }

          var solut = document.createTextNode(solution);
          solut_div.appendChild(solut);

        	this.structure_equation_banner.text = this.multiplicand.toString() + " x              = " + this.solution.toString();

          // this.clearGameForm();

          if (this.solution <= this.upper && this.solution >= this.lower) {
            this.hit = true;
            console.log("hit");
            this.catapult.gotoAndPlay(0);
            // Triggering other fired events
            this.fired = true;
          }
          else if (this.solution > this.upper) {
            this.miss_upper = true;
            console.log("miss upper");
            this.catapult.gotoAndPlay(0);
            // Triggering other fired events
            this.fired = true;
          }
          else if (this.solution < this.lower) {
            this.miss_lower = true;
            console.log("miss lower");
            this.catapult.gotoAndPlay(0);
            // Triggering other fired events
            this.fired = true;
          }

          this.multiplier = 0;
          document.getElementById("hundredsPlace").textContent = Math.floor(this.multiplier/100 % 10);
          document.getElementById("tensPlace").textContent = Math.abs(Math.floor(this.multiplier/10 % 10));
          document.getElementById("onesPlace").textContent = Math.abs(Math.floor(this.multiplier % 10));

        }

      } else {

        // Parse entry
        var entry = parseInt(document.getElementById("entryInput").value);
        console.log("Entry type: " + typeof entry);
        console.log("Entry: " + entry);

        if ((typeof entry) == "number") {

          if (Number.isNaN(entry)) {
            this.entry_is_correct = false;

          } else {
            //this is where to add level specific rules should they prove neccesary, at the moment they are not
            this.entry_is_correct = true;
          }

        } else {
          this.entry_is_correct = false;
        }
        for (var x in this.history_list) {
          // console.log(this.history_list[x]);
          // console.log(this.entry);
          //Commented out for sake of sprint
          /*if (entry == history_list[x]) {
            valid = false;
          }*/
        }
        // Animate the catapult
        if (this.entry_is_correct && this.valid) {

          this.multiplier = document.getElementById("entryInput").value;

          // Add to history
          this.history_list.push(this.multiplier);
          console.log(this.history_list);
          var dropdown = document.getElementById("myDropdown");
          var history_entry = document.createTextNode(this.multiplier);
          var line_break = document.createElement("br");
          dropdown.appendChild(history_entry);
          dropdown.appendChild(line_break);


          // Actual math
          this.solution = this.multiplier * this.multiplicand;
          console.log(this.solution);
          this.solution = Math.round((this.solution + 0.00001) * 100) / 100;
          console.log(this.solution);

          var solut_div = document.getElementById("solutionText");
          while (solut_div.firstChild) {
            solut_div.removeChild(solut_div.firstChild);
          }

          var solut = document.createTextNode(this.solution);
          solut_div.appendChild(solut);

          this.structure_equation_banner.text = this.multiplicand.toString() + " x              = " + this.solution.toString();

          // this.clearGameForm();

          document.getElementById("entryInput").value = "";

          if (this.solution <= this.upper && this.solution >= this.lower) {
            //Plays reload sfx
            createjs.Sound.play("firing");
            createjs.Sound.play("reload", this.delayRe);
            this.hit = true;
            console.log("hit");
            this.catapult.gotoAndPlay(0);
            // Triggering other fired events
            this.fired = true;
            //plays sound for lighting fireball and hitting castle
            createjs.Sound.play("light");
            createjs.Sound.play("crumble", this.delayIn);
          } else if (this.solution > this.upper) {
            //Plays reload sfx
            createjs.Sound.play("firing");
            createjs.Sound.play("reload", this.delayRe);
            this.miss_upper = true;
            console.log("miss upper");
            this.catapult.gotoAndPlay(0);
            // Triggering other fired events
            this.fired = true;
            //plays sound for lighting fireball and hitting castle
            createjs.Sound.play("light");
            createjs.Sound.play("crumble", this.delayOut);
          } else if (this.solution < this.lower) {
            //Plays reload sfx
            createjs.Sound.play("firing");
            createjs.Sound.play("reload", this.delayRe);
            this.miss_lower = true;
            console.log("miss lower");
            this.catapult.gotoAndPlay(0);
            // Triggering other fired events
            this.fired = true;
            //plays sound for lighting fireball and hitting castle
            createjs.Sound.play("light");
            createjs.Sound.play("crumble", this.delayOut);
          }
        }

        this.clearGameForm();

      }

      // console.log(projectile.alpha);

    },

    checkSelectedDigit: function() {

      if (this.digit != this.last_digit) {

        switch(this.digit) {

          case 0:
            this.adder = 100;
            document.getElementById("hundredsPlace").style.color = "red";
            document.getElementById("tensPlace").style.color = "black";
            document.getElementById("onesPlace").style.color = "black";
            break;
          case 1:
            this.adder = 10;
            document.getElementById("hundredsPlace").style.color = "black";
            document.getElementById("tensPlace").style.color = "red";
            document.getElementById("onesPlace").style.color = "black";
            break;
          case 2:
            this.adder = 1;
            document.getElementById("hundredsPlace").style.color = "black";
            document.getElementById("tensPlace").style.color = "black";
            document.getElementById("onesPlace").style.color = "red";
            break;

        }

        this.last_digit = this.digit;

      }

    },

    updateSinglePlayAnimations: function() {

      //Catapult or whatever it is in the scene
      if (!this.catapult.paused && this.catapult.currentFrame == 11) {
        this.catapult.stop();
        this.reload = false;
      }

      if (!this.end_level_flag.paused && this.end_level_flag.currentFrame == 11) {
        this.end_level_flag.stop();
      }

      // Structure in the scene
      if (!this.structure_center.paused && this.structure_center.currentFrame == 11) {
        this.structure_center.stop();
      }
      if (!this.structure_left_center.paused && this.structure_left_center.currentFrame == 5) {
        this.structure_left_center.stop();
      }
      if (!this.structure_right_center.paused && this.structure_right_center.currentFrame == 5) {
        this.structure_right_center.stop();
      }
      if (!this.structure_left.paused && this.structure_left.currentFrame == 5) {
        this.structure_left.stop();
      }
      if (!this.structure_right.paused && this.structure_right.currentFrame == 5) {
        this.structure_right.stop();
      }

      // Structure in the scene
      if (!this.firework_low.paused && this.firework_low.currentFrame == 11) {
        this.firework_low.gotoAndStop(0);
      }
      if (!this.firework_hit.paused && this.firework_hit.currentFrame == 11) {
        this.firework_hit.gotoAndStop(0);
      }
      if (!this.firework_high.paused && this.firework_high.currentFrame == 11) {
        this.firework_high.gotoAndStop(0);
      }

    },

    runHitAnimations: function() {

      if (this.hit) {

        switch (this.hit_counter) {

          case 0:
            console.log("henchmanLC");
            this.target_x = this.henchman_left_center.x;
            this.projectile_x_speed = 12;
            break;

          case 1:
            console.log("henchmanRC");
            this.target_x = this.henchman_right_center.x;
            this.projectile_x_speed = 12;
            break;

          case 2:
            console.log("bossC");
            this.target_x = this.boss.x;
            this.projectile_x_speed = 0;
            break;

          default:
            break;

        }

        this.hit = false;
        this.waiting_hit = true;

      }

      if (this.waiting_hit) {

        if (this.projectile_speed < 0 && this.projectile.y >= this.boss.y) {

          switch (this.hit_counter) {

            case 0:
              this.hide_archer1 = true;
              this.structure_left_center.gotoAndPlay(0);
              break;

            case 1:
              this.hide_archer2 = true;
              this.structure_right_center.gotoAndPlay(0);
              break;

            case 2:
              this.hide_knight = true;
              this.structure_center.gotoAndPlay(0);
              break;

            default:
              break;

          }

          this.firework_hit.gotoAndPlay(0);
          this.reload = true;
          this.waiting_hit = false;
          this.hit_counter++;
          this.structure_score.text = "Total Lows: " + this.miss_lower_counter.toString() + "\nTotal High: " + this.miss_upper_counter.toString() + "\nTotal Hits: " + this.hit_counter.toString();

        }

      }

    },

    runMissAnimations: function() {

      if (this.miss_lower) {

        this.target_x = this.henchman_left.x;
        this.projectile_x_speed = 20;
        // miss_lower = false;
        this.waiting_miss = true;

      }

      if (this.miss_upper) {

        this.target_x = this.henchman_right.x;
        this.projectile_x_speed = 20;
        // miss_upper = false;
        this.waiting_miss = true;

      }

      if (this.waiting_miss) {

        if (this.miss_lower) {

          if (this.projectile_speed < 0 && this.projectile.y >= this.boss.y) {

            if (this.miss_lower_counter < 1) {

              this.hide_archer3 = true;
              this.structure_left.gotoAndPlay(0);

            }

            this.firework_low.gotoAndPlay(0);
            this.reload = true;
            this.miss_lower = false;
            this.miss_lower_counter++;
            this.structure_score.text = "Total Lows: " + this.miss_lower_counter.toString() + "\nTotal High: " + this.miss_upper_counter.toString() + "\nTotal Hits: " + this.hit_counter.toString();

          }

        }

        if (this.miss_upper) {

          if (this.projectile_speed < 0 && this.projectile.y >= this.boss.y) {

            if (this.miss_upper_counter < 1) {

              this.hide_archer4 = true;
              this.structure_right.gotoAndPlay(0);

            }

            this.firework_high.gotoAndPlay(0);
            this.reload = true;
            this.miss_upper = false;
            this.miss_upper_counter++;
            this.structure_score.text = "Total Lows: " + this.miss_lower_counter.toString() + "\nTotal High: " + this.miss_upper_counter.toString() + "\nTotal Hits: " + this.hit_counter.toString();

          }

        }

      }

    },

    createVictoryBanner: function() {

      this.hit_text.text += this.hit_counter.toString();
      this.low_text.text += this.miss_lower_counter.toString();
      this.high_text.text += this.miss_upper_counter.toString();

      this.visibleForm(false);
      this.pauseAnimation(true);

      this.end_level_button.visible = true;

      createjs.Tween.get(this.end_level_flag).wait(2250).to({visible:true}).call(this.flagAnimation);

      this.end_text.visible = true;
      var tempX = this.scene_scale_X;
      var tempY = this.scene_scale_Y;
      this.end_text.scaleX = 0;
      this.end_text.scaleY = 0;
      createjs.Tween.get(this.end_text).wait(4250).to({scaleX:tempX ,scaleY:tempY}, 1000, createjs.Ease.quintIn);
      createjs.Tween.get(this.end_text).wait(4250).to({rotation:360}, 1000);
      this.hit_text.visible = true;
      createjs.Tween.get(this.hit_text).wait(5750).to({alpha:1}, 500);

      this.low_text.visible = true;
      createjs.Tween.get(this.low_text).wait(6750).to({alpha:1}, 500);

      this.high_text.visible = true;
      createjs.Tween.get(this.high_text).wait(7750).to({alpha:1}, 500);

      this.end_level_button.visible = true;
      createjs.Tween.get(this.end_level_button).wait(8375).to({alpha:1}, 125);

      this.menu_button.visible = false;
      console.log("next level");

      //plays victory tune
      createjs.Sound.play("win", this.delayWin);

      // udpate global total
      this.user.hits += this.hit_counter;
      this.user.highs += this.miss_upper_counter;
      this.user.lows += this.miss_lower_counter;

      this.target_x = 0;
      this.hit = false;
      this.miss_upper = false;
      this.miss_lower = false;
      this.hit_counter = 0;
      this.miss_upper_counter = 0;
      this.miss_lower_counter = 0;
      this.projectile_x_speed = 0;

      // update database
      this.updateStats({
        user: this.user.username,
        hits: this.user.hits,
        highs: this.user.highs,
        lows: this.user.lows
      });

    },

    clearGameForm: function() {

    	this.clearHtml();


        // Creates username display text
        var multiplicand_div = document.createElement("div");
        multiplicand_div.id = "multiplicandText";
        var multiplicand_text = document.createTextNode(this.multiplicand);
        multiplicand_div.appendChild(multiplicand_text);
        var sign_text = document.createTextNode(this.sign);
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

        var equal_text = document.createTextNode(this.equal);
        var solution_div = document.createElement("div");
        solution_div.id = "solutionText";
        var solution_text = document.createTextNode(this.solution);
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

        for (var x in this.history_list) {
          var history_entry = document.createTextNode(this.history_list[x]);
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
        if (this.play_tutorial) {
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

        if (this.play_tutorial) {
          scene_html.appendChild(tutorial_div);
        }

    },


    // Mutes the current song
    muteSound: function() {

      if (!this.music.sound_off) {
        console.log(this.lute.src);
      if(!this.music.muted)
      {
        this.stage.removeChild(this.lute);
        this.lute = new createImage("res/antiLute.png", this.luteX, this.luteY);
        lute.addEventListener("click", this.music.muteSound);
        this.scaleGUI();
      }
      else
      {
        this.stage.removeChild(this.lute);
        this.lute = new createImage("res/lute.png", this.luteX, this.luteY);
        this.lute.addEventListener("click", this.music.muteSound);
        this.scaleGUI();
      }
        this.music.current_song.muted = !this.music.current_song.muted;
        this.music.muted = !this.music.muted;
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
