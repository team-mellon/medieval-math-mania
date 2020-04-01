//////////////////
// LEVELHANDLER //
//////////////////

//
import AssetHandler from './AssetHandler.js';

//
import { tutorialSteps, tutorialCorrections } from '../game_data/tutorial.js';

// Global constants
import constants from '../game_data/constants.js';

class LevelHandler {

  constructor() {

    this.lcs = []; // Level component system for scaling and eventually object storage

    this.preload = new createjs.LoadQueue();
    this.preload.on("progress", this.loading.bind(this));

    //Setting properties for delays for sounds
    this.delayRe = new createjs.PlayPropsConfig().set({delay : 250});	//reload delay
    this.delayIn = new createjs.PlayPropsConfig().set({delay : 1000});	//inner crumble delay
    this.delayOut = new createjs.PlayPropsConfig().set({delay : 1250});	//outer crumble delay
    this.delayWin = new createjs.PlayPropsConfig().set({delay : 2000});

    this.current_level = 1;

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
    this.projectile_speed = 60;
    this.projectile_x_speed = 0;

    this.boss_fight = false;
    this.play_tutorial = false;

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
    this.history_list2 = [];

    this.valid = true;

    this.target_x = 0;

  	//Need to make setting for this
  	this.hints_on = true;

    this.hint_shown = false;

    this.step_run = [false, false, false, false, false];
    this.tower_down = [false, false, false, false, false];

    this.level_math = [

      { // Tutorial
        // Exactly one multiple of multiplicand in range, single digit multiplicand
        math: function () {
          this.multiplicand = 1;
          this.lower = 5;
          this.upper = 10;
        }.bind(this)
      },

      { // City
        // Exactly one multiple of multiplicand in range, single digit multiplicand
        math: function () {
          this.multiplicand = Math.floor(Math.random() * 7) + 2;
          this.multiple = Math.floor(Math.random() * 7) + 2;
          this.lower = (this.multiple * this.multiplicand) - Math.floor(this.multiplicand/2);
          this.upper = (this.multiple * this.multiplicand) + Math.ceil(this.multiplicand/2);
          if(this.lower == this.upper) {
            this.upper++;
          }
        }.bind(this)
      },

      { // Grasslands
        // No multiples of multiplicand in range, single digit multiplicand
        math: function () {
          this.multiplicand = Math.floor(Math.random() * 7) + 2;
          this.multiple = Math.floor(Math.random() * 7) + 2;
          this.lower = (this.multiple * this.multiplicand) + 1;
          this.upper = (this.multiple * (this.multiplicand+1)) - 1;
          if(this.lower == this.upper) {
            this.upper++;
          }
        }.bind(this)
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
        }.bind(this)
      },

      { // Sea
        // Starting number is a two-digit number, target range goes from 0 to a single-digit positive integer.
        math: function () {
          this.multiplicand = Math.floor(Math.random() * 90) + 10;
          this.lower = 0;
          this.upper = Math.ceil(Math.random() * 7) + 2;
          if(this.lower == this.upper) {
            this.upper++;
          }
        }.bind(this)
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
          if(this.lower == this.upper) {
            this.upper++;
          }
        }.bind(this)
      },

      { // Summit
        /*Starting number is a single-digit number n, target range contains 100n,
        and the range makes it so there is only one integer answer
        (i.e. the lower bound is above 100n − n and the upper bound is below 100n + n.*/
        math: function () {
          this.multiplicand = Math.floor(Math.random() * 7) + 2;
          this.multiple = 100 * this.multiplicand;
          this.lower = this.multiple - Math.floor(this.multiplicand/2);
          this.upper = this.multiple + Math.ceil(this.multiplicand/2);
          if(this.lower == this.upper) {
            this.upper++;
          }
        }.bind(this)
      },

      { // Cave
        //Starting number is a two-digit number, target range contains 0 (flanked by single-digit integers)
        math: function () {
          this.multiplicand = Math.floor(Math.random() * 90) + 10;
          this.lower = -Math.abs(Math.floor(Math.random() * 7) + 2);
          this.upper = Math.floor(Math.random() * 7) + 2;
          if(this.lower == this.upper) {
            this.upper++;
          }
        }.bind(this)
      },

      { // Forest
        //Starting number is a two-digit number, target range numbers are both 3-digit, with no integer
        math: function () {
          this.multiplicand = Math.round((Math.random() * 90)) + 10;
          this.lower = (Math.round((Math.random() * 90)+ 10 * 11) / 10);
          if(this.lower % 1 == 0) {
            this.lower += 0.7;
          }
          this.upper = Math.round((this.lower * this.lower/8)*10 + this.lower/2) / 10;
          if(this.upper % 1 == 0) {
            this.upper += 0.4;
          }
          if(this.lower == this.upper) {
            this.upper++;
          }
        }.bind(this)
      },

      { // Alpine
        //Starting number is a three-digit number, target range goes from 0 to a single-digit positive integer.
        math: function () {
          this.multiplicand = Math.floor((Math.random() * 900) + 100);
          this.lower = 0;
          this.upper = Math.floor(Math.random() * 7) + 2;
          if(this.lower == this.upper) {
            this.upper++;
          }
        }.bind(this)
      },

      { // Woods
        /*Starting number is a number between 0 and .1 with three decimal places. Lower bound of target
        range is 1000 times the starting number, and upper bound is one more than the lower bound. */
        math: function () {
          this.multiplicand = Math.floor((Math.random() * 990) + 10) / 1000;
          this.lower = 1000 * this.multiplicand;
          this.upper = this.lower + 1;
          if(this.lower == this.upper) {
            this.upper++;
          }
        }.bind(this)
      },

