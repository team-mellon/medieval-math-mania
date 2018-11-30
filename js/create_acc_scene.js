function createCreateAcc(engine, canvas, message, database) {

    var scene = new BABYLON.Scene(engine);

    var camera = new BABYLON.UniversalCamera("create_acc_cam", new BABYLON.Vector3(0, 0, -10), scene);

    camera.setTarget(BABYLON.Vector3.Zero());

    camera.attachControl(canvas, true);

    var background = new BABYLON.Layer("bg", "res/login.png", scene, true);

    var advTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

    advTexture.idealWidth = 1920;

    advTexture.idealHeight = 1080;

    var enable = true;

    var firstname_text = new BABYLON.GUI.TextBlock();   // first name textblock
    firstname_text.top = "-217px";
    firstname_text.left = "-240px";
    firstname_text.height = "48px";
    firstname_text.width = "300px";
    firstname_text.color = "black";
    firstname_text.fontFamily = "blackadder ITC";
    firstname_text.fontStyle = "bold";
    firstname_text.fontSize = 28;
    firstname_text.text = "First Name";
    firstname_text.isEnabled = enable;


    var lastname_text = new BABYLON.GUI.TextBlock();   // first name textblock
    lastname_text.top = "-217px";
    lastname_text.left = "114px";
    lastname_text.height = "48px";
    lastname_text.width = "300px";
    lastname_text.color = "black";
    lastname_text.fontFamily = "blackadder ITC";
    lastname_text.fontStyle = "bold";
    lastname_text.fontSize = 28;
    lastname_text.text = "Last Name";
    lastname_text.isEnabled = enable;


    var username_text = new BABYLON.GUI.TextBlock();   // first name textblock
    username_text.top = "-100px";
    username_text.left = "-200px";
    username_text.height = "48px";
    username_text.width = "300px";
    username_text.color = "black";
    username_text.fontFamily = "blackadder ITC";
    username_text.fontStyle = "bold";
    username_text.fontSize = 28;
    username_text.text = "Create User Name";
    username_text.isEnabled = enable;


    var password_text = new BABYLON.GUI.TextBlock();   // first name textblock
    password_text.top = "0px";
    password_text.left = "-205px";
    password_text.height = "48px";
    password_text.width = "300px";
    password_text.color = "black";
    password_text.fontFamily = "blackadder ITC";
    password_text.fontStyle = "bold";
    password_text.fontSize = 28;
    password_text.text = "Create Password";
    password_text.isEnabled = enable;


    var re_password_text = new BABYLON.GUI.TextBlock();   // first name textblock
    re_password_text.top = "0px";
    re_password_text.left = "167px";
    re_password_text.height = "48px";
    re_password_text.width = "300px";
    re_password_text.color = "black";
    re_password_text.fontFamily = "blackadder ITC";
    re_password_text.fontStyle = "bold";
    re_password_text.fontSize = 28;
    re_password_text.text = "Re-Enter Password";
    re_password_text.isEnabled = enable;


    var firstname_input = new BABYLON.GUI.InputText();  // firstname input box
    firstname_input.top = "-167px";
    firstname_input.left = "-154px"; 
    firstname_input.width = "300px";
    firstname_input.height = "40px";
    firstname_input.maxWidth = 0.15;
    firstname_input.color = "black";
    firstname_input.background = "white";
    firstname_input.thickness = 1;
    firstname_input.focusedBackground = "white";
    firstname_input.isEnabled = enable;


    var lastname_input = new BABYLON.GUI.InputText();  // lastname input box
    lastname_input.top = "-167px";
    lastname_input.left = "200px"; 
    lastname_input.width = "300px";
    lastname_input.height = "40px";
    lastname_input.maxWidth = 0.15;
    lastname_input.color = "black";
    lastname_input.background = "white";
    lastname_input.thickness = 1;
    lastname_input.focusedBackground = "white";
    lastname_input.isEnabled = enable;


    var username_input = new BABYLON.GUI.InputText();  // username input box
    username_input.top = "-51px";
    username_input.left = "-154px"; 
    username_input.width = "300px";
    username_input.height = "40px";
    username_input.maxWidth = 0.15;
    username_input.color = "black";
    username_input.background = "white";
    username_input.thickness = 1;
    username_input.focusedBackground = "white";
    username_input.isEnabled = enable;


    var password_input = new BABYLON.GUI.InputPassword();  // password input box
    password_input.top = "49px";
    password_input.left = "-154px"; 
    password_input.width = "300px";
    password_input.height = "40px";
    password_input.maxWidth = 0.15;
    password_input.color = "black";
    password_input.background = "white";
    password_input.thickness = 1;
    password_input.focusedBackground = "white";
    password_input.isEnabled = enable;


    var re_password_input = new BABYLON.GUI.InputPassword();  // re_password input box
    re_password_input.top = "49px";
    re_password_input.left = "200px"; 
    re_password_input.width = "300px";
    re_password_input.height = "40px";
    re_password_input.maxWidth = 0.15;
    re_password_input.color = "black";
    re_password_input.background = "white";
    re_password_input.thickness = 1;
    re_password_input.focusedBackground = "white";
    re_password_input.isEnabled = enable;


    var submit_button = BABYLON.GUI.Button.CreateImageWithCenterTextButton("submit_button", "SUBMIT", "res/sword-button-left.png");
    submit_button.top = "150px";
    submit_button.left= "-120px";
    submit_button.height = "70px";
    submit_button.width = "260px";
    submit_button.color = "red";
    submit_button.thickness = 0;
    submit_button.fontFamily = "Blackadder ITC";
    submit_button.fontStyle = "bold";
    submit_button.fontSize = 25;
    submit_button.isEnabled = enable;

    
    var cancel_button = BABYLON.GUI.Button.CreateImageWithCenterTextButton("cancel_button", "CANCEL", "res/sword-button-right.png");
    cancel_button.top = "150px";
    cancel_button.left= "180px";
    cancel_button.height = "70px";
    cancel_button.width = "260px";
    cancel_button.color = "red";
    cancel_button.thickness = 0;
    cancel_button.fontFamily = "Blackadder ITC";
    cancel_button.fontStyle = "bold";
    cancel_button.fontSize = 25;
    cancel_button.isEnabled = enable;
    cancel_button.onPointerClickObservable.add(function() {
	firstname_input.text = "";
	lastname_input.text = "";
	username_input.text = "";
	password_input.text = "";
	re_password_input.text = "";
	message.render = 0;
    });
	

    
    
    advTexture.addControl(firstname_text);
    advTexture.addControl(lastname_text);
    advTexture.addControl(username_text);
    advTexture.addControl(password_text);
    advTexture.addControl(re_password_text);
    advTexture.addControl(firstname_input);
    advTexture.addControl(lastname_input);
    advTexture.addControl(username_input);
    advTexture.addControl(password_input);
    advTexture.addControl(re_password_input);

    advTexture.addControl(submit_button);
    advTexture.addControl(cancel_button);
    return scene;
};
