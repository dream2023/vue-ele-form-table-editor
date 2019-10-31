const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  css: {
    extract: false
  },
  publicPath: isProd ? './' : '/',
  configureWebpack: {
    entry: './example/main.js',
    output: {
      libraryExport: 'default'
    }
  }
}
