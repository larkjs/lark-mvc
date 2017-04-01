/**
 * Test of lark MVC
 **/
'use strict';

const mvc = require('../example/app');

describe('mvc.dispatch', () => {
    it('should return the result as expectd', async () => {
        const message = await mvc.dispatch('HelloAction', 'Sun Haohao', 'Yu Qi');
        message.should.be.an.instanceof(String);
        const lines = message.trim().split('\n');
        lines.length.should.be.exactly(2);
        lines[0].startsWith('Hello, my name is Sun Haohao. Nice to meet you. ').should.be.ok;
        lines[1].startsWith('Hello, my name is Yu Qi. Nice to meet you. ').should.be.ok;
        let time1 = parseInt(lines[0].split('|')[1].trim(), 10);
        let time2 = parseInt(lines[1].split('|')[1].trim(), 10);
        let delay = time2 - time1;
        (delay >= 40 && delay <= 60).should.be.ok;
    });
});
