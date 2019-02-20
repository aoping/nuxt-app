const R = require('ramda');
import config from '@/config'
export const accounts = state => {
  let res = []
  state.accountList && state.accountList.map(item => {
    res.push(Object.assign({}, item , {hearlink: `${config.hearlink}/${item._id}`}))
  })
  return res
  // const f = R.compose(
  //   R.forEach(item => item.hearlink = `${config.hearlink}/${item._id}`),
  //   R.filter(item=>item.actived)
  // )
  // return f(state.accountList)
  // return state.accountList
}
