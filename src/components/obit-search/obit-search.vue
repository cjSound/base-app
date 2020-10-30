<!--
 * @Author: 曹捷
 * @Date: 2019-08-26 10:40:34
 * @LastEditors: 曹捷
 * @LastEditTime: 2019-08-26 18:36:11
 * @Description: file content
 -->
<template>
  <div class="obit-search">
    <div :class="[inputClass]" class="search-content">
      <div class="obit-place">
        <span class="iconfont icon--search1"></span>
        <span v-show="!hasPlace">{{placeholder}}</span>
      </div>
      <input
        @blur="inputBlur"
        @confirm="obitConfirm"
        @focus="focus"
        @input="obitInput"
        class="uni-input"
        confirm-type="search"
        type="search"
        v-model="iValue"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    vaule: {
      type: String
    },
    placeholder: {
      type: String,
      default: '搜索'
    }
  },
  computed: {
    hasPlace() {
      return this.iValue
    }
  },
  data() {
    return {
      inputClass: 'placeCenter',
      iValue: ''
    }
  },
  methods: {
    obitInput(e) {
      let vaule = e.detail.value
      this.iValue = vaule
      this.$emit('input', vaule)
    },
    focus(e) {
      this.inputClass = 'placeLeft'
    },
    inputBlur(e) {
      if (!this.iValue) {
        this.inputClass = 'placeCenter'
      }
    },
    obitConfirm(e) {
      this.$emit('input', this.iValue)
      this.$emit('search', this.iValue)
    }
  }
}
</script>

<style lang="scss" scoped>
.obit-search {
  background: #efeff4;
  .search-content {
    border-radius: 20upx;
    padding: 14upx 24upx;
    position: relative;
    .uni-input {
      padding: 0;
      border-radius: 10upx;
    }
  }
  .obit-place {
    position: absolute;
    color: grey;
    overflow: hidden;
    pointer-events: none;
  }
  .placeCenter {
    .obit-place {
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .placeLeft {
    .obit-place {
      top: 50%;
      left: 40upx;
      transform: translateY(-50%);
    }
    .uni-input {
      padding-left: 52upx;
    }
  }
  .iconfont {
    padding-right: 4upx;
  }
}
</style>
