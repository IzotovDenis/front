import axios from 'axios'
import getEndPoint from './endpoint'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

const API = {
  buildUri: (path, id = undefined, data = {}) => {
    let params = []
    let token = cookies.get('token')
    let url = process.env.REACT_APP_API_ENDPOINT
    if (token) { data.token = token }
    if (path) { url = `${process.env.REACT_APP_API_ENDPOINT}${path}` }
    if (id) { url = `${url}/${id}` }
    for (let d in data) {
      params.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]))
    }
    let str = params.join('&')
    return `${url}?${str}`
  },
  getOrderItems: (orderId) => {
    let url = API.buildUri(`/orders/${orderId}/items`)
    return axios.get(url)
  },
  setOrderItem: (orderId, items, withItems = false) => {
    let url = API.buildUri(`/orders/${orderId}/add_items`)
    return axios.post(url, {items: items, withItems: withItems})
  },
  deleteOrderItems: (orderId, items, withItems = false) => {
    let url = API.buildUri(`/orders/${orderId}/delete_items`)
    return axios.post(url, {items: items, withItems: withItems})
  },
  deleteOrder: (orderId) => {
   let url = API.buildUri(`/orders/${orderId}`)
   return axios.delete(url) 
  }
  ,
  signIn: (login, password) => {
    let url = `${process.env.REACT_APP_API_ENDPOINT}/users/sign_in`
    return axios.post(url, { user: { email: login, password: password } })
  },
  getToken: () => {
    if (cookies.get('token') !== undefined) {
      let token = cookies.get('token')
      return (encodeURIComponent('token') + '=' + encodeURIComponent(token))
    } else {
      return false
    }
  },
  filtersToString: (filters = {}) => {
    let params = []
    for (let d in filters) {
      params.push(encodeURIComponent(d) + '=' + encodeURIComponent(filters[d]))
    }
    let token = API.getToken()
    if (token) { params.push(token) }
    let str = params.join('&')
    return `${str}`
  },
  getGroup: (id = 1, filters) => {
    let endPoint = getEndPoint('group')
    let params = API.filtersToString(filters)
    let url = `${endPoint}/${id}?${params}`
    return axios.get(url)
  },
  getItem: (itemId) => {
    let url = API.buildUri(`/items`, itemId ,{prop: 1})
    return axios.get(url)
  },
  loadPopularItems: () => {
    let endPoint = getEndPoint('popularItems')
    let params = API.filtersToString()
    let url = `${endPoint}?${params}`
    return axios.get(url)
  }
}

export default API

