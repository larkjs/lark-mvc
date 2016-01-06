/**
 * Lark-mvc example page/bar.js
 **/
'use strict';

var _arguments = arguments;
Object.defineProperty(exports, "__esModule", {
	value: true
});

var _debug2 = require('debug');

var _debug3 = _interopRequireDefault(_debug2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } step("next"); }); }; }

const debug = (0, _debug3.default)('lark-mvc');

const service = {};

service.request = _asyncToGenerator(function* () {
	let ctx = _arguments.length <= 0 || _arguments[0] === undefined ? {} : _arguments[0];

	debug("Example: dao requesting the backend");
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve("Bar[DaoData]");
		}, 500);
	});
});

exports.default = service;