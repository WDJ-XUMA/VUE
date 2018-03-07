'use strict';

const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const version = 'v1.1.1';
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {

	//入口
	entry:{
		main:'./src/main.js',
		vendors:['vue','moment','vue-router','vue-preview','axios'],
	},
	output:{
		//所有产出资源路径
		path:path.join(__dirname,'dist'),
		// publicPath:'',
		filename:'js/[name].[chunkhash:6].js'
		
	},
	module:{
		loaders:[//也可以是rules
			{
				test:/\.css$/,
				use:ExtractTextPlugin.extract({
					fallback:'style-loader',
					use:'css-loader!autoprefixer-loader'
				})
				//loader:'style-loader!css-loader!autoprefixer-loader'
			},
			{
				test:/\.less$/,
				loader:'style-loader!css-loader!autoprefixer-loader!less-loader'
			},
			{
				test:/\.(jpg|png|svg|ttf|woff|woff2|gif)$/,
				loader:'url-loader',
				options:{
					limit:4096,//4096字节以上生成文件，否则base64
					name:'assets/[name].[ext]'
				}
			},
			{
				test:/\.js$/,
				loader:'babel-loader',
				exclude:/node_modules/,
				// options:{如果多次使用babel-loader就需要多次options
				// 	presets:['es2015'],//关键字
				// 	plugins:['transform-runtime'],//函数
				// }
			},
			{//解析vue-preview的es6代码
				test:/vue-preview.src.*?js$/,
				loader:'babel-loader',
				// options:{使用.babelrc文件减少代码，在当前根目录
				// 	presets:['es2015'],//关键字
				// 	plugins:['transform-runtime'],//函数
				// }
			},
			{
				test:/\.vue$/,
				loader:'vue-loader'
			}
		]
	},
	plugins:[
		new UglifyJsPlugin(),
		new ExtractTextPlugin("css/[name].[contenthash:6].css"),
		new htmlWebpackPlugin({
			template:'./src/index.html'
		}),
		new webpack.optimize.CommonsChunkPlugin({
			names:['vendors','manifest']
		}),
		new webpack.DefinePlugin({
        	'process.env': {
        		NODE_ENV: JSON.stringify('production')
      		}
    	})
	]
}