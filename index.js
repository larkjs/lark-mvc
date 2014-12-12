var path = require('path');
var rd = require('rd');
var layerproxy = require("./lib/layerproxy")

//var dirs = DEFAULT_LAYER

rd.eachFileFilterSync('models', /\.js$/, function (file) {
    require(file)()
});

var larkMVC = function(option){
    return function*(next) {
        this.pageServices = layerproxy.pageServices
            yield next
    };
}
module.export = larkMVC
