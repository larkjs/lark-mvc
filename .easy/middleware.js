/**
 * Lark-mvc middleware for Lark/Koa2.x
 **/
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _debug2 = require('debug');

var _debug3 = _interopRequireDefault(_debug2);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _ = require('./');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } step("next"); }); }; }

const debug = (0, _debug3.default)("lark-mvc");

function middleware(modelPath, options) {
  debug("Middleware: create middleware");
  if ('string' !== typeof modelPath) {
    modelPath = '';
  }
  if (!_path2.default.isAbsolute(modelPath)) {
    modelPath = _path2.default.join(_path2.default.dirname(process.mainModule.filename), modelPath);
  }
  const mvc = new _2.default(modelPath, options).saveInstance();
  return (function () {
    var ref = _asyncToGenerator(function* (ctx, next) {
      debug("Middleware: binding mvc access to ctx");
      ctx.mvc = mvc.access();
      yield next();
    });

    return function (_x, _x2) {
      return ref.apply(this, arguments);
    };
  })();
}

debug("Middleware: load");
exports.default = middleware;
