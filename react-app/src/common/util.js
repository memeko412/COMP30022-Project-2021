import axios from 'axios'
import { message } from 'antd'
import { getLocal } from '../utils/storage'

const Qs = require('qs')

export const BASE_PATH = '/tm'

function request(obj, isFormData, bol) {
  return new Promise((resolve, reject) => {
    const options = {
      method: obj.method ? obj.method : 'POST',
      url: `${BASE_PATH}${obj.url}`,
      [obj.method === 'GET' ? 'params' : 'data']: isFormData ? Qs.stringify(obj.data) : obj.data,
      headers: {}
    }

    const user = getLocal('userInfo')
    if (user) {
      options.headers.token = user.token
    } else {
      delete options.headers
    }

    axios(options)
      .then(res => {
        // console.log("res1 = ", res)
        if (res.data.code !== '000000') {
          if (res.data.code === 401 || res.data.code === 403) {
            // window.push('/login')
            // reject();
            // return
          } else {
            message.error(res.data.message)
            reject()
            return
          }
        }
        resolve(res.data)
      })
      .catch(err => {
        message.error('A network error has occurred！')
        console.log(err)
        reject()
        // message.error(err.t);
      })
  })
}

// 是否登录
export function isAuth() {
  console.log(window.localStorage.userinfo);
  return window.localStorage.userinfo || window.sessionStorage.userinfo
}

function getQueryVariable(query, variable) {
  var query = query.substring(1)
  var vars = query.split('&')
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=')
    if (pair[0] == variable) {
      return pair[1]
    }
  }
  return false
}

export { request, getQueryVariable }
