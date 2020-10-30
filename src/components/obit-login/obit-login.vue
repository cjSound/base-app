<!--
 * @Author: 曹捷
 * @Date: 2019-09-05 15:58:35
 * @LastEditors: 曹捷
 * @LastEditTime: 2020-04-28 17:00:17
 * @Description: file content
 -->
<template>
  <div>
    <uni-popup :mask-click="false" class="obit-popup" ref="popup">
      <div class="addContent">
        <div class="t-c fz-t p-t-20">登 录</div>
        <div class="popup-item">
          <div class="title">手机号码</div>
          <div class="input-content">
            <input placeholder="点击输入登陆号码" type="number" v-model="userInfo.userName" />
          </div>
        </div>
        <div class="popup-item">
          <div class="title">验证码</div>
          <div class="input-content flex-l-r">
            <input placeholder="点击输入" type="number" v-model="userInfo.yzm" />
            <span
              :style="{'color':getCodeBtnColor,border:'1px solid '+getCodeBtnColor}"
              @click="getMessage"
              class="obit-btn obit-btn-empty-active"
            >{{getCodeText}}</span>
          </div>
        </div>
        <div class="addSubmit">
          <button @click="phoneLogin" class="obit-btn-defult obit-full m-t-10">登 录</button>
        </div>
        <!-- #ifdef MP-WEIXIN -->
        <div class="addSubmit">
          <button @getuserinfo="getuserinfo" class="obit-btn-green obit-full m-t-10" open-type="getUserInfo">微信授权登录</button>
        </div>
        <!-- #endif -->
      </div>
    </uni-popup>
    <uni-popup :custom="true" :mask-click="false" :show="photoShow">
      <view class="uni-tip">
        <view class="uni-tip-title">微信手机号码授权</view>
        <view class="uni-tip-content">授权后请确认手机号码是否有误，确认将直接登陆系统</view>
        <view class="uni-tip-group-button">
          <button @click="cancel" class="uni-tip-button">取消</button>
          <button @getphonenumber="getphonenumber" class="uni-tip-button" open-type="getPhoneNumber">去授权</button>
        </view>
      </view>
    </uni-popup>
  </div>
</template>

<script>
import uniPopup from '@/components/uni-popup/uni-popup.vue'

