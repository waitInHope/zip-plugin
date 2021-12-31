
const path = require('path')

const ALoader = require('./loaders/a-loader');
const BLoader = require('./loaders/b-loader');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.join(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    path.resolve('./loaders/a-loader.js'),
                    path.resolve('./loaders/b-loader.js')
                ]
            }
        ]
    }
}