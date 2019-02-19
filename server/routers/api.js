var apiController = require('../controllers/api')
var accountController = require('../controllers/account')
var middleware = require('../middleware/options')

module.exports = function apiRouter(router) {
  router.post('/api/signup', apiController.signup)
  router.post('/api/login', apiController.login)
  router.post('/api/logout', apiController.logout)
  router.get('/api/accounts', middleware.login_required(), middleware.pagination(), accountController.list)
  router.post('/api/account', middleware.login_required(), accountController.create)
  router.put('/api/account', middleware.login_required(), accountController.edit)
}
