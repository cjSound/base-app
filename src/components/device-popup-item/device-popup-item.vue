<!--
 * @Author: 曹捷
 * @Date: 2020-06-18 16:24:04
 * @LastEditors: 曹捷
 * @LastEditTime: 2020-08-18 09:50:23
 * @Description: 多选 标签
--> 
<template>
  <div>
    <uni-popup @change="change" ref="popupcheck" type="bottom">
      <div class="obit-focus">
        <div class="obit-focus-title">
          <span @click="cancle" class="btn btn-middle-3 f-l">取消</span>
          {{title}}
          <span @click="select" class="btn btn-middle-2 f-r">确定</span>
        </div>
        <div class="flex-l-a">
          <span
            :class="{'check':checkValue.indexOf(item.tagName) !==-1}"
            :key="index"
            @click="checked(item.tagName)"
            class="check-item"
            v-for="(item,index) in dataList"
          >{{item.tagName}}</span>
          <span @click="addInfo" class="check-item">
            <view :style="{ 'font-size': 40 + 'rpx' }" class="uni-icon uni-icon-wrapper uni-icon-plusempty" />
          </span>
          <span :key="'ccc'+i" class="check-item-bak" v-for="i in 2"></span>
        </div>
      </div>
    </uni-popup>
    <uni-popup id="dialogInput" ref="dialogInput" type="dialog">
      <uni-popup-dialog @confirm="dialogInputConfirm" mode="input" placeholder="请输入要新增的标签" title="新增标签" v-model="inputVal"></uni-popup-dialog>
    </uni-popup>
  </div>
</template>

<script>
import utilMix from '@/app-modules/mixin/utilMix.js'
import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
export default {
  mixins: [utilMix],
  components: { uniPopupDialog },
  props: {
    title: {
      type: String,
      default: '请选择',
    },
    visable: {
      type: Boolean,
    },
    value: {
      type: String,
    },
    keys: {
      type: String,
      default: 'key',
    },
    label: {
      type: String,
      default: 'label',
    },
  },
  watch: {
    visable(value) {
      if (value) {
        this.$refs.popupcheck.open()
      } else {
        this.$refs.popupcheck.close()
      }
    },
    value() {
      this.initValue()
    },
  },
  data() {
    return {
      dataList: [],
      inputVal: '',
      checkValue: [],
    }
  },
  methods: {
    /**
     * 选择内容
     */
    select(item, index) {
      this.$emit('input', this.checkValue.join('-'))
      this.cancle()
    },
    cancle() {
      this.initValue()
      this.$emit('update:visable', false)
    },
    initValue() {
      if (this.value) {
        this.checkValue = this.value.split('-')
      } else {
        this.checkValue = []
      }
    },
    checked(item) {
      if (this.checkValue.indexOf(item) !== -1) {
        this.checkValue.splice(this.checkValue.indexOf(item), 1)
      } else {
        this.checkValue.push(item)
      }
    },
    change(e) {
      if (!e.show) {
        this.$emit('update:visable', false)
      }
    },

    addInfo() {
      this.$refs.dialogInput.open()
    },
    dialogInputConfirm(done, val) {
      let data = {
        tagName: val,
      }
      this.$http.saveTag(data).then((res) => {
        done()
        this.initData()
      })
    },
    initData() {
      this.$http.getHotTags().then((res) => {
        this.dataList = res
      })
    },
  },
  mounted() {
    this.initData()
    this.initValue()
  },
}
</script>

<style lang="scss">
.obit-focus {
  padding: 0 30rpx;
  height: 800rpx;
  background: #ffffff;
  .check-item {
    width: 200rpx;
    display: inline-block;
    margin: 20rpx 0;
    text-align: center;
    color: #96a0af;
    border: 2rpx solid #96a0af;
    padding: 10rpx 0rpx;
    border-radius: 10rpx;
    position: relative;
  }
  .check-item-bak {
    width: 200rpx;
    display: inline-block;
    height: 1rpx;
  }
  .check-item.check {
    color: #5ad3fd;
    border: 2rpx solid #5ad3fd;
  }
  .check-item.check::after {
    content: 'L';
    color: #5ad3fd;
    position: absolute;
    right: 10rpx;
    bottom: -10rpx;
    transform: rotateY(180deg) rotate(-45deg);
  }
  .uni-label-pointer {
    width: 29%;
    padding: 54rpx 0 16rpx 0;
  }
  .checkbox {
    padding-bottom: 40rpx;
  }
  .obit-focus-title {
    height: 122rpx;
    font-size: 32rpx;
    text-align: center;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1rpx solid #e1e1e1;
    .btn {
      height: 75rpx;
      line-height: 75rpx;
      padding: 0;
      width: 160rpx;
    }
  }
}
</style>