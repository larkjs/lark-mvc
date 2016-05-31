/**
 * Lark-mvc example raw use with Koa
 **/
'use strict';

import _debug	from 'debug';
import Koa		from 'koa';
import MVC 		from '..';

const debug = _debug('lark-mvc');

const app = new Koa();

debug("Example: create an instance of MVC, and save it");
const access = new MVC('models').saveInstance().access();

debug("Example: prepare koa app");
app.use(async (ctx, next) => {
	debug("Example: page.foo.execute without ctx");
  try {
	  ctx.body = await access.page.foo.execute();
  }
  catch (e) {
    console.log(e.stack);
  }
});

app.listen(3000);

debug("Example: load!");
