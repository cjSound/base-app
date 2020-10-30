/*
 * @Author: 曹捷
 * @Date: 2020-08-03 18:54:10
 * @LastEditors: 曹捷
 * @LastEditTime: 2020-09-09 17:56:04
 * @Description: 系统公共模块 登录  等
 */
module.exports = {
  baseUrl: "pages/",
  children: [
    // 登录相关 start ----------------------------------------------------------
    {
      path: "login/login",
      style: {
        navigationStyle: "custom",
      },
    },
    // 第三方分享页面 start ----------------------------------------------------------
  ],
};
