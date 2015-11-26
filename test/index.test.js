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
var mvc = require('..');
mvc.set_model_path("../examples/models")

describe('index.js', function () {
    describe('mvc object', function(){
        it('should be an instanceof Object', function(done){
            (mvc instanceof Object).should.equal(true)
            done();
        })
    })
    
    /*
    describe('mvc middleware', function(){
        it('should exists and be right type', function(done){
            (mvc.middleware).should.be.type('function')
        })
    })

    describe('mvc protocols', function(){
        it('should exists and be right type', function(done){
            (mvc.PageService).should.be.a.Function;
            (mvc.DataService).should.be.a.Function;
            (mvc.DaoService).should.be.a.Function;
        })
    })

    describe('mvc properties', function(){
        it('should contains `page services`, `data services`, `dao`', function(done){
            (mvc.pageServices).should.be.type('object');
            (mvc.dataServices).should.be.type('object');
            (mvc.daoServices).should.be.type('object');
            done();
        })
    })
    */

});
