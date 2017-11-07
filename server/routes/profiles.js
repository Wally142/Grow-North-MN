var express = require('express');
var router = express.Router();
var pool = require('../modules/pool.js');

router.get('/:id', function (req, res) {
    var dbId= req.params.id;
    console.log('get Profile', dbId );
    pool.connect(function (error, client, done) {
        if (error) {
            console.log(error);
            res.sendStatus(404);
        } else {
            client.query("SELECT * FROM prospects WHERE approved = true AND id = $1", [dbId], function (queryErr, resultObj) {
                done();
                if (queryErr) {
                    console.log(queryErr)
                    res.sendStatus(500);
                } else {
                    console.log(resultObj.rows);
                    res.send(resultObj.rows);
                }
            });
        }
    });
});// end  GET profile