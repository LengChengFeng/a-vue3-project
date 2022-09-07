<template>
  <div class="user-info">
    <div class="notices">
      <div class="message">
        <el-icon>
          <chat-dot-round />
        </el-icon>
      </div>
      <div class="collect">
        <el-icon>
          <collection-tag />
        </el-icon>
      </div>
      <div class="notice">
        <el-icon>
          <bell-filled />
        </el-icon>
      </div>
    </div>
    <div class="drop-down">
      <el-dropdown>
        <span class="avatar">
          <el-avatar
            src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
          ></el-avatar>
          <span>{{ name }}</span>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>退出登录</el-dropdown-item>
            <el-dropdown-item divided>用户信息</el-dropdown-item>
            <el-dropdown-item divided>系统管理</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { ChatDotRound, BellFilled, CollectionTag } from '@element-plus/icons'
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
export default defineComponent({
  components: {
    ChatDotRound,
    BellFilled,
    CollectionTag
  },
  setup() {
    const store = useStore()
    const name = computed(() => store.state.login.userInfo.name)

    return {
      name
    }
  }
})
</script>

<style lang="less" scoped>
.user-info {
  display: flex;
  justify-content: center;
  align-items: center;
}
.notices {
  margin-right: 20px;
  display: flex;
  cursor: pointer;
  .collect {
    margin: 0 15px;
  }
  svg {
    height: 25px;
    width: 25px;
  }
}
.avatar {
  cursor: pointer;
  display: flex;
  align-items: center;
}
</style>
