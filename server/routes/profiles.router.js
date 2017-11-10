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
            client.query("SELECT * FROM prospects WHERE id = $1", [dbId], function (queryErr, resultObj) {
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

router.put('/:id', function (req, res) {
    console.log('in updateComments with', req.params.id);
    var dbId = req.params.id;
    var newComment = req.body.comments;
   
    console.log('comments' );

    pool.connect(function (error, client, done) {
        if (error) {
            console.log(error);
            res.sendStatus(404);
        } else {
            var queryString = "UPDATE prospects SET comments = $2 WHERE id=$1";
            var values = [dbId, newComment];
            client.query(queryString, values, function (queryErr, resultObj) {
                if (queryErr) {
                    console.log('Query Error on PUT comment route', queryErr);
                    res.sendStatus(500);
                } else {
                    res.sendStatus(202);
                }
                done();
            });
        }
    });
}); // end UPDATE comments

router.put('/info/:id', function (req, res) {
    console.log('in updateComments with', req.params.id);
    var dbId = req.params.id;
    var update = req.body.update;
    var item = req.body.item;


    console.log('comments', update, item);

    pool.connect(function (error, client, done) {
        if (error) {
            console.log(error);
            res.sendStatus(404);
        } else {
            var queryString = "UPDATE prospects SET " + update +  " = $2 WHERE id=$1";
            var values = [dbId, item];
            client.query(queryString, values, function (queryErr, resultObj) {
                if (queryErr) {
                    console.log('Query Error on PUT comment route', queryErr);
                    res.sendStatus(500);
                } else {
                    res.sendStatus(202);
                }
                done();
            });
        }
    });
}); // end UPDATE comments

module.exports = router;