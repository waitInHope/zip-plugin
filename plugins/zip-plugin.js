
const JSZip = require('jszip');
const path = require('path');
const { RawSource } = require('webpack-sources');

const zip = new JSZip();

module.exports = class ZipPlugin {
    constructor(options) {
        this.options = options;
    }

    apply(compiler) {
        console.log('MyPlugin is processing');
        console.log('MyPlugin options is: ', this.options);

        // 文件生成
        compiler.hooks.emit.tapAsync('ZipPlugin', (compilation, callback) => {
            const folder = zip.folder(this.options.filename);

            for(let filename in compilation.assets) {
                let source = compilation.assets[filename].source();
                
                folder.file(filename, source);
            }

            zip.generateAsync({
                type: 'nodebuffer'
            }).then((content) => {
                let output = path.join(compilation.options.output.path, this.options.filename + '.zip')
                let outputRelative = path.relative(compilation.options.output.path, output);
                compilation.assets[outputRelative] = new RawSource(content);

                callback()
            })
        })
    }
}