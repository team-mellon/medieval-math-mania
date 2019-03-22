<template>
  <div id="engineHolder">

    <!-- <canvas id="renderCanvas"></canvas>                                          canvas for rendering webgl and babylon -->
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

    <div id="moduleHolder">
      <!-- <UserInterface @pushToEcs="pushEcs" @pushToLcs="pushLcs"/> -->
      <Input />
      <!-- <Scaling /> -->
      <!-- <SceneTemplate /> -->
      <!-- <LevelTemplate /> -->
      <!-- <Game /> -->
      <!-- <Scenes /> -->
      <!-- <Levels /> -->
      <!-- <Gui /> -->
    </div>
  </div>
</template>

<script>

import UserInterface from './UserInterface.vue'
import Input from './Input.vue'

export default {

  name: 'Engine',

  components: {
    UserInterface,
    Input
  },

  data () {
    return {
      // w: 100,
      // h: 200,
      style: {
        background: '#aaa'
      }
    }
  },

  mounted: function() {

    window.addEventListener('resize', this.resize, false);

    // var el = document.getElementById("demoCanvas");
    // el.addEventListener("touchstart", handleStart, false);
    // el.addEventListener('touchend', handleEnd, false);
    // el.addEventListener("touchcancel", handleCancel, false);
    // el.addEventListener("touchmove", handleMove, false);
    console.log("initialized.");

    // window.addEventListener('DOMContentLoaded', function() {                  // start game when DOM loads
    //   runGame('renderCanvas');
    // });

    /////////////////////
    // INITIIALIZATION //
    /////////////////////

    this.ecs = []; // Entity component system for scaling and eventually object storage
    this.lcs = []; // Level component system for scaling and eventually object storage
    this.gcs = []; // GUI component system for scaling and eventually object storage

    this.frame_counter = 0;

    this.entry_is_correct;

    this.hit = false;
    this.miss_upper = false;
    this.miss_lower = false;

    this.upper = 100;
    this.lower = 35;

    this.waiting_hit = false;
    this.waiting_miss = false;

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

    this.hide_knight = false;
    this.hide_archer1 = false;
    this.hide_archer2 = false;
    this.hide_archer3 = false;
    this.hide_archer4 = false;

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

    this.history_list = [];

    this.valid = true;

    //Setting properties for delays for sounds
    this.delayRe = new createjs.PlayPropsConfig().set({delay : 250});
    this.delayIn = new createjs.PlayPropsConfig().set({delay : 500});
    this.delayOut = new createjs.PlayPropsConfig().set({delay : 750});
    this.delayWin = new createjs.PlayPropsConfig().set({delay : 2000});

    this.database = {
      "users": {
        "admin": {
          "firstname": "Eric",
          "lastname": "Bitikofer",
          "password": "1234"
        }
      },
      "stats": {
        "admin": {
          "hits": 0,
          "misses": 0
        }
      }
    };

    this.multiplicand = 5;
    this.sign = " x "; //&#37
    this.equal = " = ";
    this.solution = 0;

    /////////////
    // SCALING //
    /////////////

    this.max_scale_Y = 1440;
    this.max_scale_X = 1920;

    this.scene_scale_X = 1.0;
    this.scene_scale_Y = 1.0;

    this.scene_margin_X = 0.0;

    this.added = false;

    this.mobile = false;

    ////////////
    // SCENES //
    ////////////

    this.current_scene = 0;
    this.last_scene = 0;

    this.num_scenes = 10;

    this.scenes = [

      { // Login
        color: "#919191",
        bg_img: "res/login.png",
        fg_img: {
                  images: ["res/login_scroll.png"],
                  frames: {width:750, height:600, count:6, regX: 0, regY:0, spacing:0, margin:0},
                  framerate: 6
                },
        fg_text: "Login didn't load",
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
            // Creates line break for form div spacing
            var br = document.createElement("br");
            var username_input = document.createElement("input");
            username_input.id = "usernameInput";
            username_input.setAttribute("type", "text");
            username_input.setAttribute("name", "username");

            // Creates username div to hold display text and input box
            var login_username_div = document.createElement("div");
            login_username_div.className = "login";
            login_username_div.appendChild(username_text);
            login_username_div.appendChild(br);
            login_username_div.appendChild(username_input);

            var br = document.createElement("br");

            // Creates password display label and input box
            var password_text = document.createTextNode("Password");
            // Creates line break for form div spacing
            var br2 = document.createElement("br");
            var password_input = document.createElement("input");
            password_input.id = "passwordInput";
            password_input.setAttribute("type", "password");
            password_input.setAttribute("name", "password");

            // Creates password div to hold display text and input box
            var login_password_div = document.createElement("div");
            login_password_div.className = "login";
            login_password_div.appendChild(password_text);
            login_password_div.appendChild(br2);
            login_password_div.appendChild(password_input);

            // Creates line break for form div spacing
            var br3 = document.createElement("br");

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
            login_form.appendChild(br);
            login_form.appendChild(login_password_div);
            login_form.appendChild(br3);
            login_form.appendChild(error_div);

            // Injecting login form into existing html
            var scene_html = document.getElementById("sceneHTML");
            scene_html.appendChild(login_form);

          }.bind(this)
      },

      { // Signup
        color: "#919191",
        bg_img: "res/login.png",
        fg_img: {
                  images: ["res/login_scroll.png"],
                  frames: {width:750, height:600, count:6, regX: 0, regY:0, spacing:0, margin:0},
                  framerate: 6
                },
        fg_text: "Signup didn't load",
        custom:   function() {
            // Creates firstname display label and input box
            var firstname_text = document.createTextNode("Firstname:");
            var firstname_input = document.createElement("input");
            firstname_input.id = "firstnameInput";
            firstname_input.setAttribute("type", "text");
            firstname_input.setAttribute("name", "firstname");

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
            lastname_input.setAttribute("name", "lastname");

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
            username_input.setAttribute("name", "username");

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
            password_input.setAttribute("name", "password");

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
        color: "#8ac5dc",
        bg_img: "",
        fg_img: {
                  images: [""],
                  frames: {width:0, height:0, count:0, regX: 0, regY:0, spacing:0, margin:0},
                  framerate: 6
                },
        fg_text: "",
        custom: function () {

        }.bind(this)
      },

      { // Game
        color: "#000000",
        bg_img: "res/numberline.png",
        fg_img: {
                  images: [""],
                  frames: {width:0, height:0, count:0, regX: 0, regY:0, spacing:0, margin:0},
                  framerate: 6
                },
        fg_text: "",
        custom: function() {

          // Creates username display text
          var multiplicand_div = document.createElement("div");
          multiplicand_div.id = "multiplicandText";
          var multiplicand_text = document.createTextNode(this.multiplicand);
          multiplicand_div.appendChild(multiplicand_text);
          var sign_text = document.createTextNode(this.sign);
          var entry_input;
          if (this.mobile) {

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
          var button_text = document.createTextNode("#");
          var history_button = document.createElement("button");
          var history_div = document.createElement("div");
          history_button.className = "dropbtn";
          history_button.addEventListener('click', this.myFunction);
          history_div.className = "dropdown-content";
          history_div.id = "myDropdown";
          history_button.appendChild(button_text);
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
          game_entry_form.className = "scrollMenu";
          game_entry_form.appendChild(game_entry_div);

          // Creates login form to hold username and password divs
          var game_history_form = document.createElement("form");
          game_history_form.id = "historyBanner";
          game_history_form.className = "scrollMenu";
          game_history_form.appendChild(game_history_div);

          // Injecting login form into existing html
          var scene_html = document.getElementById("sceneHTML");
          scene_html.appendChild(game_entry_form);
          scene_html.appendChild(game_history_form);

        	if (this.play_tutorial) {
        		scene_html.appendChild(tutorial_div);
          }

          this.createLevel();
          if (this.mobile) {

          } else {
            document.getElementById("entryInput").value = 0;
          }
          document.getElementById("myDropdown").classList.toggle("show");

        }.bind(this)
      },

      { // Stats
        color: "#919191",
        bg_img: "res/login.png",
        fg_img: {
                  images: ["res/login_scroll.png"],
                  frames: {width:750, height:600, count:6, regX: 0, regY:0, spacing:0, margin:0},
                  framerate: 6
                },
        fg_text: "Stats didn't load",
        custom: function () {
          // This was in stats scene, may need this structure
          // var key = message.current_user;
          // stats1_text.text = "Hits: " + this.database["stats"][key]["hits"];
          // stats2_text.text = "Misses: " + this.database["stats"][key]["misses"];
        }.bind(this)
      },

      { // How To Play
        color: "#919191",
        bg_img: "res/login.png",
        fg_img: {
                  images: ["res/login_scroll.png"],
                  frames: {width:750, height:600, count:6, regX: 0, regY:0, spacing:0, margin:0},
                  framerate: 6
                },
        fg_text: "How To Play didn't load",
        custom: function () {

        }.bind(this)
      },

      { // Settings
        color: "#919191",
        bg_img: "res/login.png",
        fg_img: {
                  images: ["res/login_scroll.png"],
                  frames: {width:750, height:600, count:6, regX: 0, regY:0, spacing:0, margin:0},
                  framerate: 6
                },
        fg_text: "Settings didn't load",
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
        color: "#919191",
        bg_img: "res/login.png",
        fg_img: {
                  images: ["res/login_scroll.png"],
                  frames: {width:750, height:600, count:6, regX: 0, regY:0, spacing:0, margin:0},
                  framerate: 6
                },
        fg_text: "Account didn't load",
        custom: function () {
          // This was in account scene, may need this structure
          // var key = message.current_user;
          // username_text.text = "Fullname: " + this.database["users"][key]["firstname"] + " " + this.database["users"][key]["lastname"];
          // password_text.text = "Password: " + this.database["users"][key]["password"];
        }.bind(this)
      },

      { // Map
        color: "#919191",
        bg_img: "res/login.png",
        fg_img: {
                  images: ["res/map.png"],
                  frames: {width:750, height:600, count:6, regX: 0, regY:0, spacing:0, margin:0},
                  framerate: 6
                },
        fg_text: "",
        custom: function () {

        }.bind(this)
      },

      { // Hint
        color: "#919191",
        bg_img: "res/login.png",
        fg_img: {
                  images: ["res/login_scroll.png"],
                  frames: {width:750, height:600, count:6, regX: 0, regY:0, spacing:0, margin:0},
                  framerate: 6
                },
        fg_text: "Hint didn't load",
        custom: function () {

        }.bind(this)
      }

    ];

    /////////
    // GUI //
    /////////

    // var lute;
    // //var antiLute;
    //
    // var previous_indicator;
    // var pause_indicator;
    // var next_indicator;
    //
    this.buttonX = 216;
    this.buttonY = 72;
    //
    // var left_sword_button;
    // var right_sword_button;
    //
    // var ll_number_button;
    // var lr_number_button;
    // var rl_number_button;
    // var rr_number_button;
    //
    // var pause_menu;
    //
    // var background;
    // var background_left;
    // var background_right;
    //
    // var midground;
    //
    // var foreground;
    this.backgroundX = 1920;
    this.backgroundY = 768;
    //
    // var exit_level_button;
    // var main_menu_button;
    // var close_button;
    // var play_button;
    // var stats_button;
    // var h2p_button;
    // var settings_button;
    // var logout_button;
    // var account_button;
    //
    // var menu_button;
    //
    // var hint_button;
    //
    this.indicators = [];
    //
    // var end_level_scene;
    // var end_level_button;
    // var end_text;

    // var hit_text_counter;
    // var low_text_counter;
    // var high_text_counter;

    this.indicator_counter = 0;

    this.indicator_coordinates = [

    	{ // City
    		x: -90,	y: 72 },
    	{ // Grasslands
    		x: -288, y: 0 },
    	{ // Volcano
    		x: -600, y: 192 },
    	{ // Sea
    		x: -186, y: 216 },
    	{ // Mountains
    		x: -480, y: -108 },
    	{ // Summit
    		x: -474, y: -186 },
    	{ // Cave
    		x: -354, y: -138 },
    	{ // Forest
    		x: -90, y: -78 },
    	{ // Alpine
    		x: 534, y: -222 },
    	{ // Woods
    		x: 150, y: 102 },
    	{ // Swamp
    		x: 318, y: 54 },
    	{ // Deadlands
    		x: 546, y: 150 },
    	{ // Sky
    		x: -186, y: -198 },
    	{ // Underwater
    		x: -414, y: 150 },
    	{ // Fungi
    		x: 234, y: -78 },
    	{ // Tundra
    		x: 354, y: -186 },
    	{ // Tarpit
    		x: 486, y: -30 },
    	{ // Desert
    		x: -618, y: 102 },
    	{ // Boreal
    		x: 42, y: -162 },
    	{ // Monolith
    		x: -426, y: -6 }

    ];

    ////////////
    // LEVELS //
    ////////////

    this.num_levels = 20;

    this.current_level = 1;

    this.levels = [

      { // City
        number: 1,
        color: "#c9e6ff",
        hint: "If the student got the one whole number hit, and got the high, and the low, prompt them to think about money. For example, if they tried 8 × 7 = 56 and also tried 8 × 6 = 48 and 8 × 8 = 64, prompt them to try a value between 6 and 7 or between 7 and 8. Is there an amount of money between $6 and $7 or between $7 and $8? Try that value next!",
        // Exactly one multiple of multiplicand in range, single digit multiplicand
        math: function () {
          this.multiplicand = Math.floor(Math.random() * 7) + 2;
          this.multiple = Math.floor(Math.random() * 7) + 2;
          this.lower = (this.multiple * this.multiplicand) - Math.floor(this.multiplicand/2);
          this.upper = (this.multiple * this.multiplicand) + Math.floor(this.multiplicand/2);
        },
        open: function () {
          this.indicatorFunction(1);
        }
      },

      { // Grasslands
        number: 2,
        color: "#c9f9ff",
        hint: "If the student got the whole number high and the low right above and below the target range, prompt them to think about money. For example, if they tried 7 × 7 = 49 and also tried 7 × 8 = 56, prompt them to try a value between 7 and 8. Think about money — is there an amount of money between $7 and $8? Try that value next!",
        // No multiples of multiplicand in range, single digit multiplicand
        math: function () {
          this.multiplicand = Math.floor(Math.random() * 7) + 2;
          this.multiple = Math.floor(Math.random() * 7) + 2;
          this.lower = (this.multiple * this.multiplicand) + 1;
          this.upper = (this.multiple * (this.multiplicand+1)) - 1;
        },
        open: function () {
          this.indicatorFunction(2);
        }
      },

      { // Volcano
        number: 3,
        color: "#3b0a0a",
        hint: "No hint for this level yet",
        // Starting number is a two-digit number, target range includes the value which is one tenth of the number, and is bounded by positive single-digit integers.
        math: function () {
          this.multiplicand = Math.floor(Math.random() * 90)+ 10;
          factor = (0.1) * this.multiplicand;
          this.lower = Math.floor(factor);
          this.upper = Math.ceil(factor);
          if(this.lower == this.upper) {
            this.upper++;
          }
        },
        open: function () {
          this.indicatorFunction(3);
        }
      },

      { // Sea
        number: 4,
        color: "#c2ffe6",
        hint: "No hint for this level yet",
        // Starting number is a two-digit number, target range goes from 0 to a single-digit positive integer.
        math: function () {
          this.multiplicand = Math.floor(Math.random() * 90) + 10;
          this.lower = 0;
          this.upper = Math.floor(Math.random() * 7) + 2;
        },
        open: function () {
          this.indicatorFunction(4);
        }
      },

      { // Mountains
        number: 5,
        color: "#b3b3b3",
        hint: "No hint for this level yet",
        /*Starting number is a single-digit number. For target range, choose another single-digit number,
        multiply it by 10 times the starting number, and make sure that the target range contains that number.
        The lower boundary is an integer at least 10 below the product and the upper boundary is an integer
        at least 10 above the product.*/
        math: function () {
          this.multiplicand = Math.floor(Math.random() * 7) + 2;
          this.multiple = Math.floor(Math.random() * 7) + 2;
          storage = this.multiplicand * this.multiple * 10;
          this.lower = storage - 10;
          this.upper = storage + 10;
        },
        open: function () {
          this.indicatorFunction(5);
        }
      },

      { // Summit
        number: 6,
        color: "#effffe",
        hint: "No hint for this level yet",
        /*Starting number is a single-digit number n, target range contains 100n,
      	and the range makes it so there is only one integer answer
      	(i.e. the lower bound is above 100n − n and the upper bound is below 100n + n.*/
        math: function () {
      		this.multiplicand = Math.floor(Math.random() * 7) + 2;
      		this.multiple = 100 * this.multiplicand;
      		this.lower = this.multiple - Math.floor(this.multiplicand/2);
      		this.upper = this.multiple + Math.floor(this.multiplicand/2);
        },
        open: function () {
          this.indicatorFunction(6);
        }
      },

      { // Cave
        number: 7,
        color: "#010027",
        hint: "No hint for this level yet",
        //Starting number is a two-digit number, target range contains 0 (flanked by single-digit integers)
        math: function () {
      		this.multiplicand = Math.floor(Math.random() * 90) + 10;
      		this.lower = -Math.abs(Math.floor(Math.random() * 7) + 2);
      		this.upper = Math.floor(Math.random() * 7) + 2;
        },
        open: function () {
          this.indicatorFunction(7);
        }
      },

      { // Forest
        number: 8,
        color: "#2f3b25",
        hint: "No hint for this level yet",
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
        },
        open: function () {
          this.indicatorFunction(8);
        }
      },

      { // Alpine
        number: 9,
        color: "#dbf8ff",
        hint: "No hint for this level yet",
        //Starting number is a three-digit number, target range goes from 0 to a single-digit positive integer.
        math: function () {
      		this.multiplicand = Math.floor((Math.random() * 900) + 100);
      		this.lower = 0;
      		this.upper = Math.floor(Math.random() * 7) + 2;
        },
        open: function () {
          this.indicatorFunction(9);
        }
      },

      { // Woods
        number: 10,
        color: "#3f2900",
        hint: "No hint for this level yet",
        /*Starting number is a number between 0 and .1 with three decimal places. Lower bound of target
      	range is 1000 times the starting number, and upper bound is one more than the lower bound. */
        math: function () {
      		this.multiplicand = Math.floor((Math.random() * 990) + 10) / 1000;
      		this.lower = 1000 * this.multiplicand;
      		this.upper = this.lower + 1;
        },
        open: function () {
          this.indicatorFunction(10);
        }
      },

      { // Swamp
        number: 11,
        color: "#292c2b",
        hint: "No hint for this level yet",
        /*Starting number is a number between 10 and 100 with one decimal place. Lower bound of target
      	range is 1000 times the starting number, and upper bound is one more than the lower bound.*/
        math: function () {
      		this.multiplicand = Math.floor(Math.random() * 90 * 10 + 10) / 10;
      		this.lower = 1000 * this.multiplicand;
      		this.upper = this.lower + 1;
        },
        open: function () {
          this.indicatorFunction(11);
        }
      },

      { // Deadlands
        number: 12,
        color: "#231e25",
        hint: "No hint for this level yet",
        /*Starting number is a whole number greater than 1,000,000. Target range contains the number which is .0001 times the size of the starting number.
      	The lower bound may be up to 50 less than this value and the upper bound may be up to 50 greater than this value.*/
        math: function () {
      		this.multiplicand = Math.floor(Math.random() * 10000000);
      		this.lower = (Math.floor(this.multiplicand * 0.0001)) - (Math.floor(Math.random() * 50) + 10);
      		this.upper = (Math.floor(this.multiplicand * 0.0001)) + (Math.floor(Math.random() * 50) + 10);
        },
        open: function () {
          this.indicatorFunction(12);
        }
      },

      { // Sky
        number: 13,
        color: "#b6c1ff",
        hint: "No hint for this level yet",
        /*Starting number is an integer less than 200. Target range contains the number which is half the value
      	with an overall range less than 10. */
        math: function () {
      		this.multiplicand = Math.floor(Math.random() * 100 + 100);
      		this.lower = Math.floor(this.multiplicand / 2) - 4;
      		this.upper = Math.floor(this.multiplicand / 2) + 4;
        },
        open: function () {
          this.indicatorFunction(13);
        }
      },

      { // Underwater
        number: 14,
        color: "#00373d",
        hint: "No hint for this level yet",
        /*Starting number is a number less than 10 with one decimal place.
      	Target range has three-digit bounding numbers, does not contain an
      	integer multiple of the starting number, and the range of the interval is 1.*/
        math: function () {
      		this.multiplicand = Math.floor(Math.random() * 90 + 9) / 10;
      		this.lower = Math.floor(Math.random() * 900 + 100);
      		this.upper = this.lower + 1;
        },
        open: function () {
          this.indicatorFunction(14);
        }
      },

      { // Fungi
        number: 15,
        color: "#3b0a30",
        hint: "No hint for this level yet",
        /*Starting number is a negative single-digit integer. Target range contains only positive values, one of
      	which is a multiple of the starting number.*/
        math: function ()  {
      		this.multiplicand = -Math.abs(Math.floor(Math.random() * 7) + 2);
      		this.lower = this.multiplicand * this.multiplicand;
      		this.upper = this.lower + (Math.floor(Math.random() * 7) + 2);
        },
        open: function () {
          this.indicatorFunction(15);
        }
      },

      { // Tundra
        number: 16,
        color: "#ccf1ff",
        hint: "No hint for this level yet",
        /*Starting number is a positive two-digit integer. Target range is bounded by two-digit negative integers
        5 away from each other.*/
        math: function () {
          this.multiplicand = Math.floor(Math.random() * 90 + 9);
          this.lower = -Math.abs(Math.floor(Math.random() * 84) + 15);
          this.upper = this.lower + 5;
        },
        open: function () {
          this.indicatorFunction(16);
        }
      },

      { // Tarpit
        number: 17,
        color: "#5d5661",
        hint: "No hint for this level yet",
        /*Starting number is a number between -100 and -10 with one decimal place. Target range bounds are
        any two integers between -20 and 0.*/
        math: function () {
          this.multiplicand = -Math.abs(Math.floor(Math.random() * 90) + 10);
          this.lower = -Math.abs(Math.floor(Math.random() * 10) + 10);
          this.upper = -Math.abs(Math.floor(Math.random() * 10));
        },
        open: function () {
          this.indicatorFunction(17);
        }
      },

      { // Desert
        number: 18,
        color: "#effffe",
        hint: "No hint for this level yet",
        /*Starting number is a number between -100 and -10 with one decimal place. Target range bounds are
        any two integers between 0 and 20. */
        math: function () {
          this.multiplicand = -Math.abs(Math.floor(Math.random() * 90 * 10 + 10) / 10);
          this.lower = Math.floor(Math.random() * 10);
          this.upper = Math.floor(Math.random() * 10 + 10);
        },
        open: function () {
          this.indicatorFunction(18);
        }
      },

      { // Boreal
        number: 19,
        color: "#556968", // "#010027",
        hint: "No hint for this level yet",
        /*Starting number is an integer between -100 and -10 with one decimal place. Target range bounds are
        positive numbers between 0 and 1 with two decimal places that are one hundredth apart. */
        math: function () {
          this.multiplicand = -Math.abs(Math.floor(Math.random() * 90 * 10 + 10) / 10);
          this.lower = Math.floor((Math.random() * 90) + 9) / 100;
          this.upper = Math.floor((this.lower + 0.01)* 100)/100;
        },
        open: function () {
          this.indicatorFunction(19);
        }
      },

      { // Monolith
        number: 20,
        color: "#56727d",
        hint: "No hint for this level yet",
        /*Starting number is any positive three digit integer. Target range is bounded by two numbers between
        -10 and -5, with three decimal places, and within one hundredth of each other. */
        math: function () {
          this.multiplicand = Math.floor(Math.random() * 900) + 100;
          this.lower = -Math.abs((Math.floor(Math.random() * 10000) + 5000) /1000);
          this.upper = this.lower + 0.01;
        },
        open: function () {
          this.indicatorFunction(20);
        }
      }

    ];

    this.number_spacing = 10;
    this.number_spacer = 25;

    this.structureX = 1920;
    this.structureY = 1440;

    ///////////
    // INPUT //
    ///////////

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

    ///////////
    // MUSIC //
    ///////////

    this.muted = false;
    this.playlistSources = [
      "res/music/one-eyed_maestro.wav",
      "res/music/achaidh_cheide.wav",
      "res/music/cartoon_battle.wav",
      "res/music/celtic_impulse.wav",
      "res/music/clenched_teeth.wav",
      "res/music/failing_defense.wav",
      "res/music/fiddles_mcGinty.wav",
      "res/music/galway.wav",
      "res/music/hidden_past.wav",
      "res/music/parisian.wav",
      "res/music/bobbin_beeps.wav",
      "res/music/whirlwind.wav",
      "res/music/drums_in_the_deep.wav",
      "res/music/fortress.wav"
    ];

    this.playlistIDs = [
      "OneEyedMaestro",
      "AchaidhCheide",
      "CartoonBattle",
      "CelticImpulse",
      "ClenchedTeeth",
      "FailingDefense",
      "FiddlesMcGinty",
      "Galway",
      "HiddenPast",
      "Parisian",
      "BoppinBeeps",
      "whirlwind",
      "DrumsInTheDeep",
      "Fortress"
    ];

    // Player to play playlist music
    this.playlist = {
      size: 0,
      sources: [],
      ids: [],
      current: 0
    }
    this.sound_off = true;

    // Volume for
    this.volume = 0.5;

    ////////////
    // MOBILE //
    ////////////

    this.phone_rotationS = {

      images: ["res/phone-rotation.png"],
      frames: {width:288, height:288, count:2, regX: 0, regY:0, spacing:0, margin:0},
      framerate: 2

    };

    this.stage = new createjs.Stage('drawingCanvas');       // Stage for drawing pictures and shapes
    createjs.Touch.enable(this.stage);                      // Enable touch interaction for mobile
    this.bg = new createjs.Shape();                         // Create a rectangle for clearing the screen
    this.bg_color = "#333333";                              // Background color
    this.stage.addChild(this.bg);                           // Add rectangle to the stage

    // loadSound(); // Load sounds from file
    // console.log(playlist);

    this.createScene(); // Create scene assets

    this.landscape_warning = new createjs.Shape();

    this.phone_rotation = this.createSprite(this.phone_rotationS, 288, 288, "center", 0, "center", 0, "image", "menu");
    this.stage.removeChild(this.phone_rotation);

    createjs.Ticker.setFPS(60);                             // Set FPS (could be depricated?)
    createjs.Ticker.addEventListener('tick', this.tick);   // Set tisk listener for use as game loop
    // createjs.Ticker.addEventListener("tick", tick);

    document.onkeydown = this.keyDown; // Add keydown listener
    document.onkeyup = this.keyUp; // Add keyup listener

    this.resize(); // Resize to set initial scale

  },

  methods: {

    /////////////
    // SCALING //
    /////////////

    // Scale the stage
    resize: function() {

      this.mobileCheck();
      this.orientationCheck();

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

      this.scaleAssets(); // Scale scene appropriately

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

        // Enter or swipe up to check input
        if ((this.keys[13] || this.drag_up) && this.catapult.paused) { // Enter or drag up swipe on mobile
          console.log("Enter Pressed");
          this.runInput();
        }

        // If on mobile
        if (this.mobile) {
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

    // Scale the image-like assets
    scaleAssets: function() {

      console.log("ECS length: " + this.ecs.length);
      // console.log(this.ecs);

      for (var i = 0; i < this.ecs.length; i++) {

        let platform_scale = 1.0;

        let x_start = this.stage.canvas.width / 2;
        let y_start = this.stage.canvas.height / 2;

        // console.log(i);

        // console.log(this.ecs[i]);
        // console.log(this.ecs[i].x_lock);

        switch (this.ecs[i].x_lock) {

          case "left":
            x_start = 0;
            break;

          case "center":
            x_start = this.stage.canvas.width / 2;
            break;

          case "right":
            x_start = this.stage.canvas.width;
            break;

        }

        // console.log(this.ecs[i]);
        // console.log(this.ecs[i].y_lock);

        switch (this.ecs[i].y_lock) {

          case "top":
            y_start = 0;
            break;

          case "center":
            y_start = this.stage.canvas.height / 2;
            break;

          case "bottom":
            y_start = this.stage.canvas.height;
            break;

        }

        this.ecs[i].object.scaleX = this.scene_scale_X;
        this.ecs[i].object.scaleY = this.scene_scale_Y;

        if (this.mobile) {

          platform_scale = 1.5;

        }

        switch (this.ecs[i].type) {

          case "image":
            break;

          case "gui":
            // ecs[i].object.scale = 1.0;
            break;

          case "smallgui":
            // ecs[i].object.scale = 0.5;
            break;

        }

        this.ecs[i].object.x = x_start + this.ecs[i].x_location * this.scene_scale_Y * platform_scale;
        this.ecs[i].object.y = y_start + this.ecs[i].y_location * this.scene_scale_Y * platform_scale;

      }

      if (this.current_scene == 3) {

        for (var i = 0; i < this.lcs.length; i++) {

          var platform_scale = 1.0;

          var x_start = this.stage.canvas.width / 2;
          var y_start = this.stage.canvas.height / 2;

          switch (this.lcs[i].x_lock) {

            case "left":
              var x_start = 0;
              break;

            case "center":
              var x_start = this.stage.canvas.width / 2;
              break;

            case "right":
              var x_start = this.stage.canvas.width;
              break;

          }

          switch (this.lcs[i].y_lock) {

            case "top":
              var y_start = 0;
              break;

            case "center":
              var y_start = this.stage.canvas.height / 2;
              break;

            case "bottom":
              var y_start = this.stage.canvas.height;
              break;

          }

          this.lcs[i].object.scaleX = this.scene_scale_X;
          this.lcs[i].object.scaleY = this.scene_scale_Y;

          if (this.mobile) {

            platform_scale = 1.5;

          }

          switch (this.lcs[i].type) {

          case "image":
            break;

          case "gui":
            // lcs[i].object.scale = 1.0;
            break;

          case "smallgui":
            // lcs[i].object.scale = 0.5;
            break;

          }

          this.lcs[i].object.x = x_start + this.lcs[i].x_location * this.scene_scale_Y * platform_scale;
          this.lcs[i].object.y = y_start + this.lcs[i].y_location * this.scene_scale_Y * platform_scale;

        }

      }

    },

    ////////////////////
    // ASSET CREATION //
    ////////////////////

    createImage: function(location, width, height, x_lock, x_location, y_lock, y_location, type, entity_component_system) {

      let image = new createjs.Bitmap(location);
    	this.stage.addChild(image);
      image.regX = width/2;
      image.regY = height/2;

      this.createAndPushEntity(entity_component_system, image, width, height, x_lock, x_location, y_lock, y_location, type);

      return image;

    },

    createSprite: function(animation, width, height, x_lock, x_location, y_lock, y_location, type, entity_component_system) {

      let spriteSheet = new createjs.SpriteSheet(animation);

      let listener = spriteSheet.on("error", function(evt, data) {
        console.log("'" + evt.src + "' failed to load");
      });

      let listener2 = spriteSheet.on("complete", function(evt) {
        console.log("Spritesheet loading complete. Check for errors.");
      });

      let sprite = new createjs.Sprite(spriteSheet);
      this.stage.addChild(sprite);
      sprite.regX = width/2;
      sprite.regY = height/2;

      this.createAndPushEntity(entity_component_system, sprite, width, height, x_lock, x_location, y_lock, y_location, type);

      return sprite;

    },

    createText: function(num, font, size, style, color, width, height, x_lock, x_location, y_lock, y_location, type, entity_component_system) {

      var text = new createjs.Text(num, style + " " + size + " " + font, color);
    	this.stage.addChild(text);
      text.regX = width/2;
      text.regY = height/2;

      this.createAndPushEntity(entity_component_system, text, width, height, x_lock, x_location, y_lock, y_location, type);

      return text;

    },

    createTextContainer: function(animation, words, font, size, style, color, width, height, x_lock, x_location, y_lock, y_location, type, reg, entity_component_system) { // }, handleClick) {

      var spriteSheet = new createjs.SpriteSheet(animation);

      let listener = spriteSheet.on("error", function(evt, data) {
        console.log("'" + evt.src + "' failed to load");
      });

      let listener2 = spriteSheet.on("complete", function(evt) {
        console.log("Spritesheet loading complete. Check for errors.");
      });

      var sprite = new createjs.Sprite(spriteSheet);
      sprite.regX = width/2;
      sprite.regY = height/2;

      var text = new createjs.Text(words, style + " " + size + " " + font, color);
      text.textAlign = "center";
      text.textBaseline = "middle";
      text.regY = reg / 2;

      var container = new createjs.Container();
      container.addChild(sprite, text);
      this.stage.addChild(container);

      // button.on("click", handleClick);

      this.createAndPushEntity(entity_component_system, container, width, height, x_lock, x_location, y_lock, y_location, type);

      return text;

    },

    createButton:  function(location, text, width, height, x_lock, x_location, y_lock, y_location, type, handleClick, entity_component_system) {

      var image = new createjs.Bitmap(location);
      image.regX = width/2;
      image.regY = height/2;

      var color = "#DAA520";
      var size = "24";
      var font = "Blackadder";

      if (
        text == "Login" || text == "Signup" ||
        text == "Create" || text == "Cancel"
      ) {
        color = "#646464";
      }

      if (text == "Select a level") {
        size = "60";
        font = "Oldstyle";
      }

      if (
        text == "1" || text == "2" || text == "3" || text == "4" || text == "5" ||
        text == "6" || text == "7" || text == "8" || text == "9" || text == "10" ||
        text == "11" || text == "12" || text == "13" || text == "14" || text == "15" ||
        text == "16" || text == "17" || text == "18" || text == "19" || text == "20"
      ) {
        size = "16";
        font = "Oldstyle";
        color = "#FFFFFF"
      }

      var label = new createjs.Text(text, "normal " + size + "px " + font, color);
      // label.name = "label";
      label.textAlign = "center";
      label.textBaseline = "middle";
      // label.x = 216/2;
      // label.y = 72/2;

      var button = new createjs.Container();
      // button.name = "button";
      // button.x = 50;
      // button.y = 25;
      button.addChild(image, label);
      this.stage.addChild(button);

      // image.on("click", handleClick);
      // label.on("click", handleClick);
      button.on("click", handleClick);

      this.createAndPushEntity(entity_component_system, button, width, height, x_lock, x_location, y_lock, y_location, type);

      return button;

    },

    createAndPushEntity: function(entity_component_system, obj, obj_width, obj_height, obj_x_lock, obj_x_location, obj_y_lock, obj_y_location, obj_type) {

      let entity_object = {
        object: obj,
        width: obj_width,
        height: obj_height,
        x_lock: obj_x_lock,
        x_location: obj_x_location,
        y_lock: obj_y_lock,
        y_location: obj_y_location,
        type: obj_type
      };

      if (entity_component_system == "level") {
        this.lcs.push(entity_object);
      } else if (entity_component_system == "gui") {
        this.gcs.push(entity_object);
      } else if (entity_component_system == "menu") {
        this.ecs.push(entity_object);
      }

    },

    ////////////
    // SCENES //
    ////////////

    // Load the scene in the variable current_scene
    loadCurrentScene: function() {

      // Load background color for the scene
      this.bg_color = this.scenes[this.current_scene].color;

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

      this.background = this.createImage(this.scenes[this.current_scene].bg_img, this.backgroundX, 1440, "center", 0, "center", 0, "image", "menu");
      this.background_left = this.createImage(this.scenes[this.current_scene].bg_img, this.backgroundX, 1440, "center", -this.backgroundX, "center", 0, "image", "menu");
      this.background_right = this.createImage(this.scenes[this.current_scene].bg_img, this.backgroundX, 1440, "center", this.backgroundX, "center", 0, "image", "menu");

      switch (this.current_scene) {
        case 0:
          // scenes[this.current_scene].fg_text] = "Login:\n\nSignup:\n\n";
          this.scenes[this.current_scene].fg_text = "";
          break;
        case 1:
          // scenes[this.current_scene].fg_text = "Firstname:\n\nLastname:\n\nUsername:\n\nPassword:\n\nConfirm:\n\n";
          this.scenes[this.current_scene].fg_text = "";
          break;
        case 4:
          this.scenes[this.current_scene].fg_text = "Hits: " + this.database.stats.admin.hits + "\n\nMisses: " + this.database.stats.admin.misses + "\n\n";
          break;
        case 5:
          this.scenes[this.current_scene].fg_text = "How To Play:\nThe goal of the game is to get\none hit anywhere above the range,\none hit anywhere below the range,\nand three hits within the range";
          break;
        case 6:
          // scenes[this.current_scene].fg_text = "Volume:\n\nTime:\n\nTutorial\n\n";
          this.scenes[this.current_scene].fg_text = "";
          break;
        case 7:
          this.scenes[this.current_scene].fg_text = "Username: " + "admin" + "\n\nFirstname: " + this.database.users.admin.firstname + " " + this.database.users.admin.lastname + "\n\n";
          break;
        case 9:
          this.scenes[this.current_scene].fg_text = this.levels[this.current_level - 1].hint;
          break;
        default:

      }

      if (this.current_scene != 8 && this.current_scene != 2 && this.current_scene != 3) {
        this.foreground = this.createTextContainer(this.scenes[this.current_scene].fg_img, this.scenes[this.current_scene].fg_text, "Oldstyle", "32px", "normal", "Saddlebrown", this.scenes[this.current_scene].fg_img.frames.width, this.scenes[this.current_scene].fg_img.frames.height, "center", 0, "center", 0, "image", 0, "menu");
      }

      if (this.current_scene == 2) {
        this.background = this.createImage("res/menu.png", this.backgroundX, this.backgroundY, "center", 0, "center", 0, "image", "menu");
        this.background_left = this.createImage("res/menu-left.png", this.backgroundX, this.backgroundY, "center", 0 - (this.backgroundX), "center", 0, "image", "menu");
        this.background_right = this.createImage("res/menu-right.png", this.backgroundX, this.backgroundY, "center", 0 + (this.backgroundX), "center", 0, "image", "menu");
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

    			this.left_sword_button = this.createButton("res/sword-left.png", "Login", this.buttonX, this.buttonY, "center", -(this.buttonX/2 + 30), "center", (this.buttonY/2 + 200), "image", function() {
    				createjs.Sound.play("sword");
    				var key = document.getElementById('usernameInput').value;
    				if(key in this.database.users) {
    					if(database["users"][key]["password"] == document.getElementById('passwordInput').value) {
    						document.getElementById('usernameInput').value = "";
    						document.getElementById('passwordInput').value = "";
    						// login_error.alpha = 0;
    						// var login_error = this.createTextBlock("0px", "200px", "200px", "600px", "darkred", 30, "normal", "Username and/or Password did not match.\n Please try again.", 0, enable);
    						// message.render = 1;
    						// message.current_user = key;
    						this.changeScene(2);
    					} else {
    						document.getElementById('usernameInput').value = "";
    						document.getElementById('passwordInput').value = "";
    						document.getElementById('errorText').textContent = "Invalid password";
    						// password_input.text = "";
    						// login_error.alpha = 1;
    					}
    				}else {
    					document.getElementById('usernameInput').value = "";
    					document.getElementById('passwordInput').value = "";
    					document.getElementById('errorText').textContent = "Invalid username";
    					// login_error.alpha = 1;
    				}
    			}.bind(this), "menu");

    			this.right_sword_button = this.createButton("res/sword-right.png", "Signup", this.buttonX, this.buttonY, "center", (this.buttonX/2 + 65), "center", (this.buttonY/2 + 200), "image", function() {
    				createjs.Sound.play("sword");
            this.changeScene(1);
    			}.bind(this), "menu");

    			this.secret_button = this.createButton("res/secret_button.png", "", this.backgroundX, 1440, "center", 0, "center", 0, "image", function() {
    				createjs.Sound.play("sword");
            this.changeScene(8);
    			}.bind(this), "menu");

    			// if (mobile) {
    			// 	scale_to_canvas(left_sword_button, "center", 0 - (this.buttonX/2 + 30) * scene_scale_Y, "center", 0 + (this.buttonY/2 + 200) * scene_scale_Y, "smallgui");
    			// 	scale_to_canvas(right_sword_button, "center", 0 + (this.buttonX/2 + 65) * scene_scale_Y, "center", 0 + (this.buttonY/2 + 200) * scene_scale_Y, "smallgui");
    			// } else {

    			break;

    		case 1:

        // password_error.text = "Passwords did not match.\n Please try again.";
        // fieldInput_error.text = "Please fill-in\n every field";

    		// if (mobile) {
    		// 	scale_to_canvas(left_sword_button, "center", 0 - (this.buttonX/2 + 10) * scene_scale_Y, "center", 0 + (this.buttonY/2 + 140) * scene_scale_Y, "gui");
    		// 	scale_to_canvas(right_sword_button, "center", 0 + (this.buttonX/2 + 50) * scene_scale_Y, "center", 0 + (this.buttonY/2 + 140) * scene_scale_Y, "gui");
    		// } else {

    			this.left_sword_button = this.createButton("res/sword-left.png", "Login", this.buttonX, this.buttonY, "center", -(this.buttonX/2 + 30), "center", (this.buttonY/2 + 200), "image", function() {
    				createjs.Sound.play("sword");
    				var key = document.getElementById('usernameInput').value;
    				if(key in this.database.users || key == "") {
    					// document.getElementById('firstnameInput').value = "";
    					// document.getElementById('lastnameInput').value = "";
    					// document.getElementById('usernameInput').value = "";
    					// document.getElementById('passwordInput').value = "";
    					// document.getElementById('confirmInput').value = "";
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
    									changeScene(2);
    								}
    							}
    						}
    					}
    				}
    			}.bind(this), "menu");
            // if(firstname_input.text == "" || lastname_input.text == "" || username_input.text == "" || password_input.text == "" || re_password_input.text == "") {
            //
          	//     fieldInput_error.alpha = 1;
          	//     firstname_input.text = "";
          	//     lastname_input.text = "";
          	//     username_input.text = "";
          	//     password_input.text = "";
          	//     re_password_input.text = "";
            //
          	// } else {
            //
            //   if(password_input.text != re_password_input.text) {
            //
            // 		password_error.alpha = 1;
            // 		fieldInput_error.alpha = 0;
            // 		password_input.text = "";
            // 		re_password_input.text = "";
            //
            //   } else {
            //
            // 		var key = username_input.text;
            //
            // 		database["stats"][key] = {
            // 		    hits: 0,
            // 		    misses: 0
            // 		};
            //
            // 		database["users"][key] = {
            // 		    firstname: firstname_input.text,
            // 		    lastname: lastname_input.text,
            // 		    password: password_input.text
            // 		};
            //
            // 		firstname_input.text = "";
            // 		lastname_input.text = "";
            // 		username_input.text = "";
            // 		password_input.text = "";
            // 		re_password_input.text = "";
            // 		fieldInput_error.alpha = 0;
            // 		password_error.alpha = ;
            // 		message.current_user = key;
            // 		message.render = 0;
            //
            //   }
          	// }
          // });

    		this.right_sword_button = this.createButton("res/sword-right.png", "Signup", this.buttonX, this.buttonY, "center", (this.buttonX/2 + 65), "center", (this.buttonY/2 + 200), "image", function() {
    			// firstname_input.text = "";
    			// lastname_input.text = "";
    			// username_input.text = "";
    			// password_input.text = "";
    			// re_password_input.text = "";
    			// fieldInput_error.alpha = 0;
    			// password_error.alpha = 0;
    			// message.render = 0;
    			createjs.Sound.play("sword");
    			this.changeScene(0);
    		}.bind(this), "menu");

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

    			this.play_button = this.createButton("res/menu-button.png", "Play", this.buttonX, this.buttonY, "center", 0, "center", 0 - 200, "gui", function() { createjs.Sound.play("menu"); this.changeScene(8); }.bind(this), "menu");
    			this.stats_button = this.createButton("res/menu-button.png", "Stats", this.buttonX, this.buttonY, "center", 0, "center", 0 - 100, "gui", function() { createjs.Sound.play("menu"); this.changeScene(4); }.bind(this), "menu");
    			this.h2p_button = this.createButton("res/menu-button.png", "How To Play", this.buttonX, this.buttonY, "center", 0, "center", 0 - 0, "gui", function() { createjs.Sound.play("menu"); this.changeScene(5); }.bind(this), "menu");
    			this.settings_button = this.createButton("res/menu-button.png", "Settings", this.buttonX, this.buttonY, "center", 0, "center", 0 + 100, "gui", function() { createjs.Sound.play("menu"); this.changeScene(6); }.bind(this), "menu");
    			this.logout_button = this.createButton("res/menu-button.png", "Logout", this.buttonX, this.buttonY, "left", (this.buttonX/2 + 10), "top", (this.buttonY/2 + 10), "gui", function() { createjs.Sound.play("menu"); this.changeScene(0); }.bind(this), "menu");
    			this.account_button = this.createButton("res/menu-button.png", "Account", this.buttonX, this.buttonY, "right", 0 - (this.buttonX/2 + 10), "top", (this.buttonY/2 + 10), "gui", function() { createjs.Sound.play("menu"); this.changeScene(7); }.bind(this), "menu");

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

    	    this.end_level_scene = this.createImage("res/login_scroll.png", this.backgroundX, this.backgroundY, "center", 0, "center", 0, "image", "menu");
    	    this.end_level_scene.visible = false;

    	    this.end_level_button = this.createButton("res/login-button.png", "Next Level", this.buttonX, this.buttonY, "center", 0, "center", 0 + 250 * this.scene_scale_Y, "gui", function() { createjs.Sound.play("select"); this.changeScene(8); this.visibleForm(true);}.bind(this), "menu");
    	    this.end_level_button.visible = false;
    	    this.end_level_button.alpha = 0;

    	    this.end_text = this.createText("Good Job!!", "Oldstyle", "65px", "bold", "gold", 10, 10, "center", 0, "center", 0 - 140 * this.scene_scale_Y, "image", "menu");
    	    this.end_text.visible = false;
    	    //end_text.skewX = -5;
    	    this.end_text.skewY = -15;
    	    this.end_text.textAlign = "center";

    	    this.hit_text = this.createText("Total Hits:      ", "Oldstyle", "25px", "", "gold", 10, 10, "center", 0 - 120 * this.scene_scale_Y, "center", 0, "image", "menu");
    	    this.hit_text.visible = false;
    	    this.hit_text.alpha = 0;

    	    this.low_text = this.createText("Total Lows:     ", "Oldstyle", "25px", "", "gold", 10, 10, "center", 0 - 120 * this.scene_scale_Y, "center", 0 + 40 * this.scene_scale_Y, "image", "menu");
    	    this.low_text.visible = false;
    	    this.low_text.alpha = 0;

    	    this.high_text = this.createText("Total Highs:    ", "Oldstyle", "25px", "", "gold", 10, 10, "center", 0 - 120 * this.scene_scale_Y, "center", 0 + 80 * this.scene_scale_Y, "image", "menu");
    	    this.high_text.visible = false;
    	    this.high_text.alpha = 0;

    	    this.pause_menu = this.createImage("res/hit-target-pause-menu.png", this.backgroundX, this.backgroundY, "center", 0, "center", 0, "image", "menu");
    	    this.pause_menu.visible = false;

    	    this.close_button = this.createButton("res/hit-target-pause-close-button.png", "", this.buttonX, this.buttonY, "center", 0 + 445 * this.scene_scale_Y, "center", 0 - 281 * this.scene_scale_Y, "gui", function() {
    				createjs.Sound.play("menu");
    				this.pauseAnimation(false);
    				this.visibleButton(false);
    				this.visibleForm(true);
    	    }.bind(this), "menu");

    	    this.close_button.visible = false;

    	    this.main_menu_button = this.createButton("res/hit-target-pause-button.png", "Main Menu", this.buttonX, this.buttonY, "center", 0, "center", 0 - 180 * this.scene_scale_Y, "gui", function() { createjs.Sound.play("menu"); this.changeScene(2); this.visibleForm(true);}.bind(this), "menu");
    	    this.main_menu_button.visible = false;

    	    this.exit_level_button = this.createButton("res/hit-target-pause-button.png", "Exit Level", this.buttonX, this.buttonY, "center", 0, "center", 0 - 110 * this.scene_scale_Y, "gui", function() { createjs.Sound.play("menu"); this.changeScene(8); this.visibleForm(true);}.bind(this), "menu");
    	    this.exit_level_button.visible = false;

    	    this.settings_button = this.createButton("res/hit-target-pause-button.png", "Settings", this.buttonX, this.buttonY, "center", 0, "center", 0 - 40 * this.scene_scale_Y, "gui", function() { createjs.Sound.play("menu"); this.changeScene(6); this.visibleForm(true);}.bind(this), "menu");
    	    this.settings_button.visible = false;

    	    this.menu_button = this.createButton("res/login-button.png", "Pause", this.buttonX, this.buttonY, "right", -(this.buttonX/2 + 10), "bottom", -(this.buttonY/2 + 10), "gui", function() {
    				createjs.Sound.play("menu");
    				this.pauseAnimation(true);
    				this.visibleButton(true);
    				this.visibleForm(false);
    	    }.bind(this), "menu");

    	    this.hint_button = this.createButton("res/hint-button.png", "Hint", 72, 72, "center", 0 - 313 * this.scene_scale_Y, "center", 0 + 194 * this.scene_scale_Y, "gui", function() { createjs.Sound.play("sword"); this.changeScene(9); this.visibleForm(true); }.bind(this), "menu");
    	    this.hint_button.visible = false;

    			if (this.mobile) {

    				this.ll_number_button = this.createButton("res/number-button-ll.png", "", this.backgroundX, 288, "center", 0, "bottom", 0 - (288/2) * this.scene_scale_Y, "image", function() {
    					if(this.digit > 0)
    						this.digit--;
    					if(this.digit < 0)
    						this.digit = 0;
    					console.log(this.digit);
    				}.bind(this), "menu");

    				this.lr_number_button = this.createButton("res/number-button-lr.png", "", this.backgroundX, 288, "center", 0, "bottom", 0 - (288/2) * this.scene_scale_Y, "image", function() {
    					if(this.digit < 2)
    						this.digit++;
    					if(this.digit > 2)
    						this.digit = 2;
    					console.log(digit);
    				}.bind(this), "menu");

    				this.rl_number_button = this.createButton("res/number-button-rl.png", "", this.backgroundX, 288, "center", 0, "bottom", 0 - (288/2) * this.scene_scale_Y, "image", function() {
    					this.multiplier -= this.adder;
    					document.getElementById("hundredsPlace").textContent = Math.floor(this.multiplier/100 % 10);
    					document.getElementById("tensPlace").textContent = Math.abs(Math.floor(this.multiplier/10 % 10));
    					document.getElementById("onesPlace").textContent = Math.abs(Math.floor(this.multiplier % 10));
    				}.bind(this), "menu");

    				this.rr_number_button = this.createButton("res/number-button-rr.png", "", this.backgroundX, 288, "center", 0, "bottom", 0 - (288/2) * this.scene_scale_Y, "image", function() {
    					this.multiplier += this.adder;
    					document.getElementById("hundredsPlace").textContent = Math.floor(this.multiplier/100 % 10);
    					document.getElementById("tensPlace").textContent = Math.abs(Math.floor(this.multiplier/10 % 10));
    					document.getElementById("onesPlace").textContent = Math.abs(Math.floor(this.multiplier % 10));
    				}.bind(this), "menu");

    			}

    			break;

    		case 4:

    			this.menu_button = this.createButton("res/login-button.png", "Menu", this.buttonX, this.buttonY, "left", (this.buttonX/2 + 10), "bottom", -(this.buttonY/2 + 10), "gui", function() { createjs.Sound.play("menu"); this.changeScene(2); }.bind(this), "menu");

    			break;

    		case 5:

    			this.menu_button = this.createButton("res/login-button.png", "Menu", this.buttonX, this.buttonY, "left", (this.buttonX/2 + 10), "bottom", -(this.buttonY/2 + 10), "gui", function() { createjs.Sound.play("menu"); this.changeScene(2); }.bind(this), "menu");

    			break;

    		case 6:

    			this.menu_button = this.createButton("res/login-button.png", "Menu", this.buttonX, this.buttonY, "left", (this.buttonX/2 + 10), "bottom", -(this.buttonY/2 + 10), "gui", function() { createjs.Sound.play("menu"); this.oneWayScene(); }.bind(this), "menu");

    			break;

    		case 7:

    			this.menu_button = this.createButton("res/login-button.png", "Menu", this.buttonX, this.buttonY, "left", (this.buttonX/2 + 10), "bottom", -(this.buttonY/2 + 10), "gui", function() { createjs.Sound.play("menu"); this.changeScene(2); }.bind(this), "menu");

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

    			this.midground = this.createImage("res/map.png", this.backgroundX, this.backgroundY, "center", 0, "center", 0, "image", "menu");
    			this.foreground = this.createButton("res/map-banner.png", "Select a level", this.backgroundX, 108, "center", 0, "top", 0 + (108/2), "image", function() {}.bind(this), "menu");

    			var reef = this.createSprite(reefS, 120, 108, "center", -480 + 120 / 2, "center", 96 + 108 / 2, "image", "menu");
    			reef.gotoAndPlay(0);

    			var skyland = this.createSprite(skylandS, 180, 120, "center", -243 + 180 / 2, "center", -246 + 120 / 2, "image", "menu");
    			skyland.gotoAndPlay(0);

    			this.menu_button = this.createButton("res/login-button.png", "Menu", this.buttonX, this.buttonY, "left", (this.buttonX/2 + 10), "bottom", -(this.buttonY/2 + 10), "gui", function() { createjs.Sound.play("menu"); this.changeScene(2); }.bind(this), "menu");

    			for (var i = 0; i < this.num_levels; i++) {

    				var temp = this.createButton("res/map-indicator.png", (i + 1).toString(), 24, 24, "center", this.indicator_coordinates[i].x + 24/2, "center", this.indicator_coordinates[i].y + 24/2, "gui", this.levels[i].open.bind(this), "menu");

    				this.indicators.push(temp);

    			}

    			break;

        case 9:

    			this.menu_button = this.createButton("res/login-button.png", "Menu", this.buttonX, this.buttonY, "left", (this.buttonX/2 + 10), "bottom", -(this.buttonY/2 + 10), "gui", function() {
            createjs.Sound.play("menu");
            this.changeScene(3);
            this.pauseAnimation(true);
            this.visibleButton(true);
            this.visibleForm(false);
          }.bind(this), "menu");

          break;

    		default:

    	}

    	this.previous_indicator = this.createImage("res/previous-indicator.png", 24, 24, "center", 0 - 50, "center", 0 + 194, "gui", "menu");
      // this.previous_indicator.addEventListener("click", previousSound);
      this.previous_indicator.visible = false;

    	this.pause_indicator = this.createImage("res/pause-indicator.png", 24, 24, "center", 0, "center", 0 + 194, "gui", "menu");
      // this.pause_indicator.addEventListener("click", playSound);
      this.pause_indicator.visible = false;

    	this.next_indicator = this.createImage("res/next-indicator.png", 24, 24, "center", 0 + 50, "center", 0 + 194, "gui", "menu");
      // this.next_indicator.addEventListener("click", nextSound);
      this.next_indicator.visible = false;

    	this.lute = this.createImage("res/lute.png", 96, 96, "center", 0 + 313, "center", 0 + 194, "gui", "menu");
    	// antiLute = createImage("res/antiLute.png", 96, 96, 2);
      // this.lute.addEventListener("click", muteSound);
      this.lute.visible = false;
    	// antiLute.visible = false;
    	// antiLute.hidden = true;

      this.landscape_warning = new createjs.Shape();

      this.phone_rotation = this.createSprite(this.phone_rotationS, 288, 288, "center", 0, "center", 0, "image", "menu");
      this.stage.removeChild(this.phone_rotation);

    },

    ////////////
    // LEVELS //
    ////////////

    loadLevel: function() {

      this.bg_color = this.levels[this.current_level - 1].color;

      this.loadImage();

      this.end_level_flagS = {
        images: ["res/endgame-flag.png"],
        frames: {width:1920, height:768, count:12, regX: 0, regY:0, spacing:0, margin:0},
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

    // function loadImage() {
    //   var preload = new createjs.LoadQueue();
    //   preload.addEventListener("fileload", handleFileComplete);
    //   preload.loadFile("assets/preloadjs-bg-center.png");
    // }

    // function handleFileComplete(event) {
    //   document.body.appendChild(event.result);
    // }

    createLevel: function() {

      // Level structure in background
      this.structure_center = this.createSprite(this.centerS, this.structureX, this.structureY, "center", 0, "bottom", -this.structureY / 2, "image", "level");
      this.structure_left_center = this.createSprite(this.left_centerS, this.structureX, this.structureY, "center", 0, "bottom", -this.structureY / 2, "image", "level");
      this.structure_right_center = this.createSprite(this.right_centerS, this.structureX, this.structureY, "center", 0, "bottom", -this.structureY / 2, "image", "level");

      // Bad guys in midground
      this.henchman_left = this.createSprite(this.henchmanS, 96, 96, "center", 0 - (96/2 + 625), "bottom", -384 + (24), "image", "level");
      this.henchman_left.gotoAndPlay(0);
      this.henchman_left_center = this.createSprite(this.henchmanS, 96, 96, "center", 0 - (96/2 + 375), "bottom", -384, "image", "level");
      this.henchman_left_center.gotoAndPlay(0);
      this.boss = this.createSprite(this.bossS, 96, 96, "center", 0, "bottom", -384, "image", "level");
      this.boss.gotoAndPlay(0);
      this.henchman_right_center = this.createSprite(this.henchmanS, 96, 96, "center", 0 + (96/2 + 375), "bottom", -384, "image", "level");
      this.henchman_right_center.gotoAndPlay(0);
      this.henchman_right = this.createSprite(this.henchmanS, 96, 96, "center", 0 + (96/2 + 625), "bottom", -384 + (24), "image", "level");
      this.henchman_right.gotoAndPlay(0);

      // Level structure in foreground
      this.structure_left = this.createSprite(this.leftS, this.structureX, this.structureY, "center", 0, "bottom", -this.structureY / 2, "image", "level");
      this.structure_right = this.createSprite(this.rightS, this.structureX, this.structureY, "center", 0, "bottom", -this.structureY / 2, "image", "level");
      this.structure_body = this.createSprite(this.bodyS, this.structureX, this.structureY, "center", 0, "bottom", -this.structureY / 2, "image", "level");
      // structure_banner = this.createSprite(bannerS, this.structureX, this.structureY, "center", 0, "bottom", -this.structureY / 2, "image", "level");
      this.structure_range = this.createTextContainer(this.range_bannerS, "[ #, # ]", "Oldstyle", "32px", "normal", "Gold", 192, 126, "center", -378 + 192 / 2, "bottom", -336 + 126 / 2, "image", 0, "level");
      this.structure_equation_banner = this.createTextContainer(this.equation_bannerS, "# x          = #", "Oldstyle", "26px", "normal", "Gold", 300, 78, "center", -150 + 300 / 2, "bottom", -321 + 78 / 2, "image", 0, "level");
      this.structure_history = this.createTextContainer(this.history_bannerS, "History", "Oldstyle", "18px", "normal", "Gold", 192, 126, "center", 186 + 192 / 2, "bottom", -336 + 126 / 2, "image", 126 / 2, "level");
      this.structure_facade = this.createSprite(this.facadeS, this.structureX, this.structureY, "center", 0, "bottom", -this.structureY / 2, "image", "level");  // Level structure in foreground

      this.firework_low = this.createSprite(this.firework_lowS, this.structureX, this.structureY, "center", 0, "bottom", -this.structureY / 2, "image", "level");
      this.firework_hit = this.createSprite(this.firework_hitS, this.structureX, this.structureY, "center", 0, "bottom", -this.structureY / 2, "image", "level");
      this.firework_high = this.createSprite(this.firework_highS, this.structureX, this.structureY, "center", 0, "bottom", -this.structureY / 2, "image", "level");

      // Main character in foreground
      this.projectile = this.createSprite(this.projectileS, 96, 96, "center", 0, "bottom", 0 - (96/2 + 57), "image", "level");
      this.projectile.gotoAndPlay(0);
      this.catapult = this.createSprite(this.catapultS, 288, 384, "center", 0, "bottom", 0 - (384/2 - 57), "image", "level");

      // number_spacing = 10;
      this.number_spacer = 25;

      for(var i = -25; i <= 25; i++){

      	var temp = this.createText(i.toString(), "Arial", "16px", "bold", "black", this.structureX, this.structureY, "center", 0 - (((this.number_spacer * 48) + 5)), "top", 30, "image", "level");
      	this.number_text.push(temp);
        // number_spacing += 48;
        this.number_spacer--;

      }

      this.structure_score = this.createTextContainer(this.score_bannerS, "Total Lows: 0\nTotal High: 0\nTotal Hits: 0", "Oldstyle", "24px", "normal", "Gold", 192, 126, "left", (10 + 192 / 2), "bottom", -(10 + 126 / 2), "image", 126 / 2, "level");

      this.end_level_flag = this.createSprite(this.end_level_flagS, this.structureX, this.structureY, "center", 0, "center", 0, "image", "level");
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
      this.drag_up = false;

      console.log("HIT: " + this.hit_counter);
      console.log("MU" + this.miss_upper_counter);
      console.log("ML" + this.miss_lower_counter);

      // Need to check for input correctness here
      // No letters or symbols only numbers

      this.valid = true;

      if (this.mobile) {

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

        	this.structure_equation_banner.text = this.multiplicand.toString() + " x          = " + this.solution.toString();

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
          console.log(this.history_list[x]);
          console.log(this.entry);
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

          this.structure_equation_banner.text = this.multiplicand.toString() + " x          = " + this.solution.toString();

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

    checkTutorial: function() {

      // Tutorial
      if (this.play_tutorial) {

        if (this.miss_lower_counter != 1) {

          document.getElementById("tutorialText").textContent = "Try finding any multiplier that produces a solution below the range";

        } else {

          if (this.miss_upper_counter != 1) {

            document.getElementById("tutorialText").textContent = "Try finding any multiplier that produces a solution above the range";

          } else {

            if (this.hit_counter != 3) {

              document.getElementById("tutorialText").textContent = "Try finding 3 multipliers that produce solutions within the range";

            } else {

            }

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

      this.target_x = 0;
      this.hit = false;
      this.miss_upper = false;
      this.miss_lower = false;
      this.hit_counter = 0;
      this.miss_upper_counter = 0;
      this.miss_lower_counter = 0;
      this.projectile_x_speed = 0;

      //plays victory tune
      createjs.Sound.play("win", this.delayWin);

      // udpate global total
      this.database["stats"]["admin"]["hits"] += this. hit_counter;
      this.database["stats"]["admin"]["misses"] += this.miss_lower_counter;
      this.database["stats"]["admin"]["misses"] += this.miss_upper_counter;

    },

    hideBadGuys: function() {

      //Mors omnibus tyrannis
      if (this.hide_knight) {
        this.boss.alpha = 0;
      } else {
        this.boss.alpha = 1;
      }

      if (this.hide_archer1) {
        this.henchman_left_center.alpha = 0;
      } else {
        this.henchman_left_center.alpha = 1;
      }

      if (this.hide_archer2) {
        this.henchman_right_center.alpha = 0;
      } else {
        this.henchman_right_center.alpha = 1;
      }

      if (this.hide_archer3) {
        this.henchman_left.alpha = 0;
      } else {
        this.henchman_left.alpha = 1;
      }

      if (this.hide_archer4) {
        this.henchman_right.alpha = 0;
      } else {
        this.henchman_right.alpha = 1;
      }

    },

    runCatapultAnimation: function() {

      //Catapult projectile animtion
      if (this.fired == true) {
        // if (frame_counter > 9) {
        this.projectile.y -= this.projectile_speed * this.scene_scale_Y;
        if (this.projectile.x < this.target_x) {
          this.projectile.x += this.projectile_x_speed * this.scene_scale_Y;
        } else if (this.projectile.x > this.target_x) {
          this.projectile.x -= this.projectile_x_speed * this.scene_scale_Y;
        }
        this.projectile_speed -= 3;
        // }
      }

    },

    reloadCatapult: function() {

      if (this.catapult.currentFrame == 11){
        this.reload = false;
      }

      if (this.reload) {
        console.log("reload");
        this.fired = false;
        this.projectile.alpha = 0;
        this.projectile.x = this.stage.canvas.width / 2;
        this.projectile.y = this.stage.canvas.height - (96/2 + 57) * this.scene_scale_Y;
        this.projectile_speed = 57;
      } else {
        this.projectile.alpha = 1;
      }

    },

    checkBossFight: function() {

    //   if (boss_fight) {
    //
    //     big_boss = createSprite(big_bossS, this.structureX, this.structureY);
    //     scale_image(big_boss, stage.canvas.width / 2, stage.canvas.height / 2);
    //
    //     console.log("boss");
    //
    //   } else {
    //
    //     changeLevel();
    //
    //   }

    },

    flagAnimation: function(){
      this.end_level_flag.gotoAndPlay(0);
    },

    setBoss: function() {
      this.boss_fight = document.getElementById("bossValue").checked;
    },

    setTutorial: function() {
      this.play_tutorial = document.getElementById("tutorialValue").checked;
    },

    clearMultiplicandBanner: function() {

      // Clear the multiplicand banner
    	var multip_div = document.getElementById("multiplicandText");

    	while (multip_div.firstChild) {

    	   multip_div.removeChild(multip_div.firstChild);

    	}

    },

    remakeMultiplierBanner: function() {

    	var multip_div = document.getElementById("multiplicandText");

      // Remake multiplier for banner
    	var multip = document.createTextNode(this.multiplicand);

      // Append to the range banner
    	multip_div.appendChild(multip);

    	this.structure_equation_banner.text = this.multiplicand.toString() + " x          = " + this.solution.toString();

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
        if (this.mobile) {

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
        var button_text = document.createTextNode("#");
        var history_button = document.createElement("button");
        var history_div = document.createElement("div");
        history_button.className = "dropbtn";
        history_button.addEventListener('click', this.myFunction);
        history_div.className = "dropdown-content";
        history_div.id = "myDropdown";
        history_button.appendChild(button_text);
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
        game_entry_form.className = "scrollMenu";
        game_entry_form.appendChild(game_entry_div);

        // Creates login form to hold username and password divs
        var game_history_form = document.createElement("form");
        game_history_form.id = "historyBanner";
        game_history_form.className = "scrollMenu";
        game_history_form.appendChild(game_history_div);

        // Injecting login form into existing html
        var scene_html = document.getElementById("sceneHTML");
        scene_html.appendChild(game_entry_form);
        scene_html.appendChild(game_history_form);

        if (this.play_tutorial) {
          scene_html.appendChild(tutorial_div);
        }

    },

    visibleForm: function(visible) {

      if(visible) {
    		var scene_html = document.getElementById("sceneHTML");
    		scene_html.hidden = false;
      } else {
    		var scene_html = document.getElementById("sceneHTML");
    		scene_html.hidden = true;
      }

    },

    //Loadbar for loading screen
    loading: function(evt){
      var progbar = document.getElementById("progressBar");
      var perctext = document.getElementById("percentText");
      progressBar.hidden= false;
      progressBackground.hidden = false;
      ldBg.hidden = false;
      progbar.style.width = this.preload.progress * 100 + '%';
      perctext.innerHTML = (Math.floor(this.preload.progress * 100)).toString() + '%';
      if(this.preload.progress * 100  >= 100)
      {
    	  progressBar.hidden = true;
    	  progressBackground.hidden = true;
    	  ldBg.hidden = true;
      }
    },

    resetLevel: function() {

    	this.history_list = [];
    	this.hide_knight = false;
    	this.hide_archer1 = false;
    	this.hide_archer2 = false;
    	this.hide_archer3 = false;
    	this.hide_archer4 = false;
    	this.hit_counter = 0;
    	this.miss_upper_counter = 0;
    	this.miss_lower_counter = 0;

    },

    pauseAnimation: function(paused) {

    	this.henchman_left.paused = paused;
    	this.henchman_left_center.paused = paused;
    	this.boss.paused = paused;
    	this.henchman_right.paused = paused;
    	this.henchman_right_center.paused = paused;
    	this.projectile.paused = paused;

      if(paused){

    		this.structure_center.paused = true;
    		this.structure_left_center.paused = true;
    		this.structure_right_center.paused = true;
    		this.structure_left.paused = true;
    		this.structure_right.paused = true;
    		this.firework_low.paused = true;
        this.firework_hit.paused = true;
        this.firework_high.paused = true;
    		this.catapult.paused = true;

      } else {

    		if(this.structure_center.currentFrame != 0 && this.structure_center.currentFrame != 11)
    	    this.structure_center.paused = false;

    		if(this.structure_left_center.currentFrame != 0 && this.structure_left_center.currentFrame != 11)
    	    this.structure_left_center.paused = false;

    		if(this.structure_right_center.currentFrame != 0 && this.structure_right_center.currentFrame != 11)
    	    this.structure_right_center.paused = false;

    		if(this.structure_left.currentFrame != 0 && this.structure_left.currentFrame != 11)
    	    this.structure_left.paused = false;

    		if(this.structure_right.currentFrame != 0 && this.structure_right.currentFrame != 11)
    	    this.structure_right.paused = false;

    		if(this.catapult.currentFrame != 0 && this.catapult.currentFrame != 11)
    			this.catapult.paused = false;

    		if(this.firework_low.currentFrame != 0 && this.firework_low.currentFrame != 11)
    	    this.firework_low.paused = false;

    		if(this.firework_hit.currentFrame != 0 && this.firework_hit.currentFrame != 11)
    	    this.firework_hit.paused = false;

    		if(this.firework_high.currentFrame != 0 && this.firework_high.currentFrame != 11)
    	    this.firework_high.paused = false;

      }

    },

    visibleButton: function(visible) {

      if(visible) {

    		this.menu_button.visible = false;
    		this.pause_menu.visible = true;
    		this.close_button.visible = true;
    		this.main_menu_button.visible = true;
    		this.exit_level_button.visible = true;
    		this.settings_button.visible = true;
    		this.previous_indicator.visible = true;
    		this.pause_indicator.visible = true;
    		this.next_indicator.visible = true;
    		this.lute.visible = true;
    		//antiLute.visible = true;
    		this.hint_button.visible = true;

      } else {

    		this.menu_button.visible = true;
    		this.pause_menu.visible = false;
    		this.close_button.visible = false;
    		this.main_menu_button.visible = false;
    		this.exit_level_button.visible = false;
    		this.settings_button.visible = false;
    		this.previous_indicator.visible = false;
    		this.pause_indicator.visible = false;
    		this.next_indicator.visible = false;
    		this.lute.visible = false;
    		//antiLute.visible = false;
    		this.hint_button.visible = false;

      }

    },

    ///////////
    // INPUT //
    ///////////

    // Check all the keys to see if they are pressed
  	keyDown: function(evnt) {

      this.keys[evnt.keyCode] = true;

    },

    // Check all the keys to see if they are released
  	keyUp: function(evnt) {

      delete this.keys[evnt.keyCode];

    },

    // Touch start handler
    handleStart: function(evnt) {

      // Prevent the default behavior of the event
      evnt.preventDefault();

      // Logs the touch start location for drag calculations
      this.start_touch = evnt.changedTouches[0].screenY
      console.log("start: " + this.start_touch);

      // Trigger bool to indicate touch event
      this.touch = true;

    },

    // Touch end handler
    handleEnd: function(evnt) {

      // Prevent the default behavior of the event
      evnt.preventDefault();

      // Logs the touch end location for drag calculations
      this.end_touch = evnt.changedTouches[0].screenY
      console.log("end: " + this.end_touch);

      // Trigger bool to indicate drag event
      if (this.end_touch - this.start_touch < -100) {
        this.drag_up = true;
      }

      // Clear touch values
      this.start_touch = this.end_touch = 0;

    },

    ////////////
    // MOBILE //
    ////////////

    // Loads sounds when game starts
    loadSound: function() {

      this.playlist.size = this.playlistSources.length;
      this.playlist.sources = this.playlistSources;
      this.playlist.ids = this.playlistIDs;

      for (i = 0; i < this.playlist.size; i++) {
        createjs.Sound.registerSound(this.playlist.sources[i], this.playlist.ids[i]);
      }

    },

    // Turns on music or plays the current song
    playSound: function() {

      if (this.sound_off) { // runs once to start music

        this.current_song = createjs.Sound.play(this.playlist.ids[this.playlist.current]);
        this.current_song.on("complete", function() {
            this.playlist.current++;
            if (this.playlist.current >= this.playlist.size ) {
              this.playlist.current = 0;
            }
            this.current_song.destroy();
            this.current_song = createjs.Sound.play(this.playlist.ids[this.playlist.current]);
    		this.current_song.volume = this.volume;
        });
        this.sound_off = false;

      } else { // runs every other time to play and pause the current song

      this.current_song.paused = !this.current_song.paused;
    	this.current_song.volume = this.volume;

      }

    },

    // Plays the previous song
    previousSound: function() {

      if (!this.sound_off) {
        this.playlist.current--;
        if (this.playlist.current < 0 ) {
          this.playlist.current = this.playlist.size - 1;
        }
        this.current_song.destroy();
        this.current_song = createjs.Sound.play(this.playlist.ids[this.playlist.current]);
    	this.current_song.volume = this.volume;
    	this.current_song.muted = this.muted;
      }

    },

    // Plays the next song
    nextSound: function() {

      if (!this.sound_off) {
        this.playlist.current++;
        if (this.playlist.current >= this.playlist.size ) {
          this.playlist.current = 0;
        }
        this.current_song.destroy();
        this.current_song = createjs.Sound.play(this.playlist.ids[this.playlist.current]);
      	this.current_song.volume = this.volume;
      	this.current_song.muted = this.muted;
      }

    },

    // Mutes the current song
    muteSound: function() {

      if (!this.sound_off) {
    	  console.log(this.lute.src);
    	if(!this.muted)
    	{
    		this.stage.removeChild(this.lute);
    		this.lute = new createImage("res/antiLute.png", this.luteX, this.luteY);
    		lute.addEventListener("click", this.muteSound);
    		this.scaleGUI();
    	}
    	else
    	{
    		this.stage.removeChild(this.lute);
    		this.lute = new createImage("res/lute.png", this.luteX, this.luteY);
    		this.lute.addEventListener("click", this.muteSound);
    		this.scaleGUI();
    	}
        current_song.muted = !current_song.muted;
    	  this.muted = !this.muted;
      }
    },

    // Sets the volume based on an incomimng value from 0-100
    setVolume: function() {
      this.volume = document.getElementById("volumeSlider").value;
      this.current_song.volume = this.volume;
      console.log(this.volume);
    },

    ////////////
    // MOBILE //
    ////////////

    orientationCheck: function() {

      if (window.innerHeight > window.innerWidth && this.mobile) {

        if(!this.added) {

          this.stage.addChild(this.landscape_warning);
          this.stage.addChild(this.phone_rotation);
          this.phone_rotation.gotoAndPlay(0);
          scene_html = document.getElementById("sceneHTML");
          scene_html.hidden = true;
          this.added = true;

        }

      } else {

        if(this.added){

          this.stage.removeChild(this.landscape_warning);
          this.stage.removeChild(this.phone_rotation);
          scene_html = document.getElementById("sceneHTML");
          scene_html.hidden = false;
          this.added = false;

        }

      }

    },

    // Check to see if the current device is mobile
    mobileCheck: function() {

      // Print out the device if known, if not maybe store it in analytics but at least print it out
      switch (true) {

        case ( /Android/i.test(navigator.userAgent) ):      console.log("Android mobile device");       break;
        case ( /webOS/i.test(navigator.userAgent) ):        console.log("webOS mobile device");         break;
        case ( /iPhone/i.test(navigator.userAgent) ):       console.log("iPhone mobile device");        break;
        case ( /iPad/i.test(navigator.userAgent) ):         console.log("iPad mobile device");          break;
        case ( /iPod/i.test(navigator.userAgent) ):         console.log("iPod mobile device");          break;
        case ( /BlackBerry/i.test(navigator.userAgent) ):   console.log("BlackBerry mobile device");    break;
        case ( /IEMobile/i.test(navigator.userAgent) ):     console.log("Microsoft mobile device");     break;
        case ( /Opera Mini/i.test(navigator.userAgent) ):   console.log("Opera Mini mobile browser");   break;

        default:                                            console.log("Unknown device type");         break;

      }

      // Set the mobile flag
      if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {

        this.mobile = true;

      }

    }

  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

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

/* #renderCanvas {
  width   : 100%;
  height  : 100%;
  touch-action: none;
} */

#demoCanvas {
  width   : 100%;
  height  : 100%;
  touch-action: none;
}

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
  font-size: 3vh;
  color: saddlebrown;
  width: 500px;
}

#equationBanner {
  font-family: "Oldstyle";
  color: transparent;
  position: absolute;
  top: 62.5%;
  left: 50%;
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
  top: 60%;
  left: 68%;
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
  max-width: 200px;
  box-sizing: border-box;
  border: none;
  font-family: "Blackadder";
  font-size: 3vh;
  color: saddlebrown;
  border-bottom: 2px solid saddlebrown;
  background-color: blanchedalmond;
}

#entryInput {
  font-family: "Oldstyle";
  width: 2.5em;
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
  width: 230px;
}

.dropdown-content {
  font-size: 2vh;
  display: none;
  position: absolute;
  background-color: none;
  min-width: 230px;
  overflow: auto;
  border: 0px solid #ddd;
  z-index: 1;
  overflow-y: auto;
  height: 100px;
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  text-align: center;
}

.dropdown a:hover {background-color: #ddd;}

.show {display: block;}

@media only screen and (max-width: 900px) {
  body {
    /* font-size: 15vh; */
  }
  input {
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
  }

  #entryInput {
    font-size: 5vh;
    /* font-family: "Arial"; */
    /* width: 2.5em; */
    /* max-width: 50px */
    /* -moz-appearance:textfield !important; */
  }
}


</style>
