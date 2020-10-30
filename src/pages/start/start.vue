<!--
 * @Author: 曹捷
 * @Date: 2020-06-13 21:28:23
 * @LastEditors: 曹捷
 * @LastEditTime: 2020-07-30 20:29:41
 * @Description: APP进来的引导页
 引入了单个图片背景
 或者是多个图片切换展示
--> 
<template>
  <view class="main">
    <appMain :url="mainUrl" :waitTime="5"></appMain>
    <startApp v-if="guidePages"></startApp>
  </view>
</template>

<script>
import startApp from '@/app-modules/components/start-app/start-app.vue'
import appMain from '@/app-modules/components/start-app/app-main.vue'
export default {
  components: {
    startApp,
    appMain,
  },
  data() {
    return {
      // mainUrl: 'http://www.one-bit.cn/zlappdown/img/down.png',
      mainUrl: require('@/static/start/start.png'),
      guidePages: false,
    }
  },
}
</script>

<style>
page,
.main {
  width: 100%;
  height: 100%;
}
</style>