<!--
 * @Author: 曹捷
 * @Date: 2020-06-23 19:16:16
 * @LastEditors: 曹捷
 * @LastEditTime: 2020-09-03 22:09:57
 * @Description: 搜索结果展示界面
--> 
<template>
  <div class="searchView">
    <div class="searchView-main m-b-20">
      <people :searchValue="value"></people>
      <knowledge :searchValue="value" type="2"></knowledge>
      <searchQuestion :searchValue="value"></searchQuestion>
      <knowledge :searchValue="value" type="1"></knowledge>
    </div>
  </div>
</template>

<script>
import people from './search-item/people'
import knowledge from './search-item/knowledge'
import searchQuestion from './search-item/searchQuestion'
export default {
  components: { people, knowledge, searchQuestion },
  props: {
    value: {
      type: String,
    },
  },
  data() {
    return {}
  },
  watch: {
    value() {
      this.initSearch()
    },
  },
  methods: {
    initSearch() {},
  },
  mounted() {
    this.initSearch()
  },
}
</script>

<style lang="scss">
</style>
