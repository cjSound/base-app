<!--
 * @Author: 曹捷
 * @Date: 2020-06-23 19:19:30
 * @LastEditors: 曹捷
 * @LastEditTime: 2020-08-05 16:20:03
 * @Description: 搜索提示  热门搜索界面
--> 
<template>
  <div class="searchTips">
    <div class="history search-item">
      <div class="flex-l-r p-b-10">
        <span class="bold fz-title">历史搜索</span>
        <span @click="removeHis" class="color-info iconfont icon-delete"></span>
      </div>
      <div class="search-item-content">
        <span :key="'key'+i" @click="search(item)" class="btn-search" v-for="(item,i) in historyList">{{item}}</span>
        <span @click="showMoreHistory" class="btn-search" v-if="hasHisMore">
          <span class="iconfont icon-bottom"></span>
        </span>
        <span :key="'more'+i" @click="search(item)" class="btn-search" v-for="(item,i) in historyMoreList" v-show="!hasHisMore">{{item}}</span>
      </div>
    </div>
    <div class="history search-item">
      <div class="flex-l-r p-b-10">
        <span class="bold fz-title">热门搜索</span>
      </div>
      <div class="search-item-content">
        <span :key="item.searchId" @click="search(item.searchKey)" class="btn-search" v-for="item in dataList">{{item.searchKey}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import pageLoadMore from '@/app-modules/mixin/pageLoadMore'
export default {
  mixins: [pageLoadMore],
  data() {
    return {
      searchParams: {
        pageNum: 1,
        pageSize: 20,
      },
      historyTempList: [],
      historyList: [],
      historyMoreList: [],
      hasHisMore: false,
      cache: this.$app.cachInfo('historyCach'),
    }
  },
  methods: {
    removeHis() {
      uni.showModal({
        title: '提示',
        content: '确认要清空所有查询历史',
        success: (res) => {
          if (res.confirm) {
            this.cache.remove()
            this.initHistory()
          }
        },
      })
    },
    showMoreHistory() {
      this.hasHisMore = false
    },
    // 初始化加载历史
    initHistory() {
      let list = this.cache.dataList ? this.cache.dataList : []
      if (list.length > 6) {
        this.hasHisMore = true
        this.historyList = list.splice(0, 6)
        this.historyMoreList = list
      } else {
        this.historyList = list
      }
    },

    search(value) {
      this.$emit('search', { value: value })
    },
  },
  mounted() {
    this.initHistory()
    this.tableRequest = 'getHistoryList'
    this.queryDataList(true)
  },
}
</script>

<style lang="scss">
.search-item {
  padding: 50rpx 20rpx 0 20rpx;
  .btn-search {
    padding: 20rpx 24rpx;
    background: #f8f8f8;
    color: #666666;
    display: inline-block;
    border-radius: 60rpx;
    margin: 9rpx;
  }
}
</style>