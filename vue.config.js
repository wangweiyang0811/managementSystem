module.exports = {
  devServer: {
    open: true, //浏览器自动打开页面
    proxy: {
      //配置跨域
      "/api": {
        target: "https://www.sunnyyang.top:9999/api",
        ws: true,
        changOrigin: true,
        pathRewrite: {
          "^/api": "/"
        }
      }
    }
  }
};
