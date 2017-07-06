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
        this.defaultView = null;
    }
    controller(path) {
        return path ? this.controllers.get(path) : this.controllers.config;
    }
    model(path) {
        return path ? this.models.get(path) : this.models.config;
    }
    view(path) {
        const viewKeys = Object.keys(this.views.config);
        assert(Object.keys(viewKeys).length > 0, 'No views found');
        return path ? this.views.get(path) : this.defaultView;
    } 

    use(component, options = {}) {
        const maps = {
            [Controller.MVC_TYPE]:  this.controllers,
            [Model.MVC_TYPE]:       this.models,
            [View.MVC_TYPE]:        this.views,
        };
        assert(component instanceof Function, 'Component must be a class');
        assert('string' === typeof component.name, 'Invalid component name, should be a string');
        assert(options instanceof Object, 'Options must be an object');
        let name = 'string' === typeof options.name ? options.name : component.name;
        let MVC_TYPE = component.MVC_TYPE;
        let map = maps[MVC_TYPE];
        assert(map instanceof Config, `Invalid component MVC TYPE ${MVC_TYPE}`);
        assert(!map.has(name), `Duplicate key ${name} for ${MVC_TYPE}`);

        component = this._inject(component);
        map.set(name, component);

        if (MVC_TYPE === View.MVC_TYPE) {
            this.defaultView = component;
        }

        return this;
    }
    _inject(component) {
        let mvc = this;
        let result = null;
        if (component.MVC_TYPE === Controller.MVC_TYPE) {
            class ControllerInjected extends component {
                static get name() {
                    return component.name;
                }
                get model() {
                    return mvc.model();
                }
                getModel(...args) {
                    return mvc.model(...args);
                }
                get view() {
                    return mvc.view();
                }
                getView(...args) {
                    return mvc.view(...args);
                }
            }
            result = ControllerInjected;
        }
        if (component.MVC_TYPE === Model.MVC_TYPE) {
            class ModelInjected extends component {
                static get name() {
                    return component.name;
                }
                get model() {
                    return mvc.model();
                }
                getModel(...args) {
                    return mvc.model(...args);
                }
            }
            result = ModelInjected;
        }
        if (component.MVC_TYPE === View.MVC_TYPE) {
            result = new component();
        }
        return result;
    }
    dispatch(controller, ...args) {
        assert(controller, 'Invalid controller');
        if ('string' === typeof controller) {
            controller = this.controller(controller);
        }
        assert(controller instanceof Function && controller.MVC_TYPE === Controller.MVC_TYPE,
            'Invalid controller');

        controller = this._inject(controller);
        const work = new controller();

        return work.main(...args);
    }
}

MVC.Controller = Controller;
MVC.Model      = Model;
MVC.View       = View;

module.exports = MVC;
