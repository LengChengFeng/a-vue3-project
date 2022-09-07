<template>
  <div class="dashboard">
    <el-row :gutter="5">
      <el-col :span="7">
        <page-card title="分类商品数量(饼图)">
          <pie-echarts :pieData="categoryGoodsCount"></pie-echarts>
        </page-card>
      </el-col>
      <el-col :span="10">
        <page-card title="不同城市商品销量">
          <map-echarts :mapData="addressGoodsSale"></map-echarts>
        </page-card>
      </el-col>
      <el-col :span="7">
        <page-card title="分类商品数量(玫瑰图)">
          <rose-echarts :roseData="categoryGoodsCount"></rose-echarts>
        </page-card>
      </el-col>
    </el-row>
    <el-row :gutter="5" class="content-row">
      <el-col :span="12">
        <page-card title="分类商品的销量">
          <line-echarts v-bind="categoryGoodsSale"></line-echarts>
        </page-card>
      </el-col>
      <el-col :span="12">
        <page-card title="分类商品的收藏">
          <bar-echarts v-bind="categoryGoodsFavor"></bar-echarts>
        </page-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import pageCard from '@/components/page-card/pageCard.vue'
import {
  PieEcharts,
  RoseEcharts,
  LineEcharts,
  BarEcharts,
  MapEcharts
} from '@/components/page-echarts'
export default defineComponent({
  name: 'dashboard',
  components: {
    pageCard,
    PieEcharts,
    RoseEcharts,
    LineEcharts,
    BarEcharts,
    MapEcharts
  },
  setup() {
    const store = useStore()
    //玫瑰图和饼图的数据
    const categoryGoodsCount = computed(() => {
      return store.state.dashboard.categoryGoodsCount.map((item: any) => {
        return { name: item.name, value: item.goodsCount }
      })
    })
    const categoryGoodsSale = computed(() => {
      const xLables: string[] = []
      const value: any[] = []
      for (const item of store.state.dashboard.categoryGoodsCount) {
        xLables.push(item.name)
        value.push(item.goodsCount)
      }
      return { xLables, value }
    })
    //柱状图数据
    const categoryGoodsFavor = computed(() => {
      const xLabels: string[] = []
      const values: any[] = []
      const categoryGoodsFavor = store.state.dashboard.categoryGoodsFavor
      for (const item of categoryGoodsFavor) {
        xLabels.push(item.name)
        values.push(item.goodsFavor)
      }
      return { xLabels, values }
    })
    console.log(categoryGoodsFavor)
    //地图数据
    const addressGoodsSale = computed(() => {
      return store.state.dashboard.addressGoodsSale.map((item: any) => {
        return { name: item.address, value: item.count }
      })
    })
    store.dispatch('dashboard/getDashboardDataAction')
    return {
      categoryGoodsCount,
      categoryGoodsSale,
      categoryGoodsFavor,
      addressGoodsSale
    }
  }
})
</script>

<style scoped>
.content-row {
  margin-top: 20px;
}
</style>
