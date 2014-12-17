var path = require('path');
var rd = require('rd');
var layerproxy = require("./lib/layerproxy")

/**
 * @param options
 * @param options.path {string} locate to models, where files which type is js will automate load.  
 */

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
