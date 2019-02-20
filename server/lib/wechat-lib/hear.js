const sha1 = require('sha1')
const getRawBody = require('raw-body')
const util = require('./util')
const dbHelp = require('../../database/dbHelp')

module.exports = function hear (reply) {
  return async function wechatMiddle(ctx, next) {
    let account = await dbHelp.accountHelp.getAccount({
      _id: ctx.params.id
    })
    if (!account) return ctx.body = 'Failed'

    const token = account.token

    const {
      signature,
      nonce,
      timestamp,
      echostr
    } = ctx.query

    const str = [token, timestamp, nonce].sort().join('')
    const sha = sha1(str)

    if (ctx.method === 'GET') {
      if (sha === signature) {
        ctx.body = echostr
      } else {
        ctx.body = 'Failed'
      }
    }
     else if (ctx.method === 'POST') {
      if (sha !== signature) {
        ctx.body = 'Failed'

        return false
      }

      const data = await getRawBody(ctx.req, {
        length: ctx.length,
        limit: '1mb',
        encoding: ctx.charset
      })

      const content = await util.parseXML(data)
      const message = util.formatMessage(content.xml)

      console.log(message)
      ctx.weixin = message

      await reply.apply(ctx, [ctx, next])

      const replyBody = ctx.body
      const msg = ctx.weixin
      const xml = util.tpl(replyBody, msg)

      ctx.status = 200
      ctx.type = 'application/xml'
      ctx.body = xml
    }
  }
}

