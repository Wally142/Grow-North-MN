var router = require('express').Router();
var path = require('path');

var nodemailer = require('nodemailer');

router.get('/', function(req, res){
    var transporter = nodemailer.createTransport({
        service: 'Hotmail',
        auth: {
            user: 'evanmobile@hotmail.com',
            pass: 'im@sk00l'
        }
    });
    
    var mailOptions = {
        from: 'evanmobile@hotmail.com',
        to: 'evanjkearney@gmail.com',
        subject: 'test email',
        text: 'this is the test email sent with nodemailer'
    };
    
    transporter.sendMail(mailOptions, function(err, info){
        if (err){
            console.log(err);
        }else{
            console.log('Email sent:', info.response);
        }
    });
    res.sendStatus(200);
})

module.exports = router;