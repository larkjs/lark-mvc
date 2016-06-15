/**
 * Lark-mvc middleware for Lark/Koa2.x
 **/
'use strict';

import _debug   from 'debug';
import path     from 'path';
import MVC      from '..';

const debug = _debug("lark-mvc");

function middleware (modelPath, options) {
  debug("Middleware: create middleware");
  if ('string' !== typeof modelPath) {
    modelPath = '';
  }
  if (!path.isAbsolute(modelPath)) {
    modelPath = path.join(path.dirname(process.mainModule.filename), modelPath);
  }
  const mvc = new MVC(modelPath, options).saveInstance();
  return async (ctx, next) => {
    debug("Middleware: binding mvc access to ctx");
    ctx.mvc = mvc.access();
    await next();
  };
}

debug("Middleware: load");
export default middleware;
