const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const devMode = process.env.NODE_ENV !== 'production';
const glob = require('glob');
console.log('环境', process.env.NODE_ENV);

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

function addEntry() {
    let entryObj = {}
    getEntry().forEach(item => {
        entryObj[item] = path.join(__dirname, '..', 'src', item, 'index.js')
    })
    return entryObj
}

var webpackconfig = {
    entry: addEntry(),
    // 输出
    // path是webpack所有文件的输出的路径
    // 比如：output输出的js,url-loader解析的图片，“path”仅仅告诉Webpack结果存储在哪里，
    // HtmlWebpackPlugin生成的html文件，都会存放在以path为基础的目录下
    // path即所有输出文件的目标路径;打包后文件在硬盘中的存储位置。
    // 如下path配置是将所有打包后生成的文件及目录放到上层路径的“dist”目录
    // path.resolve(__dirname, '../dist') 是磁盘绝对路径
    // publicPath:输出解析文件的目录，指定资源文件引用的目录 ，打包后浏览器访问服务时的 url 路径中通用的一部分。
    // publicPath项则被许多Webpack的插件用于在生产模式下更新内嵌到css、html文件里的url值。
    // publicPath设置'./'
    // 例：在文件中引用了某张图片，在url-loader设置的图片存储位置是images/[name].[hash].[ext]
    // 那最终在生产环境中<img src="./images/xxx.[ext]">的形式
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: "[name].js",
    },

    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        alias: {
            '@': path.join(__dirname, '..', 'src')
        }
    },
    module: {
        rules: [{
                test: /\.css$/,
                use: [
                    devMode ? 'style-loader' : {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // 设置css中资源链接的路径
                            // publicPath 默认使用 webpackOptions.output中的publicPath, 如果图片和样式在同一层目录，可以使用默认值
                            // 由于我上面设置的图片打包路径是 /dist/images, 而css是分块存储到 /dist/css目录中，其中引用的图片路径应为“../images/xxx.[ext]”,固这里设置为'../'
                            publicPath: '../'
                        }
                    },
                    'css-loader',
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                loader: 'file-loader',
                options: {
                    name(file) {
                        if (devMode === 'production') {
                            return '[path][name].[ext]'
                        }
                        return '[hash][name].[ext]'
                    },
                    outputPath: 'assets/images/',
                    useRelativePath: devMode === "production"
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                loader: 'file-loader',
                options: {
                    name(file) {
                        if (devMode === 'production') {
                            return '[path][name].[ext]'
                        }
                        return '[hash][name].[ext]'
                    },
                    publicPath: 'assets/css/font/',
                    outputPath: 'assets/css/font/',
                    useRelativePath: devMode === "production"
                }
            },
            {
                test: /\.(csv|tsv)$/,
                use: [
                    'csv-loader'
                ]
            },
            {
                test: /\.xml$/,
                use: [
                    'xml-loader'
                ]
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.js$/,
                use: [{
                    loader: "babel-loader",
                    options: {
                        presets: [
                            [
                                '@babel/preset-env', {
                                    useBuiltIns: 'usage'
                                }
                            ]
                        ]
                    }
                }],
                exclude: /node_modules/
            }
        ]
    },
    plugins: []

};

module.exports = webpackconfig;