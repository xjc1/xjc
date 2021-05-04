import axios from './axios'


export function login(loginInfo = {}) {
  return axios({
    url: '/login',
    params: {
      ...loginInfo
    }
  })
}

export function register(registerInfo = {}) {
  return axios({
    url: '/register',
    params: {
      ...registerInfo,
    }
  })
}

export function serachUserList(data = {}) {
  return axios({
    url: '/userList',
    params: {
      ...data,
    }
  })
}
export function deletUser(id = '') {
  return axios({
    url: '/deletUser',
    params: {
      id,
    }
  })
}
