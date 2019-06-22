var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var orbDetail = require('../models/orbPackage');
var api = require("../controller/api");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'MARVEL STRIKE FORCE Orb Opening Simulator' });
});

/*Test POST on main page*/
router.post('/', api.orbDrop, function(req, res, next){
  res.status(200).send({ status: 'success', prize: res.locals.results});
});

module.exports = router;
