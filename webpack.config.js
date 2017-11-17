const path = require('path'),
  HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/main.ts',

  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'js/bundle.js'
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        include: [
          path.resolve(__dirname, 'src')
        ],
        loader: 'ts-loader'
      },
      {
        test: /\.styl$/,
        include: [
          path.resolve(__dirname, 'src')
        ],
        use: [
          'style-loader',
          'css-loader',
          'stylus-loader'
        ]
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],

  resolve: {
    extensions: [' ', '.ts', '.js', '.styl'],
    alias: {
      Root: path.resolve(__dirname, 'src/'),
      Libraries: path.resolve(__dirname, 'src/lib/'),
      Settings: path.resolve(__dirname, 'src/settings'),
      Utils: path.resolve(__dirname, 'src/utils'),
      Types: path.resolve(__dirname, 'src/types'),
      Constants: path.resolve(__dirname, 'src/constants'),
      IO: path.resolve(__dirname, 'src/io')
    }
  },

  devtool: 'inline-source-map',

  devServer: {
    contentBase: path.join(__dirname, 'public'),
    compress: true,
    port: 9000,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    },
  }
};