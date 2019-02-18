const mongoose = require('mongoose')
const User = mongoose.model('User')


module.exports.signup = async (ctx, next) => {
  console.log(ctx)
  console.log(ctx.request.body)
  const {
    email,
    password,
    confirm,
    nickname
  } = ctx.request.body

  let user = await User.findOne({
    email
  }).exec()

  if (!user) {
    console.log('写入管理员数据')
    user = new User({
      email,
      password,
      nickname
    })

    await user.save()
  }

  return ctx.body = {
    success: true,
  }
}
