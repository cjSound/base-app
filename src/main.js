/*
 * @Author: 曹捷
 * @Date: 2019-08-21 17:23:30
 * @LastEditors: 曹捷
 * @LastEditTime: 2021-01-04 19:22:46
 * @Description: file content
 */
import Vue from 'vue'
import App from './App'
import getData from './config'
import store from './store'
// 引入  uview
import uView from "uview-ui";
Vue.use(uView);

//全局注册 暂时不支持动态注册
import obitInput from './app-modules/components/obit-input/obit-input.vue'
import obitNodata from './app-modules/components/obit-nodata/obit-nodata.vue'
import obitImage from './app-modules/components/obit-image/obit-image.vue'
import obitSkeleton from './app-modules/components/obit-skeleton/obit-skeleton.vue'
import obitPageLoad from './app-modules/components/obit-page-load/obit-page-load.vue'
import obitLoading from './app-modules/components/obit-loading/obit-loading.vue'

Vue.component('obitInput', obitInput)
Vue.component('obitNodata', obitNodata)
Vue.component('obitImage', obitImage)
Vue.component('skeleton', obitSkeleton)
Vue.component('obitPageLoad', obitPageLoad)
Vue.component('obitLoading', obitLoading)

// Vue.component('login', login)

// 为了编译至各平台，编译器是静态分析代码，扫描组件来编译，所以不支持动态注册，短期内应该不会支持动态组件注册
// Object.keys(components).forEach(key => {
//     Vue.component(key, components[key])
// })

// 过滤器
import * as filters from './filters' // global filters
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key])
})
Vue.config.productionTip = false
Vue.prototype.$http = getData
App.mpType = 'app'
Vue.prototype.$store = store
/**
 * 注册全局api到vue实例上
 */
import * as apis from '@/app-modules/utils'
Object.keys(apis).forEach((key) => {
  Vue.prototype[`$${key}`] = apis[key]
})

const app = new Vue({
  store,
  ...App,
})
app.$mount()
