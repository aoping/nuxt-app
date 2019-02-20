import { getAccounts } from './services'
import axios from "../plugins/axios";
import _ from 'lodash'

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
      let res = await getAccounts(page, limit, header)

      if (res.success) commit('SET_ACCOUNTLIST', res.data)

      return res
    } catch (e) {
      if (e.response.status === 401) {
        throw new Error('错误')
      }
    }
  },

  async createAccount({
    commit,
    state
  }, {
    name,
    appID,
    appSecret,
  }) {
    try {
      let res = await axios.post('/api/account', {
        name,
        appID,
        appSecret,
      })

      if (res.success) commit('SET_ACCOUNT', res.data)
      let accountList = [...state.accountList]
      accountList.unshift(res.data)
      commit('SET_ACCOUNTLIST', accountList)
      return res
    } catch (e) {
      if (e.response.status === 401) {
        throw new Error('错误')
      }
    }
  },

  async editAccount({
    commit,
    state
  }, account) {
    try {
      let res = await axios.put('/api/account', {
        ...account
      })

      if (res.success) commit('SET_ACCOUNT', res.data)
      let accountList = [...state.accountList]
      let index = accountList.findIndex(item => item.id === res.data.id)
      accountList.splice(index, 1, res.data)
      commit('SET_ACCOUNTLIST', accountList)
      return res
    } catch (e) {
      if (e.response.status === 401) {
        throw new Error('错误')
      }
    }
  },

  async delAccount({
    commit,
    state
  }, accountid) {
    try {
      let res = await axios.delete('/api/account/' + accountid)
      if (res.success) {
        let accountList = [...state.accountList]
        let index = accountList.findIndex(item => item._id === accountid)
        accountList.splice(index, 1)
        commit('SET_ACCOUNTLIST', accountList)
      }
    } catch (e) {
      if (e.response.status === 401) {
        throw new Error('错误')
      }
    }
  },
}
