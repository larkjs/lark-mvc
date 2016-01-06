/**
 * Lark-mvc example page/bar.js
 **/
'use strict';

import _debug	from 'debug';

const debug = _debug('lark-mvc');

const service = {};

service.execute = async (ctx) => {
	debug("Exmaple: page bar - get data by ctx.data.bar.get with ctx");
	let data = await service.access().data.bar.get(ctx);
	debug("Example: page bar - process data by ctx.pageHelper.process without ctx")
	data = await service.access().pageHelper.common.process(data);
	return data + '[page/bar]';
};

debug("Example: load!");
export default service;
