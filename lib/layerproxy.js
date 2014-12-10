/**
 *
 * layerproxy.js:
 *   app中只能相邻层调用，不允许跨层调用
 *   hook功能支持：支持hook功能，在跨层调用前后，发送相应事件，添加自定义逻辑。
 */

var LayerProxy = function(){

}

utils.extends(LayerProxy.prototype,{

})

var PageService = function(){

}

utils.extends(PageService.prototype, LayerProxy, {

})

var DataService = function(){

}

utils.extends(DataService.prototype, LayerProxy, {

})

var DaoLayer = function(){

}

DaoLayer = utils.extends(DaoLayer.prototype, LayerProxy, {

})

module.export = {
    'pageService': PageService,
    'dataService': DataService,
    'dao': DaoLayer
}
