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

    describe('properties', function(){
        it('dataServices should accessible', function(done){
            (layerproxy.dataServices instanceof Object).should.equal(true);
            done();
        })

        it('pageServices should accessible', function(done){
            (layerproxy.pageServices instanceof Object).should.equal(true);
            done();
        })

        it('daoServices should accessible', function(done){
            (layerproxy.daoServices instanceof Object).should.equal(true);
            done();
        })

        it('layers should accessible', function(done){
            (layerproxy.layers instanceof Object).should.equal(true);
            done();
        })
    })
});

