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

    var test = new BABYLON.GUI.TextBlock();
    test.text = "Hello";
    test.isEnabled = enable;

    advTexture.addControl(test);

    return scene;
};
