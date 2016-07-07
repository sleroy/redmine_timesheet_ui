var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Redmine : Timesheet Entry' });
});
/* GET Daily input */
router.get('/', function(req, res, next) {
  res.render('daily', { title: 'Daily timesheet' });
});

/* GET Activity input */
router.get('/', function(req, res, next) {
  res.render('daily', { title: 'Daily timesheet' });
});

/* GET Dashboard input */
router.get('/', function(req, res, next) {
  res.render('dashboard', { title: 'Dashboard' });
});

module.exports = router;
