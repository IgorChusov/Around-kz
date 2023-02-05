const path = require('path')
const  Dotenv  =  require ( 'dotenv-webpack' ) ;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const NODE_ENV = process.env.NODE_ENV
const nodeExternals = require('webpack-node-externals')
const GLOBAL_CSS_REGEXP = /\.global\.css$/
const {InjectManifest} = require('workbox-webpack-plugin');

module.exports = {
  target: 'node',
  mode: NODE_ENV || 'development',
  entry: path.resolve(__dirname, '../src/server/server.jsx'),
  output: {
    path: path.resolve(__dirname, '../dist/server'),
    filename: 'server.js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      'app': path.resolve(__dirname, '../src')
    },
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.(docx)$/i,
        loader: 'file-loader',
        options: {
          name: 'assets/[name].[ext]',
        },
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'file-loader',
        options: {
          name: 'assets/images/[name].[ext]',
          publicPath: '/static/',
        },
      },
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
        options: {
          name: './assets/fonts/[name].[ext]',
        },
      },

      {
        test: /\.[tj]sx?$/,
        use: ['ts-loader'],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'css-loader',
            options: {
              modules: {
                mode: 'local',
                localIdentName: '[name]__[local]--[hash:base64:5]',
              },
              onlyLocals: true,
            },
          },
        ],
        exclude: [GLOBAL_CSS_REGEXP],
      },
      {
        test: GLOBAL_CSS_REGEXP,
        use: ['css-loader'],
      },
    ],
  },
  optimization: {
    minimize: false,
  },
  plugins: [
    new Dotenv(),   
    // new CopyWebpackPlugin({ patterns: [
    //   { from: path.resolve(__dirname, '../public'), to: path.resolve(__dirname, '../dist/server/assets')}
    // ]}),
    // new InjectManifest({
    //   swSrc: path.resolve(__dirname, '../public/serviceWorker.js'),
    //   swDest: './assets/serviceWorker.js'
    // }),
  ],
}
