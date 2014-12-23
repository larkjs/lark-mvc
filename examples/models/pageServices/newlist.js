module.exports = function(mvc){
    var newlist = mvc.pageService.create('newlist')
    newlist.render = function(){
        return this.dataServices.demo.getData() + '\nnewlist pageService is loaded!'
    }
}
