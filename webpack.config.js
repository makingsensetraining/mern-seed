import config from 'config';
import webpack from 'webpack';
import path from 'path';

const GLOBALS = {
  API_BASE_URL: JSON.stringify(process.env.API_BASE_URL || `${config.api.host}:${config.api.port}${config.api.baseUrl}`)
};

export default {
  devtool: 'inline-source-map', // Inlines SourceMap into orginal file.
  entry: [
    // 'eventsource-polyfill', //neccesary for hot reloading with IE - Using OSX
    'webpack-hot-middleware/client?reload=true',
    './app/index'
  ],
  target: 'web',
  output: {
    path: __dirname + '/dist', // Note: Physical files are only output by the production
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './app',
    hot: true
  },
  plugins: [
    new webpack.DefinePlugin(GLOBALS),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.LoaderOptionsPlugin({
      debug: true
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.join(__dirname, 'app'),
        use: [{
          loader: 'babel-loader'
        }]
      },
      {
        test: /(\.css)$/,
        use: [{
          loader: 'style-loader'
        },
        {
          loader: 'css-loader'
        }]
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: 'file-loader'
        }]
      },
      {
        test: /\.(woff|woff2)$/,
        use: [{
          loader: 'url-loader',
          options: {
            prefix: 'font',
            limit: 5000
          }
        }]
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'application/octet-stream'
          }
        }]
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'image/svg+xml'
          }
        }]
      }
    ]
  }
};
