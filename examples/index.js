var koa = require('koa')
var mvc = require('lark-mvc')
var app = koa()

app.use(mvc.middleware)
.use(function *(next){
    yield next;
    this.body = mvc.pageServices.list.render() + mvc.pageServices.newlist.render()
})

app.listen(3000);
