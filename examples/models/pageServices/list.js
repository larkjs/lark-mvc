"use strict";
module.exports = class ListPageService extends require('lark-mvc').PageService {
    render (){
        return this.dataServices.list.getData() + '\ndemo pageService is loaded!'
    }
}
