const { defineConfig } = require('@vue/cli-service')


module.exports = {
  transpileDependencies: true,
  lintOnSave: false,
  devServer:{
    proxy: {
      "/api": {
        target: "http://localhost:8080/",
        changeOrigin: true,
        pathRewrite: {
          //将api转为/
          '^/api': '/'
        }
      },
    },
  }

}


