const Router = require('koa-router')
const apiRouter = require('./api')

var router = new Router()

apiRouter(router)

module.exports = router
