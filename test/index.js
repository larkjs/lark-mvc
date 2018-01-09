/**
 * Test of lark MVC
 **/
'use strict';

const MVC = require('lark-mvc');

const mvc = new MVC();    //using default config

class HelloPage extends mvc.Page {

    async main() {
        const message = await this.mvc.Data.Hello.getMessage();
        return HelloPage.mvc.PageHelper.toUpperCase(message);
    }

    accessDao() {
        this.mvc.Dao.HelloDao.foo();
    }

}


class HelloData extends mvc.Data {

    static async getMessage() {
        return Promise.resolve('Hello World');
    }

}

class Helper extends mvc.PageHelper {
    static toUpperCase(message) {
        return message.toUpperCase();
    }
}

class HelloDao extends mvc.Dao {
    static foo () {}
}


describe('common use', () => {
    it('should be ok using HelloPage and HelloData', async() => {
        mvc.use(HelloPage).use(HelloData, { name: 'Hello' }).use(Helper, { unique: true });
    });

    it('should get the data from message by calling page', async () => {
        const helloPage = new HelloPage();
        const message = await helloPage.main();
        message.should.be.exactly('HELLO WORLD');
    });

    it('should not be allowed to access modules un-accessable', async () => {
        const helloPage = new HelloPage();
        let error = {};
        try {
            helloPage.accessDao();
        }
        catch (e) {
            error = e;
        }
        error.should.be.an.instanceOf(Error);
    });
});


