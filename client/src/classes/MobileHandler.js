///////////////////
// MOBILEHANDLER //
///////////////////

class MobileHandler {



  constructor() {

    this.isMobile = false;

  }



  orientationCheck () {

    if (window.innerHeight > window.innerWidth && this.isMobile) {

      if(!this.added) {

        this.stage.addChild(this.landscape_warning);
        this.stage.addChild(this.phone_rotation);
        this.phone_rotation.gotoAndPlay(0);
        scene_html = document.getElementById("sceneHTML");
        scene_html.hidden = true;
        this.added = true;

      }

    } else {

      if(this.added){

        this.stage.removeChild(this.landscape_warning);
        this.stage.removeChild(this.phone_rotation);
        scene_html = document.getElementById("sceneHTML");
        scene_html.hidden = false;
        this.added = false;

      }

    }

  }

  // Check to see if the current device is mobile
  mobileCheck () {

    // Print out the device if known, if not maybe store it in analytics but at least print it out
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
