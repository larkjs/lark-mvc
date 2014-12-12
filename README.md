MVC for lark.js

一个支持MVC模式的中间件

## 功能:

    * MVC 分层逻辑
    * app中只能相邻层调用，不允许跨层调用
    * hook功能支持：支持hook功能，在跨层调用前后，发送相应事件，添加自定义逻辑。

## Install:

```
npm install lark-mvc
```

## 示例:

在 bootstrap 中启用本模块

```
var larkMVC = require('lark-mvc')
var app = require('lark')
app.use(larkMVC()) // lark 默认是支持本模块的，本行代码可以删除
```

controller层在 lark-router中实现
view 层在template 模板目录里
model 层又分3层: pageService, dataService, dao， 功能如下:

    * pageService 负责页面数据逻辑, 被action调用，调用dataService
    * dataService 负责业务数据逻辑，被pageService调用，调用dao
    * dao 负责数据库相关业务逻辑

pageService 样例:

```
var pageService = require('lark-mvc').pageService
var demo = pageService.create('demo')
demo.render = function(){
    var res = ''
    co(function *(){
    var categroy = yield this.dataService.demo.getArticles(this.params.id)
    var articles = yield this.dataService.demo.getArticles(categroy)
    var data = {
        'categroy': categroy,
        'articles': articles
    }
    res = yield this.render('demo.html', data)
    })
    return res
})
module.exports = demo
```

action 层调

```
this.pageService.demo.render() [ok]
this.dataService.demo.getArticles() [no]
```

dataService 样例:

```
var dataService = require('lark-mvc').dataService
var demo = dataService.create('demo')
demo.getData = * function(){
    // get data by dao
    articles = {}
    co (function *(){
        var articles = yeild this.dao.demo.get(this.request.id);
        if articles
    })
    return articles
}

module.exports = demo
```

层之间hook样例：

```
pageSerice.on('beferDataService', function(params){
    validate(params)
})
```

