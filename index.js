/**
 * Lark-mvc
 **/
'use strict';

import _debug           from 'debug';
import path             from 'path';
import savable          from 'save-instance';
import Layer            from './lib/layer';
import Service          from './lib/service';
import middleware       from './lib/middleware';
import defaultConfig    from './conf/default';

const debug = _debug("lark-mvc");

class MVC extends Layer {
    constructor (modelPath, options = defaultConfig) {
        debug("MVC: constructing");
        if (!modelPath || 'string' !== typeof modelPath) {
            modelPath = 'models';
        }
        if (!path.isAbsolute(modelPath)) {
            modelPath = path.join(path.dirname(process.mainModule.filename), modelPath);
        }
        super({});
        debug("MVC: loading models");
        this._layers = {};
        const entrylayers = {};
        for (const layername in options) {
            const dirname = path.join(modelPath, options[layername].path || '');
            debug("MVC: layer " + layername + ", path is " + dirname);
            for (const _layername in this._layers) {
                const layer = this._layers[_layername];
                const layerPath = layer.path;
                if (!layerPath) {
                    continue;
                }
                if (layerPath.indexOf(dirname) === 0 || dirname.indexOf(layerPath) === 0) {
                    throw new Error("Can not add layer with path " + dirname + ", conflict with " + layerPath);
                }
            }
            debug("MVC: creating layer " + layername);
            this._layers[layername] = new Layer(this);
            entrylayers[layername] = this._layers[layername];
            debug("MVC: loading directory " + dirname);
            this._layers[layername].load(dirname);
        }
        debug("MVC: add access to each layer");
        for (const layername in options) {
            debug("MVC: adding access layers to " + layername);
            const layer = this._layers[layername];
            let accessList = options[layername].access;
            if (!Array.isArray(accessList)) {
                accessList = [accessList];
            }
            for (const accessLayername of accessList) {
                if ('string' !== typeof accessLayername) {
                    continue;
                }
                debug("MVC: adding access layer " + accessLayername + " to " + layername);
                layer.addAccessLayer(accessLayername, this._layers[accessLayername]);
                delete entrylayers[accessLayername];
            }
        }
        debug("MVC: adding entry access layers");
        for (const layername in entrylayers) {
            debug("MVC: adding access layer " + layername + " to entry layer");
            const layer = this._layers[layername];
            this.addAccessLayer(layername, layer);
        }
    }
    access () {
        return this._accessWithPath();
    }
    _accessWithPath (modulePath) {
        debug("MVC: access");
        this._accessed = this._accessed || {};
        modulePath = modulePath || this._currentModulePath || null;
        debug("MVC: caller is " + modulePath);
        if (!modulePath) {
            return super.access();
        }
        if (this._accessed[modulePath]) {
            debug("MVC: using cache");
            return this._accessed[modulePath];
        }
        for (const layername in  this._layers) {
            const layer = this._layers[layername];
            const dirname = layer.path;
            if (!dirname) {
                continue;
            }
            if (modulePath.indexOf(dirname) === 0) {
                debug("MVC: layer found");
                this._accessed[modulePath] = layer.access();
                return layer.access();
            }
        }
        debug("MVC: no layer found, use entry layer");
        return super.access();
    }
    createService () {
        return new Service(this, this._currentModulePath);
    }
}
savable(MVC);
MVC.middleware = middleware;

debug("MVC: load");
export default MVC;
