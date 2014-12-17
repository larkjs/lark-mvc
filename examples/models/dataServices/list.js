var demo = require('lark-mvc').dataService.create('demo')
demo.getData = function(){
    return this.daoServices.demo.getData() + '\n' +
        'demo dataServices is loaded!'
}
module.exports = demo
