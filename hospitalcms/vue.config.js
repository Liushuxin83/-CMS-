module.exports = {
  devServer: {
    // 开发环境下runtime
    proxy: {
      // 代理服务器
      // 接口地址为 http://localhost:3000
      '/api': {
        target: 'http://localhost:3000/',
        secure: false, // 是否使用 Https安全传输协议
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api'
        }
      }
    }
  }
}
