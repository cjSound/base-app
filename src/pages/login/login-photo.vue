<!--
 * @Author: 曹捷
 * @Date: 2020-06-09 11:19:05
 * @LastEditors: 曹捷
 * @LastEditTime: 2020-08-10 09:34:34
 * @Description: file content
--> 
<template>
  <div class="zaiui-login-content">
    <uni-nav-bar :border="false" :fixed="true" background-color="#FFFFFF" color="#333333">
      <block slot="left">
        <span @click="goBack" class="iconfont icon-fanhui p-l-10"></span>
      </block>
    </uni-nav-bar>
    <div class="login-title flex-l-r">
      <div class="left">欢迎回来</div>
      <div class="right">手机号登录</div>
    </div>
    <div class="login-info">
      <span class="iconfont icon-phone" style="color:#3A6AD5"></span>
      手机号码
      <!-- <uniIcon :size="40" class="login-icon" color="#3A6AD5" type="person" /> -->
    </div>
    <div class="content p-t-20">
      <div class="flex login-input">
        <picker :range="nationArray" :value="index" @change="bindPickerChange" class="login-icon p-r-5" range-key="name">
          <view class="uni-input">{{nationArray[index].key}}</view>
        </picker>
        <span class="iconfont icon-moreunfold login-icon p-t-5" style="color:#000"></span>
        <input class="phone-input" placeholder="请输入手机号码" v-model="params.phone" />
      </div>
    </div>
    <view class="foot-view login-photo-foot">
      <view class="zaiui-btn-view">
        <button :class="{'btn-disable':!validateStatus}" @click="getMessage" class="zaiui-btn">获取验证码</button>
      </view>
      <view class="font-tag-view">
        <text @tap="tapLogin" class="font-tag">账号密码登录</text>
        <!-- <text class="font-tag">微信登录</text> -->
      </view>
    </view>
  </div>
</template>

<script>
import uniIcon from '@/components/uni-icons/uni-icons.vue'
import validate from '@/app-modules/mixin/validate.js'

export default {
  mixins: [validate],
  data() {
    return {
      nationArray: [{ key: '+86', name: '中国' }],
      code: '+86',
      index: 0,
      params: {
        phone: '',
      },
      rules: {
        phone: [
          { required: true, message: '请输入手机号码' },
          { type: 'phone', message: '请输入正确的手机号码' },
        ],
      },
    }
  },
  computed: {
    validateStatus() {
      let valide = this.validate(this.params, this.rules, false)
      return valide
    },
  },
  methods: {
    tapLogin() {
      this.$app.goto('/app-modules/pages/login/login')
    },
    getMessage() {
      let valide = this.validate(this.params, this.rules)
      if (valide) {
        this.$http.userSendCodeByPhone(this.params.phone).then((res) => {
          this.$app.goto(
            `/app-modules/pages/login/login-message?key=${
              this.nationArray[this.index].key
            }&phone=${this.params.phone}`
          )
          //   url: `/app-modules/pages/login/login-message?phone=${this.params.phone}`,
        })
      }
    },
    goBack() {
      uni.navigateBack()
    },
    bindPickerChange(e) {
      this.index = e.detail.value
    },
  },
}
</script>

<style lang="scss">
.login-photo-foot {
  position: inherit;
  padding-top: 130rpx;
  bottom: 0;
}
</style>