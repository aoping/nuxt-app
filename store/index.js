import Vuex from 'vuex'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'

const createStore = () => {
  return new Vuex.Store({
    state: {
      user: null,
      accountList: [],
      account: null,
      topicList: [],
      topic: null,
    },
    getters,
    actions,
    mutations
  })
}
