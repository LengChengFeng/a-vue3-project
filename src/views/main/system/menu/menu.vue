<template>
  <div class="menu">
    <my-tables
      :userTableConfig="menuTableConfig"
      :pageName="pageName"
    ></my-tables>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MyTables from '@/components/page-table/MyTables.vue'
import { menuTableConfig } from './menuConfig/menuTableConfig'
export default defineComponent({
  name: 'menu',
  components: {
    MyTables
  },
  setup() {
    const pageName = 'menu'
    return {
      menuTableConfig,
      pageName
    }
  }
})
</script>

<style scoped></style>
