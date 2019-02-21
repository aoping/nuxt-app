const mongoose = require('mongoose')
const Topic = mongoose.model('Topic')
const dbHelp = require('../database/dbHelp')
const _ = require('lodash')

module.exports.list = async (ctx, next) => {
  const data = await dbHelp.topicHelp.getTopics({user: ctx.session.user._id}, Object.assign({
    sort: '-meta.updatedAt'
  }, ctx.pagination))
  ctx.body = {
    data: data,
    success: true
  }
}

module.exports.get = async (ctx, next) => {
  const {
    id,
  } = ctx.params
  let data = await Topic.findOne({
    _id: id
  }).exec()
  if (data) {
    ctx.body = {
      success: true,
      data
    }
  } else{
    ctx.body = {
      success: false,
      err: '不存在'
    }
  }
}

module.exports.create = async (ctx, next) => {
  const {
    title,
    content,
    author,
    account
  } = ctx.request.body

  ctx.checkBody('title').notEmpty();
  ctx.checkBody('content').notEmpty();
  ctx.checkBody('author').notEmpty();
  ctx.checkBody('account').notEmpty();

  if (ctx.errors) {
    const err = JSON.stringify(ctx.errors[0])
    ctx.body = {
      success: false,
      err
    };
    return;
  }

  let topic = new Topic({
    user: ctx.session.user._id,
    title,
    content,
    author,
    account
  })

  let data = await topic.save()
  return ctx.body = {
    success: true,
    data: data
  }

}

module.exports.edit = async (ctx, next) => {
  const {
    _id,
    title,
    content,
    author,
    account
  } = ctx.request.body
  // ctx.checkBody('_id').notEmpty();
  ctx.checkBody('title').notEmpty();
  ctx.checkBody('content').notEmpty();
  ctx.checkBody('author').notEmpty();
  ctx.checkBody('account').notEmpty();

  if (ctx.errors) {
    const err = JSON.stringify(ctx.errors[0])
    ctx.body = {
      success: false,
      err
    };
    return;
  }

  let data = await Topic.findByIdAndUpdate(_id,
    {
      $set: {
        title,
        content,
        author,
        account
    }
    }, { new: true });

  return ctx.body = {
    success: true,
    data
  }
}

module.exports.del = async (ctx, next) => {
  const {
    id,
  } = ctx.params
  ctx.checkParams('id').notEmpty();

  if (ctx.errors) {
    const err = JSON.stringify(ctx.errors[0])
    ctx.body = {
      success: false,
      err
    };
    return;
  }

  let data = await Topic.findOne({
    _id: id
  }).exec()
  if (data) {
    try {
      await data.remove()
      ctx.body = {
        success: true,
      }
    } catch (e) {
      ctx.body = {
        success: false,
        err: '内部错误'
      }
    }
  } else{
    ctx.body = {
      success: false,
      err: '不存在'
    }
  }

}
