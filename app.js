const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const mysql = require('mysql');
const path = require('path');

const port = 80;

const {getHomePage} = require('./routes/index');
const {adduserPage, adduser, deleteuser, edituser, edituserPage} = require('./routes/user');
const {manageUserPage} = require('./routes/manage-user');
const {getWeatherPage, queryWeather} = require('./routes/weather');
const {getKnowherePage, addComment} = require('./routes/knowhere');
const {getResumePage, getResumePageZhCN} = require('./routes/resume');
const {get404Page} = require('./routes/404');


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

app.get('/weather', getWeatherPage);
app.post('/weather', queryWeather);

app.get('/knowhere', getKnowherePage);
app.post('/knowhere', addComment);

app.get('/resume', getResumePage);
app.get('/resume-zh-CN', getResumePageZhCN);

app.get('/404', get404Page);

app.get('/user', manageUserPage);
app.get('/user/add', adduserPage);
app.get('/user/edit/:id', edituserPage);
app.get('/user/delete/:id', deleteuser);
app.post('/user/add', adduser);
app.post('/user/edit/:id', edituser);
app.get('/forU', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/resources/xd.m4a'));
});


app.get('/', function (req, res) {
  res.render('index', {nameAlert: null});
});

app.post('/', function (req, res) {
  const name = req.body.name;
});


// Start listening
app.listen(port, function () {
  console.log('Server running at port ' + port)
});
