<!--
 * @Author: 曹捷
 * @Date: 2020-06-09 09:17:12
 * @LastEditors: 曹捷
 * @LastEditTime: 2020-10-29 17:31:11
 * @Description: 个人中心
-->
<template>
  <div class="app-main perinfo-main" v-if="initLoad">
    <div class="bkg back-body"></div>
    <div class="perinfo-head" v-if="hasLogin">
      <div class="head-top">
        <div class="header">
          <obit-image :src="userInfo.photoUrl" class="width100" type="man" />
        </div>
        <div class="flex-t-a">
          <div class="flex-l-r">
            {{ userInfo.userName }}
          </div>
          <p>{{ userInfo.orgName }}</p>
        </div>
      </div>
    </div>
    <div class="main-content m-t-10" v-if="hasLogin">
      <div @click="loginOut" class="obit-list">
        <div class="list-item">
          <span class="iconfont icon-tuichu p-r-10 p-l-5"></span>
          退出登录
          <span class="iconfont icon-right1 f-r color-light"></span>
        </div>
      </div>
    </div>
  </div>
  <obitLoading :active="!initLoad" v-else></obitLoading>
</template>

<script>
import utilMix from '@/app-modules/mixin/utilMix'
export default {
  mixins: [utilMix],
  data () {
    return {
      initLoad: false,
      userCenterInfo: {},
    }
  },
  methods: {
    loginOut () {
      uni.clearStorageSync()
      this.$store.commit('setLogin', {})
      uni.reLaunch({
        url: '/pages/login/login',
      })
    },
    init (callback) {
      this.$http.getUserCenter().then((res) => {
        this.userCenterInfo = res
        if (callback) {
          callback()
        }
      })
    },
  },
  onPullDownRefresh () {
    this.init(() => {
      uni.stopPullDownRefresh()
    })
  },
  mounted () {
    setTimeout(() => {
      this.initLoad = true
    }, 1000)
  },
  onShow () {
    console.log('onShow -> onShow')
    this.init()
  },
}
</script>

<style lang="scss">
.perinfo-main {
  .btn-label {
    line-height: 1;
  }
  .bkg {
    background: $navColor;
    height: 200rpx;
    width: 100%;
  }
  .head-top {
    display: flex;
    justify-content: flex-start;
  }
  .flex-t-a {
    flex: 1;
  }

  .header {
    width: 120rpx;
    height: 120rpx;
    line-height: 120rpx;
    margin: 0 40rpx;
    .width100 {
      border-radius: 20rpx;
    }
  }
  .headerimg {
    width: 100%;
    height: 100%;
    display: inline-block;
    border-radius: 10rpx;
    background: #ebebeb;
    color: #aaaaaa;
    text-align: center;
    .iconfont {
      font-size: 66rpx;
    }
  }
  .perinfo-head {
    margin: 0 16rpx;
    background: #fff;
    border-radius: 20rpx;
    padding: 40rpx 0;
    margin-top: -140rpx;
  }
}
</style>
