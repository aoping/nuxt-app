const mongoose = require('mongoose')

const Account = mongoose.model('Account')


module.exports.getAccount = async function (query) {
  query.actived = true
  const data = await Account
    .findOne(query)
    .exec()
  return data
}

module.exports.getAccounts = async function (query, opt) {
  query.actived = true
  const data = await Account
    .find(query, {}, opt)
    .exec()

  return data
}
