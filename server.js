var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/toilet_api');

var UsingStatus = require('./app/models/using_status');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 3000;

var router = express.Router();

router.use(function(req, res, next) {
  console.log('Something is happened.');
  next();
});

router.get('/', function(req, res) {
  res.json({ message: 'Successfully Posted a test message.'});
});

router.route('/using_status')

  .post(function(req, res) {

    var using_status = new UsingStatus();

    using_status.flag = req.body.flag;
    using_status.date = req.body.date;

    using_status.save(function(err) {
      if (err) {
        res.send(err);
      }
      res.json({ message: 'Status created.'});
    });
  })

  .get(function(req, res){
    UsingStatus.findOne({}, {}, {sort: {'date': -1}}, function(err, status) {
    if(err) {
      res.send(err);
    }
    res.json(status);
  });
});

app.use('/api', router);

app.listen(port);
console.log('listen on port ' + port);
