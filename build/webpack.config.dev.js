import webpack        from 'webpack';
import path           from 'path';

import frontendConfig from '../config/server.frontend';
import vendorDeps     from './vendors';

export default {
  entry: {
    frontend: [
      `webpack-dev-server/client?http://lvh.me:${frontendConfig.devPort}`,
      'webpack/hot/only-dev-server',
      './build/bundles/frontend.js',
    ],
    vendor: vendorDeps.frontend,
  },

  output: {
    path      : path.join(process.cwd(), 'public', 'styles'),
    filename  : '[name].js',
    publicPath: `http://lvh.me:${frontendConfig.devPort}/assets/`,
  },

  resolve: {
    alias: {
      'frontend': path.join(process.cwd(), 'frontned'),
      'config':   path.join(process.cwd(), 'config'),
      'public':   path.join(process.cwd(), 'public'),
    },
    extensions: ['', '.js', '.jsx'],
  },

  devtool : '#eval',
  debug   : true,
  progress: true,
  node    : {
    fs: 'empty',
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name     : 'vendor',
      chunks   : ['frontend'],
      filename : 'vendor.js',
      minChunks: Infinity,
    }),
    new webpack.DefinePlugin({
      '__CLIENT__'  : true,
      '__SERVER__'  : false,
      '__DEV__'     : true,
      '__DEVTOOLS__': true,
      'process.env' : {
        'NODE_ENV': JSON.stringify('development'),
      },
    }),
  ],

  module: {
    noParse: /\.min\.js$/,
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['react-hot', 'babel?stage=0'],
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        loader: 'style!css!autoprefixer?{browsers:["last 2 version"], cascade:false}!sass',
      },
      {
        test: /\.css$/,
        loader: 'style!styles!autoprefixer?{browsers:["last 2 version"], cascade:false}',
      },
    ],
  },
}
