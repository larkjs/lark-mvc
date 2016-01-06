/**
 * Lark-mvc
 **/
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _debug2 = require('debug');

var _debug3 = _interopRequireDefault(_debug2);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _saveInstance = require('save-instance');

var _saveInstance2 = _interopRequireDefault(_saveInstance);

var _layer = require('./lib/layer');

var _layer2 = _interopRequireDefault(_layer);

var _service = require('./lib/service');

var _service2 = _interopRequireDefault(_service);

var _default = require('./conf/default');

var _default2 = _interopRequireDefault(_default);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const debug = (0, _debug3.default)("lark-mvc");

class MVC extends _layer2.default {
    constructor(modelPath) {
        let options = arguments.length <= 1 || arguments[1] === undefined ? _default2.default : arguments[1];

        debug("MVC: constructing");
        if (!modelPath || 'string' !== typeof modelPath) {
            modelPath = 'models';
        }
        if (!_path2.default.isAbsolute(modelPath)) {
            modelPath = _path2.default.join(_path2.default.dirname(process.mainModule.filename), modelPath);
        }
        super({});
        debug("MVC: loading models");
        this._layers = {};
        const entrylayers = {};
        for (const layername in options) {
            const dirname = _path2.default.join(modelPath, options[layername].path || '');
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
            this._layers[layername] = new _layer2.default(this);
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
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = accessList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    const accessLayername = _step.value;

                    if ('string' !== typeof accessLayername) {
                        continue;
                    }
                    debug("MVC: adding access layer " + accessLayername + " to " + layername);
                    layer.addAccessLayer(accessLayername, this._layers[accessLayername]);
                    delete entrylayers[accessLayername];
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }
        debug("MVC: adding entry access layers");
        for (const layername in entrylayers) {
            debug("MVC: adding access layer " + layername + " to entry layer");
            const layer = this._layers[layername];
            this.addAccessLayer(layername, layer);
        }
    }
    access() {
        return this._accessWithPath();
    }
    _accessWithPath(modulePath) {
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
        for (const layername in this._layers) {
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
    createService() {
        return new _service2.default(this, this._currentModulePath);
    }
}
(0, _saveInstance2.default)(MVC);

debug("MVC: load");
exports.default = MVC;
