/**
 * Test of lark MVC
 **/
'use strict';

const mvc = require('../example/app');

describe('mvc', () => {
    it('should have properties', (done) => {
        const controllers = mvc.controller();
        controllers.should.be.an.instanceof(Object);
        done();
    });
});

describe('mvc.dispatch', () => {
    it('should return the result as expectd', async () => {
        const now = Date.now();
        const message = await mvc.dispatch('HelloAction', 'Yu Qi');
        message.should.be.an.instanceof(String);
        message.should.be.exactly('The visitor said: "Hello, my name is Yu Qi. Nice to meet you." Then the host said: "Oh, welcome! My name is Sun Haohao, the host of this site."');
        let delay = Date.now() - now;
        (delay >= 40 && delay <= 60).should.be.ok;
    });
});
