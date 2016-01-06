/**
 * Lark-mvc example page/foo.js, use of mvc directly
 **/
'use strict';

import _debug	from 'debug';
import MVC 		from '../../..';

const debug = _debug('lark-mvc');

const service = {};
const access  = MVC.instance().access();

service.execute = async () => {
	debug("Exmaple: page foo - get data by access.data.foo.get");
	let data = await access.data.foo.get();
	debug("Example: page foo - process data by service.pageHelper.process");
	data = await access.pageHelper.common.process(data);
	return data + '[page/foo]';
};

debug("Example: load!");
export default service;
