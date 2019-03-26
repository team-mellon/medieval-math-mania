var passport = require('passport');
var express = require('express');
const mongodb = require('mongodb');
const bcrypt = require('bcryptjs');
const db = require('../../config/keys').mongoURI;
var Stats = require("../../models/stats");

const router = express.Router();

// Get Users
router.get('/', async (req, res) => {

  const stats = await loadStatsCollection();
  res.send(await stats.find({}).toArray());

});

// Find User Stats
router.post('/find', async (req, res) => {

  Stats.findOne({
    uname: req.body.uname
  }).then(stat => {
    console.log(stat);
    if (!stat) {
      console.log("User not found");
    } else {
      console.log(stat);
      res.send(stat);
    }
  });

});

// Update User Stats
router.post('/update', async (req, res) => {

  console.log(req.body);

  const doc = await Stats.findOne({ uname: req.body.user });
  doc.hits = req.body.hits;
  doc.highs = req.body.highs;
  doc.lows = req.body.lows;
  await doc.save();

});

async function loadStatsCollection() {

  const client = await mongodb.MongoClient.connect( db, { useNewUrlParser: true } );

  return client.db('test').collection('stats');

};

module.exports = router;
