import { createApp } from 'vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
// 解决element-plus中el-pagination分页组件显示英文
import locale from 'element-plus/lib/locale/lang/zh-cn' // element-plus

import App from './App.vue'
import router from './router'
import store from './store'

createApp(App)
  .use(Antd)
  .use(store)
  .use(router)
  .use(ElementPlus, {
    locale
  })
  .mount('#app')
