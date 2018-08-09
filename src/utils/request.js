import axios from 'axios'
import config from '../config'

const apiurl = config.apiurl

export default {
  get (url, ...args) {
    return axios.get(apiurl + url, ...args).then(res => res.data)
  },
  post (url, ...args) {
    return axios.get(apiurl + url, ...args).then(res => res.data)
  }
}
