/*
 * @Description: 开发环境配置文件
 * @Author: WangYunChuan
 * @Email: wangyunchuan3410@163.com
 * @Date: 2019-11-20 15:56:33
 * @LastEditors  : WangYunChuan
 * @LastEditTime : 2020-01-02 10:15:43
 */
'use strict'
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseWebpackConfig = require('./webpack.base.conf');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const config = require('./config');
const portfinder = require('portfinder');
const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const devWebpackConfig = merge(baseWebpackConfig,{
	devtool: config.dev.devtool,
	devServer: {
		proxy : config.dev.proxyTable,
    clientLogLevel: 'warning',
    historyApiFallback: true,
    hot: true,
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    publicPath: config.dev.assetsPublicPath,
		quiet: true
  },
	module: {
    rules: [
			{
        test: /\.s[ac]ss$/i,
        use: [
						'style-loader',
						'css-loader',
						'postcss-loader',
						'sass-loader',
					]
      }
    ]
	},
	plugins: [
    new webpack.DefinePlugin({
      'process.env': {NODE_ENV: '"development"'}
    }),
		new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), 
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
		})
  ]
});

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      process.env.PORT = port
      devWebpackConfig.devServer.port = port
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        }
      }))
      resolve(devWebpackConfig)
    }
  })
});