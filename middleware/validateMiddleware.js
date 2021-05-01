const { validationResult } = require('express-validator')

module.exports.validate = function(req, res, next) {
    const errors = validationResult(req)
    if (errors.isEmpty())
        return next()
    else
        return res.status(400).json(errors)
}