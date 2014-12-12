var dataService = require('lark-mvc').dataService
var demo = dataService.create('demo')
demo.getData = function(){
    return this.daoServices.getData() + '\n' +
        'demo dataServices is loaded!'
}

module.exports = demo
