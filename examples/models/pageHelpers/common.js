/**
 * Lark-mvc page help page common
 **/
'use strict';

import _debug	from 'debug';
import MVC 		from '../../..';

const debug = _debug('lark-mvc');

//const access = MVC.instance().access();

//const helper = MVC.instance().createService();
const helper = {};

helper.process = async (data) => {
  const access = helper.access();
  debug("Example: page-helper process - fix by access.data.fix.get");
	const fix = await access.data.fix.get();
	data = data + fix;
	return data + "[pagehelper/common]";
};

export default helper;
