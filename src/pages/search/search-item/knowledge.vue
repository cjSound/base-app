<!--
 * @Author: 曹捷
 * @Date: 2020-08-05 15:43:31
 * @LastEditors: 曹捷
 * @LastEditTime: 2020-08-05 16:19:27
 * @Description: 搜索模块  知识和文章
-->
<template>
  <div class="view-item">
    <div class="main-box flex-l-r title-content">
      <span class="bold fz-title">{{type==='1'?'知识':'文章'}}</span>
      <span @click="toMore" class="color-info">
        更多
        <span class="iconfont icon-right1"></span>
      </span>
    </div>
    <div class="main-content people-info list-content list-content-bottom">
      <div :key="index" class="list-item" v-for="(item,index) in dataList ">
        <div @click="toDetails(item)" class="list-body">
          <div class="obit-oneline obit-title">{{item.title}}</div>
          <div class="flex-l-r p-t-10">
            <span class="color-info">{{item.realName}}</span>
            <span class="color-tips p-r-10">{{item.createTime}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import pageLoadMore from '@/app-modules/mixin/pageLoadMore'
export default {
  mixins: [pageLoadMore],
  props: {
    searchValue: {
      type: String,
    },
    type: {
      type: String,
    },
  },
  watch: {
    searchValue(value) {
      if (value) {
        this.init()
      }
    },
  },
  data() {
    return {
      searchParams: {
        pageNum: 1,
        pageSize: 3,
      },
    }
  },
  methods: {
    toDetails(item) {
      this.$app.goto(`/pages/article/articleDetails`, item)
    },
    init() {
      this.params.condition = this.searchValue
      this.queryDataList(true)
    },
    toMore() {
      this.$app.goto(
        `/pages/article/articleList?type=${this.type}&condition=${this.searchValue}`
      )
    },
  },
  mounted() {
    this.tableRequest = 'articleDataList'
    this.init()
  },
}
</script>

<style>
</style>