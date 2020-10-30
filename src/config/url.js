/*
 * @Author: 曹捷
 * @Date: 2019-08-21 20:52:05
 * @LastEditors: 曹捷
 * @LastEditTime: 2020-09-17 10:49:21
 * @Description: file content
 */
var DEV_URL = 'http://rap2api.taobao.org/app/mock/228700/'
// var DEV_WEB = 'http://192.168.31.178:8090/' // 刘硕
// var DEV_WEB = 'http://192.168.0.101:8090/' // 刘硕
// var DEV_WEB = 'http://localhost:8090/' //

// var DEV_WEB = 'http://47.110.233.48:8090/' //线上开发环境
// var DEV_WEB = 'http://10.16.126.113:8090/' // 开发环境
// var DEV_WEB = 'http://172.20.10.3:8090/' // 开发环境
// var DEV_WEB = 'http://127.0.0.1:8022/xyscale/'
var DEV_WEB = 'https://www.cjsound.top/xyscale/'

// H5外链小程序里面----------------------------------------------
// var DEV_WEBVIEW = 'http://192.168.31.251:8080/iocapp/'
var DEV_WEBVIEW = 'https://cs.one-bit.cn/iocapp/'

var PRODUCT_URL = 'http://rap2api.taobao.org/app/mock/228700/'

// 生产环境-------------------------------------------

// var PRODUCT_WEB = 'https://cs.one-bit.cn/'
var PRODUCT_WEB = 'https://www.cjsound.top/xyscale/' //obit环境
// var PRODUCT_WEB = 'http://10.24.133.97:8090/' //客户生产 内网

// H5外链小程序里面 -------------------------------------------------------------------------
// var PRODUCT_WEBVIEW = 'http://192.168.31.251:8080/iocapp/'
var PRODUCT_WEBVIEW = 'https://cs.one-bit.cn/iocapp/'
// var PRODUCT_WEBVIEW = 'https://47.110.237.30/iocapp/'

var URL = process.env.NODE_ENV == 'production' ? PRODUCT_URL : DEV_URL
var WEB_URL = process.env.NODE_ENV == 'production' ? PRODUCT_WEB : DEV_WEB
var WEBVIEW = process.env.NODE_ENV == 'production' ? PRODUCT_WEBVIEW : DEV_WEBVIEW
export { URL, WEB_URL, WEBVIEW }
