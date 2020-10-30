/*
 * @Author: 曹捷
 * @Date: 2019-08-01 14:25:13
 * @LastEditors: 曹捷
 * @LastEditTime: 2020-08-06 15:02:09
 * @Description: store  集成common  modules和 modules
 */
import Vue from 'vue'
import Vuex from 'vuex'
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

const store = new Vuex.Store({ modules: Object.assign(commons, modules) })

export default store