      { // Swamp
        /*Starting number is a number between 10 and 100 with one decimal place. Lower bound of target
        range is 1000 times the starting number, and upper bound is one more than the lower bound.*/
        math: function () {
          this.multiplicand = Math.floor(Math.random() * 90 * 10 + 10) / 10;
          this.lower = 1000 * this.multiplicand;
          this.upper = this.lower + 1;
          if(this.lower == this.upper) {
            this.upper++;
          }
        }.bind(this)
      },

      { // Deadlands
        /*Starting number is a whole number greater than 1,000,000. Target range contains the number which is .0001 times the size of the starting number.
        The lower bound may be up to 50 less than this value and the upper bound may be up to 50 greater than this value.*/
        math: function () {
          this.multiplicand = Math.floor(Math.random() * 10000000);
          this.lower = (Math.floor(this.multiplicand * 0.0001)) - (Math.floor(Math.random() * 50) + 10);
          this.upper = (Math.ceil(this.multiplicand * 0.0001)) + (Math.floor(Math.random() * 50) + 10);
          if(this.lower == this.upper) {
            this.upper++;
          }
        }.bind(this)
      },

      { // Sky
        /*Starting number is an integer less than 200. Target range contains the number which is half the value
        with an overall range less than 10. */
        math: function () {
          this.multiplicand = Math.floor(Math.random() * 100 + 100);
          this.lower = Math.floor(this.multiplicand / 2) - 4;
          this.upper = Math.ceil(this.multiplicand / 2) + 4;
          if(this.lower == this.upper) {
            this.upper++;
          }
        }.bind(this)
      },

      { // Underwater
        /*Starting number is a number less than 10 with one decimal place.
        Target range has three-digit bounding numbers, does not contain an
        integer multiple of the starting number, and the range of the interval is 1.*/
        math: function () {
          this.multiplicand = Math.floor(Math.random() * 90 + 9) / 10;
          this.lower = Math.floor(Math.random() * 900 + 100);
          this.upper = this.lower + 1;
          if(this.lower == this.upper) {
            this.upper++;
          }
        }.bind(this)
      },

      { // Fungi
        /*Starting number is a negative single-digit integer. Target range contains only positive values, one of
        which is a multiple of the starting number.*/
        math: function ()  {
          this.multiplicand = -Math.abs(Math.floor(Math.random() * 7) + 2);
          this.lower = this.multiplicand * this.multiplicand;
          this.upper = this.lower + (Math.ceil(Math.random() * 7) + 2);
          if(this.lower == this.upper) {
            this.upper++;
          }
        }.bind(this)
      },

      { // Tundra
        /*Starting number is a positive two-digit integer. Target range is bounded by two-digit negative integers
        5 away from each other.*/
        math: function () {
          this.multiplicand = Math.floor(Math.random() * 90 + 9);
          this.lower = -Math.abs(Math.floor(Math.random() * 84) + 15);
          this.upper = this.lower + 5;
          if(this.lower == this.upper) {
            this.upper++;
          }
        }.bind(this)
      },

      { // Tarpit
        /*Starting number is a number between -100 and -10 with one decimal place. Target range bounds are
        any two integers between -20 and 0.*/
        math: function () {
          this.multiplicand = -Math.abs(Math.floor(Math.random() * 90) + 10);
          this.lower = -Math.abs(Math.floor(Math.random() * 10) + 10);
          this.upper = -Math.abs(Math.ceil(Math.random() * 10));
          if(this.lower == this.upper) {
            this.upper++;
          }
        }.bind(this)
      },

      { // Desert
        /*Starting number is a number between -100 and -10 with one decimal place. Target range bounds are
        any two integers between 0 and 20. */
        math: function () {
          this.multiplicand = -Math.abs(Math.floor(Math.random() * 90 * 10 + 10) / 10);
          this.lower = Math.floor(Math.random() * 10);
          this.upper = Math.ceil(Math.random() * 10 + 10);
          if(this.lower == this.upper) {
            this.upper++;
          }
        }.bind(this)
      },

      { // Boreal
        /*Starting number is an integer between -100 and -10 with one decimal place. Target range bounds are
        positive numbers between 0 and 1 with two decimal places that are one hundredth apart. */
        math: function () {
          this.multiplicand = -Math.abs(Math.floor(Math.random() * 90 * 10 + 10) / 10);
          this.lower = Math.floor((Math.random() * 90) + 9) / 100;
          this.upper = Math.ceil((this.lower + 0.01)* 100)/100;
          if(this.lower == this.upper) {
            this.upper++;
          }
        }.bind(this)
      },

