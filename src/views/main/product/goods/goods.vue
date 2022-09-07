<template>
  <div class="goods">
    <search-info :formItems="searchInputConfig"></search-info>
    <my-tables :userTableConfig="goodsTableConfig" :pageName="pageName">
      <template #image="scope">
        <el-image
          style="width: 60px; height: 60px"
          :src="scope.row.imgUrl"
          :preview-src-list="[scope.row.imgUrl]"
        >
        </el-image>
      </template>
      <template #price="scope"> ¥{{ scope.row.newPrice }} </template>
    </my-tables>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import searchInfo from '@/components/page-search/searchInfo.vue'
import { searchInputConfig } from './goodsConfig/goodsSearchConfig'
import MyTables from '@/components/page-table/MyTables.vue'
import { goodsTableConfig } from './goodsConfig/goodsTableConfig'
export default defineComponent({
  name: 'goods',
  components: {
    searchInfo,
    MyTables
  },
  setup() {
    const pageName = 'goods'
    return {
      searchInputConfig,
      goodsTableConfig,
      pageName
    }
  }
})
</script>

<style scoped></style>
