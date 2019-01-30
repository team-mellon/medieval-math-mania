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

function createStatsForm() {

  // Creates username display text
  var hits_p_tagl = document.createElement("p");
  var hits_label = document.createTextNode("Hits: ");
  hits_p_tagl.appendChild(hits_label);

  // Creates username display text
  var hits_p_tag = document.createElement("p");
  var hits_text = document.createTextNode(fake_account.hits);
  hits_p_tag.appendChild(hits_text);

  // Creates username div to hold display text and input box
  var stats_hits_div = document.createElement("div");
  stats_hits_div.className = "login";
  stats_hits_div.appendChild(hits_p_tagl);
  stats_hits_div.appendChild(hits_p_tag);



  // Creates password display text
  var misses_p_tagl = document.createElement("p");
  var misses_label = document.createTextNode("Misses: ");
  misses_p_tagl.appendChild(misses_label);

  // Creates password display text
  var misses_p_tag = document.createElement("p");
  var misses_text = document.createTextNode(fake_account.misses);
  misses_p_tag.appendChild(misses_text);

  // Creates password div to hold display text and input box
  var stats_misses_div = document.createElement("div");
  stats_misses_div.className = "login";
  stats_misses_div.appendChild(misses_p_tagl);
  stats_misses_div.appendChild(misses_p_tag);



  // Creates login form to hold username and password divs
  var stats_form = document.createElement("form");
  stats_form.id = "statsForm";
  stats_form.appendChild(stats_hits_div);
  stats_form.appendChild(stats_misses_div);

  // Injecting login form into existing html
  var scene_html = document.getElementById("sceneHTML");
  scene_html.appendChild(stats_form);

}

function createHow2PlayForm() {

  var instructions = "It's just math";

  // Creates username display text
  var h2p_p_tagl = document.createElement("p");
  var h2p_label = document.createTextNode("How 2 Play: ");
  h2p_p_tagl.appendChild(h2p_label);

  // Creates username display text
  var h2p_p_tag = document.createElement("p");
  var h2p_text = document.createTextNode(instructions);
  h2p_p_tag.appendChild(h2p_text);

  // Creates username div to hold display text and input box
  var h2p_h2p_div = document.createElement("div");
  h2p_h2p_div.className = "login";
  h2p_h2p_div.appendChild(h2p_p_tagl);
  h2p_h2p_div.appendChild(h2p_p_tag);



  // Creates login form to hold username and password divs
  var h2p_form = document.createElement("form");
  h2p_form.id = "h2pForm";
  h2p_form.appendChild(h2p_h2p_div);

  // Injecting login form into existing html
  var scene_html = document.getElementById("sceneHTML");
  scene_html.appendChild(h2p_form);

}

function createSettingsForm() {

  // Creates username display text
  var volume_p_tag = document.createElement("p");
  var volume_text = document.createTextNode("Volume:");
  volume_p_tag.appendChild(volume_text);

  // Creates username input box
  var volume_input = document.createElement("input");
  volume_input.setAttribute("type", "range");
  volume_input.setAttribute("name", "volume");

  // Creates username div to hold display text and input box
  var settings_volume_div = document.createElement("div");
  settings_volume_div.className = "login";
  settings_volume_div.appendChild(volume_p_tag);
  settings_volume_div.appendChild(volume_input);



  // Creates password display text
  var time_p_tag = document.createElement("p");
  var time_text = document.createTextNode("Time:");
  time_p_tag.appendChild(time_text);

  // Creates password input box
  var time_input = document.createElement("input");
  time_input.setAttribute("type", "checkbox");
  time_input.setAttribute("name", "time");

  // Creates password div to hold display text and input box
  var settings_time_div = document.createElement("div");
  settings_time_div.className = "login";
  settings_time_div.appendChild(time_p_tag);
  settings_time_div.appendChild(time_input);



  // Creates login form to hold username and password divs
  var settings_form = document.createElement("form");
  settings_form.id = "settingsForm";
  settings_form.appendChild(settings_volume_div);
  settings_form.appendChild(settings_time_div);

  // Injecting login form into existing html
  var scene_html = document.getElementById("sceneHTML");
  scene_html.appendChild(settings_form);

}

function createAccountForm() {

  // Creates username display text
  var username_p_tagl = document.createElement("p");
  var username_text = document.createTextNode("Username:");
  username_p_tagl.appendChild(username_text);

  // Creates username display text
  var username_p_tag = document.createElement("p");
  var username_text = document.createTextNode(fake_account.user);
  username_p_tag.appendChild(username_text);

  // Creates username div to hold display text and input box
  var account_username_div = document.createElement("div");
  account_username_div.className = "login";
  account_username_div.appendChild(username_p_tagl);
  account_username_div.appendChild(username_p_tag);



  // Creates password display text
  var password_p_tagl = document.createElement("p");
  var password_text = document.createTextNode("Password:");
  password_p_tagl.appendChild(password_text);

  // Creates password display text
  var password_p_tag = document.createElement("p");
  var password_text = document.createTextNode(fake_account.pass);
  password_p_tag.appendChild(password_text);

  // Creates password div to hold display text and input box
  var account_password_div = document.createElement("div");
  account_password_div.className = "login";
  account_password_div.appendChild(password_p_tagl);
  account_password_div.appendChild(password_p_tag);



  // Creates login form to hold username and password divs
  var account_form = document.createElement("form");
  account_form.id = "loginForm";
  account_form.appendChild(account_username_div);
  account_form.appendChild(account_password_div);

  // Injecting login form into existing html
  var scene_html = document.getElementById("sceneHTML");
  scene_html.appendChild(account_form);

}
