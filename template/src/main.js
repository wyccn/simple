/*
 * @Description: 页面入口文件
 * @Author: WangYunChuan
 * @Email: wangyunchuan3410@163.com
 * @Date: 2019-11-20 16:51:22
 * @LastEditors  : WangYunChuan
 * @LastEditTime : 2019-12-23 17:52:39
 */

//样式文件
import '@/style/index.scss';
//适配文件
import 'amfe-flexible';
//页面模板
const render = require('@/template/index.art');
//依赖模块
import {utils} from '@/library';
let data = { title : 'Hello world' };
//模板事件监听
window.$listener = {
	test( e ) {
		debugger;
		utils.httpRequst({
			url : 'http://demo.itlike.com/web/xlmc/api/homeApi',
			method : 'get'
		}).then( response => {
			console.log( response );
		})
	}
};
//渲染页面
document.getElementById('app').innerHTML = render( data );