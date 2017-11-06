var express = require('express');
var router = express.Router();
var pool = require('../modules/pool.js');

router.get('/', function (req, res) {
    console.log('get Directory');
    pool.connect(function (error, client, done) {
        if (error) {
            console.log(error);
            res.sendStatus(404);
        } else {
            client.query("SELECT firstname, lastname, email, phone, startdate FROM prospects", function (queryErr, resultObj) {
                done();
                if (queryErr) {
                    console.log(queryErr);
                    res.sendStatus(500);
                } else {
                    console.log(resultObj.rows);
                    res.send(resultObj.rows);
                }
            });
        }
    });
});// end  GET mentors







module.exports = router;