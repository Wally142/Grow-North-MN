var router = require('express').Router();
var path = require('path');
var async = require('async');
var crypto = require('crypto');
var pool = require('../modules/pool.js')
var encryptLib = require('../modules/encryption');

var nodemailer = require('nodemailer');

router.get('/reset/:email/:token', function(req, res, next){
    var email = req.params.email;
    var reset_token = req.params.token;

    console.log('Hit /reset/reset');
    console.log('email:', email);
    console.log('Reset token:', reset_token);

    async.waterfall([
        function(callback){
            pool.connect(function(err, client, done){
                if (err){
                    console.log('Error connecting:', err);
                }else{
                    client.query('SELECT reset_token, reset_token_expires FROM users WHERE email = $1', [email], function(error, result){
                        done();
                        console.log('RESULT:', result);
                        var tokendata = result.rows[0];
                        callback(error, tokendata);
                    })
                }
            })
        },
        function(tokendata, callback){
            console.log('queryResult:', tokendata);
            console.log('Reset token from query:', tokendata.reset_token);
            console.log('Token expiration from query:', tokendata.reset_token_expires);
            if (reset_token != tokendata.reset_token ||
                new Date(tokendata.reset_token_expires).getTime() < new Date(Date.now()).getTime()){
                    callback(null, 'Token invalid or expired');
            }else{
                crypto.randomBytes(4, function(err, buffer){
                    var newPass = buffer.toString('hex');
                    callback(err, newPass);
                })
            }
        },
        function(newPass, callback){
            console.log('newPass:', newPass);
            if (newPass === 'Token invalid or expired'){
                callback(null, 'Task cancelled');
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
            var transporter = nodemailer.createTransport({
                service: 'Hotmail',
                auth: {
                    user: 'evanmobile@hotmail.com',
                    pass: process.env.MAILERPASSWORD
                }
            });
            var mailOptions = {
                from: 'evanmobile@hotmail.com',
                to: email,
                subject: 'Grow North App Password Reset',
                // CHANGE THIS MESSAGE AT SOME POINT
                // WHAT URL AFTER DEPLOY???
                html: '<p>Your password has been changed to ' + newPass + '</p>' +
                '<p>You are advised to change your password immediately</p>'
            };
            transporter.sendMail(mailOptions, function(err, info){
                callback(err, 'done');
            });
        }
    ], function(err, newPass) {
        console.log('Redirecting');
        if (err) return next(err);
        res.redirect('/');
      });
})

router.get('/:email', function(req, res, next){
    var email = req.params.email;
    var reset_deadline = new Date(Date.now() + 3600000);
    console.log (email, reset_deadline);

    async.waterfall([
        function(callback) {
          crypto.randomBytes(20, function(err, buffer) {
            var token = buffer.toString('hex');
            callback(err, token);
          });
        },
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
            console.log('Sending email')
            var transporter = nodemailer.createTransport({
                service: 'Hotmail',
                auth: {
                    user: 'evanmobile@hotmail.com',
                    pass: process.env.MAILERPASSWORD
                }
            });
            var mailOptions = {
                from: 'evanmobile@hotmail.com',
                to: email,
                subject: 'Grow North App Password Reset',
                // CHANGE THIS MESSAGE AT SOME POINT
                // WHAT URL AFTER DEPLOY???
                html: '<p>Hi!</p>' +
                '<p>You\'re receiving this email because a username/password request was sent to the Grow North App.</p>' +
                '<p>Your Grow North username is.......</p>' + 
                '<p>' + username + '</p>' +
                '<a href="http://localhost:5000/resetRoute/reset/' + email + '/' + token + '">Click here if you would like to reset your password</a>' +
                '<p>You will receive an email with your new password shortly, and will be redirected to the Grow North login page</p>' +
                '<p>If you didn\'t make this request... that\'s pretty concerning.</p>' 
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