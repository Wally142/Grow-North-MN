var express = require('express');
var router = express.Router();
var pool = require('../modules/pool.js');

router.get('/mentors', function (req, res) {
    if (req.isAuthenticated()){
        pool.connect(function (error, client, done) {
            if (error) {
                console.log(error);
                res.sendStatus(404);
            } else {
                client.query("SELECT * FROM prospects WHERE mentor = true and approved = true;", function (queryErr, resultObj) {
                    done();
                    if (queryErr) {
                        console.log(queryErr)
                        res.sendStatus(500);
                    } else {
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
        pool.connect(function (error, client, done) {
            if (error) {
                console.log(error);
                res.sendStatus(404);
            } else {
                client.query("SELECT * FROM prospects WHERE mentee = true and approved = true;", function (queryErr, resultObj) {
                    done();
                    if (queryErr) {
                        console.log(queryErr)
                        res.sendStatus(500);
                    } else {
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