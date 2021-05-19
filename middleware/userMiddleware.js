const { check } = require('express-validator')

module.exports.registerValidation = [
    check('email').isEmail(),
    check('name').notEmpty() ,
    check('last_name').notEmpty(),
    check('password').notEmpty()
]

module.exports.resetValidation = [
    check('password').notEmpty()
]