export default {
  components: { uniPopup },
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      visible: this.value,
      // 通过手机号码 加验证码登陆方式
      userInfo: {
        userName: '',
        yzm: ''
      },
      user: {}, // 微信授权获取的用户信息
      wxPhone: {}, // 微信授权获取到的手机信息 需要解密
      wxuser: {}, // 系统初始化的时候获取的用户信息  包含wxid
      getCodeText: '获取验证码',
      getCodeBtnColor: '#2FA9FC',
      Timer: '',
      photoShow: false
    }
  },
  watch: {
    value(value) {
      if (value) {
        this.openLogin()
      } else {
        this.closeLogin()
      }
    },
    visible() {
      if (this.visible) {
        this.openLogin()
      } else {
        this.closeLogin()
      }
    }
  },
  methods: {
    test() {
      this.closeLogin()
    },
    hasLogin() {
      let userInfo = uni.getStorageSync('userInfo')
      if (userInfo && userInfo.accessToken) {
        return true
      } else {
        this.openLogin()
        return false
      }
    },
    closeLogin() {
      // this.$store.commit('setLogin', false)
      this.$refs.popup.close()
      this.$emit('on-close')
    },
    openLogin() {
      this.$refs.popup.open()
      // #ifdef MP-WEIXIN
      wx.checkSession({
        success() {
          console.log('TCL: session_key -> 未过期，并且在本生命周期一直有效')
          //session_key 未过期，并且在本生命周期一直有效
        },
        fail() {
          console.log('TCL: fail -> fail', '微信 session key 已经失效')
          // session_key 已经失效，需要重新执行登录流程
          uni.login({
            success(res) {
              console.log('TCL: success -> res', res)
              if (res.code) {
                uni.setStorageSync('jsCode', res.code)

                this.$http.getWxUserInfo({ jsCode: res.code }).then(res => {
                  res.personId =
                    res.userType === 0 ? res.relationId : res.focusPersonId
                  uni.setStorageSync('userInfo', res)
                  uni.setStorageSync('wxid', res.wxid)
                })
              }
            }
          })
        }
      })
      // #endif
    },
    /**
     * 发送消息
     */
    getMessage() {
      uni.hideKeyboard()
      if (this.getCodeisWaiting) {
        return
      }
      //验证手机号码
      if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.userInfo.userName)) {
        uni.showToast({ title: '请填写正确手机号码', icon: 'none' })
        return false
      }
      this.getCodeText = '发送中...'
      this.getCodeisWaiting = true
      this.getCodeBtnColor = 'rgba(47, 169, 252, 0.5)'
      this.$http
        .sendMessage({ phone: this.userInfo.userName })
        .then(res => {
          uni.showToast({ title: '验证码已发送', icon: 'none' })
          this.setTimer()
        })
        .catch(res => {
          this.getCodeText = '获取验证码'
          this.getCodeisWaiting = false
          this.getCodeBtnColor = 'rgba(47, 169, 252, 1)'
        })
    },
    setTimer() {
      let holdTime = 60
      this.getCodeText = '重新获取(60)'
      this.Timer = setInterval(() => {
        if (holdTime <= 0) {
          this.getCodeisWaiting = false
          this.getCodeBtnColor = 'rgba(47, 169, 252, 1)'
          this.getCodeText = '获取验证码'
          clearInterval(this.Timer)
          return
        }
        this.getCodeText = '重新获取(' + holdTime + ')'
        holdTime--
      }, 1000)
    },
    getuserinfo(e) {
      console.log('TCL: getuserinfo -> e', e)
      this.user = e.detail.userInfo
      this.$emit('input', false)
      this.photoShow = true
    },
    getphonenumber(e) {
      this.wxPhone = e.detail
      if (this.wxPhone.iv) {
        this.$http
          .decWxPhoto({
            ivStr: this.wxPhone.iv,
            encryptedData: this.wxPhone.encryptedData,
            wxid: uni.getStorageSync('wxid')
          })
          .then(res => {
            this.wxPhone.phoneNumber = res.phoneNumber
            this.wxLogin()
            console.log('TCL: getphonenumber -> res', res)
          })
      } else {
        this.photoShow = false
        this.$emit('input', true)
        this.$emit('reload')
      }
    },
    wxLogin() {
      let param = {
        userName: this.wxPhone.phoneNumber,
        wxid: uni.getStorageSync('wxid'),
        avatarUrl: this.user.avatarUrl,
        nickName: this.user.nickName,
        systemType: 'terminal'
      }
      this.$http.tologin(param).then(res => {
        res.personId = res.userType === 0 ? res.relationId : res.focusPersonId
        uni.setStorageSync('userInfo', res)
        this.$emit('input', false)
        this.closeLogin()
        this.photoShow = false
        this.$emit('reload')
      })
    },
    phoneLogin() {
      uni.hideKeyboard()
      //验证手机号码
      if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.userInfo.userName)) {
        uni.showToast({ title: '请填写正确手机号码', icon: 'none' })
        return false
      }
      if (!this.userInfo.yzm) {
        uni.showToast({ title: '请输入验证码', icon: 'none' })
        return false
      }
      this.$http
        .tologin(Object.assign({ systemType: 'terminal' }, this.userInfo))
        .then(res => {
          res.personId = res.userType === 0 ? res.relationId : res.focusPersonId
          uni.setStorageSync('userInfo', res)
          this.$emit('input', false)
          this.closeLogin()
          this.$emit('reload')
        })
    },
    cancel() {
      this.photoShow = false
    }
  },
  beforeDestroyed() {
    console.log('beforeDestroyed -> beforeDestroyed', 222)
    this.closeLogin()
  },
  mounted() {
    this.wxuser = uni.getStorageSync('userInfo')
  }
}
</script>

<style lang="scss">
/* 提示窗口 */
.uni-tip {
  padding: 30rpx;
  width: 560rpx;
  background: #fff;
  box-sizing: border-box;
  border-radius: 20rpx;

  .uni-tip-title {
    text-align: center;
    font-weight: bold;
    font-size: 32rpx;
    color: #333;
  }

  .uni-tip-content {
    padding: 30rpx;
    font-size: 30rpx;
    color: #666;
  }

  .uni-tip-group-button {
    margin-top: 20rpx;
    display: flex;
  }

  .uni-tip-button {
    width: 100%;
    text-align: center;
    font-size: 30rpx;
    color: #3b4144;
    background: #fff;
  }
  .uni-tip-button::after {
    border: 0px solid #fff;
  }
}
</style>