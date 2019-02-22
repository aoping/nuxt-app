const sha1 = require('sha1')
const request = require('request-promise')
const dbHelp = require('../../database/dbHelp')
const util = require('./util')

const base = 'https://api.weixin.qq.com/cgi-bin/'
const api = {
  accessToken: base + 'token?grant_type=client_credential',
  temporary: {
    upload: base + 'media/upload?',
    fetch: base + 'media/get?'
  },
  permanent: {
    upload: base + 'material/add_material?',
    uploadNews: base + 'material/add_news?',
    uploadNewsPic: base + 'media/uploadimg?',
    fetch: base + 'material/get_material?',
    del: base + 'material/del_material?',
    update: base + 'material/update_news?',
    count: base + 'material/get_materialcount?',
    batch: base + 'material/batchget_material?'
  },
  tag: {
    create: base + 'tags/create?',
    fetch: base + 'tags/get?',
    update: base + 'tags/update?',
    del: base + 'tags/delete?',
    fetchUsers: base + 'user/tag/get?',
    batchTag: base + 'tags/members/batchtagging?',
    batchUnTag: base + 'tags/members/batchuntagging?',
    getTagList: base + 'tags/getidlist?'
  },
  user: {
    remark: base + 'user/info/updateremark?',
    info: base + 'user/info?',
    batchInfo: base + 'user/info/batchget?',
    fetchUserList: base + 'user/get?',
    getBlackList: base + 'tags/members/getblacklist?',
    batchBlackUsers: base + 'tags/members/batchblacklist?',
    batchUnblackUsers: base + 'tags/members/batchunblacklist?'
  },
  menu: {
    create: base + 'menu/create?',
    get: base + 'menu/get?',
    del: base + 'menu/delete?',
    addCondition: base + 'menu/addconditional?',
    delCondition: base + 'menu/delconditional?',
    getInfo: base + 'get_current_selfmenu_info?'
  },
  ticket: {
    get: base + 'ticket/getticket?'
  }
}


module.exports = class WechatLib {
  constructor(opts) {
    this.appID = opts.appID
    this.appSecret = opts.appSecret

    this.fetchAccessToken()

  }

  async request (options) {

    options = Object.assign({}, options, {json: true})

    try {
      const response = await request(options)
      return response
    } catch (error) {
      console.error(error)
    }
  }

  // 接口配置url
  hear({token, signature, nonce, timestamp, echostr}) {
    const str = [token, timestamp, nonce].sort().join('')
    const sha = sha1(str)
    if (sha === signature) {
      return true
    } else {
      return false
    }
  }

  async getSignatureAsync (url) {
    const data = await this.fetchAccessToken()
    console.log('access_token')
    console.log(data)
    const token = data.token
    const ticketData = await this.fetchTicket(token)
    const ticket = ticketData.token

    let params = this.sign(ticket, url)
    params.appId = this.appID

    return params
  }

  // 签名
  sign (ticket, url) {
    return util.sign(ticket, url)
  }

  isValidToken (data) {
    if (!data || !data.expires_in) {
      return false
    }

    const expiresIn = data.expires_in
    const now = (new Date().getTime())

    if (now < expiresIn) {
      return true
    } else {
      return false
    }
  }

  async fetchAccessToken () {
    let query = {appID: this.appID, name: 'access_token'}
    let data = await dbHelp.tokenHelp.getToken(query)

    if (!this.isValidToken(data)) {
      data = await this.updateAccessToken()
    }

    await dbHelp.tokenHelp.saveToken(data)

    return data
  }

  async updateAccessToken () {
    const url = api.accessToken + '&appID=' + this.appID + '&secret=' + this.appSecret

    const data = await this.request({url: url})
    const now = (new Date().getTime())
    const expiresIn = now + (data.expires_in - 20) * 1000

    data.token = data.access_token
    data.expires_in = expiresIn
    data.appID = this.appID
    data.name = 'access_token'
    return data
  }

  async fetchTicket (token) {
    let query = {appID: this.appID, name: 'ticket'}
    let data = await dbHelp.tokenHelp.getToken(query)

    if (!this.isValidToken(data)) {
      data = await this.updateTicket(token)
    }

    await dbHelp.tokenHelp.saveToken(data)

    return data
  }

  async updateTicket (token) {
    const url = api.ticket.get + '&access_token=' + token + '&type=jsapi'

    let data = await this.request({url: url})
    const now = (new Date().getTime())
    console.log('updateTicket')
    console.log(data)
    const expiresIn = now + (data.expires_in - 20) * 1000

    data.token = data.ticket
    data.expires_in = expiresIn
    data.appID = this.appID
    data.name = 'ticket'

    return data
  }

  async handle (operation, ...args) {
    const tokenData = await this.fetchAccessToken()
    const options = this[operation](tokenData.token, ...args)
    const data = await this.request(options)
    console.log('createMenu')
    console.log(data)
    return data
  }

  createMenu (token, menu) {
    const url = api.menu.create + 'access_token=' + token

    return {method: 'POST', url: url, body: menu}
  }

  getMenu (token) {
    const url = api.menu.get + 'access_token=' + token

    return {url: url}
  }

  delMenu (token) {
    const url = api.menu.del + 'access_token=' + token

    return {url: url}
  }

  addConditionMenu (token, menu, rule) {
    const url = api.menu.addCondition + 'access_token=' + token
    const form = {
      button: menu,
      matchrule: rule
    }

    return {method: 'POST', url: url, body: form}
  }

  delConditionMenu (token, menuId) {
    const url = api.menu.delCondition + 'access_token=' + token
    const form = {
      menuid: menuId
    }

    return {method: 'POST', url: url, body: form}
  }

  getCurrentMenuInfo (token) {
    const url = api.menu.getInfo + 'access_token=' + token

    return {url: url}
  }

}
