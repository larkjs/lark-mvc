/**
 * lark-mvc test/mvc.js
 * Copyright(c) 2016 larkjs-team(https://github.com/larkjs)
 * MIT Licensed
 **/
'use strict';

import _debug   from 'debug';
import MVC      from '..';

const debug = _debug('lark-mvc');

process.mainModule = module;

describe('the instance of lark mvc', () => {
    const instance = new MVC("../examples/models");
    it('should be an instance of Lark-MVC', done => {
        instance.should.be.an.instanceOf(MVC);
        instance.should.have.a.property('access')
                .which.is.an.instanceOf(Function)
                .with.lengthOf(0);
        instance.should.have.a.property('createService')
                .which.is.an.instanceOf(Function)
                .with.lengthOf(0);
        done();
    });
});
