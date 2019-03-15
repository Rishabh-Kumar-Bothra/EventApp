var express = require('express');
var router = express.Router();

router.get('/events', function(req, res){
    res.render('events');
});

module.exports = router;