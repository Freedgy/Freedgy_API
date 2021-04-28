const controllers = require('../controllers/userController')
const tokenMiddleware = require('../middleware/tokenMiddleware')
const userMiddleware = require('../middleware/userMiddleware')
const validateMiddleware = require('../middleware/validateMiddleware')

module.exports = function (app) {
    app.route('/user/login',)
        .post(controllers.loginUser)
    app.route('/user/register')
        .post(userMiddleware.registerValidation, validateMiddleware.validate, controllers.registerUser)
    app.route('/user/:id')
        .get(tokenMiddleware.ensureToken, controllers.informationUser)
}