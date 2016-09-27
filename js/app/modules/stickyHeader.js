"use strict";
appMakeBeCool.gateway.addClass('StickyHeader', function (properties, $, $window, $document) {
    //PRIVATE VARIABLES
    var _stickyHeader = this,
        _defaults = {
            // elements
            header: '#header',
            wrap: '#wrap',
            logo: '#logo'
            // prop
            // data
            // classes ans styles
        },
        _properties = $.extend(_defaults, properties),
        _globals = {
            // elements
            header: null,
            wrap: null,
            logo: null,

            // prop
            preloaded: false
        },

        //PRIVATE METHODS
        _init = function () {
            appMakeBeCool.gateway.base.Class.apply(_stickyHeader, [_properties]);
            if (!_globals.preloaded) {
                return _stickyHeader.init();
            }
            _stickyHeader.globals.customCreate = function () {
                _config();
                _setup();
                _setBinds();
                _setCustomMethods();
            }
            _stickyHeader.create();
        },

        _config = function () {
            _globals.header = $(_properties.header);
            _globals.wrap = $(_properties.wrap);
            _globals.logo = $(_properties.logo);
        },

        _setup = function () {
            _stickyHeaderSet();
        },

        _setBinds = function () {
            _binds().setScrollBind();
        },

        _binds = function () {
            return {
                setScrollBind: function () {
                    _stickyHeader.bind($window, 'scroll', function (e, data, el) {
                        _stickyHeaderSet();
                    })
                }
            }
        },

        _triggers = function () {
            return {

            }
        },

        _stickyHeaderSet = function () {
            if ($window.scrollTop() >= _globals.wrap.offset().top) {
                _globals.header.addClass('sticky');
                var url = _globals.logo.attr("src").replace('logo.', 'logo-sm.');
                _globals.logo.attr("src", url);
            } else {
                _globals.header.removeClass('sticky');
                var url = _globals.logo.attr("src").replace('logo-sm.', 'logo.');
                _globals.logo.attr("src", url);
            }
        },

        _setCustomMethods = function () {
            _stickyHeader.globals.customResurrect = function () {}
            _stickyHeader.globals.customDestroy = function () {}
        }

    //PUBLIC METHODS
    _stickyHeader.addMethod('init', function () {
        _stickyHeader.bind($window, _stickyHeader.globals.classType + '_Init', function (e, data, el) {
            _globals.preloaded = true;
            _init();
        });
    });

    //GO!
    _init();
});