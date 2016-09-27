"use strict";
appMakeBeCool.gateway.addClass('Fixblock', function (properties, $, $window, $document) {
    //PRIVATE VARIABLES
    var _fixblock = this,
        _defaults = {
            // elements
            fixblock: '.aside-wrap',
            scrolllContainer: '.scroll',
            headerH: '.socials'

            // prop
            // data
            // classes ans styles
        },
        _properties = $.extend(_defaults, properties),
        _globals = {
            // elements
            fixblock: null,
            scrolllContainer: null,
            headerH: null,
            // prop
            preloaded: false
        },

    //PRIVATE METHODS
        _init = function () {
            appMakeBeCool.gateway.base.Class.apply(_fixblock, [_properties]);
            if (!_globals.preloaded) {
                return _fixblock.init();
            }
            _fixblock.globals.customCreate = function () {
                _config();
                _setup();
                _setBinds();
                _setCustomMethods();
            }
            _fixblock.create();
        },

        _config = function () {
            _globals.fixblock = $(_properties.fixblock);
            _globals.scrolllContainer = $(_properties.scrolllContainer);
            _globals.headerH = $(_properties.headerH);
        },

        _setup = function () {
        },

        _setBinds = function () {
            _binds()._setScrollBind();
        },

        _binds = function () {
            return {
                _setScrollBind: function () {
                    _fixblock.bind($window, 'scroll', function () {
                        if (_globals.fixblock.length) {
                            _fixBlockCheckup();
                        }
                    });
                }
            }
        },

        _fixBlockCheckup = function () {
            var scrollTop = $window.scrollTop();
            var top = _globals.scrolllContainer.offset().top;
            var bottom = top + _globals.scrolllContainer.height() - (_globals.fixblock.height() * 2);
            if ((scrollTop >= top + _globals.headerH.height()) && (scrollTop < bottom)) {
                _globals.fixblock.addClass('fixed').removeClass('absolute');
            } else if ((scrollTop >= top) && (scrollTop > bottom)) {
                _globals.fixblock.removeClass('fixed').addClass('absolute');
            } else if (scrollTop < top + _globals.headerH.height()) {
                _globals.fixblock.removeClass('fixed absolute');
            }
        },

        _triggers = function () {
            return {}
        },

        _setCustomMethods = function () {
            _fixblock.globals.customResurrect = function () {
            }
            _fixblock.globals.customDestroy = function () {
            }
        }

    //PUBLIC METHODS
    _fixblock.addMethod('init', function () {
        _fixblock.bind($window, _fixblock.globals.classType + '_Init', function (e, data, el) {
            _globals.preloaded = true;
            _init();
        });
    });

    //GO!
    _init();
});