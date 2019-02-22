const mongoose = require('mongoose')
const queryParse = require('querystring')
const urlParse = require('url')
const User = mongoose.model('User')
const dbHelp = require('../database/dbHelp')
const wechatMiddleware = require('../middleware/wechat')
const config = require('../config')
const WechatOAuth = require('../lib/wechat-lib/oath')
const Wechat = require('../lib/wechat-lib')
// const reply = require('../config')

// 接口配置URL
module.exports.hear = async (ctx, next) => {
  ctx.checkParams('id').notEmpty();
  if (ctx.errors) {
    const err = JSON.stringify(ctx.errors[0])
    ctx.body = {
      success: false,
      err
    };
    return;
  }

  const middle = wechatMiddleware.hear()
  const body = await middle(ctx, next)
  return ctx.body = ctx.body
}

// 网页服务签名
module.exports.signature = async (ctx, next) => {
  let url = ctx.query.url

  if (!url) ctx.throw(404)

  url = decodeURIComponent(url)

  const params = await handlerTopicSignature(url)

  ctx.body = {
    success: true,
    data: params
  }
}

// :host/topic/:id
async function handlerTopicSignature(url) {
  const arr = url.split('/')
  let [topic, account] = await dbHelp.topicHelp.getTopic({
    _id: arr[arr.length - 1]
  })
  if (!account) return ''
  const wechat = new Wechat({appID: account.appID, appSecret: account.appSecret})
  const params = await wechat.getSignatureAsync(url)
  console.log('params')
  console.log(params)
  return params
}

// 网页授权重定向
module.exports.redirect = async (ctx, next) => {
  const { visit } = ctx.query
  let url
  if (visit.includes('topic/')) {
    url = await handlerTopicRedirect(visit)
  }
  if (url) ctx.redirect(url)
  else ctx.body = {
    success: false
  }
}

// topic/:id
async function handlerTopicRedirect(fullpath) {
  const arr = fullpath.split('/')
  let [topic, account] = await dbHelp.topicHelp.getTopic({
    _id: arr[1]
  })
  if (!account) return ''
  const wechatOAuth = new WechatOAuth({appID: account.appID, appSecret: account.appSecret})
  const target = config.SITE_ROOT_URL + '/oauth'
  const scope = 'snsapi_userinfo'
  const url = wechatOAuth.getAuthorizeURL(scope, target, fullpath)
  return url
}

// 网页授权
module.exports.oauth = async (ctx, next) => {
  let url = ctx.query.url

  url = decodeURIComponent(url)

  const urlObj = urlParse.parse(url)

  const params = queryParse.parse(urlObj.query)
  const {state, code } = params

  let user = await handlerTopicOAuth(state, code)
  ctx.session.user = user
  ctx.body = {
    success: true,
    data: user
  }
}

// topic/:id
async function handlerTopicOAuth(fullpath, code) {
  const arr = fullpath.split('/')
  let [topic, account] = await dbHelp.topicHelp.getTopic({
    _id: arr[1]
  })
  if (!account) return ''
  const wechatOAuth = new WechatOAuth({appID: account.appID, appSecret: account.appSecret})
  const user = await wechatOAuth.getUserByCode(code)
  return user
}
