/**
 * Lark-mvc example middleware use with Koa
 **/
'use strict';

import _debug	from 'debug';
import Koa		from 'koa';
import mvc 		from '../middleware';

const debug = _debug('lark-mvc');

process.mainModule = module;

const app = new Koa();

const config = {
	'page': {
		access: ['data', 'pageHelper'],
		path: 'pageServices',
	},
	'pageHelper': {
		access: ['data'],
		path: 'pageHelpers',
	},
	'data': {
		access: ['dao'],
		path: 'dataServices',
	},
	'dao' : {
		access: null,
		path: 'daoServices',
	},
}

app.use(mvc('models', config));
app.use(async (ctx, next) => {
  if (ctx.url.match(/bar/)) {
	    debug("Example: page.bar.execute with ctx");
	    ctx.body = await ctx.mvc.page.bar.execute(ctx);
  }
  else {
	    debug("Example: page.foo.execute");
      ctx.body = await ctx.mvc.page.foo.execute();
  }
  await next();
});

// app.listen(3000);

debug("Example: load!");
export default app;
