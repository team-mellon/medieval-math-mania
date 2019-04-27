////////////////////////////////////////////////////////////////////////////////
// INPUTHANDLER                                                               //
////////////////////////////////////////////////////////////////////////////////
// Handler for input calls. This encompasses key event handlers, and touch    //
// event handlers.                                                            //
////////////////////////////////////////////////////////////////////////////////

class InputHandler {

  // Constructor to initialize input checking variables
  constructor(drawingCanvas) {

    drawingCanvas.addEventListener("touchstart", this.handleStart.bind(this), false);
    drawingCanvas.addEventListener('touchend', this.handleEnd.bind(this), false);
    drawingCanvas.addEventListener("touchcancel", this.handleCancel.bind(this), false);
    drawingCanvas.addEventListener("touchmove", this.handleMove.bind(this), false);

    // Holds the states of all the keys
    this.keys = {};

    // Bool to indicate touch event
    this.touch = false;

    // Bool to indicate an upward drag
    this.drag_up = false;
    this.drag_down = false;

    // Location of start and end touches for drag calculations
    this.start_touch = 0;
    this.end_touch = 0;

  }

  // Function that checks all the keys to see if they are pressed
  keyDown (evt) {

    // Set incoming keycode to true
    this.keys[evt.keyCode] = true;

  }

  // Function that checks all the keys to see if they are released
  keyUp (evt) {

    // Delete the state at the incoming keycode location
    delete this.keys[evt.keyCode];

  }

  // Function that detects the start of a touch event
  handleStart (evt) {

    // Prevent the default behavior of the event
    evt.preventDefault();

    // Logs the touch start location for drag calculations
    this.start_touch = evt.changedTouches[0].screenY
    console.log("start: " + this.start_touch);

    // Trigger bool to indicate touch event
    this.touch = true;

  }

  // Function that detects the end of a touch event
  handleEnd (evt) {

    // Prevent the default behavior of the event
    evt.preventDefault();

    // Logs the touch end location for drag calculations
    this.end_touch = evt.changedTouches[0].screenY
    console.log("end: " + this.end_touch);

    // Trigger bool to indicate drag event
    console.log("drag: " + (this.end_touch - this.start_touch));

    // If the end of the touch minus the beginning of the touch is less than -100
    if ((this.end_touch - this.start_touch) < -100) {

      // Register as a valid drag
      this.drag_up = true;
      // console.log(this.drag_up);

    }

    // Clear touch values
    this.start_touch = this.end_touch = 0;

  }

  // Function that detects the start of a touch event
  handleCancel (evt) {

    // Prevent the default behavior of the event
    evt.preventDefault();

  }

  // Function that detects the end of a touch event
  handleMove (evt) {

    // Prevent the default behavior of the event
    evt.preventDefault();

  }

}

export default InputHandler;
