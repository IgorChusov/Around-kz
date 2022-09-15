const path = require('path')
const NODE_ENV = process.env.NODE_ENV
const  Dotenv  =  require ( 'dotenv-webpack' ) ;
const IS_DEV = NODE_ENV === 'development'
const IS_PROD = NODE_ENV === 'production'
const GLOBAL_CSS_REGEXP = /\.global\.css$/

const { HotModuleReplacementPlugin } = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

function setupDevtool () {
  if (IS_DEV) return 'eval'
  if (IS_PROD) return false
}

function getEntry() {
  if (IS_PROD) return [path.resolve(__dirname, '../src/client/index.jsx')]

  return [
    path.resolve(__dirname, '../src/client/index.jsx'),
    'webpack-hot-middleware/client?path=http://localhost:3001/static/__webpack_hmr',
  ]
}

module.exports = {
  mode: NODE_ENV || 'development',
  entry: getEntry(),
  output: {
    path: path.resolve(__dirname, '../dist/client'),
    filename: 'client.js',
    publicPath: '/static/',
  },

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      'react-dom': IS_DEV ? '@hot-loader/react-dom' : 'react-dom',
    },
  },

  module: {
    rules: [
      {
        test: /\.(docx)$/i,
        loader: 'file-loader',
        options: {
          name: 'assets/docx/[name].[ext]',
        },
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'file-loader',
        options: {
          name: 'assets/images/[name].[ext]',
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
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                mode: 'local',
                localIdentName: '[name]__[local]--[hash:base64:5]',
              },
            },
          },
        ],
        exclude: [GLOBAL_CSS_REGEXP],
      },
      {
        test: GLOBAL_CSS_REGEXP,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  devtool: setupDevtool(),
  plugins: IS_DEV ? [new CleanWebpackPlugin(), new HotModuleReplacementPlugin(), new Dotenv()] : [new Dotenv()],
}
