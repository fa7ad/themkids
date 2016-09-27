"use strict";

var appMakeBeCool = (typeof appMakeBeCool === 'undefined') ? {} : console.log('Namespace appMakeBeCool is taken');

appMakeBeCool.Site = function ($, window, document, undefined) {
    /** PRIVATE **/

    //PRIVATE VARIABLES
    var $window = $(window), // кешируем переменную
        $document = $(document), // кешируем переменную
        $htmlBody = $('html, body'), // кешируем переменную
        _site = {   //Базовый приватный объект сайта, иницализирующий всю работу
            properties: {},
            globals: {
                // prop
                siteConfigured: false,
                siteMode: null,
                winWidth: 0,
                indexBase: 0,
            },
            utils: {},
            classes: {},
            classInstances: [],
            events: {}
        };

    //PRIVATE METHODS

    /**
     * Инициализация ядра приложения.
     * @param options - объект, содержащий функцию, которая будет вызвана после инициализации
     */
    _site.init = function (options) {
        var _options = $.extend({ onComplete: function () { } }, options);
        _site.config();
        _site.extendClasses();
        _site.instantiateClasses();
        _site.setup();
        _site.setEventBinds();
        _site.globals.siteConfigured = true;
        $window.trigger('siteConfigComplete');
        _options.onComplete();
        $window.trigger('siteInitComplete', { options: _options });
    };

    /**
     * Установка режима приложения
     */
    _site.setSiteMode = function() {
        _site.globals.siteMode = 'ThemeMode';
    };

    /**
     * Конфигурация объекта, определение свойств, параметров и необходимых элементов
     */
    _site.config = function () {
        _site.globals.winWidth = $window.width();

        //Определяем Request Animation Frame
        if (!window.requestAnimationFrame) {
            window.requestAnimationFrame = (
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                function (callback) {
                    return window.setTimeout(callback, 1000 / 60);
                }
            );
        }
    };

    /**
     * Установка всех зависимых элементов, манипуляции с ними, плагины
     */
    _site.setup = function () {};

    /**
     * Вызов всех прослушиваний необходимых событий для этого класса
     */
    _site.setEventBinds = function () {
        _site.eventBinds().setUnloadBind();
    };

    /**
     * Определение всех прослушиваемых событий и действий по ним
     * @returns Object
     */
    _site.eventBinds = function () {
        return {
            setUnloadBind: function() {
                $window.bind('load', function () {
                    $htmlBody.scrollTop(0);
                });
            }
        }
    };

    /**
     * Добавление классов в пространство имен
     */
    _site.extendClasses = function () {
        _site.utils.extend(site.classes.SiteMode, site.base.Class);
//        _site.utils.extend(site.classes[_site.globals.siteMode], site.classes.SiteMode);
    };

    /**
     * Создание экземпляров классов, наследуя их от базовых
     */
    _site.instantiateClasses = function () {
        site.createClassInstances(_site.getSiteMode());
    };

    /**
     * Создание экземпляра класса
     * @param instanceName - Имя создаваемого класса
     * @param classObject - Название класса создаваемого объекта
     * @param classProperties - { classId: Имя создаваемого класса }
     * @param classExtends - Родитель класса
     */
    _site.createClassInstance = function (instanceName, classObject, classProperties, classExtends) {
        if (classExtends) _site.utils.extend(classObject, classExtends);
        if (typeof instanceName !== 'string') return console.log('Error: _site.createClassInstance() expects a string for instanceName');
        if (typeof classObject !== 'function') return console.log('Error: _site.createClassInstance() expects a function for classObject');
        var _classProperties = classProperties || {};
        site.classInstances[instanceName] = new classObject(_classProperties, $, $window, $document);
        return site.classInstances[instanceName];
    };

    /**
     * Возвращает главный объект сайта
     * @returns {mbc.Site}
     */
    _site.getSiteObj = function () {
        return site;
    };

    /**
     * Возвращает текущий режим сайта
     * @returns {Array}
     */
    _site.getSiteMode = function () {
        var siteMode = [];

        siteMode.push({classObject: _site.globals.siteMode, classExtends: 'SiteMode'});

        return siteMode;
    };

    //PRIVATE UTILS

    /**
     * Базовые функции для работы
     */
    _site.utils = {
        /**
         * Добавление класса в пространство имен, наследуя его от базового
         * @param subClass - добавляемый класс
         * @param superClass - базовый класс
         */
        extend: function (subClass, superClass) {
            var F = function () {};
            F.prototype = superClass.prototype;
            subClass.prototype = new F();
            subClass.prototype.constructor = subClass;
            subClass.superclass = superClass.prototype;
            if (superClass.prototype.constructor == Object.prototype.constructor) {
                superClass.prototype.constructor = superClass;
            }
        },
        /**
         * Смещение индекса записи в массиве
         * @param array
         * @param index
         * @param targetIndex
         * @returns {*}
         */
        arrayShiftTo: function (array, index, targetIndex) {
            if (typeof array !== 'object') return console.log('Error: array provided is not of type object');
            if (typeof index !== 'number' || index < 0 || index >= array.length) return console.log('error: index provided is not valid');
            if (typeof targetIndex !== 'number' || targetIndex < 0 || targetIndex >= array.length) return console.log('error: targetIndex provided is not valid');
            var origItem = array[index];
            array.splice(index, 1);
            array.splice(targetIndex, 0, origItem);
            return array;
        },

        /**
         * Слияние двух объектов с параметрами {}
         * @param obj1
         * @param obj2
         * @returns {{}}
         */
        mergeOptions: function (obj1,obj2) {
            var obj3 = {};
            for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
            for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
            return obj3;
        }
    };

    /** PUBLIC **/

    //PUBLIC VARIABLES
    var site = this;
    $.extend(site, {
        classes: {},
        modules: {},
        base: {},
        classInstances: {}
    });

    //PUBLIC METHODS
    site.init = function () {
        //extend jquery with findAndSelf
        if (!$.fn.findAndSelf) $.fn.findAndSelf = function (selector) { return this.find(selector).andSelf().filter(selector); }

        _site.setSiteMode();
//        $window.bind('modeComplete', function (e, data) {
//            var _data = $.extend({ onComplete: function () { } }, data);
//            _site.init({ onComplete: _data.onComplete });
//        });
        _site.init();

    };

    /**
     * Добавляем классы в стек
     * @param name
     * @param Class
     */
    site.addClass = function (name, Class) {
        site.classes[name] = Class;
    };

    /**
     * Публичная функция для создания экземпляра класса
     * @param instanceName - Имя создаваемого класса
     * @param classObject - Название класса создаваемого объекта
     * @param classProperties - { classId: Имя создаваемого класса }
     * @param classExtends - Родитель класса
     */
    site.createClassInstance = function (instanceName, classObject, classProperties, classExtends) {
        return _site.createClassInstance(instanceName, classObject, classProperties, classExtends);
    };

    /**
     * Функция для массового создания экземпляров классов
     * @param obj "{name: 'ClassName', extends: 'ClassExtends'}"
     */
    site.createClassInstances = function (obj) {
        if (obj.length > 0) {
            $.each(obj, function () {
                var _obj = $.extend({
                    instanceName: this.classObject,
                    classObject: this.classObject,
                    classProperties: { classId: this.classObject },
                    classExtends: site.base.Class
                }, this);
                if (typeof _obj.classObject === 'string') _obj.classObject = site.classes[_obj.classObject];
                if (typeof _obj.classExtends === 'string') _obj.classExtends = site.classes[_obj.classExtends];
                _site.createClassInstance(_obj.instanceName, _obj.classObject, _obj.classProperties, _obj.classExtends);
            });
        }
    };

    /**
     * Публичная обвертка для базовых функций
     */
    site.utils = {
        extend: function (subClass, superClass) {
            _site.utils.extend(subClass, superClass);
        },
        arrayShiftTo: function (array, index, targetIndex) {
            return _site.utils.arrayShiftTo(array, index, targetIndex);
        },
        mergeOptions: function (obj1,obj2) {
            return _site.utils.mergeOptions(obj1,obj2);
        }
    };

    /**
     * Получаем глобальные свойства
     */
    site.getGlobals = function () {
        return _site.globals;
    };

    /**
     * Получить экземпляр класса созданного ранее
     * @param instanceName
     * @returns {*}
     */
    site.getClassInstance = function (instanceName) {
        return site.classInstances[instanceName];
    };

    //BASE CLASS

    /**
     * Базовый класс, от которого наследуются все основные модули
     * @param properties "{ classId: Имя создаваемого класса }"
     * @constructor
     */
    site.base.Class = function (properties) {
        //PRIVATE VARS
        var _baseClass = this;
        var _CONSTANTS = {
            VAR_1: null,
            VAR_2: null
        };
        var _defaults = {
            sourceEl: null,
            classId: null,
            classType: null,
            msg: 'This is the default base message',
            debugMode: false,
            eventsLog: {
                binds: [],
                triggers: []
            },
            classDependents: [],
            triggerSrc: null,
            instanceName: '',
            autoCallCreateComplete: true,
            instanceIdAttr: 'data-mbc-instance-id',
            onCreateComplete: function () {},
            onLoadComplete: function () {},
            onDestroyComplete: function () {}
        };
        //PUBLIC VARS
        _baseClass.properties = $.extend(_defaults, properties);
        _baseClass.globals = {
            classId: '',
            alive: false,
            instantiated: false,
            setupComplete: false,
            createComplete: false,
            loadComplete: false,
            classDependentsInstantiated: false,
            classDependentsInstances: [],
            classType: '',
            timeouts: [],
            intervals: [],
            customCreate: function () { },
            customCreateComplete: function () {},
            customDestroy: function () { },
            customDestroyComplete: function () {},
            customResurrect: function () { },
            customLoadComplete: function () { }
        };

        //PRIVATE METHODS
        var _init = function () {
            _config();
        };
        var _config = function () {
            _baseClass.globals.classType = _baseClass.properties.classType || _baseClass.properties.classId;
            _baseClass.properties.sourceEl = $(_baseClass.properties.sourceEl);
            _baseClass.globals.classId = _baseClass.properties.classId || instance;
        };

        var _setup = function () {};

        //PUBLIC METHODS

        _baseClass.getConstants = function () { return _CONSTANTS; };
        _init();
    };

    /**
     * Прототип базового класса
     */
    site.base.Class.prototype = {
        /**
         * Добавление функции в глобальную область видимости
         * @param name
         * @param fn
         * @returns {*}
         */
        addMethod: function (name, fn) {
            var _baseClass = this;
            if (!name || typeof fn !== 'function') return _baseClass.logError('addMethod() parameters passed in are invalid');
            if (!_baseClass[name]) _baseClass[name] = fn;
        },

        /**
         * Создание класса с пом последовательно запуска его функций
         * @param options
         * @returns {*}
         */
        create: function (options) {
            var _baseClass = this;
            var _options = $.extend({
                createStart: function () { },
                createComplete: function () { }
            }, options);
            if (_baseClass.globals.alive) {
                _baseClass.log(_baseClass);
                return _baseClass.logWarning('Class.create cannot create class, it is already created.');
            }
            _baseClass.globals.alive = true;
            _baseClass.createStart(_options.createStart);
            _baseClass.createClassDependents();
            if (_baseClass.properties.sourceEl.length > 0) _baseClass.properties.sourceEl.attr(_baseClass.properties.instanceIdAttr, _baseClass.globals.classId);
            if (typeof _baseClass.globals.customCreate === 'function' && !_baseClass.globals.instantiated) {
                _baseClass.globals.customCreate();
            } else if (typeof _baseClass.globals.customResurrect === 'function' && _baseClass.globals.instantiated) {
                //if class already loaded, run custom instance resurrection function
                _baseClass.globals.customResurrect();
            }
            _baseClass.globals.setupComplete = true;
            if (_baseClass.properties.autoCallCreateComplete === true) {
                _baseClass.createComplete(_options.createComplete);
            }
            return true;
        },

        /**
         * Уничтожение класса
         * @param options
         * @returns {*}
         */
        destroy: function (options) {
            var _baseClass = this;
            var _options = $.extend({
                destroyStart: function () { },
                destroyComplete: function () { }
            }, options);
            if (!_baseClass.globals.alive) return _baseClass.logWarning('Class.destroy cannot destroy class, it has not been created.');
            //Lets run destroy start callback and wait for possible animations to complete before continuing to shut down
            _baseClass.destroyStart(function () {
                _baseClass.destroyClassDependents();
                if (typeof _baseClass.globals.customDestroy === 'function') _baseClass.globals.customDestroy();
                _baseClass.globals.alive = false;
                _baseClass.destroyComplete(_options.destroyComplete);
            });
            _baseClass.clearAllTimeouts();
            _baseClass.clearAllIntervals();
            return true;
        },

        /**
         * Создание зависимых классов
         * @returns {boolean}
         */
        createClassDependents: function () {
            //Dynamically run through all dependencies provided and create an instance for each.
            var _baseClass = this;
            //create class dependents
            if (_baseClass.globals.classDependentsInstantiated) {
                $.each(_baseClass.globals.classDependentsInstances, function (i) {
                    var _this = this;
                    _this.create();
                });
                return true;
            }
            //instantiate/create class dependents
            if (_baseClass.properties.classDependents.length < 1) return false;
            $.each(_baseClass.properties.classDependents, function () {
                _site.utils.extend(this.obj, site.base.Class);
                var _properties = $.extend({
                    onCreateComplete: function () {
                        setTimeout(function () {
                            if (!_baseClass.globals.createComplete) _baseClass.createComplete();
                        }, 1);
                    }
                }, this.properties);
                /*Look above, very important BUT...needs some reconsideration perhaps*/
                _baseClass.globals.classDependentsInstances.push(new this.obj(_properties));
            });
            _baseClass.globals.classDependentsInstantiated = true;
            return true;
        },

        /**
         * Удаление зависимых классов
         * @returns {boolean}
         */
        destroyClassDependents: function () {
            var _baseClass = this;
            if (_baseClass.globals.classDependentsInstances.length < 1) return false;
            $.each(_baseClass.globals.classDependentsInstances, function () {
                var _this = this;
                _this.destroy();
            });
            return true;
        },

        /**
         * Статус зависимых классов
         * @returns {*}
         */
        classDependentsStatus: function () {
            var _baseClass = this;
            if (_baseClass.properties.classDependents.length === 0) return true;
            var _ret = {
                setupComplete: true,
                loadComplete: true
            };
            $.each(_baseClass.properties.classDependents, function (i) {
                if (!_baseClass.globals.classDependentsInstances[i].globals.setupComplete) _ret = $.extend(_ret, { setupComplete: false });
                if (!_baseClass.globals.classDependentsInstances[i].globals.loadComplete) _ret = $.extend(_ret, { loadComplete: false });
            });
            return _ret;
        },

        /**
         * Вернуть имя установленного класса
         * @returns {*}
         */
        getInstanceName: function () {
            var _baseClass = this;
            if (_baseClass.properties.instanceName) {
                return _baseClass.properties.instanceName;
            } else {
                return false;
            }
        },

        /**
         * Функция, срабатывающя при старте создания класса
         * @param fn
         */
        createStart: function (fn) {
            var _baseClass = this;
            if (typeof fn === 'function') fn();
        },

        /**
         * Функцияю срабатывающя после создания класса
         * @param fn
         * @returns {boolean}
         */
        createComplete: function (fn) {
            var _baseClass = this;
            if (_baseClass.globals.createComplete) return false; /*_baseClass.logWarning('createComplete() has already been successfully executed...is this a necessary warning?');*/
            if (_baseClass.globals.classDependentsInstances.length > 0) _baseClass.loadCompleteChecker();
            if (_baseClass.globals.classDependentsInstances.length > 0 && !_baseClass.classDependentsStatus().setupComplete) {
                return false;
            }
            var _fn = function () {
                if (typeof fn === 'function') fn();
                _baseClass.properties.onCreateComplete();
                _baseClass.globals.customCreateComplete();
                _baseClass.globals.createComplete = true;
                _baseClass.globals.instantiated = true;
                $window.trigger('classCreateComplete', { classId: _baseClass.properties.classId, classType: _baseClass.globals.classType });
                if (_baseClass.isLoaded()) _baseClass.globals.loadComplete = true;
            };
            if (typeof _fn === 'function') _fn();
            return true;
        },

        /**
         * Меняет статус класса на загруженный после его установки
         * @param fn
         */
        loadComplete: function (fn) {
            _baseClass = this;
            var _fn = function () {
                if (typeof fn === 'function') fn();
                _baseClass.properties.onLoadComplete();
                _baseClass.globals.customLoadComplete();
                _baseClass.globals.loadComplete = true;
            };
            _fn();
        },

        /**
         * Вызов событияи функции на начало уничтожения класса
         * @param fn
         */
        destroyStart: function (fn) {
            _baseClass = this;
            this.trigger('classDestroyStart', { classId: _baseClass.properties.classId, classType: _baseClass.globals.classType });
            if (typeof fn === 'function') fn();
        },

        /**
         * Вызов события и функции после разрушения класса
         * @param fn
         */
        destroyComplete: function (fn) {
            _baseClass = this;
            var _fn = function () {
                if (typeof fn === 'function') fn();
                _baseClass.properties.onDestroyComplete();
                _baseClass.globals.customDestroyComplete();
                _baseClass.globals.createComplete = false;
                _baseClass.trigger('classDestroyComplete', { classId: _baseClass.properties.classId, classType: _baseClass.globals.classType });
            };
            if (typeof fn === 'function') _fn();
        },

        /**
         * Проверка на загрузку класса
         * @returns {boolean}
         */
        isLoaded: function () {
            var _baseClass = this;
            if (!_baseClass.globals.createComplete) return false;
            else if (_baseClass.globals.classDependentsInstances < 1) return true;
            else if (_baseClass.classDependentsStatus().loadComplete) return true;
            else return false;
        },

        /**
         * Изменение состояние класса после создания на загруженный
         */
        loadCompleteChecker: function () {
            var _baseClass = this;
            var __baseClass = _baseClass;
            var interval = __baseClass.setInterval(function () {
                if (__baseClass.isLoaded()) {
                    __baseClass.clearInterval(interval);
                    _baseClass = __baseClass;
                    __baseClass.loadComplete();
                }
            }, 60);
        },

        log: function (msg, obj) {
            var _baseClass = this;
            if (!_baseClass.properties.debugMode) return;
            if (typeof msg === 'object') {
                obj = msg;
                msg = '';
            }

            if (typeof obj !== 'object') obj = '';
            if (typeof console === 'object' && typeof console.log === 'function') {
                console.log(_baseClass.globals.classId + ': ' + msg, obj);
            }
        },

        logError: function (msg, obj) {
            var _baseClass = this;
            _baseClass.log('Error - ' + msg, obj);
        },

        logWarning: function (msg, obj) {
            var _baseClass = this;
            _baseClass.log('Warning - ' + msg, obj);
        },

        logNotice: function (msg, obj) {
            var _baseClass = this;
            _baseClass.log('Notice - ' + msg, obj);
        },

        setInterval: function (fn, duration) {
            var _baseClass = this;
            if (typeof fn !== 'function') return _baseClass.logError('setInterval() fn provided is not a function');
            var _duration = duration || 1;
            var interval = setInterval(fn, duration);
            _baseClass.globals.intervals.push(interval);
            return interval;
        },

        clearInterval: function (id) {
            var _baseClass = this;
            clearInterval(id);
        },

        clearAllIntervals: function () {
            var _baseClass = this;
            if (_baseClass.globals.intervals.length === 0) return false;
            $.each(_baseClass.globals.intervals, function () {
                _baseClass.clearInterval(this);
            });
            _baseClass.globals.intervals = [];
            return true;
        },

        setTimeout: function (fn, duration) {
            var _baseClass = this;
            if (typeof fn !== 'function') return _baseClass.logError('setTimeout() fn provided is not a function');
            var _duration = duration || 1;
            var timeout = setTimeout(fn, duration);
            _baseClass.globals.timeouts.push(timeout);
            return timeout;
        },

        clearTimeout: function (id) {
            var _baseClass = this;
            clearTimeout(id);
        },

        clearAllTimeouts: function () {
            var _baseClass = this;
            if (_baseClass.globals.timeouts.length === 0) return false;
            $.each(_baseClass.globals.timeouts, function () {
                _baseClass.clearTimeout(this);
            });
            _baseClass.globals.timeouts = [];
            return true;
        },

        on: function(el, event, fn){
            var _baseClass = this;
            if (_baseClass.properties.debugMode) {
                console.log('SET LIVE - class:' + _baseClass.globals.classId + ', event:' + event);
            }

            $document.on(el, event, function(e, data){
                if (_baseClass.properties.debugMode && event != 'scroll') {
                    console.log('LIVE - class:' + _baseClass.globals.classId + ', event:' + event);
                }
                if (typeof fn === 'function') fn(e, data, this);
            });
        },

        bind: function(el, event, fn){
            var _baseClass = this;
            if (_baseClass.properties.debugMode) {
                console.log('SET BIND - class:' + _baseClass.globals.classId + ', event:' + event);
            }
            el.bind(event, function(e, data){
                if (_baseClass.properties.debugMode && event != 'scroll') {
                    console.log('BIND - class:' + _baseClass.globals.classId + ', event:' + event);
                }
                if (typeof fn === 'function') fn(e, data, this);
            });
        },

        unbind: function(el, event){
            var _baseClass = this;
            if (_baseClass.properties.debugMode) {
                console.log('UNBIND - class:' + _baseClass.globals.classId + ', event:' + event);
            }

            el.unbind(event, function(e){
                if (_baseClass.properties.debugMode) {
                    console.log('UNBIND - class:' + _baseClass.globals.classId + ', event:' + event);
                }
            });
        },

        trigger: function(name, data){
            var _baseClass = this;
            var _data;
            if (!data) _data = {};
            else _data = data;

            if (_baseClass.properties.debugMode && event != 'scroll') {
                console.log('TRIGGER - class:' + _baseClass.globals.classId + ', event:' + name);
            }

            $window.trigger(name, _data);
            return true;
        }
    };
};

appMakeBeCool.gateway = new appMakeBeCool.Site(jQuery, window, window.document);

if(!appMakeBeCool.gateway) appMakeBeCool.gateway = new appMakeBeCool.Site();