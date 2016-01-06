/**
 * Lark-mvc service
 **/
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _debug2 = require('debug');

var _debug3 = _interopRequireDefault(_debug2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const debug = (0, _debug3.default)('lark-mvc');

function Service(mvc, modulePath) {
    if (!mvc) {
        throw new Error("Param mvc is required to create services");
    }
    if ('string' !== typeof modulePath) {
        throw new Error("Module path is required to create services");
    }
    this.__modulePath = modulePath;
    this.__mvc_instance = mvc;
    this.access = () => {
        return this.__mvc_instance._accessWithPath(this.__modulePath);
    };
}

exports.default = Service;