var mongoose = require('mongoose');
var db = require('../mongoose/connection');
var OrbPackage = require('../models/orbPackage');
var bluebird = require('bluebird');
var Promise = require('bluebird');
mongoose.Promise = require('bluebird');
Promise.promisifyAll(mongoose);

module.exports = {
  simLootBox: function(orbType){
    //testing stuff here
    // Promise.props({
    //         orb: OrbPackage.find().lean().execAsync()
    // }).then(function(results){
    //   console.log('[ SIM TEST ] PACKAGE EXAMPLE: ' + results);
    // }).catch(function (err) {
    //             console.error(err);
    //         })
    // .catch(next);

    var results = OrbPackage.find({_id: ObjectId("5cd770dd52bb8f16e4bf19f1")}).lean().execAsync();
    console.log('[ SIM TEST ] PACKAGE EXAMPLE: ' + results.char);

    //get all in db of orbType in array, e.g. [{prob: 4.95, Amt: 5, Char: 'Falcon'}, {prob:...}]
    let prizes = [{prob: 75.0, amt: 5, char: 'Falcon'},
                  {prob: 5.0, amt: 5, char: 'Minn-Erva'},
                  {prob: 20.0, amt: 5, char: 'SS'}];
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
      //random -= probability
      console.log('[ simulator ] random roll: ' + random);
      console.log('[ simulator ] current prize slot probability: ' + prizes[i].prob);

      random -= prizes[i].prob;
      //if random <= 0, select this drop
      if(random <= 0){
        console.log('[ simulator ] Prize: ' + prizes[i].char + ', Amount: ' + prizes[i].amt + ', %: ' + prizes[i].prob);
        return prizes[i];
      }
    }
  }
};
