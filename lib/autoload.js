"use strict";
var path = require('path')
var rd = require('rd')
var protocol = require("./protocol")

var DEFAULTS = {
    "path": "models"
}

/**
 * get "models/" path
 */
var _get_models_dir_path = function(options){
    var _path;
    if (!options || !options.path) {
        _path = DEFAULTS.path
    }else{
        _path = options.path
    }
    if (process.mainModule) {
        _path = path.join(path.dirname(process.mainModule.filename), _path);
    }
    if (_path[_path.length - 1] !== '/') {
        _path += '/';
    }
    return _path
}

/**
 * models/dataServices/list.js => list
 */
var _generate_model_id = function(file){

    var filename = path.basename(file)

    if (filename && filename[0] === '.') {
        return;
    }

    var _path_split = file.split('/');
    if (_path_split.length <= 1) {
        throw new Error('Invalid model path : ' + file);
    }

    var filename = _path_split[_path_split.length - 1];
    return path.basename(filename, path.extname(filename))
}

/**
 * load all mvc class in "models/*"
 */
var autoload = function(layers, options){
    var modelsDirPath = _get_models_dir_path(options)
    rd.eachFileFilterSync(modelsDirPath, /\.js$/, function (file) {
        var model_id = _generate_model_id(file)
        var Model = require(file);
        if (typeof Model == "function") {
            var model = new Model(model_id, layers);
        }
    });
}

module.exports = autoload
