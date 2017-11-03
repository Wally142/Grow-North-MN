var express = require('express');
var router = express.Router();
var pool = require('../modules/pool.js');

router.post('/form', function (req, res) {
    console.log('in router post', req.body);
    var mentor = req.body;
    pool.connect(function (error, client, done) {
        if (error) {
            console.log(error);
            res.sendStatus(404);
        } else {
            var queryString = 'INSERT INTO prospects (firstname, lastname, email, phone, company, image,heard) VALUES ($1, $2, $3, $4, $5, $6 , $7);';
            var items = [mentor.firstname, mentor.lastname, mentor.email, mentor.phone, mentor.company, mentor.image, mentor.heard];
            client.query(queryString, items, function (queryErr, resultObj) {
                done();
                if (queryErr) {
                    console.log(queryErr)
                    res.sendStatus(500);
                } else {

                    res.sendStatus(201);
                }
            });
        }
    })

}); //end post route

module.exports = router;