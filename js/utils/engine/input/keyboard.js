///////////////////
// Key detection //
///////////////////

// Holds the states of all the keys
var keys = {};

// Check all the keys to see if they are pressed
function keydown(event) {

    keys[event.keyCode] = true;

}

// Check all the keys to see if they are released
function keyup(event) {

    delete keys[event.keyCode];

}
