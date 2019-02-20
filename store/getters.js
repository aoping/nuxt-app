const R = require('ramda');
import config from '@/config'
export const accounts = state => {
  const f = R.compose(
    R.forEach(item => item.hearlink = `${config.hearlink}/${item._id}`),
    R.filter(item=>item.actived)
  )
  return f(state.accountList)
}
