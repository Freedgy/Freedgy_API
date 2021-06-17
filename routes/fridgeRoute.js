const controllers = require('../controllers/fridgeController')
const tokenMiddleware = require('../middleware/tokenMiddleware')

module.exports = function (app) {
    app.route('/fridge/create/:id')
        .post(tokenMiddleware.ensureToken, controllers.createFridge)
    app.route('/fridge')
        .get(tokenMiddleware.ensureToken, controllers.getAllFridges)
    app.route('/fridge/:id')
        .get(tokenMiddleware.ensureToken, controllers.getFridge)
    app.route('/fridge/delete/:id')
        .delete(tokenMiddleware.ensureToken, controllers.deleteFridge)
    app.route('/fridge/changeinfos/:id')
        .put(tokenMiddleware.ensureToken, controllers.changeInformationsFridge)
}