const controllers = require('../controllers/authController')

module.exports = function (app) {
    app.route('/users/login')
        .post(controllers.loginUser)
    app.route('/users/register')
        .post(controllers.registerUser)
}

