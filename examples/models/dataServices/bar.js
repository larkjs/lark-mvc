/**
 * Lark-mvc example data bar.js
 **/
'use strict';

import _debug	from 'debug';

const debug = _debug('lark-mvc');

/*
const service = {};

service.get = async (ctx) => {
	let data = await service.access().dao.bar.request(ctx);
	data = data + '[data/bar]';
	return data;
};

export default service;
*/

export default {
    async get (ctx) {
        let data = await this.access().dao.bar.request(ctx);
        data = data + '[data/bar]';
        return data;
    },
};
