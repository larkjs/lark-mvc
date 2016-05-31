/**
 * Lark-mvc example page/bar.js
 **/
'use strict';

import _debug	from 'debug';

const debug = _debug('lark-mvc');

const service = {};

service.request = async (ctx = {}) => {
	debug("Example: dao requesting the backend");
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve("Bar[DaoData]");
		}, 500);
	});
};

export default service;
