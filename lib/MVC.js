/**
 * Lark MVC
 **/
'use strict';

const assert      = require('assert');
const Config      = require('lark-config');

const Controller  = require('./Controller');
const Model       = require('./Model');
const View        = require('./View');

class MVC {
    constructor() {
        this.controllers = new Config();
        this.models      = new Config();
        this.views       = new Config();
    }
    use(...components) {
        const maps = {
            [Controller.MVC_TYPE]:  this.controllers,
            [Model.MVC_TYPE]:       this.models,
            [View.MVC_TYPE]:        this.views,
        };
        for (let component of components) {
            assert(component instanceof Function, 'Componennt must be a class');
            assert('string' === typeof component.name, 'Invalid component name, should be a string');
            const name = component.name;
            const map = maps[component.MVC_TYPE];
            assert(map instanceof Config, `Invalid component MVC TYPE ${component.MVC_TYPE}`);
            assert(!map.has(name), `Duplicate key ${name} for ${component.MVC_TYPE}`);
            map.set(name, component.MVC_TYPE === View.MVC_TYPE ? new component() : component);
        }
    }
    dispatch(controller, ...args) {
        assert(controller, 'Invalid controller');
        if ('string' === typeof controller) {
            controller = this.controllers.get(controller);
        }
        assert(controller instanceof Function && controller.MVC_TYPE === Controller.MVC_TYPE,
            'Invalid controller');

        const work = new controller(this.models, this.views);

        return work.main(...args);
    }
}

MVC.Controller = Controller;
MVC.Model      = Model;
MVC.View       = View;

module.exports = MVC;
