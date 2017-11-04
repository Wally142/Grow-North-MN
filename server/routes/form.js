var express = require('express');
var router = express.Router();
var pool = require('../modules/pool.js');

router.post('/form', function (req, res) {
    console.log('in router post', req.body);
    var grow = req.body;
    pool.connect(function (error, client, done) {
        if (error) {
            console.log(error);
            res.sendStatus(404);
        } else {
            var queryString = 'INSERT INTO prospects (firstname, lastname, email, phone, company, image, title, heard, permission, mentor, mentee, involvement, howhelp, experience, struggle, ecosystem, employees, revenue, distributing, story) VALUES ($1, $2, $3, $4, $5, $6 , $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20);';
            var items = [grow.firstname, grow.lastname, grow.email, grow.phone, grow.company, grow.image, grow.title, grow.heard, grow.permission, grow.mentor, grow.mentee, grow.involvement, grow.howhelp, grow.experience, grow.struggle, grow.ecosystem, grow.employees, grow.revenue, grow.distributing, grow.story];
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