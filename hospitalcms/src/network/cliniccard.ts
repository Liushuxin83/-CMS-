import { request } from '../network/request'
export function getClinicList () {
  return request({
    method: 'GET',
    url: '/cliniclist'
  })
}
