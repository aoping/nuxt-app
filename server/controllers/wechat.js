const mongoose = require('mongoose')
const User = mongoose.model('User')
const dbHelp = require('../database/dbHelp')
const wechatLib = require('../lib/wechat-lib')
const config = require('../config')
// const reply = require('../config')

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

  const middle = wechatLib.hear(wechatLib.reply)
  const body = await middle(ctx, next)
  return ctx.body = ctx.body
}
