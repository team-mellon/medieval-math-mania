var num_levels = 2;
var current_level = 1;

var number_text;
var number_spacing = 10;
var number_spacer = 25;
var numberline;

var numberlineS;

var big_boss;

var big_bossS;

var boss;

var bossS;

var bossX = 96;
var bossY = 96;

var henchman_left,
    henchman_left_center,
    henchman_right_center,
    henchman_right;

var henchmanS;

var henchmanX = 96;
var henchmanY = 96;

var end_level_flag;
var end_level_flagS;

var structure_center,
    structure_left_center,
    structure_right_center,
    structure_body,
    structure_left,
    structure_right,
    structure_facade,
    structure_banner;
var center,
    left_center,
    right_center,
    body,
    left,
    right,
    facade,
    banner;

var centerS,
    left_centerS,
    right_centerS,
    bodyS,
    leftS,
    rightS,
    facadeS,
    bannerS;

var structureX = 1920;
var structureY = 768;

var firework_low,
    firework_hit,
    firework_high;

var firework_lowS,
    firework_hitS,
    firework_highS;

var projectile;

var projectileS;

var projectileX = 96;
var projectileY = 96;

var catapult;

var catapultS;

var catapultX = 288;
var catapultY = 384;

var preload;

function loadLevel() {

  switch(current_level) {

    case 1: // City
      bg_color = "#c9e6ff";
      break;

    case 2: // Grasslands
      bg_color = "#c9f9ff";
      break;

    case 3: // Volcano
      bg_color = "#3b0a0a";
      break;

    case 4: // Sea
      bg_color = "#c2ffe6";
      break;

    // case 5: // Mountains
    //   bg_color = "#b3b3b3";
    //   break;

    // case 6: // Summit
    //   bg_color = "#effffe";
    //   break;

    // case 7: // Cave
    //   bg_color = "#010027";
    //   break;

    case 5: // Forest
      bg_color = "#2f3b25";
      break;

    case 6: // Alpine
      bg_color = "#cae3e9";
      break;

    // case 7: // Woods
    //   bg_color = "#3f2900";
    //   break;

    case 7: // Swamp
      bg_color = "#292c2b";
      break;

    // case 9: // Deadlands
    //   bg_color = "#231e25";
    //   break;

    default:
      // code block

  }

  loadImage();

  end_level_flagS = {
    images: ["res/endgame-flag.png"],
    frames: {width:1920, height:768, count:12, regX: 0, regY:0, spacing:0, margin:0},
    framerate: 6
  };
  numberlineS = {
    images: ["res/numberline.png"],
    frames: {width:1920, height:768, count:1, regX: 0, regY:0, spacing:0, margin:0},
    framerate: 6
  };

  bossS = {
    images: ["res/level" + current_level + "/boss.png"],
    frames: {width:96, height:96, count:12, regX: 0, regY:0, spacing:0, margin:0},
    framerate: 6
  };

  henchmanS = {
    images: ["res/level" + current_level + "/henchman.png"],
    frames: {width:96, height:96, count:12, regX: 0, regY:0, spacing:0, margin:0},
    framerate: 6
  };

  projectileS = {
    images: ["res/ammo.png"],
    frames: {width:96, height:96, count:12, regX: 0, regY:0, spacing:0, margin:0},
    framerate: 6
  };

  catapultS = {
    images: ["res/catapult.png"],
    frames: {width:288, height:384, count:12, regX: 0, regY:0, spacing:0, margin:0},
    framerate: 6
  };

  centerS = {
    images: ["res/level" + current_level + "/center-tower.png"],
    frames: {width:1920, height:768, count:12, regX: 0, regY:0, spacing:0, margin:0},
    framerate: 6
  };

  left_centerS = {
    images: ["res/level" + current_level + "/left-center-tower.png"],
    frames: {width:1920, height:768, count:6, regX: 0, regY:0, spacing:0, margin:0},
    framerate: 6
  };

  right_centerS = {
    images: ["res/level" + current_level + "/right-center-tower.png"],
    frames: {width:1920, height:768, count:6, regX: 0, regY:0, spacing:0, margin:0},
    framerate: 6
  };

  bannerS = {
    images: ["res/banners.png"],
    frames: {width:1920, height:768, count:1, regX: 0, regY:0, spacing:0, margin:0},
    framerate: 6
  };

  bodyS = {
    images: ["res/level" + current_level + "/body.png"],
    frames: {width:1920, height:768, count:6, regX: 0, regY:0, spacing:0, margin:0},
    framerate: 6
  };

  leftS = {
    images: ["res/level" + current_level + "/left-tower.png"],
    frames: {width:1920, height:768, count:6, regX: 0, regY:0, spacing:0, margin:0},
    framerate: 6
  };

  rightS = {
    images: ["res/level" + current_level + "/right-tower.png"],
    frames: {width:1920, height:768, count:6, regX: 0, regY:0, spacing:0, margin:0},
    framerate: 6
  };

  facadeS = {
    images: ["res/level" + current_level + "/facade.png"],
    frames: {width:1920, height:768, count:6, regX: 0, regY:0, spacing:0, margin:0},
    framerate: 6
  };

  big_bossS = {
    images: ["res/level" + current_level + "/big-boss.png"],
    frames: {width:1920, height:768, count:1, regX: 0, regY:0, spacing:0, margin:0},
    framerate: 6
  };

  firework_lowS = {
    images: ["res/firework-low.png"],
    frames: {width:1920, height:768, count:12, regX: 0, regY:0, spacing:0, margin:0},
    framerate: 6
  };

  firework_hitS = {
    images: ["res/firework-hit.png"],
    frames: {width:1920, height:768, count:12, regX: 0, regY:0, spacing:0, margin:0},
    framerate: 6
  };

  firework_highS = {
    images: ["res/firework-high.png"],
    frames: {width:1920, height:768, count:12, regX: 0, regY:0, spacing:0, margin:0},
    framerate: 6
  };

  number_text = [];
}

