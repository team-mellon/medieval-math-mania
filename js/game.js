var frame_counter = 0;

var entry_is_correct;

var hit = false;
var miss_upper = false;
var miss_lower = false;

var upper = 100;
var lower = 35;

var waiting_hit = false;
var waiting_miss = false;

var generated = false;

var fired = false;
var fire_counter = 0;
var hit_counter = 0;
var miss_upper_counter = 0;
var miss_lower_counter = 0;
var h_counter = 0;
var u_counter = 0;
var l_counter = 0;
var reload = false;
var reload_counter = 0;
var projectile_speed = 57;
var projectile_x_speed = 0;

var hide_knight = false;
var hide_archer1 = false;
var hide_archer2 = false;
var hide_archer3 = false;
var hide_archer4 = false;

var boss_fight = false;
var play_tutorial = true;

var landscape_warning;

var storage = 0;
var factor = 0;
var multiple = 0;
var multiplier = 0;
var digit = 2;
var last_digit = 0;
var adder = 1;

var history_list = [];

var valid = true;

//Setting properties for delays for sounds
var delayRe = new createjs.PlayPropsConfig().set({delay : 250});
var delayIn = new createjs.PlayPropsConfig().set({delay : 500});
var delayOut = new createjs.PlayPropsConfig().set({delay : 750});
var delayWin = new createjs.PlayPropsConfig().set({delay : 2000});

var database = {
  "users": {
    "admin": {
      "firstname": "Eric",
      "lastname": "Bitikofer",
      "password": "1234"
    }
  },
  "stats": {
    "admin": {
      "hits": 0,
      "misses": 0
    }
  }
};

var multiplicand = 5;
var sign = " x "; //&#37
var equal = " = ";
var solution = 0;

function tick(event) {

  //Calls external function to generate ranges for each level, this is reset when each level is selected on level select

  if (current_scene == 3 && pause_menu.visible == false) {

    // If the range is not generated
  	if(!generated) {

      // Generate the range
  		levels[current_level - 1].math();

      clearMultiplicandBanner();

      remakeMultiplierBanner();
      remakeRangeBanner();

  		generated = true;

  	}

    // Key checks at the beginning of the update loop
    // Spacebar to randomize the range
    // if (keys[32]){
      // randomizeRangeAndMultiplier();
    // }

    // Enter or swipe up to check input
    if ((keys[13] || drag_up) && catapult.paused) { // Enter or drag up swipe on mobile
      runInput();
    }

    // If on mobile
    if (mobile) {
      // Check which digit is selected and highlight it
      checkSelectedDigit();
    }

    // Run through and finish animations that play once
    updateSinglePlayAnimations();

    // Check for hit and miss and then run thier animations
    runHitAnimations();
    runMissAnimations();

    // Check to see if the tutorial should be displayed
    checkTutorial();

    //If game over
    if (hit_counter >= 3 && miss_upper_counter >= 1 && miss_lower_counter >= 1 && reload == false) {
      // Show the endgame screen
      createVictoryBanner();
      // Also maybe check if boss level is active
      // checkBossFight();
    }

    // Hide bad guys when hit
    hideBadGuys();

    // Run the catapult animation
    runCatapultAnimation();

    // Reload the catapult
    reloadCatapult()

  }

  // Update frame counter for drawing
  // frame_counter++;

  // if (frame_counter > 9) {
  //
  //   reload_counter += frame_counter;
  //   frame_counter = 0;
  //
  // }

  stage.update(event);

}

function randomizeRangeAndMultiplier() {

  // Generate new range
  rand_num1 = Math.floor((Math.random() * 10) + 1);
  rand_num2 = Math.floor((Math.random() * 100) + 1);
  multiplicand = Math.floor(Math.random() * 11);
  lower = rand_num1 * rand_num2;
  upper = rand_num1 * (rand_num2 + 3);

  var multip_div = document.getElementById("multiplicandText");
  while (multip_div.firstChild) {
    multip_div.removeChild(multip_div.firstChild);
  }

  var multip = document.createTextNode(multiplicand);
  multip_div.appendChild(multip);

}

