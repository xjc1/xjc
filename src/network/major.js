import axios from './axios'

export function addMajor(majorInfo = {}) {
  return axios({
    url: '/addMajor',
    params: {
      ...majorInfo
    }
  })
}
export function modifyMajor(majorInfo = {}) {
  return axios({
    url: '/modifyMajor',
    params: {
      ...majorInfo
    }
  })
}
export function searchMajor(majorInfo = {}) {
  return axios({
    url: '/searchMajor',
    params: {
      ...majorInfo
    }
  })
}

export function deleteMajor(id = '') {
  return axios({
    url: '/deleteMajor',
    params: {
      id
    }
  })
}

