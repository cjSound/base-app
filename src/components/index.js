/*
 * @Author: 曹捷
 * @Date: 2019-08-23 11:59:27
 * @LastEditors: 曹捷
 * @LastEditTime: 2020-08-04 20:06:24
 * @Description: file content
 */
import obitMore from './obit-more/obit-more.vue'

const components = {
    obitMore,
}

const install = function (Vue, opts = {}) {

    Object.keys(components).forEach(key => {
        Vue.component(key, components[key])
    })
}

// if (typeof window !== 'undefined' && window.Vue) {
//     install(window.Vue)
// }

export default components