function runInput() {

  // Reset drag_up bool;
  drag_up = false;

  console.log("HIT: " + hit_counter);
  console.log("MU" + miss_upper_counter);
  console.log("ML" + miss_lower_counter);

  // Need to check for input correctness here
  // No letters or symbols only numbers

  valid = true;

  if (mobile) {

    for (var x in history_list) {
      console.log(history_list[x]);
      console.log(entry);
      // if (multiplier == history_list[x]){
      //   valid = false;
      // }
    }
    if (valid) {

      // Add to history
      console.log(history_list);
      history_list.push(multiplier);
      var dropdown = document.getElementById("myDropdown");
      var history_entry = document.createTextNode(multiplier);
      var line_break = document.createElement("br");
      dropdown.appendChild(history_entry);
      dropdown.appendChild(line_break);

      // Actual math
      solution = multiplier * multiplicand;
      console.log(solution);
      solution = Math.floor10(solution, -1);
      console.log(solution);

      var solut_div = document.getElementById("solutionText");
      while (solut_div.firstChild) {
        solut_div.removeChild(solut_div.firstChild);
      }

      var solut = document.createTextNode(solution);
      solut_div.appendChild(solut);

    	structure_equation_banner.text = multiplicand.toString() + " x          = " + solution.toString();

      clearGameForm();

      if (solution <= upper && solution >= lower) {
        hit = true;
        console.log("hit");
        catapult.gotoAndPlay(0);
        // Triggering other fired events
        fired = true;
      }
      else if (solution > upper) {
        miss_upper = true;
        console.log("miss upper");
        catapult.gotoAndPlay(0);
        // Triggering other fired events
        fired = true;
      }
      else if (solution < lower) {
        miss_lower = true;
        console.log("miss lower");
        catapult.gotoAndPlay(0);
        // Triggering other fired events
        fired = true;
      }

      multiplier = 0;
      document.getElementById("hundredsPlace").textContent = Math.floor(multiplier/100 % 10);
      document.getElementById("tensPlace").textContent = Math.abs(Math.floor(multiplier/10 % 10));
      document.getElementById("onesPlace").textContent = Math.abs(Math.floor(multiplier % 10));

    }

  } else {

    // Parse entry
    var entry = parseInt(document.getElementById("entryInput").value);
    console.log("Entry type: " + typeof entry);
    console.log("Entry: " + entry);

    if ((typeof entry) == "number") {

      if (Number.isNaN(entry)) {
        entry_is_correct = false;

      } else {
        //this is where to add level specific rules should they prove neccesary, at the moment they are not
        entry_is_correct = true;
      }

    } else {
      entry_is_correct = false;
    }
    for (var x in history_list) {
      console.log(history_list[x]);
      console.log(entry);
      //Commented out for sake of sprint
      /*if (entry == history_list[x]) {
        valid = false;
      }*/
    }
    // Animate the catapult
    if (entry_is_correct && valid) {

      multiplier = document.getElementById("entryInput").value;

      // Add to history
      history_list.push(multiplier);
      console.log(history_list);
      var dropdown = document.getElementById("myDropdown");
      var history_entry = document.createTextNode(multiplier);
      var line_break = document.createElement("br");
      dropdown.appendChild(history_entry);
      dropdown.appendChild(line_break);


      // Actual math
      solution = multiplier * multiplicand;
      console.log(solution);
      solution = Math.round((solution + 0.00001) * 100) / 100;
      console.log(solution);

      var solut_div = document.getElementById("solutionText");
      while (solut_div.firstChild) {
        solut_div.removeChild(solut_div.firstChild);
      }

      var solut = document.createTextNode(solution);
      solut_div.appendChild(solut);

      structure_equation_banner.text = multiplicand.toString() + " x          = " + solution.toString();

      clearGameForm();

      document.getElementById("entryInput").value = "";

      if (solution <= upper && solution >= lower) {
        //Plays reload sfx
        createjs.Sound.play("firing");
        createjs.Sound.play("reload", delayRe);
        hit = true;
        console.log("hit");
        catapult.gotoAndPlay(0);
        // Triggering other fired events
        fired = true;
        //plays sound for lighting fireball and hitting castle
        createjs.Sound.play("light");
        createjs.Sound.play("crumble", delayIn);
      } else if (solution > upper) {
        //Plays reload sfx
        createjs.Sound.play("firing");
        createjs.Sound.play("reload", delayRe);
        miss_upper = true;
        console.log("miss upper");
        catapult.gotoAndPlay(0);
        // Triggering other fired events
        fired = true;
        //plays sound for lighting fireball and hitting castle
        createjs.Sound.play("light");
        createjs.Sound.play("crumble", delayOut);
      } else if (solution < lower) {
        //Plays reload sfx
        createjs.Sound.play("firing");
        createjs.Sound.play("reload", delayRe);
        miss_lower = true;
        console.log("miss lower");
        catapult.gotoAndPlay(0);
        // Triggering other fired events
        fired = true;
        //plays sound for lighting fireball and hitting castle
        createjs.Sound.play("light");
        createjs.Sound.play("crumble", delayOut);
      }
    }
  }

  // console.log(projectile.alpha);

}

