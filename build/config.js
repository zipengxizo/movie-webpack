const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const glob = require('glob');

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

const pageExtractCssArray = []
getEntry().forEach(item => {
    pageExtractCssArray.push(new ExtractTextPlugin(item + '/[name].[md5:contenthash:hex:8].css'))
})

module.exports = pageExtractCssArray;