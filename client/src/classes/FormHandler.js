////////////////////////////////////////////////////////////////////////////////
// FORMHANDLER                                                                //
////////////////////////////////////////////////////////////////////////////////
// Handler for async api calls. This encompasses database request like        //
// creating a user, getting a user's data, verifying a user, updating a       //
// database entry, and sigming out a user.                                    //
////////////////////////////////////////////////////////////////////////////////

class FormHandler {

  static createLoginForm () {

    // Creates username div to hold display text and input box
    var login_username_div = document.createElement("div"); // Create encompassing div
    login_username_div.className = "login";

    // Creates 'Username' label
    login_username_div.appendChild(document.createTextNode("Username"));

    // Creates line break for form div spacing
    login_username_div.appendChild(document.createElement("br"));

    // Creates username input box
    var username_input = document.createElement("input");
    username_input.id = "usernameInput";
    username_input.setAttribute("type", "text");
    username_input.setAttribute("name", "uname");
    login_username_div.appendChild(username_input);



    // Creates password display label and input box
    var password_input = document.createElement("input");
    password_input.id = "passwordInput";
    password_input.setAttribute("type", "password");
    password_input.setAttribute("name", "pass");

    // Creates password div to hold label and input box
    var login_password_div = document.createElement("div"); // Create encompassing div
    login_password_div.className = "login"; // Div class
    login_password_div.appendChild(document.createTextNode("Password")); // Add 'Password' label
    login_password_div.appendChild(document.createElement("br")); // Add spacing
    login_password_div.appendChild(password_input); // Add password input box

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

    // Creates firstname display label and input box
    var firstname_text = document.createTextNode("Firstname:");
    var firstname_input = document.createElement("input");
    firstname_input.id = "firstnameInput";
    firstname_input.setAttribute("type", "text");
    firstname_input.setAttribute("name", "fname");

    // Creates firstname div to hold display text and input box
    var signup_firstname_div = document.createElement("div"); // Create encompassing div
    signup_firstname_div.className = "signup";
    signup_firstname_div.appendChild(firstname_text);
    signup_firstname_div.appendChild(firstname_input);

    // Creates lastname display text and input box
    var lastname_text = document.createTextNode("Lastname:");
    var lastname_input = document.createElement("input");
    lastname_input.id = "lastnameInput";
    lastname_input.setAttribute("type", "text");
    lastname_input.setAttribute("name", "lname");

    // Creates lastname div to hold display text and input box
    var signup_lastname_div = document.createElement("div"); // Create encompassing div
    signup_lastname_div.className = "signup";
    signup_lastname_div.appendChild(lastname_text);
    signup_lastname_div.appendChild(lastname_input);

    // Creates line break for form div spacing
    var br1 = document.createElement("br");

    // Creates username display text and input box
    var username_text = document.createTextNode("Username:");
    var username_input = document.createElement("input");
    username_input.id = "usernameInput";
    username_input.setAttribute("type", "text");
    username_input.setAttribute("name", "uname");

    // Creates username div to hold display text and input box
    var signup_username_div = document.createElement("div"); // Create encompassing div
    signup_username_div.className = "signup";
    signup_username_div.appendChild(username_text);
    signup_username_div.appendChild(username_input);

    // Creates line break for form div spacing
    var br2 = document.createElement("br");

    // Creates password display text and input box
    var password_text = document.createTextNode("Password:");
    var password_input = document.createElement("input");
    password_input.id = "passwordInput";
    password_input.setAttribute("type", "password");
    password_input.setAttribute("name", "pass");

    // Creates password div to hold display text and input box
    var signup_password_div = document.createElement("div"); // Create encompassing div
    signup_password_div.className = "signup";
    signup_password_div.appendChild(password_text);
    signup_password_div.appendChild(password_input);

    // Creates confirm display text and input box
    var confirm_text = document.createTextNode("Confirm:");
    var confirm_input = document.createElement("input");
    confirm_input.id = "confirmInput";
    confirm_input.setAttribute("type", "password");
    confirm_input.setAttribute("name", "confirm");

    // Creates confirm div to hold display text and input box
    var signup_confirm_div = document.createElement("div"); // Create encompassing div
    signup_confirm_div.className = "signup";
    signup_confirm_div.appendChild(confirm_text);
    signup_confirm_div.appendChild(confirm_input);

    // Creates line break for form div spacing
    var br3 = document.createElement("br");

    // Creates password display text and input box
    var error_text = document.createTextNode("");

    var error_div = document.createElement("div"); // Create encompassing div
    error_div.id = "errorText";
    error_div.appendChild(error_text);

    // Creates signup form to hold firstname, lastname, username, password and confirm divs
    var signup_form = document.createElement("form");
    signup_form.id = "signupForm";
    signup_form.className = "scrollMenu";
    signup_form.appendChild(signup_firstname_div);
    signup_form.appendChild(signup_lastname_div);
    signup_form.appendChild(br1);
    signup_form.appendChild(signup_username_div);
    signup_form.appendChild(br2);
    signup_form.appendChild(signup_password_div);
    signup_form.appendChild(signup_confirm_div);
    signup_form.appendChild(br3);
    signup_form.appendChild(error_div);

    //Injecting signup form into existing html
    var scene_html = document.getElementById("sceneHTML");
    scene_html.appendChild(signup_form);

  }

