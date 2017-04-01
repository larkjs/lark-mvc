/**
 * Example of Lark MVC module
 **/
'use strict';
process.mainModule = module;

const debug   = require('debug')('lark-mvc.example');

const LarkMVC = require('..');

class HelloAction extends LarkMVC.Controller {
    async main(name1, name2) {
        let person1 = new this.model.path.to.Person(name1);
        let person2 = new (this.model('path/to/Person'))(name2);
        return await this.view().render(person1, person2);
    }
}

class Person extends LarkMVC.Model {
    static get name() { return 'path/to/Person'; }
    constructor(name) {
        super();
        this.name = name;
    }
    async introduce() {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(`Hello, my name is ${this.name}. Nice to meet you. | ${Date.now()}`);
            }, 50);
        });
    }
}

class MyView extends LarkMVC.View {
    async render(...persons) {
        let result = '';
        for (const person of persons) {
            let introduction = await person.introduce();
            result += introduction + '\n';
            debug(introduction);
        }
        return result;
    }
}

const mvc = new LarkMVC();

mvc.use(HelloAction);
mvc.use(Person);
mvc.use(MyView);

mvc.dispatch(HelloAction, 'Sun Haohao', 'Yu Qi').then(() => debug('Done'));

module.exports = mvc;