function checkSelectedDigit() {

  if (digit != last_digit) {

    switch(digit) {

      case 0:
        adder = 100;
        document.getElementById("hundredsPlace").style.color = "red";
        document.getElementById("tensPlace").style.color = "black";
        document.getElementById("onesPlace").style.color = "black";
        break;
      case 1:
        adder = 10;
        document.getElementById("hundredsPlace").style.color = "black";
        document.getElementById("tensPlace").style.color = "red";
        document.getElementById("onesPlace").style.color = "black";
        break;
      case 2:
        adder = 1;
        document.getElementById("hundredsPlace").style.color = "black";
        document.getElementById("tensPlace").style.color = "black";
        document.getElementById("onesPlace").style.color = "red";
        break;

    }

    last_digit = digit;

  }

}

function updateSinglePlayAnimations() {

  //Catapult or whatever it is in the scene
  if (!catapult.paused && catapult.currentFrame == 11) {
    catapult.stop();
    reload = false;
  }

  if (!end_level_flag.paused && end_level_flag.currentFrame == 11) {
    end_level_flag.stop();
  }

  // Structure in the scene
  if (!structure_center.paused && structure_center.currentFrame == 11) {
    structure_center.stop();
  }
  if (!structure_left_center.paused && structure_left_center.currentFrame == 5) {
    structure_left_center.stop();
  }
  if (!structure_right_center.paused && structure_right_center.currentFrame == 5) {
    structure_right_center.stop();
  }
  if (!structure_left.paused && structure_left.currentFrame == 5) {
    structure_left.stop();
  }
  if (!structure_right.paused && structure_right.currentFrame == 5) {
    structure_right.stop();
  }

  // Structure in the scene
  if (!firework_low.paused && firework_low.currentFrame == 11) {
    firework_low.gotoAndStop(0);
  }
  if (!firework_hit.paused && firework_hit.currentFrame == 11) {
    firework_hit.gotoAndStop(0);
  }
  if (!firework_high.paused && firework_high.currentFrame == 11) {
    firework_high.gotoAndStop(0);
  }

}

function runHitAnimations() {

  if (hit) {

    switch (hit_counter) {

      case 0:
        console.log("henchmanLC");
        target_x = henchman_left_center.x;
        projectile_x_speed = 12;
        break;

      case 1:
        console.log("henchmanRC");
        target_x = henchman_right_center.x;
        projectile_x_speed = 12;
        break;

      case 2:
        console.log("bossC");
        target_x = boss.x;
        projectile_x_speed = 0;
        break;

      default:
        break;

    }

    hit = false;
    waiting_hit = true;

  }

  if (waiting_hit) {

    if (projectile_speed < 0 && projectile.y >= boss.y) {

      switch (hit_counter) {

        case 0:
          hide_archer1 = true;
          structure_left_center.gotoAndPlay(0);
          break;

        case 1:
          hide_archer2 = true;
          structure_right_center.gotoAndPlay(0);
          break;

        case 2:
          hide_knight = true;
          structure_center.gotoAndPlay(0);
          break;

        default:
          break;

      }

      firework_hit.gotoAndPlay(0);
      reload = true;
      waiting_hit = false;
      hit_counter++;
      structure_score.text = "Total Lows: " + miss_lower_counter.toString() + "\nTotal High: " + miss_upper_counter.toString() + "\nTotal Hits: " + hit_counter.toString();

    }

  }

}

