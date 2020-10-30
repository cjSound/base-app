/*
 * @Author: 曹捷
 * @Date: 2019-08-02 10:11:43
 * @LastEditors: 曹捷
 * @LastEditTime: 2020-09-16 23:07:10
 * @Description: 业务引入 通用过滤器  可以额外export function 过滤器，到main.js里面通用引入
 */
import Vue from 'vue'
import numeral from 'numeral'

import * as filters from '@/app-modules/filters'
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key])
})

export function scaleChange(value) {
  if (value) {
    let change = value > 0 ? '加重' : '缓解'
    value = value < 0 ? value * -1 : value
    return `${change} ${numeral(value).format('0.00%')}`
  }
  return value
}

export function bsaFilter(value) {
  if (value < 6) {
    return '轻度'
  } else if (value < 40) {
    return '中度'
  } else {
    return '重度'
  }
}
