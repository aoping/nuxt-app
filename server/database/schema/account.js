const mongoose = require('mongoose')

const Schema = mongoose.Schema

const AccountSchema = new Schema({
  name: String,
  AppID: String,
  AppSecret: String,
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
    this.meta.createdAt = this.meta.updatedAt = Date.now()
  } else {
    this.meta.updatedAt = Date.now()
  }

  next()
})


module.exports = mongoose.model('Account', AccountSchema)
