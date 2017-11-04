var router = require('express').Router();
var path = require('path');
var async = require('async');
var crypto = require('crypto');
var pool = require('../modules/pool.js')

var nodemailer = require('nodemailer');

router.get('/:email', function(req, res, next){
    var email = req.params.email;
    var reset_deadline = new Date(Date.now() + 3600000);
    console.log('Email:', email);
    console.log('Token reset:', reset_deadline);
    async.waterfall([
        function(done) {
          crypto.randomBytes(20, function(err, buffer) {
            var token = buffer.toString('hex');
            done(err, token);
          });
        },
        function(token, done){
            pool.connect(function(err, client, done){
                if (err){
                    console.log('Error connecting:', err);
                }else{
                    var values = [token, reset_deadline, email];
                    var query = 'UPDATE users SET reset_token = $1, reset_token_expires = $2 WHERE email = $3';

                    client.query(query, values, function(error){
                        done(error, token);
                        if (error){
                            console.log("Error inserting data:", error);
                        }
                    })
                }
            })
            done(token);
        },


        // function(token, done) {
        //   User.findOne({ email: req.body.email }, function(err, user) {
        //     if (!user) {
        //       req.flash('error', 'No account with that email address exists.');
        //       return res.redirect('/forgot');
        //     }
    
        //     user.resetPasswordToken = token;
        //     user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    
        //     user.save(function(err) {
        //       done(err, token, user);
        //     });
        //   });
        // },
        function(token, done) {
            var transporter = nodemailer.createTransport({
                service: 'Hotmail',
                auth: {
                    user: 'evanmobile@hotmail.com',
                    pass: process.env.MAILERPASSWORD
                }
            });
            var mailOptions = {
                from: 'evanmobile@hotmail.com',
                to: 'evanjkearney@gmail.com',
                subject: 'Grow North App Password Reset',
                html: '<p>You\'re receiving this email because a password reset request was sent to the Grow North App.</p>' +
                '<a href="http://localhost:5000/#/mailer/' + token + '">Click here to reset password</a>' +
                '<p>If you didn\'t make this request... that\'s pretty concerning.</p>' 
            };
            transporter.sendMail(mailOptions, function(err, info){
                done(err, 'done');
            });
        }
      ], function(err) {
        if (err) return next(err);
      });
})

module.exports = router;