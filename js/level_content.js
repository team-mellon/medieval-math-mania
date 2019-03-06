var num_levels = 20;

var level_bg_colors = [

  "#c9e6ff", // City
  "#c9f9ff", // Grasslands
  "#3b0a0a", // Volcano
  "#c2ffe6", // Sea
  // "#b3b3b3", // Mountains
  // "#effffe", // Summit
  // "#010027", // Cave
  "#2f3b25", // Forest
  "#cae3e9", // Alpine
  // "#3f2900", // Woods
  "#292c2b" // Swamp
  // "#231e25" // Deadlands

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
		lower = multiple - multiplicand;
		upper = multiple + multiplicand;
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
		multiplicand = Math.floor(Math.random() * 90) + 10;
		lower = -Math.abs(Math.floor(Math.random() * 7) + 2);
		upper = Math.floor(Math.random() * 7) + 2;
	}

	if (current_level == 9) {
		// Generate new range
		multiplicand = Math.floor(Math.random() * 90) + 10;
		lower = -Math.abs(Math.floor(Math.random() * 7) + 2);
		upper = Math.floor(Math.random() * 7) + 2;
	}

	if (current_level == 10) {
		// Generate new range
		multiplicand = Math.floor(Math.random() * 90) + 10;
		lower = -Math.abs(Math.floor(Math.random() * 7) + 2);
		upper = Math.floor(Math.random() * 7) + 2;
	}

	if (current_level == 11) {
		// Generate new range
		multiplicand = Math.floor(Math.random() * 90) + 10;
		lower = -Math.abs(Math.floor(Math.random() * 7) + 2);
		upper = Math.floor(Math.random() * 7) + 2;
	}

	if (current_level == 12) {
		// Generate new range
		multiplicand = Math.floor(Math.random() * 90) + 10;
		lower = -Math.abs(Math.floor(Math.random() * 7) + 2);
		upper = Math.floor(Math.random() * 7) + 2;
	}

	if (current_level == 13) {
		// Generate new range
		multiplicand = Math.floor(Math.random() * 90) + 10;
		lower = -Math.abs(Math.floor(Math.random() * 7) + 2);
		upper = Math.floor(Math.random() * 7) + 2;
	}

	if (current_level == 14) {
		// Generate new range
		multiplicand = Math.floor(Math.random() * 90) + 10;
		lower = -Math.abs(Math.floor(Math.random() * 7) + 2);
		upper = Math.floor(Math.random() * 7) + 2;
	}

	if (current_level == 15) {
		// Generate new range
		multiplicand = Math.floor(Math.random() * 90) + 10;
		lower = -Math.abs(Math.floor(Math.random() * 7) + 2);
		upper = Math.floor(Math.random() * 7) + 2;
	}

	if (current_level == 16) {
		// Generate new range
		multiplicand = Math.floor(Math.random() * 90) + 10;
		lower = -Math.abs(Math.floor(Math.random() * 7) + 2);
		upper = Math.floor(Math.random() * 7) + 2;
	}

	if (current_level == 17) {
		// Generate new range
		multiplicand = Math.floor(Math.random() * 90) + 10;
		lower = -Math.abs(Math.floor(Math.random() * 7) + 2);
		upper = Math.floor(Math.random() * 7) + 2;
	}

	if (current_level == 18) {
		// Generate new range
		multiplicand = Math.floor(Math.random() * 90) + 10;
		lower = -Math.abs(Math.floor(Math.random() * 7) + 2);
		upper = Math.floor(Math.random() * 7) + 2;
	}

	if (current_level == 19) {
		// Generate new range
		multiplicand = Math.floor(Math.random() * 90) + 10;
		lower = -Math.abs(Math.floor(Math.random() * 7) + 2);
		upper = Math.floor(Math.random() * 7) + 2;
	}
  
	if (current_level == 20) {
		// Generate new range
		multiplicand = Math.floor(Math.random() * 90) + 10;
		lower = -Math.abs(Math.floor(Math.random() * 7) + 2);
		upper = Math.floor(Math.random() * 7) + 2;
	}

  clearMultiplicandBanner();
  clearRangeBanner();

  remakeMultiplierBanner();
  remakeRangeBanner();

}
