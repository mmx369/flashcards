const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './server/src/index.ts',
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'bundle'),
    filename: 'server.bundle.js',
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
};
