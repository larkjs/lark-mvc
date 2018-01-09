/**
 * Demo of LarkMVC
 **/
'use strict';

const debug = require('debug')('lark-mvc.example');
const MVC   = require('lark-mvc');


const mvc = new MVC();    // using default config


class HelloPage extends mvc.Page {

    constructor() {
        super();
        debug('construct HelloPage');
    }

    async main() {
        console.log(this.mvc);
        const message = await this.mvc.Data.HelloData.getMessage();
        console.log(message);
    }

}


class HelloData extends mvc.Data {

    static async getMessage() {
        return Promise.resolve('Hello World');
    }

}


mvc.use(HelloPage).use(HelloData);


const helloPage = new HelloPage();

helloPage.main().catch(error => console.log(error.stack));
