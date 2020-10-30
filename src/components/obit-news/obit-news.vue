<!--
 * @Author: 曹捷
 * @Date: 2019-09-03 16:15:17
 * @LastEditors: 曹捷
 * @LastEditTime: 2019-10-18 11:54:57
 * @Description: 新闻模板组件
 -->
<template>
  <view class="uni-list obit-list">
    <view :key="key" @click="choiceItem(value)" class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(value,key) in dataList">
      <view class="uni-media-list obit-news">
        <view class="uni-media-list-logo">
          <image :src="value.thumbnailUrl" />
        </view>
        <view class="uni-media-list-body">
          <view class="uni-media-list-text-top title">{{value.title}}</view>
          <view class="uni-media-list-text-bottom uni-ellipsis">{{value.publishTime |timeLong}}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    dataList: {
      type: Array
    }
  },
  methods: {
    choiceItem(item) {
      this.$emit('change', item)
    }
  }
}
</script>

<style>
</style>