function createLoginForm() {

  // Creates username display text
  var username_p_tag = document.createElement("p");
  var username_text = document.createTextNode("Username:");
  username_p_tag.appendChild(username_text);

  // Creates username input box
  var username_input = document.createElement("input");
  username_input.setAttribute("type", "text");
  username_input.setAttribute("name", "username");

  // Creates username div to hold display text and input box
  var login_username_div = document.createElement("div");
  login_username_div.className = "login";
  login_username_div.appendChild(username_p_tag);
  login_username_div.appendChild(username_input);



  // Creates password display text
  var password_p_tag = document.createElement("p");
  var password_text = document.createTextNode("Password:");
  password_p_tag.appendChild(password_text);

  // Creates password input box
  var password_input = document.createElement("input");
  password_input.setAttribute("type", "password");
  password_input.setAttribute("name", "password");

  // Creates password div to hold display text and input box
  var login_password_div = document.createElement("div");
  login_password_div.className = "login";
  login_password_div.appendChild(password_p_tag);
  login_password_div.appendChild(password_input);



  // Creates login form to hold username and password divs
  var login_form = document.createElement("form");
  login_form.id = "loginForm";
  login_form.appendChild(login_username_div);
  login_form.appendChild(login_password_div);

  // Injecting login form into existing html
  var scene_html = document.getElementById("sceneHTML");
  scene_html.appendChild(login_form);

}

function createSignupForm() {

  // Creates firstname display text
  var firstname_p_tag = document.createElement("p");
  var firstname_text = document.createTextNode("Firstname:");
  firstname_p_tag.appendChild(firstname_text);

  // Creates firstname input box
  var firstname_input = document.createElement("input");
  firstname_input.setAttribute("type", "text");
  firstname_input.setAttribute("name", "firstname");

  // Creates firstname div to hold display text and input box
  var signup_firstname_div = document.createElement("div");
  signup_firstname_div.className = "signup";
  signup_firstname_div.appendChild(firstname_p_tag);
  signup_firstname_div.appendChild(firstname_input);



  // Creates lastname display text
  var lastname_p_tag = document.createElement("p");
  var lastname_text = document.createTextNode("Lastname:");
  lastname_p_tag.appendChild(lastname_text);

  // Creates lastname input box
  var lastname_input = document.createElement("input");
  lastname_input.setAttribute("type", "text");
  lastname_input.setAttribute("name", "lastname");

  // Creates lastname div to hold display text and input box
  var signup_lastname_div = document.createElement("div");
  signup_lastname_div.className = "signup";
  signup_lastname_div.appendChild(lastname_p_tag);
  signup_lastname_div.appendChild(lastname_input);



  // Creates line break for form div spacing
  var br1 = document.createElement("br");



  // Creates username display text
  var username_p_tag = document.createElement("p");
  var username_text = document.createTextNode("Username:");
  username_p_tag.appendChild(username_text);

  // Creates username input box
  var username_input = document.createElement("input");
  username_input.setAttribute("type", "text");
  username_input.setAttribute("name", "username");

  // Creates username div to hold display text and input box
  var signup_username_div = document.createElement("div");
  signup_username_div.className = "signup";
  signup_username_div.appendChild(username_p_tag);
  signup_username_div.appendChild(username_input);



  // Creates line break for form div spacing
  var br2 = document.createElement("br");



  // Creates password display text
  var password_p_tag = document.createElement("p");
  var password_text = document.createTextNode("Password:");
  password_p_tag.appendChild(password_text);

  // Creates password input box
  var password_input = document.createElement("input");
  password_input.setAttribute("type", "password");
  password_input.setAttribute("name", "password");

  // Creates password div to hold display text and input box
  var signup_password_div = document.createElement("div");
  signup_password_div.className = "signup";
  signup_password_div.appendChild(password_p_tag);
  signup_password_div.appendChild(password_input);



  // Creates confirm display text
  var confirm_p_tag = document.createElement("p");
  var confirm_text = document.createTextNode("Confirm:");
  confirm_p_tag.appendChild(confirm_text);

  // Creates confirm input box
  var confirm_input = document.createElement("input");
  confirm_input.setAttribute("type", "password");
  confirm_input.setAttribute("name", "confirm");

  // Creates confirm div to hold display text and input box
  var signup_confirm_div = document.createElement("div");
  signup_confirm_div.className = "signup";
  signup_confirm_div.appendChild(confirm_p_tag);
  signup_confirm_div.appendChild(confirm_input);



  // Creates signup form to hold firstname, lastname, username, password and confirm divs
  var signup_form = document.createElement("form");
  signup_form.id = "signupForm";
  signup_form.appendChild(signup_firstname_div);
  signup_form.appendChild(signup_lastname_div);
  signup_form.appendChild(br1);
  signup_form.appendChild(signup_username_div);
  signup_form.appendChild(br2);
  signup_form.appendChild(signup_password_div);
  signup_form.appendChild(signup_confirm_div);

  //Injecting signup form into existing html
  var scene_html = document.getElementById("sceneHTML");
  scene_html.appendChild(signup_form);

}
