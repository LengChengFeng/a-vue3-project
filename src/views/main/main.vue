<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside :width="isCollapse ? '70px' : '210px'">
        <nav-menu :collapse="isCollapse"></nav-menu>
      </el-aside>
      <el-container class="page">
        <el-header class="page-header">
          <nav-header @foldChange="handleFoldChange"></nav-header>
        </el-header>
        <el-main class="page-content">
          <div class="page-info">
            <router-view></router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import navMenu from '../../components/nav-menu/nav-menu.vue'
import navHeader from '../../components/nav-header/nav-header.vue'
export default defineComponent({
  components: {
    navMenu,
    navHeader
  },
  setup() {
    const route = useRoute()
    const currentPath = computed(() => route.path)
    const isCollapse = ref(false)
    const handleFoldChange = (isFold: boolean) => {
      console.log(isFold)
      isCollapse.value = isFold
    }
    return {
      handleFoldChange,
      isCollapse
    }
  }
})
</script>

<style scoped lang="less">
.main {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.el-container .page {
  flex-direction: column;
}
.page-header {
  height: 48px;
}
.main-content,
.page {
  height: 100%;
}

.page-content {
  height: calc(100% - 48px);
}
.page-info {
  background-color: #fff;
  border-radius: 5px;
}

.el-header,
.el-footer {
  display: flex;
  color: #333;
  text-align: center;
  align-items: center;
}

.el-header {
  height: 48px !important;
}

.el-aside {
  overflow-x: hidden;
  overflow-y: auto;
  line-height: 200px;
  text-align: left;
  cursor: pointer;
  background-color: #001529;
  transition: width 0.3s linear;
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */

  &::-webkit-scrollbar {
    display: none;
  }
}

.el-main {
  color: #333;
  text-align: center;
  background-color: #f0f2f5;
}
</style>
