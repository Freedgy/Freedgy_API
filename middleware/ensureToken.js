const jwt = require('jsonwebtoken');

module.exports.ensureToken = function(req, res, next) {
    var bearerHeader = req.headers["authorization"];

    if (typeof bearerHeader === 'undefined')
        return res.status(400).send({ message: 'accessToken undefined' })
    try {
        jwt.verify(bearerHeader.split(" ")[1], process.env.KEY_JWT)
        next()
    } catch (error) {
        return res.status(403).send(error)
    }
}

    // jwt.verify(bearerHeader.split(" ")[1], process.env.KEY_JWT, (err, res_jwt) => {
    //     if (err) 
    //         return res.status(403).send(err);
    //     next();
    // });