const getRawBody = require('raw-body')
const util = require('../lib/wechat-lib/util')
const dbHelp = require('../database/dbHelp')
const WechatLib = require('../lib/wechat-lib')


module.exports.hear = function () {
  return async function wechatMiddle(ctx, next) {
    let account = await dbHelp.accountHelp.getAccount({
      _id: ctx.params.id
    })
    if (!account) return ctx.body = 'Failed'

    let req = Object.assign({}, ctx.query, {token: account.token})
    const wechatLib = new WechatLib({appID: account.appID, appSecret: account.appSecret})
    const match = wechatLib.hear(req)
    if (!match) return ctx.body = 'Failed'

    if (ctx.method === 'GET') {
      ctx.body = ctx.query.echostr
    }
     else if (ctx.method === 'POST') {
      const data = await getRawBody(ctx.req, {
        length: ctx.length,
        limit: '1mb',
        encoding: ctx.charset
      })

      const content = await util.parseXML(data)
      const message = util.formatMessage(content.xml)

      const body = await reply(message, wechatLib)

      const xml = util.tpl(body, message)

      ctx.status = 200
      ctx.type = 'application/xml'
      ctx.body = xml
    }
  }
}

const tip = '我的卡丽熙，欢迎来到河间地\n' +
  '点击 <a href="http://coding.imooc.com">一起搞事情吧</a>'


async function reply (message, wechatLib) {
    if (message.MsgType === 'event') {
    if (message.Event === 'subscribe') {
      return tip
    } else if (message.Event === 'unsubscribe') {
      console.log('取关了')
    } else if (message.Event === 'LOCATION') {
      return message.Latitude + ' : ' + message.Longitude
    } else if (message.Event === 'view') {
      return message.EventKey + message.MenuId
    } else if (message.Event === 'pic_sysphoto') {
      return message.Count + ' photos sent'
    }
  } else if (message.MsgType === 'text') {
    if (message.Content === 'menu') {
      const menu = require('./menu')
      await wechatLib.handle('delMenu')
      const menuData = await wechatLib.handle('createMenu', menu)

      console.log(menuData)
    }
    return message.Content
  } else if (message.MsgType === 'image') {
    return {
      type: 'image',
      mediaId: message.MediaId
    }
  } else if (message.MsgType === 'voice') {
    return {
      type: 'voice',
      mediaId: message.MediaId
    }
  } else if (message.MsgType === 'video') {
    return {
      type: 'video',
      mediaId: message.MediaId
    }
  } else if (message.MsgType === 'location') {
    return message.Location_X + ' : ' + message.Location_Y + ' : ' + message.Label
  } else if (message.MsgType === 'link') {
    return [{
      title: message.Title,
      description: message.Description,
      picUrl: 'http://mmbiz.qpic.cn/mmbiz_jpg/xAyPZaQZmH09wYBjskFEQSoM4te0SnXR9YgbJxlDPVPDZtgLCW5FacWUlxFiaZ7d8vgGY6mzmF9aRibn05VvdtTw/0',
      url: message.Url
    }]
  }
}
