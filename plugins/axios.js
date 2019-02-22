import originAxios from 'axios'
import qs from 'qs'

const axios = originAxios.create({
  // baseURL: 'https://cnodejs.org/api/v1',
  baseURL: '/',
  headers: {
    // post: {
    //   'Content-Type': 'application/x-www-form-urlencoded'
    // }
  }
})



// Add a request interceptor
axios.interceptors.request.use((config) => {
  // Do something before request is sent
  config.data = qs.stringify(config.data, {
    allowDots: true //Option allowDots can be used to enable dot notation
  })
  return config;
}, (error) => {
  // Do something with request error
  return Promise.reject(error);
});

// // Add a response interceptor
axios.interceptors.response.use((response) => {
  // Do something with response data
  return response && response.data
}, (error) => {
  // Do something with response error
  return error;
});


export default axios
