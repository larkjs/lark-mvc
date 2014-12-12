var pageService = require('lark-mvc').pageService
var demo = pageService.create('demo')
demo.render = function(){
    return this.pageServices.demo.getDate() + 'demo pageService is loaded!'
    return res
})
module.exports = demo
