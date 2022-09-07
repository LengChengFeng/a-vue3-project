<template>
  <div class="nav-menu">
    <div class="logo">
      <img class="img" src="~assets/img/logo.svg" alt="" />
      <span class="title">Vue3+TS</span>
    </div>
    <el-menu
      :default-active="defaultActive + ''"
      class="el-menu-vertical-demo"
      :collapse="collapse"
      background-color="#0c2135"
      text-color="#b7bdc3"
      active-text-color="#0a60bd"
    >
      <template v-for="item in menus" :key="item.id">
        <template v-if="item.type === 1">
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <i v-if="item.icon" :class="item.icon"></i>
              <span>{{ item.name }}</span>
            </template>
            <template v-for="subitem in item.children" :key="subitem.id">
              <el-menu-item
                :index="subitem.id + ''"
                @click="handleMenuItemClick(subitem)"
              >
                <i v-if="subitem.icon" :class="subitem.icon"></i>
                <span>{{ subitem.name }}</span>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <!-- 一级菜单 -->
        <template v-else-if="item.type === 2">
          <el-menu-item :index="item.id + ''">
            <i v-if="item.icon" :class="item.icon"></i>
            <span>{{ item.name }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { pathMaptoMenu } from '../../utils/map-menus'
export default defineComponent({
  props: {
    collapse: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    const currentPath = route.path
    const menus = computed(() => store.state.login.userMenus)
    const menu = pathMaptoMenu(menus.value, currentPath)
    const defaultActive = menu.id

    const handleMenuItemClick = (item: any) => {
      router.push({
        path: item.url
      })
    }
    return {
      menus,
      handleMenuItemClick,
      defaultActive
    }
  }
})
</script>
<style lang="less" scoped>
.nav-menu {
  background-color: #0c2135;
  .el-menu {
    border-right: none;
  }
}
.logo {
  width: 80%;
  height: 80px;
  text-align: center;
  line-height: 100px;
  overflow: hidden;
  .img {
    width: 50%;
    height: 50%;
    margin-top: 25px;
    vertical-align: top;
  }
  .title {
    font-size: 16px;
    font-weight: 700;
    color: white;
  }
}
</style>
