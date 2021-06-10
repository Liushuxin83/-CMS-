<template>
  <div class="error">
    <div class="main"></div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({})
</script>

<style>
.error {
  height: 500px;
  width: 1225px;
  margin: 0 auto;
}
.error .main {
  margin: 0 362.5px;
  height: 100vh;
  /* background: url(../../assets/imgs/error.png) no-repeat; */
  background: url(../../assets/images/error.png) no-repeat;
}
</style>
