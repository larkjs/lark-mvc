var path = require('path');
var rd = require('rd');
var layerproxy = require("./lib/layerproxy")

var larkMVC = function(options){
    if (!options || !options.path) {
        var path = 'models'
    }else{
        var path = options.path
    }
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
