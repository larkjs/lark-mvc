/**
 * Lark-mvc example dao/foo.js
 **/
'use strict';

import _debug	from 'debug';

const debug = _debug('lark-mvc');

const service = {};

service.request = async () => {
	debug("Example: dao foo - requestingthe backend (Faked Logic, return in 500ms)");
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve("Foo[DaoData]");
		}, 500);
	});
};

export default service;
