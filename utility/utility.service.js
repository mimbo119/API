var jwt = require('jsonwebtoken');

utilityService = {
    getRoles: function (token) {
        let promise = new Promise(function(resolve,reject){
            jwt.verify(token, 'secret', function (err, decoded) {
                if (err) {
                    reject( {
                        IsValid: false,
                        name: 'JsonWebTokenError',
                        message: 'jwt malformed'
                    })
                } else {
                    resolve( {
                        IsValid: true,
                        Decoded: decoded.data[0].Role,
                        ID : decoded.data[0]._id
                    })
                }
            });
        })

        return promise;
        
    }
}

module.exports = utilityService;