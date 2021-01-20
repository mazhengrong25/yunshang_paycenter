const env = process.env.NODE_ENV;

module.exports = {
  // 针对请求数进行优化
  chainWebpack: config => {
    // 移除 prefetch 插件
    config.plugins.delete('prefetch')
    // 移除 preload 插件
    config.plugins.delete('preload');
  },
  // console移除
  configureWebpack(config) {
    if (env === 'production') {
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
    }
  },
  publicPath: './',
  productionSourceMap: false,
}