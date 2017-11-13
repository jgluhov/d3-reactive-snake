const path = require('path'),
    HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/main.ts',

    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'js/bundle.js'
    },

    module: {
        rules: [
            {
                test: '/\.ts$/',
                include: [
                    path.resolve(__dirname, 'src')
                ],
                loader: 'ts-loader'
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: 'Reactive snakes'
        })
    ],

    resolve: {
        extensions: ['.ts','.js']
    },

    devtool: 'cheap-module-eval-source-map',

    devServer: {
        contentBase: path.join(__dirname, 'public'),
        compress: true,
        port: 9000
    }
};