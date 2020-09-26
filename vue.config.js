const path = require('path')
// const defaultSettings = require('./src/settings.js')

function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    configureWebpack: {
        name: "GumpRead",
        resolve:{
            alias:{
                '@': resolve('src')
            }
        }
    },
    devServer:{
        open: true, //是否自动弹出浏览器页面
        host: "localhost",
        port: '8087',
        proxy: {
            '/gumpread': {
                target: 'http://localhost:8090/gumpread', //API服务器的地址
                changeOrigin: true,
                pathRewrite:{
                    '^/gumpread':'',
                }
            }
        },
    }
}