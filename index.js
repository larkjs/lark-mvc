var path = require('path');
var rd = require('rd');
var layerproxy = require("./lib/layerproxy")

/**
 * @param options
 * @param options.path {string} It locate to models, where files will automate load if its filetype is js.  
 */

var larkMVC = function(options, lark){
    if (!options || !options.path) {
        var _path = 'models'
    }else{
        var _path = options.path
    }
    if (process.mainModule) {
        _path = path.join(path.dirname(process.mainModule.filename), _path);
    }
    if (_path[_path.length - 1] !== '/') {
        _path += '/';
    }
    options.ignore = options.ignore || 'helper';
    rd.eachFileFilterSync(_path, /\.js$/, function (file) {
        if (0 !== file.indexOf(_path)) {
            throw new Error("File path " + file + " not expected, should be under " + _path);
        }
        var filename = path.basename(file)
        if (filename && filename[0] === '.') {
            return;
        }        
        var relativePath = file.slice(_path.length);
        var _pathsplit = relativePath.split('/');
        if (_pathsplit.length <= 1) {
            throw new Error('Invalid model path : ' + _path);
        }
        var filename = _pathsplit[_pathsplit.length - 1];
        _pathsplit[_pathsplit.length - 1] = path.basename(filename, path.extname(filename));

        var modelproxy = createModel(layerproxy, _pathsplit, null, options);
        if (!modelproxy) {
            return;
        }

        var model = require(file);
        if (model instanceof Function) {
            return model(layerproxy, lark);
        }
        else if (model instanceof Object && !Array.isArray(model)) {
            for (var property in model) {
                if (!!modelproxy[property]) {
                    throw new Error('Property ' + property + ' in mvc.xxx in use!');
                }
                modelproxy[property] = model[property];
            }
        }
    });
    return function*(next) {
        this.pageServices = layerproxy.pageServices
        yield next
    };
}

function createModel (layerproxy, _pathsplit, type, options) {
    var type = type || _pathsplit.shift();
    if (_pathsplit.indexOf(options.ignore) >=0) {
        return;
    }
    var name = _pathsplit.join('/');
    switch (type) {
        case 'dao' :
            type = 'daoService';
            break;
        case 'dataServices' :
            type = 'dataService';
            break;
        case 'pageServices' :
            type = 'pageService';
            break;
        default :
            throw new Error('Unknown model type ' + type);
    }
    return layerproxy[type].create(name);
}

var output = layerproxy;
output.middleware = larkMVC
module.exports = output
