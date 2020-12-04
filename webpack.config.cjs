var path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/client/index.js',
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/react'],
          cacheDirectory: true
        }
      }
    },
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }]
  },
  devServer: {
    historyApiFallback: true
  }
};
