const controllers = require('../controllers/userController')
const middleware = require('../middleware/ensureToken')

module.exports = function (app) {
    app.route('/user/login')
        .post(controllers.loginUser)
    app.route('/user/register')
        .post(controllers.registerUser)
    app.route('/user/:id')
        .get(middleware.ensureToken, controllers.informationUser)
}