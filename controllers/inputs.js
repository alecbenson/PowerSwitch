var express = require('express');
var router = express.Router();
var winston = require('winston');
var bodyParser = require('body-parser');
var Input = require('../models/input');

//Get body-parser data
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

//Input page
router.get('/', function(req, res) {
  res.render('inputs', {title: 'Inputs'});
});

//Find all
router.get('/all', function(req, res) {
  var query = Input.find();
  query.exec(function (err, inputs) {
    if (err) {
      winston.log('error', 'Get inputs: ' + err);
      res.sendStatus(500);
    }
    res.json(inputs);
  });
});

//Find by ID
router.get('/single/:id', function(req, res) {
  var id = req.params.id;
  if (!id) {
    res.sendStatus(400); //You suck at requesting
  }
  //Query for a input with the given id
  var query = Input.findOne({'_id': id});
  query.exec(function (err, input) {
    if (err) {
      winston.log('error', 'Get input: ' + err);
      res.sendStatus(404); //Not found
    }
    //Send the input back
    res.json(input);
  });
});

//Delete by ID
router.delete('/:id', function(req, res) {
  var id = req.params.id;
  if (!id) {
    res.sendStatus(400); //You suck at requesting
  }
  //Query for a input with the given id
  var query = Input.findOne({'_id': id});
  query.remove().exec(function (err, input) {
    if (err) {
      winston.log('error', 'Remove input: ' + err);
      res.sendStatus(404); //Not found
    }
    res.sendStatus(204); //Deleted succesfully
  });
});

//Insert a new input
router.post('/', function (req, res) {
  winston.log('info', req.body);
  var input = new Input();
  input.name = req.body.name;
  input.description = req.body.description;
  input.requestType = req.body.requestType;
  input.url = req.body.url;
  input.apikey = req.body.apikey;

  //Save the input to the DB
  input.save(function (err) {
    if (err) {
      winston.log('error', 'Post new input: ' + err);
      res.send(err);
      return;
    }
    winston.log('info', 'Post new input: ' + 'success!');
    res.send({status: 201, response: 'Created'});
  });
});

module.exports = router;