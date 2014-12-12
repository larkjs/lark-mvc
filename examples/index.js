var koa = require('koa');
var mvc = require('..')
var app = koa();
console.log('reach example index.js')
app.use(function *(next){
    var start = new Date;
    yield next;
    var ms = new Date - start;
    console.log('%s %s - %s', this.method, this.url, ms);
}).use(mvc.middleware({'path': 'examples/models'}))
.use(function *(next){
    yield next;
    this.body = this.pageServices.demo.render()
})

app.listen(3000);
