export const sceneData = [

  { // Login
    color: "#919191",
    bg_img: "res/login.png",
    fg_img: {
              images: ["res/login_scroll.png"],
              frames: {width:750, height:600, count:6, regX: 0, regY:0, spacing:0, margin:0},
              framerate: 6
            },
    fg_text: "Login didn't load"
  },

  { // Signup
    color: "#919191",
    bg_img: "res/login.png",
    fg_img: {
              images: ["res/login_scroll.png"],
              frames: {width:750, height:600, count:6, regX: 0, regY:0, spacing:0, margin:0},
              framerate: 6
            },
    fg_text: "Signup didn't load"
  },

  { // Menu
    color: "#8ac5dc",
    bg_img: "",
    fg_img: {
              images: [""],
              frames: {width:0, height:0, count:0, regX: 0, regY:0, spacing:0, margin:0},
              framerate: 6
            },
    fg_text: ""
  },

  { // Game
    color: "#000000",
    bg_img: "res/numberline.png",
    fg_img: {
              images: [""],
              frames: {width:0, height:0, count:0, regX: 0, regY:0, spacing:0, margin:0},
              framerate: 6
            },
    fg_text: ""
  },

  { // Stats
    color: "#919191",
    bg_img: "res/login.png",
    fg_img: {
              images: ["res/login_scroll.png"],
              frames: {width:750, height:600, count:6, regX: 0, regY:0, spacing:0, margin:0},
              framerate: 6
            },
    fg_text: "Stats didn't load"
  },

  { // How To Play
    color: "#919191",
    bg_img: "res/login.png",
    fg_img: {
              images: ["res/login_scroll.png"],
              frames: {width:750, height:600, count:6, regX: 0, regY:0, spacing:0, margin:0},
              framerate: 6
            },
    fg_text: "How To Play didn't load"
  },

  { // Settings
    color: "#919191",
    bg_img: "res/login.png",
    fg_img: {
              images: ["res/login_scroll.png"],
              frames: {width:750, height:600, count:6, regX: 0, regY:0, spacing:0, margin:0},
              framerate: 6
            },
    fg_text: "Settings didn't load"
  },

  { // Account
    color: "#919191",
    bg_img: "res/login.png",
    fg_img: {
              images: ["res/login_scroll.png"],
              frames: {width:750, height:600, count:6, regX: 0, regY:0, spacing:0, margin:0},
              framerate: 6
            },
    fg_text: "Account didn't load"
  },

  { // Map
    color: "#919191",
    bg_img: "res/login.png",
    fg_img: {
              images: ["res/map.png"],
              frames: {width:750, height:600, count:6, regX: 0, regY:0, spacing:0, margin:0},
              framerate: 6
            },
    fg_text: ""
  },

  { // Hint
    color: "#919191",
    bg_img: "res/login.png",
    fg_img: {
              images: ["res/login_scroll.png"],
              frames: {width:750, height:600, count:6, regX: 0, regY:0, spacing:0, margin:0},
              framerate: 6
            },
    fg_text: "Hint didn't load"
  },

  { // Start
    color: "#919191",
    bg_img: "res/login.png",
    fg_img: {
              images: ["res/title-text.png"],
              frames: {width:1635, height:480, count:1, regX: 0, regY:0, spacing:0, margin:0},
              framerate: 6
            },
    fg_text: ""
  }

];

export const indicatorCoordinates = [

  { x:  -90, y:   72 }, // City
  {	x: -288, y:    0 }, // Grasslands
  {	x: -600, y:  192 }, // Volcano
  {	x: -186, y:  216 }, // Sea
  {	x: -480, y: -108 }, // Mountains
  {	x: -474, y: -186 }, // Summit
  {	x: -354, y: -138 }, // Cave
  {	x:  -90, y:  -78 }, // Forest
  {	x:  534, y: -222 }, // Alpine
  {	x:  150, y:  102 }, // Woods
  {	x:  318, y:   54 }, // Swamp
  {	x:  546, y:  150 }, // Deadlands
  {	x: -186, y: -198 }, // Sky
  {	x: -414, y:  150 }, // Underwater
  {	x:  234, y:  -78 }, // Fungi
  {	x:  354, y: -186 }, // Tundra
  {	x:  486, y:  -30 }, // Tarpit
  {	x: -618, y:  102 }, // Desert
  {	x:   42, y: -162 }, // Boreal
  {	x: -426, y:   -6 }  // Monolith

];

export const levelDescripters = [

    {title: "TYRANT'S TOWER", description: "castle clash was taken"},  //level 1
    {title: "GRIM GRASSLANDS", description: "grass orcs"}, // level 2
    {title: "VICIOUS VOLCANO", description: "mount doom was taken"}, //level 3
    {title: "CALAMITY COVE", description: "pirates of the carribean"},  //level 4
    {title: "MYSTIC MOUNTAINS", description: "led zepplin songs are cool"},  //level 5
    {title: "PERILOUS PEAK", description: "we should have just copied donkey kong levels"},  // level 6
    {title: "CREEPY CAVERNS", description: "cave description"},  //level 7
    {title: "FRANTIC FOREST", description: "forest description"},  //level 8
    {title: "ARCTIC ALPINE", description: "alpine description"},  // level 9
    {title: "WANDERING WOODS", description: "woods description"}, //level 10
    {title: "STAGNANT SWAMP", description: "GET OUT OF MY SWAMP!!!"},  //level 11
    {title: "DESOLATE DEADLANDS", description: "mad max look-alikes"},  //level 12
    {title: "FLOATING FORTRESS", description: "floating island"},  //level 13
    {title: "DEADLY DEPTHS", description: "not coral because reasons?"},  //level 14
    {title: "FERAL FUNGUS", description: "there is a fungus amongus"},  //level 15
    {title: "TORTUROUS TUNDRA", description: "russia"},  //level 16
    {title: "TUMULTUOUS TARPITS", description: "that's how the dinosaurs died"},  //level 17
    {title: "DRACONIAN DESERT", description: "crab people. need I say more"},   //level 18
    {title: "BOREAL BACKWOODS", description: "better than taiga"},  //level 19
    {title: "REAWAKENED RUINS", description: "finally the last one"}  //level 20


];
