//////////////////
// ASSETHANDLER //
//////////////////

import StatService from '../StatService.js';
import LoginService from '../LoginService.js';

class APIHandler {



  constructor() {

  }

  ///////////////////////
  // DATABASE REQUESTS //
  ///////////////////////

  static async createUser(text) {

    try {
      await LoginService.registerUser(text, this.user);
    } catch (err) {
      this.error = err.message;
      console.log(this.error);
    }

    try {
      let stats = await StatService.findUserStats(text.uname);
      console.log(stats.data);
      this.user.hits = stats.data.hits;
      this.user.highs = stats.data.highs;
      this.user.lows = stats.data.lows;
    } catch (err) {
      this.error = err.message;
      console.log(this.error);
    }

  }

  static async getUserData(text) {

    try {
      let stats = await StatService.findUserAccount(text);
      console.log(stats.data);
      this.user.username = stats.data.uname;
      this.user.firstname = stats.data.fname;
      this.user.lastname = stats.data.lname;
    } catch (err) {
      this.error = err.message;
      console.log(this.error);
    }

    try {
      let stats = await StatService.findUserStats(text);
      console.log(stats.data);
      this.user.hits = stats.data.hits;
      this.user.highs = stats.data.highs;
      this.user.lows = stats.data.lows;
    } catch (err) {
      this.error = err.message;
      console.log(this.error);
    }

  }

  static async verifyUser(text) {

    try {
      await LoginService.loginUser(text, this.user);
      console.log(this.user.authenticated);
      // this.user = await LoginService.loginUser(text);
      console.log("User: " + this.user.username);
    } catch (err) {
      this.error = err.message;
      console.log(this.error);
    }

    try {
      let stats = await StatService.findUserStats(text.uname);
      console.log(stats.data);
      this.user.hits = stats.data.hits;
      this.user.highs = stats.data.highs;
      this.user.lows = stats.data.lows;
    } catch (err) {
      this.error = err.message;
      console.log(this.error);
    }

    // if (this.user.authenticated) {
    //   this.changeScene(2);
    // }

    try {
      this.posts = await LoginService.getUsers();
    } catch (err) {
      this.error = err.message;
      console.log(this.error);
    }

  }

  static async updateStats(text) {

    try {
      let stats = await StatService.updateUserStats(text);
      console.log(stats.data);
      this.user.hits = stats.data.hits;
      this.user.highs = stats.data.highs;
      this.user.lows = stats.data.lows;
    } catch (err) {
      this.error = err.message;
      console.log(this.error);
    }

  }

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
