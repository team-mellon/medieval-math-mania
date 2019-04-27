//----------------------------------------------------------------------------//
//  FORMHANDLER                                                               //
//----------------------------------------------------------------------------//
//  Handler for async api calls. This encompasses database request like       //
//  creating a user, getting a user's data, verifying a user, updating a      //
//  database entry, and sigming out a user.                                   //
//----------------------------------------------------------------------------//

class FormHandler {

  static createLoginForm () {

    var login_username_div = this.createInputBoxWithLabel("login", "Username ", "usernameInput", "text", "uname", true);
    var login_password_div = this.createInputBoxWithLabel("login", "Password ", "passwordInput", "password", "pass", true);

    // Creates password display text and input box
    var error_div = document.createElement("div"); // Create encompassing div
    error_div.id = "errorText";
    error_div.appendChild(document.createTextNode(""));

    // Creates login form to hold username, password, and error divs
    var login_form = document.createElement("form"); // Create encompassing div
    login_form.id = "loginForm"; // Div id
    login_form.className = "scrollMenu"; // Div class
    login_form.appendChild(login_username_div); // Add username div
    login_form.appendChild(document.createElement("br")); // Add spacing
    login_form.appendChild(login_password_div); // Add password div
    login_form.appendChild(document.createElement("br")); // Add spacing
    login_form.appendChild(error_div); // Add error div

    // Injecting login form into existing html
    var scene_html = document.getElementById("sceneHTML");
    scene_html.appendChild(login_form);

  }

  static createSignupForm () {

    var signup_firstname_div = this.createInputBoxWithLabel("signup", "First Name: ", "firstnameInput", "text", "fname", false);
    var signup_lastname_div = this.createInputBoxWithLabel("signup", "Last Name: ", "lastnameInput", "text", "lname", false);
    var signup_username_div = this.createInputBoxWithLabel("signup", "Username: ", "usernameInput", "text", "uname", false);
    var signup_password_div = this.createInputBoxWithLabel("signup", "Password: ", "passwordInput", "password", "pass", false);
    var signup_confirm_div = this.createInputBoxWithLabel("signup", "Confirm: ", "confirmInput", "password", "confirm", false);

    var error_div = document.createElement("div"); // Create encompassing div
    error_div.id = "errorText";
    error_div.appendChild(document.createTextNode(""));

    // Creates signup form to hold firstname, lastname, username, password and confirm divs
    var signup_form = document.createElement("form");
    signup_form.id = "signupForm";
    signup_form.className = "scrollMenu";
    signup_form.appendChild(signup_firstname_div);
    signup_form.appendChild(document.createElement("br"));
    signup_form.appendChild(signup_lastname_div);
    signup_form.appendChild(document.createElement("br"));
    signup_form.appendChild(signup_username_div);
    signup_form.appendChild(document.createElement("br"));
    signup_form.appendChild(signup_password_div);
    signup_form.appendChild(document.createElement("br"));
    signup_form.appendChild(signup_confirm_div);
    signup_form.appendChild(document.createElement("br"));
    signup_form.appendChild(error_div);

    //Injecting signup form into existing html
    var scene_html = document.getElementById("sceneHTML");
    scene_html.appendChild(signup_form);

  }

  static createGameForm (multiplicand, sign, equal, solution, history_list, play_tutorial, isMobile) {

    // Creates username display text
    var multiplicand_div = document.createElement("div"); // Create encompassing div
    multiplicand_div.id = "multiplicandText";
    multiplicand_div.appendChild(document.createTextNode(multiplicand));

    var entry_input;
    if (isMobile) {

      entry_input = document.createElement("div"); // Create encompassing div
      entry_input.id = "entryDisplay";

      var hundreds = document.createElement("span");
      hundreds.id = "hundredsPlace";
      hundreds.appendChild(document.createTextNode("0"));
      entry_input.appendChild(hundreds);

      var tens = document.createElement("span");
      tens.id = "tensPlace";
      tens.appendChild(document.createTextNode("0"));
      entry_input.appendChild(tens);

      var ones = document.createElement("span");
      ones.id = "onesPlace";
      ones.appendChild(document.createTextNode("0"));
      entry_input.appendChild(ones);


    } else {

      entry_input = document.createElement("input");
      entry_input.id = "entryInput";
      entry_input.setAttribute("type", "number");
      entry_input.setAttribute("placeholder", "###");
      entry_input.setAttribute("value", "");
      entry_input.setAttribute("maxlength", "3");
      entry_input.setAttribute("size", "4");
      entry_input.setAttribute("min", "-999");
      entry_input.setAttribute("max", "999");
      entry_input.setAttribute("name", "entry");
      entry_input.addEventListener('keypress', function(event) {
        if (event.keyCode == 13) {
          event.preventDefault();
        }
      });

    }

    var solution_div = document.createElement("div"); // Create encompassing div
    solution_div.id = "solutionText";
    solution_div.appendChild(document.createTextNode(solution));

    // Creates username div to hold display text and input box
    var game_entry_div = document.createElement("div"); // Create encompassing div
    game_entry_div.appendChild(multiplicand_div);
    game_entry_div.appendChild(document.createTextNode(sign));
    game_entry_div.appendChild(entry_input);
    game_entry_div.appendChild(document.createTextNode(equal));
    game_entry_div.appendChild(solution_div);

    // Creates username display text
    var history_div = document.createElement("div"); // Create encompassing div
    history_div.className = "dropdown-content";
    history_div.id = "myDropdown";

    for (var x in history_list) {
      history_div.appendChild(document.createTextNode(history_list[x]));
      history_div.appendChild(document.createElement("br"));
    }

    var history_dropdown = document.createElement("div"); // Create encompassing div
    history_dropdown.className = "dropdown";
    history_dropdown.appendChild(history_div);

    // Does a thing
    var game_history_div = document.createElement("div"); // Create encompassing div
    game_history_div.appendChild(history_dropdown);

    // Creates login form to hold username and password divs
    var game_entry_form = document.createElement("form");
    game_entry_form.id = "equationBanner";
    game_entry_form.appendChild(game_entry_div);

    // Creates login form to hold username and password divs
    var game_history_form = document.createElement("form");
    game_history_form.id = "historyBanner";
    game_history_form.appendChild(game_history_div);

    // Injecting login form into existing html
    var scene_html = document.getElementById("sceneHTML");
    scene_html.appendChild(game_entry_form);
    scene_html.appendChild(game_history_form);

    if (isMobile) {

    } else {

      // document.getElementById("entryInput").value = 0;

    }

    document.getElementById("myDropdown").classList.toggle("show");

  }

