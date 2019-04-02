////////////////
// GUIHANDLER //
////////////////


class GUIHandler {



  constructor() {

    /////////
    // GUI //
    /////////

    this.buttonX = 216;
    this.buttonY = 72;

    this.backgroundX = 1920;
    this.backgroundY = 768;

    this.indicators = [];

    this.indicator_counter = 0;

  }

  /////////
  // GUI //
  /////////

  createGUI (entity_component_system, current_scene) {

    switch(current_scene) {

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
        }.bind(this), entity_component_system, this.stage);

        this.right_sword_button = this.assets.createButton("res/sword-right.png", "Signup", this.buttonX, this.buttonY, "center", (this.buttonX/2 + 65), "center", (this.buttonY/2 + 200), "image", function() {
          createjs.Sound.play("sword");
          this.changeScene(1);
        }.bind(this), entity_component_system, this.stage);

        this.secret_button = this.assets.createButton("res/secret_button.png", "", this.backgroundX, 1440, "center", 0, "center", 0, "image", function() {
          createjs.Sound.play("sword");
          this.changeScene(8);
        }.bind(this), entity_component_system, this.stage);

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
        }.bind(this), entity_component_system, this.stage);

      this.right_sword_button = this.assets.createButton("res/sword-right.png", "Cancel", this.buttonX, this.buttonY, "center", (this.buttonX/2 + 65), "center", (this.buttonY/2 + 200), "image", function() {
        // fieldInput_error.alpha = 0; // password_error.alpha = 0; // message.render = 0;
        createjs.Sound.play("sword");
        this.changeScene(0);
      }.bind(this), entity_component_system, this.stage);

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

        this.play_button = this.assets.createButton("res/menu-button.png", "Play", this.buttonX, this.buttonY, "center", 0, "center", 0 - 200, "gui", function() { createjs.Sound.play("menu"); this.changeScene(8); }.bind(this), entity_component_system, this.stage);
        this.stats_button = this.assets.createButton("res/menu-button.png", "Stats", this.buttonX, this.buttonY, "center", 0, "center", 0 - 100, "gui", function() { createjs.Sound.play("menu"); this.changeScene(4); this.getUserData(this.user.username); }.bind(this), entity_component_system, this.stage);
        this.h2p_button = this.assets.createButton("res/menu-button.png", "How To Play", this.buttonX, this.buttonY, "center", 0, "center", 0 - 0, "gui", function() { createjs.Sound.play("menu"); this.changeScene(5); }.bind(this), entity_component_system, this.stage);
        this.settings_button = this.assets.createButton("res/menu-button.png", "Settings", this.buttonX, this.buttonY, "center", 0, "center", 0 + 100, "gui", function() { createjs.Sound.play("menu"); this.changeScene(6); }.bind(this), entity_component_system, this.stage);
        this.logout_button = this.assets.createButton("res/menu-button.png", "Logout", this.buttonX, this.buttonY, "left", (this.buttonX/2 + 10), "top", (this.buttonY/2 + 10), "gui", function() { createjs.Sound.play("menu"); this.user.authenticated = false; this.changeScene(0); this.signoutUser(); }.bind(this), entity_component_system, this.stage);
        this.account_button = this.assets.createButton("res/menu-button.png", "Account", this.buttonX, this.buttonY, "right", 0 - (this.buttonX/2 + 10), "top", (this.buttonY/2 + 10), "gui", function() { createjs.Sound.play("menu"); this.changeScene(7); this.getUserData(this.user.username); }.bind(this), entity_component_system, this.stage);

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

        this.end_level_scene = this.assets.createImage("res/login_scroll.png", this.backgroundX, this.backgroundY, "center", 0, "center", 0, "image", entity_component_system, this.stage);
        this.end_level_scene.visible = false;

        this.end_level_button = this.assets.createButton("res/login-button.png", "Next Level", this.buttonX, this.buttonY, "center", 0, "center", 0 + 250, "gui", function() { createjs.Sound.play("select"); this.changeScene(8); this.visibleForm(true);}.bind(this), entity_component_system, this.stage);
        this.end_level_button.visible = false;
        this.end_level_button.alpha = 0;

        this.end_text = this.assets.createText("Good Job!!", "Oldstyle", "65px", "bold", "gold", 10, 10, "center", 0, "center", 0 - 140, "image", entity_component_system, this.stage);
        this.end_text.visible = false;
        //end_text.skewX = -5;
        this.end_text.skewY = -15;
        this.end_text.textAlign = "center";

        this.hit_text = this.assets.createText("Total Hits:      ", "Oldstyle", "25px", "", "gold", 10, 10, "center", 0 - 120, "center", 0, "image", entity_component_system, this.stage);
        this.hit_text.visible = false;
        this.hit_text.alpha = 0;

        this.low_text = this.assets.createText("Total Lows:     ", "Oldstyle", "25px", "", "gold", 10, 10, "center", 0 - 120, "center", 0 + 40, "image", entity_component_system, this.stage);
        this.low_text.visible = false;
        this.low_text.alpha = 0;

        this.high_text = this.assets.createText("Total Highs:    ", "Oldstyle", "25px", "", "gold", 10, 10, "center", 0 - 120, "center", 0 + 80, "image", entity_component_system, this.stage);
        this.high_text.visible = false;
        this.high_text.alpha = 0;

        this.pause_menu = this.assets.createImage("res/hit-target-pause-menu.png", this.backgroundX, this.backgroundY, "center", 0, "center", 0, "image", entity_component_system, this.stage);
        this.pause_menu.visible = false;

        this.close_button = this.assets.createButton("res/hit-target-pause-close-button.png", "", this.buttonX, this.buttonY, "center", 0 + 445, "center", 0 - 281, "gui", function() {
          createjs.Sound.play("menu");
          this.pauseAnimation(false);
          this.visibleButton(false);
          this.visibleForm(true);
        }.bind(this), entity_component_system, this.stage);

        this.close_button.visible = false;

        this.main_menu_button = this.assets.createButton("res/hit-target-pause-button.png", "Main Menu", this.buttonX, this.buttonY, "center", 0, "center", 0 - 180, "gui", function() { createjs.Sound.play("menu"); this.changeScene(2); this.visibleForm(true);}.bind(this), entity_component_system, this.stage);
        this.main_menu_button.visible = false;

        this.exit_level_button = this.assets.createButton("res/hit-target-pause-button.png", "Exit Level", this.buttonX, this.buttonY, "center", 0, "center", 0 - 110, "gui", function() { createjs.Sound.play("menu"); this.changeScene(8); this.visibleForm(true);}.bind(this), entity_component_system, this.stage);
        this.exit_level_button.visible = false;

        this.settings_button = this.assets.createButton("res/hit-target-pause-button.png", "Settings", this.buttonX, this.buttonY, "center", 0, "center", 0 - 40, "gui", function() { createjs.Sound.play("menu"); this.changeScene(6); this.visibleForm(true);}.bind(this), entity_component_system, this.stage);
        this.settings_button.visible = false;

        this.menu_button = this.assets.createButton("res/login-button.png", "Pause", this.buttonX, this.buttonY, "right", -(this.buttonX/2 + 10), "bottom", -(this.buttonY/2 + 10), "gui", function() {
          createjs.Sound.play("menu");
          this.pauseAnimation(true);
          this.visibleButton(true);
          this.visibleForm(false);
        }.bind(this), entity_component_system, this.stage);

        this.hint_button = this.assets.createButton("res/hint-button.png", "Hint", 72, 72, "center", 0 - 313, "center", 0 + 194, "gui", function() { createjs.Sound.play("sword"); this.changeScene(9); this.visibleForm(true); }.bind(this), entity_component_system, this.stage);
        this.hint_button.visible = false;

        if (this.mobile.isMobile) {

          this.ll_number_button = this.assets.createButton("res/number-button-ll.png", "", this.backgroundX, 288, "center", 0, "bottom", 0 - (288/2), "image", function() {
            if(this.digit > 0)
              this.digit--;
            if(this.digit < 0)
              this.digit = 0;
            console.log(this.digit);
          }.bind(this), entity_component_system, this.stage);

          this.lr_number_button = this.assets.createButton("res/number-button-lr.png", "", this.backgroundX, 288, "center", 0, "bottom", 0 - (288/2), "image", function() {
            if(this.digit < 2)
              this.digit++;
            if(this.digit > 2)
              this.digit = 2;
            console.log(digit);
          }.bind(this), entity_component_system, this.stage);

          this.rl_number_button = this.assets.createButton("res/number-button-rl.png", "", this.backgroundX, 288, "center", 0, "bottom", 0 - (288/2), "image", function() {
            this.multiplier -= this.adder;
            document.getElementById("hundredsPlace").textContent = Math.floor(this.multiplier/100 % 10);
            document.getElementById("tensPlace").textContent = Math.abs(Math.floor(this.multiplier/10 % 10));
            document.getElementById("onesPlace").textContent = Math.abs(Math.floor(this.multiplier % 10));
          }.bind(this), entity_component_system, this.stage);

          this.rr_number_button = this.assets.createButton("res/number-button-rr.png", "", this.backgroundX, 288, "center", 0, "bottom", 0 - (288/2), "image", function() {
            this.multiplier += this.adder;
            document.getElementById("hundredsPlace").textContent = Math.floor(this.multiplier/100 % 10);
            document.getElementById("tensPlace").textContent = Math.abs(Math.floor(this.multiplier/10 % 10));
            document.getElementById("onesPlace").textContent = Math.abs(Math.floor(this.multiplier % 10));
          }.bind(this), entity_component_system, this.stage);

        }

        break;

      case 4:

        this.menu_button = this.assets.createButton("res/login-button.png", "Menu", this.buttonX, this.buttonY, "left", (this.buttonX/2 + 10), "bottom", -(this.buttonY/2 + 10), "gui", function() { createjs.Sound.play("menu"); this.changeScene(2); }.bind(this), entity_component_system, this.stage);

        break;

      case 5:

        this.menu_button = this.assets.createButton("res/login-button.png", "Menu", this.buttonX, this.buttonY, "left", (this.buttonX/2 + 10), "bottom", -(this.buttonY/2 + 10), "gui", function() { createjs.Sound.play("menu"); this.changeScene(2); }.bind(this), entity_component_system, this.stage);

        break;

      case 6:

        this.menu_button = this.assets.createButton("res/login-button.png", "Menu", this.buttonX, this.buttonY, "left", (this.buttonX/2 + 10), "bottom", -(this.buttonY/2 + 10), "gui", function() { createjs.Sound.play("menu"); this.oneWayScene(); }.bind(this), entity_component_system, this.stage);

        break;

      case 7:

        this.menu_button = this.assets.createButton("res/login-button.png", "Menu", this.buttonX, this.buttonY, "left", (this.buttonX/2 + 10), "bottom", -(this.buttonY/2 + 10), "gui", function() { createjs.Sound.play("menu"); this.changeScene(2); }.bind(this), entity_component_system, this.stage);

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

        this.midground = this.assets.createImage("res/map.png", this.backgroundX, this.backgroundY, "center", 0, "center", 0, "image", entity_component_system, this.stage);
        this.foreground = this.assets.createButton("res/map-banner.png", "Select a level", this.backgroundX, 108, "center", 0, "top", 0 + (108/2), "image", function() {}.bind(this), entity_component_system, this.stage);

        var reef = this.assets.createSprite(reefS, 120, 108, "center", -480 + 120 / 2, "center", 96 + 108 / 2, "image", entity_component_system, this.stage);
        reef.gotoAndPlay(0);

        var skyland = this.assets.createSprite(skylandS, 180, 120, "center", -243 + 180 / 2, "center", -246 + 120 / 2, "image", entity_component_system, this.stage);
        skyland.gotoAndPlay(0);

        this.menu_button = this.assets.createButton("res/login-button.png", "Menu", this.buttonX, this.buttonY, "left", (this.buttonX/2 + 10), "bottom", -(this.buttonY/2 + 10), "gui", function() { createjs.Sound.play("menu"); this.changeScene(2); }.bind(this), entity_component_system, this.stage);

        for (var i = 0; i < this.num_levels; i++) {

          var temp = this.assets.createButton("res/map-indicator.png", (i + 1).toString(), 48, 48, "center", indicatorCoordinates[i].x/* + 48/2*/, "center", indicatorCoordinates[i].y/* + 48/2*/, "gui", this.levels[i].open.bind(this), entity_component_system, this.stage);

          this.indicators.push(temp);

        }

        break;

      case 9:

        this.menu_button = this.assets.createButton("res/login-button.png", "Menu", this.buttonX, this.buttonY, "left", (this.buttonX/2 + 10), "bottom", -(this.buttonY/2 + 10), "gui", function() {
          createjs.Sound.play("menu");
          this.changeScene(3);
          this.pauseAnimation(true);
          this.visibleButton(true);
          this.visibleForm(false);
        }.bind(this), entity_component_system, this.stage);

        break;

      default:

    }

    this.previous_indicator = this.assets.createImage("res/previous-indicator.png", 24, 24, "center", 0 - 50, "center", 0 + 194, "gui", entity_component_system, this.stage);
    // this.previous_indicator.addEventListener("click", previousSound);
    this.previous_indicator.visible = false;

    this.pause_indicator = this.assets.createImage("res/pause-indicator.png", 24, 24, "center", 0, "center", 0 + 194, "gui", entity_component_system, this.stage);
    // this.pause_indicator.addEventListener("click", playSound);
    this.pause_indicator.visible = false;

    this.next_indicator = this.assets.createImage("res/next-indicator.png", 24, 24, "center", 0 + 50, "center", 0 + 194, "gui", entity_component_system, this.stage);
    // this.next_indicator.addEventListener("click", nextSound);
    this.next_indicator.visible = false;

    this.lute = this.assets.createImage("res/lute.png", 96, 96, "center", 0 + 313, "center", 0 + 194, "gui", entity_component_system, this.stage);
    // antiLute = createImage("res/antiLute.png", 96, 96, 2);
    // this.lute.addEventListener("click", muteSound);
    this.lute.visible = false;
    // antiLute.visible = false;
    // antiLute.hidden = true;

    this.landscape_warning = new createjs.Shape();

    this.phone_rotation = this.assets.createSprite(this.phone_rotationS, 288, 288, "center", 0, "center", 0, "image", entity_component_system, this.stage);
    this.stage.removeChild(this.phone_rotation);

  }



}

export default GUIHandler;
