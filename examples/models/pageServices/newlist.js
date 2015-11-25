"use strict";
module.exports = class NewList extends require('lark-mvc').PageService{
    render (){
        return this.dataServices.list.getData() + '\nnewlist pageService is loaded!'
    }
}
