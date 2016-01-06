/**
 * Lark-mvc page help page common
 **/
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _debug2 = require('debug');

var _debug3 = _interopRequireDefault(_debug2);

var _ = require('../../..');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } step("next"); }); }; }

const debug = (0, _debug3.default)('lark-mvc');

//const access = MVC.instance().access();

//const helper = MVC.instance().createService();
const helper = {};

helper.process = (function () {
  var ref = _asyncToGenerator(function* (data) {
    const access = helper.access();
    debug("Example: page-helper process - fix by access.data.fix.get");
    const fix = yield access.data.fix.get();
    data = data + fix;
    return data + "[pagehelper/common]";
  });

  return function (_x) {
    return ref.apply(this, arguments);
  };
})();

exports.default = helper;