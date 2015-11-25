"use strict";
module.exports = class ListDataService extends require("lark-mvc").DataService{
    getData () {
        return this.daoServices.list.getData() + '\n' +
            'demo dataServices is loaded!'
    }
}
