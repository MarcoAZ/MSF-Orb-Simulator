var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var orbDetailSchema = new Schema({
                                orbtype: String,
                                char: String,
                                amt: Number,
                                prob: Number,
                                pillar: Number
                            });

var orbDetail = mongoose.model('orbDetail', orbDetailSchema, 'orbDetails');

module.exports = orbDetail;
