var config = require('../config');      // Load config file to get URL, username, password, etc

var mongoose = require('mongoose');     // Import the mongoose module

var options = {
    user:   config.mongo.username,
    pass:   config.mongo.password,
    useNewUrlParser: true
};
var uri = 'mongodb://' + config.ec2.public_ip + '/' + config.mongo.db + '?authSource=admin';

// Connect to the URL
mongoose.connect(uri, options);
mongoose.connection.on('error', console.error.bind(console, '[ DATABASE ] Connection :: Connection response: '));
mongoose.connection.once('open', function () {
    console.log('[ DATABASE ] Connection :: Successfully connected to the database: ' + config.mongo.db);
});

// Nothing needs to be exported, simply use:   require('<path>/mongoose')
module.exports = mongoose;
