import axios from "../plugins/axios";

export async function getAccounts(page, limit, header) {
  let res = await axios.get('/api/accounts?page='+page+'&limit='+limit, header)
  return res
}
