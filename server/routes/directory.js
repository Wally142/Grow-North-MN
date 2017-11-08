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
            client.query("SELECT id, firstname, lastname, email, phone, startdate, mentor, mentee FROM prospects WHERE approved = true", function (queryErr, resultObj) {
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
});// end  GET directory

router.get('/unapproved', function (req, res) {
    console.log('get Directory');
    pool.connect(function (error, client, done) {
        if (error) {
            console.log(error);
            res.sendStatus(404);
        } else {
            client.query("SELECT id, firstname, lastname, email, phone, startdate, approved FROM prospects WHERE approved = false", function (queryErr, resultObj) {
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
});// end  GET unapproved

router.delete('/unapproved/:id', function (req, res) {
    console.log('get Directory with ', req.params.id);
    var dbId = req.params.id;
    pool.connect(function (error, client, done) {
        if (error) {
            console.log(error);
            res.sendStatus(404);
        } else {
            client.query("DELETE FROM prospects WHERE id=$1", [dbId], function (queryErr, resultObj) {
                done();
                if (queryErr) {
                    console.log(queryErr);
                    res.sendStatus(500);
                } else {
                    res.sendStatus(202);
                }
            });
        }
    });
});// end  DELETE unapproved

router.put('/unapproved/:id', function(req, res){
    console.log('in updateApproval with', req.params.id);
    var dbId = req.params.id;
    var approved = req.body.approved;
    var newApproval = false;
    if (approved === false) {
        newApproval = true;
    } 
    console.log('new stuff', newApproval);
    
    pool.connect(function (error, client, done) {
        if (error) {
            console.log(error);
            res.sendStatus(404);
        } else {
            var queryString = "UPDATE prospects SET approved=$2 WHERE id=$1";
            var values = [dbId, newApproval];
            client.query(queryString, values, function(queryErr, resultObj) {
                if (queryErr) {
                    console.log('Query Error on PUT route', queryErr);
                    res.sendStatus(500);
                } else {
                    res.sendStatus(201);
                }
                done();
            });
        }
        });
}); // end UPDATE unapproved




module.exports = router;