const request = require('request');
const geoip = require('geoip-lite');

const apiKey = 'ee9f261ae90f3df01977355cbe7ceb6c';

module.exports = {
  getWeatherPage: (req, res) => {
    // find geo location by ip
    const city = geoip.lookup(req.ip).city;
    console.log(city);
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    request(url, function (err, response, body) {
      if(err){
        res.render('weather', {weather: null, error: null});
      } else {
        const weather = JSON.parse(body);
        if(weather.main === undefined){
          res.render('weather', {weather: null, error: null});
        } else {
          const weatherText = `You are probably in ${weather.name} and it's ${weather.main.temp} degrees in your city!`;
          res.render('weather', {weather: weatherText, error: null});
        }
      }
    });
  },

  queryWeather: (req, res) => {
    const city = req.body.city;
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    request(url, function (err, response, body) {
      if(err){
        res.render('weather', {weather: null, error: 'Error, please try again'});
      } else {
        const weather = JSON.parse(body);
        if(weather.main === undefined){
          res.render('weather', {weather: null, error: 'Error, please try again'});
        } else {
          const weatherText = `It's ${weather.main.temp} degrees in ${weather.name}. Have a nice day!`;
          res.render('weather', {weather: weatherText, error: null});
        }
      }
    });
  },
};
