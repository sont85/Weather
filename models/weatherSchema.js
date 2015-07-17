var mongoose = require('mongoose');

var weatherSchema = new mongoose.Schema({
  email: String,
  password: String,
  search: [{
    zipCode: [],
    forecast: []
  }]
});

var Weather = mongoose.model('weather', weatherSchema);

module.exports = Weather;
