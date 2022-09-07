<template>
  <div class="login-phone">
    <el-form :model="Phone" :rules="PhoneRules" label-width="70px">
      <el-form-item label="手机号" prop="tel">
        <el-input v-model="Phone.tel"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="verificationCode">
        <div class="getCode">
          <el-input v-model="Phone.verificationCode"></el-input>
          <el-button type="primary" class="varification">验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { defineComponent, reactive } from 'vue'
export default defineComponent({
  setup() {
    const PhoneRules = {
      tel: [
        { required: true, message: '请输入手机号码', trigger: 'blur' },
        {
          pattern: /^[0-9]{11,}$/,
          message: '请输入正确的手机号码',
          trigger: 'blur'
        }
      ],
      verificationCode: [
        { required: true, message: '请输入验证码', trigger: 'blur' },
        {
          pattern: /^[a-z0-9]{6,16}$/,
          message: '验证码出错',
          trigger: 'blur'
        }
      ]
    }
    const Phone = reactive({
      tel: '',
      verificationCode: ''
    })
    return {
      Phone,
      PhoneRules
    }
  }
})
</script>

<style scoped>
.getCode {
  display: flex;
}
.varification {
  margin-left: 10px;
}
</style>
