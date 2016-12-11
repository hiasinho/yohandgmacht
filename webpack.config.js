const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const devBuild = process.env.NODE_ENV !== 'production';
const nodeEnv = devBuild ? 'development' : 'production';

const sassLoaders = [
  'css-loader',
  'postcss-loader',
  'sass-loader',
]

const config = {
  entry: [
    './webpack/stylesheets/entry'
  ],

  output: {
    path: __dirname,
    filename: '_js/[name].js',
  },

  resolve: {
    extensions: ['', '.js', '.jsx', '.scss'],
  },
  plugins: [
    new ExtractTextPlugin('_sass/bundle.scss', { allChunks: true })
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader', sassLoaders.join('!')),
      }
    ],
  },
  postcss: [
    autoprefixer({
      browsers: ['last 2 versions']
    })
  ],
};

module.exports = config;

if (devBuild) {
  console.log('Webpack dev build for Jekyll'); // eslint-disable-line no-console
  module.exports.devtool = 'eval-source-map';
} else {
  config.plugins.push(
    new webpack.optimize.DedupePlugin()
  );
  console.log('Webpack production build for Jekyll'); // eslint-disable-line no-console
}
