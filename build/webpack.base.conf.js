/*
 * @Description: dev入口配置文件
 * @Author: WangYunChuan
 * @Email: wangyunchuan3410@163.com
 * @Date: 2019-11-20 15:56:33
 * @LastEditors: WangYunChuan
 * @LastEditTime: 2019-12-06 12:23:07
 */
'use strict'
const path = require('path');
const config = require('./config');

const assetsPath = function (_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? 'static'
    : 'static'

  return path.posix.join(assetsSubDirectory, _path)
}

let basewebpackConfig = {
	entry: {
    app: './src/main.js',
	},
	output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
	},
  resolve: {
    extensions: ['.js','.json'],
    alias: {
      '@': path.join(__dirname, '../src'),
    }
	},
	module: {
    rules: [
			{
				test: /\.art$/,
				loader: "art-template-loader",
				options: {
				}
			},
      {
        test:/\.css$/,
        use:['style-loader','css-loader','postcss-loader']

      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [path.join(__dirname, '../src')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
	}
}
module.exports = basewebpackConfig;