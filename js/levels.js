var num_levels = 2;
var current_level = 1;

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
var centerS,
    left_centerS,
    right_centerS,
    body,
    left,
    right,
    facade;
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

    case 0:

      break;

    case 1:
      bg_color = "#89a7a0";
      bossS = city_boss;
      henchmanS = city_henchman;
      projectileS = city_projectile;
      catapultS = city_catapult;
      centerS = city_center;
      left_centerS = city_left_center;
      right_centerS = city_right_center;
      body = city_body;
      left = city_left;
      right = city_right;
      facade = city_facade;
      break;

    case 2:
      bg_color = "#460a14";
      bossS = sea_boss;
      henchmanS = sea_henchman;
      projectileS = sea_projectile;
      catapultS = sea_catapult;
      centerS = sea_center;
      left_centerS = sea_left_center;
      right_centerS = sea_right_center;
      body = sea_body;
      left = sea_left;
      right = sea_right;
      facade = sea_facade;
      break;

    default:
      // code block

  }

}

function createLevel() {

  structure_center = createSprite(centerS, structureX, structureY);
  structure_left_center = createSprite(left_centerS, structureX, structureY);
  structure_right_center = createSprite(right_centerS, structureX, structureY);
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
  structure_body = createImage(body, structureX, structureY);
  structure_left = createImage(left, structureX, structureY);
  structure_right = createImage(right, structureX, structureY);
  structure_facade = createImage(facade, structureX, structureY);
  projectile = createSprite(projectileS, projectileX, projectileY);
  projectile.gotoAndPlay(0);
  catapult = createSprite(catapultS, catapultX, catapultY);

}

function destroyLevel() {

  stage.removeChild(structure_center);
  stage.removeChild(structure_left_center);
  stage.removeChild(structure_right_center);
  stage.removeChild(henchman_left);
  stage.removeChild(henchman_left_center);
  stage.removeChild(boss);
  stage.removeChild(henchman_right_center);
  stage.removeChild(henchman_right);
  stage.removeChild(structure_body);
  stage.removeChild(structure_left);
  stage.removeChild(structure_right);
  stage.removeChild(structure_facade);
  stage.removeChild(projectile);
  stage.removeChild(catapult);
  stage.removeChild(lute);

  // stage.clear();

}

function changeLevel() {

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

  // Level structure in background
  scale_image(structure_center, structureX, structureY);
  structure_center.x = stage.canvas.width / 2;
  structure_center.y = stage.canvas.height / 2;
  scale_image(structure_left_center, structureX, structureY);
  structure_left_center.x = stage.canvas.width / 2;
  structure_left_center.y = stage.canvas.height / 2;
  scale_image(structure_right_center, structureX, structureY);
  structure_right_center.x = stage.canvas.width / 2;
  structure_right_center.y = stage.canvas.height / 2;

  // Bad guys in midground
  scale_image(henchman_left, henchmanX, henchmanY);
  henchman_left.x = stage.canvas.width / 2 - (henchmanX/2 + 625) * scene_scale_Y;
  henchman_left.y = stage.canvas.height / 2 + (24) * scene_scale_Y;
  scale_image(henchman_left_center, henchmanX, henchmanY);
  henchman_left_center.x = stage.canvas.width / 2 - (henchmanX/2 + 375) * scene_scale_Y;
  henchman_left_center.y = stage.canvas.height / 2;
  scale_image(boss, bossX, bossY);
  boss.x = stage.canvas.width / 2;
  boss.y = stage.canvas.height / 2;
  scale_image(henchman_right_center, henchmanX, henchmanY);
  henchman_right_center.x = stage.canvas.width / 2 + (henchmanX/2 + 375) * scene_scale_Y;
  henchman_right_center.y = stage.canvas.height / 2;
  scale_image(henchman_right, henchmanX, henchmanY);
  henchman_right.x = stage.canvas.width / 2 + (henchmanX/2 + 625 ) * scene_scale_Y;
  henchman_right.y = stage.canvas.height / 2 + (24) * scene_scale_Y;

  // Level structure in foreground
  scale_image(structure_body, structureX, structureY);
  structure_body.x = stage.canvas.width / 2;
  structure_body.y = stage.canvas.height / 2;
  scale_image(structure_left, structureX, structureY);
  structure_left.x = stage.canvas.width / 2;
  structure_left.y = stage.canvas.height / 2;
  scale_image(structure_right, structureX, structureY);
  structure_right.x = stage.canvas.width / 2;
  structure_right.y = stage.canvas.height / 2;
  scale_image(structure_facade, structureX, structureY);
  structure_facade.x = stage.canvas.width / 2;
  structure_facade.y = stage.canvas.height / 2;

  // Main character in foreground
  scale_image(projectile, projectileX, projectileY);
  projectile.x = stage.canvas.width / 2;
  projectile.y = stage.canvas.height - (projectileY/2 + 57) * scene_scale_Y;
  scale_image(catapult, catapultX, catapultY);
  catapult.x = stage.canvas.width / 2;
  catapult.y = stage.canvas.height - (catapultY/2 - 57) * scene_scale_Y;

}

