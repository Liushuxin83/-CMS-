<template>
  <a-layout class="container">
    <a-layout-header class="header">
      <div class="logo">
        <img
          src="https://yun.kyee.com.cn/system/auth/sys/main/img/yunLogo.png"
          alt=""
        />
        <span style="margin-left:10px">医学信息</span>
      </div>
      <a-menu
        theme="dark"
        mode="horizontal"
        v-model:selectedKeys="selectedKeys1"
        :style="{ lineHeight: '64px' }"
      >
        <a-menu-item
          :key="item.key"
          v-for="item in navs"
          @click="onTopMenuItem(item.sub[0].route)"
          >{{ item.name }}</a-menu-item
        >
        <!-- <a-menu-item key="1">服务台</a-menu-item>
        <a-menu-item key="2">门诊科室</a-menu-item>
        <a-menu-item key="3">门诊收费</a-menu-item>
        <a-menu-item key="4">门诊药房</a-menu-item>
        <a-menu-item key="5">注射室</a-menu-item>
        <a-menu-item key="6">化验站</a-menu-item>
        <a-menu-item key="7">影像科</a-menu-item> -->
      </a-menu>
      <span class="currentUser">
        当前用户：{{ usernameComputer }}
        <el-dropdown>
          <i class="el-icon-setting"></i>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>编辑信息</el-dropdown-item>
              <el-dropdown-item @click="onQuirLogin">退出</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </span>
    </a-layout-header>
    <router-view name="HomeWelcom"></router-view>
    <a-layout v-if="$route.path !== '/home/welcome'">
      <a-layout-sider width="200" style="background: #fff">
        <div v-for="item in navs" :key="item.key">
          <a-menu
            mode="inline"
            v-model:selectedKeys="selectedKeys2"
            v-model:openKeys="openKeys"
            :style="{ height: '100%', borderRight: 0 }"
            v-if="selectedKeys1 == item.key"
          >
            <a-menu-item
              :key="item1.key"
              v-for="item1 in item.sub"
              @click="onMenuItem(item1.route)"
              >{{ item1.name }}</a-menu-item
            >
          </a-menu>
        </div>
      </a-layout-sider>
      <a-layout style="padding: 0 24px 24px;margin-top:30px">
        <router-view></router-view>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<script lang="ts">
import {
  computed,
  defineComponent,
  reactive,
  ref,
  toRefs,
  watchEffect
} from 'vue'
import { useRoute, useRouter } from 'vue-router'
export default defineComponent({
  setup () {
    const router = useRouter()
    const route = useRoute()
    const state = reactive({
      navs: [
        {
          key: 1,
          name: '服务台',
          sub: [{ key: 1, name: '发卡', route: 'sendcard' }]
        },
        {
          key: 2,
          name: '门诊科室',
          sub: [
            { key: 1, name: '叫号', route: 'calling' },
            { key: 2, name: '病历', route: 'medicalhistory' },
            { key: 3, name: '处方', route: 'prescription' },
            { key: 4, name: '检查', route: 'inspect' },
            { key: 5, name: '化验', route: 'test' }
          ]
        },
        {
          key: 3,
          name: '门诊收费',
          sub: [
            { key: 1, name: '挂号', route: 'gcrad' },
            { key: 2, name: '收费', route: 'charge' }
          ]
        }
        // ,
        // {
        //   key: 4,
        //   name: '门诊药房',
        //   sub: [{ key: 1, name: '申请' }]
        // },
        // {
        //   key: 5,
        //   name: '注射室',
        //   sub: [
        //     { key: 1, name: '打针' },
        //     { key: 2, name: '输液' }
        //   ]
        // },
        // { key: 6, name: '化验站', sub: [{ key: 1, name: '申请' }] },
        // { key: 7, name: '影像科', sub: [{ key: 1, name: '申请' }] }
      ]
    })
    const selectedKeys1 = ref<number[]>([1])
    const selectedKeys2 = ref<number[]>([1])
    const openKeys = ref<string[]>(['sub1'])
    // 菜单栏点击事件
    const onMenuItem = (menuItemRoute: string) => {
      // console.log(menuItemRoute)
      router.push(`/${menuItemRoute}`)
    }
    // 顶部菜单点击事件
    const onTopMenuItem = (topMenuItemRoute: string) => {
      // console.log(topMenuItemRoute)
      router.push(`/${topMenuItemRoute}`)
    }
    watchEffect(() => {
      // console.log(route.path)
      if (route.path === '/home/welcome') {
        selectedKeys1.value = [0]
        // localStorage.setItem('selectVal', '0')
      } else if (route.path === '/calling') {
        selectedKeys1.value = [2]
        // localStorage.setItem('selectVal', '2')
      } else if (route.path === '/medicalhistory') {
        selectedKeys1.value = [2]
        selectedKeys2.value = [2]
      } else if (route.path === '/prescription') {
        selectedKeys1.value = [2]
        selectedKeys2.value = [3]
      } else if (route.path === '/inspect') {
        selectedKeys1.value = [2]
        selectedKeys2.value = [4]
      } else if (route.path === '/test') {
        selectedKeys1.value = [2]
        selectedKeys2.value = [5]
      }
    })
    const usernameComputer = computed(() => {
      return localStorage.getItem('userInfoUsername')
    })
    // 退出登录
    const onQuirLogin = () => {
      localStorage.removeItem('userInfoUsername')
      localStorage.removeItem('userInfoToken')
      router.push('/login')
    }
    return {
      ...toRefs(state),
      selectedKeys1,
      selectedKeys2,
      collapsed: ref<boolean>(false),
      openKeys,
      onMenuItem,
      onTopMenuItem,
      usernameComputer,
      onQuirLogin
    }
  }
})
</script>
<style lang="less" scoped>
.container {
  min-width: 800px;
  .header {
    display: flex;
    justify-content: space-between;
  }
  .currentUser {
    color: #fff;
    font-size: 20px;
    line-height: 64px;
    .el-icon-setting {
      margin-left: 20px;
      font-size: 20px;
      color: #fff;
    }
  }
}
.ant-layout {
  height: 100vh;
}
.logo {
  float: left;
  width: 200px;
  height: 31px;
  margin: 0px 24px 16px 0;
  color: #fff;
  font-size: 20px;
}
</style>
