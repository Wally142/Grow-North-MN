var express = require('express');
var router = express.Router();
var pool = require('../modules/pool.js');

// GET individual profile:
router.get('/:id', function (req, res) {
    if (req.isAuthenticated()){
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
                        console.log(queryErr);
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
});// end  GET profile

// GET all of an individual's connections:
router.get('/connections/:id', function (req, res) {
    if (req.isAuthenticated()){
        var dbId= req.params.id;
        console.log('get Connections', dbId );
        pool.connect(function (error, client, done) {
            if (error) {
                console.log(error);
                res.sendStatus(404);
            } else {
                // SELECT connections.id, person2, person1, firstname, lastname, company, date, connections.comments FROM connections LEFT JOIN prospects ON connections.person2=prospects.id WHERE person1=33;
                client.query("SELECT connections.id, person2, person1, firstname, lastname, company, date, connections.comments FROM connections FULL JOIN prospects ON connections.person2=prospects.id OR connections.person1=prospects.id WHERE person1=$1 OR person2=$1", [dbId], function (queryErr, resultObj) {
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
    }else{
        res.sendStatus(403);
    }
});// end  GET profile

router.put('/:id', function (req, res) {
    if (req.isAuthenticated()){
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
    }else{
        res.sendStatus(403);
    }
}); // end UPDATE comments

router.put('/info/:id', function (req, res) {
    if (req.isAuthenticated()){
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
    }else{
        res.sendStatus(403);
    }
}); // end UPDATE comments

router.post('/connections', function (req, res) {
    console.log('in connections post', req.body);
    var connect = req.body;
    pool.connect(function (error, client, done) {
        if (error) {
            console.log(error);
            res.sendStatus(404);
        } else {
            var queryString = 'INSERT INTO connections (person1, person2) VALUES ($1, $2)';
            var items = [connect.person1, connect.person2];
            client.query(queryString, items, function (queryErr, resultObj) {
                done();
                if (queryErr) {
                    console.log(queryErr);
                    res.sendStatus(500);
                } else {

                    res.sendStatus(201);
                }
            });
        }
    });

}); //end post connection

router.put('/tags/:id', function (req, res) {
    console.log('in tags PUT req for id and body: ', req.params.id, req.body);
    var dbId = req.params.id;
    var item = req.body.tags;
    pool.connect(function (error, client, done) {
        if (error) {
            console.log(error);
            res.sendStatus(404);
        } else {
            var queryString = "UPDATE prospects SET tags = $2 WHERE id = $1";
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

router.delete('/connections/:id', function (req, res) {
    if (req.isAuthenticated()){
        console.log('delete Connections with ', req.params.id);
        var connectionId = req.params.id;
        
        pool.connect(function (error, client, done) {
            if (error) {
                console.log(error);
                res.sendStatus(404);
            } else {
                client.query("DELETE FROM connections WHERE connections.id = $1;", [connectionId], function (queryErr, resultObj) {
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
    }
});// end DELETE connection


router.put('/connections/:id', function (req, res) {
    if (req.isAuthenticated()){
        console.log('in updateConnectionComments with', req.params.id);
        var dbId = req.params.id;
        var comment = req.body.comments;
    
        console.log('connection comments', dbId, comment);
    
        pool.connect(function (error, client, done) {
            if (error) {
                console.log(error);
                res.sendStatus(404);
            } else {
                var queryString = "UPDATE connections SET comments = $2 WHERE id=$1";
                var values = [dbId, comment];
                client.query(queryString, values, function (queryErr, resultObj) {
                    if (queryErr) {
                        console.log('Query Error on PUT connection comment route', queryErr);
                        res.sendStatus(500);
                    } else {
                        res.sendStatus(202);
                    }
                    done();
                });
            }
        });
    }
}); // end UPDATE connection comments

// router.get('/commentsConnections/:id', function (req, res) {
//     if (req.isAuthenticated()){
//         var dbId = req.params.id;
        
//         console.log('get Connections comments');
//         pool.connect(function (error, client, done) {
//             if (error) {
//                 console.log(error);
//                 res.sendStatus(404);
//             } else {
//                 client.query("SELECT id, comments FROM connections WHERE id = $1;",[dbId], function (queryErr, resultObj) {
//                     done();
//                     if (queryErr) {
//                         console.log(queryErr);
//                         res.sendStatus(500);
//                     } else {
//                         console.log(resultObj.rows);
//                         res.send(resultObj.rows);
//                     }
//                 });
//             }
//         });
//      }
// });// end  GET profile

module.exports = router;