      { // Monolith
        /*Starting number is any positive three digit integer. Target range is bounded by two numbers between
        -10 and -5, with three decimal places, and within one hundredth of each other. */
        math: function () {
          this.multiplicand = Math.floor(Math.random() * 900) + 100;
          this.lower = -Math.abs((Math.floor(Math.random() * 10000) + 5000) /1000);
          this.upper = this.lower + 0.01;
          if(this.lower == this.upper) {
            this.upper++;
          }
        }.bind(this)
      }

    ];

  }

  ////////////
  // LEVELS //
  ////////////

  loadLevel () {

    // this.bg_color = levelData[this.current_level - 1].color;

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
      framerate: 12
    };

    this.centerS = {
      images: ["res/level" + this.current_level + "/center.png"],
      frames: {width:750, height:750, count:6, regX: 0, regY:0, spacing:0, margin:0},
      framerate: 6
    };

    this.left_centerS = {
      images: ["res/level" + this.current_level + "/left-center.png"],
      frames: {width:600, height:600, count:6, regX: 0, regY:0, spacing:0, margin:0},
      framerate: 6
    };

    this.right_centerS = {
      images: ["res/level" + this.current_level + "/right-center.png"],
      frames: {width:600, height:600, count:6, regX: 0, regY:0, spacing:0, margin:0},
      framerate: 6
    };

    this.bannerS = {
      images: ["res/banners.png"],
      frames: {width:1920, height:768, count:1, regX: 0, regY:0, spacing:0, margin:0},
      framerate: 6
    };

    this.range_bannerS = {
      images: ["res/range-banner.png"],
      frames: {width:288, height:126, count:1, regX: 0, regY:0, spacing:0, margin:0},
      framerate: 6
    };

    this.equation_bannerS = {
      images: ["res/equation-banner.png"],
      frames: {width:444, height:78, count:1, regX: 0, regY:0, spacing:0, margin:0},
      framerate: 6
    };

    this.history_bannerS = {
      images: ["res/history-banner.png"],
      frames: {width:288, height:126, count:1, regX: 0, regY:0, spacing:0, margin:0},
      framerate: 6
    };

    this.bodyS = {
      images: ["res/level" + this.current_level + "/body.png"],
      frames: {width:1320, height:450, count:6, regX: 0, regY:0, spacing:0, margin:0},
      framerate: 6
    };

    this.leftS = {
      images: ["res/level" + this.current_level + "/left.png"],
      frames: {width:480, height:900, count:6, regX: 0, regY:0, spacing:0, margin:0},
      framerate: 6
    };

    this.rightS = {
      images: ["res/level" + this.current_level + "/right.png"],
      frames: {width:480, height:900, count:6, regX: 0, regY:0, spacing:0, margin:0},
      framerate: 6
    };

    this.facadeS = {
      images: ["res/level" + this.current_level + "/facade.png"],
      frames: {width:1920, height:210, count:6, regX: 0, regY:0, spacing:0, margin:0},
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

    this.tutorial_menuS = {
      images: ["res/tutorial-menu.png"],
      frames: {width:900, height:300, count:1, regX: 0, regY:0, spacing:0, margin:0},
      framerate: 6
    };

    this.tutorial_numbpadS = {
      images: ["res/numbpad.png"],
      frames: {width:288, height:384, count:1, regX: 0, regY:0, spacing:0, margin:0},
      framerate: 6
    };

    this.tutorial_enterkeyS = {
      images: ["res/enter.png"],
      frames: {width:192, height:192, count:1, regX: 0, regY:0, spacing:0, margin:0},
      framerate: 6
    };

    this.number_text = [];

  }

  loadImage () {

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

  }

  createLevel (stage, leave_to_map, leave_to_hint, leave_to_menu, leave_to_settings, user_authentication, menu_button, music) {

    console.log("LCS length: " + this.lcs.length);
    console.log(stage);

    // Level structure in background
    this.structure_center = AssetHandler.createSprite(this.centerS, this.centerS.frames.width, this.centerS.frames.height, "center", -360 + (this.centerS.frames.width / 2), "bottom", -900 + (this.centerS.frames.height / 2), "image", this.lcs, stage);
    this.structure_left_center = AssetHandler.createSprite(this.left_centerS, this.left_centerS.frames.width, this.left_centerS.frames.height, "center", -660 + (this.left_centerS.frames.width / 2), "bottom", -750 + (this.left_centerS.frames.height / 2), "image", this.lcs, stage);
    this.structure_right_center = AssetHandler.createSprite(this.right_centerS, this.right_centerS.frames.width, this.right_centerS.frames.height, "center", 660 - (this.right_centerS.frames.width / 2), "bottom", -750 + (this.right_centerS.frames.height / 2), "image", this.lcs, stage);

    // Bad guys in midground
    this.henchman_left_center = AssetHandler.createSprite(this.henchmanS, 96, 96, "center", 0 - (96/2 + 375), "bottom", -384, "image", this.lcs, stage);
    this.henchman_left_center.gotoAndPlay(0);
    this.boss = AssetHandler.createSprite(this.bossS, 96, 96, "center", 0, "bottom", -384, "image", this.lcs, stage);
    this.boss.gotoAndPlay(0);
    this.henchman_right_center = AssetHandler.createSprite(this.henchmanS, 96, 96, "center", 0 + (96/2 + 375), "bottom", -384, "image", this.lcs, stage);
    this.henchman_right_center.gotoAndPlay(0);

    // Level structure in foreground
    this.structure_left = AssetHandler.createSprite(this.leftS, this.leftS.frames.width, this.leftS.frames.height, "center", -960 + (this.leftS.frames.width / 2), "bottom", -(this.leftS.frames.height / 2), "image", this.lcs, stage);
    this.structure_right = AssetHandler.createSprite(this.rightS, this.rightS.frames.width, this.rightS.frames.height, "center", 960 - (this.rightS.frames.width / 2), "bottom", -(this.rightS.frames.height / 2), "image", this.lcs, stage);

    this.henchman_left = AssetHandler.createSprite(this.henchmanS, 96, 96, "center", 0 - (96/2 + 705), "bottom", -207 + (24), "image", this.lcs, stage);
    this.henchman_left.gotoAndPlay(0);
    this.henchman_right = AssetHandler.createSprite(this.henchmanS, 96, 96, "center", 0 + (96/2 + 705), "bottom", -207 + (24), "image", this.lcs, stage);
    this.henchman_right.gotoAndPlay(0);

    this.structure_body = AssetHandler.createSprite(this.bodyS, this.bodyS.frames.width, this.bodyS.frames.height, "center", 0, "bottom", -this.bodyS.frames.height / 2, "image", this.lcs, stage);
    // structure_banner = AssetHandler.createSprite(bannerS, constants.structureX, constants.structureY, "center", 0, "bottom", -constants.structureY / 2, "image", this.lcs, stage);
    this.structure_range = AssetHandler.createTextContainer(this.range_bannerS, "[ #, # ]", "Oldstyle", "32px", "normal", "Gold", 288, 126, "center", -234 - 288 / 2, "bottom", -336 + 126 / 2, "image", 0, this.lcs, stage);
    // this.structure_equation_banner = AssetHandler.createTextContainer(this.equation_bannerS, "# x                  = #", "Oldstyle", "26px", "normal", "Gold", 300, 78, "center", -150 + 300 / 2, "bottom", -321 + 78 / 2, "image", 0, this.lcs, stage);
    this.structure_equation_banner = AssetHandler.createTextContainer(this.equation_bannerS, "# x                  = #", "Oldstyle", "26px", "normal", "Gold", 444, 78, "center", -222 + 444 / 2, "bottom", -321 + 78 / 2, "image", 0, this.lcs, stage);
    this.structure_history = AssetHandler.createTextContainer(this.history_bannerS, "History", "Oldstyle", "18px", "normal", "Gold", 288, 126, "center", 234 + 288 / 2, "bottom", -336 + 126 / 2, "image", 126 / 2, this.lcs, stage);
    this.structure_facade = AssetHandler.createSprite(this.facadeS, this.facadeS.frames.width, this.facadeS.frames.height, "center", 0, "bottom", -this.facadeS.frames.height / 2, "image", this.lcs, stage);  // Level structure in foreground

    this.firework_low = AssetHandler.createSprite(this.firework_lowS, constants.structureX, constants.structureY, "center", 0, "top", constants.structureY / 2, "image", this.lcs, stage);
    this.firework_hit = AssetHandler.createSprite(this.firework_hitS, constants.structureX, constants.structureY, "center", 0, "top", constants.structureY / 2, "image", this.lcs, stage);
    this.firework_high = AssetHandler.createSprite(this.firework_highS, constants.structureX, constants.structureY, "center", 0, "top", constants.structureY / 2, "image", this.lcs, stage);

    // Main character in foreground
    this.projectile = AssetHandler.createSprite(this.projectileS, 96, 96, "center", 0, "bottom", 0 - (96/2 + 57), "image", this.lcs, stage);
    this.projectile.gotoAndPlay(0);
    this.catapult = AssetHandler.createSprite(this.catapultS, 288, 384, "center", 0, "bottom", 0 - (384/2 - 57), "image", this.lcs, stage);

    this.background = AssetHandler.createImage("res/numberline.png", constants.backgroundX, 24, "center", 0, "top", 24 / 2, "image", this.lcs, stage);

    this.number_spacer = 25;

    for(var i = -25; i <= 25; i++){

      var temp = AssetHandler.createText(i.toString(), "Arial", "16px", "bold", "black", constants.structureX, constants.structureY, "center", 0 - (((this.number_spacer * 48) + 5)), "top", 30, "image", this.lcs, stage);
      this.number_text.push(temp);
      this.number_spacer--;

    }

    this.structure_score = AssetHandler.createTextContainer(this.score_bannerS, "Total Lows: 0\nTotal High: 0\nTotal Hits: 0", "Oldstyle", "24px", "normal", "Gold", 192, 126, "left", (10 + 192 / 2), "bottom", -(10 + 126 / 2), "image", 126 / 2, this.lcs, stage);

    this.end_level_flag = AssetHandler.createSprite(this.end_level_flagS, constants.structureX, constants.structureY, "center", 0, "center", 0, "image", this.lcs, stage);
    this.end_level_flag.visible = false;

    this.end_level_scene = AssetHandler.createImage("res/login_scroll.png", constants.backgroundX, constants.backgroundY, "center", 0, "center", 0, "image", this.lcs, stage);
    this.end_level_scene.visible = false;

    this.end_level_button = AssetHandler.createButton("res/login-button.png", "Next Level", constants.buttonX, constants.buttonY, "center", 0, "center", 240, "gui", leave_to_map, this.lcs, stage);
    this.end_level_button.visible = false;
    this.end_level_button.alpha = 0;

    var sting = this.victoryGenerator();  // temp fix for sending victory string to function

    this.end_text = AssetHandler.createText(sting, "Oldstyle", "65px", "bold", "gold", 10, 10, "center", 0, "center", 0 - 140, "image", this.lcs, stage);
    this.end_text.visible = false;
    //end_text.skewX = -5;
    this.end_text.skewY = -15;
    this.end_text.textAlign = "center";

    this.hit_text = AssetHandler.createText("Total Hits:      ", "Oldstyle", "25px", "", "gold", 10, 10, "center", 0 - 120, "center", 0, "image", this.lcs, stage);
    this.hit_text.visible = false;
    this.hit_text.alpha = 0;

    this.low_text = AssetHandler.createText("Total Lows:     ", "Oldstyle", "25px", "", "gold", 10, 10, "center", 0 - 120, "center", 0 + 40, "image", this.lcs, stage);
    this.low_text.visible = false;
    this.low_text.alpha = 0;

    this.high_text = AssetHandler.createText("Total Highs:    ", "Oldstyle", "25px", "", "gold", 10, 10, "center", 0 - 120, "center", 0 + 80, "image", this.lcs, stage);
    this.high_text.visible = false;
    this.high_text.alpha = 0;

    this.badge_text = AssetHandler.createText("Congratulations! You earned a badge!", "Oldstyle", "32px", "", "gold", 10, 10, "center", 0 - 260, "center", 0 + 140, "image", this.lcs, stage);
    this.badge_text.visible = false;
    this.badge_text.alpha = 0;

    this.tutorial_menu = AssetHandler.createTextContainer(this.tutorial_menuS, "The tutorial is broken", "Oldstyle", "32px", "normal", "Saddlebrown", 900, 300, "center", 0, "top", (300 / 2) + constants.buttonY , "image", 100, this.lcs, stage);
    this.tutorial_menu.visible = false;

    this.tutorial_numbpad = AssetHandler.createSprite(this.tutorial_numbpadS, 288, 384, "left", (288 / 2) + 100, "top", (384 / 2) + 100, "image", this.lcs, stage);
    // this.tutorial_numbpad.visible = false;
    this.tutorial_numbpad.alpha = 0;

    this.tutorial_enterkey = AssetHandler.createSprite(this.tutorial_enterkeyS, 192, 192, "right", -(288 / 2) - 100, "top", (384 / 2) + 100, "image", this.lcs, stage);
    // this.tutorial_enterkey.visible = false;
    this.tutorial_enterkey.alpha = 0;

    this.pause_menu = AssetHandler.createImage("res/hit-target-pause-menu.png", constants.backgroundX, constants.backgroundY, "center", 0, "center", 0, "image", this.lcs, stage);
    this.pause_menu.visible = false;

    this.close_button = AssetHandler.createButton("res/hit-target-pause-close-button.png", "", constants.buttonX, constants.buttonY, "center", 0 + 456, "center", 0 - 288, "gui", function() {
      createjs.Sound.play("menu");
      this.pauseAnimation(false);
      this.visibleButton(false, user_authentication);
      this.visibleForm(true);
      menu_button();
    }.bind(this), this.lcs, stage);
    this.close_button.visible = false;

    this.exit_level_button = AssetHandler.createButton("res/hit-target-pause-button.png", "Exit Level", constants.buttonX, constants.buttonY, "center", 0, "center", 0 - 180, "gui", leave_to_map, this.lcs, stage);
    this.exit_level_button.visible = false;

    this.settings_button = AssetHandler.createButton("res/hit-target-pause-button.png", "Settings", constants.buttonX, constants.buttonY, "center", 0, "center", 0 - 110, "gui", leave_to_settings, this.lcs, stage);
    this.settings_button.visible = false;

    if (user_authentication) {

      this.main_menu_button = AssetHandler.createButton("res/hit-target-pause-button.png", "Main Menu", constants.buttonX, constants.buttonY, "center", 0, "center", 0 - 40, "gui", leave_to_menu, this.lcs, stage);
      this.main_menu_button.visible = false;

    }

    // this.hint_button = AssetHandler.createButton("res/hint-button.png", "Hint", 72, 72, "center", 0 - 313, "center", 0 + 194, "gui", leave_to_hint, this.lcs, stage);
    // this.hint_button.visible = false;

    this.previous_indicator = AssetHandler.createImage("res/previous-indicator.png", 24, 24, "center", 0 - 50, "center", 0 + 194, "gui", this.lcs, stage);
    this.previous_indicator.addEventListener("click", function () { music.previousSound() });
    this.previous_indicator.visible = false;

    this.pause_indicator = AssetHandler.createImage("res/pause-indicator.png", 24, 24, "center", 0, "center", 0 + 194, "gui", this.lcs, stage);
    this.pause_indicator.addEventListener("click", function () { music.playSound() });
    this.pause_indicator.visible = false;

    this.next_indicator = AssetHandler.createImage("res/next-indicator.png", 24, 24, "center", 0 + 50, "center", 0 + 194, "gui", this.lcs, stage);
    this.next_indicator.addEventListener("click", function () { music.nextSound() });
    this.next_indicator.visible = false;

    this.lute = AssetHandler.createImage("res/lute.png", 96, 96, "center", 0 + 313, "center", 0 + 194, "gui", this.lcs, stage);
    // antiLute = createImage("res/antiLute.png", 96, 96, 2);
    this.lute.addEventListener("click", function () { music.muteSound() });
    this.lute.visible = false;
    // antiLute.visible = false;
    // antiLute.hidden = true;

  }

  // changeLevel: function(new_level) {
  //
  //   this.level.resetLevel();
  //
  //   this.level.current_level++;
  //
  //   if (this.level.current_level > constants.num_levels) {
  //     this.level.current_level = 1;
  //   }
  //
  //   this.bg_color = levelData[this.level.current_level - 1].color;
  //
  //   this.level.loadLevel();
  //   this.destroyScene();
  //   this.createScene();
  //   this.resize();
  //
  // },

  destroyLevel (stage) {

    for (var i = 0; i < this.lcs.length; i++) {

      stage.removeChild(this.lcs[i].object)

    }

    this.lcs = [];

  }

  //////////
  // GAME //
  //////////

  // randomizeRangeAndMultiplier () {
  //
  //   // Generate new range
  //   this.rand_num1 = Math.floor((Math.random() * 10) + 1);
  //   this.rand_num2 = Math.floor((Math.random() * 100) + 1);
  //   this.multiplicand = Math.floor(Math.random() * 11);
  //   this.lower = this.rand_num1 * this.rand_num2;
  //   this.upper = this.rand_num1 * (this.rand_num2 + 3);
  //
  //   var multip_div = document.getElementById("multiplicandText");
  //   while (multip_div.firstChild) {
  //     multip_div.removeChild(multip_div.firstChild);
  //   }
  //
  //   var multip = document.createTextNode(this.multiplicand);
  //   multip_div.appendChild(multip);
  //
  // }

  runInput (isMobile, leave_to_hint) {

    console.log("HIT: " + this.hit_counter);
    console.log("MU" + this.miss_upper_counter);
    console.log("ML" + this.miss_lower_counter);

    // Need to check for input correctness here
    // No letters or symbols only numbers

    this.valid = true;

    if (isMobile) {

      // // for (var x in this.history_list) {
      //   // console.log(this.history_list[x]);
      //   // console.log(this.entry);
      //   // if (multiplier == history_list[x]){
      //   //   valid = false;
      //   // }
      // // }
      //
      // if (this.valid) {
      //
      //   // Add to history
      //   // console.log(this.history_list);
      //   this.history_list.unshift(this.multiplier);
      //   var dropdown = document.getElementById("myDropdown");
      //   var history_entry = document.createTextNode(this.multiplier);
      //   var line_break = document.createElement("br");
      //   dropdown.appendChild(history_entry);
      //   dropdown.appendChild(line_break);
      //
      //   // Actual math
      //   this.solution = this.multiplier * this.multiplicand;
      //   console.log(this.solution);
      //   this.solution = Math.floor10(this.solution, -1);
      //   console.log(this.solution);
      //
      //   var solut_div = document.getElementById("solutionText");
      //   while (solut_div.firstChild) {
      //     solut_div.removeChild(solut_div.firstChild);
      //   }
      //
      //   var solut = document.createTextNode(solution);
      //   solut_div.appendChild(solut);
      //
      //   this.remakeMultiplierBanner()
      //
      //   // this.structure_equation_banner.getChildAt(1).text = this.multiplicand.toString() + " x                  = " + this.solution.toString();
      //
      //   // this.makeGameForm();
      //
      //   if (this.solution <= this.upper && this.solution >= this.lower) {
      //     this.hit = true;
      //     console.log("hit");
      //     this.catapult.gotoAndPlay(0);
      //     // Triggering other fired events
      //     this.fired = true;
      //   }
      //   else if (this.solution > this.upper) {
      //     this.miss_upper = true;
      //     console.log("miss upper");
      //     this.catapult.gotoAndPlay(0);
      //     // Triggering other fired events
      //     this.fired = true;
      //   }
      //   else if (this.solution < this.lower) {
      //     this.miss_lower = true;
      //     console.log("miss lower");
      //     this.catapult.gotoAndPlay(0);
      //     // Triggering other fired events
      //     this.fired = true;
      //   }
      //
      //   this.multiplier = 0;
      //   document.getElementById("hundredsPlace").textContent = Math.floor(this.multiplier/100 % 10);
      //   document.getElementById("tensPlace").textContent = Math.abs(Math.floor(this.multiplier/10 % 10));
      //   document.getElementById("onesPlace").textContent = Math.abs(Math.floor(this.multiplier % 10));
      //
      // }

    } else {

      // Parse entry
      var entry = parseFloat(document.getElementById("entryInput").value);
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

        //Check against history
        if (entry == parseFloat(this.history_list[x])) {
          this.valid = false;
        }
      }
      // Animate the catapult

      if (this.entry_is_correct && this.valid) {

        this.multiplier = document.getElementById("entryInput").value;

        // Add to history

        this.history_list.unshift(this.multiplier);
        console.log(this.history_list);

        // Actual math
        this.solution = this.multiplier * this.multiplicand;
        console.log(this.solution);
        this.solution = Math.round((this.solution + 0.00001) * 100) / 100;
        console.log(this.solution);

        this.history_list2.unshift(this.multiplicand + " x " + this.multiplier + " = " + this.solution);
        console.log(this.history_list2);
        var dropdown = document.getElementById("myDropdown");
        var equation = this.multiplicand + " x " + this.multiplier + " = " + this.solution;
        var history_entry = document.createTextNode(equation);
        dropdown.appendChild(history_entry);
        dropdown.appendChild(document.createElement("br"));

        var solut_div = document.getElementById("solutionText");
        while (solut_div.firstChild) {
          solut_div.removeChild(solut_div.firstChild);
        }

        var solut = document.createTextNode(this.solution);
        solut_div.appendChild(solut);

        this.remakeMultiplierBanner()

        // this.structure_equation_banner.getChildAt(1).text = this.multiplicand.toString() + " x                  = " + this.solution.toString();

        // this.makeGameForm();

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

    }

    // console.log(projectile.alpha);

  }

  checkSelectedDigit () {

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

  }

  updateSinglePlayAnimations () {

    //Catapult or whatever it is in the scene
    if (!this.catapult.paused && this.catapult.currentFrame == 11) {
      this.catapult.stop();
      // this.reload = false;
    }

    if (!this.end_level_flag.paused && this.end_level_flag.currentFrame == 11) {
      this.end_level_flag.stop();
    }

    // Structure in the scene
    if (!this.structure_center.paused && this.structure_center.currentFrame == 5) {
      this.structure_center.stop();
      this.tower_down[0] = true;
    }
    if (!this.structure_left_center.paused && this.structure_left_center.currentFrame == 5) {
      this.structure_left_center.stop();
      this.tower_down[1] = true;
    }
    if (!this.structure_right_center.paused && this.structure_right_center.currentFrame == 5) {
      this.structure_right_center.stop();
      this.tower_down[2] = true;
    }
    if (!this.structure_left.paused && this.structure_left.currentFrame == 5) {
      this.structure_left.stop();
      this.tower_down[3] = true;
    }
    if (!this.structure_right.paused && this.structure_right.currentFrame == 5) {
      this.structure_right.stop();
      this.tower_down[4] = true;
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

  }

  runHitAnimations () {

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
        this.structure_score.getChildAt(1).text = "Total Lows: " + this.miss_lower_counter.toString() + "\nTotal High: " + this.miss_upper_counter.toString() + "\nTotal Hits: " + this.hit_counter.toString();



      }

    }

  }

  runMissAnimations (leave_to_hint) {

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
          this.structure_score.getChildAt(1).text = "Total Lows: " + this.miss_lower_counter.toString() + "\nTotal High: " + this.miss_upper_counter.toString() + "\nTotal Hits: " + this.hit_counter.toString();

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
          this.structure_score.getChildAt(1).text = "Total Lows: " + this.miss_lower_counter.toString() + "\nTotal High: " + this.miss_upper_counter.toString() + "\nTotal Hits: " + this.hit_counter.toString();

        }

      }

      if ((this.miss_lower_counter > 3 || this.miss_upper_counter > 3) && !this.hint_shown) {
        this.hint_shown = true;
        leave_to_hint();
      }

      // if((miss_lower_counter > 3 || miss_upper_counter > 3) && hints_on) {
      //   function() {this.changeScene(9); this.visibleForm(true); }.bind(this);
      // }

    }

  }

  checkTutorial () {

    // Tutorial
    if (this.play_tutorial || this.current_level == 0) {

      if (!this.step_run[0]) {

        this.tutorial_menu.visible = true;

        createjs.Tween.get(this.tutorial_menu).wait(0).to({visible:true}).call(function () {
          this.tutorial_menu.getChildAt(1).text = tutorialSteps[0];
          this.tutorial_numbpad.visible = true;
          this.tutorial_enterkey.visible = true;
        }.bind(this));

        this.step_run[0] = true;

      } else if (!this.step_run[1]) {

        createjs.Tween.get(this.tutorial_menu).wait(6000).to({visible:true}).call(function () {
          this.tutorial_menu.getChildAt(1).text = tutorialSteps[1];
        }.bind(this));

        createjs.Tween.get(this.tutorial_numbpad).wait(6250).to({alpha:1}, 750).wait(7500).to({alpha:0}, 750); // Left side, Number pad
        createjs.Tween.get(this.tutorial_enterkey).wait(7250).to({alpha:1}, 750).wait(7500).to({alpha:0}, 750); // Right side, Enter key

        this.step_run[1] = true;

      } else if (!this.step_run[2]) {

        createjs.Tween.get(this.tutorial_menu).wait(15000).to({visible:true}).call(function () {
          this.tutorial_menu.getChildAt(1).text = tutorialSteps[2];
        }.bind(this));

        this.step_run[2] = true;

      } else if (!this.step_run[3]) {

        if (this.miss_lower_counter < 1) {

          if (this.miss_upper_counter > 0) {

            this.miss_upper_counter = 0;
            this.tutorial_menu.getChildAt(1).text = tutorialCorrections[0];

          } else if (this.hit_counter > 0) {

            this.hit_counter = 0;
            this.tutorial_menu.getChildAt(1).text = tutorialCorrections[1];

          }

        } else {

          this.step_run[3] = true;
          this.tutorial_menu.getChildAt(1).text = tutorialSteps[3];

        }

      } else if (!this.step_run[4]) {

        if (this.miss_upper_counter < 1) {

          if (this.miss_lower_counter > 1) {

            this.miss_lower_counter = 1;
            this.tutorial_menu.getChildAt(1).text = tutorialCorrections[2];

          } else if (this.hit_counter > 0) {

            this.hit_counter = 0;
            this.tutorial_menu.getChildAt(1).text = tutorialCorrections[3];

          }

        } else {

          this.step_run[4] = true;
          this.tutorial_menu.getChildAt(1).text = tutorialSteps[4];

        }

      } else if (!this.step_run[5]) {

        if (this.hit_counter < 3) {

          if (this.miss_lower_counter > 1) {

            this.miss_lower_counter = 1;
            this.tutorial_menu.getChildAt(1).text = tutorialCorrections[4];

          } else if (this.miss_upper_counter > 1) {

            this.miss_upper_counter = 1;
            this.tutorial_menu.getChildAt(1).text = tutorialCorrections[5];

          }

        } else {

          this.step_run[5] = true;
          this.tutorial_menu.getChildAt(1).text = tutorialSteps[5];

        }

      } else {

        // Maybe link to the first level or something

      }

    }

  }

  createVictoryBanner (scene_scale_X, scene_scale_Y, badges, authenticated) {

    this.visibleForm(false);
    this.pauseAnimation(true);

    this.end_level_button.visible = true;

    createjs.Tween.get(this.end_level_flag).wait(2250).to({visible:true}).call(this.flagAnimation.bind(this));

    this.end_text.visible = true;

    var tempX = scene_scale_X;
    var tempY = scene_scale_Y;

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

  	if(this.current_level != 0 && authenticated){
	    if(badges[(this.current_level - 1)] == 0){
    		this.badge_text.visible = true;
    		createjs.Tween.get(this.badge_text).wait(8750).to({alpha:1}, 500);
	    }
  	}

    this.end_level_button.visible = true;
    createjs.Tween.get(this.end_level_button).wait(9375).to({alpha:1}, 125);

    //plays victory tune
    createjs.Sound.play("win", this.delayWin);

    this.target_x = 0;
    this.hit = false;
    this.miss_upper = false;
    this.miss_lower = false;
    this.hit_counter = 0;
    this.miss_upper_counter = 0;
    this.miss_lower_counter = 0;
    this.projectile_x_speed = 0;

  }

  hideBadGuys () {

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

  }


  towerAnimation () {

    if (this.tower_down[0]) {
      this.structure_center.gotoAndStop(5);
    }

    if (this.tower_down[1]) {
      this.structure_left_center.gotoAndStop(5);
    }

    if (this.tower_down[2]) {
      this.structure_right_center.gotoAndStop(5);
    }

    if (this.tower_down[3]) {
      this.structure_left.gotoAndStop(5);
    }

    if (this.tower_down[4]) {
      this.structure_right.gotoAndStop(5);
    }

  }

  runCatapultAnimation (scene_scale_Y) {

    //Catapult projectile animtion
    if (this.fired == true) {
      // if (frame_counter > 9) {
      this.projectile.y -= this.projectile_speed * scene_scale_Y;
      if (this.projectile.x < this.target_x) {
        this.projectile.x += this.projectile_x_speed * scene_scale_Y;
      } else if (this.projectile.x > this.target_x) {
        this.projectile.x -= this.projectile_x_speed * scene_scale_Y;
      }
      this.projectile_speed -= 3;
      // }
    }

  }

  reloadCatapult (stage, scene_scale_Y) {

    if (this.reload) {
      console.log("reload");
      this.fired = false;
      this.projectile.alpha = 0;
      this.projectile.x = stage.canvas.width / 2;
      this.projectile.y = stage.canvas.height - (96/2 + 57) * scene_scale_Y;
      this.projectile_speed = 60;
      if (this.catapult.currentFrame == 11){
        this.reload = false
        restartMultiplierBanner();
      }
    } else {
      this.projectile.alpha = 1;
    }

  }

  checkBossFight () {

  //   if (boss_fight) {
  //
  //     big_boss = createSprite(big_bossS, constants.structureX, constants.structureY);
  //     scale_image(big_boss, stage.canvas.width / 2, stage.canvas.height / 2);
  //
  //     console.log("boss");
  //
  //   } else {
  //
  //     changeLevel();
  //
  //   }

  }

  flagAnimation (){
    this.end_level_flag.gotoAndPlay(0);
  }

  setBoss () {
    this.boss_fight = document.getElementById("bossValue").checked;
  }

  setTutorial () {
    this.play_tutorial = document.getElementById("tutorialValue").checked;
  }

  clearMultiplicandBanner () {

    // Clear the multiplicand banner
    var multip_div = document.getElementById("multiplicandText");

    while (multip_div.firstChild) {

       multip_div.removeChild(multip_div.firstChild);

    }

    this.storage = 0;
    this.factor = 0;
    this.multiple = 0;
    this.multiplier = 0;
    this.digit = 2;
    this.last_digit = 0;
    this.adder = 1;

    this.sign = " x "; //&#37
    this.equal = " = ";
    this.solution = 0;


  }

  remakeMultiplierBanner () {

    var multip_div = document.getElementById("multiplicandText");

    // Remake multiplier for banner
    var multip = document.createTextNode(this.multiplicand);

    // Append to the range banner
    multip_div.appendChild(multip);

    this.structure_equation_banner.getChildAt(1).text = this.multiplicand.toString() + " x                  = " + this.solution.toString();

  }

  restartMultiplierBanner () {

    var multip_div = document.getElementById("multiplicandText");

    // Remake multiplier for banner
    var multip = document.createTextNode(this.multiplicand);

    // Append to the range banner
    multip_div.appendChild(multip);

    this.structure_equation_banner.getChildAt(1).text = this.multiplicand.toString() + " x                  =   ";

  }

  remakeRangeBanner () {

    var range = "[ " + this.lower + ", " + this.upper + "]";

    this.structure_range.getChildAt(1).text = range;

  }

  visibleForm (visible) {

    if(visible) {
      var scene_html = document.getElementById("sceneHTML");
      scene_html.hidden = false;
    } else {
      var scene_html = document.getElementById("sceneHTML");
      scene_html.hidden = true;
    }

  }

  //Loadbar for loading screen
  loading (evt) {
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
  }

  resetLevel () {

    this.history_list = [];
    this.history_list2 = [];
    this.hide_knight = false;
    this.hide_archer1 = false;
    this.hide_archer2 = false;
    this.hide_archer3 = false;
    this.hide_archer4 = false;
    this.tower_down[0] = false;
    this.tower_down[1] = false;
    this.tower_down[2] = false;
    this.tower_down[3] = false;
    this.tower_down[4] = false;
    this.hit_counter = 0;
    this.miss_upper_counter = 0;
    this.miss_lower_counter = 0;

  }

  pauseAnimation (paused) {

    this.henchman_left.paused = paused;
    this.henchman_left_center.paused = paused;
    this.boss.paused = paused;
    this.henchman_right.paused = paused;
    this.henchman_right_center.paused = paused;
    this.projectile.paused = paused;

    if(paused){

      // this.structure_center.paused = true;
      // this.structure_left_center.paused = true;
      // this.structure_right_center.paused = true;
      // this.structure_left.paused = true;
      // this.structure_right.paused = true;
      // this.firework_low.paused = true;
      // this.firework_hit.paused = true;
      // this.firework_high.paused = true;
      // this.catapult.paused = true;

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

  }

  victoryGenerator () {

    switch(Math.floor((Math.random() * 10) + 1)){
      case 1:
          return "Excellent";
          break;
      case 2:
          return "Amazing";
          break;
      case 3:
          return "Spectacular";
          break;
      case 4:
          return "Exceptional";
          break;
      case 5:
          return "Magnificent";
          break;
      case 6:
          return "Outstanding";
          break;
      case 7:
          return "Great";
          break;
      case 8:
          return "Awesome";
          break;
      case 9:
          return "Incredible";
          break;
      case 10:
          return "Wonderful";
          break;
      default:
          return "Unbelievable";
          break;
    }

  }

  visibleButton (visible, user_authentication) {

    if(visible) {

  		this.pause_menu.visible = true;
  		this.close_button.visible = true;
  		this.exit_level_button.visible = true;
  		this.settings_button.visible = true;
      if (user_authentication) {
		    this.main_menu_button.visible = true;
      }
  		this.previous_indicator.visible = true;
  		this.pause_indicator.visible = true;
  		this.next_indicator.visible = true;
  		this.lute.visible = true;
  		//antiLute.visible = true;
  		// this.hint_button.visible = true;

    } else {

  		this.pause_menu.visible = false;
  		this.close_button.visible = false;
  		this.exit_level_button.visible = false;
  		this.settings_button.visible = false;
      if (user_authentication) {
		    this.main_menu_button.visible = false;
      }
  		this.previous_indicator.visible = false;
  		this.pause_indicator.visible = false;
  		this.next_indicator.visible = false;
  		this.lute.visible = false;
  		//antiLute.visible = false;
  		// this.hint_button.visible = false;

    }

  }

  openPauseMenu (user_authentication) {

    this.pauseAnimation(true);
    this.visibleButton(true, user_authentication);
    this.visibleForm(false);

  }


}

export default LevelHandler;
