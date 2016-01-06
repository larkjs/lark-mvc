MVC for building web server using lark.js

  [![NPM version][npm-image]][npm-url]
  [![build status][travis-image]][travis-url]

## Features:

    * Seperate bussiness codes into layers such as `pageServices`, `dataServices` and `daoServices`, which accord to `MVC` concept. (`C`in `MVC` implements in `lark-router`).
    * Make calling rules between MVC layers.
    * Support hook between MVC layers (not implemented yet).

## Install:

```
npm install lark-mvc
```

## Example:

First of all, import web server and this module in the app. 

```
import mvc from 'lark-mvc/middleware';
import KOA from 'koa'; // koa2.x
const app = new Koa();
app.use(mvc()) 
app.run(3000)
```

Secondely, write `pageServices` layer to implement `V` in MVC, which generates html codes by rendering tempalate and data.

```
import MVC from 'lark-mvc';
const service = MVC.getInstance().createService();
const access = service.access();

service.render = async (ctx) => {
    let res = '';
    let categroy = await access.data.demo.getArticles(ctx.params.id);
    let articles = await access.data.demo.getArticles(categroy);
    let data = {
        'categroy': categroy,
        'articles': articles
    };
    res = await ctx.render('demo.html', data);
    return res;
})
export default service;
```

Thirdly, write `dataServices` layer to implement `M` in MVC, which collects data from database and passes them to `pageServices`.

```
import MVC from 'lark-mvc';
const service = MVC.getInstance().createService();
const access = service.access();

service.getData = async (ctx) => {
    // get data by dao
    let articles = {}
    articles = await access.dao.demo.get(ctx.request.id);
    return articles
}

export default service;
```

Forthly, write `daoServices` layer, which is a wrapper of accessing database.

```
import MVC from 'lark-mvc';
const service = MVC.getInstance().createService();
const access = service.access();

service.getData = async (ctx) => {
    db = redis.conn();
    data = await db.get('test-key');
    return data;
}

export default service;
```

We have all done here. And then, run the app to see the results.
(Remember to compile with babel before running it)

[npm-image]: https://img.shields.io/npm/v/lark-mvc.svg?style=flat-square
[npm-url]: https://npmjs.org/package/lark-mvc

[travis-image]: https://img.shields.io/travis/larkjs/lark-mvc/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/larkjs/lark-mvc
