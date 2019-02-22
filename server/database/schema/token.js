const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const TokenSchema = new mongoose.Schema({
  name: String, // access_token/ticket
  appID: String,
  token: String,
  expires_in: Number,
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

TokenSchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createdAt = this.meta.updatedAt = Date.now()
  } else {
    this.meta.updatedAt = Date.now()
  }

  next()
})

TokenSchema.statics = {
  async getToken() {
    const token = await this.findOne({
      name: 'access_token'
    }).exec()

    if (token && token.token) {
      token.access_token = token.token
    }

    return token
  },

  async saveToken(data) {
    let token = await this.findOne({
      appID: data.appID,
      name: data.name
    }).exec()

    if (token) {
      token.token = data.token
      token.expires_in = data.expires_in
    } else {
      token = new Token({
        appID: data.appID,
        name: data.name,
        token: data.token,
        expires_in: data.expires_in
      })
    }

    await token.save()

    return data
  }
}

const Token = mongoose.model('Token', TokenSchema)

