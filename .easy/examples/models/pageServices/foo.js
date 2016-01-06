/**
 * Lark-mvc example page/foo.js, use of mvc directly
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

const service = {};
const access = _2.default.instance().access();

service.execute = _asyncToGenerator(function* () {
	debug("Exmaple: page foo - get data by access.data.foo.get");
	let data = yield access.data.foo.get();
	debug("Example: page foo - process data by service.pageHelper.process");
	data = yield access.pageHelper.common.process(data);
	return data + '[page/foo]';
});

debug("Example: load!");
exports.default = service;