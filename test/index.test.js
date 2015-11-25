/**
 * lark-mvc - index.test.js
 * Copyright(c) 2014 larkjs-team(https://github.com/lark-mvc)
 * MIT Licensed
 */

'use strict';

/**
 * Module dependencies.
 */

var request = require('supertest');
var mvc = require('../index');

describe('index.js', function () {
    describe('mvc object', function(){
        it('should be an instanceof Object', function(done){
            (mvc instanceof Object).should.equal(true);
            done();
        })
    })

    describe('mvc object', function(){
        it('should contains `page services`, `data services`, `dao` and `middleware` which have been defined', function(done){
            (mvc.pageServices).should.be.type('object');
            (mvc.dataServices).should.be.type('object');
            (mvc.daoServices).should.be.type('object');
            (mvc.PageService).should.be.a.Function;
            done();
        })
    })


});
