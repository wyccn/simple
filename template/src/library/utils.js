/*
 * @Description: 项目依赖文件包
 * @Author: WangYunChuan
 * @Email: wangyunchuan3410@163.com
 * @Date: 2019-11-21 11:21:34
 * @LastEditors  : WangYunChuan
 * @LastEditTime : 2019-12-23 17:54:21
 */

/**
 * @description: 截取url参数名
 * @param {name:string} url参数名 
 * @return: 参数值
 */
const urlParam = ( name ) => {
	let searchStr = window.location.href.split('?')[1];
	if( searchStr ) {
		let regx = new RegExp( name+'=([^&]+)','igm' );
		let result = searchStr.match( regx );
		return result ? result[0].split('=')[1] : null;
	}
}

/**
 * @description: 封装ajax请求
 * @param {options:Object} 请求数据参数 
 * @return: promise
 */
const httpRequst = ( options ) => {
	return new Promise( ( resolve,reject ) => {
		let _options = {
			header : "application/x-www-form-urlencoded",
			method : "POST"
		};
		options = Object.assign({},_options,options);
		let xhr = null;
		if( window.XMLHttpRequest ) {
			xhr = new XMLHttpRequest();
		}else {
			xhr = new ActiveXObject('Microsoft.XMLHTTP');
		}
		xhr.open( options.method,options.url,true );
		xhr.setRequestHeader( "Content-Type",options.header );
		xhr.onreadystatechange = function () {
			if( xhr.readyState == 4 ) {
					if( ( xhr.status >= 200 && xhr.status < 300 ) || xhr.status == 304 ) {
						//返回消息成功
						resolve( JSON.parse( xhr.responseText ) );
					} else {
						//返回消息失败
						reject( xhr.responseText );
					}
			} else {
				//请求未发送的处理
				console.log("请求未完成！")
			}
		};
		xhr.timeout = 15000;
		xhr.onerror = function( e ) { reject(); }
		//格式化传输数据
		function format_data_params () {
			if( options.method == 'POST'&& options.header == _options.header ) {
				var formatStr = [];
				for( var keys in options.data ) {
					formatStr.push( `${keys}=${options.data[keys]}` );
				}
				formatStr = formatStr.join('&');
				return formatStr;
			}else if( options.method == 'POST'&& options.header != _options.header ){
				return data;
			}
			return null;
		}
		xhr.send( format_data_params() );
	});
}

export default{
	urlParam,
	httpRequst
}