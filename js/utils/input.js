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
  if (end_touch - start_touch < -100) {
    drag_up = true;
  }
  start_touch = end_touch = 0;
}
