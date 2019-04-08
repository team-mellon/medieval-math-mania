//////////////////
// FORMHANDLER //
//////////////////


class FormHandler {



  constructor() {

  }

  static createLoginForm () {

    // Creates username div to hold display text and input box
    var login_username_div = document.createElement("div");
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
    var password_text = document.createTextNode("Password");
    var password_input = document.createElement("input");
    password_input.id = "passwordInput";
    password_input.setAttribute("type", "password");
    password_input.setAttribute("name", "pass");

    // Creates password div to hold display text and input box
    var login_password_div = document.createElement("div");
    login_password_div.className = "login";
    login_password_div.appendChild(password_text);
    // Creates line break for form div spacing
    login_password_div.appendChild(document.createElement("br"));
    login_password_div.appendChild(password_input);

    // Creates password display text and input box
    var error_text = document.createTextNode("");

    var error_div = document.createElement("div");
    error_div.id = "errorText";
    error_div.appendChild(error_text);

    // Creates login form to hold username and password divs
    var login_form = document.createElement("form");
    login_form.id = "loginForm";
    login_form.className = "scrollMenu";
    login_form.appendChild(login_username_div);
    // Creates line break for form div spacing
    login_form.appendChild(document.createElement("br"));
    login_form.appendChild(login_password_div);
    // Creates line break for form div spacing
    login_form.appendChild(document.createElement("br"));
    login_form.appendChild(error_div);

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
    var signup_firstname_div = document.createElement("div");
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
    var signup_lastname_div = document.createElement("div");
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
    var signup_username_div = document.createElement("div");
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
    var signup_password_div = document.createElement("div");
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
    var signup_confirm_div = document.createElement("div");
    signup_confirm_div.className = "signup";
    signup_confirm_div.appendChild(confirm_text);
    signup_confirm_div.appendChild(confirm_input);

    // Creates line break for form div spacing
    var br3 = document.createElement("br");

    // Creates password display text and input box
    var error_text = document.createTextNode("");

    var error_div = document.createElement("div");
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



}

export default FormHandler;
