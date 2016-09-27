"use strict";

appMakeBeCool.gateway.addClass('Waves', function (properties, $, $window, $document) {
    //PRIVATE VARIABLES
    var _waves = this,
        _defaults = {
            // elements

            // prop
            // data
            // classes ans styles
        },
        _properties = $.extend(_defaults, properties),
        _globals = {
            // elements

            // prop
            preloaded: false
        },

        //PRIVATE METHODS
        _init = function () {
            appMakeBeCool.gateway.base.Class.apply(_waves, [_properties]);
            if (!_globals.preloaded) {
                return _waves.init();
            }
            _waves.globals.customCreate = function () {
                _config();
                _setup();
                _setBinds();
                _setCustomMethods();
            }
            _waves.create();
        },

        _config = function () {

        },

        _setup = function () {
            Waves.displayEffect();
        },

        _setBinds = function () {

        },

        _binds = function () {
            return {

            }
        },

        _triggers = function () {
            return {

            }
        },

        _setCustomMethods = function () {
            _waves.globals.customResurrect = function () {}
            _waves.globals.customDestroy = function () {}
        }

    //PUBLIC METHODS
    _waves.addMethod('init', function () {
        _waves.bind($window, _waves.globals.classType + '_Init', function (e, data, el) {
            _globals.preloaded = true;
            _init();
        });
    });

    //GO!
    _init();
});