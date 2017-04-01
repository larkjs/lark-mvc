MVC for building web server using lark.js

  [![NPM version][npm-image]][npm-url]
  [![build status][travis-image]][travis-url]

# Lark-MVC

A manager for MVC design.

## How to use

Firts define some module, then dispatch works.

Define a controller class inherits from `LarkMVC.Controller`, then implements the method `main`.

```
class ShowIntroduction extends LarkMVC.Controller {
    async main(ctx, next) {
        const person = new this.model.Person('Sun Haohao');
        ctx.body = await this.view().render(person);
        return;
    }
}
```

Define a model `Person`

```
class Person extends LarkMVC.Model {
    constructor(name) {
        super();
        this.name = name;
    }
    async introduction() {
        return new Promise(resolve => setTimeout(() => resolve(`Hello, I am ${this.name}`), 1000));
    }
}
```

Define a view

```
class MyView extends LarkMVC.View {
    async render(person) {
        return await person.introduction();
    }
}
```

Register them
```
const app = new Koa();
const mvc = new LarkMVC();

mvc.use(ShowIntroduction, Person, MyView);
app.use(async (...args) => await mvc.dispatch('ShowIntroduction', ...args)).listen(3000);
```

[npm-image]: https://img.shields.io/npm/v/lark-mvc.svg?style=flat-square
[npm-url]: https://npmjs.org/package/lark-mvc

[travis-image]: https://img.shields.io/travis/larkjs/lark-mvc/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/larkjs/lark-mvc
