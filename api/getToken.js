const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
//var token = jwt.sign({ foo: 'bar' }, 'shhhhh');

var dbconnection = require('../utility/dbconnection');

router.post('/', function (req, res, next) {

    dbconnection.getToken(req.body.Email).then(function (response) {
        var hash = response[0].Password;
        const myPlaintextPassword = req.body.Password;
        bcrypt.compare(myPlaintextPassword, hash).then(function (isvalid) {
            if (isvalid) {
                delete response[0].Password;
                res.json({
                    IsValid: true,
                    "Token": jwt.sign({
                        exp: Math.floor(Date.now() / 1000) + (60 * 60),
                        data: response
                      }, 'secret'),
                })
            }
            else {
                res.json({
                    IsValid: false
                })
            }
        });

    })
});


module.exports = router;