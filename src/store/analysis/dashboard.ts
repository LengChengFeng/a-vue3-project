import { Module } from 'vuex'
import { IrootState } from '../typs'
import { IDashboardState } from './type'
import {
  getCategoryGoodsCount,
  getCategoryGoodsSale,
  getCategoryGoodsFavor,
  getAddressGoodsSale
} from '@/network/dashboard'
const dashboard: Module<IDashboardState, IrootState> = {
  namespaced: true,
  state() {
    return {
      categoryGoodsCount: [],
      categoryGoodsSale: [],
      categoryGoodsFavor: [],
      addressGoodsSale: []
    }
  },
  getters: {},
  mutations: {
    changeGoodsCount(state, goodsCount) {
      state.categoryGoodsCount = goodsCount
    },
    changeGoodsSale(state, goodsSale) {
      state.categoryGoodsSale = goodsSale
    },
    changeGoodsFavor(state, goodsFavor) {
      state.categoryGoodsFavor = goodsFavor
    },
    changeAddress(state, address) {
      state.addressGoodsSale = address
    }
  },
  actions: {
    async getDashboardDataAction({ commit }) {
      const goodsCountResult = await getCategoryGoodsCount()
      commit('changeGoodsCount', goodsCountResult.data)

      const goodsSale = await getCategoryGoodsSale()
      commit('changeGoodsSale', goodsSale.data)

      const goodsFavor = await getCategoryGoodsFavor()
      commit('changeGoodsFavor', goodsFavor.data)

      const address = await getAddressGoodsSale()
      commit('changeAddress', address.data)
    }
  }
}
export default dashboard
