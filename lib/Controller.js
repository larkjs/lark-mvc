/**
 * The Controller Class
 **/
'use strict';

class Controller {

    static get MVC_TYPE() {
        return 'Controller';
    }

    constructor(model, view) {

        this.model = (target) => {
            return model.get(target);
        };
        Object.assign(this.model, model.config);

        const viewKeys = Object.keys(view.config);
        const defaultViewKey = viewKeys.length === 0 ? 'default' : viewKeys[viewKeys.length - 1];
        this.view = (target = defaultViewKey) => {
            return view.get(target);
        };
        Object.assign(this.view, view.config);

    }

}

module.exports = Controller;
