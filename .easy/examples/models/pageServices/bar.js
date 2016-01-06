/**
 * Lark-mvc example page/bar.js
 **/
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _debug2 = require('debug');

var _debug3 = _interopRequireDefault(_debug2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } step("next"); }); }; }

const debug = (0, _debug3.default)('lark-mvc');

const service = {};

service.execute = (function () {
	var ref = _asyncToGenerator(function* (ctx) {
		debug("Exmaple: page bar - get data by ctx.data.bar.get with ctx");
		let data = yield service.access().data.bar.get(ctx);
		debug("Example: page bar - process data by ctx.pageHelper.process without ctx");
		data = yield service.access().pageHelper.common.process(data);
		return data + '[page/bar]';
	});

	return function (_x) {
		return ref.apply(this, arguments);
	};
})();

debug("Example: load!");
exports.default = service;