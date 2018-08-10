import axios from 'axios'
import config from '../config'

export default {
  get (url, ...args) {
    return axios.get(url, ...args).then(res => res.data)
  },
  post (url, ...args) {
    return axios.get(url, ...args).then(res => res.data)
  }
}
