
const path = require('path')

const ZipPlugin = require('./plugins/zip-plugin.js');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.join(__dirname, 'dist')
    },
    plugins: [
        new ZipPlugin({filename: 'offline'})
    ]
}