/*
 * @Description: Webpack配置文件
 * @Author: WangYunChuan
 * @Email: wangyunchuan3410@163.com
 * @Company: BJ_TCSD
 * @Version: 1.0.0
 * @Date: 2019-06-19 19:41:59
 * @LastEditors: WangYunChuan
 * @LastEditTime: 2019-12-06 13:33:42
 */
'use strict'
const path = require('path');

module.exports = {
	  //开发环境
    dev: {
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        proxyTable: {},
        host: '192.168.2.234', 
        port: 8088, 
        autoOpenBrowser: true,
        devtool: 'eval-source-map'
    },
		//生产环境
    build: {
        index: path.resolve(__dirname, '../dist/index.html'),
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        devtool: false,
        productionGzip: true,
        productionGzipExtensions: ['js', 'css']
    }
}