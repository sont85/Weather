var mongoose = require('mongoose');

var weatherSchema = new mongoose.Schema({
  // search: [{
  //   zipCode: [],
  //   forecast: []
  // }]
});

var Weather = mongoose.model('weather', weatherSchema);

module.exports = Weather;
