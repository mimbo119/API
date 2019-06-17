const express = require('express');
const router = express.Router();

var dbconnection = require('../utility/dbconnection');
var utilityService = require('../utility/utility.service');

router.post('/', function (req, res, next) {
    var newDoc = req.body;
    var roles = utilityService.getRoles(req.headers.token).then((result) => {
        result.Decoded.forEach(element => {
            if(element == "admin"){
                res.json({
                    "Roles" : element
                })
                dbconnection.insert(newDoc)

            }
        })
    }, (err) => {
        console.log(err)
    });

});
module.exports = router;