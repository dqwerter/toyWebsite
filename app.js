const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const request = require('request');
const mysql = require('mysql');
const path = require('path');
const geoip = require('geoip-lite');

const apiKey = 'ee9f261ae90f3df01977355cbe7ceb6c';
const port = 80;


const {getHomePage} = require('./routes/index');
const {adduserPage, adduser, deleteuser, edituser, edituserPage} = require('./routes/user');

app.set('port', process.env.port || port); // set express to use this port
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs'); // configure template engine
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
app.use(fileUpload()); // configure fileupload


// database connection
const db = mysql.createConnection ({
  host: "localhost",
  user: "root",
  password: "qinzhao11",
  database: 'website_database'
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to database');
});
global.db = db;


// routes for the app
app.get('/', getHomePage);
app.get('/add', adduserPage);
app.get('/edit/:id', edituserPage);
app.get('/delete/:id', deleteuser);
app.post('/add', adduser);
app.post('/edit/:id', edituser);


app.get('/', function (req, res) {
  res.render('index', {nameAlert: null});
});

app.post('/', function (req, res) {
  const name = req.body.name;
});


// demo
// find geo location by ip
// const geoInfo = geoip.pretty(req.ip);





















// Weather part
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


// KNOwhere
app.get('/kNOwhere.html', function (req, res) {
  res.sendFile('/kNOwhere.html');
});


// Start listening
app.listen(port, function () {
  console.log('Server running at port ' + port)
});
