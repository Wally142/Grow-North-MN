var express = require('express');
var router = express.Router();
var pool = require('../modules/pool');
var encryptLib = require('../modules/encryption');

// Handles Ajax request for user information if user is authenticated
router.get('/', function(req, res) {
  console.log('get /user route');
  // check if logged in
  if(req.isAuthenticated()) {
    // send back user object from database
    console.log('logged in', req.user);
    var userInfo = {
      username : req.user.username
    };
    res.send(userInfo);
  } else {
    // failure best handled on the server. do redirect here.
    console.log('not logged in');
    // should probably be res.sendStatus(403) and handled client-side, esp if this is an AJAX request (which is likely with AngularJS)
    res.send(false);
  }
});

// clear all server session information about this user
router.get('/logout', function(req, res) {
  // Use passport's built-in method to log out the user
  console.log('Logged out');
  req.logOut();
  res.sendStatus(200);
});

router.put('/email', function(req, res){
  console.log('Updating email');
  if (req.isAuthenticated()){
    var email = req.body.email;
    var id = req.user.id;
    pool.connect(function(err, client, done){
      if (err){
        console.log('Error connecting:', err);
        res.sendStatus(500);
      }else{
        client.query('UPDATE users SET email = $1 WHERE id = $2', [email, id], function(err){
          done();
          if (err){
            console.log(err);
            res.sendStatus(500);
          }else{
            res.sendStatus(201);
          }
        })
      }
    })
  }else{
    res.sendStatus(403);
  }
});

router.put('/password', function(req, res){
  console.log('updating password');
  if (req.isAuthenticated()){
    var newPass = req.body.newPassword;
    var id = req.user.id;
    pool.connect(function(err, client, done){
      if (err){
        console.log('Error connecting:', err);
        res.sendStatus(500);
      }else{
        var encryptedPassword = encryptLib.encryptPassword(newPass);
        client.query('UPDATE users SET password = $1 WHERE id = $2', [encryptedPassword, id], function(err){
          done();
          if (err){
            console.log(err);
            res.sendStatus(500);
          }else{
            res.sendStatus(201);
          }
        })
      }
    })
  }else{
    res.sendStatus(403);
  }
})


module.exports = router;
