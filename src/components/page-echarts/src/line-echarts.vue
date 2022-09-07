<template>
  <div class="line-echarts">
    <base-echart :options="options"></base-echart>
  </div>
</template>

<script lang="ts" setup>
import BaseEchart from '@/base-ui/echart'
import { computed, defineProps } from 'vue'
const props =
  defineProps<{
    xLables: string[]
    value: any[]
  }>()
const options = computed(() => {
  return {
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: props.xLables
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: props.value,
        type: 'line',
        areaStyle: {}
      }
    ]
  }
})
</script>
