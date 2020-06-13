const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const common = require('./webpack.common.js');
const glob = require('glob');
const webpack = require('webpack');
const path = require('path');

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

getEntry().forEach(pathname => {
    let conf = {
        filename: path.join(pathname, pathname) + '.html',
        template: path.join(__dirname, '..', 'src', pathname, 'html', 'index.html'),
        chunks: [pathname]
    }
    common.plugins.push(new HtmlWebpackPlugin(conf))
});

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    // 开发服务器
    devServer: {
        contentBase: path.resolve(__dirname, '../dist/'), // 默认webpack-dev-server会为根文件夹提供本地服务器，如果想为另外一个目录下的文件提供本地服务器，应该在这里设置其所在目录
        historyApiFallback: true, // 在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
        compress: true, // 启用gzip压缩
        inline: true, // 设置为true，当源文件改变时会自动刷新页面
        hot: true, // 模块热更新，取决于HotModuleReplacementPlugin
        host: '172.20.10.8', // 设置默认监听域名，如果省略，默认为“localhost”
        port: 3333, // 设置默认监听端口，如果省略，默认为“8080”
        openPage: 'movie/movie.html',
        index: 'movie/movie.html'
    },
    plugins: [
        // 热更新相
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        // 这里的设置是给src中用的，在webpack.base.conf如要获取，需在package.json配置cross-env NODE_ENV=development
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"development"',
        }),
    ],
    optimization: {
        nodeEnv: 'development',
    }
});