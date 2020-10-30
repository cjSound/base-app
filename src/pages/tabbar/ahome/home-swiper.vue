<!--
 * @Author: 曹捷
 * @Date: 2019-09-20 11:59:47
 * @LastEditors: 曹捷
 * @LastEditTime: 2020-10-30 09:51:25
 * @Description: file content
 -->
<template>
  <uni-swiper-dot :current="currentIndex" :dotsStyles="dotsStyles" :info="info"
    class="home-swiper back border-top back-while" field="content" mode="long">
    <swiper @change="swiperChange" autoplay class="swiper-box">
      <swiper-item :key="index" v-for="(item, index) in info">
        <view :class="item.colorClass" @click="toSecond(item)" class="swiper-item">
          <image :src="item.fileUrl" class="img" />
        </view>
      </swiper-item>
    </swiper>
  </uni-swiper-dot>
</template>

<script>
import uniSwiperDot from '@/components/uni-swiper-dot/uni-swiper-dot.vue'

export default {
  components: { uniSwiperDot },
  data () {
    return {
      dotsStyles: {
        backgroundColor: '#fff',
        border: '1px rgba(0, 0, 0, .1) solid',
        color: '#fff',
        selectedBackgroundColor: '#fff',
        selectedBorder: '1px rgba(0, 0, 0, .3) solid',
      },
      currentIndex: 0,
      info: [{
        fileUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1604032720911&di=a99128373a49ac4a831c1796652ee157&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F1%2F57b2d0a2dce6a.jpg'
      }, {
        fileUrl: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2994864450,934824312&fm=26&gp=0.jpg'
      }],
      loadError: false,
    }
  },
  methods: {
    swiperChange (e) {
      this.currentIndex = e.detail.current
    },
    toSecond (item) {
      let list = [item.fileUrl]
      uni.previewImage({
        current: item.fileUrl,
        urls: list,
        success () { },
      })
    },
    init () {
      // this.$http.getAllSlide().then((res) => {
      //   this.loadError = false
      //   this.info = res
      // }).catch((res) => {
      //   this.loadError = true
      // })
    },
  },
  mounted () { },
}
</script>

<style lang="scss">
// 图片滚动
.home-swiper {
  .swiper-box {
    padding: 0 24rpx;
    margin-top: 12rpx;
    height: 375rpx;
  }
  .swiper-item {
    width: 100%;
    height: 100%;
    border-radius: 20rpx;
  }
  .img {
    width: 100%;
    height: 100%;
    border-radius: 20rpx;
  }
}
.swiper-box-grid {
  height: 375rpx;
  background: #fff;
}
</style>
