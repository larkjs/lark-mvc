/**
 * Lark-mvc model access layers
 **/
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _debug2 = require('debug');

var _debug3 = _interopRequireDefault(_debug2);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _readdir = require('readdir');

var _readdir2 = _interopRequireDefault(_readdir);

var _service = require('./service');

var _service2 = _interopRequireDefault(_service);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const debug = (0, _debug3.default)('lark-mvc');

const readdirSync = _readdir2.default.readSync;

class Layer {
    constructor(mvc) {
        this.mvc = mvc;
    }
    load(dirname) {
        debug("Layer: loading " + dirname);
        if (!_path2.default.isAbsolute(dirname)) {
            throw new Error("MVC Layer param dirname must be absolute");
        }
        let stat;
        try {
            stat = _fs2.default.statSync(dirname);
        } catch (e) {
            console.error("  " + _chalk2.default.red("[WARNING]") + ' MVC loading ' + _chalk2.default.cyan(dirname) + ' failed, error is "' + _chalk2.default.yellow(e.message) + '", skipping...');
            return this;
        }
        if (!stat.isDirectory()) {
            throw new Error("MVC Layer param dirname must be a name of DIRECTORY");
        }
        if (this.path) {
            throw new Error("MVC Layer can load a directory for no more than once. Use another layer instead");
        }
        this.path = dirname;
        const files = readdirSync(dirname, ["**.js"], _readdir2.default.INCLUDE_DIRECTORIES);
        const names = files.map(name => _path2.default.join(_path2.default.dirname(name), _path2.default.basename(name, '.js')));
        this._handlers = this._handlers || {};
        this._modules = this._modules || {};
        debug("Layer: loading all files, count: " + files.length);
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const filePath = _path2.default.join(dirname, file);
            const name = names[i];
            this._handlers.__defineGetter__(name, () => {
                if (this._modules.hasOwnProperty(name)) {
                    return this._modules[name];
                }
                let fileModule = null;
                let lastModulePath = this.mvc._currentModulePath;
                this.mvc._currentModulePath = require.resolve(filePath);
                debug("Layer: loading file " + file);
                try {
                    fileModule = require(filePath).default || require(filePath);
                } catch (e) {
                    console.error("MVC loading file " + file + ' failed, error is "' + e.message + '", skipping...');
                    fileModule = null;
                }
                if (fileModule) {
                    if (!(fileModule instanceof _service2.default)) {
                        _service2.default.call(fileModule, this.mvc, this.mvc._currentModulePath);
                    }
                    fileModule.__modulePath = this.mvc._currentModulePath;
                }
                this.mvc._currentModulePath = lastModulePath;
                this._modules[name] = fileModule;
                return this._modules[name];
            });
            debug("Layer: file " + file + " loaded");
        }
        debug("Layer: all files loaded!");
        return this;
    }
    addAccessLayer(name, layer) {
        if ('string' !== typeof name) {
            throw new Error('Layer name should be a string');
        }
        if (!(layer instanceof Layer)) {
            throw new Error('Layer to add should be an instance of Layer');
        }
        this._access = this._access || {};
        if (this._access[name]) {
            throw new Error('Layer ' + name + ' has already been added');
        }
        this._access.__defineGetter__(name, () => {
            return layer.handlers();
        });
        return this;
    }
    handlers() {
        return this._handlers;
    }
    access() {
        return this._access;
    }
}

exports.default = Layer;