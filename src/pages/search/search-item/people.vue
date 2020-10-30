<!--
 * @Author: 曹捷
 * @Date: 2020-06-28 19:16:53
 * @LastEditors: 曹捷
 * @LastEditTime: 2020-08-05 15:34:57
 * @Description: 搜索 专家列表
--> 
<template>
  <div class="view-item">
    <div class="main-box flex-l-r title-content">
      <span class="bold fz-title">专家</span>
      <span @click="toMore" class="color-info">
        更多
        <span class="iconfont icon-right1"></span>
      </span>
    </div>
    <div class="main-content people-info list-content list-content-bottom p-l-10 p-r-10">
      <zlUser :key="item.userId" :userInfo="item" id="userId" type="focus" v-for="item in dataList">
        <template slot="operate" slot-scope="slot">
          <span @click="toQuestion(slot.slotScope)" class="btn-middle-2 p-r-5 p-l-5 m-l-10">
            <span class="iconfont icon-help p-r-5"></span> 提问
          </span>
        </template>
      </zlUser>
    </div>
  </div>
</template>

<script>
import pageLoadMore from '@/app-modules/mixin/pageLoadMore'
import zlUser from '@/app-modules/components/zl-user/zl-user'

export default {
  components: { zlUser },
  mixins: [pageLoadMore],
  props: {
    searchValue: {
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
    toQuestion(item) {
      this.$app.goto(
        `/pages/question/myquestion/questionInvite?userId=${item.userId}&realName=${item.realName}`
      )
    },
    init() {
      this.params.search = this.searchValue
      this.queryDataList(true)
    },
    toMore() {
      this.$app.goto(`/pages/expert/expertList?search=${this.searchValue}`)
    },
  },
  mounted() {
    this.tableRequest = 'getExpertInfoList'
    this.init()
  },
}
</script>

<style>
</style>