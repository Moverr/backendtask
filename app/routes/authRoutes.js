'use-strict'
module.exports = function(app) {
    var auth = require('../controllers/authController')


    app.route('/login').post(auth.login)

    

}