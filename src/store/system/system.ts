import { Module } from 'vuex'
import { IrootState } from '../typs'
import { Isystem } from './type/type'
import {
  deletePageData,
  getPageList,
  createPageData,
  editPageData
} from '@/network/system'
let pageName = ''
const systemModule: Module<Isystem, IrootState> = {
  namespaced: true,
  state() {
    return {
      userCount: 0,
      userList: [],
      roleList: [],
      roleCount: 0,
      goodsCount: 0,
      goodsList: [],
      menuCount: 0,
      menuList: []
    }
  },
  getters: {
    pageListData(state) {
      switch (pageName) {
        case 'users':
          return state.userList
        case 'role':
          return state.roleList
        case 'goods':
          return state.goodsList
        case 'menu':
          return state.menuList
      }
    },
    pageListCount(state) {
      switch (pageName) {
        case 'users':
          return state.userCount
        case 'role':
          return state.roleCount
        case 'goods':
          return state.goodsCount
        case 'menu':
          return state.menuCount
      }
    }
  },
  mutations: {
    changeUserCount(state, payload) {
      state.userCount = payload
    },
    changeUserList(state, payload) {
      state.userList = payload
    },
    changeRoleCount(state, payload) {
      state.roleCount = payload
    },
    changeRoleList(state, payload) {
      state.roleList = payload
    },
    changeGoodsCount(state, payload) {
      state.goodsCount = payload
    },
    changeGoodsList(state, payload) {
      state.goodsList = payload
    },
    changeMenuList(state, payload) {
      state.menuList = payload
    }
  },
  actions: {
    async getPageListActions({ commit }, payload: any) {
      pageName = payload.pageName
      let pageUrl = ''
      switch (pageName) {
        case 'users':
          pageUrl = '/users/list'
          break
        case 'role':
          pageUrl = '/role/list'
          break
        case 'goods':
          pageUrl = '/goods/list'
          break
        case 'menu':
          pageUrl = '/menu/list'
          break
      }
      const pageList = await getPageList(pageUrl, payload.queryInfo)
      console.log(pageList)

      const { list, totalCount } = pageList.data
      console.log(list)

      switch (pageName) {
        case 'users':
          commit('changeUserCount', totalCount)
          commit('changeUserList', list)
          break
        case 'role':
          commit('changeRoleList', list)
          commit('changeRoleCount', totalCount)
          break
        case 'goods':
          commit('changeGoodsCount', totalCount)
          commit('changeGoodsList', list)
          break
        case 'menu':
          commit('changeMenuList', list)
          break
      }
    },
    //删除用户
    async deletePageDataAction(context, payload: any) {
      const { pageName, id } = payload
      const pageUrl = `/${pageName}/${id}`
      await deletePageData(pageUrl)
      // 3.重新请求最新的数据
      context.dispatch('getPageListActions', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    },
    //创建用户
    async createPageDataAction(context, payload: any) {
      const { pageName, newData } = payload
      console.log(newData)
      let pageUrl = ''
      switch (pageName) {
        case 'users':
          pageUrl = '/users'
          break
        case 'role':
          pageUrl = '/role'
          break
      }
      const result = await createPageData(pageUrl, newData)
      console.log(result)
      // 3.重新请求最新的数据
      context.dispatch('getPageListActions', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    },

    async editPageDataAction(context, payload) {
      const { pageName, editData, id } = payload
      console.log(editData)
      let pageUrl = ''
      switch (pageName) {
        case 'users':
          pageUrl = `users/${id}`
          break
        case 'role':
          pageUrl = `role/${id}`
          break
      }
      const result = await editPageData(pageUrl, editData)
      console.log(result)
      // 3.重新请求最新的数据
      context.dispatch('getPageListActions', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    }
  }
}
export default systemModule
