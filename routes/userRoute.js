const controllers = require('../controllers/userController')
const tokenMiddleware = require('../middleware/tokenMiddleware')
const userMiddleware = require('../middleware/userMiddleware')
const validateMiddleware = require('../middleware/validateMiddleware')
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "." + file.mimetype.replace("image/", ""));
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png' || file.mimetype == 'image/gif') {
        cb(null, true);
    }
    cb(null, false);
};
const upload = multer({ storage: storage, limits: { fileSize: 1024 * 1024 * 2 }, fileFilter: fileFilter });

module.exports = function (app) {
    app.route('/user/login',)
        .post(controllers.loginUser) // add middleware
    app.route('/user/register')
        .post(userMiddleware.registerValidation, validateMiddleware.validate, controllers.registerUser)
    app.route('/user/confirmation/:id')
        .get(controllers.confirmationUser)
    app.route('/user/:id')
        .get(tokenMiddleware.ensureToken, controllers.getInformationsUser)
    app.route('/user/forgot/:email')
        .get(controllers.forgotPasswordUser)
    app.route('/user/reset/:id')
        .put(userMiddleware.resetValidation, validateMiddleware.validate,controllers.resetPasswordUser) // rajouter middleware pour le password
    app.route('/user/changepassword/:id')
        .put(tokenMiddleware.ensureToken, controllers.changePasswordUser)
    app.route('/user/changeprofilepic/:id')
        .put(tokenMiddleware.ensureToken, upload.single('profilepic'), controllers.changeProfilePicUser)
    app.route('/user/delete/:id')
        .delete(tokenMiddleware.ensureToken, controllers.deleteAccountUser)
    app.route('/user/changeinfos/:id')
        .put(tokenMiddleware.ensureToken, controllers.changeInformationsUser)
}