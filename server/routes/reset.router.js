var router = require('express').Router();
var path = require('path');
var async = require('async');
var crypto = require('crypto');
var pool = require('../modules/pool.js')

var nodemailer = require('nodemailer');

router.get('/reset/:email/:token', function(req, res){
    var email = req.params.email;
    var reset_token = req.params.token;

    console.log('Hit /reset/reset');
    console.log('email:', email);
    console.log('Reset token:', reset_token);
    res.sendStatus(200);

    // async.waterfall([
    //     function(callback){
    //         pool.connect(function(err, client, done){
    //             if (err){
    //                 console.log('Error connecting:', err);
    //             }else{
    //                 client.query('SELECT reset_token, reset_token_expires WHERE email = $1', [email], function(error, result){
    //                     done();
    //                     callback(error, queryResult);
    //                 })
    //             }
    //         })
    //     },
    //     function(queryResult, callback){
    //         if (queryResult.
    //     }
    // ])

    
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
                        // TRY THIS WITHOUT token LATER???
                        callback(error, token)
                    })
                }
            });
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
                to: 'evanjkearney@gmail.com',
                subject: 'Grow North App Password Reset',
                html: '<p>You\'re receiving this email because a password reset request was sent to the Grow North App.</p>' +
                '<a href="http://localhost:5000/reset/reset/evanjkearney@gmail.com/' + token + '">Click here to reset password</a>' +
                '<p>If you didn\'t make this request... that\'s pretty concerning. IS THIS CHANGING?</p>' 
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