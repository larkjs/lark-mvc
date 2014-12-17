var demo = require('lark-mvc').pageService.create('demo')
demo.render = function(){
    return this.dataServices.demo.getData() + '\ndemo pageService is loaded!'
}
module.exports = demo
