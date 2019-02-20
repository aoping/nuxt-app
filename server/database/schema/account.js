const mongoose = require('mongoose')
const random = require('string-random')
const config = require('../../config')

const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const AccountSchema = new Schema({
  name: String,
  appID: String,
  appSecret: String,
  token: String,
  user: {
    type: ObjectId,
    ref: 'User'
  },
  actived: {
    type: Boolean,
    default: true,
  },
  meta: {
    createdAt: {
      type: Date,
      default: Date.now()
    },
    updatedAt: {
      type: Date,
      default: Date.now()
    }
  }
})


AccountSchema.pre('save', function (next) {
  if (this.isNew) {
    this.token = config.wxaccount_token_prefix + random(16)
    this.meta.createdAt = this.meta.updatedAt = Date.now()
  } else {
    this.meta.updatedAt = Date.now()
  }

  next()
})


module.exports = mongoose.model('Account', AccountSchema)
