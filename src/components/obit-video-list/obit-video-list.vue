<!--
 * @Author: 曹捷
 * @Date: 2019-09-03 18:35:54
 * @LastEditors: 曹捷
 * @LastEditTime: 2019-10-30 15:29:09
 * @Description: file content
 -->
<template>
  <div class="photo">
    <div :key="i" class="videoItem" v-for="(it,i) in dataList">
      <image :src="it.thumbnailUrl" @click="change(it)" class="img" lazy-load />
      <!-- <div class="video-time">
        <div class="full"></div>
        <span class="iconfont icon-bofang"></span>
        {{it.fileLength}}
      </div>-->
      <div class="videoName">{{it[title]}}</div>
    </div>
    <div class="em"></div>
  </div>
</template>

<script>
export default {
  props: {
    dataList: {
      type: Array
    },
    title: {
      type: String,
      default: 'imageDesc'
    }
  },
  methods: {
    change(item) {
      this.$emit('change', item)
    }
  }
}
</script>

<style lang="scss">
.photo {
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  justify-content: space-around;
  .videoItem {
    width: 350rpx;
    margin-bottom: 50rpx;
    position: relative;
    .video-time {
      position: absolute;
      top: 148rpx;
      right: 20rpx;
      padding: 0 20rpx;
      color: #fff;
      z-index: 1;
      .iconfont {
        font-size: 25rpx;
        padding-right: 4rpx;
      }
      .full {
        border-radius: 40rpx;
        z-index: -1;
      }
    }
    .videoName {
      font-size: 32rpx;
      color: #111111;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .img {
    width: 350rpx;
    height: 200rpx;
    border-radius: 20rpx;
    margin-bottom: 20rpx;
  }
  .em {
    width: 350rpx;
  }
}
</style>