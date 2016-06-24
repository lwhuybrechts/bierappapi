var mongoose = require('mongoose');

var beerSchema = mongoose.Schema({
    name: String,
    brewery: String,
    style: String,
    substyle: String
});

module.exports = mongoose.model('Beer', beerSchema);