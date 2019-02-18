const mongoose = require('mongoose')

const User = mongoose.model('User')

module.exports.login = async function (email, password) {
  let match = false

  const user = await User.findOne({ email: email }).exec()

  if (user) {
    match = await user.comparePassword(password, user.password)
  }

  return {
    match,
    user
  }
}
