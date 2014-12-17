var demo = require('lark-mvc').dao.create('demo')
demo.getData = function(){
    return 'dao dataServices is loaded!'
}
module.exports = demo
