const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId;

const TopicSchema = new Schema({
  title: {
    type: String
  },
  content: {
    type: String
  },
  author: {
    type: String
  },
  user: {
    type: ObjectId,
    ref: 'User'
  },
  account: {
    type: ObjectId,
    ref: 'Account'
  },
  deleted: {
    type: Boolean,
    default: false
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
});

TopicSchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createdAt = this.meta.updatedAt = Date.now()
  } else {
    this.meta.updatedAt = Date.now()
  }

  next()
})

mongoose.model('Topic', TopicSchema)
