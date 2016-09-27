"use strict";
appMakeBeCool.gateway.addClass('Counters', function (properties, $, $window, $document) {
    //PRIVATE VARIABLES
    var _counters = this,
        _defaults = {
            // elements
            counters: '.grow-d'
            // prop
            // data
            // classes ans styles
        },
        _properties = $.extend(_defaults, properties),
        _globals = {
            // elements
            counters: null,
            // prop
            preloaded: false
        },

        //PRIVATE METHODS
        _init = function () {
            appMakeBeCool.gateway.base.Class.apply(_counters, [_properties]);
            if (!_globals.preloaded) {
                return _counters.init();
            }
            _counters.globals.customCreate = function () {
                _config();
                _setup();
                _setBinds();
                _setCustomMethods();
            }
            _counters.create();
        },

        _config = function () {

        },

        _setup = function () {
            _globals.counters = $(_properties.counters);
        },

        _setBinds = function () {
            _binds().setScrollBind();
        },

        _binds = function () {
            return {
                setScrollBind: function () {
                    _counters.bind($window, 'scroll', function (e, data, el) {
                        _setCounting();
                    })
                }
            }
        },

        _triggers = function () {
            return {

            }
        },
        _setCounting = function () {
            if (_globals.counters.length && !_globals.counters.hasClass('animated') && _globals.counters.is(':in-viewport') && $window.width() >= 1280) {
                _globals.counters.each(function () {
                    $(this).prop('Counter', 0).animate({
                        Counter: $(this).text()
                    }, {
                        duration: 2000,
                        easing: 'swing',
                        step: function (now) {
                            $(this).text(Math.ceil(now));
                        }
                    });
                });
                _globals.counters.addClass('animated');
            }
        },

        _setCustomMethods = function () {
            _counters.globals.customResurrect = function () {}
            _counters.globals.customDestroy = function () {}
        }

    //PUBLIC METHODS
    _counters.addMethod('init', function () {
        _counters.bind($window, _counters.globals.classType + '_Init', function (e, data, el) {
            _globals.preloaded = true;
            _init();
        });
    });

    //GO!
    _init();
});