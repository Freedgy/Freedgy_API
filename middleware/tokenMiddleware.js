const jwt = require('jsonwebtoken');

module.exports.ensureToken = function(req, res, next) {
    var bearerHeader = req.headers["authorization"];

    if (typeof bearerHeader === 'undefined')
        return res.status(400).json({ message: 'AccessToken undefined' })
    try {
        jwt.verify(bearerHeader.split(" ")[1], process.env.K_JWT)
        next()
    } catch (error) {
        return res.status(403).json(error)
    }
}