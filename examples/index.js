var koa = require('koa');
var mvc = require('lark-mvc')
var app = koa();
app.use(mvc.middleware({
    'path': './models'
}))
.use(function *(next){
    yield next;
    this.body = this.pageServices.demo.render() +
                this.pageServices.newlist.render()
})

app.listen(3000);
