/*
 * @Description: 生产环境编译配置文件
 * @Author: WangYunChuan
 * @Email: wangyunchuan3410@163.com
 * @Date: 2019-11-25 13:57:46
 * @LastEditors  : WangYunChuan
 * @LastEditTime : 2020-01-02 10:16:03
 */
'use strict'
const webpack = require('webpack');
const path = require('path');
const config = require('./config');
const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const baseWebpackConfig = require('./webpack.base.conf');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');


const assetsPath = function (_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? 'static'
    : 'static'

  return path.posix.join(assetsSubDirectory, _path)
}


const webpackConfig = merge(baseWebpackConfig, {
  devtool: config.build.devtool,
  output: {
    path: config.build.assetsRoot,
    filename: assetsPath('js/[name].[hash].js'),
    chunkFilename: assetsPath('js/[id].[hash].js')
	},
	module: {
    rules: [
      {{#if prerender}}
      {
        test: path.join(__dirname,'../index.html'),
        loader: 'prerender-loader?string'
      },
      {{/if}}
			{
        test: /\.s[ac]ss$/i,
        use: ExtractTextPlugin.extract({
					use : [
						'css-loader',
						'postcss-loader',
						'sass-loader',
					]
				}),
      }
    ]
	},
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {NODE_ENV: '"production"'}
    }),
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false
        }
      },
      sourceMap: false,
      parallel: true
    }),
    new ExtractTextPlugin({
      filename: assetsPath('css/[name].[contenthash].css'),
      allChunks: false,
    }),
    new OptimizeCSSPlugin({
      cssProcessorOptions: false
        ? { safe: true, map: { inline: false } }
        : { safe: true }
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      chunksSortMode: 'dependency'
    }),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks (module) {
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'app',
      async: 'vendor-async',
      children: true,
      minChunks: 3
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: 'static',
        ignore: ['.*']
      }
    ])
  ]
});

/**
 * @description: 开启Gzip压缩
 * @return: 无
 */

if ( config.build.productionGzip ) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin');
  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 8240,
      minRatio: 0.8
    })
  )
};

module.exports = webpackConfig;