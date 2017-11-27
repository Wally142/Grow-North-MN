var express = require('express');
var router = express.Router();
var pool = require('../modules/pool.js');

router.get('/', function (req, res) {
    if(req.isAuthenticated()){
        pool.connect(function (error, client, done) {
            if (error) {
                console.log(error);
                res.sendStatus(404);
            } else {
                client.query("SELECT id, firstname, lastname, email, phone, company, title, involvement, howhelp, ecosystem, startdate, tags, mentor, mentee FROM prospects WHERE approved = true", function (queryErr, resultObj) {
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
    }else{
        res.sendStatus(403);
    }
});// end  GET directory

router.get('/unapproved', function (req, res) {
    if (req.isAuthenticated()){
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
                        res.send(resultObj.rows);
                    }
                });
            }
        });
    }else{
        res.sendStatus(403);
    }
});// end  GET unapproved

router.delete('/unapproved/:id', function (req, res) {
    if (req.isAuthenticated()){
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
    }else{
        res.sendStatus(403);
    }
});// end  DELETE unapproved

router.put('/unapproved/:id', function(req, res){
    if (req.isAuthenticated()){
        var dbId = req.params.id;
        var approved = req.body.approved;
        var newApproval = false;
        if (approved === false) {
            newApproval = true;
        } 
        
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
    }else{
        res.sendStatus(403);
    }
}); // end UPDATE unapproved

module.exports = router;