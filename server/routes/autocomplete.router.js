var express = require('express');
var router = express.Router();
var pool = require('../modules/pool.js');

router.get('/', function (req, res) {
    pool.connect(function (error, client, done) {
        if (error) {
            console.log(error);
            res.sendStatus(404);
        } else {
            client.query("SELECT id, firstname, lastname, email, phone, startdate, company, ecosystem FROM prospects WHERE approved = true", function (queryErr, resultObj) {
                done();
                if (queryErr) {
                    console.log(queryErr);
                    res.sendStatus(500);
                } else {
                    res.send(resultObj.rows);
                }
            });
        }
    });
}); // end GET search directory

module.exports = router;