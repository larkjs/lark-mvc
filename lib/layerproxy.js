"use strict";
var protocol = require("./protocol")
var autoload = require("./autoload")

if (typeof(global.layers) === 'undefined') {
    global.layers = {} // store cache of layers
}

module.exports = {

    /*
     * Usage:
     * ===============================================
     * var layers = require('lark-mvc').layers
     */

    get layers() {
        return global.layers
    },

    /*
     * Usage:
     * ===============================================
     * var mvc = require('lark-mvc')
     * mvc.pageServices.demo.render() // [ok]
     */

    get pageServices () {
        if(global.layers.pageServices === undefined ){
            autoload(global.layers)
        }
        return global.layers.pageServices
    },

    /*
     * Usage:
     * =======================================================================
     * var mvc = require('lark-mvc')
     * mvc.dataServices.demo.getArticles() // => get article data
     * 
     * // if dataService supports events, then:
     * mvc.dataServices.demo.getArticles().on('success', function(){
     *     // handle something.
     * })  
     */

    get dataServices(){
        if(global.layers != {}){
            autoload(global.layers)
        }
        return global.layers.dataServices
    },

    /**
     *  Usage:
     *  ======
     *  var mvc = require('lark-mvc')
     *  var data = mvc.daoServices.getDataFromRedis()
     *
     */

    get daoServices(){
        if(global.layers != {}){
            autoload(global.layers)
        }
        return global.layers.daoServices
    }
}
