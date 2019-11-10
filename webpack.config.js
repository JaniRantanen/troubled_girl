const environment = process.env.NODE_ENV;
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    mode: environment,
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    watch: true,
    plugins: [
        new CopyWebpackPlugin([
            {
                from: './src/assets',
                to: './assets',
            },
            {
                from: './src/index.html',
                to: './',
            }
        ])
    ],
    devServer: {
        contentBase: path.resolve(__dirname, 'src'),
        watchContentBase: true,
        host: "0.0.0.0",
    },
};