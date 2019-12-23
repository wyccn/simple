/*
 * @Description: 
 * @Author: WangYunChuan
 * @Email: wangyunchuan3410@163.com
 * @Company: BJ_TCSD
 * @Version: 1.0.0
 * @Date: 2019-06-17 16:37:57
 * @LastEditors  : WangYunChuan
 * @LastEditTime : 2019-12-23 14:33:51
 */
// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  /*"plugins": {
    //to edit target browsers: use "browserslist" field in package.json
    "postcss-import": {},
    "autoprefixer": {},
    "postcss-px2rem": {
      "remUnit": 37.5
    }
  }*/
  'plugins': {
		"postcss-import": {},
    "autoprefixer": {},
    'postcss-px2rem-exclude': {
      remUnit: "{{px2rem}}",
      exclude: /node_modules|folder_name/i
    }
  }
}
