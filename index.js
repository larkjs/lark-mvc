var path = require('path');
var rd = require('rd');
var layerproxy = require("./lib/layerproxy")

var larkMVC = function(option){
    //var dirs = DEFAULT_LAYER
    var path = option.path || 'models'
    rd.eachFileFilterSync(path, /\.js$/, function (file) {
        require(file)
    });
    return function*(next) {
        this.pageServices = layerproxy.pageServices
        yield next
    };
}

var output = layerproxy;
output.middleware = larkMVC
module.exports = output