function runMissAnimations() {

  if (miss_lower) {

    target_x = henchman_left.x;
    projectile_x_speed = 20;
    // miss_lower = false;
    waiting_miss = true;

  }

  if (miss_upper) {

    target_x = henchman_right.x;
    projectile_x_speed = 20;
    // miss_upper = false;
    waiting_miss = true;

  }

  if (waiting_miss) {

    if (miss_lower) {

      if (projectile_speed < 0 && projectile.y >= boss.y) {

        if (miss_lower_counter < 1) {

          hide_archer3 = true;
          structure_left.gotoAndPlay(0);

        }

        firework_low.gotoAndPlay(0);
        reload = true;
        miss_lower = false;
        miss_lower_counter++;
        structure_score.text = "Total Lows: " + miss_lower_counter.toString() + "\nTotal High: " + miss_upper_counter.toString() + "\nTotal Hits: " + hit_counter.toString();

      }

    }

    if (miss_upper) {

      if (projectile_speed < 0 && projectile.y >= boss.y) {

        if (miss_upper_counter < 1) {

          hide_archer4 = true;
          structure_right.gotoAndPlay(0);

        }

        firework_high.gotoAndPlay(0);
        reload = true;
        miss_upper = false;
        miss_upper_counter++;
        structure_score.text = "Total Lows: " + miss_lower_counter.toString() + "\nTotal High: " + miss_upper_counter.toString() + "\nTotal Hits: " + hit_counter.toString();

      }

    }

  }

}

function checkTutorial() {

  // Tutorial
  if (play_tutorial) {

    if (miss_lower_counter != 1) {

      document.getElementById("tutorialText").textContent = "Try finding any multiplier that produces a solution below the range";

    } else {

      if (miss_upper_counter != 1) {

        document.getElementById("tutorialText").textContent = "Try finding any multiplier that produces a solution above the range";

      } else {

        if (hit_counter != 3) {

          document.getElementById("tutorialText").textContent = "Try finding 3 multipliers that produce solutions within the range";

        } else {

        }

      }

    }

  }

}

function createVictoryBanner() {

  hit_text.text += hit_counter.toString();
  low_text.text += miss_lower_counter.toString();
  high_text.text += miss_upper_counter.toString();

  visibleForm(false);
  pauseAnimation(true);

  end_level_button.visible = true;

  createjs.Tween.get(end_level_flag).wait(2250).to({visible:true}).call(flagAnimation);

  end_text.visible = true;
  var tempX = scene_scale_X;
  var tempY = scene_scale_Y;
  end_text.scaleX = 0;
  end_text.scaleY = 0;
  createjs.Tween.get(end_text).wait(4250).to({scaleX:tempX ,scaleY:tempY}, 1000, createjs.Ease.quintIn);
  createjs.Tween.get(end_text).wait(4250).to({rotation:360}, 1000);
  hit_text.visible = true;
  createjs.Tween.get(hit_text).wait(5750).to({alpha:1}, 500);

  low_text.visible = true;
  createjs.Tween.get(low_text).wait(6750).to({alpha:1}, 500);

  high_text.visible = true;
  createjs.Tween.get(high_text).wait(7750).to({alpha:1}, 500);

  end_level_button.visible = true;
  createjs.Tween.get(end_level_button).wait(8375).to({alpha:1}, 125);

  menu_button.visible = false;
  console.log("next level");

  target_x = 0;
  hit = false;
  miss_upper = false;
  miss_lower = false;
  hit_counter = 0;
  miss_upper_counter = 0;
  miss_lower_counter = 0;
  projectile_x_speed = 0;

  //plays victory tune
  createjs.Sound.play("win", delayWin);

  // udpate global total
  database["stats"]["admin"]["hits"] += hit_counter;
  database["stats"]["admin"]["misses"] += miss_lower_counter;
  database["stats"]["admin"]["misses"] += miss_upper_counter;

}

