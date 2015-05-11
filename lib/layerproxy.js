/**
 *
 * layerproxy.js:
 *   app中只能相邻层调用，不允许跨层调用
 *   hook功能支持：支持hook功能，在跨层调用前后，发送相应事件，添加自定义逻辑。
 */

var util = require("util")
var events = require("events")


/* 
 * 分层的四层结构 action, page, data, dao 中，有3层在MVC中做，action 融合到controllers里
 * @layers:^Action
 * @layers:^Service_Page
 * @layers:^([^]+)?Service_Data
 * @layers:^([^]+)?Dao
 */

var DEFAULT_LAYER = {
    // 'Action' : '../../controllers', //此层在 router 里实现
    'Service_Page': 'pageService',
    'Service_Data': 'dataService',
    'Dao': 'dao'
}

/*
 * Example of calling pageService in Action layer:
 * ===============================================
 * this.pageServices.demo.render() // [ok]
 * this.dataService.demo.getArticles() // [no]
 */

if (typeof(global.pageServices) === 'undefined') {
    global.pageServices = {}
}
var pageServices = global.pageServices

if (typeof(global.dataServices) === 'undefined') {
    global.dataServices = {}
}
var dataServices = global.dataServices

if (typeof(global.daoServices) === 'undefined') {
    global.daoServices = {}
}
var daoServices = global.daoServices

/*
 * Base layer class which enable emitting events.
 */

var LayerProxy = function(){
    events.EventEmitter.call(this)
}

util.inherits(LayerProxy, events.EventEmitter)

/* 
 * Page Services layer
 *  
 */

/*
 * Example of calling dataService in DataService layer:
 * ===============================================
 * this.dataServices.demo.getArticles()
 * 
 * // if dataService supports events, then:
 * this.dataServices.demo.getArticles().on('success', function(){
 *     // handle something.
 * })  
 */

var PageService = function(){
    LayerProxy.call(this)
    this.dataServices = dataServices;
}

util.inherits(PageService, LayerProxy)

/* 
 *    Example of creating pageService:
 *    ================================
 *    var demo = require('lark-mvc').pageService.create('demo')
 *    demo.render = function(){
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
 *   })
 *   module.exports = demo
 */

var pageService = {
    /*
     * pageService factory
     */
    "create": function(pageServiceName){
        var page_service = new PageService
        pageServices[pageServiceName] = page_service
        return page_service
    }
}

/* 
 * Data Services layer
 */

var DataService = function(){
    LayerProxy.call(this)
    this.daoServices = daoServices;
}

util.inherits(DataService, LayerProxy)

var dataService = {
    'create': function(dataServiceName){
        var data_service = new DataService
        dataServices[dataServiceName] = data_service
        return data_service
    }
}

/* 
 * Dao Services layer
 */

var Dao = function(){
    LayerProxy.call(this)
}

util.inherits(Dao, LayerProxy)

var dao = {
    'create': function(daoServiceName){
        var dao_service = new Dao
        daoServices[daoServiceName] = dao_service
        return dao_service
    }
}

module.exports = {
    'pageService': pageService,     // pageService 相关方法集合,用户一般使用这个
    'pageServices': pageServices,   // 存放所有pageServices 的 cache
    'PageService': PageService,     // pageService 基类
    'dataService': dataService,     // dataService 相关方法集合，用户一般使用这个 
    'dataServices': dataServices,   // 存放所有 dataServices 的 cache
    'DataService': DataService,     // dataService 基类
    'dao': dao,                     // daoService 相关方法合集，用户一般使用这个
    'daoService': dao,              // daoService 相关方法合集，用户一般使用这个
    'daoServices': daoServices,     // 存放所有 daoServices 的 cache
    'DaoService': Dao,              // daoService 基类
}
