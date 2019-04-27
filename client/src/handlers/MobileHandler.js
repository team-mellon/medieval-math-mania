////////////////////////////////////////////////////////////////////////////////
// MOBILEHANDLER                                                              //
////////////////////////////////////////////////////////////////////////////////
// Handler for mobile variables. This encompasses things like whether or not  //
// the current device is mobile and what orientation the device is in.        //
////////////////////////////////////////////////////////////////////////////////

class MobileHandler {

  // Constructor to initialize mobile checking variables
  constructor() {

    // Bool for checking if the current device is mobile
    this.isMobile = false;

    // Bools for checking if the orientation of the current device is portrait
    this.isPortrait = true;

    // Bools for checking if the orientation of the current device is portrait
    this.isLandscape = false;

  }

  // Function that checks to see what the orientation is
  orientationCheck (console, window) {

    // console.log(window.innerHeight + ":" + window.innerWidth);
    console.log(":");

    // If window height is greater than width
    if (window.innerHeight > window.innerWidth) {

      // The orientation is portrait
      this.isPortrait = true;
      this.isLandscape = false;


    // If window width is greater than height
    } else {

      // The orientation is landscape
      this.isPortrait = false;
      this.isLandscape = true;

    }

  }

  // Function to check to see if the current device is mobile
  mobileCheck (console, navigator) {

    // Print out the device if known, if not known maybe store it for analytics but at least print it out
    switch (true) {

      case ( /Android/i.test(navigator.userAgent) ):      console.log("Android mobile device");       break;
      case ( /webOS/i.test(navigator.userAgent) ):        console.log("webOS mobile device");         break;
      case ( /iPhone/i.test(navigator.userAgent) ):       console.log("iPhone mobile device");        break;
      case ( /iPad/i.test(navigator.userAgent) ):         console.log("iPad mobile device");          break;
      case ( /iPod/i.test(navigator.userAgent) ):         console.log("iPod mobile device");          break;
      case ( /BlackBerry/i.test(navigator.userAgent) ):   console.log("BlackBerry mobile device");    break;
      case ( /IEMobile/i.test(navigator.userAgent) ):     console.log("Microsoft mobile device");     break;
      case ( /Opera Mini/i.test(navigator.userAgent) ):   console.log("Opera Mini mobile browser");   break;

      default:                                            console.log("Unknown device type");         break;

    }

    // Set the mobile flag
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {

      this.isMobile = true;

    }

  }

}

export default MobileHandler;
