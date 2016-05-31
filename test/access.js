/**
 * lark-mvc test/access.js
 * Copyright(c) 2016 larkjs-team(https://github.com/larkjs)
 * MIT Licensed
 **/
'use strict';

import _debug     from 'debug';
import MVC        from '..';
import supertest  from 'supertest';
import app        from '../examples/app';

const debug = _debug('lark-mvc');

process.mainModule = module;

const request = supertest.agent(app.callback());

describe('access the Koa service with Lark MVC', () => {
    it('should response data from each layer by requesting "/" ', done => {
        request.get('/')
            .expect(200)
            .expect('Foo[DaoData][data/foo][data/fix][pagehelper/common][page/foo]', done);
    });

    it('should response data from each layer by requesting "/bar" ', done => {
        request.get('/bar')
            .expect(200)
            .expect('Bar[DaoData][data/bar][data/fix][pagehelper/common][page/bar]', done);
    });
});
