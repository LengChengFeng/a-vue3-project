<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>{{ title }}</span>
      </div>
    </template>
    <div class="item">
      <slot></slot>
    </div>
  </el-card>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    title: {
      type: String,
      require: true
    }
  }
})
</script>

<style></style>