  static createSettingsForm (boss_fight, play_tutorial, setTutorial, setBoss, setVolume) {

    var settings_volume_div = this.createInputSliderWithLabel("login", "Volume", "volumeSlider", "range", "volume", false, setVolume);
    // var settings_time_div = this.createInputBoxWithLabel("login", "Timed?", "bossValue", "checkbox", "time", false, boss_fight, setBoss);
    var settings_tutorial_div = this.createInputBoxWithLabel("login", "Tutorial?", "tutorialValue", "checkbox", "tutorial", false, play_tutorial, setTutorial);

    // Creates login form to hold username and password divs
    var settings_form = document.createElement("form");
    settings_form.id = "settingsForm";
    settings_form.className = "scrollMenu";
    settings_form.appendChild(settings_volume_div);
    // settings_form.appendChild(document.createElement("br"));
    // settings_form.appendChild(settings_time_div);
    settings_form.appendChild(document.createElement("br"));
    settings_form.appendChild(settings_tutorial_div);

    // Injecting login form into existing html
    var scene_html = document.getElementById("sceneHTML");
    scene_html.appendChild(settings_form);

  }

  // Creates div to hold display text and input box
  static createInputBoxWithLabel (div_class, text, input_id, type, name, spacing) {

    // Create encompassing div
    var top_div = document.createElement("div");

    // Assign div class
    top_div.className = div_class;

    // Creates label
    top_div.appendChild(document.createTextNode(text));

    // If spacing is true
    if (spacing) {
      // Creates line break for form div spacing
      top_div.appendChild(document.createElement("br"));

    }

    // Creates input box
    var input_box = document.createElement("input");

    // Assigns input id
    input_box.id = input_id;

    // Sets type attribute
    input_box.setAttribute("type", type);

    // Sets name attribute
    input_box.setAttribute("name", name);

    // Appends to the main div
    top_div.appendChild(input_box);

    return top_div;

  }

  // Creates div to hold display text and input box
  static createCheckBoxWithLabel (div_class, text, input_id, type, name, spacing, checked, checkHandler) {

    // Create encompassing div
    var top_div = document.createElement("div");

    // Assign div class
    top_div.className = div_class;

    // Creates label
    top_div.appendChild(document.createTextNode(text));

    // If spacing is true
    if (spacing) {
      // Creates line break for form div spacing
      top_div.appendChild(document.createElement("br"));

    }

    // Creates input box
    var input_box = document.createElement("input");

    // Assigns input id
    input_box.id = input_id;

    // Sets type attribute
    input_box.setAttribute("type", type);

    // Sets name attribute
    input_box.setAttribute("name", name);

    // Set initial state
    tutorial_input.checked = checked;

    tutorial_input.addEventListener('change', checkHandler);

    // Appends to the main div
    top_div.appendChild(input_box);

    return top_div;

  }

  // Creates div to hold display text and input box
  static createInputSliderWithLabel (div_class, text, input_id, type, name, spacing, slideHandler) {

    // Create encompassing div
    var top_div = document.createElement("div");

    // Assign div class
    top_div.className = div_class;

    // Creates label
    top_div.appendChild(document.createTextNode(text));

    // If spacing is true
    if (spacing) {
      // Creates line break for form div spacing
      top_div.appendChild(document.createElement("br"));

    }

    // Creates input box
    var input_box = document.createElement("input");

    // Assigns input id
    input_box.id = input_id;

    // Sets type attribute
    input_box.setAttribute("type", type);

    // Sets name attribute
    input_box.setAttribute("name", name);

    //
    input_box.setAttribute("min", "0");

    //
    input_box.setAttribute("max", "1");

    //
    input_box.setAttribute("step", "0.1");

    //
    input_box.setAttribute("value", "0.5");

    //
    input_box.setAttribute(oninput, "SetVolume(this.value)");

    //
    input_box.setAttribute(onchange, "SetVolume(this.value)");

    //
    input_box.addEventListener('change', slideHandler);

    //
    input_box.addEventListener('input', slideHandler);

    // Appends to the main div
    top_div.appendChild(input_box);

    return top_div;

  }

}

export default FormHandler;
