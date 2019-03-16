/////////////////////
// Touch detection //
/////////////////////

// Bool to indicate touch event
var touch = false;

// Bool to indicate an upward drag
var drag_up = false;
var drag_down = false;

// Location of start and end touches for drag calculations
var start_touch = 0;
var end_touch = 0;

// Touch start handler
function handleStart(evt) {

  // Prevent the default behavior of the event
  evt.preventDefault();

  // Logs the touch start location for drag calculations
  start_touch = evt.changedTouches[0].screenY
  console.log("start: " + start_touch);

  // Trigger bool to indicate touch event
  touch = true;

}

// Touch end handler
function handleEnd(evt) {

  // Prevent the default behavior of the event
  evt.preventDefault();

  // Logs the touch end location for drag calculations
  end_touch = evt.changedTouches[0].screenY
  console.log("end: " + end_touch);

  // Trigger bool to indicate drag event
  if (end_touch - start_touch < -100) {
    drag_up = true;
  }

  // Clear touch values
  start_touch = end_touch = 0;

}
