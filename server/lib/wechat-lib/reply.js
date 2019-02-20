const tip = '我的卡丽熙，欢迎来到河间地\n' +
  '点击 <a href="http://coding.imooc.com">一起搞事情吧</a>'


module.exports = async (ctx, next) => {
  const message = ctx.weixin

  if (message.MsgType === 'event') {
    if (message.Event === 'subscribe') {
      ctx.body = tip
    } else if (message.Event === 'unsubscribe') {
      console.log('取关了')
    } else if (message.Event === 'LOCATION') {
      ctx.body = message.Latitude + ' : ' + message.Longitude
    } else if (message.Event === 'view') {
      ctx.body = message.EventKey + message.MenuId
    } else if (message.Event === 'pic_sysphoto') {
      ctx.body = message.Count + ' photos sent'
    }
  } else if (message.MsgType === 'text') {
    ctx.body = message.Content
  } else if (message.MsgType === 'image') {
    ctx.body = {
      type: 'image',
      mediaId: message.MediaId
    }
  } else if (message.MsgType === 'voice') {
    ctx.body = {
      type: 'voice',
      mediaId: message.MediaId
    }
  } else if (message.MsgType === 'video') {
    ctx.body = {
      type: 'video',
      mediaId: message.MediaId
    }
  } else if (message.MsgType === 'location') {
    ctx.body = message.Location_X + ' : ' + message.Location_Y + ' : ' + message.Label
  } else if (message.MsgType === 'link') {
    ctx.body = [{
      title: message.Title,
      description: message.Description,
      picUrl: 'http://mmbiz.qpic.cn/mmbiz_jpg/xAyPZaQZmH09wYBjskFEQSoM4te0SnXR9YgbJxlDPVPDZtgLCW5FacWUlxFiaZ7d8vgGY6mzmF9aRibn05VvdtTw/0',
      url: message.Url
    }]
  }
}
