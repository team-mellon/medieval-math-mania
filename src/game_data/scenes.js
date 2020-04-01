export const sceneData = [

  { // Login
    color: "#919191",
    bg_img: "login",
    fg_img: {
              images: ["login-scroll"],
              frames: {width:750, height:600, count:6, regX: 0, regY:0, spacing:0, margin:0},
              framerate: 6
            },
    fg_text: "Login didn't load"
  },

  { // Signup
    color: "#919191",
    bg_img: "login",
    fg_img: {
              images: ["login-scroll"],
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
    bg_img: "",
    fg_img: {
              images: [""],
              frames: {width:0, height:0, count:0, regX: 0, regY:0, spacing:0, margin:0},
              framerate: 6
            },
    fg_text: ""
  },

  { // Stats
    color: "#919191",
    bg_img: "login",
    fg_img: {
              images: ["login-scroll"],
              frames: {width:750, height:600, count:6, regX: 0, regY:0, spacing:0, margin:0},
              framerate: 6
            },
    fg_text: "Stats didn't load"
  },

  { // How To Play
    color: "#919191",
    bg_img: "login",
    fg_img: {
              images: ["login-scroll"],
              frames: {width:750, height:600, count:6, regX: 0, regY:0, spacing:0, margin:0},
              framerate: 6
            },
    fg_text: "How To Play didn't load"
  },

  { // Settings
    color: "#919191",
    bg_img: "login",
    fg_img: {
              images: ["login-scroll"],
              frames: {width:750, height:600, count:6, regX: 0, regY:0, spacing:0, margin:0},
              framerate: 6
            },
    fg_text: "Settings didn't load"
  },

  { // Account
    color: "#919191",
    bg_img: "login",
    fg_img: {
              images: ["login-scroll"],
              frames: {width:750, height:600, count:6, regX: 0, regY:0, spacing:0, margin:0},
              framerate: 6
            },
    fg_text: "Account didn't load"
  },

  { // Map
    color: "#919191",
    bg_img: "login",
    fg_img: {
              images: ["map"],
              frames: {width:750, height:600, count:6, regX: 0, regY:0, spacing:0, margin:0},
              framerate: 6
            },
    fg_text: ""
  },

  { // Hint
    color: "#919191",
    bg_img: "login",
    fg_img: {
              images: ["login-scroll"],
              frames: {width:750, height:600, count:6, regX: 0, regY:0, spacing:0, margin:0},
              framerate: 6
            },
    fg_text: "Hint didn't load"
  },

  { // Start
    color: "#919191",
    bg_img: "login",
    fg_img: {
              images: ["title-text"],
              frames: {width:1635, height:480, count:1, regX: 0, regY:0, spacing:0, margin:0},
              framerate: 6
            },
    fg_text: ""
  }

];

export const sceneManifest = [

  { src:"res/login.png", id:"login" },
  { src:"res/title-text.png", id:"title-text" },
  { src:"res/login_scroll.png", id:"login-scroll" },
  { src:"res/map.png", id:"map" },
  { src:"res/map-banner.png", id:"map-banner"},
  { src:"res/menu.png", id:"menu" },
  { src:"res/menu-lefts.png", id:"menu-left" },
  { src:"res/menu-right.png", id:"menu-right" }

]

export const guiManifest = [

  { src:"res/sword-left.png", id:"sword-left" },
  { src:"res/sword-right.png", id:"sword-right" },
  { src:"res/login-button.png", id:"login-button" },
  { src:"res/menu-button.png", id:"menu-button" }

]

export const sceneManifests = [
  [
    { src:"res/login.png", id:"title-bg" },
    { src:"res/title-text.png", id:"title-text" }
  ],
  [
    { src:"res/login.png", id:"login-bg" },
    { src:"res/login_scroll.png", id:"login-scroll" },
  ],
  [
    { src:"res/login.png", id:"signup-bg" },
    { src:"res/login_scroll.png", id:"signup-scroll" },
  ],
  [
    { src:"res/menu.png", id:"menu" },
    { src:"res/menu-lefts.png", id:"menu-left" },
    { src:"res/menu-right.png", id:"menu-right" }
  ],
  [
    { src:"res/login.png", id:"map-bg" },
    { src:"res/map.png", id:"map" },
    { src:"res/map-banner.png", id:"map-banner"},
  ],
  [
    { src:"res/login.png", id:"login" },
    { src:"res/title-text.png", id:"title-text" },
    { src:"res/login_scroll.png", id:"login-scroll" },
    { src:"res/map.png", id:"map" },
    { src:"res/map-banner.png", id:"map-banner"},
    { src:"res/menu.png", id:"menu" },
    { src:"res/menu-lefts.png", id:"menu-left" },
    { src:"res/menu-right.png", id:"menu-right" }
  ],
]

export const indicatorCoordinates = [

  { x:    0, y:    0 }, // Tutorial
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

export const levelDescriptors = [

    {title: "MENTOR'S MANOR", description: "tutorial level, this should never show"},  //level 0
    {title: "TYRANT'S TOWER", description: "King Darias III rules with an iron fist. Many have tried to overthrow this tyrant, but all have failed."},  //level 1
    {title: "GRIM GRASSLANDS", description: "The grasslands are crawling with orcs. Travelers beware if you attempt to cross this land."}, // level 2
    {title: "VICIOUS VOLCANO", description: "The lava people of volcan are said to be descendants of dragons. whether or not this is true, you should still keep your distance."}, //level 3
    {title: "CALAMITY COVE", description: "There are many things to fear when crossing the ocean, but none compare to captain sturge and his pirate crew."},  //level 4
    {title: "MYSTIC MOUNTAINS", description: "The mountain satyrs are not to keen on visitors. Be weary and watch your step."},  //level 5
    {title: "PERILOUS PEAK", description: "The supreme guards of the mountain peak seem to be guarding something. No one knows what, and those who seek answers have never returned."},  // level 6
    {title: "CREEPY CAVERNS", description: "The caves of the mountain run for miles. Be careful, there might be something lurking within."},  //level 7
    {title: "FRANTIC FOREST", description: "It is very easy to get lost in the forest. Stay on the path or risk never returning."},  //level 8
    {title: "ARCTIC ALPINE", description: "The yetis call this glacier home. They are not considered agressive, but travelers have been known to disappear."},  // level 9
    {title: "WANDERING WOODS", description: "There is a wicked witch in these woods. Don't fall under her spells or you may never return"}, //level 10
    {title: "STAGNANT SWAMP", description: "The swamp lands are rancid and not pleasant to traverse. There may be more than foul smells in this place."},  //level 11
    {title: "DESOLATE DEADLANDS", description: "Tales of vampires have been spread all over this place. Whether or not you choose to believe is up to you."},  //level 12
    {title: "FLOATING FORTRESS", description: "A city of gold in the sky, perposterous they say. If you are willing to travel far and wide perhaps you might see such a place."},  //level 13
    {title: "DEADLY DEPTHS", description: "Mermaids have been luring sailors to their demise for years. don't be fooled by the siren's song."},  //level 14
    {title: "FERAL FUNGUS", description: "The mushroom people have made a fine home for themselves here. I would still keep my distance though."},  //level 15
    {title: "TORTUROUS TUNDRA", description: "These arctic lands are not safe. If you choose to travel this way, make sure to bundle up and stay warm."},  //level 16
    {title: "TUMULTUOUS TARPITS", description: "Before people ruled these lands, giant creatures lived in these areas. The tarpits hold what remains of these creatures, but beware of bandits."},  //level 17
    {title: "DRACONIAN DESERT", description: "Crossing a desert is dangerous. The draco crab creatures make this desert even more so."},   //level 18
    {title: "BOREAL BACKWOODS", description: "You might have heard of minotaurs, but have you ever heard of a pamola? Traverse the backwoods and find out."},  //level 19
    {title: "REAWAKENED RUINS", description: "An advanced civilization from long ago, or not so long ago. No one knows, but behind the rock guards are endless secrets."}  //level 20


];
