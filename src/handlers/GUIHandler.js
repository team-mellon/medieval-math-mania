////////////////
// GUIHANDLER //
////////////////

// Static classes
import AssetHandler from './AssetHandler.js';
import APIHandler from './APIHandler.js';

//
import ObjectConfig from '../structures/ObjectConfig'

// Scene data for gui
import { indicatorCoordinates, levelDescriptors, guiManifest } from '../game_data/scenes.js';

// Global constants
import constants from '../game_data/constants.js';

// 
import { levelData } from '../game_data/levels.js';

class GUIHandler {

	constructor() {

		this.gcs = []; // GUI component system for scaling and eventually object storage

		this.containerFrame = {};

		this.indicators = [];
		this.indicator_counter = 0;

	}

	createGUI(entity_component_system, director, stage, user, async, device, menubutton, levels) {

		let config;

		switch(director.currentScene) {

			case 0:

				// scale_to_canvas(left_sword_button, "center", 0 - (constants.buttonX/2 + 10) * device.scale.scene_scale_Y, "center", 0 + (constants.buttonY/2 + 140) * device.scale.scene_scale_Y, "image");
				// scale_to_canvas(right_sword_button, "center", 0 + (constants.buttonX/2 + 50) * device.scale.scene_scale_Y, "center", 0 + (constants.buttonY/2 + 140) * device.scale.scene_scale_Y, "image");

			config = new ObjectConfig('default', 'gui', constants.buttonX, constants.buttonY, "center", -(constants.buttonX/2 + 30), "center", (constants.buttonY/2 + 200));
			this.left_sword_button = AssetHandler.createButton("res/sword-left.png", "Login", config, function() {
			createjs.Sound.play("sword");
			var key = document.getElementById('usernameInput').value;
			var text = {
			"uname": document.getElementById('usernameInput').value,
			"pass": document.getElementById('passwordInput').value
			};
			APIHandler.verifyUser(text, user, async);
			}.bind(this), entity_component_system, stage);

			config = new ObjectConfig('default', 'gui', constants.buttonX, constants.buttonY, "center", (constants.buttonX/2 + 65), "center", (constants.buttonY/2 + 200));
			this.right_sword_button = AssetHandler.createButton("res/sword-right.png", "Signup", config, function() {
			createjs.Sound.play("sword");
			director.changeScene(1, entity_component_system, stage, device, user);
			}.bind(this), entity_component_system, stage);

			config = new ObjectConfig('default', 'gui', constants.buttonX, constants.buttonY, "left", (constants.buttonX/2 + 10), "bottom", -(constants.buttonY/2 + 10));
			this.menu_button = AssetHandler.createButton("res/login-button.png", "Back", config, function() { createjs.Sound.play("menu");  director.changeScene(10, entity_component_system, stage, device, user); }.bind(this), entity_component_system, stage);

			// config = new ObjectConfig('default', 'gui', constants.backgroundX, 108, "center", 0, "top", 0 + (108/2));
			// this.secret_button = AssetHandler.createButton("res/secret_button.png", "", constants.backgroundX, 1440, "center", 0, "center", 0, "image", function() {
			// 	createjs.Sound.play("sword");
			//   director.changeScene(8, entity_component_system, stage, device, user);
			// }.bind(this), entity_component_system, stage);

				// if (device.device) {
				// 	scale_to_canvas(left_sword_button, "center", 0 - (constants.buttonX/2 + 30) * device.scale.scene_scale_Y, "center", 0 + (constants.buttonY/2 + 200) * device.scale.scene_scale_Y, "smallgui");
				// 	scale_to_canvas(right_sword_button, "center", 0 + (constants.buttonX/2 + 65) * device.scale.scene_scale_Y, "center", 0 + (constants.buttonY/2 + 200) * device.scale.scene_scale_Y, "smallgui");
				// } else {

				break;
			case 1:

			// if (device.device) {
			// 	scale_to_canvas(left_sword_button, "center", 0 - (constants.buttonX/2 + 10) * device.scale.scene_scale_Y, "center", 0 + (constants.buttonY/2 + 140) * device.scale.scene_scale_Y, "gui");
			// 	scale_to_canvas(right_sword_button, "center", 0 + (constants.buttonX/2 + 50) * device.scale.scene_scale_Y, "center", 0 + (constants.buttonY/2 + 140) * device.scale.scene_scale_Y, "gui");
			// } else {

			config = new ObjectConfig('default', 'gui', constants.buttonX, constants.buttonY, "center", -(constants.buttonX/2 + 30), "center", (constants.buttonY/2 + 200));
			this.left_sword_button = AssetHandler.createButton("res/sword-left.png", "Cancel", config, function() {
			// fieldInput_error.alpha = 0; // password_error.alpha = 0; // message.render = 0;
				createjs.Sound.play("sword");
				director.changeScene(0, entity_component_system, stage, device, user);
				}.bind(this), entity_component_system, stage);

			config = new ObjectConfig('default', 'gui', constants.buttonX, constants.buttonY, "center", (constants.buttonX/2 + 65), "center", (constants.buttonY/2 + 200));
			this.right_sword_button = AssetHandler.createButton("res/sword-right.png", "Signup", config, function() {
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
					director.changeScene(2, entity_component_system, stage, device, user);
				}
				}
			}
			}
		}
			}.bind(this), entity_component_system, stage);

		break;

			case 2:

				// if (device.device) {
				// 	scale_to_canvas(play_button, "center", 0, "center", 0 - 105, "gui");
				// 	scale_to_canvas(stats_button, "center", 0, "center", 0 - 20, "gui");
				// 	scale_to_canvas(h2p_button, "center", 0, "center", 0 + 65, "gui");
				// 	scale_to_canvas(settings_button, "center", 0, "center", 0 + 150, "gui");
				// 	scale_to_canvas(logout_button, "left", (constants.buttonX/2 + 10), "top", (constants.buttonY/2 + 10), "gui");
				// 	scale_to_canvas(account_button, "right", 0 - (constants.buttonX/2 + 10), "top", (constants.buttonY/2 + 10), "gui");
				// } else {

				config = new ObjectConfig('default', 'gui', constants.buttonX, constants.buttonY, "center", 0, "center", 0 - 200);
				this.play_button = AssetHandler.createButton("res/menu-button.png", "Play", config, function() { createjs.Sound.play("menu"); director.changeScene(8, entity_component_system, stage, device, user); }.bind(this), entity_component_system, stage);

				config = new ObjectConfig('default', 'gui', constants.buttonX, constants.buttonY, "center", 0, "center", 0 - 100);
				this.stats_button = AssetHandler.createButton("res/menu-button.png", "Stats", config, function() { createjs.Sound.play("menu"); director.changeScene(4, entity_component_system, stage, device, user); APIHandler.getUserData(user.username, user, async); }.bind(this), entity_component_system, stage);

				config = new ObjectConfig('default', 'gui', constants.buttonX, constants.buttonY, "center", 0, "center", 0 - 0);
				this.h2p_button = AssetHandler.createButton("res/menu-button.png", "How To Play", config, function() { createjs.Sound.play("menu"); director.indicatorFunction(0, entity_component_system, stage, device, user); }.bind(this), entity_component_system, stage);

				config = new ObjectConfig('default', 'gui', constants.buttonX, constants.buttonY, "center", 0, "center", 0 + 100);
				this.settings_button = AssetHandler.createButton("res/menu-button.png", "Settings", config, function() { createjs.Sound.play("menu"); director.changeScene(6, entity_component_system, stage, device, user); }.bind(this), entity_component_system, stage);

				config = new ObjectConfig('default', 'gui', constants.buttonX, constants.buttonY, "left", (constants.buttonX/2 + 10), "top", (constants.buttonY/2 + 10));
				this.logout_button = AssetHandler.createButton("res/menu-button.png", "Logout", config, function() { createjs.Sound.play("menu"); user.authenticated = false; director.changeScene(0, entity_component_system, stage, device, user); APIHandler.signoutUser(async); }.bind(this), entity_component_system, stage);

				config = new ObjectConfig('default', 'gui', constants.buttonX, constants.buttonY, "right", 0 - (constants.buttonX/2 + 10), "top", (constants.buttonY/2 + 10));
				this.account_button = AssetHandler.createButton("res/menu-button.png", "Account", config, function() { createjs.Sound.play("menu"); director.changeScene(7, entity_component_system, stage, device, user); APIHandler.getUserData(user.username, user, async); }.bind(this), entity_component_system, stage);

				break;

			case 3:

			// if (device.device) {
		//
			// 	scale_to_canvas(pause_menu, "center", 0, "center", 0, "image");
			// 	scale_to_canvas(close_button, "center", 0 + 445 * device.scale.scene_scale_Y, "center", 0 - 281 * device.scale.scene_scale_Y, "gui");
			// 	scale_to_canvas(main_menu_button, "center", 0, "center", 0 - 180 * device.scale.scene_scale_Y, "gui");
			// 	scale_to_canvas(exit_level_button, "center", 0, "center", 0 - 110 * device.scale.scene_scale_Y, "gui");
			// 	scale_to_canvas(settings_button, "center", 0, "center", 0 - 40 * device.scale.scene_scale_Y, "gui");
		//
			// 	scale_to_canvas(end_level_scene, "center", 0, "center", 0, "image");
			// 	scale_to_canvas(end_level_button, "center", 0, "center", 0 + 250 * device.scale.scene_scale_Y, "gui");
			// 	scale_to_canvas(end_text, "center", 0, "center", 0 - 140 * device.scale.scene_scale_Y, "image");
			// 	scale_to_canvas(hit_text, "center", 0 - 120 * device.scale.scene_scale_Y, "center", 0, "image");
			// 	scale_to_canvas(low_text, "center", 0 - 120 * device.scale.scene_scale_Y, "center", 0 + 40 * device.scale.scene_scale_Y, "image");
			// 	scale_to_canvas(high_text, "center", 0 - 120 * device.scale.scene_scale_Y, "center", 0 + 80 * device.scale.scene_scale_Y, "image");
		//
			// 	scale_to_canvas(hit_text_counter, "left", 30, "center", 0 + 225 * device.scale.scene_scale_Y, "image");
			// 	scale_to_canvas(low_text_counter, "left", 30, "center", 0 + 280 * device.scale.scene_scale_Y, "image");
			// 	scale_to_canvas(high_text_counter, "left", 30, "center", 0 + 300 * device.scale.scene_scale_Y, "image");
		//
			// 	scale_to_canvas(menu_button, "right", 0 - (constants.buttonX/2 + 10), "bottom", 0 - (constants.buttonY/2 + 10), "gui");
			// 	scale_to_canvas(hint_button, "center", 0 - 313 * device.scale.scene_scale_Y, "center", 0 + 194 * device.scale.scene_scale_Y, "gui");
		//
			// } else {

		config = new ObjectConfig('default', 'gui', constants.buttonX, constants.buttonY, "right", -(constants.buttonX/2 + 10), "bottom", -(constants.buttonY/2 + 10));
		this.menu_button = AssetHandler.createButton("res/login-button.png", "Pause", config, function() {
			createjs.Sound.play("menu");

				// menubutton.visible = false

			director.level.openPauseMenu(user.authenticated);

			// director.level.pauseAnimation(true);
			// director.level.visibleButton(true);
			// director.level.visibleForm(false);

		}.bind(this), entity_component_system, stage);

				if (device.device.isMobile) {

					config = new ObjectConfig('default', 'gui', 192, 192, "center", -234 - (288 / 2), "bottom", -(192 / 2));
					this.ll_number_button = AssetHandler.createButton("res/number-button-ll.png", "", config, function() {
						if(director.level.digit > 0)
							director.level.digit--;
						if(director.level.digit < 0)
							director.level.digit = 0;
						console.log(director.level.digit);
					}.bind(this), entity_component_system, stage);

					config = new ObjectConfig('default', 'gui', 192, 192, "center", -234 - (288 / 2), "bottom", -(192 / 2));
					this.lr_number_button = AssetHandler.createButton("res/number-button-lr.png", "", config, function() {
						if(director.level.digit < 2)
							director.level.digit++;
						if(director.level.digit > 2)
							director.level.digit = 2;
						console.log(director.level.digit);
					}.bind(this), entity_component_system, stage);

					config = new ObjectConfig('default', 'gui', 192, 192, "center", 234 + (288 / 2), "bottom", -(192 / 2));
					this.rr_number_button = AssetHandler.createButton("res/number-button-rr.png", "", config, function() {
						director.level.multiplier += director.level.adder;
						document.getElementById("hundredsPlace").textContent = Math.floor(director.level.multiplier/100 % 10);
						document.getElementById("tensPlace").textContent = Math.abs(Math.floor(director.level.multiplier/10 % 10));
						document.getElementById("onesPlace").textContent = Math.abs(Math.floor(director.level.multiplier % 10));
			console.log(director.level.multiplier + " up");
					}.bind(this), entity_component_system, stage);

					config = new ObjectConfig('default', 'gui', 192, 192, "center", 234 + (288 / 2), "bottom", -(192 / 2));
					this.rl_number_button = AssetHandler.createButton("res/number-button-rl.png", "", config, function() {
						director.level.multiplier -= director.level.adder;
						document.getElementById("hundredsPlace").textContent = Math.floor(director.level.multiplier/100 % 10);
						document.getElementById("tensPlace").textContent = Math.abs(Math.floor(director.level.multiplier/10 % 10));
						document.getElementById("onesPlace").textContent = Math.abs(Math.floor(director.level.multiplier % 10));
			console.log(director.level.multiplier + " down");
					}.bind(this), entity_component_system, stage);

				}

				break;

			case 4:

				let counter = 0;
				for(var i = 0; i < 20; i++){
					if(user.badges[i] == 1)
						counter++;
				}

				config = new ObjectConfig('default', 'gui', constants.buttonX, constants.buttonY, "left", (constants.buttonX/2 + 10), "bottom", -(constants.buttonY/2 + 10));
				this.menu_button = AssetHandler.createButton("res/login-button.png", "Menu", config, function() { createjs.Sound.play("menu"); director.changeScene(2, entity_component_system, stage, device, user); }.bind(this), entity_component_system, stage);
				let text = "Hits: " + user.hits + "\n\nHighs: " + user.highs + "\n\nLows: " + user.lows + "\n\nTotal Misses: " + (user.highs + user.lows) + "\n\nBadges: " + counter + "\n\n";

				config = new ObjectConfig('default', 'image', 240, 240, "center", 0, "center", 0);
				console.log(config);
				this.statsContainer = AssetHandler.createStatsContainer(user.badges, "res/badges/empty-badge.png", text, "Oldstyle", "32px", "normal", "black", config, entity_component_system, stage);

				break;

			case 5:

				config = new ObjectConfig('default', 'gui', constants.buttonX, constants.buttonY, "left", (constants.buttonX/2 + 10), "bottom", -(constants.buttonY/2 + 10));
				this.menu_button = AssetHandler.createButton("res/login-button.png", "Menu", config, function() { createjs.Sound.play("menu"); director.changeScene(2, entity_component_system, stage, device, user); }.bind(this), entity_component_system, stage);

				break;

			case 6:

				config = new ObjectConfig('default', 'gui', constants.buttonX, constants.buttonY, "left", (constants.buttonX/2 + 10), "bottom", -(constants.buttonY/2 + 10));
				this.menu_button = AssetHandler.createButton("res/login-button.png", "Menu", config, function() { createjs.Sound.play("menu"); director.oneWayScene(entity_component_system, stage, device, user); }.bind(this), entity_component_system, stage);

				break;

			case 7:

				config = new ObjectConfig('default', 'gui', constants.buttonX, constants.buttonY, "left", (constants.buttonX/2 + 10), "bottom", -(constants.buttonY/2 + 10));
				this.menu_button = AssetHandler.createButton("res/login-button.png", "Menu", config, function() { createjs.Sound.play("menu"); director.changeScene(2, entity_component_system, stage, device, user); }.bind(this), entity_component_system, stage);

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

				config = new ObjectConfig('default', 'image', 120, 108, "center", -480 + 120 / 2, "center", 96 + 108 / 2);
				var reef = AssetHandler.createSprite(reefS, config, entity_component_system, stage);
				reef.gotoAndPlay(0);

				config = new ObjectConfig('default', 'image', 180, 120, "center", -243 + 180 / 2, "center", -246 + 120 / 2);
				var skyland = AssetHandler.createSprite(skylandS, config, entity_component_system, stage);
				skyland.gotoAndPlay(0);

			if (user.authenticated) {

				config = new ObjectConfig('default', 'gui', constants.buttonX, constants.buttonY, "left", (constants.buttonX/2 + 10), "bottom", -(constants.buttonY/2 + 10));
					this.menu_button = AssetHandler.createButton("res/login-button.png", "Menu", config, function() { createjs.Sound.play("menu"); director.changeScene(2, entity_component_system, stage, device, user); }.bind(this), entity_component_system, stage);

			} else {

				config = new ObjectConfig('default', 'gui', constants.buttonX, constants.buttonY, "left", (constants.buttonX/2 + 10), "bottom", -(constants.buttonY/2 + 10));
				this.menu_button = AssetHandler.createButton("res/login-button.png", "Back", config, function() { createjs.Sound.play("menu");  director.changeScene(10, entity_component_system, stage, device, user); }.bind(this), entity_component_system, stage);

				config = new ObjectConfig('default', 'gui', constants.buttonX, constants.buttonY, "right", -(constants.buttonX/2 + 10), "bottom", -(constants.buttonY/2 + 10));
				this.menu_button = AssetHandler.createButton("res/login-button.png", "How To Play", config, function() { createjs.Sound.play("menu"); director.indicatorFunction(0, entity_component_system, stage, device, user); }.bind(this), entity_component_system, stage);

			}

			for (var i = 1; i < (constants.num_levels + 1); i++) {

				let indicatorType = '';

				if (i === director.level.current_level) {
					indicatorType = '-current';
				} else if (director.level.visitedLevels[i]) {
					indicatorType = '-visited';
				}

				config = new ObjectConfig('default', 'gui', 48, 48, "center", indicatorCoordinates[i].x/* + 48/2*/, "center", indicatorCoordinates[i].y/* + 48/2*/);
				var indicator = AssetHandler.createButton("res/map-indicator" + indicatorType + ".png", (i).toString(), config, levels[i].open, entity_component_system, stage);
				// var indicator = AssetHandler.createButton("res/map-indicator.png", (i).toString(), config, function (this) { director.indicatorFunction(i).bind(this) }, entity_component_system, stage);
				indicator.on("mouseover", function (evt) { this.handleMouseEvent(evt, stage, device.scale.scene_scale_Y) }.bind(this));
				indicator.on("mouseout", function (evt) { this.handleMouseEvent(evt, stage, device.scale.scene_scale_Y) }.bind(this));

				this.indicators.push(indicator);

			}

			config = new ObjectConfig('default', 'gui', 210, 310, "center", 200, "center", 200);
			console.log(config);
			this.containerFrame = AssetHandler.createContainerFrame(config, entity_component_system, stage);
			this.containerFrame.visible = false;

			break;

		case 9:

			config = new ObjectConfig('default', 'gui', constants.buttonX, constants.buttonY, "left", (constants.buttonX/2 + 10), "bottom", -(constants.buttonY/2 + 10));
			this.menu_button = AssetHandler.createButton("res/login-button.png", "Menu", config, function() {
			createjs.Sound.play("menu");
			// director.changeScene(3, entity_component_system, stage, device, user);
			director.oneWayScene(entity_component_system, stage, device, user);

			// director.level.openPauseMenu();

			// director.level.pauseAnimation(true);
			// director.level.visibleButton(true);
			// director.level.visibleForm(false);

			}.bind(this), entity_component_system, stage);

		break;

			case 10:

				config = new ObjectConfig('default', 'gui', constants.buttonX, constants.buttonY, "right", -(constants.buttonX/2 + 10), "top", (constants.buttonY/2 + 10));
				this.logout_button = AssetHandler.createButton("res/login-button.png", "Login!", config, function() { createjs.Sound.play("menu"); director.changeScene(0, entity_component_system, stage, device, user); }.bind(this), entity_component_system, stage);

				config = new ObjectConfig('default', 'gui', constants.buttonX, constants.buttonY, "center", 0, "bottom", - 2.5 * (constants.buttonY/2 + 10));
				this.play_button = AssetHandler.createButton("res/login-button.png", "Start!!", config, function() { createjs.Sound.play("menu"); director.changeScene(8, entity_component_system, stage, device, user); }.bind(this), entity_component_system, stage);

				break;

			default:

		}

	// this.landscape_warning = new createjs.Shape();

	// config = new ObjectConfig('default', 'image', 288, 288, "center", 0, "center", 0);
	// this.phone_rotation = AssetHandler.createSprite(this.phone_rotationS, config, entity_component_system, stage);
	// stage.removeChild(this.phone_rotation);

	}

	handleMouseEvent (evt, stage, scene_scale_Y) {

		if(evt.type == "mouseover"){

			console.log("level " + evt.target.text);
			let titleFrameElement = this.containerFrame.getChildByName("titleFrame");
			titleFrameElement.text = levelDescriptors[evt.target.text].title;
			titleFrameElement = this.containerFrame.getChildByName("descripterFrame");
			titleFrameElement.text = levelDescriptors[evt.target.text].description;
			this.containerFrame.x = scene_scale_Y * indicatorCoordinates[evt.target.text].x + stage.canvas.width / 2 + 15;
			this.containerFrame.y = scene_scale_Y * indicatorCoordinates[evt.target.text].y + stage.canvas.height / 2 + 15;
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
