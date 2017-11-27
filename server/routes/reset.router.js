var router = require('express').Router();
var path = require('path');
var async = require('async');
var crypto = require('crypto');
var pool = require('../modules/pool.js')
var encryptLib = require('../modules/encryption');

var nodemailer = require('nodemailer');

//Route receives email and token, then creates and sets new password
router.get('/reset/:email/:token', function(req, res, next){
    var email = req.params.email;
    var reset_token = req.params.token;
    //Waterfall runs tasks in a progression
    async.waterfall([
        //Query database to compare reset token to user's, then check if it's expired
        function(callback){
            pool.connect(function(err, client, done){
                if (err){
                    console.log('Error connecting:', err);
                }else{
                    client.query('SELECT reset_token, reset_token_expires FROM users WHERE email = $1', [email], function(error, result){
                        done();
                        var tokendata = result.rows[0];
                        callback(error, tokendata);
                    })
                }
            })
        },
        function(tokendata, callback){
            //If reset token doesn't match, or is expired, create error string
            if (reset_token != tokendata.reset_token ||
                new Date(tokendata.reset_token_expires).getTime() < new Date(Date.now()).getTime()){
                    callback(null, 'Token invalid or expired');
            //Otherwise create new password
            }else{
                crypto.randomBytes(4, function(err, buffer){
                    var newPass = buffer.toString('hex');
                    callback(err, newPass);
                })
            }
        },
        function(newPass, callback){
            //If error string is received, do nothing
            if (newPass === 'Token invalid or expired'){
                callback(null, 'Task cancelled');
            //Otherwise set new password
            }else{
                var password = encryptLib.encryptPassword(newPass);
                pool.connect(function(err, client, done) {
                    if (err){
                        console.log('Connection error:', err);
                    }else{
                        client.query('UPDATE users SET password = $1 where email = $2', [password, email], function (err){
                            callback(err, newPass);
                        })
                    }
                })
            }
        },
        function(newPass, callback){
            //Initiate nodemailer to send new password to user
            var transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: 'grownorth.mailer@gmail.com',
                    pass: process.env.MAILERPASSWORD
                }
            });
            var mailOptions = {
                from: 'grownorth.mailer@gmail.com',
                to: email,
                subject: 'Grow North App Password Reset',
                html: '<p>Your password has been changed to ' + newPass + '</p>' +
                '<p>You are advised to change your password immediately</p>'
            };
            transporter.sendMail(mailOptions, function(err, info){
                callback(err, 'done');
            });
        }
    ], function(err, newPass) {
        //Redirect to root url
        if (err) return next(err);
        res.redirect('/');
      });
})

//Route triggers mailer to send username and password reset link to user's email
router.get('/:email', function(req, res, next){
    var email = req.params.email;
    //Create a deadline one hour from current time to reset password
    var reset_deadline = new Date(Date.now() + 3600000);
    console.log (email, reset_deadline);
    //Waterfall runs tasks in a progression
    async.waterfall([
        //Create a reset token
        function(callback) {
          crypto.randomBytes(20, function(err, buffer) {
            var token = buffer.toString('hex');
            callback(err, token);
          });
        },
        //Attach reset token and reset expiration to user in database
        function(token, callback){
            pool.connect(function(err, client, done){
                if (err){
                    console.log('Error connecting:', err);
                }else{
                    var values = [token, reset_deadline, email];
                    var query = 'UPDATE users SET reset_token = $1, reset_token_expires = $2 WHERE email = $3';

                    client.query(query, values, function(error){
                        done();
                        callback(error, token)
                    })
                }
            });
        },
        //Get username by email
        function(token, callback){
            pool.connect(function(err, client, done){
                if (err){
                    console.log('Error connecting:', err);
                }else{
                    var values = [email];
                    var query = 'SELECT username FROM users WHERE email = $1';

                    client.query(query, values, function(error, result){
                        console.log('Result from reset email query', result);
                        var username = result.rows[0].username;
                        done();
                        callback(error, token, username)
                    })
                }
            });
        },
        function(token, username, done) {
            //Initiate mailer to send username and password reset link to user's email
            var transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: 'grownorth.mailer@gmail.com',
                    pass: process.env.MAILERPASSWORD
                }
            });
            var mailOptions = {
                from: 'grownorth.mailer@gmail.com',
                to: email,
                subject: 'Grow North App Password Reset',
                html: '<p>Hi!</p>' +
                '<h3>You\'re receiving this email because a username/password request was sent to the Grow North App.</h3>' +
                '<p>Your Grow North username is.......</p>' + 
                '<p><strong>' + username + '</strong></p>' +
                '<a href="grownorth.herokuapp.com/resetRoute/reset/' + email + '/' + token + '">Click here if you would like to reset your password</a>' +
                '<h3>You will receive an email with your new password shortly, and will be redirected to the Grow North login page</h3>'
            };
            transporter.sendMail(mailOptions, function(err, info){
                done(err, 'done');
            });
        }
      ], function(err) {
        if (err) return next(err);
        res.sendStatus('200');
      });
})

module.exports = router;