import { request } from '../network/request'
interface LoginUser {
  username: string
  password: string
}
// 登录接口
export function getLogin (data: LoginUser) {
  return request({
    method: 'POST',
    url: '/login',
    data
  })
}
// 注册接口
export function getRegister (data: LoginUser) {
  return request({
    method: 'POST',
    url: '/register',
    data
  })
}
