var wechatController = require('../controllers/wechat')
var middleware = require('../middleware/options')

module.exports = function wechatRouter(router) {
  router.get('/wechat-hear', wechatController.hear)
  router.post('/wechat-hear', wechatController.hear)
  // router.get('/wechat-signature', wechatController.signup)
  // router.get('/wechat-redirect', wechatController.signup)
  // router.get('/wechat-oauth', wechatController.signup)

}
