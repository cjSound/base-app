/*
 * @Author: 曹捷
 * @Date: 2020-08-03 17:17:12
 * @LastEditors: 曹捷
 * @LastEditTime: 2021-01-04 18:55:40
 * @Description: file content
 */
module.exports = {
  easycom: {
    "^u-(.*)": "uview-ui/components/u-$1/u-$1.vue"
  },
  globalStyle: {
    navigationBarTextStyle: "black",
    navigationBarBackgroundColor: "#fff",
    backgroundColor: "#EFEFEF",
    style: {
      "app-plus": {
        background: "#F3F4F6",
      },
    },
  },
  tabBar: {
    backgroundColor: "#FFFFFF",
    color: "#8F8F94",
    selectedColor: "#0738A3",
    list: [
      {
        pagePath: "pages/tabbar/ahome/ahome",
        iconPath: "static/img/tabbar/01.png",
        selectedIconPath: "static/img/tabbar/01-1.png",
        text: "首页",
      },
      {
        pagePath: "pages/tabbar/perinfo/perinfo",
        iconPath: "static/img/tabbar/05.png",
        selectedIconPath: "static/img/tabbar/05-1.png",
        text: "我的",
      },
    ],
  },
};
