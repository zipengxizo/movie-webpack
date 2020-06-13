const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
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
    plugins: [
        // new CleanWebpackPlugin(),
        /* new HtmlWebpackPlugin({
            filename: 'movie/movie.html',
            template: 'src/movie/html/index.html',
            inject: true,
            scriptLoading: 'defer',
            // inject 有4个选项，按最新标准，一般将js文件置于body底部
            // true 默认值，script标签位于html文件的 body 底部
            // body script标签位于html文件的 body中
            // head script标签位于html文件的 head中
            // false 不插入生成的js文件，这个几乎不会用到的

            // 压缩html
             minify: {
                 // 移除注释
                 removeComments: true,
                 // 不要留下任何空格
                 collapseWhitespace: true,
                 // 当值匹配默认值时删除属性
                 removeRedundantAttributes: true,
                 // 使用短的doctype替代doctype
                 useShortDoctype: true,
                 // 移除空属性
                 removeEmptyAttributes: true,
                 // 从style和link标签中删除type="text/css"
                 removeStyleLinkTypeAttributes: true,
                 // 保留单例元素的末尾斜杠。
                 keepClosingSlash: true,
                 // 在脚本元素和事件属性中缩小JavaScript(使用UglifyJS)
                 minifyJS: true,
                 // 缩小CSS样式元素和样式属性
                 minifyCSS: true,
                 // 在各种属性中缩小url
                 minifyURLs: true
             },
        }), */
        new MiniCssExtractPlugin({
            filename: 'assets/css/[name].css',
            chunkFilename: '[id].css',
        }),
        new webpack.DefinePlugin({
            'process.env': 'production',
        }),
        new webpack.HashedModuleIdsPlugin(),
        new UglifyJSPlugin({
            sourceMap: true
        }),
        // 复制内容到指定目录，一般针对一些静态资源
        new CopyWebpackPlugin({
            patterns: [{
                from: path.resolve(__dirname, '../assets/images'),
                to: path.resolve(__dirname, '../dist/assets/images/'),
            }]
        })

        // new BundleAnalyzerPlugin(),
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /node_modules/,
                    chunks: "initial",
                    name: "vendor",
                    priority: 10,
                    enforce: true
                },
                /* manifest: {
                    // minChunks: Infinity
                }, */
                commons: {
                    name: "commons",
                    chunks: "initial",
                    minChunks: 2
                }
            }
        }
    }
});


module.exports = webpackconfig;