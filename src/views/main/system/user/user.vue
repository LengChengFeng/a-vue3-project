<template>
  <div class="user">
    <my-search
      :formItems="searchInputConfig"
      @btnReset="handleResetClick"
      @btnQuery="handleQueryClick"
    ></my-search>
    <my-tables
      :userTableConfig="userTableConfig"
      :pageName="pageName"
      ref="pageContentRef"
      @handleCreate="handleCreate"
      @handleEdit="handleEdit"
    ></my-tables>
    <page-modal
      titles="新建用户"
      :modalConfig="modalConfigRef"
      :defaultInfo="defaultInfo"
      pageName="users"
      ref="pageModalRef"
    ></page-modal>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import MySearch from '@/components/page-search/searchInfo.vue'
import { searchInputConfig } from './userConfig/searchInputConfig'

import { userTableConfig } from './userConfig/userTabConfig'
import MyTables from '@/components/page-table/MyTables.vue'

import pageModal from '@/components/page-modal/pageModal.vue'
import { userModalConfig } from './userConfig/userModalConfig'

import { usePageSearch } from '@/hook/use-page-search'
import { usePageModal } from '@/hook/use-page-modal'
import store from '@/store'
export default defineComponent({
  components: {
    MyTables,
    MySearch,
    pageModal
  },
  name: 'user',
  setup() {
    const pageName = 'users'
    //搜索和重置
    const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch()
    //处理新建和编辑密码框显示的问题
    const newCalback = () => {
      const passwordItem = userModalConfig.formItems.find(
        (item) => item.field === 'password'
      )
      if (passwordItem) {
        passwordItem.isHidden = false
      }
    }
    const createCalback = () => {
      const passwordItem = userModalConfig.formItems.find(
        (item) => item.field === 'password'
      )
      if (passwordItem) {
        passwordItem.isHidden = true
      }
    }
    //处理部门选择器和角色选择器
    const modalConfigRef = computed(() => {
      const departmentItem = userModalConfig.formItems.find(
        (item) => item.field === 'departmentId'
      )
      if (departmentItem) {
        departmentItem!.options = store.state.entireDepartment?.map((item) => {
          return { title: item.name, value: item.id }
        })
      }
      const roleItem = userModalConfig.formItems.find(
        (item) => item.field === 'roleId'
      )
      if (roleItem) {
        roleItem!.options = store.state.entireRole?.map((item) => {
          return { title: item.name, value: item.id }
        })
      }
      return userModalConfig
    })

    const [pageModalRef, defaultInfo, handleCreate, handleEdit] = usePageModal(
      newCalback,
      createCalback
    )
    return {
      searchInputConfig,
      userTableConfig,
      pageName,
      handleResetClick,
      handleQueryClick,
      pageContentRef,
      pageModalRef,
      userModalConfig,
      handleCreate,
      handleEdit,
      defaultInfo,
      modalConfigRef
    }
  }
})
</script>

<style lang="less" scoped></style>
