MVC for building web server using lark.js

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![NPM downloads][downloads-image]][npm-url]
[![Node.js dependencies][david-image]][david-url]

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

In most case we don't register modules one by one manually. We can use loader to load all modules, like this

```
const loader = require('lark-autoloader');

const app = new Koa();
const mvc = new LarkMVC();
const loader = new LarkAutoLoader(mvc, (filePath, keys) => {
    mvc.use(require(filePath), { name: keys.join('/') });
});
await loader.load('path/to/my/module');
```

[npm-image]: https://img.shields.io/npm/v/lark-mvc.svg?style=flat-square
[npm-url]: https://npmjs.org/package/lark-mvc
[travis-image]: https://img.shields.io/travis/larkjs/lark-mvc/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/larkjs/lark-mvc
[downloads-image]: https://img.shields.io/npm/dm/lark-mvc.svg?style=flat-square
[david-image]: https://img.shields.io/david/larkjs/lark-mvc.svg?style=flat-square
[david-url]: https://david-dm.org/larkjs/lark-mvc
[coveralls-image]: https://img.shields.io/codecov/c/github/larkjs/lark-mvc.svg?style=flat-square
[coveralls-url]: https://codecov.io/github/larkjs/lark-mvc
