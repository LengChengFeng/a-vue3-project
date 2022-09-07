import { createStore } from 'vuex'
import { IrootState } from './typs'
import { getPageList } from '@/network/system/index'
//导入login自己的模块
import login from './login/login'
import system from './system/system'
import dashboard from './analysis/dashboard'
const store = createStore<IrootState>({
  state() {
    return {
      name: 'amei',
      age: 18,
      entireDepartment: [],
      entireRole: [],
      entireMenu: []
    }
  },
  mutations: {
    changeEntireDepartment(state, department) {
      state.entireDepartment = department
    },
    changeEntireRolet(state, role) {
      state.entireRole = role
    },
    changeEntireMenu(state, menu) {
      state.entireMenu = menu
    }
  },
  actions: {
    async getInitialDataAction({ commit, dispatch }) {
      const departments = await getPageList('/department/list', {
        offset: 0,
        size: 1000
      })
      const { list: allDepartment } = departments.data
      commit('changeEntireDepartment', allDepartment)
      const roles = await getPageList('/role/list', {
        offset: 0,
        size: 1000
      })
      const { list: allRole } = roles.data
      commit('changeEntireRolet', allRole)

      const menuResult = await getPageList('/menu/list', {})
      const { list: menuList } = menuResult.data
      commit('changeEntireMenu', menuList)
    }
  },
  modules: {
    login,
    system,
    dashboard
  }
})
export function setupStore() {
  store.dispatch('login/loadLocalLogin')
  store.dispatch('getInitialDataAction')
}
export default store
