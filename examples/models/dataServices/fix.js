/**
 * Lark-mvc example data foo.js
 **/
'use strict';

import _debug	from 'debug';

const debug = _debug('lark-mvc');

const service = {};

service.get = async () => {
  debug("Example: data fix - fix directly");
	const data = '[data/fix]';
	return data;
};

export default service;