function loadImage() {

	preload = new createjs.LoadQueue();
	preload.on("progress", loading);
	preload.loadFile("res/numberline.png");
	preload.loadFile("res/level" + current_level + "/boss.png");
	preload.loadFile("res/level" + current_level + "/henchman.png");
	preload.loadFile("res/ammo.png");
	preload.loadFile("res/catapult.png");
	preload.loadFile("res/level" + current_level + "/center-tower.png");
	preload.loadFile("res/level" + current_level + "/left-center-tower.png");
	preload.loadFile("res/level" + current_level + "/right-center-tower.png");
	preload.loadFile("res/level" + current_level + "/body.png");
	preload.loadFile("res/level" + current_level + "/left-tower.png");
	preload.loadFile("res/level" + current_level + "/right-tower.png");
	preload.loadFile("res/level" + current_level + "/facade.png");
	preload.loadFile("res/level" + current_level + "/big-boss.png");
	//The 1 at the end on these makes it so only one instance can play at once
	createjs.Sound.registerSound("res/sound_effects/catapult_cocking.wav", "reload");
	createjs.Sound.registerSound("res/sound_effects/catapult_firing.wav", "firing");
	createjs.Sound.registerSound("res/sound_effects/victory.wav", "win", 1);
	createjs.Sound.registerSound("res/sound_effects/fire_lighting.wav", "light", 1);
	createjs.Sound.registerSound("res/sound_effects/crumbling.wav", "crumble");
}

function createLevel() {

  // Level structure in background
  structure_center = createSprite(centerS, structureX, structureY);
  structure_left_center = createSprite(left_centerS, structureX, structureY);
  structure_right_center = createSprite(right_centerS, structureX, structureY);

  // Bad guys in midground
  henchman_left = createSprite(henchmanS, henchmanX, henchmanY);
  henchman_left.gotoAndPlay(0);
  henchman_left_center = createSprite(henchmanS, henchmanX, henchmanY);
  henchman_left_center.gotoAndPlay(0);
  boss = createSprite(bossS, bossX, bossY);
  boss.gotoAndPlay(0);
  henchman_right_center = createSprite(henchmanS, henchmanX, henchmanY);
  henchman_right_center.gotoAndPlay(0);
  henchman_right = createSprite(henchmanS, henchmanX, henchmanY);
  henchman_right.gotoAndPlay(0);

  // Level structure in foreground
  structure_body = createSprite(bodyS, structureX, structureY);
  structure_left = createSprite(leftS, structureX, structureY);
  structure_right = createSprite(rightS, structureX, structureY);
  structure_banner = createSprite(bannerS, structureX, structureY);
  structure_facade = createSprite(facadeS, structureX, structureY);

  firework_low = createSprite(firework_lowS, structureX, structureY);
  firework_hit = createSprite(firework_hitS, structureX, structureY);
  firework_high = createSprite(firework_highS, structureX, structureY);

  // Main character in foreground
  projectile = createSprite(projectileS, projectileX, projectileY);
  projectile.gotoAndPlay(0);
  catapult = createSprite(catapultS, catapultX, catapultY);

  numberline = createSprite(numberlineS, structureX, structureY);
  createNumbers();

    end_level_flag = createSprite(end_level_flagS, structureX, structureY);
    end_level_flag.visible = false;
}

