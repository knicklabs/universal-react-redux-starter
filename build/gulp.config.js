import webpackDevConfig   from './webpack.config.dev';
import webpackProdConfig  from './webpack.config.prod';

const _public = './public'
const _assets = './assets'

export default isDevBuild => {
  return {
    webpack: isDevBuild ? webpackDevConfig : webpackProdConfig,

    server: {
      paths: ['./index.js'],
    },

    copy: {
      from : _assets,
      files: [
        [ '/basics/favicon.ico', '/' ],
        [ '/basics/robots.txt',  '/' ],
      ],
      to: _public,
    },
  };
}
