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
mvc.set_model_path("../../../examples/models")

describe('index.js', function () {
    describe('mvc object', function(){
        it('should be an instanceof Object', function(done){
            (mvc instanceof Object).should.equal(true)
            done();
        })
    })
});
