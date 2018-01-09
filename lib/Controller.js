/**
 * The Controller Class, Controller can visit 
 **/
'use strict';

const ERROR_NOT_INJECTED_MODEL  = 'Controller not injected, can not get model';
const ERROR_NOT_INJECTED_VIEW   = 'Controller not injected, can not get view';


class Controller {

    get models() {
        throw new Error(ERROR_NOT_INJECTED_MODEL);
    }

    getModel() {
        throw new Error(ERROR_NOT_INJECTED_MODEL);
    }

    get views() {
        throw new Error(ERROR_NOT_INJECTED_VIEW);
    }

    getView() {
        throw new Error(ERROR_NOT_INJECTED_VIEW);
    }

}

module.exports = Controller;
