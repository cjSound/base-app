/*
 * @Author: 曹捷
 * @Date: 2020-06-08 17:25:40
 * @LastEditors: 曹捷
 * @LastEditTime: 2020-09-09 17:47:24
 * @Description: 用户管理 登录等
 */
import { Http } from "@/app-modules/api/getData";
let http = new Http({
  loading: true,
});
import { WEB_URL } from "./../url";
let URL = `${WEB_URL}user/`;
export default {
  /**
   * 用户名登录
   * @param {*} data
   */
  toLogin(data = {}) {
    return http.post(`${URL}login`, data, {
      loadingText: "登录中",
    });
  },
};
