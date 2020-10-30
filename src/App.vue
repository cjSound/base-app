<!--
 * @Author: 曹捷
 * @Date: 2019-08-21 17:23:30
 * @LastEditors: 曹捷
 * @LastEditTime: 2020-09-09 10:30:02
 * @Description: file content
 -->
<script>
// uniapp 个推监听
export default {
  onLaunch: function () {
    this.initStore();
  },
  mounted() {
    this.checkUpdateVersion();
  },
  methods: {
    initStore() {
      let userInfo = uni.getStorageSync("userInfo");
      if (userInfo && userInfo.accessToken) {
        this.$store.commit("setLogin", userInfo);
      }
    },
    checkUpdateVersion() {
      //创建 UpdateManager 实例
      const updateManager = uni.getUpdateManager();
      //检测版本更新
      updateManager.onCheckForUpdate(function (res) {
        // 请求完新版本信息的回调
        if (res.hasUpdate) {
          //监听小程序有版本更新事件
          updateManager.onUpdateReady(function () {
            uni.showModal({
              title: "更新提示",
              content: "新版本已经准备好，是否重启应用？",
              success(res) {
                if (res.confirm) {
                  // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                  updateManager.applyUpdate();
                }
              },
            });
          });
          updateManager.onUpdateFailed(function () {
            // 新版本下载失败
            uni.showModal({
              title: "已经有新版本咯~",
              content:
                "请您删除当前小程序，到微信 “发现-小程序” 页，重新搜索打开呦~",
            });
          });
        }
      });
    },
  },
  onShow() {
    // #ifdef APP-PLUS
    // let info = { url: '/pages/center/space/space?id=1' }
    //    plus.push.createMessage("支付宝到账：100万元", JSON.stringify(info), {
    // 		"body": "支付宝到账：100万元",
    // 		"subtitle": "中国人民银行向您转账",
    // 		"title": "收到一条转账消息"
    // 	});
    // 	console.log('onshow')
    // 	let msg = {
    // 	"__UUID__": "androidPushMsg221082001",
    // 	"title": "中铝知识分享平台",
    // 	"content": "支付宝到账：9999900万元",
    // 	"payload": "支付宝到账：9999900万元"
    // }
    // 	let options ={cover:false,title:msg.title}
    // 	plus.push.createMessage(msg.content, msg.payload, options);
    // #endif
  },
  onHide: function () {
    console.log("App Hide");
  },
};
</script>

<style lang="scss">
@import "./app-modules/style/uni.css";
@import "./app-modules/style/iconfont.css";
@import "./app-modules/style/common.css";
@import "./app-modules/style/index.scss";
// @import url('/components/gaoyia-parse/parse.css');

page {
  width: 100%;
  min-height: 100%;
  height: 100%;
}
</style>
