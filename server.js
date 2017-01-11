var mysql = require('mysql');
var express = require('express');
var bodyParser = require('body-parser');
var decoder = require('./decoder.js');
var app = express();

app.use(bodyParser.json());
app.use(express.static('client'));


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


var urlencodedParser = bodyParser.urlencoded({ extended: false });

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'cookies',
  database: 'secretprojects'
});

connection.connect(function (error){
  if (error) {
    console.log('Server doesn\'t response', error);
    console.end;
  } else {
    console.log ('Server working!');
  }
});

app.listen(3000);
