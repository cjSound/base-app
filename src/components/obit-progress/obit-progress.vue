<template>
  <div class="obit-progress">
    <div class="obit-progress-box">
      <div class="progress-circle"></div>
      <div :key="index" :style="{'transform': 'rotate('+item+'deg)'}" class="progress-rotate" v-for="(item,index) in rotateList"></div>
      <div class="progress-rotate" style="transform: rotate(-120deg);background: #f8f8f8;"></div>
      <div class="progress-rotate" style="transform: rotate(210deg);background: #f8f8f8;"></div>

      <div class="progress-inner-circle">
        <div class="obit-progress-content">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number
    }
  },
  data() {
    return {
      pvalue: '',
      rotateList: []
    }
  },
  watch: {
    value() {
      this.init()
    }
  },
  methods: {
    init() {
      this.pvalue = this.value > 1 ? 1 : this.value
      let rate = 240 * this.pvalue
      this.rotateList = []
      if (rate < 90) {
        this.rotateList.push(-120 + rate)
      } else if (rate < 180) {
        this.rotateList.push(-30)
        this.rotateList.push(-120 + rate)
      } else {
        this.rotateList.push(-30)
        this.rotateList.push(60)
        this.rotateList.push(-120 + rate)
      }
    }
  },
  mounted() {
    this.init()
  }
}
</script>

<style lang="scss">
.obit-progress {
  margin: 0 auto;
  margin-top: 40rpx;
}
.obit-progress-box {
  width: 400rpx;
  height: 300rpx;
  position: relative;
  overflow: hidden;
  margin: 0 auto;
  .progress-circle {
    background: rgb(222, 222, 222);
    width: 100%;
    padding-top: 100%;
    border-radius: 200rpx;
    position: relative;
  }
  .obit-progress-content {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 88rpx;
  }
  .progress-inner-circle {
    background: #f8f8f8;
    width: 92%;
    padding-top: 92%;
    border-radius: 100px;
    position: absolute;
    left: 4%;
    top: 4%;
  }

  .progress-rotate {
    width: 50%;
    padding-top: 50%;
    background: #ff942f;
    transform-origin: center top;
    top: 0;
    position: absolute;
    transform: rotate(-122deg);
    transform-origin: 100% 100%;
    border-radius: 200px 0 0 0;
  }
}
</style>