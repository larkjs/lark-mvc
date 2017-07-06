'use strict';

const Koa = require('koa');
const LarkMVC = require('lark-mvc');

class ShowIntroduction extends LarkMVC.Controller {
    async main(ctx) {
        const person = new this.model.Person('Sun Haohao');
        ctx.body = await this.view().render(person);
        return;
    }
}

class Person extends LarkMVC.Model {
    constructor(name) {
        super();
        this.name = name;
    }
    async introduction() {
        return new Promise(resolve => setTimeout(() => resolve(`Hello, I am ${this.name}`), 1000));
    }
}

class MyView extends LarkMVC.View {
    async render(person) {
        return await person.introduction();
    }
}

const app = new Koa();
const mvc = new LarkMVC();

mvc.use(ShowIntroduction, Person, MyView);
app.use(async (...args) => await mvc.dispatch('ShowIntroduction', ...args)).listen(3000);

