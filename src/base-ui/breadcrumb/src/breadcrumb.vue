<template>
  <div class="bread-crumb">
    <el-breadcrumb separator="/">
      <template v-for="item in breadcrumbItem" :key="item.name">
        <el-breadcrumb-item :to="{ path: item.path }">{{
          item.name
        }}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Ibreadcrumb } from '../type'
export default defineComponent({
  props: {
    breadcrumbItem: {
      type: Array as PropType<Ibreadcrumb[]>,
      default: () => []
    }
  }
})
</script>

<style></style>
