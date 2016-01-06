/**
 * Lark-mvc model access layers
 **/
'use strict';

import _debug   from 'debug';
import chalk    from 'chalk';
import fs       from 'fs';
import path     from 'path';
import readdir  from 'readdir';
import Service  from './service';

const debug = _debug('lark-mvc');

const readdirSync = readdir.readSync;

class Layer {
    constructor (mvc) {
        this.mvc = mvc;
    }
    load (dirname) {
        debug("Layer: loading " + dirname);
        if (!path.isAbsolute(dirname)) {
            throw new Error("MVC Layer param dirname must be absolute");
        }
        let stat;
        try {
            stat = fs.statSync(dirname);
        }
        catch (e) {
            console.error("  " + chalk.red("[WARNING]") + ' MVC loading ' + chalk.cyan(dirname) + ' failed, error is "' + chalk.yellow(e.message) + '", skipping...');
            return this;
        }
        if (!stat.isDirectory()) {
            throw new Error("MVC Layer param dirname must be a name of DIRECTORY");
        }
        if (this.path) {
            throw new Error("MVC Layer can load a directory for no more than once. Use another layer instead");
        }
        this.path = dirname;
        const files = readdirSync(dirname, ["**.js"], readdir.INCLUDE_DIRECTORIES);
        const names = files.map(name => path.join(path.dirname(name), path.basename(name, '.js')));
        this._handlers = this._handlers || {};
        this._modules  = this._modules || {};
        debug("Layer: loading all files, count: " + files.length);
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const filePath = path.join(dirname, file);
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
                }
                catch (e) {
                    console.error("MVC loading file " + file + ' failed, error is "' + e.message + '", skipping...');
                    fileModule = null;
                }
                if (fileModule) {
                    if (!(fileModule instanceof Service)) {
                        Service.call(fileModule, this.mvc, this.mvc._currentModulePath);
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
    addAccessLayer (name, layer) {
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
    handlers () {
        return this._handlers;
    }
    access () {
        return this._access;
    }
}

export default Layer;
