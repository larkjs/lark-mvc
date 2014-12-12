var layerproxy = require("./lib/layerproxy")
var larkMVC = function(option){
  return function*(next) {
      this.pageServices = layerproxy.pageServices
      yield next
  };
}
module.export = larkMVC
