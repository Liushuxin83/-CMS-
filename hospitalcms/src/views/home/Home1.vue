<template>
  <div class="home">
    <!-- home布局容器 -->
    <el-container class="home-container">
      <el-header class="home-header">
        <span>Vue3+Typescript后台管理系统</span>
        <span>
          欢迎---
          <span style="color:#F56C6C">{{ userInfoUsername }}</span>
          <el-dropdown>
            <el-icon
              class="el-icon-setting"
              style="margin: 16px;font-size:30px"
            ></el-icon>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="onEdidUserInfo"
                  >编辑信息</el-dropdown-item
                >
                <el-dropdown-item @click="onQuitLogin">退出</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <!-- <el-button class="quit-login" @click="onQuitLogin"
            >退出登录</el-button
          > -->
        </span>
      </el-header>
      <el-container>
        <el-aside width="200px" class="home-aside">
          <!-- <home-aside></home-aside> -->
        </el-aside>
        <el-container>
          <el-main class="home-main">
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>
<script lang="ts">
import { ElNotification } from 'element-plus'
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
// import HomeAside from '../views/HomeAside.vue'
export default defineComponent({
  components: {
    // HomeAside
  },
  setup () {
    const router = useRouter()
    const userInfoUsername = ref(
      window.localStorage.getItem('userInfoUsername')
    )
    const onEdidUserInfo = () => {
      ElNotification({
        type: 'info',
        title: '消息',
        message: '您点击了编辑信息',
        duration: 2000
      })
    }
    const onQuitLogin = () => {
      router.push('/login')
      window.localStorage.removeItem('userInfoToken')
      window.localStorage.removeItem('userInfoUsername')
      window.sessionStorage.removeItem('activePath')
    }
    return {
      userInfoUsername,
      onQuitLogin,
      onEdidUserInfo
    }
  }
})
</script>
<style lang="less" scoped>
.home {
  height: 100%;
  min-width: 800px;
}
.home-container {
  height: 100%;
  .home-header {
    display: flex;
    justify-content: space-between;
    background-color: #373d41;
    font-size: 30px;
    color: #fff;
    line-height: 60px;
  }
  .home-aside {
    background-color: #333744;
  }
  .home-main {
    background-color: #eaedf1;
  }
}
</style>
