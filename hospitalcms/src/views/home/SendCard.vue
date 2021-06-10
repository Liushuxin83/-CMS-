<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home/welcome' }"
        >首页</el-breadcrumb-item
      >
      <el-breadcrumb-item>服务台</el-breadcrumb-item>
      <el-breadcrumb-item>发卡</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="content">
      <el-form
        :model="sendCardForm"
        :rules="sendCardRules"
        ref="sendCardFormRef"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="就诊卡号：" prop="cardNum">
          <el-input v-model="sendCardForm.cardNum"></el-input>
        </el-form-item>
        <el-form-item label="姓名：" prop="username">
          <el-input v-model="sendCardForm.username"></el-input>
        </el-form-item>
        <el-form-item label="性别：" prop="sex">
          <el-radio
            v-model="sendCardForm.sex"
            label="0"
            @change="sexRadioChange"
            >男</el-radio
          >
          <el-radio
            v-model="sendCardForm.sex"
            label="1"
            @change="sexRadioChange"
            >女</el-radio
          >
        </el-form-item>
        <el-form-item label="身份证号：" prop="idCard">
          <el-input v-model="sendCardForm.idCard"></el-input>
        </el-form-item>
        <el-form-item label="手机号：" prop="phone">
          <el-input v-model="sendCardForm.phone"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" class="send_card_btn" @click="onSendCard"
        >发放就诊卡</el-button
      >
    </el-card>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from 'vue'
import { sendCardApi } from '../../network/sendcard'
import { ElMessage } from 'element-plus'
// const checkEmail = (rule: any, value: string, callback: any) => {
// const regEmail = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,5}$/
// if (regEmail.test(value)) { // // 说明这是合法的email // return callback() //
// }
// callback(new Error('请输入合法的邮箱')) // }

const checkPhone = (rule: any, value: string, callback: any) => {
  const regPhone = /^1[3456789]\d{9}$/
  if (regPhone.test(value)) {
    return callback()
  }
  callback(new Error('请输入合法的手机号'))
}
const checkIdCard = (rule: any, value: string, callback: any) => {
  const regIdCard = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
  if (regIdCard.test(value)) {
    return callback()
  }
  callback(new Error('请输入合法的身份证号'))
}
export default defineComponent({
  setup () {
    const state = reactive({
      sendCardForm: {
        cardNum: '',
        username: '',
        sex: '',
        idCard: '',
        phone: ''
      },
      sendCardRules: {
        cardNum: [
          { required: true, message: '请输入就诊卡号', trigger: 'blur' }
        ],
        username: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        sex: [{ required: true, message: '请选择性别', trigger: 'change' }],
        idCard: [
          { required: true, message: '请输入身份证号', trigger: 'change' },
          { validator: checkIdCard, trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'change' },
          { validator: checkPhone, trigger: 'blur' }
        ]
      }
    })
    // 性别单选按钮触发此事件
    const sexRadioChange = () => {
      console.log(state.sendCardForm.sex)
    }
    // 点击发放就诊卡按钮
    // ref必须return出去 ！！！！重要
    const sendCardFormRef = ref('')
    const onSendCard = () => {
      (sendCardFormRef.value as any).validate(async (valid: boolean) => {
        // console.log(valid)
        if (!valid) return false
        const sendCardData = {
          cardid: state.sendCardForm.cardNum,
          name: state.sendCardForm.username,
          sex: state.sendCardForm.sex,
          mobile: state.sendCardForm.phone,
          idcard: state.sendCardForm.idCard
        }
        // console.log(sendCardData)
        const { data } = await sendCardApi(sendCardData)
        console.log(data)
        if (data.errorNum === -1) {
          ElMessage.error({ message: data.data.message, type: 'error' })
        } else if (data.successNum === 0) {
          ElMessage.success({ message: data.msg, type: 'success' })
        }
      })
    }
    return {
      ...toRefs(state),
      sexRadioChange,
      onSendCard,
      sendCardFormRef
    }
  }
})
</script>
<style lang="less" scoped>
.content {
  margin-top: 20px;
  .send_card_btn {
    margin-left: 100px;
  }
  .el-input {
    width: 400px;
  }
}
</style>
