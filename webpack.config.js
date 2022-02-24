const path = require('path');
const tsconfig = require('./tsconfig.json');
const ForkTsCheckerNotifierWebpackPlugin = require('fork-ts-checker-notifier-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const mode = process.env.NODE_ENV || 'development';
const isProduction = mode === 'production';

module.exports = {
  mode,
  context: process.cwd(),
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/',
  },
  optimization: {
    chunkIds: 'named',
    concatenateModules: true,
    mangleExports: isProduction,
    mergeDuplicateChunks: true,
    splitChunks: !isProduction
      ? {}
      : {
          chunks: 'async',
          cacheGroups: {
            defaultVendors: {
              test: /[\\/]node_modules[\\/]/,
              priority: -10,
              reuseExistingChunk: true,
            },
            default: {
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true,
            },
          },
        },
  },
  module: {
    rules: [
      // ts
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
        },
      },
      // scss
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              sassOptions: {
                outputStyle: 'compressed',
              },
            },
          },
        ],
      },
      // images
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    extensions: ['.wasm', '.ts', '.tsx', '.mjs', '.cjs', '.js', '.json', '.html', '.scss'],
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    // alias: {
    //   Ammo: path.resolve(__dirname, 'public/lib/ammo.wasm.js'),
    // },
    alias: Object.keys(tsconfig.compilerOptions.paths).reduce((aliases, aliasName) => {
      aliases[aliasName] = path.resolve(__dirname, `src/${tsconfig.compilerOptions.paths[aliasName][0]}`);

      return aliases;
    }, {}),
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new ForkTsCheckerNotifierWebpackPlugin({ title: 'TypeScript', excludeWarnings: false }),
    new HtmlWebpackPlugin({
      inject: true,
      template: 'src/index.html',
    }),
  ],
};
