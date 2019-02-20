const mongoose = require('mongoose')

const Token = mongoose.model('Token')


module.exports.getToken = async function (query) {
  const data = await Token
    .findOne(query)
    .exec()
  return data
}

module.exports.saveToken = async function (data) {
  const res = await Token.saveToken(data)
  return res
}
