/**
 * lark-mvc - lib.layerproxy.test.js
 * Copyright(c) 2014 larkjs-team(https://github.com/lark-mvc)
 * MIT Licensed
 */

'use strict';

/**
 * Module dependencies.
 */

var request = require('supertest');
var layerproxy = require('../lib/layerproxy.js');
var events = require("events")

describe('lib/layerproxy.js', function () {
    describe('layerproxy instance', function(){
        it('should be an instance of Object', function(done){
            (layerproxy instanceof Object).should.equal(true);
            done();
        })
    })

    describe('the factory function `create`', function(){
        it(' should return a instance', function(done){
            (layerproxy.dataService.create()).should.be.an.instanceOf(layerproxy.DataService);
            (layerproxy.pageService.create()).should.be.an.instanceOf(layerproxy.PageService);
            (layerproxy.dao.create()).should.be.an.instanceOf(layerproxy.DaoService);
            done();
        })
    })

    describe('the layers', function(){
        it(' should have ability to emit events.', function(done){
            (layerproxy.dataService.create()).should.be.an.instanceOf(events.EventEmitter);
            (layerproxy.pageService.create()).should.be.an.instanceOf(events.EventEmitter);
            (layerproxy.dao.create()).should.be.an.instanceOf(events.EventEmitter);
            done();
        })
    })
});

