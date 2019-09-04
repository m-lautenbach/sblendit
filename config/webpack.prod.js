const HtmlWebPackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
    ],
  },
  entry: './code/src/client/index.js',
  output: {
    path: __dirname + '/../code/dist',
    publicPath: '/static',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './code/src/index.html',
      filename: './index.html',
    }),
    new CopyPlugin([
      { from: './assets', to: './assets' },
      { from: './code/src/client/sw.js', to: './sw.js' },
    ]),
  ],
}