  static createGameForm (multiplicand, sign, equal, solution, history_list, play_tutorial, isMobile, dropDownFunc) {

    // Creates username display text
    var multiplicand_div = document.createElement("div"); // Create encompassing div
    multiplicand_div.id = "multiplicandText";
    var multiplicand_text = document.createTextNode(multiplicand);
    multiplicand_div.appendChild(multiplicand_text);
    var sign_text = document.createTextNode(sign);
    var entry_input;
    if (isMobile) {

      entry_input = document.createElement("div"); // Create encompassing div
      entry_input.id = "entryDisplay";
      var hundreds = document.createElement("span");
      hundreds.id = "hundredsPlace";
      var hundreds_place = document.createTextNode("0");
      hundreds.appendChild(hundreds_place);
      var tens = document.createElement("span");
      tens.id = "tensPlace";
      var tens_place = document.createTextNode("0");
      tens.appendChild(tens_place);
      var ones = document.createElement("span");
      ones.id = "onesPlace";
      var ones_place = document.createTextNode("0");
      ones.appendChild(ones_place);
      entry_input.appendChild(hundreds);
      entry_input.appendChild(tens);
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

    var equal_text = document.createTextNode(equal);
    var solution_div = document.createElement("div"); // Create encompassing div
    solution_div.id = "solutionText";
    var solution_text = document.createTextNode(solution);
    solution_div.appendChild(solution_text);

    // Creates username div to hold display text and input box
    var game_entry_div = document.createElement("div"); // Create encompassing div
    game_entry_div.className = "login";
    game_entry_div.appendChild(multiplicand_div);
    game_entry_div.appendChild(sign_text);
    game_entry_div.appendChild(entry_input);
    game_entry_div.appendChild(equal_text);
    game_entry_div.appendChild(solution_div);

    // Creates username display text
    var button_text = document.createTextNode("");
    var history_button = document.createElement("button");
    var history_div = document.createElement("div"); // Create encompassing div
    history_button.className = "dropbtn";
    history_button.addEventListener('click', dropDownFunc);
    history_div.className = "dropdown-content";
    history_div.id = "myDropdown";
    history_button.appendChild(button_text);

    for (var x in history_list) {
      var history_entry = document.createTextNode(history_list[x]);
      var line_break = document.createElement("br");
      history_div.appendChild(history_entry);
      history_div.appendChild(line_break);
    }

    var history_dropdown = document.createElement("div"); // Create encompassing div
    history_dropdown.className = "dropdown";
    history_dropdown.appendChild(history_button);
    history_dropdown.appendChild(history_div);

    // Does a thing
    var game_history_div = document.createElement("div"); // Create encompassing div
    game_history_div.className = "login";
    game_history_div.appendChild(history_dropdown);

    // Creates Tutorial display text
    if (play_tutorial) {
      var tutorial_label = document.createTextNode("Tutorial");
      var br1 = document.createElement("br");
      var tutorial_text = document.createElement("span");
      tutorial_text.className = "tutorial";
      tutorial_text.id = "tutorialText";
      var tutorial_words = document.createTextNode("The tutorial is broken");
      tutorial_text.appendChild(tutorial_words);
      var tutorial_div = document.createElement("div"); // Create encompassing div
      tutorial_div.className = "tutorial_title";
      tutorial_div.id = "tutorialDiv"
      tutorial_div.appendChild(tutorial_label);
      tutorial_div.appendChild(br1);
      tutorial_div.appendChild(tutorial_text);
    }

    // Creates login form to hold username and password divs
    var game_entry_form = document.createElement("form");
    game_entry_form.id = "equationBanner";
    // game_entry_form.className = "scrollMenu";
    game_entry_form.appendChild(game_entry_div);

    // Creates login form to hold username and password divs
    var game_history_form = document.createElement("form");
    game_history_form.id = "historyBanner";
    // game_history_form.className = "scrollMenu";
    game_history_form.appendChild(game_history_div);

    // Injecting login form into existing html
    var scene_html = document.getElementById("sceneHTML");
    scene_html.appendChild(game_entry_form);
    scene_html.appendChild(game_history_form);

    if (play_tutorial) {
      scene_html.appendChild(tutorial_div);
    }

    if (isMobile) {

    } else {
      document.getElementById("entryInput").value = 0;
    }
    document.getElementById("myDropdown").classList.toggle("show");

  }

  static createSettingsForm (boss_fight, play_tutorial, setTutorial, setBoss, setVolume) {

    // Creates username display text and input slider
    var volume_text = document.createTextNode("Volume:");
    var volume_input = document.createElement("input");  // document.getElementById("").value
    volume_input.id = "volumeSlider";
    volume_input.setAttribute("type", "range");
    volume_input.setAttribute("name", "volume");
    volume_input.setAttribute("min", "0");
    volume_input.setAttribute("max", "1");
    volume_input.setAttribute("step", "0.1");
    volume_input.setAttribute("value", "0.5");
    volume_input.setAttribute(oninput, "SetVolume(this.value)");
    volume_input.setAttribute(onchange, "SetVolume(this.value)");
    volume_input.addEventListener('change', setVolume);
    volume_input.addEventListener('input', setVolume);
    // Creates username div to hold display text and input slider
    var settings_volume_div = document.createElement("div");
    settings_volume_div.className = "login";
    settings_volume_div.appendChild(volume_text);
    settings_volume_div.appendChild(volume_input);

    // Creates password display text and check box
    var time_text = document.createTextNode("Time:");
    var time_input = document.createElement("input");
    time_input.id = "bossValue";
    time_input.setAttribute("type", "checkbox");
    time_input.setAttribute("name", "time");
    if (boss_fight) {
      time_input.checked = true;
    } else {
      time_input.checked = false;
    }
    time_input.addEventListener('change', setBoss);

    // Creates password div to hold display text and check box
    var settings_time_div = document.createElement("div");
    settings_time_div.className = "login";
    settings_time_div.appendChild(time_text);
    settings_time_div.appendChild(time_input);

    // Creates password display text and check box
    var tutorial_text = document.createTextNode("Tutorial:");
    var tutorial_input = document.createElement("input");
    tutorial_input.id = "tutorialValue";
    tutorial_input.setAttribute("type", "checkbox");
    tutorial_input.setAttribute("name", "tutorial");
    if (play_tutorial) {
      tutorial_input.checked = true;
    } else {
      tutorial_input.checked = false;
    }
    tutorial_input.addEventListener('change', setTutorial);

    // Creates password div to hold display text and check box
    var settings_tutorial_div = document.createElement("div");
    settings_tutorial_div.className = "login";
    settings_tutorial_div.appendChild(tutorial_text);
    settings_tutorial_div.appendChild(tutorial_input);

    // Creates login form to hold username and password divs
    var settings_form = document.createElement("form");
    settings_form.id = "settingsForm";
    settings_form.className = "scrollMenu";
    settings_form.appendChild(settings_volume_div);
    settings_form.appendChild(settings_time_div);
    settings_form.appendChild(settings_tutorial_div);

    // Injecting login form into existing html
    var scene_html = document.getElementById("sceneHTML");
    scene_html.appendChild(settings_form);

  }

}

export default FormHandler;
