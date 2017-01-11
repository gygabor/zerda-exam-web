'use strict';

var mysql = require('mysql');
var express = require('express');
var bodyParser = require('body-parser');
var validator = require('./validator.js');
var app = express();

var errorResponse = {
  "status": "error",
  "message": "thank you"
};

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

app.post('/exam', urlencodedParser, function a(req, res) {
  var validation = (validator.validation(req.body.feedback, req.body.scale, req.body.email));
  if (validation) {
    connection.query('SELECT project_name FROM projects;', function(err, rows, fields){
      if (err) throw err;
      var response = {
        "status": "ok",
        "projects": []
      };
      rows.forEach( function(row) {
      response.projects.push(row.project_name);
      });
      res.send(response);
    });
  } else {
    var response = {
      "status": "error",
      "message": "thank you"
    }
  res.send(response);
  }
});

app.listen(3000);
