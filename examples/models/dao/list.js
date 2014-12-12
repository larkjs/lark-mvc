var dao = require('../../../index.js').dao
var demo = dao.create('demo')
demo.getData = function(){
    return 'dao dataServices is loaded!' + '\n'
}
module.exports = demo
