<template>
  <div class="my-searchs">
    <my-form v-bind="formItems" v-model="formData">
      <template #header>
        <h1 class="header">高级检索</h1>
      </template>
      <template #footer>
        <div class="handle-btns">
          <el-button icon="el-icon-refresh" @click="handleResetClick"
            >重置</el-button
          >
          <el-button type="primary" icon="el-icon-search" @click="handleQuqry"
            >搜索</el-button
          >
        </div>
      </template>
    </my-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import MyForm from '@/base-ui/form/MyForm.vue'
export default defineComponent({
  emits: ['btnReset', 'btnQuery'],
  components: {
    MyForm
  },
  props: {
    formItems: {
      type: Object,
      require: true
    }
  },
  setup(props, { emit }) {
    const formItems = props.formItems?.formItems ?? []
    const formOriginData: any = {}
    for (const item of formItems) {
      console.log(item)
      formOriginData[item.field] = ''
    }
    const formData = ref(formOriginData)
    //重置
    const handleResetClick = () => {
      for (const key in formOriginData) {
        formData.value[`${key}`] = formOriginData[key]
        emit('btnReset')
      }
    }
    //查询
    const handleQuqry = () => {
      emit('btnQuery', formData.value)
    }
    return {
      formData,
      handleResetClick,
      handleQuqry
    }
  }
})
</script>

<style lang="less">
.handle-btns {
  text-align: right;
  padding: 0 50px 20px 0;
}
</style>
