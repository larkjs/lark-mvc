/**
 * Lark-mvc example middleware use with Koa
 **/
'use strict';

var _debug2 = require('debug');

var _debug3 = _interopRequireDefault(_debug2);

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _middleware = require('../middleware');

var _middleware2 = _interopRequireDefault(_middleware);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } step("next"); }); }; }

const debug = (0, _debug3.default)('lark-mvc');

process.mainModule = module;

const app = new _koa2.default();

const config = {
	'page': {
		access: ['data', 'pageHelper'],
		path: 'pageServices'
	},
	'pageHelper': {
		access: ['data'],
		path: 'pageHelpers'
	},
	'data': {
		access: ['dao'],
		path: 'dataServices'
	},
	'dao': {
		access: null,
		path: 'daoServices'
	}
};

app.use((0, _middleware2.default)('models', config));
app.use((function () {
	var ref = _asyncToGenerator(function* (ctx, next) {
		console.log(ctx.url);
		if (ctx.url.match(/bar/)) {
			debug("Example: page.bar.execute with ctx");
			ctx.body = yield ctx.mvc.page.bar.execute(ctx);
		} else {
			debug("Example: page.foo.execute");
			ctx.body = yield ctx.mvc.page.foo.execute();
		}
		yield next();
	});

	return function (_x, _x2) {
		return ref.apply(this, arguments);
	};
})());

app.listen(3000);

debug("Example: load!");