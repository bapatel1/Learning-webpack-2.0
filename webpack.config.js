const webpack = require('webpack');
const path = require('path');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

let config = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'output.js'
    },
    module: {
        rules: [{
                test: /\.js$/, // files ending with .js
                exclude: /node_modules/, // exclude the node_modules directory
                loader: "babel-loader" // use this (babel-core) loader
            },
            {
                test: /\.scss$/,
                use: ExtractTextWebpackPlugin.extract({
                    use: ['css-loader', 'sass-loader'],
                    fallback: 'style-loader'
                })
            }
        ]
    },
    plugins: [
        new ExtractTextWebpackPlugin('style.css'),
        new CopyWebpackPlugin([{
            from: "./src/index.html",
            to: 'index.html'
        }])
    ],
    devServer: {
        contentBase: path.resolve(__dirname, './dist'),
        historyApiFallback: true,
        inline: true,
        open: true
    }
}

module.exports = config;