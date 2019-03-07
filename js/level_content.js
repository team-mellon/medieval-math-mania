var num_levels = 20;

var level_bg_colors = [

  "#c9e6ff", // City
  "#c9f9ff", // Grasslands
  "#3b0a0a", // Volcano
  "#c2ffe6", // Sea
  "#b3b3b3", // Mountains
  "#effffe", // Summit
  "#010027", // Cave
  "#2f3b25", // Forest
  "#cae3e9", // Alpine
  "#3f2900", // Woods
  "#292c2b", // Swamp
  "#231e25", // Deadlands
  "#c9e6ff", // Sky
  "#c9f9ff", // Underwater
  "#3b0a0a", // Fungi
  "#c2ffe6", // Tundra
  "#b3b3b3", // Tarpit
  "#effffe", // Desert
  "#010027", // Boreal
  "#2f3b25" // Monolith

];

//generates range for each level
function genRange() {

	//exactly one multiple of multiplicand in range, single digit multiplicand
	if (current_level == 1) {
		// Generate new range
		multiplicand = Math.floor(Math.random() * 7) + 2;
		multiple = Math.floor(Math.random() * 7) + 2;
		lower = (multiple * multiplicand) - Math.floor(multiplicand/2);
		upper = (multiple * multiplicand) + Math.floor(multiplicand/2);
	}

	//No multiples of multiplicand in range, single digit multiplicand
	if (current_level == 2) {
		// Generate new range
		multiplicand = Math.floor(Math.random() * 7) + 2;
		multiple = Math.floor(Math.random() * 7) + 2;
		lower = (multiple * multiplicand) + 1;
		upper = (multiple * (multiplicand+1)) - 1;
	}

	//Starting number is a two-digit number, target range includes the value which is one tenth of the number, and is bounded by positive single-digit integers.
	if (current_level == 3) {
		// Generate new range
		multiplicand = Math.floor(Math.random() * 90)+ 10;
		factor = (0.1) * multiplicand;
		lower = Math.floor(factor);
		upper = Math.ceil(factor);
		if(lower == upper)
		{
			upper++;
		}
	}

	//Starting number is a two-digit number, target range goes from 0 to a single-digit positive integer.
	if (current_level == 4) {
		// Generate new range
		multiplicand = Math.floor(Math.random() * 90) + 10;
		lower = 0;
		upper = Math.floor(Math.random() * 7) + 2;
	}

	/*Starting number is a single-digit number. For target range, choose another single-digit number,
	multiply it by 10 times the starting number, and make sure that the target range contains that number.
	The lower boundary is an integer at least 10 below the product and the upper boundary is an integer
	at least 10 above the product.*/
	if (current_level == 5) {
		// Generate new range
		multiplicand = Math.floor(Math.random() * 7) + 2;
		multiple = Math.floor(Math.random() * 7) + 2;
		storage = multiplicand * multiple * 10;
		lower = storage - 10;
		upper = storage + 10;
	}

	/*Starting number is a single-digit number n, target range contains 100n,
	and the range makes it so there is only one integer answer
	(i.e. the lower bound is above 100n − n and the upper bound is below 100n + n.*/
	if (current_level == 6) {
		// Generate new range
		multiplicand = Math.floor(Math.random() * 7) + 2;
		multiple = 100 * multiplicand;
		lower = multiple - Math.floor(multiplicand/2);
		upper = multiple + Math.floor(multiplicand/2);
	}

	//Starting number is a two-digit number, target range contains 0 (flanked by single-digit integers)
	if (current_level == 7) {
		// Generate new range
		multiplicand = Math.floor(Math.random() * 90) + 10;
		lower = -Math.abs(Math.floor(Math.random() * 7) + 2);
		upper = Math.floor(Math.random() * 7) + 2;
	}

	//Starting number is a two-digit number, target range numbers are both 3-digit, with no integer
	if (current_level == 8) {
		// Generate new range
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
	}
	//Starting number is a three-digit number, target range goes from 0 to a single-digit positive integer. 
	if (current_level == 9) {
		// Generate new range
		multiplicand = Math.floor((Math.random() * 900) + 100);
		lower = 0;
		upper = Math.floor(Math.random() * 7) + 2;
	}
	/*Starting number is a number between 0 and .1 with three decimal places. Lower bound of target 
	range is 1000 times the starting number, and upper bound is one more than the lower bound. */
	if (current_level == 10) {
		// Generate new range
		multiplicand = Math.floor((Math.random() * 990) + 10) / 1000;
		lower = 1000 * multiplicand;
		upper = lower + 1;
	}
	/*Starting number is a number between 10 and 100 with one decimal place. Lower bound of target 
	range is 1000 times the starting number, and upper bound is one more than the lower bound.*/
	if (current_level == 11) {
		// Generate new range
		multiplicand = Math.floor(Math.random() * 90 * 10 + 10) / 10;
		lower = 1000 * multiplicand;
		upper = lower + 1;
	}
	/*Starting number is a whole number greater than 1,000,000. Target range contains the number which is .0001 times the size of the starting number.
	The lower bound may be up to 50 less than this value and the upper bound may be up to 50 greater than this value.*/
	if (current_level == 12) {
		// Generate new range
		multiplicand = Math.floor(Math.random() * 10000000);
		lower = (Math.floor(multiplicand * 0.0001)) - (Math.floor(Math.random() * 50) + 10);
		upper = (Math.floor(multiplicand * 0.0001)) + (Math.floor(Math.random() * 50) + 10);
	}
	/*Starting number is an integer less than 200. Target range contains the number which is half the value 
	with an overall range less than 10. */
	if (current_level == 13) {
		// Generate new range
		multiplicand = Math.floor(Math.random() * 100 + 100);
		lower = Math.floor(multiplicand / 2) - 4;
		upper = Math.floor(multiplicand / 2) + 4;
	}
	/*Starting number is a number less than 10 with one decimal place. 
	Target range has three-digit bounding numbers, does not contain an 
	integer multiple of the starting number, and the range of the interval is 1.*/
	if (current_level == 14) {
		// Generate new range
		multiplicand = Math.floor(Math.random() * 90 + 9) / 10;
		lower = Math.floor(Math.random() * 900 + 100);
		upper = lower + 1;
	}
	/*Starting number is a negative single-digit integer. Target range contains only positive values, one of 
	which is a multiple of the starting number.*/
	if (current_level == 15) {
		// Generate new range
		multiplicand = -Math.abs(Math.floor(Math.random() * 7) + 2);
		lower = multiplicand * multiplicand;
		upper = lower + (Math.floor(Math.random() * 7) + 2);
	}
	/*Starting number is a positive two-digit integer. Target range is bounded by two-digit negative integers 
	5 away from each other.*/
	if (current_level == 16) {
		// Generate new range
		multiplicand = Math.floor(Math.random() * 90 + 9);
		lower = -Math.abs(Math.floor(Math.random() * 84) + 15);
		upper = lower + 5;
	}
	/*Starting number is a number between -100 and -10 with one decimal place. Target range bounds are 
	any two integers between -20 and 0.*/
	if (current_level == 17) {
		// Generate new range
		multiplicand = -Math.abs(Math.floor(Math.random() * 90) + 10);
		lower = -Math.abs(Math.floor(Math.random() * 10) + 10);
		upper = -Math.abs(Math.floor(Math.random() * 10));
	}
	/*Starting number is a number between -100 and -10 with one decimal place. Target range bounds are 
	any two integers between 0 and 20. */
	if (current_level == 18) {
		// Generate new range
		multiplicand = -Math.abs(Math.floor(Math.random() * 90 * 10 + 10) / 10);
		lower = Math.floor(Math.random() * 10);
		upper = Math.floor(Math.random() * 10 + 10);
	}
	/*Starting number is an integer between -100 and -10 with one decimal place. Target range bounds are 
	positive numbers between 0 and 1 with two decimal places that are one hundredth apart. */
	if (current_level == 19) {
		// Generate new range
		multiplicand = -Math.abs(Math.floor(Math.random() * 90 * 10 + 10) / 10);
		lower = Math.floor((Math.random() * 90) + 9) / 100;
		upper = lower + 0.01;
	}
	/*Starting number is any positive three digit integer. Target range is bounded by two numbers between 
	-10 and -5, with three decimal places, and within one hundredth of each other. */
	if (current_level == 20) {
		// Generate new range
		multiplicand = Math.floor(Math.random() * 900) + 100;
		lower = -Math.abs((Math.floor(Math.random() * 10000) + 5000) /1000);
		upper = lower + 0.01;
	}

  clearMultiplicandBanner();
  clearRangeBanner();

  remakeMultiplierBanner();
  remakeRangeBanner();

}
