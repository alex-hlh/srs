const path = require('path')

module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    port: 3000,
    open: true,
    proxy: {
      '/ctrl': {
        target: 'http://192.168.40.222:20000',
        changeOrigin: true,
        pathRewrite: {
          '^/ctrl': '/ctrl'
        }
      }
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    }
  },
  chainWebpack(config) {
    config.plugin('html').tap(args => {
      args[0].title = '星环空间 - 智能管控平台'
      return args
    })
  }
}
