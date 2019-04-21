<template>
  <div id="engineHolder">
    <canvas id="drawingCanvas" :style="style">alternate content</canvas>

    <div id="sceneHTML"></div>

    <div id="ldBg" class="ldscreen" hidden>
      <span id="loadingText" hidden>Loading</span>
      <div id="progressBackground" class="bgbar" hidden>
        <div id="progressBar" class="pgbar" hidden></div>
      </div>
      <span id="percentText">Loading</span>
    </div>

    <!-- <canvas id="changingParametersBasedOnState" :width="w" :height="h" :style="style"></canvas> -->
    <!-- <div id="childThatSendsBackData"> -->
      <!-- <newChild @emittedChildEvent="runParentFunctionOnReturningObject" /> -->
    <!-- </div> -->

  </div>
</template>

<script>

// Static classes
import AssetHandler from '../classes/AssetHandler.js';
import FormHandler from '../classes/FormHandler.js';
import APIHandler from '../classes/APIHandler.js';

// Normal classes
import InputHandler from '../classes/InputHandler.js';
import MobileHandler from '../classes/MobileHandler.js';
import SoundHandler from '../classes/SoundHandler.js';
import GUIHandler from '../classes/GUIHandler.js';
import LevelHandler from '../classes/LevelHandler.js';

// API classes
// import StatService from '../StatService.js';
// import LoginService from '../LoginService.js';

// Game Data
import { sceneData } from '../game_data/scenes.js';
import { levelData } from '../game_data/levels.js';

