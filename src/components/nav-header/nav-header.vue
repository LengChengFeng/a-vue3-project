<template>
  <div class="nav-header">
    <i
      class="fold"
      :class="isFold ? 'el-icon-s-fold' : 'el-icon-s-unfold'"
      @click="handleFoldClick"
    ></i>
    <div class="content">
      <breadcrumb :breadcrumbItem="breadcrumbItem"></breadcrumb>
      <user-info></user-info>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import userInfo from './user-info.vue'
import breadcrumb from '../../base-ui/breadcrumb/src/breadcrumb.vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { pathMapBreadcrumbs } from '../../utils/map-menus'
import { Ibreadcrumb } from '../../base-ui/breadcrumb/type'
export default defineComponent({
  emits: ['foldChange'],
  components: {
    userInfo,
    breadcrumb
  },
  setup(props, { emit }) {
    const isFold = ref(false)
    const handleFoldClick = () => {
      isFold.value = !isFold.value
      emit('foldChange', isFold.value)
    }
    const store = useStore()
    const route = useRoute()
    const breadcrumbItem: any = computed(() => {
      const userMenus = store.state.login.userMenus
      const currentPath = route.path

      return pathMapBreadcrumbs(userMenus, currentPath)
    })
    console.log(breadcrumbItem)

    return {
      handleFoldClick,
      isFold,
      breadcrumbItem
    }
  }
})
</script>

<style lang="less" scoped>
.nav-header {
  display: flex;
  width: 100%;
  .fold {
    font-size: 30px;
    cursor: pointer;
    margin-top: 5px;
  }
  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 20px;
  }
}
</style>
