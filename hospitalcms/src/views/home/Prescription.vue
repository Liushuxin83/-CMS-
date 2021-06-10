<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home/welcome' }"
        >首页</el-breadcrumb-item
      >
      <el-breadcrumb-item>服务台</el-breadcrumb-item>
      <el-breadcrumb-item>处方</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="content">
      <!-- 搜索框 -->
      <el-row :gutter="20">
        <el-col :span="10">
          <el-input placeholder="请输入内容" v-model="searchContent" clearable>
            <template #append>
              <el-button
                icon="el-icon-search"
                @click="onSearchPrescription"
              ></el-button>
            </template>
          </el-input>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" @click="addPrescription"
            >添加处方</el-button
          >
        </el-col>
      </el-row>
      <!-- 表格 -->
      <el-table
        :data="PrescriptionData"
        style="width: 100%"
        :border="true"
        :stripe="true"
      >
        <el-table-column
          prop="prescription_number"
          label="处方编号"
          width="100"
        >
        </el-table-column>
        <el-table-column prop="clinic_card_number" label="就诊卡号" width="100">
        </el-table-column>
        <el-table-column
          prop="treatmentdepartment"
          label="就诊科室"
          width="100"
        >
        </el-table-column>
        <el-table-column prop="prescription_time" label="开具时间" width="180">
        </el-table-column>
        <el-table-column prop="clinical_diagnosis" label="临床诊断" width="180">
        </el-table-column>
        <el-table-column prop="doctor" label="医师" width="180">
        </el-table-column>
        <el-table-column prop="drug_amount" label="总金额" width="180">
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button type="primary" size="mini" @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        :page-sizes="[1, 3, 5, 10]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
  </div>
  <!-- 添加处方 dialog -->
  <el-dialog
    title="添加处方"
    v-model="addPrescriptionDialogVisible"
    width="600px"
    @closed="dialogClosed"
  >
    <!-- 添加处方form表单 -->
    <el-form
      :model="addPrescriptionForm"
      :rules="addPrescriptionFormRules"
      ref="addPrescriptionFormRef"
      label-width="100px"
    >
      <el-form-item label="处方编号：" prop="prescription_number">
        <el-input v-model="addPrescriptionForm.prescription_number"></el-input>
      </el-form-item>
      <el-form-item label="就诊卡号：" prop="clinic_card_number">
        <el-input v-model="addPrescriptionForm.clinic_card_number"></el-input>
      </el-form-item>
      <el-form-item label="就诊科室：" prop="treatmentdepartment">
        <el-input v-model="addPrescriptionForm.treatmentdepartment"></el-input>
      </el-form-item>
      <el-form-item label="临床诊断：" prop="clinical_diagnosis">
        <el-checkbox-group v-model="addPrescriptionForm.clinical_diagnosis">
          <el-checkbox label="视诊" name="clinical_diagnosis">视诊</el-checkbox>
          <el-checkbox label="问诊" name="clinical_diagnosis">问诊</el-checkbox>
          <el-checkbox label="触诊" name="clinical_diagnosis">触诊</el-checkbox>
          <el-checkbox label="嗅诊" name="clinical_diagnosis">嗅诊</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="医师：" prop="doctor">
        <el-input v-model="addPrescriptionForm.doctor"></el-input>
      </el-form-item>
      <el-form-item label="总金额：" prop="drug_amount">
        <el-input v-model="addPrescriptionForm.drug_amount"></el-input>
      </el-form-item>
    </el-form>
    <!-- dialog底部 -->
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="addPrescriptionDialogVisible = false"
          >取 消</el-button
        >
        <el-button type="primary" @click="confirmAddPrescription"
          >确 定</el-button
        >
      </span>
    </template>
  </el-dialog>
  <!-- 编辑对话框 -->
  <el-dialog
    title="添加处方"
    v-model="editPrescriptionDialogVisible"
    width="600px"
    @closed="editDialogClosed"
  >
    <!-- 编辑处方form表单 -->
    <el-form
      :model="editPrescriptionForm"
      :rules="editPrescriptionFormRules"
      ref="editPrescriptionFormRef"
      label-width="100px"
    >
      <el-form-item label="处方编号：" prop="prescription_number">
        <el-input
          v-model="editPrescriptionForm.prescription_number"
          disabled
        ></el-input>
      </el-form-item>
      <el-form-item label="就诊卡号：" prop="clinic_card_number">
        <el-input
          v-model="editPrescriptionForm.clinic_card_number"
          disabled
        ></el-input>
      </el-form-item>
      <el-form-item label="就诊科室：" prop="treatmentdepartment">
        <el-input v-model="editPrescriptionForm.treatmentdepartment"></el-input>
      </el-form-item>
      <el-form-item label="临床诊断：" prop="clinical_diagnosis">
        <el-checkbox-group v-model="editPrescriptionForm.clinical_diagnosis">
          <el-checkbox label="视诊" name="clinical_diagnosis">视诊</el-checkbox>
          <el-checkbox label="问诊" name="clinical_diagnosis">问诊</el-checkbox>
          <el-checkbox label="触诊" name="clinical_diagnosis">触诊</el-checkbox>
          <el-checkbox label="嗅诊" name="clinical_diagnosis">嗅诊</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="医师：" prop="doctor">
        <el-input v-model="editPrescriptionForm.doctor"></el-input>
      </el-form-item>
      <el-form-item label="总金额：" prop="drug_amount">
        <el-input v-model="editPrescriptionForm.drug_amount"></el-input>
      </el-form-item>
    </el-form>
    <!-- dialog底部 -->
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="editPrescriptionDialogVisible = false"
          >取 消</el-button
        >
        <el-button type="primary" @click="confirmEditPrescription"
          >确 定</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive, ref, toRefs } from 'vue'
