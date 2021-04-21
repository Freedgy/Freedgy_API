const controllers = require('../controllers/userController')

module.exports = function (app) {
    app.route('/user/login')
        .post(controllers.loginUser)
    app.route('/user/register')
        .post(controllers.registerUser)
    app.route('/user/information')
        .post(controllers.registerUser)
}