/**
 * Lark-mvc example raw use with Koa
 **/
'use strict';

var _debug2 = require('debug');

var _debug3 = _interopRequireDefault(_debug2);

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _ = require('..');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } step("next"); }); }; }

const debug = (0, _debug3.default)('lark-mvc');

const app = new _koa2.default();

debug("Example: create an instance of MVC, and save it");
const access = new _2.default('models').saveInstance().access();

debug("Example: prepare koa app");
app.use((function () {
  var ref = _asyncToGenerator(function* (ctx, next) {
    debug("Example: page.foo.execute without ctx");
    try {
      ctx.body = yield access.page.foo.execute();
    } catch (e) {
      console.log(e.stack);
    }
  });

  return function (_x, _x2) {
    return ref.apply(this, arguments);
  };
})());

app.listen(3000);

debug("Example: load!");