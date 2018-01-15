/**
 * Demo of using lark-autoloader to load mvc modules
 * from directories
 **/
'use strict';

const AutoLoader  = require('lark-autoloader');
const Koa         = require('koa');
const MVC         = require('lark-mvc');

const app = new Koa();
const mvc = new MVC():
const loader  = new AutoLoader(mvc, (filePath, keys) => {

});
