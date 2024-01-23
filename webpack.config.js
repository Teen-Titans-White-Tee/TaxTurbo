const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './client/src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  mode: process.env.NODE_ENV,
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env'], ['@babel/preset-react']
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images/',
            },
          },
        ]
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      template: './client/public/index.html' // Updated template path
    })
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'build'),
      publicPath: '/build/'
    },
    proxy: {
      '/api': 'http://localhost:3000',
      changeOrigin: true,
      secure: false,
      pathRewrite: {
        '^/api': '' // Remove the '/api' prefix when forwarding the request
      }
    },
    compress: true,
    historyApiFallback: true
  }
};





/* PREVIOUS WEBPACK CONFIG */

/*===================================================================== */

// const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');

// module.exports = {
//   entry: './client/src/index.js',

//   output: {
//     path: path.join(__dirname, '/build'),
//     filename: 'bundle.js',
//   },

//   mode: 'development',
//   devServer: {
    
//     host: 'localhost',
//     historyApiFallback: true,
//     port: 8080,
//     proxy: {
//       '/': {
//         target: 'http://localhost:3000/',
//         secure: false,
//       },
//     },
//   },

//   plugins: [
//     new HtmlWebpackPlugin({
//       template: './client/public/index.html'
//     })
//   ],

//   module: {
//     rules: [
//       {
//         test: /\.jsx?$/,
//         exclude: /node_modules/,
//         use: {
//           loader: 'babel-loader',
//           options: {
//             presets: ['@babel/preset-env', '@babel/preset-react']
//           }
//         }
//       },
//       {
//         test: /\.s[ac]ss$/i,
//         use: [
//           'style-loader',
//           'css-loader',
//           'sass-loader',
//         ]
//       },
//       {
//         test: /\.(png|svg|jpg|jpeg|gif|svg)$/i,
//         use: [
//           {
//             loader: 'file-loader',
//             options: {
//               name: '[name].[ext]',
//               outputPath: 'images/',
//             },
//           },
//         ]
//       },
//     ]
//   }

// };