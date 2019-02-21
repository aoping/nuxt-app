import axios from "../plugins/axios";

export async function getAccounts(page, limit, header) {
  let res = await axios.get('/api/accounts?page='+page+'&limit='+limit, header)
  return res
}

export async function getTopics(page, limit, header) {
  let res = await axios.get('/api/topics?page='+page+'&limit='+limit, header)
  return res
}

export async function getTopic(id) {
  let res = await axios.get('/api/topic/' + id)
  return res
}
