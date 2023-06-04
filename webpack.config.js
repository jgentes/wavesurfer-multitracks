import path from 'path'

export default {
  mode: process.NODE_ENV || 'development',

  devServer: {
    static: {
      directory: path.resolve('./'),
    },
    compress: true,
    port: 9000,
  },

  entry: {
    multitrack: './src/multitracks.ts',
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        include: path.resolve('./src'),
        use: [
          {
            loader: 'ts-loader',
          },
        ],
      },
    ],
  },
  output: {
    library: 'Multitracks',
    libraryTarget: 'umd',
    libraryExport: 'default',
    globalObject: 'this',
    filename: '[name].min.js',
    path: path.resolve('./dist'),
  },
}
