var layerproxy = require("./lib/layerproxy")

/* 分层的四层结构 action, page, data, dao 中，有3层在MVC中做，action 融合到controllers里
 * @layers:^Action
 * @layers:^Service_Page
 * @layers:^([^]+)?Service_Data
 * @layers:^([^]+)?Dao
 */
var DEFAULT_LAYER = [
    // 'Action' : '../../controllers',
    'Service_Page': 'pageService',
    'Service_Data': 'dataService',
    'Dao': 'dao'
]



module.export = {
    'PageService': layerproxy.PageService(DEFAULT_LAYER)
}
