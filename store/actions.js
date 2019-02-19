import { getAccounts } from './services'
import axios from "../plugins/axios";

export default {
  nuxtServerInit({
    commit
  }, {
    req
  }) {
    if (req.session && req.session.user) {
      const {
        email,
        nickname,
        avatarUrl
      } = req.session.user
      const user = {
        email,
        nickname,
        avatarUrl
      }

      commit('SET_USER', user)
    }
  },

  async login({
    commit
  }, {
    email,
    password
  }) {
    try {
      let res = await axios.post('/api/login', {
        email,
        password
      })

      if (res.success) commit('SET_USER', res.data)

      return res
    } catch (e) {
      if (e.response.status === 401) {
        throw new Error('错误')
      }
    }
  },

  async logout({
    commit
  }) {
    let res = await axios.post('/api/logout')

    commit('SET_USER', null)
    return res
  },

  async getAccounts({
    commit
  }, {
    page,
    limit,
    header,
  }) {
    try {
      console.log('headerheaderheader')
      console.log(header)
      let res = await getAccounts(page, limit, header)

      // if (res.success) commit('SET_ACCOUNT', res.data)

      return res
    } catch (e) {
      if (e.response.status === 401) {
        throw new Error('错误')
      }
    }
  },

  async createAccount({
    commit
  }, {
    name,
    AppID,
    AppSecret,
  }) {
    try {
      let res = await axios.post('/api/account', {
        name,
        AppID,
        AppSecret,
      })

      if (res.success) commit('SET_ACCOUNT', res.data)

      return res
    } catch (e) {
      if (e.response.status === 401) {
        throw new Error('错误')
      }
    }
  },
}
