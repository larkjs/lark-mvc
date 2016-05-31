/**
 * Default config of lark-mvc
 **/
'use strict';

export default {
	'page': {
		access: ['data', 'pageHelper'],
		path: 'pageServices',
	},
	'pageHelper': {
		access: ['data'],
		path: 'pageHelpers',
	},
	'api': {
		access: ['data', 'apiHelper'],
		path: 'apiServices',
	},
	'apiHelper': {
		access: ['data'],
		path: 'apiHelpers',
	},
	'data': {
		access: ['dao', 'dataHelper'],
		path: 'dataServices',
	},
	'dataHelper': {
		access: ['dao'],
		path: 'dataHelpers',
	},
	'dao' : {
		access: ['daoHelper'],
		path: 'daoServices',
	},
	'daoHelper': {
		access: null,
		path: 'daoHelpers',
	}
}
