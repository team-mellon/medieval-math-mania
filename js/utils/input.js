// Key detection

var keys = {};

function keydown(event) {
    keys[event.keyCode] = true;
}

function keyup(event) {
    delete keys[event.keyCode];
}

// Touch detection

var touch = false;
var drag_up = false;
var drag_down = false;
var start_touch = 0;
var end_touch = 0;

function handleStart(evt) {
  evt.preventDefault();
  start_touch = evt.changedTouches[0].screenY
  touch = true;
  console.log("start: " + start_touch);
}

function handleEnd(evt) {
  evt.preventDefault();
  end_touch = evt.changedTouches[0].screenY
  console.log("end: " + end_touch);
  if (end_touch - start_touch < 0) {
    drag_up = true;
  }
  start_touch = end_touch = 0;
}

// Scaling the stage and assets

var max_scale_Y = 768;
var max_scale_X = 1920;

var scene_scale_X;
var scene_scale_Y;

var scene_margin_X;

function scale_image(image, x_size, y_size) {

  image.scaleX = scene_scale_X;
  image.scaleY = scene_scale_Y;

}
