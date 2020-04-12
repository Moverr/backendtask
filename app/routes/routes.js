'use-strict'
module.exports = function(app) {
    const controller = require('../controllers/controller')
    const authService = require('../services/authentication')
    const uploadService = require('../services/upload');

    app.route('/login').post(controller.login)
    app.route('/').patch(authService.verifyauthenticatetoken,controller.patch)
    app.route('/upload').post(authService.verifyauthenticatetoken,uploadService.single('avatar'),controller.thumbnailGenerator)
    

}