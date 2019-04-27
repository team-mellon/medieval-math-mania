////////////////////////////////////////////////////////////////////////////////
// APIHANDLER                                                                 //
////////////////////////////////////////////////////////////////////////////////
// Handler for async API calls. This encompasses database request like        //
// creating a user, getting a user's data, verifying a user, updating a       //
// database entry, and sigming out a user.                                    //
////////////////////////////////////////////////////////////////////////////////

// Import the actual API calls (not async)
import StatService from '../services/StatService.js';
import LoginService from '../services/LoginService.js';

class APIHandler {

  // Function that creates a user
  static async createUser(text, user, async) {

    try {

      // Runs an async axios call to signup a user
      await LoginService.registerUser(text, user);

    } catch (err) {

      async.error = err.message;
      console.log(async.error);

    }

    try {

      // Runs an async axios call to find a user and return stats
      let stats = await StatService.findUserStats(text.uname);
      // console.log(stats.data);

      // Assign the stats to local variables
      user.hits = stats.data.hits;
      user.highs = stats.data.highs;
      user.lows = stats.data.lows;
      user.badges = stats.data.badges;

    } catch (err) {

      async.error = err.message;
      console.log(async.error);

    }

  }

  // Function that gets data from a specific user entry
  static async getUserAccount(text, user, async) {

    try {

      // Runs an async axios call to find a user and return account data
      let stats = await StatService.findUserAccount(text);
      // console.log(stats.data);

      // Assign the account data
      user.username = stats.data.uname;
      user.firstname = stats.data.fname;
      user.lastname = stats.data.lname;

    } catch (err) {

      async.error = err.message;
      console.log(async.error);

    }

  }

  // Function that gets data from a specific user entry
  static async getUserData(text, user, async) {

    try {

      // Runs an async axios call to find a user and return account data
      let stats = await StatService.findUserAccount(text);
      // console.log(stats.data);

      // Assign the account data
      user.username = stats.data.uname;
      user.firstname = stats.data.fname;
      user.lastname = stats.data.lname;

    } catch (err) {

      async.error = err.message;
      console.log(async.error);

    }

    try {

      // Runs an async axios call to find a user and return stats
      let stats = await StatService.findUserStats(text.uname);
      // console.log(stats.data);

      // Assign the stats to local variables
      user.hits = stats.data.hits;
      user.highs = stats.data.highs;
      user.lows = stats.data.lows;
      user.badges = stats.data.badges;

    } catch (err) {

      async.error = err.message;
      console.log(async.error);

    }

  }

  // Function that verifies a user and logs that user in if it exists
  static async verifyUser(text, user, async) {

    try {

      // Runs an async axios call to log in a user
      await LoginService.loginUser(text, user);
      console.log(user.authenticated);
      // user = await LoginService.loginUser(text);
      console.log("User: " + user.username);

    } catch (err) {

      async.error = err.message;
      console.log(async.error);

    }

    try {

      // Runs an async axios call to find a user and return stats
      let stats = await StatService.findUserStats(text.uname);
      // console.log(stats.data);

      // Assign the stats to local variables
      user.hits = stats.data.hits;
      user.highs = stats.data.highs;
      user.lows = stats.data.lows;
      user.badges = stats.data.badges;

    } catch (err) {

      async.error = err.message;
      console.log(async.error);

    }

    // if (user.authenticated) {
    //   this.changeScene(2);
    // }

    // try {
    //
    //   this.posts = await LoginService.getUsers();
    //
    // } catch (err) {
    //
    //   async.error = err.message;
    //   console.log(async.error);
    //
    // }

  }

  // Function that updates a users stats
  static async updateStats(text, user, async) {

    try {

      // Runs an async axios call to find a user and update stats
      let stats = await StatService.updateUserStats(text);
      // console.log(stats.data);

      // Assign the stats to local variables
      user.hits = stats.data.hits;
      user.highs = stats.data.highs;
      user.lows = stats.data.lows;
      user.badges = stats.data.badges;

    } catch (err) {

      async.error = err.message;
      console.log(async.error);

    }

  }

  // Function singns he current user out
  static async signoutUser(async) {

    try {

      // Runs an async axios call to log out a user
      await LoginService.logoutUser();

    } catch (err) {

      async.error = err.message;
      console.log(async.error);

    }

  }

}

export default APIHandler;
