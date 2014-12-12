var dataService = require('lark-mvc').dao
var demo = dao.create('demo')
demo.getData = function(){
    return 'dao dataServices is loaded!'
}

module.exports = demo
