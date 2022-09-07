import { Module } from 'vuex'
import { IrootState } from '../typs'
import { ILoginState } from './type'
import LocalCache from '@/utils/cache'
import router from '@/router'
import { mapMenusToRoutes, mapMenusToPermissions } from '@/utils/map-menus'
//导入网络请求
import {
  accountLoginRequest,
  getUserInfoByid,
  requestUserMenuByRoleId
} from '@/network/login/login'
const loginModule: Module<ILoginState, IrootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: [],
      permissions: []
    }
  },
  getters: {},
  mutations: {
    //向state添加token
    ChangeToken(state, token: string) {
      state.token = token
    },
    //向stae添加userinfo
    ChangeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    //向state添加userMenus
    ChangeUserMenus(state, userMenus: any) {
      state.userMenus = userMenus
      const routes = mapMenusToRoutes(userMenus)
      console.log(routes)
      routes.forEach((route) => {
        router.addRoute('main', route)
      })
      const premissionsList = mapMenusToPermissions(userMenus)
      state.permissions = premissionsList
      console.log(premissionsList)
    }
  },
  actions: {
    //登录
    async accountLoginAction({ commit }, payload: any) {
      const result = await accountLoginRequest(payload)
      // console.log(result.data.name, result.data.token)
      //设置登陆后获取到的token
      LocalCache.setCache('token', result.data.token)
      // console.log(result)
      //把token交给state
      commit('ChangeToken', result.data.token)
      //获取用户信息
      const userInfoResult = await getUserInfoByid(result.data.id)

      const userInfo = userInfoResult.data
      commit('ChangeUserInfo', userInfo)
      //缓存用户信息
      LocalCache.setCache('userInfo', userInfo)
      console.log(userInfo)
      //用户权限
      const userMenusResult = await requestUserMenuByRoleId(userInfo.role.id)
      const userMenus = userMenusResult.data
      //把数据提交到state
      commit('ChangeUserMenus', userMenus)
      //保存到缓存中
      LocalCache.setCache('userMenus', userMenus)
      //跳转到登录页
      router.push('/main')
    },
    //防止用户刷新 有token但是vuex的state中没有值
    loadLocalLogin({ commit }) {
      const token = LocalCache.getCache('token')
      if (token) {
        commit('ChangeToken', token)
      }
      const userInfo = LocalCache.getCache('userInfo')
      if (userInfo) {
        commit('ChangeUserInfo', userInfo)
      }
      const userMenus = LocalCache.getCache('userMenus')
      if (userMenus) {
        commit('ChangeUserMenus', userMenus)
      }
    }
  }
}
export default loginModule