function destroyLevel() {

    stage.removeChild(end_level_flag);
  // Level structure in background
  stage.removeChild(structure_center);
  stage.removeChild(structure_left_center);
  stage.removeChild(structure_right_center);

  // Bad guys in midground
  stage.removeChild(henchman_left);
  stage.removeChild(henchman_left_center);
  stage.removeChild(boss);
  stage.removeChild(henchman_right_center);
  stage.removeChild(henchman_right);

  // Level structure in foreground
  stage.removeChild(structure_body);
  stage.removeChild(structure_left);
  stage.removeChild(structure_right);
  stage.removeChild(structure_banner);
  stage.removeChild(structure_facade);

  stage.removeChild(firework_low);
  stage.removeChild(firework_hit);
  stage.removeChild(firework_high);

  // Main character in foreground
  stage.removeChild(projectile);
  stage.removeChild(catapult);


  // REMOVE THIS!!!!! BUT ALSO THE REST OF IT
  stage.removeChild(lute);
  stage.removeChild(big_boss);

  stage.removeChild(numberline);
  for(var i = 0; i < 50; i++) {
     stage.removeChild(number_text[i]);
  }
}

function changeLevel(new_level) {

  hide_knight = false;
  hide_archer1 = false;
  hide_archer2 = false;
  hide_archer3 = false;
  hide_archer4 = false;

  current_level++;

  if (current_level > num_levels) {
    current_level = 1;
  }

  loadLevel();
  destroyScene();
  createScene();
  resize();

}

function scaleLevel() {

  // number_spacing = 10;
  number_spacer = 25;

  scale_to_canvas(end_level_flag, "center", 0, "center", 0, "image");
  // Level structure in background
  scale_to_canvas(structure_center, "center", 0, "center", 0, "image");
  scale_to_canvas(structure_left_center, "center", 0, "center", 0, "image");
  scale_to_canvas(structure_right_center, "center", 0, "center", 0, "image");

  // Bad guys in midground
  scale_to_canvas(henchman_left, "center", 0 - (henchmanX/2 + 625) * scene_scale_Y, "center", 0 + (24) * scene_scale_Y, "image");
  scale_to_canvas(henchman_left_center, "center", 0 - (henchmanX/2 + 375) * scene_scale_Y, "center", 0, "image");
  scale_to_canvas(boss, "center", 0, "center", 0, "image");
  scale_to_canvas(henchman_right_center, "center", 0 + (henchmanX/2 + 375) * scene_scale_Y, "center", 0, "image");
  scale_to_canvas(henchman_right, "center", 0 + (henchmanX/2 + 625 ) * scene_scale_Y, "center", 0 + (24) * scene_scale_Y, "image");

  // Level structure in foreground
  scale_to_canvas(structure_body, "center", 0, "center", 0, "image");
  scale_to_canvas(structure_left, "center", 0, "center", 0, "image");
  scale_to_canvas(structure_right, "center", 0, "center", 0, "image");
  scale_to_canvas(structure_banner, "center", 0, "center", 0, "image");
  scale_to_canvas(structure_facade, "center", 0, "center", 0, "image");

  scale_to_canvas(firework_low, "center", 0, "center", 0, "image");
  scale_to_canvas(firework_hit, "center", 0, "center", 0, "image");
  scale_to_canvas(firework_high, "center", 0, "center", 0, "image");

  // Main character in foreground
  scale_to_canvas(projectile, "center", 0, "bottom", 0 - (projectileY/2 + 57) * scene_scale_Y, "image");
  scale_to_canvas(catapult, "center", 0, "bottom", 0 - (catapultY/2 - 57) * scene_scale_Y, "image");

  scale_to_canvas(numberline, "center", 0, "center", 0, "image");

  for(i = 0; i <= 50; i++){
  	scale_to_canvas(number_text[i], "center", 0 - (((number_spacer * 48) + 5) * scene_scale_Y), "top", 30 * scene_scale_Y, "image");
    number_spacer--
    // number_spacing += 48;
  }

  if (fire_counter == 5) {
    scale_to_canvas(big_boss, "center", 0, "center", 0, "image");
  }

}

function myFunction(e) {
  e.preventDefault();
  document.getElementById("myDropdown").classList.toggle("show");
}

function createNumbers(){
  for(i = -25; i <= 25; i++){
  	var temp = createText(i.toString(), "Arial", "16px", "bold", "black", structureX, structureY);
  	number_text.push(temp);
  }
}
