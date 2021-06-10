<template>
  <div class="container">
    <el-row :gutter="20">
      <el-col :span="14">
        <el-card style="height:550px">
          <h2>今日预约</h2>
          <!-- table表格 -->
          <el-table :data="clinicList" style="width: 100%" stripe border>
            <el-table-column prop="cardid" label="就诊卡号" width="180">
            </el-table-column>
            <el-table-column prop="name" label="姓名"> </el-table-column>
            <el-table-column label="性别">
              <template #default="scope">
                <span v-if="scope.row.sex == 0">男</span>
                <span v-else>女</span>
              </template>
            </el-table-column>
            <el-table-column prop="mobile" label="手机号"> </el-table-column>
            <el-table-column prop="idcard" label="身份证号" width="180">
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card style="height:550px">
          <span>通知公告</span>
          <el-calendar v-model="value"> </el-calendar>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue'
import { getClinicList } from '../../network/cliniccard'
import { ElMessage } from 'element-plus'
export default defineComponent({
  setup () {
    const state = reactive({
      clinicList: [],
      value: new Date()
    })
    onMounted(() => {
      getClinicListData()
    })
    const getClinicListData = async () => {
      const { data } = await getClinicList()
      console.log(data)
      if (data.successNum === 0) {
        state.clinicList = data.data.data
        ElMessage.success({
          message: '获取就诊卡列表数据成功！',
          type: 'success'
        })
      } else {
        ElMessage.error({ message: '获取就诊卡列表数据失败', type: 'error' })
      }
    }
    return {
      ...toRefs(state)
    }
  }
})
</script>
<style lang="less" scoped>
.container {
  margin-top: 40px;
  margin-left: 100px;
}
</style>
