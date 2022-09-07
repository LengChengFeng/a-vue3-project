<template>
  <div class="mytable">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <el-table
      :data="listData"
      style="width: 100%"
      border
      v-bind="childrenProps"
    >
      <el-table-column
        v-if="IsShowSelectColumn"
        type="selection"
        align="center"
        width="60"
        @selection-change="handleSelectionChange"
      ></el-table-column>
      <el-table-column
        v-if="IsShowColumn"
        type="index"
        label="序号"
        align="center"
        width="65"
      ></el-table-column>
      <template v-for="item in propsList" :key="item.label">
        <el-table-column v-bind="item" align="center" show-overflow-tooltip>
          <template #default="scope">
            <slot :name="item.slotName" :row="scope.row">
              {{ scope.row[item.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div class="footer">
      <slot name="footer">
        <div class="pagination">
          <el-pagination
            v-if="isShowPagination"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page.currentPage"
            :page-size="page.pageSize"
            :page-sizes="[1, 3, 5, 10]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="listCount"
          >
          </el-pagination>
        </div>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  emits: ['selectionChange', 'update:page'],
  props: {
    IsShowSelectColumn: {
      type: Boolean,
      default: false
    },
    IsShowColumn: {
      type: Boolean,
      default: false
    },
    listData: {
      type: Array,
      require: true
    },
    propsList: {
      type: Array,
      require: true
    },
    listCount: {
      type: Number,
      default: 10
    },
    page: {
      type: Object,
      default: () => {
        return { currentPage: 0, pageSize: 10 }
      }
    },
    childrenProps: {
      type: Object,
      default: () => ({})
    },
    isShowPagination: {
      type: Boolean,
      default: true
    }
  },
  setup(props, { emit }) {
    const handleSelectionChange = (value: any) => {
      console.log(value)
    }
    const handleCurrentChange = (currentPage: number) => {
      emit('update:page', { ...props.page, currentPage })
    }

    const handleSizeChange = (pageSize: number) => {
      emit('update:page', { ...props.page, pageSize })
    }
    return {
      handleSelectionChange,
      handleSizeChange,
      handleCurrentChange
    }
  }
})
</script>

<style scoped>
.pagination {
  display: flex;
  margin-top: 10px;
  justify-content: right;
}
</style>
