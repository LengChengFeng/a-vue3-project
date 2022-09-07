<template>
  <div class="my-tables">
    <my-table
      :listData="dataList"
      :listCount="dataCount"
      v-bind="userTableConfig"
      v-model:page="pageInfo"
    >
      <template #header>
        <div class="tabs-header">
          <div class="title">用户列表</div>
          <div class="create">
            <el-button
              type="primary"
              size="medium"
              v-if="isCreate"
              @click="btnCreateClick"
              >创建用户</el-button
            >
          </div>
        </div>
      </template>
      <template #status="scope">
        <el-button
          :type="scope.row.enable ? 'success' : 'danger'"
          size="mini"
          >{{ scope.row.enable ? '启用' : '禁用' }}</el-button
        >
      </template>
      <template #createAt="scope">
        {{ $filters.formatTime(scope.row.createAt) }}
      </template>
      <template #updateAt="scope">
        {{ $filters.formatTime(scope.row.updateAt) }}
      </template>
      <template #operate="scope">
        <div class="handle-btns">
          <el-button
            size="mini"
            icon="el-icon-edit"
            type="primary"
            @click="btnEditClick(scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            icon="el-icon-delete"
            type="danger"
            v-if="isDelete"
            @click="btnDeleteClick(scope.row)"
            >删除</el-button
          >
        </div>
      </template>
      <template
        v-for="item in otherSlotName"
        :key="item.slotName"
        #[item.slotName]="scope"
      >
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>
    </my-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue'
import myTable from '@/base-ui/table/table.vue'
import { useStore } from 'vuex'
import { usePermission } from '@/hook/use-permission'
import { ElMessageBox, ElMessage } from 'element-plus'
export default defineComponent({
  emits: ['handleCreate', 'handleEdit'],
  components: {
    myTable
  },
  props: {
    pageName: {
      type: String,
      required: true
    },
    userTableConfig: {
      default: Object,
      require: true
    }
  },
  setup(props, { emit }) {
    const store = useStore()
    //判断权限
    const isCreate = usePermission(props.pageName, 'create')
    const isUpdate = usePermission(props.pageName, 'update')
    const isDelete = usePermission(props.pageName, 'delete')
    const isQuery = usePermission(props.pageName, 'query')
    //删除数据
    const btnDeleteClick = (item: any) => {
      const data = item
      ElMessageBox.confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      })
        .then((item) => {
          store.dispatch('system/deletePageDataAction', {
            pageName: props.pageName,
            id: data.id
          })
          if (item === 'confirm') {
            ElMessage({
              type: 'success',
              message: '删除成功!'
            })
          }
        })
        .catch(() => {
          console.log('取消了操作')
          ElMessage({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
    //发送请求
    const pageInfo = ref({ currentPage: 1, pageSize: 10 })
    watch(pageInfo, () => {
      getPageData()
    })
    const getPageData = (queryInfo: any = {}) => {
      if (!isQuery) return
      store.dispatch('system/getPageListActions', {
        pageName: props.pageName,
        queryInfo: {
          offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          ...queryInfo
        }
      })
    }
    getPageData()
    const dataList = computed(() => {
      return store.getters[`system/pageListData`]
    })
    const dataCount = computed(() => {
      return store.getters[`system/pageListCount`]
    })
    //slotName是否重复
    const otherSlotName = props.userTableConfig?.propsList.filter(
      (item: any) => {
        if (item.slotName === 'createAt') return false
        if (item.slotName === 'updateAt') return false
        if (item.slotName === 'operate') return false
        return true
      }
    )
    //监听新建和编辑按钮的点击
    const btnCreateClick = () => {
      emit('handleCreate')
    }
    const btnEditClick = (value: any) => {
      emit('handleEdit', value)
    }
    return {
      dataList,
      getPageData,
      dataCount,
      pageInfo,
      otherSlotName,
      isCreate,
      isUpdate,
      isDelete,
      isQuery,
      btnDeleteClick,
      btnCreateClick,
      btnEditClick
    }
  }
})
</script>

<style lang="less" scoped>
.handle-btns {
  text-align: right;
  padding: 0 50px 20px 0;
}
.my-tables {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
.tabs-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
  .title {
    font-size: 20px;
    color: #333;
  }
}
</style>
