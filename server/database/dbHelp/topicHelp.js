const mongoose = require('mongoose')

const Topic = mongoose.model('Topic')


module.exports.getTopic = async function (query) {
  query.deleted = false
  const data = await Topic
    .findOne(query)
    .exec()
  return data
}

module.exports.getTopics = async function (query, opt) {
  query.deleted = false
  const data = await Topic
    .find(query, {}, opt)
    .exec()

  return data
}
