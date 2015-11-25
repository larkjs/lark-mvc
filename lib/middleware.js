"use strict";
/**
 * mvc koa middleware wrapper
 */

var layerproxy = require("./layerproxy")

/**
 * @param options
 * @param options.path {string} It locate to models, where files will automate load if its filetype is js.  
 */

module.exports = function*(next) {
    this.pageServices = layerproxy.pageServices
    yield next
};

