import axios from "../plugins/axios";

export async function getAccounts(page, limit, header) {
  let res = await axios.get('/api/accounts?page='+page+'&limit='+limit, header)
  return res
}

export async function getAllTopics(page, limit) {
  let res = await axios.get('/api/topiclist?page='+page+'&limit='+limit)
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

export async function getWechatOAuth (url) {
  return axios.get(`/wechat-oauth?url=${encodeURIComponent(url)}`)
}

export function getWechatSignature (url) {
  return axios.get(`/wechat-signature?url=${url}`)
}
