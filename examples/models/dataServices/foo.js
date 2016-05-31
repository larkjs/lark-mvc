/**
 * Lark-mvc example data foo.js
 **/
'use strict';

import _debug	from 'debug';
import MVC    from '../../..';

const debug = _debug('lark-mvc');

const access  = MVC.instance().access();
const service = {};

service.get = async () => {
  debug("Example: data foo - get data by access.dao.foo.request");
	let data = await access.dao.foo.request();
	data = data + '[data/foo]';
	return data;
};

export default service;
