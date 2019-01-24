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
var center,
    left_center,
    right_center,
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
      center = city_center;
      left_center = city_left_center;
      right_center = city_right_center;
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
      center = sea_center;
      left_center = sea_left_center;
      right_center = sea_right_center;
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

  structure_center = createImage(center, structureX, structureY);
  structure_left_center = createImage(left_center, structureX, structureY);
  structure_right_center = createImage(right_center, structureX, structureY);
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

  current_level++;

  if (current_level > num_levels) {
    current_level = 1;
  }

  loadLevel();
  destroyLevel();
  createLevel();
  resize();
  playSound();

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
  henchman_left.x = (henchmanX/2 + 103) * scene_scale_Y;
  henchman_left.y = stage.canvas.height / 2 + (24) * scene_scale_Y;
  scale_image(henchman_left_center, henchmanX, henchmanY);
  henchman_left_center.x = (henchmanX/2 + 366) * scene_scale_Y;
  henchman_left_center.y = stage.canvas.height / 2;
  scale_image(boss, bossX, bossY);
  boss.x = stage.canvas.width / 2;
  boss.y = stage.canvas.height / 2;
  scale_image(henchman_right_center, henchmanX, henchmanY);
  henchman_right_center.x = stage.canvas.width - (henchmanX/2 + 366) * scene_scale_Y;
  henchman_right_center.y = stage.canvas.height / 2;
  scale_image(henchman_right, henchmanX, henchmanY);
  henchman_right.x = stage.canvas.width - (henchmanX/2 + 103 ) * scene_scale_Y;
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
    images: ["res/knight.png"],
    frames: {width:96, height:96, count:12, regX: 0, regY:0, spacing:0, margin:0},
    framerate: 6
};
city_henchman = {
    images: ["res/archer.png"],
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
city_center = "res/castle/center-tower.png";
city_left_center = "res/castle/left-center-tower.png";
city_right_center = "res/castle/right-center-tower.png";
city_body = "res/castle/body.png";
city_left = "res/castle/left-tower.png";
city_right = "res/castle/right-tower.png";
city_facade = "res/castle/facade.png";

sea_boss = {
    images: ["res/pirate.png"],
    frames: {width:96, height:96, count:12, regX: 0, regY:0, spacing:0, margin:0},
    framerate: 6
};
sea_henchman = {
    images: ["res/mermaid.png"],
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
sea_center = "res/ship/center-tower.png";
sea_left_center = "res/ship/left-center-tower.png";
sea_right_center = "res/ship/right-center-tower.png";
sea_body = "res/ship/body.png";
sea_left = "res/ship/left-tower.png";
sea_right = "res/ship/right-tower.png";
sea_facade = "res/ship/facade.png";
