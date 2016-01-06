/**
 * Lark-mvc service
 **/
'use strict';

import _debug   from 'debug';

const debug = _debug('lark-mvc');

function Service (mvc, modulePath) {
    if (!mvc) {
        throw new Error("Param mvc is required to create services");
    }
    if ('string' !== typeof modulePath) {
        throw new Error("Module path is required to create services");
    }
    this.__modulePath = modulePath; 
    this.__mvc_instance = mvc;
    this.access = () => {
        return this.__mvc_instance._accessWithPath(this.__modulePath);
    };
}


export default Service;
