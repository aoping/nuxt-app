export default {
  SET_USER: (state, user) => {
    state.user = user
  },

  SET_ACCOUNTLIST: (state, accountList) => {
    state.accountList = accountList
  },
  SET_ACCOUNT: (state, account) => {
    state.account = account
  },

  SET_TOPICLIST: (state, topicList) => {
    state.topicList = topicList
  },
  SET_TOPIC: (state, topic) => {
    state.topic = topic
  },

  SET_AUTHUSER: (state, authUser) => {
    state.authUser = authUser
  }
}
