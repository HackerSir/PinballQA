var express = require('express');
var router = express.Router();
var socket = require('../socket.js');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: '彈珠台黑客社'});
});

router.post('/fire', function(req, res, next) {
    socket.fireQA();
    res.send('OK');
});

module.exports = router;
