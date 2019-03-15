var express = require('express');
var router = express.Router();

router.get('/events', function(req, res){
    res.render('events');
});

router.get('/', (req, res) => {
    Event.find({}, (err, result) => {
        if(err) throw err;
        // console.log(result); 

        const datachunks = [];
        const chunksize = 3;

        for(let i=0; i<result.length; i += chunksize){
            datachunks.push(result.slice(i,i+chunksize));
        };
        console.log(datachunks);
        res.render('event', { result: datachunks});
    })
    // res.render('events', { data: data})
});

module.exports = router;