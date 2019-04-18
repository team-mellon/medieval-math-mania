////////////////////////////////////////////////////////////////////////////////
// APIHANDLER                                                                 //
////////////////////////////////////////////////////////////////////////////////
// Handler for async API calls. This encompasses database request like        //
// creating a user, getting a user's data, verifying a user, updating a       //
// database entry, and sigming out a user.                                    //
////////////////////////////////////////////////////////////////////////////////

// Import the actual API calls (not async)
import StatService from '../StatService.js';
import LoginService from '../LoginService.js';

class APIHandler {

  // Function that creates a user
  static async createUser(text, user) {

    try {

      await LoginService.registerUser(text, user);

    } catch (err) {

      this.error = err.message;
      console.log(this.error);

    }

    try {

      let stats = await StatService.findUserStats(text.uname);
      console.log(stats.data);
      user.hits = stats.data.hits;
      user.highs = stats.data.highs;
      user.lows = stats.data.lows;
      user.badges = stats.data.badges;

    } catch (err) {

      this.error = err.message;
      console.log(this.error);

    }

  }

  // Function that gets data from a specific user entry
  static async getUserData(text, user) {

    try {

      let stats = await StatService.findUserAccount(text);
      console.log(stats.data);
      user.username = stats.data.uname;
      user.firstname = stats.data.fname;
      user.lastname = stats.data.lname;

    } catch (err) {

      this.error = err.message;
      console.log(this.error);

    }

    try {

      let stats = await StatService.findUserStats(text);
      console.log(stats.data);
      user.hits = stats.data.hits;
      user.highs = stats.data.highs;
      user.lows = stats.data.lows;
      user.badges = stats.data.badges;

    } catch (err) {

      this.error = err.message;
      console.log(this.error);

    }

  }

  // Function that verifies a user and logs that user in if it exists
  static async verifyUser(text, user) {

    try {

      await LoginService.loginUser(text, user);
      console.log(user.authenticated);
      // user = await LoginService.loginUser(text);
      console.log("User: " + user.username);

    } catch (err) {

      this.error = err.message;
      console.log(this.error);

    }

    try {

      let stats = await StatService.findUserStats(text.uname);
      console.log(stats.data);
      user.hits = stats.data.hits;
      user.highs = stats.data.highs;
      user.lows = stats.data.lows;
      user.badges = stats.data.badges;

    } catch (err) {

      this.error = err.message;
      console.log(this.error);

    }

    // if (user.authenticated) {
    //   this.changeScene(2);
    // }

    try {

      this.posts = await LoginService.getUsers();

    } catch (err) {

      this.error = err.message;
      console.log(this.error);

    }

  }

  // Function that updates a users stats
  static async updateStats(text, user) {

    try {

      let stats = await StatService.updateUserStats(text);
      console.log(stats.data);
      user.hits = stats.data.hits;
      user.highs = stats.data.highs;
      user.lows = stats.data.lows;
      user.badges = stats.data.badges;

    } catch (err) {

      this.error = err.message;
      console.log(this.error);

    }

  }

  // Function singns he current user out
  static async signoutUser() {

    try {

      await LoginService.logoutUser();

    } catch (err) {

      this.error = err.message;
      console.log(this.error);

    }

  }

}

export default APIHandler;
