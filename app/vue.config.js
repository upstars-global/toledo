const path = require('path')

const proxy_headers = {
  'CF_AppSession': 'n6014587925875801',
  'CF_Authorization': 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImM4NDBlMDhhOGU2YzYyYWM5NGY0Y2JmYzJhMWVlOTJlMDIyY2U1MzczNGExYzJjZTczZjAwMWRkOGQ5ZjU5YjgifQ.eyJhdWQiOlsiMTRkMTY4ODFmNjljMjU0MjM4MzBkYjY5NWY5NWFkMTdiZjE2N2ZhZGNiZjg5ZjhhMDA5YzA1NjI2YzYzZDAxMyJdLCJlbWFpbCI6InNvbGFyaXNAdXBzdGFycy5jb20iLCJleHAiOjE2OTM2NTcyMjUsImlhdCI6MTY5MzU3MDgyNSwibmJmIjoxNjkzNTcwODI1LCJpc3MiOiJodHRwczovL3Vwc3RhcnMuY2xvdWRmbGFyZWFjY2Vzcy5jb20iLCJ0eXBlIjoiYXBwIiwiaWRlbnRpdHlfbm9uY2UiOiJvQXBaM1FPUFhsZXdYWXZMIiwic3ViIjoiZmMwOTFlY2ItOTQ2Zi01YjhmLTk4NDUtZWFkM2Q3NTFmYjM4IiwiY291bnRyeSI6IkdCIn0.FfZV2ciL8be5PsQzYYUlAFMD4zuBGWVcPaPQj7COzzL4evtYSsnxc7NLkbd68gOAx4nFOfk4pEigOsf-W-qPXDrmIQ1MRJw_8K2krnvFYGjfcV6o7p6diHLUQyh-YY5_YzxbsPDJNXhlitfFtCI433dBLsqKdGtyLPjgEGScuLYkWUWchCjRWy4gflHWG4f34xVH7hF6bTNNWi51fXIkdgZ2OD0139pzwq4d_TgI3ue2GpqQPS_Teh-Rq71VbIjnn6yYnDgYwqbqr7e-gaI9D6ldjDWhsjDMGCHNgwKG7OdwwEzES2MhgRH3brDlOJcHwQWHh17SsXd5hStroy1Z0Q',
}

const proxy = [
  '/api',
  '/config',
  '/assets',
  '/test',
  '/reference',
  '/report',
].reduce((accumulator, item) => {
  accumulator[item] = {
    changeOrigin: true,
    target: 'http://localhost:3000',
    headers: proxy_headers,
  }
  return accumulator
}, {})

module.exports = {
  publicPath: '/',
  devServer: {
    proxy,
  },
  css: {
    loaderOptions: {
      sass: {
        sassOptions: {
          includePaths: ['./node_modules', './src/assets'],
        },
      },
    },
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@themeConfig': path.resolve(__dirname, 'themeConfig.js'),
        '@core': path.resolve(__dirname, 'src/@core'),
        '@validations': path.resolve(__dirname, 'src/@core/utils/validations/validations.js'),
        '@axios': path.resolve(__dirname, 'src/libs/axios'),
      },
    },
  },
  chainWebpack: config => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        // eslint-disable-next-line no-param-reassign
        options.transformAssetUrls = {
          img: 'src',
          image: 'xlink:href',
          'b-avatar': 'src',
          'b-img': 'src',
          'b-img-lazy': ['src', 'blank-src'],
          'b-card': 'img-src',
          'b-card-img': 'src',
          'b-card-img-lazy': ['src', 'blank-src'],
          'b-carousel-slide': 'img-src',
          'b-embed': 'src',
        }
        return options
      })
  },
  transpileDependencies: ['vue-echarts', 'resize-detector'],
}
