<template>
  <div class="role">
    <my-search :formItems="searchInputConfig"></my-search>
    <my-tables
      :pageName="pageName"
      :userTableConfig="userTablesConfig"
      @handleCreate="handleCreate"
      @handleEdit="handleEdit"
    ></my-tables>
    <page-modal
      ref="pageModalRef"
      :modalConfig="roleModalConfig"
      pageName="role"
      :defaultInfo="defaultInfo"
      :otherInfo="otherInfo"
    >
      <el-tree
        :data="menus"
        show-checkbox
        node-key="id"
        :props="{ children: 'children', label: 'name' }"
        @check="handleCheckChange"
        ref="elTreeRef"
      >
      </el-tree>
    </page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, nextTick } from 'vue'
import { useStore } from 'vuex'
import MySearch from '@/components/page-search/searchInfo.vue'
import { searchInputConfig } from './roleConfig/roleSearchConfig'
import MyTables from '@/components/page-table/MyTables.vue'
import { userTablesConfig } from './roleConfig/roleTablesConfig'
import { usePageModal } from '@/hook/use-page-modal'
import pageModal from '@/components/page-modal/pageModal.vue'
import { roleModalConfig } from './roleConfig/roleModalConfig'
import { menuMapLeafKeys } from '@/utils/map-menus'
import { ElTree } from 'element-plus'
export default defineComponent({
  name: 'role',
  components: {
    MySearch,
    MyTables,
    pageModal
  },
  setup() {
    const pageName = 'role'
    const store = useStore()
    const menus = computed(() => store.state.entireMenu)
    const otherInfo = ref({})
    const elTreeRef = ref<InstanceType<typeof ElTree>>()

    const editCallback = (item: any) => {
      console.log(item.menuList)
      const menusList = menuMapLeafKeys(item.menuList)
      nextTick(() => {
        console.log(menusList)
        console.log(elTreeRef.value)
        elTreeRef.value?.setCheckedKeys(menusList, false)
      })
    }
    const [pageModalRef, defaultInfo, handleCreate, handleEdit] = usePageModal(
      undefined,
      editCallback
    )
    const handleCheckChange = (data1: any, data2: any) => {
      const checkedKeys = data2.checkedKeys
      const halfCheckedKeys = data2.halfCheckedKeys
      const menuList = [...checkedKeys, ...halfCheckedKeys]
      otherInfo.value = { menuList }
    }
    return {
      searchInputConfig,
      userTablesConfig,
      pageName,
      roleModalConfig,
      pageModalRef,
      defaultInfo,
      handleCreate,
      handleEdit,
      menus,
      handleCheckChange,
      otherInfo,
      elTreeRef
    }
  }
})
</script>

<style scoped></style>
