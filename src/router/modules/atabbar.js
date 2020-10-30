/*
 * @Author: 曹捷
 * @Date: 2020-08-03 17:34:26
 * @LastEditors: 曹捷
 * @LastEditTime: 2020-10-29 16:20:20
 * @Description: tabbar相关
 */
let style = require('./../style.js')
let pullToRefresh = style.pullToRefresh

module.exports = {
  baseUrl: 'pages/tabbar/',
  children: [
    {
      path: 'ahome/ahome',
      style: {
        navigationBarTitleText: '首页',
        enablePullDownRefresh: true,
      },
    },
    {
      path: 'perinfo/perinfo',
      style: {
        navigationBarTitleText: '个人中心',
        enablePullDownRefresh: true,
      },
    },
  ],
}
