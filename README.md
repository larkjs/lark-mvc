MVC for building web server using lark.js

  [![NPM version][npm-image]][npm-url]
  [![build status][travis-image]][travis-url]

## Features:

    * Seperate bussiness codes into `pageService`, `dataService` and `dao`, which accord to `MVC` concept. (`C`in `MVC` implements in `lark-router`).
    * Make calling rules between MVC layers.

## Note:

This version need node > 4.0.0

## Install:

```
npm install lark-mvc
```

## Example:

First of all, import web server and this module in the app. 

```
var mvc = require('lark-mvc')
var app = require('lark')
            .use(mvc.middleware) 
            .run(3000)
```

Secondely, write `pageService` layer to implement `V` in MVC, which generates html codes by rendering tempalate and data.

```
var mvc = require('lark-mvc')
class TestPageService extends mvc.PageService{
    render (){
        var res = ''
        co(function *(){
        var categroy = yield mvc.dataServices.demo.getArticles(this.params.id)
        var articles = yield mvc.dataServices.demo.getArticles(categroy)
        var data = {
            'categroy': categroy,
            'articles': articles
        }
        res = yield this.render('demo.html', data)
        })
        return res 
    }
}
module.exports = TestPageService
```

Thirdly, write `dataService` layer to implement `M` in MVC, which collects data from database and passes them to `pageService`.

```
var mvc = require('lark-mvc')
class demo extends mvc.DataService{
    getData * (){
    // get data by dao
    articles = {}
    co (function *(){
        var articles = yeild this.dao.demo.get(this.request.id);
        if articles
    })
    return articles
    }
}
module.exports = demo
```

Forthly, write `dao` layer, which is a wrapper of accessing database.

```
var mvc = require('lark-mvc')
class demo extends mvc.DataService{
    getData * (){
        db = redis.conn()
        data = db.get('test-key')
        return data
    }
}
module.exports = demo
```

We have all done here. And then, run the app to see the results.

```
node app.js
```

<hr>

一个用来支持MVC模式开发Web服务的中间件

## 功能:

    * MVC 分层逻辑
    * app中只能相邻层调用，不允许跨层调用
    * hook功能支持：支持hook功能，在跨层调用前后，发送相应事件，添加自定义逻辑。

## 示例:

在 bootstrap 中启用本模块

```
var mvc = require('lark-mvc')
var app = require('lark')
app.use(mvc.middleware) // lark 默认是支持本模块的，本行代码可以删除
```

controller层在 lark-router中实现
view 层在template 模板目录里
model 层又分3层: pageService, dataService, dao， 功能如下:

    * pageService 负责页面数据逻辑, 被action调用，调用dataService
    * dataService 负责业务数据逻辑，被pageService调用，调用dao
    * dao 负责数据库相关业务逻辑

pageService 样例:

```
var mvc = require('lark-mvc')
class TestPageService extends mvc.PageService{
    render (){
        var res = ''
        co(function *(){
        var categroy = yield mvc.dataServices.demo.getArticles(this.params.id)
        var articles = yield mvc.dataServices.demo.getArticles(categroy)
        var data = {
            'categroy': categroy,
            'articles': articles
        }
        res = yield this.render('demo.html', data)
        })
        return res 
    }
}
module.exports = TestPageService
```

action 层调

```
mvc.pageServices.demo.render() [ok]
mvc.dataServices.demo.getArticles() [no]
```

dataService 样例:

```
var mvc = require('lark-mvc')
class demo extends mvc.DataService{
    getData * (){
    // get data by dao
    articles = {}
    co (function *(){
        var articles = yeild this.dao.demo.get(this.request.id);
        if articles
    })
    return articles
    }
}
module.exports = demo
```

dao 样例:

```
var mvc = require('lark-mvc')
class demo extends mvc.DataService{
    getData * (){
        db = redis.conn()
        data = db.get('test-key')
        return data
    }
}
module.exports = demo
```
##CHANGELOG

* 2015-11-25 V1.0.0 * 
Changes:
	* removing auto load models to simplify using
	* add es6 and es7 features


[npm-image]: https://img.shields.io/npm/v/lark-mvc.svg?style=flat-square
[npm-url]: https://npmjs.org/package/lark-mvc

[travis-image]: https://img.shields.io/travis/larkjs/lark-mvc/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/larkjs/lark-mvc
