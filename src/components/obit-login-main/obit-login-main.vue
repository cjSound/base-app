<!--
 * @Author: 曹捷
 * @Date: 2019-10-10 19:55:56
 * @LastEditors: 曹捷
 * @LastEditTime: 2020-04-28 17:08:47
 * @Description: file content
 -->
<template>
  <div class="obit-login-main">
    <obit-login @reload="reload" ref="obitLogin" v-model="login"></obit-login>
  </div>
</template>

<script>
import obitLogin from '@/components/obit-login/obit-login'
import { mapGetters } from 'vuex'

export default {
  props: {
    hasReload: {
      type: Boolean,
      default: false
    }
  },
  components: {
    obitLogin
  },
  computed: {
    ...mapGetters(['openLogin'])
  },
  watch: {
    openLogin: {
      handler() {
        this.openLoginInfo()
      },
      deep: true
    }
  },
  data() {
    return {
      login: this.openLogin
    }
  },
  methods: {
    reload() {
      this.$emit('reload')
    },
    openLoginInfo() {
      if (this.login && this.openLogin.open) {
        this.login = false
        setTimeout(() => {
          this.login = true
        }, 400)
      } else {
        this.login = this.openLogin.open
      }
    }
  },
  mounted() {
    console.log('创建', 1)
  },
  destroyed() {
    console.log('销毁', 1)
    // this.$store.commit('setLogin', false)
  }
}
</script>

<style>
</style>