function hideBadGuys() {

  //Mors omnibus tyrannis
  if (hide_knight) {
    boss.alpha = 0;
  } else {
    boss.alpha = 1;
  }

  if (hide_archer1) {
    henchman_left_center.alpha = 0;
  } else {
    henchman_left_center.alpha = 1;
  }

  if (hide_archer2) {
    henchman_right_center.alpha = 0;
  } else {
    henchman_right_center.alpha = 1;
  }

  if (hide_archer3) {
    henchman_left.alpha = 0;
  } else {
    henchman_left.alpha = 1;
  }

  if (hide_archer4) {
    henchman_right.alpha = 0;
  } else {
    henchman_right.alpha = 1;
  }

}

function runCatapultAnimation() {

  //Catapult projectile animtion
  if (fired == true) {
    // if (frame_counter > 9) {
    projectile.y -= projectile_speed * scene_scale_Y;
    if (projectile.x < target_x) {
      projectile.x += projectile_x_speed * scene_scale_Y;
    } else if (projectile.x > target_x) {
      projectile.x -= projectile_x_speed * scene_scale_Y;
    }
    projectile_speed -= 3;
    // }
  }

}

function reloadCatapult() {

  if (catapult.currentFrame == 11){
    reload = false;
  }

  if (reload) {
    console.log("reload");
    fired = false;
    projectile.alpha = 0;
    projectile.x = stage.canvas.width / 2;
    projectile.y = stage.canvas.height - (96/2 + 57) * scene_scale_Y;
    projectile_speed = 57;
  } else {
    projectile.alpha = 1;
  }

}

function checkBossFight() {

//   if (boss_fight) {
//
//     big_boss = createSprite(big_bossS, structureX, structureY);
//     scale_image(big_boss, stage.canvas.width / 2, stage.canvas.height / 2);
//
//     console.log("boss");
//
//   } else {
//
//     changeLevel();
//
//   }

}

function flagAnimation(){
  end_level_flag.gotoAndPlay(0);
}

function setBoss() {
  boss_fight = document.getElementById("bossValue").checked;
}

function setTutorial() {
  play_tutorial = document.getElementById("tutorialValue").checked;
}

function clearMultiplicandBanner() {

  // Clear the multiplicand banner
	var multip_div = document.getElementById("multiplicandText");

	while (multip_div.firstChild) {

	   multip_div.removeChild(multip_div.firstChild);

	}

}

function remakeMultiplierBanner() {

	var multip_div = document.getElementById("multiplicandText");

  // Remake multiplier for banner
	var multip = document.createTextNode(multiplicand);

  // Append to the range banner
	multip_div.appendChild(multip);

	structure_equation_banner.text = multiplicand.toString() + " x          = " + solution.toString();

}

