/*
 * @Author: 曹捷
 * @Date: 2020-11-24 10:44:05
 * @LastEditors: 曹捷
 * @LastEditTime: 2020-11-24 21:51:41
 * @Description: fileContent
 */
import Vue from 'vue'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)

// 以下为语言包单独设置的场景，单独设置时语言包需单独引入
const modulesFiles = require.context('./lang', true, /\.js$/)
const messages = modulesFiles.keys().reduce((messages, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  messages[moduleName] = value
  return messages
}, {})
console.log('messages: ', messages);

const i18n = new VueI18n({
  locale: 'japan',
  messages
})
Vue.prototype._i18n = i18n
export default i18n