city_boss = {
    images: ["res/level01/boss.png"],
    frames: {width:96, height:96, count:12, regX: 0, regY:0, spacing:0, margin:0},
    framerate: 6
};
city_henchman = {
    images: ["res/level01/henchman.png"],
    frames: {width:96, height:96, count:12, regX: 0, regY:0, spacing:0, margin:0},
    framerate: 6
};
city_projectile = {
    images: ["res/ammo.png"],
    frames: {width:96, height:96, count:12, regX: 0, regY:0, spacing:0, margin:0},
    framerate: 6
};
city_catapult = {
    images: ["res/catapult.png"],
    frames: {width:288, height:384, count:24, regX: 0, regY:0, spacing:0, margin:0},
    framerate: 6
};
city_center = {
    images: ["res/level01/center-tower.png"],
    frames: {width:1920, height:768, count:12, regX: 0, regY:0, spacing:0, margin:0},
    framerate: 6
};
city_left_center = {
    images: ["res/level01/left-center-tower.png"],
    frames: {width:1920, height:768, count:6, regX: 0, regY:0, spacing:0, margin:0},
    framerate: 6
};
city_right_center = {
    images: ["res/level01/right-center-tower.png"],
    frames: {width:1920, height:768, count:6, regX: 0, regY:0, spacing:0, margin:0},
    framerate: 6
};
city_body = "res/level01/body.png";
city_left = "res/level01/left-tower.png";
city_right = "res/level01/right-tower.png";
city_facade = "res/level01/facade.png";

sea_boss = {
    images: ["res/level02/boss.png"],
    frames: {width:96, height:96, count:12, regX: 0, regY:0, spacing:0, margin:0},
    framerate: 6
};
sea_henchman = {
    images: ["res/level02/henchman.png"],
    frames: {width:96, height:96, count:12, regX: 0, regY:0, spacing:0, margin:0},
    framerate: 6
};
sea_projectile = {
    images: ["res/ammo.png"],
    frames: {width:96, height:96, count:12, regX: 0, regY:0, spacing:0, margin:0},
    framerate: 6
};
sea_catapult = {
    images: ["res/catapult.png"],
    frames: {width:288, height:384, count:24, regX: 0, regY:0, spacing:0, margin:0},
    framerate: 6
};
sea_center = {
    images: ["res/level02/center-tower.png"],
    frames: {width:1920, height:768, count:1, regX: 0, regY:0, spacing:0, margin:0},
    framerate: 6
};
sea_left_center = {
    images: ["res/level02/left-center-tower.png"],
    frames: {width:1920, height:768, count:1, regX: 0, regY:0, spacing:0, margin:0},
    framerate: 6
};
sea_right_center = {
    images: ["res/level02/right-center-tower.png"],
    frames: {width:1920, height:768, count:1, regX: 0, regY:0, spacing:0, margin:0},
    framerate: 6
};
sea_body = "res/level02/body.png";
sea_left = "res/level02/left-tower.png";
sea_right = "res/level02/right-tower.png";
sea_facade = "res/level02/facade.png";
