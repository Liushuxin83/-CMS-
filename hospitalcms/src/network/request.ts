import { ElLoading } from 'element-plus'
// vue3中引入路由以及使用路由中的方法需要这样  不能引入useRouter()
import router from '@/router'
/*
  封装axios
 */
import axios from 'axios'
// axios的config参数接口约束
// interface axiosConfig {
//   method: string
//   url: string
//   data?: any
//   params?: any
// }
export function request (config: any) {
  // 1.创建axios的实例
  const instance = axios.create({
    baseURL: 'http://localhost:8080/api/',
    timeout: 10000,
    headers: {
      'Content-type': 'application/json'
    }
  })
  // 拦截器
  // Add a request interceptor
  instance.interceptors.request.use(
    function (config) {
      ElLoading.service({
        background: 'transparent'
      })
      // Do something before request is sent
      // console.log(config)
      // if (window.localStorage.getItem('userInfoToken')) {
      //   config.headers.Authorization = window.localStorage.getItem(
      //     'userInfoToken'
      //   )
      //   return config
      // } else {
      //   return config
      // }
      return config
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error)
    }
  )

  // Add a response interceptor
  instance.interceptors.response.use(
    function (response) {
      ElLoading.service({ background: 'transparent' }).close()
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      // console.log(response);
      return response
    },
    function (error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      // 响应错误会返回404
      // console.log(error)
      ElLoading.service({ background: 'transparent' }).close()
      router.push('/error')
      return Promise.reject(error)
    }
  )

  // 发送网络请求
  return instance(config)
}