function clearGameForm() {

	clearHtml();


    // Creates username display text
    var multiplicand_div = document.createElement("div");
    multiplicand_div.id = "multiplicandText";
    var multiplicand_text = document.createTextNode(multiplicand);
    multiplicand_div.appendChild(multiplicand_text);
    var sign_text = document.createTextNode(sign);
    var entry_input;
    if (mobile) {

      entry_input = document.createElement("div");
      entry_input.id = "entryDisplay";
      var hundreds = document.createElement("span");
      hundreds.id = "hundredsPlace";
      var hundreds_place = document.createTextNode("0");
      hundreds.appendChild(hundreds_place);
      var tens = document.createElement("span");
      tens.id = "tensPlace";
      var tens_place = document.createTextNode("0");
      tens.appendChild(tens_place);
      var ones = document.createElement("span");
      ones.id = "onesPlace";
      var ones_place = document.createTextNode("0");
      ones.appendChild(ones_place);
      entry_input.appendChild(hundreds);
      entry_input.appendChild(tens);
      entry_input.appendChild(ones);

    } else {

      entry_input = document.createElement("input");
      entry_input.id = "entryInput";
      entry_input.setAttribute("type", "number");
      entry_input.setAttribute("placeholder", "###");
      entry_input.setAttribute("value", "");
      entry_input.setAttribute("maxlength", "3");
      entry_input.setAttribute("size", "4");
      entry_input.setAttribute("min", "-999");
      entry_input.setAttribute("max", "999");
      entry_input.setAttribute("name", "entry");
      entry_input.addEventListener('keypress', function(event) {
        if (event.keyCode == 13) {
          event.preventDefault();
        }
      });

    }

    var equal_text = document.createTextNode(equal);
    var solution_div = document.createElement("div");
    solution_div.id = "solutionText";
    var solution_text = document.createTextNode(solution);
    solution_div.appendChild(solution_text);

    // Creates username div to hold display text and input box
    var game_entry_div = document.createElement("div");
    game_entry_div.className = "login";
    game_entry_div.appendChild(multiplicand_div);
    game_entry_div.appendChild(sign_text);
    game_entry_div.appendChild(entry_input);
    game_entry_div.appendChild(equal_text);
    game_entry_div.appendChild(solution_div);

    // Creates username display text
    var button_text = document.createTextNode("#");
    var history_button = document.createElement("button");
    var history_div = document.createElement("div");
    history_button.className = "dropbtn";
    history_button.addEventListener('click', myFunction);
    history_div.className = "dropdown-content";
    history_div.id = "myDropdown";
    history_button.appendChild(button_text);
    var history_dropdown = document.createElement("div");
    history_dropdown.className = "dropdown";
    history_dropdown.appendChild(history_button);
    history_dropdown.appendChild(history_div);

    // Does a thing
    var game_history_div = document.createElement("div");
    game_history_div.className = "login";
    game_history_div.appendChild(history_dropdown);

    // Creates Tutorial display text
    if (play_tutorial) {
      var tutorial_label = document.createTextNode("Tutorial");
      var br1 = document.createElement("br");
      var tutorial_text = document.createElement("span");
      tutorial_text.className = "tutorial";
      tutorial_text.id = "tutorialText";
      var tutorial_words = document.createTextNode("The tutorial is broken");
      tutorial_text.appendChild(tutorial_words);
      var tutorial_div = document.createElement("div");
      tutorial_div.className = "tutorial_title";
      tutorial_div.id = "tutorialDiv"
      tutorial_div.appendChild(tutorial_label);
      tutorial_div.appendChild(br1);
      tutorial_div.appendChild(tutorial_text);
    }

    // Creates login form to hold username and password divs
    var game_entry_form = document.createElement("form");
    game_entry_form.id = "equationBanner";
    game_entry_form.className = "scrollMenu";
    game_entry_form.appendChild(game_entry_div);

    // Creates login form to hold username and password divs
    var game_history_form = document.createElement("form");
    game_history_form.id = "historyBanner";
    game_history_form.className = "scrollMenu";
    game_history_form.appendChild(game_history_div);

    // Injecting login form into existing html
    var scene_html = document.getElementById("sceneHTML");
    scene_html.appendChild(game_entry_form);
    scene_html.appendChild(game_history_form);

    if (play_tutorial) {
      scene_html.appendChild(tutorial_div);
    }

}

function visibleForm(visible) {

  if(visible) {
		var scene_html = document.getElementById("sceneHTML");
		scene_html.hidden = false;
  } else {
		var scene_html = document.getElementById("sceneHTML");
		scene_html.hidden = true;
  }

}

//Loadbar for loading screen
function loading(evt){
  var progbar = document.getElementById("progressBar");
  var perctext = document.getElementById("percentText");
  progressBar.hidden= false;
  progressBackground.hidden = false;
  ldBg.hidden = false;
  progbar.style.width = preload.progress * 100 + '%';
  perctext.innerHTML = (Math.floor(preload.progress * 100)).toString() + '%';
  if(preload.progress * 100  >= 100)
  {
	  progressBar.hidden = true;
	  progressBackground.hidden = true;
	  ldBg.hidden = true;
  }
}



function resetLevel() {

	history_list = [];
	hide_knight = false;
	hide_archer1 = false;
	hide_archer2 = false;
	hide_archer3 = false;
	hide_archer4 = false;
	hit_counter = 0;
	miss_upper_counter = 0;
	miss_lower_counter = 0;

}

