const mongoose = require('mongoose')

const Account = mongoose.model('Account')

module.exports.getAccounts = async function (query, opt) {
  query.actived = true
  const data = await Account
    .find(query, {}, opt)
    .exec()

  return data
}
