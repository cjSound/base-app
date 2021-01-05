/*
 * @Author: 曹捷
 * @Date: 2019-08-01 14:25:13
 * @LastEditors: 曹捷
 * @LastEditTime: 2021-01-05 10:02:49
 * @Description: store  集成common  modules和 modules
 */
import Vue from 'vue'
import Vuex from 'vuex'
// vuex本地持久化插件
import createPersistedState from 'vuex-persistedstate'

const vuexPersisted = new createPersistedState({
  storage: {
    getItem: key => {
      let item = uni.getStorageSync(key)
      return item
    },
    setItem: (key, value) => {
      return uni.setStorageSync(key, value)
    },
    removeItem: key => uni.removeStorageSync(key)
  },
  // reducer (val) {
  //   return {
  //     // 只储存state中的user
  //     menu: val.menu
  //   }
  // }
})
Vue.use(Vuex)
const commonFiles = require.context('@/app-modules/store', true, /\.js$/)
const commons = commonFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = commonFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

const modulesFiles = require.context('./modules', true, /\.js$/)
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

const store = new Vuex.Store({
  modules: Object.assign(commons, modules),
  plugins: [vuexPersisted]
})

export default store
