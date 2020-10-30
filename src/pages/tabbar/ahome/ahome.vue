<!--
 * @Author: 曹捷
 * @Date: 2020-06-09 09:17:12
 * @LastEditors: 曹捷
 * @LastEditTime: 2020-10-29 17:17:01
 * @Description: 首页
-->
<template>
  <div class="app-main">
    <homeSwiper ref="homeSwiper"></homeSwiper>
    <div class="app-foot"></div>
  </div>
</template>

<script>
import { toLogin } from '@/app-modules/utils/user'
import { mapGetters } from 'vuex'
import homeSwiper from './home-swiper'
export default {
  components: { homeSwiper },
  computed: {
    ...mapGetters(['requestd', 'loading']),
  },
  data () {
    return {
      visable: false,
    }
  },
  methods: {
    focusConfirm (item) {
      this.$app.goto(`/pages/search/search?value=${item.name}`)
    },
    init () {
      for (const key in this.$refs) {
        this.$refs[key].init()
      }
    },
  },
  mounted () {
    this.$nextTick(() => {
      this.init()
    })
  },
  onNavigationBarButtonTap (e) {
    if (e.index === 0) {
      this.$app.goto('/pages/search/search')
    } else {
      this.visable = true
    }
  },
  watch: {
    requestd (value) {
      if (!value) {
        uni.stopPullDownRefresh()
      }
    },
  },
  onPullDownRefresh () {
    this.init()
  },
}
</script>

<style lang="scss"></style>
