module.exports = {
  devServer: {
    open: true, //浏览器自动打开页面
    proxy: {
      //配置跨域
      "/api": {
        target: "http://localhost:9000/",
        ws: true,
        changOrigin: true,
        pathRewrite: {
          "^/api": "/"
        }
      }
    }
  }
};
