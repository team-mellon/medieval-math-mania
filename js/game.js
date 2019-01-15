function runGame(renderingCanvas) {

  var canvas = document.getElementById('renderCanvas');                   // get the canvas DOM element context
  var engine = new BABYLON.Engine(canvas, true);                          // load the babylon.js engine

  var database = {
  users: {
  admin: {
  firstname: "john",
  lastname: "Doe",
  password: "1234"
  }
  },
  stats: {
  admin: {
  hits: "420",
  misses: "69"
  }
  }
  };

  var current = null;
  var message = {
    render: 0,
    music_pause: false,
    volume: 1,
    current_user: "admin"
  };                                                                      // possible message passing system???

  var current_scene = createLogin(engine, canvas, message, database);
  var music = createMusic(engine, canvas, message, database);

  engine.runRenderLoop( function() {                                      // run the render loop function
    console.log("loop");
    if (current != message.render) {
      console.log(message.render + " : " + current)
      current = message.render;
      current_scene.dispose();
      switch(current) {                                                   // scene rendering switcher
        case 0:
          current_scene = createLogin(engine, canvas, message, database);
          break;
        case 1:
          current_scene = createMenu(engine, canvas, message, database);
          break;
        case 2:
          current_scene = createGame(engine, canvas, message, database);
          break;
        case 3:
          current_scene = createStats(engine, canvas, message, database);
          break;
        case 4:
          current_scene = createHow2Play(engine, canvas, message, database);
          break;
        case 5:
          current_scene = createSettings(engine, canvas, message, database);
          break;
        case 6:
          current_scene = createAccount(engine, canvas, message, database);
          break;
        case 7:
          current_scene = createCreateAcc(engine, canvas, message, database);
          break;
        default:
          current_scene = createLogin(engine, canvas, message, database);
          break;
      }
      console.log(message.render + " :: " + current)
    }

    music.render();
    current_scene.render();
    current_scene.attachControl();

  });

  window.addEventListener('resize', function() {
      engine.resize();
  });                                                                     // the canvas/window resize event handler

}
