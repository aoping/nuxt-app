const koaBody = require('koa-bodyparser')
const session = require('koa-session')
const validate = require('koa-validate')

const CONFIG = {
  key: 'koa:sess',
  maxAge: 86400000,
  overwrite: true,
  signed: true,
  rolling: false
}

module.exports = app => {
  // validate
  validate(app)
  // bodyparser
  app.use(koaBody())

  // session
  app.keys = ['ice']

  app.use(session(CONFIG, app))
}

