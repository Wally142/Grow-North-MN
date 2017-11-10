var express = require('express');
var router = express.Router();
var pool = require('../modules/pool.js');

router.get('/mentors', function (req, res) {
    if (req.isAuthenticated()){
        console.log('get Mentors');
        pool.connect(function (error, client, done) {
            if (error) {
                console.log(error);
                res.sendStatus(404);
            } else {
                client.query("SELECT * FROM prospects WHERE mentor = true;", function (queryErr, resultObj) {
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
    }else{
        res.sendStatus(403);
    }
});// end  GET mentors

router.get('/mentees', function (req, res) {
    if (req.isAuthenticated()){
        console.log('get Mentees');
        pool.connect(function (error, client, done) {
            if (error) {
                console.log(error);
                res.sendStatus(404);
            } else {
                client.query("SELECT * FROM prospects WHERE mentee = true;", function (queryErr, resultObj) {
                    done();
                    if (queryErr) {
                        console.log(queryErr)
                        res.sendStatus(500);
                    } else {
                        console.log("mentEE", resultObj.rows);
                        res.send(resultObj.rows);
                    }
                });
            }
        });
    }else{
        res.sendStatus(403);
    }
});// end Get mentees

router.get('/connections', function (req, res) {
    if (req.isAuthenticated()){
        console.log('get connections');
        pool.connect(function (error, client, done) {
            if (error) {
                console.log(error);
                res.sendStatus(404);
            } else {
                client.query("SELECT * FROM connections;", function (queryErr, resultObj) {
                    done();
                    if (queryErr) {
                        console.log(queryErr)
                        res.sendStatus(500);
                    } else {
                        console.log("connections", resultObj.rows);
                        res.send(resultObj.rows);
                    }
                });
            }
        });
    }else{
        res.sendStatus(403);
    }
});// end Get connections


module.exports = router;