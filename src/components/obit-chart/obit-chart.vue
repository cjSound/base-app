<!--
 * @Author: 曹捷
 * @Date: 2019-09-12 15:32:15
 * @LastEditors: 曹捷
 * @LastEditTime: 2019-10-08 20:07:52
 * @Description: file content
 -->
<template>
  <div class="chart" ref="mainChart">
    <!-- #ifndef H5 -->
    <mpvue-echarts @onInit="initWxChart" canvasId="line" class="ec-canvas" ref="mpChart" />
    <!-- #endif -->
  </div>
</template>

<script>
// import * as echarts from 'path'
import mpvueEcharts from '@/components/mpvue-echarts/src/echarts.vue'
import * as echarts from '../../../node_modules/echarts/lib/echarts'
// var echarts = require('../../../node_modules/echarts/lib/echarts')

require('../../../node_modules/echarts/lib/chart/bar')
require('../../../node_modules/echarts/lib/chart/line')

require('../../../node_modules/echarts/lib/chart/scatter')
require('../../../node_modules/echarts/lib/component/markLine')

export default {
  components: {
    mpvueEcharts
  },
  props: {
    chartOption: {
      type: Object,
      required: true
    }
  },
  watch: {
    chartOption: {
      handler(value) {
        // #ifndef H5
        this.updateChart()
        // #endif
        // #ifdef H5
        this.updateH5Chart()
        // #endif
      },
      deep: true
    }
  },
  mounted() {
    // #ifdef H5
    this.initH5()
    // #endif
  },
  methods: {
    initH5() {
      this.chartInfo = echarts.init(this.$refs.mainChart)
      this.chartInfo.setOption(this.chartOption)
    },
    updateH5Chart() {
      this.chartInfo.setOption(this.chartOption, true)
    },
    updateChart() {
      this.chartInfo.setOption(this.chartOption)
      this.$refs.mpChart.setChart(this.chartInfo)
    },
    initWxChart(e) {
      let { width, height } = e
      let canvas = this.$refs.mpChart.canvas
      echarts.setCanvasCreator(() => canvas)
      this.chartInfo = echarts.init(canvas, null, {
        width: width,
        height: height
      })
      // canvas.setChart(this.chartInfo)
      this.chartInfo.setOption(this.chartOption)
      this.$refs.mpChart.setChart(this.chartInfo)
    }
  }
}
</script>

<style>
</style>