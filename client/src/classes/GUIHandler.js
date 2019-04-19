////////////////
// GUIHANDLER //
////////////////

//
import constants from '../game_data/constants.js';

class GUIHandler {

  constructor() {

    this.indicators = [];
    this.indicator_counter = 0;

  }

  createGUI (entity_component_system, current_scene, createjs, stage, user, async) {

  	switch(current_scene) {

  		case 0:

  			// scale_to_canvas(left_sword_button, "center", 0 - (constants.buttonX/2 + 10) * scene_scale_Y, "center", 0 + (constants.buttonY/2 + 140) * scene_scale_Y, "image");
  			// scale_to_canvas(right_sword_button, "center", 0 + (constants.buttonX/2 + 50) * scene_scale_Y, "center", 0 + (constants.buttonY/2 + 140) * scene_scale_Y, "image");

  			this.left_sword_button = AssetHandler.createButton("res/sword-left.png", "Login", constants.buttonX, constants.buttonY, "center", -(constants.buttonX/2 + 30), "center", (constants.buttonY/2 + 200), "image", function() {
  				createjs.Sound.play("sword");
  				var key = document.getElementById('usernameInput').value;
          var text = {
            "uname": document.getElementById('usernameInput').value,
            "pass": document.getElementById('passwordInput').value
          };
          APIHandler.verifyUser(text, user, async);
  			}.bind(this), entity_component_system, stage);

  			this.right_sword_button = AssetHandler.createButton("res/sword-right.png", "Signup", constants.buttonX, constants.buttonY, "center", (constants.buttonX/2 + 65), "center", (constants.buttonY/2 + 200), "image", function() {
  				createjs.Sound.play("sword");
          this.changeScene(1);
  			}.bind(this), entity_component_system, stage);

        this.menu_button = AssetHandler.createButton("res/login-button.png", "Back", constants.buttonX, constants.buttonY, "left", (constants.buttonX/2 + 10), "bottom", -(constants.buttonY/2 + 10), "gui", function() { createjs.Sound.play("menu");  this.changeScene(10); }.bind(this), entity_component_system, stage);

  			// this.secret_button = AssetHandler.createButton("res/secret_button.png", "", constants.backgroundX, 1440, "center", 0, "center", 0, "image", function() {
  			// 	createjs.Sound.play("sword");
        //   this.changeScene(8);
  			// }.bind(this), entity_component_system, stage);

  			// if (mobile) {
  			// 	scale_to_canvas(left_sword_button, "center", 0 - (constants.buttonX/2 + 30) * scene_scale_Y, "center", 0 + (constants.buttonY/2 + 200) * scene_scale_Y, "smallgui");
  			// 	scale_to_canvas(right_sword_button, "center", 0 + (constants.buttonX/2 + 65) * scene_scale_Y, "center", 0 + (constants.buttonY/2 + 200) * scene_scale_Y, "smallgui");
  			// } else {

  			break;
  		case 1:

  		// if (mobile) {
  		// 	scale_to_canvas(left_sword_button, "center", 0 - (constants.buttonX/2 + 10) * scene_scale_Y, "center", 0 + (constants.buttonY/2 + 140) * scene_scale_Y, "gui");
  		// 	scale_to_canvas(right_sword_button, "center", 0 + (constants.buttonX/2 + 50) * scene_scale_Y, "center", 0 + (constants.buttonY/2 + 140) * scene_scale_Y, "gui");
  		// } else {

  		this.left_sword_button = AssetHandler.createButton("res/sword-left.png", "Cancel", constants.buttonX, constants.buttonY, "center", -(constants.buttonX/2 + 30), "center", (constants.buttonY/2 + 200), "image", function() {
          // fieldInput_error.alpha = 0; // password_error.alpha = 0; // message.render = 0;
    			createjs.Sound.play("sword");
    			this.changeScene(0);
  			}.bind(this), entity_component_system, stage);

  		this.right_sword_button = AssetHandler.createButton("res/sword-right.png", "Signup", constants.buttonX, constants.buttonY, "center", (constants.buttonX/2 + 65), "center", (constants.buttonY/2 + 200), "image", function() {
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
                  APIHandler.createUser(text, user, async);
                  this.changeScene(2);
                }
              }
            }
          }
        }
  		}.bind(this), entity_component_system, stage);

      break;

  		case 2:

  			// if (mobile) {
  			// 	scale_to_canvas(play_button, "center", 0, "center", 0 - 105, "gui");
  			// 	scale_to_canvas(stats_button, "center", 0, "center", 0 - 20, "gui");
  			// 	scale_to_canvas(h2p_button, "center", 0, "center", 0 + 65, "gui");
  			// 	scale_to_canvas(settings_button, "center", 0, "center", 0 + 150, "gui");
  			// 	scale_to_canvas(logout_button, "left", (constants.buttonX/2 + 10), "top", (constants.buttonY/2 + 10), "gui");
  			// 	scale_to_canvas(account_button, "right", 0 - (constants.buttonX/2 + 10), "top", (constants.buttonY/2 + 10), "gui");
  			// } else {

  			this.play_button = AssetHandler.createButton("res/menu-button.png", "Play", constants.buttonX, constants.buttonY, "center", 0, "center", 0 - 200, "gui", function() { createjs.Sound.play("menu"); this.changeScene(8); }.bind(this), entity_component_system, stage);
  			this.stats_button = AssetHandler.createButton("res/menu-button.png", "Stats", constants.buttonX, constants.buttonY, "center", 0, "center", 0 - 100, "gui", function() { createjs.Sound.play("menu"); this.changeScene(4); APIHandler.getUserData(user.username, user, async); }.bind(this), entity_component_system, stage);
  			this.h2p_button = AssetHandler.createButton("res/menu-button.png", "How To Play", constants.buttonX, constants.buttonY, "center", 0, "center", 0 - 0, "gui", function() { createjs.Sound.play("menu"); this.indicatorFunction(0); }.bind(this), entity_component_system, stage);
  			this.settings_button = AssetHandler.createButton("res/menu-button.png", "Settings", constants.buttonX, constants.buttonY, "center", 0, "center", 0 + 100, "gui", function() { createjs.Sound.play("menu"); this.changeScene(6); }.bind(this), entity_component_system, stage);
  			this.logout_button = AssetHandler.createButton("res/menu-button.png", "Logout", constants.buttonX, constants.buttonY, "left", (constants.buttonX/2 + 10), "top", (constants.buttonY/2 + 10), "gui", function() { createjs.Sound.play("menu"); user.authenticated = false; this.changeScene(0); APIHandler.signoutUser(async); }.bind(this), entity_component_system, stage);
  			this.account_button = AssetHandler.createButton("res/menu-button.png", "Account", constants.buttonX, constants.buttonY, "right", 0 - (constants.buttonX/2 + 10), "top", (constants.buttonY/2 + 10), "gui", function() { createjs.Sound.play("menu"); this.changeScene(7); APIHandler.getUserData(user.username, user, async); }.bind(this), entity_component_system, stage);

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
    		// 	scale_to_canvas(menu_button, "right", 0 - (constants.buttonX/2 + 10), "bottom", 0 - (constants.buttonY/2 + 10), "gui");
    		// 	scale_to_canvas(hint_button, "center", 0 - 313 * scene_scale_Y, "center", 0 + 194 * scene_scale_Y, "gui");
        //
    		// } else {

        this.menu_button = AssetHandler.createButton("res/login-button.png", "Pause", constants.buttonX, constants.buttonY, "right", -(constants.buttonX/2 + 10), "bottom", -(constants.buttonY/2 + 10), "gui", function() {
          createjs.Sound.play("menu");

      		this.menu_button.visible = false

          this.level.openPauseMenu(user.authenticated);

          // this.level.pauseAnimation(true);
          // this.level.visibleButton(true);
          // this.level.visibleForm(false);

        }.bind(this), entity_component_system, stage);

  			if (this.mobile.isMobile) {

  				this.ll_number_button = AssetHandler.createButton("res/number-button-ll.png", "", constants.backgroundX, 288, "center", 0, "bottom", 0 - (288/2), "image", function() {
  					if(this.level.digit > 0)
  						this.level.digit--;
  					if(this.level.digit < 0)
  						this.level.digit = 0;
  					console.log(this.level.digit);
  				}.bind(this), entity_component_system, stage);

  				this.lr_number_button = AssetHandler.createButton("res/number-button-lr.png", "", constants.backgroundX, 288, "center", 0, "bottom", 0 - (288/2), "image", function() {
  					if(this.level.digit < 2)
  						this.level.digit++;
  					if(this.level.digit > 2)
  						this.level.digit = 2;
  					console.log(digit);
  				}.bind(this), entity_component_system, stage);

  				this.rl_number_button = AssetHandler.createButton("res/number-button-rl.png", "", constants.backgroundX, 288, "center", 0, "bottom", 0 - (288/2), "image", function() {
  					this.level.multiplier -= this.level.adder;
  					document.getElementById("hundredsPlace").textContent = Math.floor(this.level.multiplier/100 % 10);
  					document.getElementById("tensPlace").textContent = Math.abs(Math.floor(this.level.multiplier/10 % 10));
  					document.getElementById("onesPlace").textContent = Math.abs(Math.floor(this.level.multiplier % 10));
  				}.bind(this), entity_component_system, stage);

  				this.rr_number_button = AssetHandler.createButton("res/number-button-rr.png", "", constants.backgroundX, 288, "center", 0, "bottom", 0 - (288/2), "image", function() {
  					this.level.multiplier += this.level.adder;
  					document.getElementById("hundredsPlace").textContent = Math.floor(this.level.multiplier/100 % 10);
  					document.getElementById("tensPlace").textContent = Math.abs(Math.floor(this.level.multiplier/10 % 10));
  					document.getElementById("onesPlace").textContent = Math.abs(Math.floor(this.level.multiplier % 10));
  				}.bind(this), entity_component_system, stage);

  			}

  			break;

  		case 4:

  			this.menu_button = AssetHandler.createButton("res/login-button.png", "Menu", constants.buttonX, constants.buttonY, "left", (constants.buttonX/2 + 10), "bottom", -(constants.buttonY/2 + 10), "gui", function() { createjs.Sound.play("menu"); this.changeScene(2); }.bind(this), entity_component_system, stage);
  	let text = "Hits: " + user.hits + "\n\nHighs: " + user.highs + "\n\nLows: " + user.lows + "\n\nTotal Misses: " + (user.highs + user.lows) + "\n\nBadges: " + user.badges + "\n\n";

  	this.statsContainer = AssetHandler.createStatsContainer(user.badges, "res/empty-badge.png", text, "Oldstyle", "32px", "normal", "black", 240, 240, "center", 0, "center", 0, "image", entity_component_system, stage);

  			break;

  		case 5:

  			this.menu_button = AssetHandler.createButton("res/login-button.png", "Menu", constants.buttonX, constants.buttonY, "left", (constants.buttonX/2 + 10), "bottom", -(constants.buttonY/2 + 10), "gui", function() { createjs.Sound.play("menu"); this.changeScene(2); }.bind(this), entity_component_system, stage);

  			break;

  		case 6:

  			this.menu_button = AssetHandler.createButton("res/login-button.png", "Menu", constants.buttonX, constants.buttonY, "left", (constants.buttonX/2 + 10), "bottom", -(constants.buttonY/2 + 10), "gui", function() { createjs.Sound.play("menu"); this.oneWayScene(); }.bind(this), entity_component_system, stage);

  			break;

  		case 7:

  			this.menu_button = AssetHandler.createButton("res/login-button.png", "Menu", constants.buttonX, constants.buttonY, "left", (constants.buttonX/2 + 10), "bottom", -(constants.buttonY/2 + 10), "gui", function() { createjs.Sound.play("menu"); this.changeScene(2); }.bind(this), entity_component_system, stage);

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

  			this.midground = AssetHandler.createImage("res/map.png", constants.backgroundX, constants.backgroundY, "center", 0, "center", 0, "image", entity_component_system, stage);
  			this.foreground = AssetHandler.createButton("res/map-banner.png", "Select a level", constants.backgroundX, 108, "center", 0, "top", 0 + (108/2), "image", function() {}.bind(this), entity_component_system, stage);

  			var reef = AssetHandler.createSprite(reefS, 120, 108, "center", -480 + 120 / 2, "center", 96 + 108 / 2, "image", entity_component_system, stage);
  			reef.gotoAndPlay(0);

  			var skyland = AssetHandler.createSprite(skylandS, 180, 120, "center", -243 + 180 / 2, "center", -246 + 120 / 2, "image", entity_component_system, stage);
  			skyland.gotoAndPlay(0);

        if (user.authenticated) {

  		     this.menu_button = AssetHandler.createButton("res/login-button.png", "Menu", constants.buttonX, constants.buttonY, "left", (constants.buttonX/2 + 10), "bottom", -(constants.buttonY/2 + 10), "gui", function() { createjs.Sound.play("menu"); this.changeScene(2); }.bind(this), entity_component_system, stage);

        } else {

  		     this.menu_button = AssetHandler.createButton("res/login-button.png", "Back", constants.buttonX, constants.buttonY, "left", (constants.buttonX/2 + 10), "bottom", -(constants.buttonY/2 + 10), "gui", function() { createjs.Sound.play("menu");  this.changeScene(10); }.bind(this), entity_component_system, stage);
  		     this.menu_button = AssetHandler.createButton("res/login-button.png", "How To Play", constants.buttonX, constants.buttonY, "right", -(constants.buttonX/2 + 10), "bottom", -(constants.buttonY/2 + 10), "gui", function() { createjs.Sound.play("menu"); this.indicatorFunction(0); }.bind(this), entity_component_system, stage);

        }

  			for (var i = 1; i < (this.num_levels + 1); i++) {

  				var temp = AssetHandler.createButton("res/map-indicator.png", (i).toString(), 48, 48, "center", indicatorCoordinates[i].x/* + 48/2*/, "center", indicatorCoordinates[i].y/* + 48/2*/, "gui", this.levels[i].open.bind(this), entity_component_system, stage);
  				// var temp = AssetHandler.createButton("res/map-indicator.png", (i).toString(), 48, 48, "center", indicatorCoordinates[i].x/* + 48/2*/, "center", indicatorCoordinates[i].y/* + 48/2*/, "gui", function (this) { this.indicatorFunction(i).bind(this) }, entity_component_system, stage);
          temp.on("mouseover", this.handleMouseEvent);
  				temp.on("mouseout", this.handleMouseEvent);

  				this.indicators.push(temp);

  			}

  	    this.containerFrame = AssetHandler.createContainerFrame(210, 310, "center", 200, "center", 200, "gui", entity_component_system, stage);
  	    this.containerFrame.visible = false;

  			break;

      case 9:

  			this.menu_button = AssetHandler.createButton("res/login-button.png", "Menu", constants.buttonX, constants.buttonY, "left", (constants.buttonX/2 + 10), "bottom", -(constants.buttonY/2 + 10), "gui", function() {
          createjs.Sound.play("menu");
          // this.changeScene(3);
          this.oneWayScene();

          console.log(this.level.multiplicand);
          console.log(this.level.lower);
          console.log(this.level.upper);

          // this.level.openPauseMenu();

          // this.level.pauseAnimation(true);
          // this.level.visibleButton(true);
          // this.level.visibleForm(false);

        }.bind(this), entity_component_system, stage);

        break;

  		case 10:

  			this.logout_button = AssetHandler.createButton("res/login-button.png", "Login!", constants.buttonX, constants.buttonY, "right", -(constants.buttonX/2 + 10), "top", (constants.buttonY/2 + 10), "gui", function() { createjs.Sound.play("menu"); this.changeScene(0); }.bind(this), entity_component_system, stage);
  			this.play_button = AssetHandler.createButton("res/login-button.png", "Start!", constants.buttonX, constants.buttonY, "center", 0, "bottom", - 2.5 * (constants.buttonY/2 + 10), "gui", function() { createjs.Sound.play("menu"); this.changeScene(8); }.bind(this), entity_component_system, stage);

  			break;

  		default:

  	}

    // this.landscape_warning = new createjs.Shape();
    //
    // this.phone_rotation = AssetHandler.createSprite(this.phone_rotationS, 288, 288, "center", 0, "center", 0, "image", entity_component_system, stage);
    // stage.removeChild(this.phone_rotation);

  }

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

  }

}

export default GUIHandler;
