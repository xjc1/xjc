import axios from './axios'

export function addMajorRecord(majorRecord = {}) {
  return axios({
    url: '/addMajorRecord',
    params: {
      ...majorRecord
    }
  })
}
export function modifyMajorRecord(majorRecord = {}) {
  return axios({
    url: '/modifyMajorRecord',
    params: {
      ...majorRecord
    }
  })
}
export function searchMajorRecord(majorRecord = {}) {
  return axios({
    url: '/searchMajorRecord',
    params: {
      ...majorRecord
    }
  })
}

export function deleteMajorRecord(id = '') {
  return axios({
    url: '/deleteMajorRecord',
    params: {
      id
    }
  })
}

