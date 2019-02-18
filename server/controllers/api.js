const mongoose = require('mongoose')
const User = mongoose.model('User')
const dbHelp = require('../database/dbHelp')


module.exports.signup = async (ctx, next) => {
  const {
    email,
    password,
    confirm,
    nickname
  } = ctx.request.body

  ctx.checkBody('email').isEmail("you enter a bad email.");
  ctx.checkBody('password').notEmpty().len(6, 20).md5();
  ctx.checkBody('confirm').eq(password, '两次输入的密码不一致');
  ctx.checkBody('nickname').optional().len(2, 20,"nickname为2-20字节");

  if (ctx.errors) {
    const err = JSON.stringify(ctx.errors[0])
    ctx.body = {
      success: false,
      err
    };
    return;
  }

  let user = await User.findOne({
    email
  }).exec()

  if (!user) {
    user = new User({
      email,
      password,
      nickname
    })

    await user.save()
    return ctx.body = {
      success: true,
    }
  } else {
    return ctx.body = {
      success: false,
      err: '用户已存在'
    }
  }


}


module.exports.login = async (ctx, next) => {
  const {
    email,
    password,
  } = ctx.request.body

  ctx.checkBody('email').isEmail("you enter a bad email.");
  ctx.checkBody('password').notEmpty().len(6, 20).md5();

  if (ctx.errors) {
    const err = JSON.stringify(ctx.errors[0])
    ctx.body = {
      success: false,
      err
    };
    return;
  }

  const data = await dbHelp.userHelp.login(email, password)
  const { user, match } = data
  if (match) {
    ctx.session.user = {
      _id: user._id,
      email: user.email,
      nickname: user.nickname,
    }

    return (ctx.body = {
      success: true,
      data: {
        email: user.email,
        nickname: user.nickname,
      }
    })
  }

  return (ctx.body = {
    success: false,
    err: '密码错误'
  })


}
