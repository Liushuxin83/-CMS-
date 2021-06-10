import { request } from '../network/request'

// 发放就诊卡数据接口
interface SendCardArgInterface {
  cardid: string
  name: string
  sex: string
  mobile: string
  idcard: string
}
export function sendCardApi (data: SendCardArgInterface) {
  return request({
    method: 'POST',
    url: '/sendcard',
    data
  })
}
