const Koa = require('koa')
const consola = require('consola')
const database = require('./database')
const middlewares = require('./middleware')
const configBase = require('./config')


const {
  Nuxt,
  Builder
} = require('nuxt')

const app = new Koa()

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(app.env === 'production')

const Sentry = require('@sentry/node');

Sentry.init({
  dsn: configBase.sentryDNS,
  release: "nuxt-app-server@1.0.0"
});

app.on('error', err => {
  Sentry.captureException(err);
});

async function start() {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  const {
    host = process.env.HOST || '127.0.0.1',
      port = process.env.PORT || 3000
  } = nuxt.options.server

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }
  // 连接数据库
  database(app)

  // middlewares
  middlewares(app)

  const router = require('./routers')

  app
    .use(router.routes())
    .use(router.allowedMethods())

  app.use(ctx => {
    ctx.status = 200
    ctx.req.session = ctx.session
    ctx.respond = false // Bypass Koa's built-in response handling
    ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
    nuxt.render(ctx.req, ctx.res)
  })

  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

start()
