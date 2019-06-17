const request = require('request');

const apiKey = 'ee9f261ae90f3df01977355cbe7ceb6c';

module.exports = {
  // Weather part
  getWeatherPage: (req, res) => {
    res.render('weather', {weather: null, error: null});
  },

  queryWeather: (req, res) => {
    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    request(url, function (err, response, body) {
      if(err){
        res.render('weather', {weather: null, error: 'Error, please try again'});
      } else {
        let weather = JSON.parse(body);
        if(weather.main === undefined){
          res.render('weather', {weather: null, error: 'Error, please try again'});
        } else {
          let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}.`;
          res.render('weather', {weather: weatherText, error: null});
        }
      }
    });
  },
};