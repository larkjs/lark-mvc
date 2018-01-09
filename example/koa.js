/**
 * Demo of using koa2
 **/
'use strict';

const Koa = require('koa');
const MVC = require('lark-mvc');

const app = new Koa();
const mvc = new MVC();


class ShowIntroduction extends mvc.Page {

    async main(ctx) {
        const person = new this.mvc.Data.Person('Sun Haohao');
        ctx.body = await this.mvc.View.render(person);
    }

}


class Person extends mvc.Data {

    constructor(name) {
        super();
        this.name = name;
    }

    async introduction() {
        return new Promise(resolve => setTimeout(() => resolve(`Hello, I am ${this.name}`), 1000));
    }

}


class View extends mvc.View {

    static async render(person) {
        return await person.introduction();
    }

}


mvc .use(ShowIntroduction)
    .use(Person)
    .use(View, { unique: true });


app.use(async (ctx, next) => {
    const page = new ShowIntroduction();
    await page.main(ctx);
    await next();
}).listen(3000);
