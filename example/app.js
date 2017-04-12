/**
 * Example of LarkMVC control
 **/
'use strict';
process.mainModule = module;

const MVC = require('..');

class HelloAction extends MVC.Controller {

    async main(visitor) {
        const guest = new this.model.person.Guest(visitor);
        let message = 'The visitor said: "';
        message += await this.view.render(guest.introduce());
        message += '" Then the host said: "';
        message += await this.getView('MyView').render(guest.host.welcome());
        message += '"';

        const guest2 = new (this.getModel('person/Guest'))(visitor);
        guest2.introduce();
        return message;
    }

}

class Host extends MVC.Model {

    static getInstance() {
        return new Host();
    }

    constructor() {
        super();
        this.name = 'Sun Haohao';
    }

    welcome() {
        return `Oh, welcome! My name is ${this.name}, the host of this site.`;
    }
}

class Guest extends MVC.Model {

    constructor(name) {
        super();
        this.name = name;
        this.host = this.getModel('Host').getInstance();
        this.host2 = this.model.Host.getInstance();
    }

    introduce() {
        return `Hello, my name is ${this.name}. Nice to meet you.`;
    }

}

class MyView extends MVC.View {

    async render(message) {
        await new Promise(resolve => setTimeout(resolve, 50));
        return message;
    }

}


const mvc = new MVC();

mvc.use(HelloAction)
   .use(Host)
   .use(Guest, { dirname: 'person' })
   .use(MyView);

mvc.dispatch(HelloAction, 'Stranger')
;//   .then(message => console.log(message))
//   .catch(e => console.log(e));

module.exports = mvc;
