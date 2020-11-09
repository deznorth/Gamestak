const webpack = require('webpack');
const path = require('path');

module.exports = {
  devtool: false,

  entry: {
    'gamestak': [ 'core-js/stable', 'regenerator-runtime/runtime', path.join(__dirname, '..', 'src', 'index.js')],
  },

  output: {
    path: path.join(__dirname, '..', 'dist'),
    filename: '[name].module.js',
    publicPath: 'dist/',
    chunkFilename: '[name]_[chunkhash].module.js'
  },

  resolve: {
    alias: {
      root: path.join(__dirname, '..', 'src'),
    },
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|dist)/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' }
        ]
      }
    ]
  },

  plugins: [
    // Saves on bundling localizations
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    // Allows access to referenced environment variables
    new webpack.EnvironmentPlugin(['NODE_ENV']),
  ]
};