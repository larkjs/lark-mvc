"use strict";

/**
 *  define protocols of MVC
 *
 *   app中只能相邻层调用，不允许跨层调用
 *   hook功能支持：支持hook功能，在跨层调用前后，发送相应事件，添加自定义逻辑。
 * 
 */

var events = require("events")

/*
 * Base layer class which enable emitting events.
 */

var LayerProxy = function(){
    events.EventEmitter.call(this)
}

Object.setPrototypeOf(LayerProxy.prototype, events.EventEmitter.prototype)

/* 
 * Page Services layer usage:
 * ==========================
 * var PageService = reqiure("lark-mvc").PageService
 * var demo_pageService = new PageService("demo")
 * demo_pageService.render = function(){
 *    var res = ''
 *    co(function *(){
 *        var categroy = yield this.dataService.demo.getArticles(this.params.id)
 *        var articles = yield this.dataService.demo.getArticles(categroy)
 *        var data = {
 *            'categroy': categroy,
 *            'articles': articles
 *        }
 *        res = yield this.render('demo.html', data)
 *       })
 *       return res
 * }
 *   module.exports = demo_pageService
 */

var PageService = function(name, layers){
    LayerProxy.call(this)
    if (!layers.pageServices) {
        layers.pageServices = {}
    }
    layers.pageServices[name] = this
    this.dataServices = layers.dataServices
}

Object.setPrototypeOf(PageService.prototype, LayerProxy.prototype)

/* 
 * Data Services layer
 */

var DataService = function(name, layers){
    LayerProxy.call(this)
    if (!layers.dataServices) {
        layers.dataServices = {}
    }
    layers.dataServices[name] = this
    this.daoServices = layers.daoServices;
}

Object.setPrototypeOf(DataService.prototype, LayerProxy.prototype)

/* 
 * Dao Services layer
 */

var DaoService = function(name, layers){
    LayerProxy.call(this)
    if (!layers.daoServices) {
        layers.daoServices = {}
    }
    layers.daoServices[name] = this
}

Object.setPrototypeOf(DaoService.prototype, LayerProxy.prototype)

module.exports = {
    'PageService': PageService,     // pageService 基类
    'DataService': DataService,     // dataService 基类
    'DaoService': DaoService,              // daoService 基类
}
