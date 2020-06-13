const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require("webpack-Hot-middleware")

const app = express(),
    DIST_DIR = path.join(__dirname, "dist"), // 设置静态访问文件路径
    PORT = 3008; // 设置启动端口

const config = require('./webpack.dev.js');
const compiler = webpack(config);

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
}));
/* app.use(webpackHotMiddleware(compiler, {
    log: false,
    heartbeat: 2000,
})); */

app.use(express.static(DIST_DIR))

app.listen(PORT, function() {
    console.log('Example app listening on port 3008!\n');
});