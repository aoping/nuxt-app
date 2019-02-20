const Router = require('koa-router')
const apiRouter = require('./api')
const wechatRouter = require('./wechat')
const topicRouter = require('./topic')

var router = new Router()

apiRouter(router)
wechatRouter(router)
topicRouter(router)

module.exports = router
