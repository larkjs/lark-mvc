var path = require('path');
var rd = require('rd');
var layerproxy = require("./lib/layerproxy")

/**
 * @param options
 * @param options.path {string} It locate to models, where files will automate load if its filetype is js.  
 */

var larkMVC = function(options){
    if (!options || !options.path) {
        var path = 'models'
    }else{
        var path = options.path
    }
    rd.eachFileFilterSync(path, /\.js$/, function (file) {
        var func = require(file)
        if (func instanceof Function){
            func(layerproxy, options.log)
        }
    });
    return function*(next) {
        this.pageServices = layerproxy.pageServices
        yield next
    };
}

var output = layerproxy;
output.middleware = larkMVC
module.exports = output
