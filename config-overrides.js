const { override, addBabelPlugin, fixBabelImports } = require('customize-cra')
const addLessLoader = require('customize-cra-less-loader')

module.exports = override(
  addBabelPlugin('babel-plugin-istanbul'),
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: false,
  }),
  addLessLoader({
    cssLoaderOptions: {
      sourceMap: true,
      modules: {
        localIdentName: '[hash:base64:8]',
      },
    },
    lessLoaderOptions: {
      lessOptions: {
        strictMath: true,
      },
    },
  }),
)
