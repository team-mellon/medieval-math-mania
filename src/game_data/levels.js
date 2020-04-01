export const levelData = [

  { // Tutorial
    number: 0,
    color: "#c9e6ff",
    hint: "This ones easy, if you can't think of another number to get in the range think of what comes after the one you got but before the next intger, think in terms of money, $0.50 for example"
  },

  { // City
    number: 1,
    color: "#c9e6ff",
    hint: "Think about money. Is there an ammount between the two that you are trying? for example is there an amount of money between $6 and $7 or between $7 and $8? Try that value next!"
  },

  { // Grasslands
    number: 2,
    color: "#c9f9ff",
    hint: "Think about money. Is there an ammount between the two that you are trying? for example is there an amount of money between $6 and $7 or between $7 and $8? Try that value next!"
  },

  { // Volcano
    number: 3,
    color: "#3b0a0a",
    hint: "Think about money — is there an amount of money between $0 and $1? Try that value next!"
  },

  { // Sea
    number: 4,
    color: "#c2ffe6",
    hint: "To find a number that is too low, try a negative number (use the key next to the 0 to put a dash in front of a number)."
  },

  { // Mountains
    number: 5,
    color: "#5d5d5d",
    hint: "Just keep trying more numbers until you get the range, going either higher or lower depending on what you need. You'll get it. If not reload the level for a new range."
  },

  { // Summit
    number: 6,
    color: "#effffe",
    hint: "There will only be one integer answer for the hit, to get more hits you need to use decimals less than 1 higher and lower than the integer multiplicand."
  },

  { // Cave
    number: 7,
    color: "#26163b",
    hint: "To find a number that is too low, try a negative number (use the key next to the 0 to put a dash in front of a number)."
  },

  { // Forest
    number: 8,
    color: "#2f3b25",
    hint: "Just keep trying more numbers until you get the range, going either higher or lower depending on what you need. You'll get it. If not reload the level for a new range."
  },

  { // Alpine
    number: 9,
    color: "#f8feff",
    hint: "You are going to need some very small decimals for this one."
  },

  { // Woods
    number: 10,
    color: "#3f2900",
    hint: "You are going to need some pretty big numbers for this problem, try at least 1000."
  },

  { // Swamp
    number: 11,
    color: "#454c3a",
    hint: "You are going to need some pretty big numbers for this problem, try at least 1000."
  },

  { // Deadlands
    number: 12,
    color: "#350c0c",
    hint: "Try using a tiny number starting with a decimal and some zeros before using other numbers."
  },

  { // Sky
    number: 13,
    color: "#b6c1ff",
    hint: "Think what decimal is equal to dividing by 2, then try some that are close to that"
  },

  { // Underwater
    number: 14,
    color: "#00373d",
    hint: "This one is all about just guessing large numbers, just keep going you should get it, always just go higher or lower depending on how cloase you are to what you need"
  },

  { // Fungi
    number: 15,
    color: "#3b0a30",
    hint: "Try a negative number, there should be at least one integer that will get you within the range"
  },

  { // Tundra
    number: 16,
    color: "#ccf1ff",
    hint: "Try a negative number, if you havent been"
  },

  { // Tarpit
    number: 17,
    color: "#5d5661",
    hint: "The goal is slight reduction of a negative number, which will be the same as a positive number in terms of multiplication."
  },

  { // Desert
    number: 18,
    color: "#7ed0ff",
    hint: "Think what do you multiply with a negative to get a positive?"
  },

  { // Boreal
    number: 19,
    color: "#556968", // "#010027",
    hint: "Think what do you multiply with a negative to get a positive? It will need to be very small to get inside the range"
  },

  { // Monolith
    number: 20,
    color: "#56727d",
    hint: "Try a negative number, you will need a very small negative decimal to get this one, the target is very small so think in hundreths and lower"
  }

];

export const levels = [

  { // Tutorial
    open: function () {
      this.indicatorFunction(0);
    }.bind(this)
  },

  { // City
    open: function () {
      this.indicatorFunction(1);
    }.bind(this)
  },

  { // Grasslands
    open: function () {
      this.indicatorFunction(2);
    }.bind(this)
  },

  { // Volcano
    open: function () {
      this.indicatorFunction(3);
    }.bind(this)
  },

  { // Sea
    open: function () {
      this.indicatorFunction(4);
    }.bind(this)
  },

  { // Mountains
    open: function () {
      this.indicatorFunction(5);
    }.bind(this)
  },

  { // Summit
    open: function () {
      this.indicatorFunction(6);
    }.bind(this)
  },

  { // Cave
    open: function () {
      this.indicatorFunction(7);
    }.bind(this)
  },

  { // Forest
    open: function () {
      this.indicatorFunction(8);
    }.bind(this)
  },

  { // Alpine
    open: function () {
      this.indicatorFunction(9);
    }.bind(this)
  },

  { // Woods
    open: function () {
      this.indicatorFunction(10);
    }.bind(this)
  },

  { // Swamp
    open: function () {
      this.indicatorFunction(11);
    }.bind(this)
  },

  { // Deadlands
    open: function () {
      this.indicatorFunction(12);
    }.bind(this)
  },

  { // Sky
    open: function () {
      this.indicatorFunction(13);
    }.bind(this)
  },

  { // Underwater
    open: function () {
      this.indicatorFunction(14);
    }.bind(this)
  },

  { // Fungi
    open: function () {
      this.indicatorFunction(15);
    }.bind(this)
  },

  { // Tundra
    open: function () {
      this.indicatorFunction(16);
    }.bind(this)
  },

  { // Tarpit
    open: function () {
      this.indicatorFunction(17);
    }.bind(this)
  },

  { // Desert
    open: function () {
      this.indicatorFunction(18);
    }.bind(this)
  },

  { // Boreal
    open: function () {
      this.indicatorFunction(19);
    }.bind(this)
  },

  { // Monolith
    open: function () {
      this.indicatorFunction(20);
    }.bind(this)
  }

];
