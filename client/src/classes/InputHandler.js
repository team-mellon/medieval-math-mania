//////////////////
// INPUTHANDLER //
//////////////////

class InputHandler {



  constructor() {

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



  //---------------//
  // Key detection //
  //---------------//

  // Check all the keys to see if they are pressed
  keyDown (evt) {

    this.keys[evt.keyCode] = true;

  }

  // Check all the keys to see if they are released
  keyUp (evt) {

    delete this.keys[evt.keyCode];

  }



  //-----------------//
  // Touch detection //
  //-----------------//

  // Touch start handler
  handleStart (evt) {

    // Prevent the default behavior of the event
    evt.preventDefault();

    // Logs the touch start location for drag calculations
    this.start_touch = evt.changedTouches[0].screenY
    console.log("start: " + this.start_touch);

    // Trigger bool to indicate touch event
    this.touch = true;

  }

  // Touch end handler
  handleEnd (evt) {

    // Prevent the default behavior of the event
    evt.preventDefault();

    // Logs the touch end location for drag calculations
    this.end_touch = evt.changedTouches[0].screenY
    console.log("end: " + this.end_touch);

    // Trigger bool to indicate drag event
    console.log("drag: " + (this.end_touch - this.start_touch));
    if (this.end_touch - this.start_touch < -100) {
      console.log(this.drag_up);
      this.drag_up = true;
      console.log(this.drag_up);
    }

    // Clear touch values
    this.start_touch = this.end_touch = 0;

  }



}

export default InputHandler;
