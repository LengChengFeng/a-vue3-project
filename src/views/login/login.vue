<template>
  <div class="login">
    <div class="login_box">
      <h2>后台管理系统</h2>
      <!-- 登录框 -->
      <el-tabs type="border-card" stretch v-model="currentTabs">
        <!-- 用户名密码登录 -->
        <el-tab-pane name="account">
          <template #label>
            <span><i class="el-icon-user-solid"></i>账号登录</span>
          </template>
          <login-account ref="accountRef"></login-account>
        </el-tab-pane>
        <!-- 手机号登录 -->
        <el-tab-pane name="phone">
          <template #label>
            <span><i class="el-icon-mobile-phone"></i>手机号登陆</span>
          </template>
          <login-phone></login-phone>
        </el-tab-pane>
      </el-tabs>
      <!-- 记住密码 -->
      <div class="account-control">
        <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
        <el-link type="primary">忘记密码</el-link>
      </div>
      <!-- 立即登录 -->
      <div class="account-login">
        <el-button type="primary" class="go-login" @click="loginAction"
          >立即登录</el-button
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import loginAccount from './loginCpn/loginAccount.vue'
import loginPhone from './loginCpn/loginPhone.vue'
export default defineComponent({
  components: {
    loginAccount,
    loginPhone
  },
  setup() {
    //是否记住密码
    const isKeepPassword = ref(false)
    //拿到accouunt组件对象
    const accountRef = ref<InstanceType<typeof loginAccount>>()
    //记录currennt
    const currentTabs = ref<string>('account')
    const loginAction = () => {
      if (currentTabs.value === 'account') {
        console.log('账号登录')
      } else {
        console.log('手机登录')
      }
      console.log('正在发送登录请求')
      accountRef.value?.login(isKeepPassword.value)
    }
    return {
      isKeepPassword,
      loginAction,
      accountRef,
      currentTabs
    }
  }
})
</script>

<style lang="less" scoped>
body {
  background-color: #2b4b6b;
  width: 100%;
  height: 100vh;
  z-index: 11;
}
h2 {
  margin-bottom: 10px;
}
.account-control {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  padding: 0 8px;
}
.account-login {
  margin-top: 15px;
  width: 100%;
  .go-login {
    width: 100%;
  }
}
.login {
  background: url('../../assets/img/login-bg.svg');
  width: 100%;
  height: 100vh;
}
.login_box {
  width: 350px;
  height: 400px;
  text-align: center;
  border-radius: 7px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
