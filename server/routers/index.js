const Router = require('koa-router')
const apiRouter = require('./api')
const wechatRouter = require('./wechat')

var router = new Router()

apiRouter(router)
wechatRouter(router)

module.exports = router
