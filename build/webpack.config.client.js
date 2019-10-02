
'use strict'
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
const TerserPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const paths = require('./paths')
const ManifestPlugin = require('webpack-manifest-plugin')
const ModuleNotFoundPlugin = require('react-dev-utils/ModuleNotFoundPlugin')
const safePostCssParser = require('postcss-safe-parser')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const publicPath = '/'
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false'
const isDev = process.env.NODE_ENV === 'development'
const devtool = isDev ? 'cheap-module-source-map' : (shouldUseSourceMap ? 'source-map' : false)
const optimization = {
  runtimeChunk: true,
  splitChunks: {
    chunks: 'all',
    name: false,
    cacheGroups: {
      vendors: {
        test: (module) => {
          return module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.match('node_modules')
        },
        name: 'vendor'
      }
    }
  }
}
if (!isDev) {
  optimization.minimizer = [
    new TerserPlugin({
      terserOptions: {
        parse: {
          ecma: 8
        },
        compress: {
          ecma: 5,
          warnings: false,
          comparisons: false,
          inline: 2
        },
        mangle: {
          safari10: true
        },
        output: {
          ecma: 5,
          comments: false,
          ascii_only: true
        }
      },
      // Use multi-process parallel running to improve the build speed
      // Default number of concurrent runs: os.cpus().length - 1
      parallel: true,
      // Enable file caching
      cache: true,
      sourceMap: shouldUseSourceMap
    }),
    new OptimizeCSSAssetsPlugin({
      cssProcessorOptions: {
        parser: safePostCssParser,
        map: shouldUseSourceMap
          ? {
            // `inline: false` forces the sourcemap to be output into a
            // separate file
            inline: false,
            // `annotation: true` appends the sourceMappingURL to the end of
            // the css file, helping the browser find the sourcemap
            annotation: true
          }
          : false
      }
    })
  ]
}

const plugins = [
  new webpack.DefinePlugin({
    '__isBrowser__': true // eslint-disable-line
  }),
  new ModuleNotFoundPlugin(paths.appPath),
  new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  new ManifestPlugin({
    fileName: 'asset-manifest.json',
    publicPath: publicPath
  })
]

if (process.env.npm_config_report === 'true') {
  plugins.push(new BundleAnalyzerPlugin())
}

//  覆盖base配置中的babel-loader，添加了按需混入antd
let webpackModule = {
  rules: [
    {
      oneOf: [
        {
          test: /\.(js|mjs|jsx|ts|tsx)$/,
          exclude: /node_modules/,
          loader: require.resolve('babel-loader'),
          options: {
            cacheDirectory: true,
            cacheCompression: false,
            presets: [
              [
                '@babel/preset-env',
                {
                  'modules': 'false'
                }
              ],
              '@babel/preset-react'
            ],
            plugins: [
              '@babel/plugin-transform-runtime',
              // 按需引入ant
              ["import", {
                "libraryName": "antd",
                "libraryDirectory": "es",
                "style": "css" // `style: true` 会加载 less 文件
              }],
            ]
          }
        },
      ]
    }
  ]
}

module.exports = merge(baseConfig, {
  devtool: devtool,
  entry: {
    Page: ['@babel/polyfill', paths.entry]
  },
  resolve: {
    alias: {
      // for this issue https://github.com/ykfe/egg-react-ssr/issues/36
      'react-router': require.resolve('react-router')
    }
  },
  module: webpackModule,
  output: {
    path: paths.appBuild,
    pathinfo: true,
    filename: 'static/js/[name].js',
    chunkFilename: 'static/js/[name].chunk.js',
    publicPath: publicPath,
    hotUpdateChunkFilename: '[hash].hot-update.js',
    devtoolModuleFilenameTemplate: info =>
      path.resolve(info.absoluteResourcePath).replace(/\\/g, '/')
  },
  optimization: optimization,
  plugins: plugins.filter(Boolean),
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  },
  performance: false
})