export default {

  name: 'Engine',

  data () {

    return {

      // Authentication handling
      async: {
        error: ''
      },
      text: '',

      // Current user data
      user: {
        authenticated: false,
        firstname: 'Place',
        lastname: 'Holder',
        username: 'CpnPlchlder',
        hits: 101010101,
        highs: 101010101,
        lows: 101010101,
        badges: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      },

      // Scaling for engine assets
      scene_scale_X: 1.0,
      scene_scale_Y: 1.0,

      // w: 100,
      // h: 200,

      animtions: {
        // ecs: [], // Entity component system for scaling and eventually object storage
        // gcs: [] // GUI component system for scaling and eventually object storage
      },

      style: {
        background: '#aaa'
      }
    }
  },

  // async created() {
  //
  //   try {
  //
  //     this.stats = await StatService.getStats();
  //     console.log(this.stats);
  //
  //     this.users = await LoginService.getUsers();
  //     console.log(this.users);
  //
  //   } catch (err) {
  //
  //     this.async.error = err.message;
  //     console.log(this.async.error);
  //
  //   }
  //
  // },

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

    // this.$emit('pushToEcs', entity_object)

    /////////////////////
    // INITIIALIZATION //
    /////////////////////

    // Set the window resize function to the one
    window.addEventListener('resize', this.resize, false);

    // Grabbing the canvas to set touch controls
    this.drawingCanvas = document.getElementById("drawingCanvas");

    // Grabbing the div that hold the html stuff
    this.scene_html = document.getElementById("sceneHTML");

    // Initialize all the handlers
    this.input = new InputHandler(this.drawingCanvas);
    this.mobile = new MobileHandler();
    this.music = new SoundHandler();
    this.gui = new GUIHandler();
    this.level = new LevelHandler();

    // console.log("initialized.");

    // window.addEventListener('DOMContentLoaded', function() {                  // start game when DOM loads
    //   runGame('renderCanvas');
    // });

    this.ecs = []; // Entity component system for scaling and eventually object storage

    // var landscape_warning;

    /////////////
    // SCALING //
    /////////////

    this.max_scale_Y = 1440;
    this.max_scale_X = 1920;

    this.screen_ratio = this.max_scale_X / this.max_scale_Y

    this.scene_margin_X = 0.0;

    this.added = false;

    this.max_stored = false;

    this.temp_scale = 1;
    this.temp_max = 1440

    ////////////
    // SCENES //
    ////////////

    this.scene_html;

    this.current_scene = 10;
    this.last_scene = 0;

    this.num_scenes = 11;

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
        }.bind(this)
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
        }.bind(this)
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
        }.bind(this)
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
        }.bind(this)
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
        }.bind(this)
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
        }.bind(this)
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
        }.bind(this)
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
        }.bind(this)
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
        }.bind(this)
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
        }.bind(this)
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
        }.bind(this)
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
        }.bind(this)
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
        }.bind(this)
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
        }.bind(this)
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
        }.bind(this)
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
        }.bind(this)
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
        }.bind(this)
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
        }.bind(this)
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
        }.bind(this)
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
        }.bind(this)
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
        }.bind(this)
      }

    ];

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

      this.mobile.mobileCheck(console, navigator);
      this.mobile.orientationCheck(console, window);

      // If window height is greater than width
      if (this.mobile.isPortrait && this.mobile.isMobile) {

        if(!this.added) {

          this.stage.addChild(this.landscape_warning);
          this.stage.addChild(this.phone_rotation);
          this.landscape_warning.graphics.clear()
          this.landscape_warning.graphics.beginFill("#000000").drawRect(0, 0, this.stage.canvas.width, this.stage.canvas.height);
          this.phone_rotation.gotoAndPlay(0);
          this.scene_html = document.getElementById("sceneHTML");
          this.scene_html.hidden = true;
          this.added = true;

        }

      } else {

        if(this.added){

          this.stage.removeChild(this.landscape_warning);
          this.stage.removeChild(this.phone_rotation);
          this.scene_html = document.getElementById("sceneHTML");
          this.scene_html.hidden = false;
          this.added = false;

        }

      }

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
        AssetHandler.scaleAssets(this.level.lcs, this.current_scene, this.mobile.isMobile, this.scene_scale_Y, this.scene_scale_X, this.stage); // Scale scene appropriately
      } // else {
        AssetHandler.scaleAssets(this.ecs, this.current_scene, this.mobile.isMobile, this.scene_scale_Y, this.scene_scale_X, this.stage); // Scale scene appropriately
      // }
      // this.scaleAssets(this.gcs, this.current_scene, this.mobile.isMobile, this.scene_scale_Y, this.scene_scale_X, this.stage); // Scale scene appropriately

      this.stage.update()

    },

    tick: function(event) {

      if (this.current_scene == 0) {

        // console.log(this.user.authenticated);

        if (this.input.keys[13]) {

          createjs.Sound.play("sword");

          var key = document.getElementById('usernameInput').value;

          var text = {
            "uname": document.getElementById('usernameInput').value,
            "pass": document.getElementById('passwordInput').value
          };

          APIHandler.verifyUser(text, this.user, this.async);

        }

        if (this.user.authenticated) {
          this.changeScene(2);
        }

      }

      if (this.current_scene == 1) {

        // console.log(this.user.authenticated);

        if (this.input.keys[13]) {
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
                    APIHandler.createUser(text, this.user, this.async);
                    this.changeScene(2);
                  }
                }
              }
            }
          }
        }

      }

      if (this.current_scene == 3) {

        var y_position = (284 * this.scene_scale_Y).toString() + "px";
        var x_position = (960 * this.scene_scale_Y).toString() + "px";

        // console.log(x_position);

        var game_entry_form = document.getElementById("equationBanner");
        game_entry_form.style.bottom = y_position;
        game_entry_form.style.right = x_position;
        if (!this.mobile.isMobile) {
          document.getElementById("entryInput").focus();
        }

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
        if (this.level.hit_counter >= 3 && this.level.miss_upper_counter >= 1 && this.level.miss_lower_counter >= 1 && this.level.reload == false && this.level.current_level != 0) {

          // udpate global total
          this.user.hits += this.level.hit_counter;
          this.user.highs += this.level.miss_upper_counter;
          this.user.lows += this.level.miss_lower_counter;

          this.level.hit_text.text += this.level.hit_counter.toString();
          this.level.low_text.text += this.level.miss_lower_counter.toString();
          this.level.high_text.text += this.level.miss_upper_counter.toString();

          this.menu_button.visible = false;

          // Show the endgame screen
          this.level.createVictoryBanner(this.scene_scale_X, this.scene_scale_Y, this.user.badges);

	        this.user.badges[(this.level.current_level - 1)] = 1;

          // update database
          APIHandler.updateStats(

            {
              user: this.user.username,
              hits: this.user.hits,
              highs: this.user.highs,
              lows: this.user.lows,
  	          badges: this.user.badges
            },
            this.user,
            this.async

          );

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
          sceneData[this.current_scene].fg_text = "";
          break;
        case 5:
          sceneData[this.current_scene].fg_text = "How To Play: The goal of the game is to get one hit anywhere above the range, one hit anywhere below the range, and three hits within the range";
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

      // Custom scene functionalities
      switch (this.current_scene) {

        case 0: // Login

          FormHandler.createLoginForm();

          break;

        case 1: // Signup

          FormHandler.createSignupForm();

          break;

        case 3: // Game

          FormHandler.createGameForm(
            this.level.multiplicand,
            this.level.sign,
            this.level.equal,
            this.level.solution,
            this.level.history_list,
            this.level.play_tutorial,
            this.mobile.isMobile,
            this.myFunction
          );

          this.level.createLevel(this.stage,
            function() { createjs.Sound.play("select"); this.changeScene(8); this.level.visibleForm(true); this.level.destroyLevel(this.stage); }.bind(this),
            function() { createjs.Sound.play("sword"); this.changeScene(9); this.level.visibleForm(true); }.bind(this),
            function() { createjs.Sound.play("menu"); this.changeScene(2); this.level.visibleForm(true); this.level.destroyLevel(this.stage); }.bind(this),
            function() { createjs.Sound.play("menu"); this.changeScene(6); this.level.visibleForm(true); }.bind(this),
            this.user.authenticated,
            function() { this.menu_button.visible = true; }.bind(this),
            this.music
          );

          break;

        case 6: // Settings

          FormHandler.createSettingsForm(
            this.level.boss_fight,
            this.level.play_tutorial,
            this.level.setTutorial,
            this.level.setBoss,
            this.music.setVolume
          );

          break;

      }

      this.gui.createGUI(this.ecs, this.current_scene, this.stage, this.user, this.async, this.changeScene, this.oneWayScene, this.indicatorFunction, this.level, this.mobile, this.menu_button, this.num_levels, this.levels, this.scene_scale_Y);

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

        this.level.openPauseMenu(this.user.authenticated);

        // this.level.pauseAnimation(true);
        // this.level.visibleButton(true);
        // this.level.visibleForm(false);

      } else if (this.current_scene == 3) {

        this.menu_button.visible = true;
        this.level.makeGameForm(this.mobile.isMobile);
        this.level.remakeMultiplierBanner();
        this.level.remakeRangeBanner();
        this.level.structure_score.text = "Total Lows: " + this.level.miss_lower_counter.toString() + "\nTotal High: " + this.level.miss_upper_counter.toString() + "\nTotal Hits: " + this.level.hit_counter.toString();

      }

    },

    destroyScene: function() {

      this.clearHtml();

      this.stage.removeAllChildren();

      this.ecs = [];

    },

    clearHtml: function() {

      this.scene_html = document.getElementById("sceneHTML");

      while (this.scene_html.firstChild) {

        this.scene_html.removeChild(this.scene_html.firstChild);

      }

    },

    indicatorFunction: function(newL) {

      this.level.generated = false;
      createjs.Sound.play("select");
      this.level.current_level = newL;
      this.level.resetLevel();
      this.changeScene(3);

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
</style>
