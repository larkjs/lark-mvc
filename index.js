"use strict";
/**
 * MVC layers protocol for web server.
 *
 * USAGE:
 *  * loading module in koa *
 *
 *      koa.use(require("mvc").middleware)
 *
 *  * use module *
 *
 *      var mvc = require("mvc")
 *      this.body = mvc.pageServices.demo.render()
 *
 *  * define models *
 *
 *      var DataService = require("mvc")
 *      var AD_DataService = function(){DataService.call(this) }
 *      Object.setPrototypeOf(AD_DataService.prototype, DataService.prototype, {"render": ...})
 *      module.exports = AD_DataService
 */

var mvc = module.exports = {
    "middleware": require("./lib/middleware"),
    "set_model_path": function(path){
        global.mvc_model_path = path
    },
}

var protocols = require("./lib/protocol")

for (var protocol_name in protocols){
    mvc[protocol_name] = protocols[protocol_name]
}

var layerproxys = require("./lib/layerproxy")
for (var layerproxy_name in layerproxys){
    mvc[layerproxy_name] = layerproxys[layerproxy_name]
}