function pauseAnimation(paused) {

	henchman_left.paused = paused;
	henchman_left_center.paused = paused;
	boss.paused = paused;
	henchman_right.paused = paused;
	henchman_right_center.paused = paused;
	projectile.paused = paused;

  if(paused){

		structure_center.paused = true;
		structure_left_center.paused = true;
		structure_right_center.paused = true;
		structure_left.paused = true;
		structure_right.paused = true;
		firework_low.paused = true;
    firework_hit.paused = true;
    firework_high.paused = true;
		catapult.paused = true;

  } else {

		if(structure_center.currentFrame != 0 && structure_center.currentFrame != 11)
	    structure_center.paused = false;

		if(structure_left_center.currentFrame != 0 && structure_left_center.currentFrame != 11)
	    structure_left_center.paused = false;

		if(structure_right_center.currentFrame != 0 && structure_right_center.currentFrame != 11)
	    structure_right_center.paused = false;

		if(structure_left.currentFrame != 0 && structure_left.currentFrame != 11)
	    structure_left.paused = false;

		if(structure_right.currentFrame != 0 && structure_right.currentFrame != 11)
	    structure_right.paused = false;

		if(catapult.currentFrame != 0 && catapult.currentFrame != 11)
			catapult.paused = false;

		if(firework_low.currentFrame != 0 && firework_low.currentFrame != 11)
	    firework_low.paused = false;

		if(firework_hit.currentFrame != 0 && firework_hit.currentFrame != 11)
	    firework_hit.paused = false;

		if(firework_high.currentFrame != 0 && firework_high.currentFrame != 11)
	    firework_high.paused = false;

  }

}

function visibleButton(visible) {

  if(visible) {

		menu_button.visible = false;
		pause_menu.visible = true;
		close_button.visible = true;
		main_menu_button.visible = true;
		exit_level_button.visible = true;
		settings_button.visible = true;
		previous_indicator.visible = true;
		pause_indicator.visible = true;
		next_indicator.visible = true;
		lute.visible = true;
		//antiLute.visible = true;
		hint_button.visible = true;

  } else {

		menu_button.visible = true;
		pause_menu.visible = false;
		close_button.visible = false;
		main_menu_button.visible = false;
		exit_level_button.visible = false;
		settings_button.visible = false;
		previous_indicator.visible = false;
		pause_indicator.visible = false;
		next_indicator.visible = false;
		lute.visible = false;
		//antiLute.visible = false;
		hint_button.visible = false;

  }

}

// function runGame(renderingCanvas) {
//
//   var canvas = document.getElementById('renderCanvas');                   // get the canvas DOM element context
//   var engine = new BABYLON.Engine(canvas, true);                          // load the babylon.js engine
//
//
//   var current = null;
//   var message = {
//     render: 0,
//     music_pause: false,
//     volume: 1,
//     current_user: "admin"
//   };                                                                      // possible message passing system???
//
//   var current_scene = createLogin(engine, canvas, message, database);
//   var music = createMusic(engine, canvas, message, database);
//
//   engine.runRenderLoop( function() {                                      // run the render loop function
//     console.log("loop");
//     if (current != message.render) {
//       console.log(message.render + " : " + current)
//       current = message.render;
//       current_scene.dispose();
//       switch(current) {                                                   // scene rendering switcher
//         case 0:
//           current_scene = createLogin(engine, canvas, message, database);
//           break;
//         case 1:
//           current_scene = createMenu(engine, canvas, message, database);
//           break;
//         case 2:
//           current_scene = createGame(engine, canvas, message, database);
//           break;
//         case 3:
//           current_scene = createStats(engine, canvas, message, database);
//           break;
//         case 4:
//           current_scene = createHow2Play(engine, canvas, message, database);
//           break;
//         case 5:
//           current_scene = createSettings(engine, canvas, message, database);
//           break;
//         case 6:
//           current_scene = createAccount(engine, canvas, message, database);
//           break;
//         case 7:
//           current_scene = createCreateAcc(engine, canvas, message, database);
//           break;
//         default:
//           current_scene = createLogin(engine, canvas, message, database);
//           break;
//       }
//       console.log(message.render + " :: " + current)
//     }
//
//     music.render();
//     current_scene.render();
//     current_scene.attachControl();
//
//   });
//
//   window.addEventListener('resize', function() {
//       engine.resize();
//   });                                                                     // the canvas/window resize event handler
//
// }
