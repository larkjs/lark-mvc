'use strict';
module.exports = class S extends require("lark-mvc").PageService{
    render () {
        return this.dataServices.demo.getData + '\nsimplified pageService is loaded!';
    }
}
