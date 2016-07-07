var express = require('express');
var logger = require('winston');
var router = express.Router();

var redmine = require('../public/redmine.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Redmine : Timesheet Entry' });
});
/* GET Daily input */
router.get('/daily', function(req, res, next) {
  
   redmine.redmine_getProjects(function(data, textStatus, jqXHR) {
        data.projects.sort(function compare(a, b) {
            return (a.name.localeCompare(b.name));
        });
        for (var i = 0; i < data.projects.length; ++i) {
            var project = data.projects[i];
            logger.info(project);
        }
    });
  
  
  
  res.render('daily', { title: 'Daily timesheet' });
});

/* GET Activity input */
router.get('/activity', function(req, res, next) {
  res.render('activity', { title: 'Activity report' });
});

/* GET Dashboard input */
router.get('/dashboard', function(req, res, next) {
  res.render('dashboard', { title: 'Dashboard' });
});


module.exports = router;
