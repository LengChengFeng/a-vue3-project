<template>
  <div class="rose-echarts">
    <base-echart :options="options"></base-echart>
  </div>
</template>

<script lang="ts" setup>
import BaseEchart from '@/base-ui/echart'
import { computed, defineProps } from 'vue'
import { IDataType } from '../types/type'
const props = defineProps<{
  roseData: IDataType
}>()
const options = computed(() => {
  return {
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    series: [
      {
        name: '类别数据',
        type: 'pie',
        radius: [10, 100],
        center: ['40%', '40%'],
        roseType: 'area',
        itemStyle: {
          borderRadius: 8
        },
        data: props.roseData
      }
    ]
  }
})
</script>