import {
  getPrescriptionData,
  addPrescriptions,
  deletePrescription,
  updatePrescription,
  queryPrescription
} from '../../network/prescription'
import { dateFormat } from '../../utils/date'
import { ElMessage, ElMessageBox } from 'element-plus'
export default defineComponent({
  setup () {
    const state = reactive({
      // 要搜索的值
      searchContent: '',
      // 处方数据
      PrescriptionData: [],
      addPrescriptionForm: {
        prescription_number: null,
        clinic_card_number: null,
        treatmentdepartment: null,
        prescription_time: Date.now(),
        clinical_diagnosis: [],
        doctor: null,
        drug_amount: null
      },
      addPrescriptionFormRules: {
        prescription_number: [
          { required: true, message: '请输入处方编号', trigger: 'blur' }
        ],
        clinic_card_number: [
          { required: true, message: '请输入就诊卡号', trigger: 'blur' }
        ],
        treatmentdepartment: [
          { required: true, message: '请输入就诊科室', trigger: 'blur' }
        ],
        clinical_diagnosis: [
          {
            required: true,
            message: '请选择至少选择一个临床诊断',
            trigger: 'change',
            type: 'array'
          }
        ],
        doctor: [{ required: true, message: '请输入医师', trigger: 'blur' }],
        drug_amount: [
          { required: true, message: '请输入金额', trigger: 'blur' }
        ]
      },
      editPrescriptionForm: {
        prescription_number: null,
        clinic_card_number: null,
        treatmentdepartment: null,
        prescription_time: Date.now(),
        clinical_diagnosis: [],
        doctor: null,
        drug_amount: null
      },
      editPrescriptionFormRules: {
        prescription_number: [
          { required: true, message: '请输入处方编号', trigger: 'blur' }
        ],
        clinic_card_number: [
          { required: true, message: '请输入就诊卡号', trigger: 'blur' }
        ],
        treatmentdepartment: [
          { required: true, message: '请输入就诊科室', trigger: 'blur' }
        ],
        clinical_diagnosis: [
          {
            required: true,
            message: '请选择至少选择一个临床诊断',
            trigger: 'change',
            type: 'array'
          }
        ],
        doctor: [{ required: true, message: '请输入医师', trigger: 'blur' }],
        drug_amount: [
          { required: true, message: '请输入金额', trigger: 'blur' }
        ]
      }
    })
    const addPrescriptionDialogVisible = ref<boolean>(false)
    const editPrescriptionDialogVisible = ref<boolean>(false)
    const pageNum = ref<number>(1)
    const pageSize = ref<number>(3)
    const total = ref<number>(0)
    onMounted(() => {
      getPrescriptionDatas(pageNum.value, pageSize.value)
    })
    // 获取处方数据
    const getPrescriptionDatas = async (pageNum: number, pageSize: number) => {
      const { data } = await getPrescriptionData(pageNum, pageSize)
      console.log(data)
      if (data.successNum === 0) {
        // 时间戳处理
        data.data.queryRes.forEach((item: any) => {
          item.prescription_time = dateFormat(item.prescription_time)
        })
        state.PrescriptionData = data.data.queryRes
        total.value = data.data.total
      } else {
        ElMessage.error({ message: '获取处方数据失败！', type: 'error' })
      }
    }
    const handleSizeChange = (newSize: number) => {
      pageNum.value = 1
      pageSize.value = newSize
      // console.log(newSize)
      // console.log(pageNum.value)
      // state.pageSize = newSize
      if (state.searchContent.trim().length === 0) {
        getPrescriptionDatas(pageNum.value, pageSize.value)
      } else {
        queryFunc(pageNum.value, newSize, state.searchContent)
      }
    }
    const handleCurrentChange = (newPage: number) => {
      // console.log(newPage)
      pageNum.value = newPage
      // state.pageSize = newPage
      if (state.searchContent.trim().length === 0) {
        getPrescriptionDatas(pageNum.value, pageSize.value)
      } else {
        queryFunc(newPage, pageSize.value, state.searchContent)
      }
    }
    // 点击添加处方按钮
    const addPrescription = () => {
      addPrescriptionDialogVisible.value = true
    }
    // 确定添加处方
    const addPrescriptionFormRef = ref('')
    const confirmAddPrescription = () => {
      // console.log(111)
      (addPrescriptionFormRef.value as any).validate(
        async (valid: boolean) => {
          if (!valid) return false
          const addData = {
            prescriptionNumber: state.addPrescriptionForm.prescription_number,
            clinicCardNumber: state.addPrescriptionForm.clinic_card_number,
            treatmentdepartment: state.addPrescriptionForm.treatmentdepartment,
            clinicalDiagnosis: state.addPrescriptionForm.clinical_diagnosis,
            doctor: state.addPrescriptionForm.doctor,
            drugAmount: state.addPrescriptionForm.drug_amount
          }
          // console.log(addData)
          // console.log(data)
          // console.log('请求数据')
          const { data } = await addPrescriptions(addData)
          console.log(data)
          if (data.successNum === 0) {
            ElMessage.success({
              message: '添加处方数据成功！',
              type: 'success'
            })
            // 添加成功后刷新数据
            getPrescriptionDatas(pageNum.value, pageSize.value)
            addPrescriptionDialogVisible.value = false
          } else {
            ElMessage.error({
              message: '添加的处方编号不能相同！添加失败',
              type: 'error'
            })
          }
        }
      )
    }
    const dialogClosed = () => {
      (addPrescriptionFormRef.value as any).resetFields()
    }
    // 删除处方数据
    const handleDelete = (row: any) => {
      // console.log(row.prescription_number)
      ElMessageBox.confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const { data } = await deletePrescription(row.prescription_number)
          // console.log(data)
          if (data.successNum === 0) {
            // 删除数据成功后刷新数据
            getPrescriptionDatas(pageNum.value, pageSize.value)
            ElMessage.success({ message: data.data.msg, type: 'success' })
          } else {
            ElMessage.error({ message: '删除处方数据失败！', type: 'error' })
          }
        })
        .catch(() => {
          ElMessage.info({ type: 'info', message: '已取消删除' })
        })
    }
    // 编辑处方数据
    const handleEdit = (row: any) => {
      // console.log(row)
      state.editPrescriptionForm.prescription_number = row.prescription_number
      state.editPrescriptionForm.clinic_card_number = row.clinic_card_number
      state.editPrescriptionForm.treatmentdepartment = row.treatmentdepartment
      state.editPrescriptionForm.clinical_diagnosis = row.clinical_diagnosis.split(
        ','
      )
      state.editPrescriptionForm.doctor = row.doctor
      state.editPrescriptionForm.drug_amount = row.drug_amount
      editPrescriptionDialogVisible.value = true
    }
    // 点击编辑对话框的确认按钮
    const confirmEditPrescription = async () => {
      // console.log(111)
      const updateData = {
        prescriptionNumber: state.editPrescriptionForm.prescription_number,
        treatmentdepartment: state.editPrescriptionForm.treatmentdepartment,
        clinicalDiagnosis: Array.from(
          state.editPrescriptionForm.clinical_diagnosis
        ),
        doctor: state.editPrescriptionForm.doctor,
        drugAmount: state.editPrescriptionForm.drug_amount
      }
      // console.log(updateData.clinicalDiagnosis)
      const { data } = await updatePrescription(updateData)
      console.log(data)
      if (data.successNum === 0) {
        ElMessage.success({ message: data.data.msg, type: 'success' })
        // 更新数据成功后刷新数据
        getPrescriptionDatas(pageNum.value, pageSize.value)
        editPrescriptionDialogVisible.value = false
      } else {
        ElMessage.error({ message: '更新数据失败!', type: 'error' })
      }
      // editPrescriptionDialogVisible = false
    }
    // 查询处方
    const onSearchPrescription = async () => {
      // console.log(1111)
      // if(state.searchContent.trim().length===0){}
      // console.log(pageNum, pageSize, query)
      queryFunc(1, 3, state.searchContent)
      // const { data } = await queryPrescription(
      //   pageNum.value,
      //   pageSize.value,
      //   state.searchContent
      // )
      // // console.log(data)
      // if (data.successNum === 0) {
      //   total.value = data.data.total
      //   state.PrescriptionData = data.data.data
      //   ElMessage.success({ message: '查询数据成功!', type: 'success' })
      //   // pageNum.value = 1
      //   // pageSize.value = 3
      //   // console.log(total.value, pageNum.value, pageSize.value)
      // } else {
      //   ElMessage.error({ message: '查询数据失败!', type: 'error' })
      // }
    }
    // 封装查询方法
    const queryContent = state.searchContent
    const pageNum1 = pageNum.value
    const pageSize1 = pageSize.value
    const queryFunc = async (
      pageNum1: number,
      pageSize1: number,
      queryContent: string
    ) => {
      const { data } = await queryPrescription(
        pageNum1,
        pageSize1,
        queryContent
      )
      // console.log(data)
      if (data.successNum === 0) {
        total.value = data.data.total
        state.PrescriptionData = data.data.data
        ElMessage.success({ message: '查询数据成功!', type: 'success' })
        // pageNum.value = 1
        // pageSize.value = 3
        // console.log(total.value,pageNum.value, pageSize.value)
      } else {
        ElMessage.error({ message: '查询数据失败!', type: 'error' })
      }
    }
    return {
      ...toRefs(state),
      handleSizeChange,
      handleCurrentChange,
      pageNum,
      pageSize,
      total,
      addPrescription,
      addPrescriptionDialogVisible,
      confirmAddPrescription,
      addPrescriptionFormRef,
      dialogClosed,
      handleDelete,
      handleEdit,
      editPrescriptionDialogVisible,
      confirmEditPrescription,
      onSearchPrescription
    }
  }
})
</script>
<style lang="less" scoped>
.content {
  margin-top: 20px;
  .el-table {
    margin-top: 40px;
  }
  .el-pagination {
    margin-top: 30px;
  }
}
</style>
