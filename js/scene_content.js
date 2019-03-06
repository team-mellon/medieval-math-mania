var num_scenes = 10;

var scene_bg_colors = [

  "#919191", // login
  "#919191", // signup
  "#8ac5dc", // menu
  "#000000", // game
  "#919191", // stats
  "#919191", // how 2 play
  "#919191", // settings
  "#919191", // account
  "#919191", // map
  "#919191"  // hint

];

var scene_bg_imgs = [

  "res/login.png", // login
  "res/login.png", // signup
  "", // menu
  "", // game
  "res/login.png", // stats
  "res/login.png", // how 2 play
  "res/login.png", // settings
  "res/login.png", // account
  "res/login.png", // map
  "res/login.png"  // hint

];

var scene_fg_imgs = [

  "res/login_scroll.png", // login
  "res/login_scroll.png", // signup
  "", // menu
  "", // game
  "res/login_scroll.png", // stats
  "res/login_scroll.png", // how 2 play
  "res/login_scroll.png", // settings
  "res/login_scroll.png", // account
  "", // map
  "res/login_scroll.png"  // hint

];

var scene_forms = [

  function() { createLoginForm(); },
  function() { createSignupForm(); },
  function() { createMenuForm(); },
  function() { createGameForm();
    // createLevel();
    if (stage.canvas.width < 900) {

    } else {
      document.getElementById("entryInput").value = 0;
    }
    document.getElementById("myDropdown").classList.toggle("show");
  },
  // This was in stats scene, may need this structure
  // var key = message.current_user;
  // stats1_text.text = "Hits: " + database["stats"][key]["hits"];
  // stats2_text.text = "Misses: " + database["stats"][key]["misses"];
  function() { createStatsForm(); },
  function() { createHow2PlayForm(); },
  function() { createSettingsForm(); },
  // This was in account scene, may need this structure
  // var key = message.current_user;
  // username_text.text = "Fullname: " + database["users"][key]["firstname"] + " " + database["users"][key]["lastname"];
  // password_text.text = "Password: " + database["users"][key]["password"];
  function() { createAccountForm(); },
  function() { },
  // function() { createMapForm(); },
  function() { createHintForm(); }

];
