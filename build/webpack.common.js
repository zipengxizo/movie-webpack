const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
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
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: "[name].js",
    },

    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        alias: {
            '@': path.join(__dirname, '..', 'src'),
            '~': path.join(__dirname, '..')
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
                            publicPath: '../../'
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
                    limit: 10240,
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

    plugins: [
        new MomentLocalesPlugin({
            localesToKeep: ['es-us', 'zh-cn'],
        }),
    ]

};

module.exports = webpackconfig;