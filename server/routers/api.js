var apiController = require('../controllers/api')

module.exports = function apiRouter(router) {
  router.post('/api/signup', apiController.signup)
  router.post('/api/login', apiController.login)
}
