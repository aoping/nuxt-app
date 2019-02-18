const _ = require('lodash')
const path = require('path')
const resolve = path.resolve

const host = process.env.HOST || 'localhost'
const env = process.env.NODE_ENV || 'development'
const conf = require(resolve(__dirname, `./${env}.json`))

module.exports = _.assign({
  env,
  host
}, conf)
