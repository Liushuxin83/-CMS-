<template>
  <div>
    注册页
    <Login />
  </div>
</template>
<script lang="ts">
import Login from '../login/Login.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Register',
  components: {
    Login
  }
  // setup() {
  // },
})
</script>
