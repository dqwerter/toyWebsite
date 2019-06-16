const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const apiKey = 'ee9f261ae90f3df01977355cbe7ceb6c';
const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  res.render('index', {nameAlert: null});
});

app.post('/', function (req, res) {
  const name = req.body.name;

});

app.get('/weather', function (req, res) {
  res.render('weather', {weather: null, error: null});
});

app.post('/weather', function (req, res) {
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
});

app.get('/kNOwhere.html', function (req, res) {
  res.sendFile('/kNOwhere.html');
});

app.listen(80, function () {
  console.log('Server running at port 80')
});
