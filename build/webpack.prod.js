const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
var StyleExtHtmlWebpackPlugin = require('style-ext-html-webpack-plugin');
const glob = require('glob');
var ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const common = require('./webpack.common.js');

function getEntry() {
    let globPath = 'src/**/html/*.html'
        // (\/|\\\\) 这种写法是为了兼容 windows和 mac系统目录路径的不同写法
    let pathDir = 'src(\/|\\\\)(.*?)(\/|\\\\)html'
    let files = glob.sync(globPath)
    let dirname, entries = []
    for (let i = 0; i < files.length; i++) {
        dirname = path.dirname(files[i])
        entries.push(dirname.replace(new RegExp('^' + pathDir), '$2'))
    }
    return entries
}

(common || []).plugins.push(new CleanWebpackPlugin());
getEntry().forEach(pathname => {
    let conf = {
        title: pathname,
        filename: path.join(pathname, pathname) + '.html',
        template: path.join(__dirname, '..', 'src', pathname, 'html', 'index.html'),
        chunks: [pathname, 'vendor']
    }
    let styleConf = {
        chunks: [pathname],
        minify: true
    }
    let scriptConf = {
        defaultAttribute: 'async'
    }
    common.plugins.push(new HtmlWebpackPlugin(conf));
    common.plugins.push(new StyleExtHtmlWebpackPlugin(styleConf));
    common.plugins.push(new ScriptExtHtmlWebpackPlugin(scriptConf));
})


var webpackconfig = merge(common, {
    mode: 'production',
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'assets/js/[name].[chunkhash].js',
        publicPath: '../'
    },
    externals: {
        jquery: 'jQuery',
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'assets/css/[name].css',
            chunkFilename: '[id].css',
        }),
        new webpack.DefinePlugin({
            'process.env': 'production',
        }),
        new webpack.HashedModuleIdsPlugin(),
        /* new UglifyJSPlugin({
            sourceMap: true
        }), */

        // 复制内容到指定目录，一般针对一些静态资源
        new CopyWebpackPlugin({
            patterns: [{
                from: path.resolve(__dirname, '../assets/images'),
                to: path.resolve(__dirname, '../dist/assets/images/'),
            }]
        }),

        new BundleAnalyzerPlugin(),
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /node_modules/,
                    chunks: "initial",
                    name: "vendor",
                },
                moment: {
                    test: (module) => {
                        return /moment/.test(module.context);
                    },
                    chunks: "initial",
                    name: "moment",
                    priority: 10,
                }
            }
        }
    }
});


module.exports = webpackconfig;