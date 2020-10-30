<!--
 * @Author: 曹捷
 * @Date: 2020-06-09 11:53:54
 * @LastEditors: 曹捷
 * @LastEditTime: 2020-08-10 09:40:09
 * @Description: file content
--> 

<template>
  <view class="zaiui-login-content">
    <uni-nav-bar :border="false" :fixed="true" background-color="#FFFFFF" color="#333333">
      <block slot="left">
        <span @click="goBack" class="iconfont icon-fanhui p-l-10"></span>
      </block>
    </uni-nav-bar>
    <view class="content">
      <view class="title-h">输入验证码</view>
      <view class="introduce">
        <text>验证码已经发送至 {{params.key}} {{params.userName}}</text>
      </view>
      <view @tap="showNumLockTap" class="zaiui-flex-view checking-view">
        <view class="flex-sub text-center">{{codeKey[0]}}</view>
        <view class="flex-sub text-center">{{codeKey[1]}}</view>
        <view class="flex-sub text-center">{{codeKey[2]}}</view>
        <view class="flex-sub text-center">{{codeKey[3]}}</view>
        <view class="flex-sub text-center">{{codeKey[4]}}</view>
        <view class="flex-sub text-center">{{codeKey[5]}}</view>
      </view>
      <view class="right-tip-view">
        <!-- <text>收不到验证码？</text> -->
        <text @tap="checking" class="tap" v-if="!state">重新获取验证码</text>
        <text v-else>{{currentTime}}s 后可重新获取验证码</text>
      </view>
    </view>
    <view class="foot-view login-photo-foot">
      <view @click="tologin" class="zaiui-btn-view">
        <button class="zaiui-btn">登录</button>
      </view>
      <view class="font-tag-view">
        <!-- <text @tap="tapLogin" class="font-tag">密码登录</text> -->
        <!-- <text class="font-tag">微信登录</text> -->
      </view>
    </view>

    <!--数字键盘-->
    <view :class="NumLock?'show':''" class="num-lock-view">
      <view class="num-lock-head">
        <view class="title" v-if="codeBak == ''">安全数字键盘</view>
        <view class="code-bak-view" v-else>
          <text @tap="codeBakTap" class="code-text">使用: {{codeBak}}</text>
          <text @tap="codeBakCloseTap" class="cuIcon-close close-icon" />
        </view>
        <text @tap="closeNumLockTap" class="close">关闭</text>
      </view>
      <view class="key-grid-list">
        <block :key="index" v-for="(item,index) in 9">
          <view @tap="codeKeyTap(item)" class="key-item">
            <text class="num">{{item}}</text>
          </view>
        </block>
        <view class="key-item">
          <text class="num" />
        </view>
        <view @tap="codeKeyTap(0)" class="key-item">
          <text class="num">0</text>
        </view>
        <view @tap="codeKeyDelTap" class="key-item">
          <uniIcon :size="20" class="login-icon" color="#0738A3" type="closeempty" />
        </view>
      </view>
    </view>
  </view>
</template>
<script>
import uniIcon from '@/components/uni-icons/uni-icons.vue'
import { loginSuccess } from '@/app-modules/utils/user'
export default {
  components: { uniIcon },
  data() {
    return {
      state: true, //是否开启倒计时
      totalTime: 60, //总时间 单位秒
      recordingTime: 0, //记录时间变量
      currentTime: 60, //显示时间变量
      codeKey: [],
      NumLock: false,
      codeBak: '',
      options: {},
      params: {
        userName: '',
        verifyCode: '',
        type: 2,
      },
    }
  },
  onLoad(options) {
    this.params.key = options.key
    this.params.userName = options.phone
  },
  onShow() {
    // #ifdef APP-PLUS
    uni.getClipboardData({
      success: (res) => {
        if (res.data && res.data.length === 6) {
          this.codeBak = res.data
        }
      },
    })
    // #endif
  },
  methods: {
    tologin() {
      if (this.codeKey.length !== 6) {
        uni.showToast({
          icon: 'none',
          title: '请输入完整的验证码',
        })
        return
      }
      this.params.verifyCode = this.codeKey.join('')
      loginSuccess.call(this, this.params)
    },
    checking() {
      this.$http.userSendCodeByPhone(this.params.userName).then((res) => {
        //把显示时间设为总时间
        this.currentTime = this.totalTime
        //开始倒计时
        this.state = true
        //执行倒计时
        this.checkingTime()
      })
    },
    checkingTime() {
      let that = this
      //判断是否开启
      if (this.state) {
        //判断显示时间是否已到0，判断记录时间是否已到总时间
        if (this.currentTime > 0 && this.recordingTime <= this.totalTime) {
          //记录时间增加 1
          this.recordingTime = this.recordingTime + 1
          //显示时间，用总时间 - 记录时间
          this.currentTime = this.totalTime - this.recordingTime
          //1秒钟后，再次执行本方法
          setTimeout(() => {
            //定时器内，this指向外部，找不到vue的方法，所以，需要用that变量。
            that.checkingTime()
          }, 1000)
        } else {
          //时间已完成，还原相关变量
          this.state = false //关闭倒计时
          this.recordingTime = 0 //记录时间为0
          this.currentTime = this.totalTime //显示时间为总时间
        }
      } else {
        //倒计时未开启，初始化默认变量
        this.state = false
        this.recordingTime = 0
        this.currentTime = this.totalTime
      }
    },
    tapLogin() {
      this.$app.goto('/app-modules/pages/login/login')
    },
    goBack() {
      uni.navigateBack()
    },
    showNumLockTap() {
      this.NumLock = true
    },
    codeKeyTap(index) {
      if (this.codeKey.length < 6) {
        this.codeKey.push(index)
        if (this.codeKey.length === 6) {
          this.closeNumLockTap()
        }
      }
    },
    codeKeyDelTap() {
      this.codeKey.pop()
    },
    closeNumLockTap() {
      this.NumLock = false
    },
    codeBakTap() {
      let str = this.codeBak
      let arr = []
      for (let i = 0; i < str.length; i++) {
        let nstr = str.slice(i, i + 1)
        arr.push(nstr)
      }
      this.codeKey = arr
      this.codeBak = ''
    },
    codeBakCloseTap() {
      this.codeBak = ''
    },
  },
  mounted() {
    this.checkingTime()
  },
}
</script>

<style lang="scss">
.login-photo-foot {
  .zaiui-btn {
    background-color: #0738a3;
  }
}
</style>