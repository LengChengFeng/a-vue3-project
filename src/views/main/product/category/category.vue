<template>
  <div class="category">
    <div ref="categoryRef" style="width: 600px; height: 400px"></div>
    <h2>category</h2>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import * as echarts from 'echarts'
export default defineComponent({
  name: 'category',
  setup() {
    const categoryRef = ref<HTMLElement>()
    onMounted(() => {
      if (categoryRef.value) {
        const echartsInstance = echarts.init(categoryRef.value)
        // 指定图表的配置项和数据
        var option = {
          title: {
            text: 'ECharts 入门示例'
          },
          tooltip: {},
          legend: {
            data: ['销量']
          },
          xAxis: [
            {
              data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
            },
            {
              data: ['那英', '张惠妹', '徐佳莹', '傅首尔']
            }
          ],
          yAxis: [
            {
              type: 'value',
              scale: true,
              name: '明星'
            },
            {
              type: 'value',
              scale: true,
              name: '预购量'
            }
          ],
          series: [
            {
              type: 'line',
              xAxisIndex: 1,
              yAxisIndex: 0,
              name: '明细',
              data: [125, 200, 346, 190, 810, 250]
            },
            {
              name: '价格',
              type: 'bar',
              data: [50, 200, 346, 105, 180, 620]
            }
          ]
        }
        // 使用刚指定的配置项和数据显示图表。
        echartsInstance.setOption(option)
      }
    })

    return {
      categoryRef
    }
  }
})
</script>

<style scoped></style>
