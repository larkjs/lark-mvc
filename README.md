MVC for building web server using lark.js

  [![NPM version][npm-image]][npm-url]
  [![build status][travis-image]][travis-url]

# Lark-MVC

A manager for MVC design.

## How to use

* see `example/koa.js` in source code

First define mvc and some module, then dispatch works.

```
const MVC = require('lark-mvc');
const mvc = new MVC();    // using default configs
```

Define a Page class inherits from `mvc.Page` as an controller

```
class ShowIntroduction extends mvc.Page {
    async main(ctx, next) {
        const person = new this.mvc.Data.Person('Sun Haohao');
        ctx.body = await this.mvc.View.render(person);
        await next();
    }
}
```

Define a Data `Person` as model

```
class Person extends mvc.Data {
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
class MyView extends mvc.View {
    async render(person) {
        return await person.introduction();
    }
}
```

Register them
```
const app = new Koa();
const mvc = new LarkMVC();

mvc.use(ShowIntroduction).use(Person).use(MyView);
app.use(async (...args) => {
    const showIntroduction = new ShowIntroduction();
    await showIntroduction.main(...args);
}).listen(3000);
```

[npm-image]: https://img.shields.io/npm/v/lark-mvc.svg?style=flat-square
[npm-url]: https://npmjs.org/package/lark-mvc

[travis-image]: https://img.shields.io/travis/larkjs/lark-mvc/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/larkjs/lark-mvc
