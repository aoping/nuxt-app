var apiController = require('../controllers/api')
var topicController = require('../controllers/topic')
var middleware = require('../middleware/options')

module.exports = function apiRouter(router) {
  router.get('/api/topics', middleware.login_required(), middleware.pagination(), topicController.list)
  router.post('/api/topic', middleware.login_required(), topicController.edit)
  router.put('/api/topic', middleware.login_required(), topicController.edit)
  router.del('/api/topic/:id', middleware.login_required(), topicController.del)
}
