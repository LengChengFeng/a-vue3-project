<template>
  <div class="login-user">
    <el-form :model="account" :rules="rules" label-width="70px" ref="formRef">
      <el-form-item label="用户名" prop="name">
        <el-input v-model="account.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
// import localCache from '@/utils/cache'
import localCache from '../../../utils/cache'
import { ElForm, ElMessage } from 'element-plus'
import { reactive } from 'vue'
//验证规则
import { rules } from '../config/user-config'
export default defineComponent({
  setup() {
    const store = useStore()
    const formRef = ref<InstanceType<typeof ElForm>>()
    const login = (isKeepPassword: boolean) => {
      formRef.value?.validate((valid) => {
        if (valid) {
          //判断是否记住密码
          if (isKeepPassword) {
            //本地缓存
            localCache.setCache('name', account.name)
            localCache.setCache('password', account.password)
          } else {
            localCache.deleteCache('name')
            localCache.deleteCache('password')
          }
          console.log('登录成功')
          store.dispatch('login/accountLoginAction', { ...account })
        } else {
          ElMessage.error('请检查用户名和密码')
          console.log('登录失败')
        }
        console.log(valid)
      })
    }
    const account = reactive({
      name: localCache.getCache('name') ?? '',
      password: localCache.getCache('password') ?? ''
    })
    return {
      account,
      rules,
      login,
      formRef
    }
  }
})
</script>

<style>
</style>
