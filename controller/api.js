var mongoose = require('mongoose');
var db = require('../mongoose/connection');
var orbDetail = require('../models/orbPackage');
var bluebird = require('bluebird');
var Promise = require('bluebird');
mongoose.Promise = require('bluebird');
Promise.promisifyAll(mongoose);

var roster = require('../models/roster');

module.exports = {
  orbDrop: function(req, res, next){
    console.log('[ API ] simLootBox for orb type ' + req.body.orbtype);

    Promise.props({
        //get all orb prizes for center pillar
        orb: orbDetail.find({"orbtype": req.body.orbtype, "pillar": 2}).lean().execAsync()
    }).then(function(results){
     //call loot box simulator
     let drop = simLootBox(results.orb);

     //return results
     res.locals.results = drop;
     res.locals.results.BGPosition = roster.getBGPosition(drop.char);
     next();
    }).catch(function (err) {
               console.error(err);
           })
    .catch(next);
  }
};

function simLootBox(prizes){
  //sum weights
  let sumWeight = 0.0;
  for(let i = 0; i < prizes.length; i++)
  {
    sumWeight += prizes[i].prob;
  }
  let min = 1.0; //just in case we need to change it later
  // Returns a random integer between 1 (include) and maxWeight (include)
  //borrowed code: https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
  let random = Math.floor(Math.random() * (sumWeight - min + 1.0)) + min;

  //console.log('[ simulator ] orb sum weight: ' + sumWeight);

  //for each probability in orbType
  for(let i = 0; i < prizes.length; i++)
  {
    // console.log('[ simulator ] random roll: ' + random);
    // console.log('[ simulator ] current prize slot probability: ' + prizes[i].prob);

    random -= prizes[i].prob;
    //if random <= 0, select this drop
    if(random <= 0){
      console.log('[ simulator ] Prize: ' + prizes[i].char + ', Amount: ' + prizes[i].amt + ', %: ' + prizes[i].prob);
      return prizes[i];
    }
  }
};
