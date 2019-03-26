const mongoose = require('mongoose');

const AccountSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true
  },
  lname: {
    type: String,
    required: true
  },
  uname: {
    type: String,
    required: true
  },
  pass: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Account = mongoose.model('Account', AccountSchema);

module.exports = Account;
