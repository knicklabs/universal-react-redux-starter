import webpack        from 'webpack';
import Extract        from 'extract-text-webpack-plugin';
import Manifest       from 'webpack-manifest-plugin';
import ChunkManifest  from 'chunk-manifest-webpack-plugin';
import path           from 'path';

import vendorDeps     from './vendors';

export default {

  entry: {
    frontend: './build/bundles/frontend.js',
    vendor: vendorDeps.frontend,
  },

  output: {
    path         : './public/assets',
    filename     : '[name]-[chunkhash].js',
    chunkFilename: '[name]-[chunkhash].js',
  },

  resolve: {
    alias: {
      'app'   : path.join(process.cwd(), 'apps'),
      'config': path.join(process.cwd(), 'config'),
      'public': path.join(process.cwd(), 'public'),
    },
    extensions: ['', '.js', '.jsx'],
  },

  devtool : false,
  debug   : false,
  progress: true,
  node    : {
    fs: 'empty',
  },

  plugins: [
    new Extract('[name]-[chunkhash].css'),
    new webpack.optimize.CommonsChunkPlugin({
      name     : 'vendor',
      chunks   : ['frontend'],
      filename : 'vendor-[chunkhash].js',
      minChunks: Infinity,
    }),
    new webpack.DefinePlugin({
      '__CLIENT__'  : true,
      '__SERVER__'  : false,
      '__DEV__'     : false,
      '__DEVTOOLS__': false,
      'process.env' : {
        'NODE_ENV': JSON.stringify('production'),
      },
    }),
    new webpack.optimize.DedupePlugin(),
    new Manifest(),
    new ChunkManifest({
      filename        : 'chunk-manifest.json',
      manifestVariable: '__CHUNKS__',
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        'warnings'     : false,
        'drop_debugger': true,
        'drop_console' : true,
        'pure_funcs'   : ['console.log'],
      },
    }),
  ],

  module: {
    noParse: /\.min\.js$/,
    loaders: [
      { test  : /\.jsx?$/, loader: 'babel?stage=0',  exclude: /node_modules/ },
      {
        test  : /\.scss$/,
        loader: Extract.extract('style', 'css!autoprefixer?{browsers:["last 2 version"], cascade:false}!sass'),
      },
      {
        test  : /\.css$/,
        loader: Extract.extract('style', 'css!autoprefixer?{browsers:["last 2 version"], cascade:false}'),
      },
    ],
  },


}
