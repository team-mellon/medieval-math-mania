var num_levels = 20;

var levels = [

  { // City
    number: 1,
    color: "#c9e6ff",
    hint: "If the student got the one whole number hit, and got the high, and the low, prompt them to think about money. For example, if they tried 8 × 7 = 56 and also tried 8 × 6 = 48 and 8 × 8 = 64, prompt them to try a value between 6 and 7 or between 7 and 8. Is there an amount of money between $6 and $7 or between $7 and $8? Try that value next!",
    // Exactly one multiple of multiplicand in range, single digit multiplicand
    math: function () {
      multiplicand = Math.floor(Math.random() * 7) + 2;
      multiple = Math.floor(Math.random() * 7) + 2;
      lower = (multiple * multiplicand) - Math.floor(multiplicand/2);
      upper = (multiple * multiplicand) + Math.floor(multiplicand/2);
    },
    open: function () {
      indicatorFunction(1);
    }
  },



  { // Grasslands
    number: 2,
    color: "#c9f9ff",
    hint: "If the student got the whole number high and the low right above and below the target range, prompt them to think about money. For example, if they tried 7 × 7 = 49 and also tried 7 × 8 = 56, prompt them to try a value between 7 and 8. Think about money — is there an amount of money between $7 and $8? Try that value next!",
    // No multiples of multiplicand in range, single digit multiplicand
    math: function () {
      multiplicand = Math.floor(Math.random() * 7) + 2;
      multiple = Math.floor(Math.random() * 7) + 2;
      lower = (multiple * multiplicand) + 1;
      upper = (multiple * (multiplicand+1)) - 1;
    },
    open: function () {
      indicatorFunction(2);
    }
  },



  { // Volcano
    number: 3,
    color: "#3b0a0a",
    hint: "No hint for this level yet",
    // Starting number is a two-digit number, target range includes the value which is one tenth of the number, and is bounded by positive single-digit integers.
    math: function () {
      multiplicand = Math.floor(Math.random() * 90)+ 10;
      factor = (0.1) * multiplicand;
      lower = Math.floor(factor);
      upper = Math.ceil(factor);
      if(lower == upper) {
        upper++;
      }
    },
    open: function () {
      indicatorFunction(3);
    }
  },



  { // Sea
    number: 4,
    color: "#c2ffe6",
    hint: "No hint for this level yet",
    // Starting number is a two-digit number, target range goes from 0 to a single-digit positive integer.
    math: function () {
      multiplicand = Math.floor(Math.random() * 90) + 10;
      lower = 0;
      upper = Math.floor(Math.random() * 7) + 2;
    },
    open: function () {
      indicatorFunction(4);
    }
  },



  { // Mountains
    number: 5,
    color: "#b3b3b3",
    hint: "No hint for this level yet",
    /*Starting number is a single-digit number. For target range, choose another single-digit number,
    multiply it by 10 times the starting number, and make sure that the target range contains that number.
    The lower boundary is an integer at least 10 below the product and the upper boundary is an integer
    at least 10 above the product.*/
    math: function () {
      multiplicand = Math.floor(Math.random() * 7) + 2;
      multiple = Math.floor(Math.random() * 7) + 2;
      storage = multiplicand * multiple * 10;
      lower = storage - 10;
      upper = storage + 10;
    },
    open: function () {
      indicatorFunction(5);
    }
  },



  { // Summit
    number: 6,
    color: "#effffe",
    hint: "No hint for this level yet",
    /*Starting number is a single-digit number n, target range contains 100n,
  	and the range makes it so there is only one integer answer
  	(i.e. the lower bound is above 100n − n and the upper bound is below 100n + n.*/
    math: function () {
  		multiplicand = Math.floor(Math.random() * 7) + 2;
  		multiple = 100 * multiplicand;
  		lower = multiple - Math.floor(multiplicand/2);
  		upper = multiple + Math.floor(multiplicand/2);
    },
    open: function () {
      indicatorFunction(6);
    }
  },



  { // Cave
    number: 7,
    color: "#010027",
    hint: "No hint for this level yet",
    //Starting number is a two-digit number, target range contains 0 (flanked by single-digit integers)
    math: function () {
  		multiplicand = Math.floor(Math.random() * 90) + 10;
  		lower = -Math.abs(Math.floor(Math.random() * 7) + 2);
  		upper = Math.floor(Math.random() * 7) + 2;
    },
    open: function () {
      indicatorFunction(7);
    }
  },



  { // Forest
    number: 8,
    color: "#2f3b25",
    hint: "No hint for this level yet",
    //Starting number is a two-digit number, target range numbers are both 3-digit, with no integer
    math: function () {
  		multiplicand = Math.round((Math.random() * 90)) + 10;
  		lower = (Math.round((Math.random() * 90)+ 10 * 11) / 10);
  		if(lower % 1 == 0)
  		{
  			lower += 0.7;
  		}
  		upper = Math.round((lower * lower/8)*10 + lower/2) / 10;
  		if(upper % 1 == 0)
  		{
  			upper += 0.4;
  		}
    },
    open: function () {
      indicatorFunction(8);
    }
  },



  { // Alpine
    number: 9,
    color: "#dbf8ff",
    hint: "No hint for this level yet",
    //Starting number is a three-digit number, target range goes from 0 to a single-digit positive integer.
    math: function () {
  		multiplicand = Math.floor((Math.random() * 900) + 100);
  		lower = 0;
  		upper = Math.floor(Math.random() * 7) + 2;
    },
    open: function () {
      indicatorFunction(9);
    }
  },



  { // Woods
    number: 10,
    color: "#3f2900",
    hint: "No hint for this level yet",
    /*Starting number is a number between 0 and .1 with three decimal places. Lower bound of target
  	range is 1000 times the starting number, and upper bound is one more than the lower bound. */
    math: function () {
  		multiplicand = Math.floor((Math.random() * 990) + 10) / 1000;
  		lower = 1000 * multiplicand;
  		upper = lower + 1;
    },
    open: function () {
      indicatorFunction(10);
    }
  },



  { // Swamp
    number: 11,
    color: "#292c2b",
    hint: "No hint for this level yet",
    /*Starting number is a number between 10 and 100 with one decimal place. Lower bound of target
  	range is 1000 times the starting number, and upper bound is one more than the lower bound.*/
    math: function () {
  		multiplicand = Math.floor(Math.random() * 90 * 10 + 10) / 10;
  		lower = 1000 * multiplicand;
  		upper = lower + 1;
    },
    open: function () {
      indicatorFunction(11);
    }
  },



  { // Deadlands
    number: 12,
    color: "#231e25",
    hint: "No hint for this level yet",
    /*Starting number is a whole number greater than 1,000,000. Target range contains the number which is .0001 times the size of the starting number.
  	The lower bound may be up to 50 less than this value and the upper bound may be up to 50 greater than this value.*/
    math: function () {
  		multiplicand = Math.floor(Math.random() * 10000000);
  		lower = (Math.floor(multiplicand * 0.0001)) - (Math.floor(Math.random() * 50) + 10);
  		upper = (Math.floor(multiplicand * 0.0001)) + (Math.floor(Math.random() * 50) + 10);
    },
    open: function () {
      indicatorFunction(12);
    }
  },



  { // Sky
    number: 13,
    color: "#b6c1ff",
    hint: "No hint for this level yet",
    /*Starting number is an integer less than 200. Target range contains the number which is half the value
  	with an overall range less than 10. */
    math: function () {
  		multiplicand = Math.floor(Math.random() * 100 + 100);
  		lower = Math.floor(multiplicand / 2) - 4;
  		upper = Math.floor(multiplicand / 2) + 4;
    },
    open: function () {
      indicatorFunction(13);
    }
  },



  { // Underwater
    number: 14,
    color: "#00373d",
    hint: "No hint for this level yet",
    /*Starting number is a number less than 10 with one decimal place.
  	Target range has three-digit bounding numbers, does not contain an
  	integer multiple of the starting number, and the range of the interval is 1.*/
    math: function () {
  		multiplicand = Math.floor(Math.random() * 90 + 9) / 10;
  		lower = Math.floor(Math.random() * 900 + 100);
  		upper = lower + 1;
    },
    open: function () {
      indicatorFunction(14);
    }
  },



  { // Fungi
    number: 15,
    color: "#3b0a30",
    hint: "No hint for this level yet",
    /*Starting number is a negative single-digit integer. Target range contains only positive values, one of
  	which is a multiple of the starting number.*/
    math: function ()  {
  		multiplicand = -Math.abs(Math.floor(Math.random() * 7) + 2);
  		lower = multiplicand * multiplicand;
  		upper = lower + (Math.floor(Math.random() * 7) + 2);
    },
    open: function () {
      indicatorFunction(15);
    }
  },



  { // Tundra
    number: 16,
    color: "#ccf1ff",
    hint: "No hint for this level yet",
    /*Starting number is a positive two-digit integer. Target range is bounded by two-digit negative integers
    5 away from each other.*/
    math: function () {
      multiplicand = Math.floor(Math.random() * 90 + 9);
      lower = -Math.abs(Math.floor(Math.random() * 84) + 15);
      upper = lower + 5;
    },
    open: function () {
      indicatorFunction(16);
    }
  },



  { // Tarpit
    number: 17,
    color: "#5d5661",
    hint: "No hint for this level yet",
    /*Starting number is a number between -100 and -10 with one decimal place. Target range bounds are
    any two integers between -20 and 0.*/
    math: function () {
      multiplicand = -Math.abs(Math.floor(Math.random() * 90) + 10);
      lower = -Math.abs(Math.floor(Math.random() * 10) + 10);
      upper = -Math.abs(Math.floor(Math.random() * 10));
    },
    open: function () {
      indicatorFunction(17);
    }
  },



  { // Desert
    number: 18,
    color: "#effffe",
    hint: "No hint for this level yet",
    /*Starting number is a number between -100 and -10 with one decimal place. Target range bounds are
    any two integers between 0 and 20. */
    math: function () {
      multiplicand = -Math.abs(Math.floor(Math.random() * 90 * 10 + 10) / 10);
      lower = Math.floor(Math.random() * 10);
      upper = Math.floor(Math.random() * 10 + 10);
    },
    open: function () {
      indicatorFunction(18);
    }
  },



  { // Boreal
    number: 19,
    color: "#556968", // "#010027",
    hint: "No hint for this level yet",
    /*Starting number is an integer between -100 and -10 with one decimal place. Target range bounds are
    positive numbers between 0 and 1 with two decimal places that are one hundredth apart. */
    math: function () {
      multiplicand = -Math.abs(Math.floor(Math.random() * 90 * 10 + 10) / 10);
      lower = Math.floor((Math.random() * 90) + 9) / 100;
      upper = Math.floor((lower + 0.01)* 100)/100;
    },
    open: function () {
      indicatorFunction(19);
    }
  },



  { // Monolith
    number: 20,
    color: "#56727d",
    hint: "No hint for this level yet",
    /*Starting number is any positive three digit integer. Target range is bounded by two numbers between
    -10 and -5, with three decimal places, and within one hundredth of each other. */
    math: function () {
      multiplicand = Math.floor(Math.random() * 900) + 100;
      lower = -Math.abs((Math.floor(Math.random() * 10000) + 5000) /1000);
      upper = lower + 0.01;
    },
    open: function () {
      indicatorFunction(20);
    }
  }

];
