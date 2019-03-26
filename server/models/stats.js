const mongoose = require('mongoose');

const StatsSchema = new mongoose.Schema({
  uname: {
    type: String,
    required: true
  },
  hits: {
    type: Number,
    default: 0
  },
  lows: {
    type: Number,
    default: 0
  },
  highs: {
    type: Number,
    default: 0
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Stats = mongoose.model('Stats', StatsSchema);

module.exports = Stats;
