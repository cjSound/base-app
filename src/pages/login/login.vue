<!--
 * @Author: 曹捷
 * @Date: 2020-06-09 09:38:47
 * @LastEditors: 曹捷
 * @LastEditTime: 2020-09-09 17:47:51
 * @Description: file content
-->
<template>
  <view class="zaiui-login-content">
    <uni-nav-bar :border="false" :fixed="true" background-color="#FFFFFF" color="#333333">
      <block slot="left">
        <span @click="goBack" class="iconfont icon-fanhui p-l-10"></span>
      </block>
    </uni-nav-bar>
    <!-- <uni-nav-bar left-icon="back" left-text="返回" right-text="菜单" title="导航栏组件"></uni-nav-bar> -->

    <view class="logo-view">
      <!-- <span class="logo"></span> -->
      <!-- <image class="logo" mode="widthFix" src="@/static/img/login.jpg" /> -->
    </view>
    <view class="content">
      <view class="title-h">您好</view>
      <view class="introduce">欢迎使用 皮损简易评估工具</view>
      <div class="flex login-input">
        <uniIcon :size="20" class="login-icon" color="#0738A3" type="person" />
        <input class="phone-input" placeholder="请输入用户名" v-model="formData.userName" />
      </div>
      <div class="flex login-input">
        <uniIcon :size="20" class="login-icon" color="#0738A3" type="locked" />
        <input class="phone-input" password placeholder="请输入登录密码" v-model="formData.password" />
      </div>
    </view>
    <view class="foot-view">
      <view class="zaiui-btn-view">
        <button :class="{ 'btn-disable': !validateStatus }" @click="toLogin" class="zaiui-btn">
          进入小程序
        </button>
      </view>
      <view class="font-tag-view">
        <!-- <text class="font-tag">微信登录</text> -->
      </view>
      <view class="font-tag-view m-t-0"> </view>
    </view>
  </view>
</template>

<script>
import uniIcon from '@/components/uni-icons/uni-icons.vue'
import validate from '@/app-modules/mixin/validate.js'
import { loginSuccess } from '@/app-modules/utils/user'
import md5 from 'js-md5'

export default {
  mixins: [validate],
  components: {
    uniIcon,
  },
  data() {
    return {
      formData: {
        userName: '',
        password: '',
        type: 1,
      },
      rules: {
        userName: [{ required: true, message: '请输入用户名' }],
        password: [
          { required: true, message: '请输入密码' },
          { min: 6, max: 16, message: '密码长度必须在6-16个字符以内' },
        ],
      },
    }
  },
  computed: {
    validateStatus() {
      let valide = this.validate(this.formData, this.rules, false)
      return valide
    },
  },
  mounted() {},
  methods: {
    toLogin() {
      let valide = this.validate(this.formData, this.rules)
      if (valide) {
        let params = this.$util.util.cloneObj(this.formData)
        params.password = md5(params.password)
        loginSuccess.call(this, params)
      }
    },
    goBack() {
      uni.switchTab({
        url: '/pages/tabbar/ahome/ahome',
      })
    },
  },
}
</script>

<style lang="scss"></style>
