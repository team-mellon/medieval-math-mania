var num_levels = 2;
var current_level = 1;

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

var structure_center,
    structure_left_center,
    structure_right_center,
    structure_body,
    structure_left,
    structure_right,
    structure_facade;
var center,
    left_center,
    right_center,
    body,
    left,
    right,
    facade;
var centerS,
    left_centerS,
    right_centerS,
    bodyS,
    leftS,
    rightS,
    facadeS;
var structureX = 1920;
var structureY = 768;

var projectile;
var projectileS;
var projectileX = 96;
var projectileY = 96;

var catapult;
var catapultS;
var catapultX = 288;
var catapultY = 384;

function loadLevel() {

  switch(current_level) {

    case 1:
      bg_color = "#89a7a0";
      break;

    case 2:
      bg_color = "#460a14";
      break;

    default:
      // code block

  }

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
    frames: {width:288, height:384, count:24, regX: 0, regY:0, spacing:0, margin:0},
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
  structure_facade = createSprite(facadeS, structureX, structureY);

  // Main character in foreground
  projectile = createSprite(projectileS, projectileX, projectileY);
  projectile.gotoAndPlay(0);
  catapult = createSprite(catapultS, catapultX, catapultY);

}

function destroyLevel() {

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
  stage.removeChild(structure_facade);

  // Main character in foreground
  stage.removeChild(projectile);
  stage.removeChild(catapult);

  // REMOVE THIS!!!!! BUT ALSO THE REST OF IT
  stage.removeChild(lute);

  stage.removeChild(big_boss);

}

function changeLevel(new_level) {

  hide_knight = false;
  hide_archer1 = false;
  hide_archer2 = false;
  hide_archer3 = false;
  hide_archer4 = false;

  current_level = new_level;

  if (current_level > num_levels) {
    current_level = 1;
  }

  loadLevel();
  destroyScene();
  createScene();
  resize();

}

function scaleLevel() {

  // Level structure in background
  scale_image(structure_center, stage.canvas.width / 2, stage.canvas.height / 2);
  scale_image(structure_left_center, stage.canvas.width / 2, stage.canvas.height / 2);
  scale_image(structure_right_center, stage.canvas.width / 2, stage.canvas.height / 2);

  // Bad guys in midground
  scale_image(henchman_left, stage.canvas.width / 2 - (henchmanX/2 + 625) * scene_scale_Y, stage.canvas.height / 2 + (24) * scene_scale_Y);
  scale_image(henchman_left_center, stage.canvas.width / 2 - (henchmanX/2 + 375) * scene_scale_Y, stage.canvas.height / 2);
  scale_image(boss, stage.canvas.width / 2, stage.canvas.height / 2);
  scale_image(henchman_right_center, stage.canvas.width / 2 + (henchmanX/2 + 375) * scene_scale_Y, stage.canvas.height / 2);
  scale_image(henchman_right, stage.canvas.width / 2 + (henchmanX/2 + 625 ) * scene_scale_Y, stage.canvas.height / 2 + (24) * scene_scale_Y);

  // Level structure in foreground
  scale_image(structure_body, stage.canvas.width / 2, stage.canvas.height / 2);
  scale_image(structure_left, stage.canvas.width / 2, stage.canvas.height / 2);
  scale_image(structure_right, stage.canvas.width / 2, stage.canvas.height / 2);
  scale_image(structure_facade, stage.canvas.width / 2, stage.canvas.height / 2);

  // Main character in foreground
  scale_image(projectile, stage.canvas.width / 2, stage.canvas.height - (projectileY/2 + 57) * scene_scale_Y);
  scale_image(catapult, stage.canvas.width / 2, stage.canvas.height - (catapultY/2 - 57) * scene_scale_Y);

  if (fire_counter == 5)
    scale_image(big_boss, stage.canvas.width / 2, stage.canvas.height / 2);

}
