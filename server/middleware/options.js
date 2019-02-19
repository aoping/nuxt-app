const mongoose = require('mongoose')
const config = require('../config')
const User = mongoose.model('User')

module.exports.login_required  = () => {
  return async function (ctx, next) {
    console.log('ctx.session')
    console.log(ctx.session)
    if (!ctx.session || !ctx.session.user) {
      ctx.status = 401;
      ctx.body = {
        success: false,
        msg: '未登录',
      };
      return;
    }
    await next();
  };
};


module.exports.pagination = () => {
  return async (ctx, next) => {
    if (!ctx.pagination) {

      const query = ctx.query
      const pagination = {}

      pagination.limit = parseInt(query.limit || config.default_limit, 10);
      const page = Math.max(1, parseInt(query.page || config.default_page, 10));
      pagination.skip = (page - 1) * pagination.limit;

      ctx.pagination = pagination;
    }
    await next();
  };
};
