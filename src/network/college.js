import axios from './axios'

export function addCollegeInfo(collegeInfo = {}) {
  return axios({
    url: '/addCollege',
    params: {
      ...collegeInfo
    }
  })
}
export function modifyCollegeInfo(collegeInfo = {}) {
  return axios({
    method:'post',
    url: '/modifyCollegeInfo',
    data: {
      ...collegeInfo
    }
  })
}
export function searchCollegeInfo(collegeInfo = {}) {
  return axios({
    url: '/searchCollegeInfo',
    params: {
      ...collegeInfo
    }
  })
}

export function deleteCollegeInfo(id = '') {
  return axios({
    url: '/deleteCollegeInfo',
    params: {
      id
    }
  })
}

