import axios from './axios'

export function addCollegeRecord(CollegeRecordInfo = {}) {
  return axios({
    url: '/addCollegeRecord',
    params: {
      ...CollegeRecordInfo
    }
  })
}
export function modifyCollegeRecord(CollegeRecordInfo = {}) {
  return axios({
    url: '/modifyCollegeRecord',
    params: {
      ...CollegeRecordInfo
    }
  })
}
export function searchCollegeRecord(CollegeRecordInfo = {}) {
  return axios({
    url: '/searChcollegeRecord',
    params: {
      ...CollegeRecordInfo
    }
  })
}

export function deleteCollegeRecord(id = '') {
  return axios({
    url: '/deleteCollegeRecord',
    params: {
      id
    }
  })
}

