<template>
  <router-view></router-view>
</template>
<script lang="ts">
import axios from 'axios'
import { defineComponent, onMounted } from 'vue'
import { getLogin } from '../src/network/login'
import { dateFormat } from '../src/utils/date'
export default defineComponent({})
</script>

<style lang="less">
@import url('./assets/css/base.less');
</style>
