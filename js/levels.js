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

var henchman_left,
    henchman_left_center,
    henchman_right_center,
    henchman_right;

var henchmanS;

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

var catapult;
var catapultS;

var preload;

function loadLevel() {

  bg_color = level_bg_colors[current_level - 1];

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

// function loadImage() {
//   var preload = new createjs.LoadQueue();
//   preload.addEventListener("fileload", handleFileComplete);
//   preload.loadFile("assets/preloadjs-bg-center.png");
// }

// function handleFileComplete(event) {
//   document.body.appendChild(event.result);
// }

function createLevel() {

  // Level structure in background
  structure_center = createLevelSprite(centerS, structureX, structureY, "center", 0, "center", 0, "image");
  structure_left_center = createLevelSprite(left_centerS, structureX, structureY, "center", 0, "center", 0, "image");
  structure_right_center = createLevelSprite(right_centerS, structureX, structureY, "center", 0, "center", 0, "image");

  // Bad guys in midground
  henchman_left = createLevelSprite(henchmanS, 96, 96, "center", 0 - (96/2 + 625), "center", 0 + (24), "image");
  henchman_left.gotoAndPlay(0);
  henchman_left_center = createLevelSprite(henchmanS, 96, 96, "center", 0 - (96/2 + 375), "center", 0, "image");
  henchman_left_center.gotoAndPlay(0);
  boss = createLevelSprite(bossS, 96, 96, "center", 0, "center", 0, "image");
  boss.gotoAndPlay(0);
  henchman_right_center = createLevelSprite(henchmanS, 96, 96, "center", 0 + (96/2 + 375), "center", 0, "image");
  henchman_right_center.gotoAndPlay(0);
  henchman_right = createLevelSprite(henchmanS, 96, 96, "center", 0 + (96/2 + 625 ), "center", 0 + (24), "image");
  henchman_right.gotoAndPlay(0);

  // Level structure in foreground
  structure_left = createLevelSprite(leftS, structureX, structureY, "center", 0, "center", 0, "image");
  structure_right = createLevelSprite(rightS, structureX, structureY, "center", 0, "center", 0, "image");
  structure_body = createLevelSprite(bodyS, structureX, structureY, "center", 0, "center", 0, "image");
  structure_banner = createLevelSprite(bannerS, structureX, structureY, "center", 0, "center", 0, "image");
  structure_facade = createLevelSprite(facadeS, structureX, structureY, "center", 0, "center", 0, "image");  // Level structure in foreground

  firework_low = createLevelSprite(firework_lowS, structureX, structureY, "center", 0, "center", 0, "image");
  firework_hit = createLevelSprite(firework_hitS, structureX, structureY, "center", 0, "center", 0, "image");
  firework_high = createLevelSprite(firework_highS, structureX, structureY, "center", 0, "center", 0, "image");

  // Main character in foreground
  projectile = createLevelSprite(projectileS, 96, 96, "center", 0, "bottom", 0 - (96/2 + 57), "image");
  projectile.gotoAndPlay(0);
  catapult = createLevelSprite(catapultS, 288, 384, "center", 0, "bottom", 0 - (384/2 - 57), "image");

  // number_spacing = 10;
  number_spacer = 25;

  for(i = -25; i <= 25; i++){

  	var temp = createLevelText(i.toString(), "Arial", "16px", "bold", "black", structureX, structureY, "center", 0 - (((number_spacer * 48) + 5)), "top", 30, "image");
  	number_text.push(temp);
    // number_spacing += 48;
    number_spacer--;

  }

  numberline = createLevelSprite(numberlineS, structureX, structureY, "center", 0, "center", 0, "image");

  end_level_flag = createLevelSprite(end_level_flagS, structureX, structureY, "center", 0, "center", 0, "image");
  end_level_flag.visible = false;

}

function destroyLevel() {

  for (var i = 0; i < lcs.length; i++) {

    stage.removeChild(lcs[i].object)

  }

  lcs = [];

}

function changeLevel(new_level) {

  resetLevel();

  current_level++;

  if (current_level > num_levels) {
    current_level = 1;
  }

  loadLevel();
  destroyScene();
  createScene();
  resize();

}

function myFunction(e) {

  e.preventDefault();
  document.getElementById("myDropdown").classList.toggle("show");

}
