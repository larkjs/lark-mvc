/**
 * Create and manage the access routes
 **/
'use strict';


const _       = require('lodash');
const assert  = require('assert');
const debug   = require('debug')('lark-mvc');
const misc    = require('vi-misc');

const CLASS     = Symbol('LARK-MVC.CLASS');
const CONCRETE  = Symbol('LARK-MVC.CONCRETE');
const MAP       = Symbol('LARK-MVC.MAP');
const UNIQUE    = Symbol('LARK-MVC.UNIQUE');

const DEFAULT_ACCESS = 'mvc';
const DEFAULT_MAP = {
    'Controller': ['Page', 'API'],
    'Action': ['Page', 'API'],
    'Page': ['PageHelper', 'Data', 'View'],
    'PageHelper': [],
    'API': ['APIHelper', 'Data'],
    'APIHelper': [],
    'Data': ['DataHelper', 'Dao'],
    'DataHelper': [],
    'Dao': ['DaoHelper'],
    'DaoHelper': [],
    'View': [],
};


class MVC {

    constructor(map = DEFAULT_MAP, accessor = DEFAULT_ACCESS) {
        debug(`construct, accessor is [${accessor}]`);
        assert(map instanceof Object, 'Invalid param accessMap, should be an Object');
        this[MAP] = misc.object.clone(map);
        this[CLASS] = new Set(Object.keys(map));
        this[CONCRETE] = {};
        this[UNIQUE] = {};

        /**
         * Define Classes
         **/
        for (const className in map) {
            debug(`define mvc.${className}`);
            assert(!this.hasOwnProperty(className), `Can not define [mvc.${className}], property already exists`);
            this[CONCRETE][className] = {};
            const mvc = this;

            const get = () => {
                return _.chain(mvc[CONCRETE])
                    .pick(mvc[MAP][className])
                    .mapValues((concreteClasses, abstractClass) => {
                        return this[UNIQUE].hasOwnProperty(abstractClass) ?
                            this[UNIQUE][abstractClass] : concreteClasses;
                    })
                    .value();
            };

            this[className] = class {
                static get [CLASS]() {return className; }
                static get [accessor]() { return get(); }
                get [accessor]() { return get(); }
            };
        }
    }

    use(concreteClass, { name, unique } = {}) {
        assert(concreteClass instanceof Function && this[CLASS].has(concreteClass[CLASS]),
            'Invalid concrete class, should be a subclass extends which registered by this mvc');
        const abstractClass = concreteClass[CLASS];
        name = name || concreteClass.name;
        assert('string' === typeof name, 'Invalid class name, should be a string');
        assert(!this[CONCRETE][abstractClass].hasOwnProperty(name),
            `Duplicated class name [${name}] in [${abstractClass}]`);
        if (unique) {
            this[UNIQUE][abstractClass] = concreteClass;
        }
        else {
            delete this[UNIQUE][abstractClass];
        }
        debug(`using ${name} as ${unique ? 'an unique' : 'a'} ${abstractClass}`);
        this[CONCRETE][abstractClass][name] = concreteClass;
        return this;
    }

}

module.exports = MVC;
