<!--
 * @Author: 曹捷
 * @Date: 2020-06-23 17:05:09
 * @LastEditors: 曹捷
 * @LastEditTime: 2020-09-03 22:09:12
 * @Description: 搜索界面
--> 
<template>
  <div class="app-main back-while">
    <view class="status_bar"></view>
    <obit-search-bar
      @cancel="cancel"
      @confirm="toSearch"
      cancelButton="always"
      class="back-nav"
      clearButton="always"
      placeholder="搜索问题、知识、专家、文章"
      radius="5"
      ref="searchBar"
      v-model="inputValue"
    />
    <!-- 初始化展示历史信息和热门关键词 -->
    <searchTips @search="toSearch" v-if="searchValue ===''" v-model="searchValue"></searchTips>
    <searchView v-if="searchValue!==''" v-model="searchValue"></searchView>
  </div>
</template>

<script>
import searchTips from './searchTips'
import searchView from './searchView'
import obitSearchBar from '@/app-modules/components/obit-search-bar/obit-search-bar'
export default {
  components: { searchTips, searchView, obitSearchBar },
  data() {
    return {
      inputValue: '',
      searchValue: '',
      options: {},
      cache: this.$app.cachInfo('historyCach'),
    }
  },
  methods: {
    //   取消搜索
    cancel(e) {
      uni.navigateBack()
    },
    //   搜索
    toSearch(item) {
      this.inputValue = item.value
      this.$refs.searchBar.show = true

      this.$refs.searchBar.searchVal = item.value
      this.searchValue = item.value
      if (item.value) {
        this.historyCach()
        this.historyInfo()
      }
    },
    historyCach() {
      let list = this.cache.dataList ? this.cache.dataList : []
      let index = list.indexOf(this.searchValue)
      if (index !== -1) {
        let value = list.splice(index, 1)[0]
        list.splice(0, 0, value)
      } else {
        list.unshift(this.searchValue)
      }
      this.cache.set(list.splice(0, 20))
    },
    historyInfo() {
      let data = {
        searchKey: this.searchValue,
      }
      this.$http.saveSearchInfo(data)
    },
  },
  onLoad(e) {
    this.options = e
    if (e.value) {
      this.$nextTick(() => {
        this.toSearch(this.options)
      })
    }
  },
  mounted() {},
}
</script>

<style lang="scss">
.status_bar {
  height: var(--status-bar-height);
  width: 100%;
  background: #0738a3;
}
</style>
