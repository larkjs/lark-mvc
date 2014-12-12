var koa = require('koa');
var mvc = require('../index')
var app = koa();
app.use(function *(next){
    var start = new Date;
    yield next;
    var ms = new Date - start;
    console.log('%s %s - %s', this.method, this.url, ms);
}).use(mvc('examples/model'))
.use(function *(next){
    yield next;
    console.log(this.pageServices.demo.render())
})

