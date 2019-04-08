//////////////////
// LEVELHANDLER //
//////////////////

import AssetHandler from './AssetHandler.js';

// import createjs from 'createjs';

class LevelHandler {



  constructor() {

    this.buttonX = 216;
    this.buttonY = 72;

    this.structureX = 1920;
    this.structureY = 1440;

    this.backgroundX = 1920;
    this.backgroundY = 768;

    this.preload = new createjs.LoadQueue();
    this.preload.on("progress", this.loading.bind(this));

    //Setting properties for delays for sounds
    this.delayRe = new createjs.PlayPropsConfig().set({delay : 250});
    this.delayIn = new createjs.PlayPropsConfig().set({delay : 500});
    this.delayOut = new createjs.PlayPropsConfig().set({delay : 750});

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

    this.structureX = 1920;
    this.structureY = 1440;

    this.target_x = 0;
	//Need to make setting for this
	this.hints_on = true;

    this.hint_shown = false;

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
      framerate: 6
    };

    this.centerS = {
      images: ["res/level" + this.current_level + "/center.png"],
      frames: {width:750, height:750, count:12, regX: 0, regY:0, spacing:0, margin:0},
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

  createLevel (stage, lcs, leave_to_map, leave_to_hint, leave_to_menu, leave_to_settings) {

    // Level structure in background
    this.structure_center = AssetHandler.createSprite(this.centerS, this.centerS.frames.width, this.centerS.frames.height, "center", -360 + (this.centerS.frames.width / 2), "bottom", -897 + (this.centerS.frames.height / 2), "image", lcs, stage);
    this.structure_left_center = AssetHandler.createSprite(this.left_centerS, this.left_centerS.frames.width, this.left_centerS.frames.height, "center", -660 + (this.left_centerS.frames.width / 2), "bottom", -750 + (this.left_centerS.frames.height / 2), "image", lcs, stage);
    this.structure_right_center = AssetHandler.createSprite(this.right_centerS, this.right_centerS.frames.width, this.right_centerS.frames.height, "center", 660 - (this.right_centerS.frames.width / 2), "bottom", -750 + (this.right_centerS.frames.height / 2), "image", lcs, stage);

    // Bad guys in midground
    this.henchman_left_center = AssetHandler.createSprite(this.henchmanS, 96, 96, "center", 0 - (96/2 + 375), "bottom", -384, "image", lcs, stage);
    this.henchman_left_center.gotoAndPlay(0);
    this.boss = AssetHandler.createSprite(this.bossS, 96, 96, "center", 0, "bottom", -384, "image", lcs, stage);
    this.boss.gotoAndPlay(0);
    this.henchman_right_center = AssetHandler.createSprite(this.henchmanS, 96, 96, "center", 0 + (96/2 + 375), "bottom", -384, "image", lcs, stage);
    this.henchman_right_center.gotoAndPlay(0);

    // Level structure in foreground
    this.structure_left = AssetHandler.createSprite(this.leftS, this.leftS.frames.width, this.leftS.frames.height, "center", -960 + (this.leftS.frames.width / 2), "bottom", -(this.leftS.frames.height / 2), "image", lcs, stage);
    this.structure_right = AssetHandler.createSprite(this.rightS, this.rightS.frames.width, this.rightS.frames.height, "center", 960 - (this.rightS.frames.width / 2), "bottom", -(this.rightS.frames.height / 2), "image", lcs, stage);

    this.henchman_left = AssetHandler.createSprite(this.henchmanS, 96, 96, "center", 0 - (96/2 + 705), "bottom", -207 + (24), "image", lcs, stage);
    this.henchman_left.gotoAndPlay(0);
    this.henchman_right = AssetHandler.createSprite(this.henchmanS, 96, 96, "center", 0 + (96/2 + 705), "bottom", -207 + (24), "image", lcs, stage);
    this.henchman_right.gotoAndPlay(0);

    this.structure_body = AssetHandler.createSprite(this.bodyS, this.bodyS.frames.width, this.bodyS.frames.height, "center", 0, "bottom", -this.bodyS.frames.height / 2, "image", lcs, stage);
    // structure_banner = AssetHandler.createSprite(bannerS, this.structureX, this.structureY, "center", 0, "bottom", -this.structureY / 2, "image", lcs, stage);
    this.structure_range = AssetHandler.createTextContainer(this.range_bannerS, "[ #, # ]", "Oldstyle", "32px", "normal", "Gold", 192, 126, "center", -378 + 192 / 2, "bottom", -336 + 126 / 2, "image", 0, lcs, stage);
    // this.structure_equation_banner = AssetHandler.createTextContainer(this.equation_bannerS, "# x              = #", "Oldstyle", "26px", "normal", "Gold", 300, 78, "center", -150 + 300 / 2, "bottom", -321 + 78 / 2, "image", 0, lcs, stage);
    this.structure_equation_banner = AssetHandler.createTextContainer(this.equation_bannerS, "# x              = #", "Oldstyle", "26px", "normal", "Gold", 300, 78, "center", -150 + 300 / 2, "bottom", -321 + 78 / 2, "image", 0, lcs, stage);
    this.structure_history = AssetHandler.createTextContainer(this.history_bannerS, "History", "Oldstyle", "18px", "normal", "Gold", 192, 126, "center", 186 + 192 / 2, "bottom", -336 + 126 / 2, "image", 126 / 2, lcs, stage);
    this.structure_facade = AssetHandler.createSprite(this.facadeS, this.facadeS.frames.width, this.facadeS.frames.height, "center", 0, "bottom", -this.facadeS.frames.height / 2, "image", lcs, stage);  // Level structure in foreground

    this.firework_low = AssetHandler.createSprite(this.firework_lowS, this.structureX, this.structureY, "center", 0, "top", this.structureY / 2, "image", lcs, stage);
    this.firework_hit = AssetHandler.createSprite(this.firework_hitS, this.structureX, this.structureY, "center", 0, "top", this.structureY / 2, "image", lcs, stage);
    this.firework_high = AssetHandler.createSprite(this.firework_highS, this.structureX, this.structureY, "center", 0, "top", this.structureY / 2, "image", lcs, stage);

    // Main character in foreground
    this.projectile = AssetHandler.createSprite(this.projectileS, 96, 96, "center", 0, "bottom", 0 - (96/2 + 57), "image", lcs, stage);
    this.projectile.gotoAndPlay(0);
    this.catapult = AssetHandler.createSprite(this.catapultS, 288, 384, "center", 0, "bottom", 0 - (384/2 - 57), "image", lcs, stage);

    // number_spacing = 10;
    this.number_spacer = 25;

    for(var i = -25; i <= 25; i++){

      var temp = AssetHandler.createText(i.toString(), "Arial", "16px", "bold", "black", this.structureX, this.structureY, "center", 0 - (((this.number_spacer * 48) + 5)), "top", 30, "image", lcs, stage);
      this.number_text.push(temp);
      // number_spacing += 48;
      this.number_spacer--;

    }

    this.structure_score = AssetHandler.createTextContainer(this.score_bannerS, "Total Lows: 0\nTotal High: 0\nTotal Hits: 0", "Oldstyle", "24px", "normal", "Gold", 192, 126, "left", (10 + 192 / 2), "bottom", -(10 + 126 / 2), "image", 126 / 2, lcs, stage);

    this.end_level_flag = AssetHandler.createSprite(this.end_level_flagS, this.structureX, this.structureY, "center", 0, "center", 0, "image", lcs, stage);
    this.end_level_flag.visible = false;

    this.end_level_scene = AssetHandler.createImage("res/login_scroll.png", this.backgroundX, this.backgroundY, "center", 0, "center", 0, "image", lcs, stage);
    this.end_level_scene.visible = false;

    this.end_level_button = AssetHandler.createButton("res/login-button.png", "Next Level", this.buttonX, this.buttonY, "center", 0, "center", 0 + 250, "gui", leave_to_map, lcs, stage);
    this.end_level_button.visible = false;
    this.end_level_button.alpha = 0;

    var sting = this.victoryGenerator();  // temp fix for sending victory string to function

    this.end_text = AssetHandler.createText(sting, "Oldstyle", "65px", "bold", "gold", 10, 10, "center", 0, "center", 0 - 140, "image", lcs, stage);
    this.end_text.visible = false;
    //end_text.skewX = -5;
    this.end_text.skewY = -15;
    this.end_text.textAlign = "center";

    this.hit_text = AssetHandler.createText("Total Hits:      ", "Oldstyle", "25px", "", "gold", 10, 10, "center", 0 - 120, "center", 0, "image", lcs, stage);
    this.hit_text.visible = false;
    this.hit_text.alpha = 0;

    this.low_text = AssetHandler.createText("Total Lows:     ", "Oldstyle", "25px", "", "gold", 10, 10, "center", 0 - 120, "center", 0 + 40, "image", lcs, stage);
    this.low_text.visible = false;
    this.low_text.alpha = 0;

    this.high_text = AssetHandler.createText("Total Highs:    ", "Oldstyle", "25px", "", "gold", 10, 10, "center", 0 - 120, "center", 0 + 80, "image", lcs, stage);
    this.high_text.visible = false;
    this.high_text.alpha = 0;

    this.pause_menu = AssetHandler.createImage("res/hit-target-pause-menu.png", this.backgroundX, this.backgroundY, "center", 0, "center", 0, "image", lcs, stage);
    this.pause_menu.visible = false;

    this.close_button = AssetHandler.createButton("res/hit-target-pause-close-button.png", "", this.buttonX, this.buttonY, "center", 0 + 445, "center", 0 - 281, "gui", function() {
      createjs.Sound.play("menu");
      this.pauseAnimation(false);
      this.visibleButton(false);
      this.visibleForm(true);
    }.bind(this), lcs, stage);
    this.close_button.visible = false;

    this.main_menu_button = AssetHandler.createButton("res/hit-target-pause-button.png", "Main Menu", this.buttonX, this.buttonY, "center", 0, "center", 0 - 180, "gui", leave_to_menu, lcs, stage);
    this.main_menu_button.visible = false;

    this.exit_level_button = AssetHandler.createButton("res/hit-target-pause-button.png", "Exit Level", this.buttonX, this.buttonY, "center", 0, "center", 0 - 110, "gui", leave_to_map, lcs, stage);
    this.exit_level_button.visible = false;

    this.settings_button = AssetHandler.createButton("res/hit-target-pause-button.png", "Settings", this.buttonX, this.buttonY, "center", 0, "center", 0 - 40, "gui", leave_to_settings, lcs, stage);
    this.settings_button.visible = false;

    this.hint_button = AssetHandler.createButton("res/hint-button.png", "Hint", 72, 72, "center", 0 - 313, "center", 0 + 194, "gui", leave_to_hint, lcs, stage);
    this.hint_button.visible = false;

    this.previous_indicator = AssetHandler.createImage("res/previous-indicator.png", 24, 24, "center", 0 - 50, "center", 0 + 194, "gui", lcs, stage);
    // this.previous_indicator.addEventListener("click", previousSound);
    this.previous_indicator.visible = false;

    this.pause_indicator = AssetHandler.createImage("res/pause-indicator.png", 24, 24, "center", 0, "center", 0 + 194, "gui", lcs, stage);
    // this.pause_indicator.addEventListener("click", playSound);
    this.pause_indicator.visible = false;

    this.next_indicator = AssetHandler.createImage("res/next-indicator.png", 24, 24, "center", 0 + 50, "center", 0 + 194, "gui", lcs, stage);
    // this.next_indicator.addEventListener("click", nextSound);
    this.next_indicator.visible = false;

    this.lute = AssetHandler.createImage("res/lute.png", 96, 96, "center", 0 + 313, "center", 0 + 194, "gui", lcs, stage);
    // antiLute = createImage("res/antiLute.png", 96, 96, 2);
    // this.lute.addEventListener("click", muteSound);
    this.lute.visible = false;
    // antiLute.visible = false;
    // antiLute.hidden = true;

  }


  //////////
  // GAME //
  //////////

  randomizeRangeAndMultiplier () {

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

  }

  runInput (isMobile, leave_to_hint) {

    console.log("HIT: " + this.hit_counter);
    console.log("MU" + this.miss_upper_counter);
    console.log("ML" + this.miss_lower_counter);

    // Need to check for input correctness here
    // No letters or symbols only numbers

    this.valid = true;

    if (isMobile) {

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

        // this.makeGameForm();

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
        this.structure_score.text = "Total Lows: " + this.miss_lower_counter.toString() + "\nTotal High: " + this.miss_upper_counter.toString() + "\nTotal Hits: " + this.hit_counter.toString();



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

  }

  createVictoryBanner (scene_scale_X, scene_scale_Y) {

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

    this.end_level_button.visible = true;
    createjs.Tween.get(this.end_level_button).wait(8375).to({alpha:1}, 125);

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

    if (this.catapult.currentFrame == 11){
      this.reload = false;
    }

    if (this.reload) {
      console.log("reload");
      this.fired = false;
      this.projectile.alpha = 0;
      this.projectile.x = stage.canvas.width / 2;
      this.projectile.y = stage.canvas.height - (96/2 + 57) * scene_scale_Y;
      this.projectile_speed = 57;
    } else {
      this.projectile.alpha = 1;
    }

  }

  checkBossFight () {

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

    this.structure_equation_banner.text = this.multiplicand.toString() + " x              = " + this.solution.toString();

  }

  remakeRangeBanner () {

    var range = "[ " + this.lower + ", " + this.upper + "]";

    this.structure_range.text = range;

  }

  makeGameForm (isMobile) {

      // Creates username display text
      var multiplicand_div = document.createElement("div");
      multiplicand_div.id = "multiplicandText";
      var multiplicand_text = document.createTextNode(this.multiplicand);
      multiplicand_div.appendChild(multiplicand_text);
      var sign_text = document.createTextNode(this.sign);
      var entry_input;
      if (isMobile) {

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

  }

  myFunction (e) {

    e.preventDefault();
    document.getElementById("myDropdown").classList.toggle("show");

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
    this.hide_knight = false;
    this.hide_archer1 = false;
    this.hide_archer2 = false;
    this.hide_archer3 = false;
    this.hide_archer4 = false;
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

  }

  // // Mutes the current song
  // muteSound (stage, music) {
  //
  //   if (!music.sound_off) {
  //
  //     console.log(this.lute.src);
  //
  //     if(!music.muted)
  //     {
  //       stage.removeChild(this.lute);
  //       this.lute = new createImage("res/antiLute.png", this.luteX, this.luteY);
  //       lute.addEventListener("click", music.muteSound);
  //       this.scaleGUI();
  //     }
  //     else
  //     {
  //       stage.removeChild(this.lute);
  //       this.lute = new createImage("res/lute.png", this.luteX, this.luteY);
  //       this.lute.addEventListener("click", music.muteSound);
  //       this.scaleGUI();
  //     }
  //
  //     music.current_song.muted = !music.current_song.muted;
  //     this.music.muted = !music.muted;
  //
  //   }
  // }

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

  visibleButton (visible) {

    if(visible) {

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

  }

  openPauseMenu () {

    this.pauseAnimation(true);
    this.visibleButton(true);
    this.visibleForm(false);

  }


}

export default LevelHandler;
